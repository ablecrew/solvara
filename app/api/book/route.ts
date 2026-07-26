import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/* ─── Business availability config ──────────────────────────── */
const WORKING_HOURS = { start: 9, end: 17 }; // 9am – 5pm EAT
const WORKING_DAYS  = [1, 2, 3, 4, 5];   // Sun–Fri (0=Sun)
const SLOT_DURATION = 30;                     // minutes per slot
const ADVANCE_DAYS  = 30;                     // how many days ahead to show
const NAIROBI_TZ    = "Africa/Nairobi";

/* Slots already booked — in production replace with DB query */
const BOOKED_SLOTS: Record<string, string[]> = {
  /* "2025-07-15": ["09:00", "10:30", "14:00"] */
};

/* ─── Helpers ────────────────────────────────────────────────── */
function toNairobi(date: Date) {
  return new Date(date.toLocaleString("en-US", { timeZone: NAIROBI_TZ }));
}

function generateSlots(dateStr: string): string[] {
  const slots: string[] = [];
  const now = toNairobi(new Date());
  const target = new Date(dateStr + "T00:00:00");
  const isToday =
    target.getFullYear() === now.getFullYear() &&
    target.getMonth() === now.getMonth() &&
    target.getDate() === now.getDate();

  for (let h = WORKING_HOURS.start; h < WORKING_HOURS.end; h++) {
    for (let m = 0; m < 60; m += SLOT_DURATION) {
      if (isToday && (h < now.getHours() || (h === now.getHours() && m <= now.getMinutes() + 60))) continue;
      slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    }
  }
  return slots;
}

function getAvailableDates() {
  const dates: { date: string; label: string; dayName: string; available: boolean }[] = [];
  const now = toNairobi(new Date());

  for (let i = 1; i <= ADVANCE_DAYS; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    const dayOfWeek = d.getDay();
    if (!WORKING_DAYS.includes(dayOfWeek)) continue;

    const dateStr = d.toISOString().split("T")[0];
    const slots   = generateSlots(dateStr);
    const booked  = BOOKED_SLOTS[dateStr] ?? [];
    const free    = slots.filter((s) => !booked.includes(s));

    dates.push({
      date: dateStr,
      label: d.toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" }),
      dayName: d.toLocaleDateString("en-KE", { weekday: "long" }),
      available: free.length > 0,
    });
  }
  return dates;
}

/* ─── Rate limit ─────────────────────────────────────────────── */
const rateMap = new Map<string, { count: number; resetAt: number }>();
function isLimited(ip: string) {
  const now = Date.now();
  const e   = rateMap.get(ip);
  if (!e || now > e.resetAt) { rateMap.set(ip, { count: 1, resetAt: now + 60_000 }); return false; }
  if (e.count >= 3) return true;
  e.count++;
  return false;
}

function sanitize(v: unknown) {
  return String(v ?? "").trim().replace(/<[^>]*>/g, "").slice(0, 500);
}

/* ─── GET — return available dates & slots ───────────────────── */
export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date");

  if (date) {
    const booked = BOOKED_SLOTS[date] ?? [];
    const all    = generateSlots(date);
    const slots  = all.map((s) => ({ time: s, available: !booked.includes(s) }));
    return NextResponse.json({ slots });
  }

  return NextResponse.json({ dates: getAvailableDates() });
}

/* ─── POST — book a slot ─────────────────────────────────────── */
export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isLimited(ip)) return NextResponse.json({ error: "Too many requests. Please wait." }, { status: 429 });

  const body = await req.json();
  const { name, email, phone, service, date, time, notes } = body;

  if (!name || !email || !date || !time || !service)
    return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });

  const booked = BOOKED_SLOTS[date] ?? [];
  if (booked.includes(time))
    return NextResponse.json({ error: "This slot was just taken. Please choose another time." }, { status: 409 });

  // Mark slot as booked (in production: write to DB)
  BOOKED_SLOTS[date] = [...booked, time];

  const safeName    = sanitize(name);
  const safeEmail   = sanitize(email);
  const safePhone   = sanitize(phone);
  const safeService = sanitize(service);
  const safeNotes   = sanitize(notes);

  const dateLabel = new Date(date + "T00:00:00").toLocaleDateString("en-KE", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
    timeZone: NAIROBI_TZ,
  });

  const bookingRef = `SOL-${Date.now().toString(36).toUpperCase()}`;

  /* ── Email to team ── */
  await resend.emails.send({
    from: "Solvara Bookings <noreply@solvara.tech>",
    to: ["solvarasolutions@gmail.com", "tonnyonyango79@gmail.com"],
    replyTo: safeEmail,
    subject: `📅 New Consultation: ${safeService} — ${dateLabel} at ${time} EAT`,
    html: `
<div style="font-family:Inter,sans-serif;background:#0A0E1A;color:#fff;padding:32px;border-radius:16px;max-width:600px;margin:0 auto;">
  <div style="background:linear-gradient(135deg,#0D518C,#1A6BB5);padding:24px;border-radius:12px;margin-bottom:24px;">
    <h2 style="margin:0;color:#fff;font-size:20px;">📅 New Consultation Booked</h2>
    <p style="margin:6px 0 0;color:rgba(255,255,255,0.75);font-size:14px;">Booking Ref: <strong>${bookingRef}</strong></p>
  </div>
  <div style="background:rgba(46,204,113,0.08);border:1px solid rgba(46,204,113,0.2);border-radius:12px;padding:16px;margin-bottom:20px;">
    <div style="color:#9CA3AF;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin-bottom:8px;">Appointment</div>
    <div style="color:#2ECC71;font-size:20px;font-weight:900;">${dateLabel}</div>
    <div style="color:#fff;font-size:16px;font-weight:700;margin-top:4px;">${time} EAT (Nairobi)</div>
  </div>
  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
    ${[["Name", safeName], ["Email", safeEmail], ["Phone", safePhone || "Not provided"], ["Service", safeService]].map(([l, v]) => `
    <tr><td style="padding:8px 0;border-bottom:1px solid #1A2540;">
      <span style="color:#6B7280;font-size:12px;">${l}</span><br/>
      <span style="color:#fff;font-size:14px;font-weight:600;">${v}</span>
    </td></tr>`).join("")}
  </table>
  ${safeNotes ? `<div style="background:#0F1629;border:1px solid #1A2540;border-radius:10px;padding:14px;margin-bottom:20px;">
    <div style="color:#6B7280;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin-bottom:6px;">Notes</div>
    <div style="color:#D1D5DB;font-size:14px;">${safeNotes}</div>
  </div>` : ""}
  <a href="mailto:${safeEmail}?subject=Your Solvara Consultation — ${dateLabel} at ${time}" style="display:block;background:#2ECC71;color:#0A0E1A;font-weight:900;padding:14px;border-radius:10px;text-decoration:none;text-align:center;font-size:15px;">Reply to ${safeName} →</a>
</div>`,
  });

  /* ── Confirmation to client ── */
  await resend.emails.send({
    from: "Solvara Solutions <noreply@solvara.tech>",
    to: [safeEmail],
    subject: `✅ Consultation Confirmed — ${dateLabel} at ${time} EAT`,
    html: `
<div style="font-family:Inter,sans-serif;background:#0A0E1A;color:#fff;padding:32px;border-radius:16px;max-width:520px;margin:0 auto;">
  <div style="background:linear-gradient(135deg,#0D518C,#1A6BB5);padding:24px;border-radius:12px;text-align:center;margin-bottom:24px;">
    <div style="font-size:40px;margin-bottom:8px;">📅</div>
    <h2 style="margin:0;color:#fff;font-size:22px;font-weight:900;">Consultation Confirmed!</h2>
    <p style="margin:6px 0 0;color:rgba(255,255,255,0.75);font-size:13px;">Booking Ref: <strong>${bookingRef}</strong></p>
  </div>
  <p style="color:#D1D5DB;font-size:15px;">Hi <strong>${safeName.split(" ")[0]}</strong>, your free consultation with Solvara Technologies is confirmed!</p>
  <div style="background:rgba(46,204,113,0.08);border:1px solid rgba(46,204,113,0.2);border-radius:12px;padding:20px;margin:20px 0;text-align:center;">
    <div style="color:#2ECC71;font-size:22px;font-weight:900;">${dateLabel}</div>
    <div style="color:#fff;font-size:18px;font-weight:700;margin-top:6px;">${time} EAT (Nairobi)</div>
    <div style="color:#9CA3AF;font-size:13px;margin-top:4px;">Service: ${safeService}</div>
  </div>
  <p style="color:#9CA3AF;font-size:14px;">We will call you on <strong style="color:#fff;">${safePhone || "the number you provided"}</strong> or send you a video call link before the session.</p>
  <div style="display:flex;gap:12px;margin:24px 0;">
    <a href="https://wa.me/254792837632" style="flex:1;display:block;background:rgba(37,168,94,0.15);border:1px solid rgba(37,168,94,0.3);color:#2ECC71;padding:12px;border-radius:10px;text-decoration:none;text-align:center;font-weight:700;font-size:13px;">💬 WhatsApp</a>
    <a href="tel:+254792837632" style="flex:1;display:block;background:rgba(13,81,140,0.2);border:1px solid rgba(13,81,140,0.3);color:#93c5fd;padding:12px;border-radius:10px;text-decoration:none;text-align:center;font-weight:700;font-size:13px;">📞 Call Us</a>
  </div>
  <p style="color:#6B7280;font-size:12px;text-align:center;">Need to reschedule? Reply to this email or WhatsApp us at least 2 hours before your session.<br/>© ${new Date().getFullYear()} Solvara Technologies · Nairobi, Kenya</p>
</div>`,
  });

  return NextResponse.json({ success: true, bookingRef }, { status: 200 });
}