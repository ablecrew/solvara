import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ─── Business configuration ────────────────────────────────── */

const WORKING_HOURS = {
  start: 8,
  end: 19,
};

const WORKING_DAYS = [0, 1, 2, 3, 4, 5]; // Sunday–Friday
const SLOT_DURATION = 30;
const ADVANCE_DAYS = 30;
const NAIROBI_TZ = "Africa/Nairobi";

/* ─── Types ──────────────────────────────────────────────────── */

type BookingRow = {
  id?: string;
  date: string;
  time: string;
  status: string;
};

type Slot = {
  time: string;
  available: boolean;
};

type DateAvailability = {
  date: string;
  label: string;
  dayName: string;
  available: boolean;
};

/* ─── Rate limit ─────────────────────────────────────────────── */

const rateMap = new Map<string, { count: number; resetAt: number }>();

function isLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, {
      count: 1,
      resetAt: now + 60_000,
    });

    return false;
  }

  if (entry.count >= 3) {
    return true;
  }

  entry.count++;
  return false;
}

/* ─── Helpers ────────────────────────────────────────────────── */

function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
        "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY"
    );
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

function getResend() {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    throw new Error("Missing RESEND_API_KEY");
  }

  return new Resend(resendApiKey);
}

function toNairobi(date: Date): Date {
  return new Date(
      date.toLocaleString("en-US", {
        timeZone: NAIROBI_TZ,
      })
  );
}

function formatDateForNairobi(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: NAIROBI_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const values = Object.fromEntries(
      parts.map(({ type, value }) => [type, value])
  );

  return `${values.year}-${values.month}-${values.day}`;
}

function isValidDateString(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function isValidTimeString(value: string): boolean {
  return /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(value);
}

function sanitize(value: unknown, maxLength = 500): string {
  return String(value ?? "")
      .trim()
      .replace(/<[^>]*>/g, "")
      .slice(0, maxLength);
}

function escapeHtml(value: string): string {
  return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
}

function buildSlots(
    dateString: string,
    bookedTimes: string[]
): Slot[] {
  const slots: Slot[] = [];
  const now = toNairobi(new Date());

  const targetDate = new Date(`${dateString}T00:00:00`);

  const isToday =
      targetDate.getFullYear() === now.getFullYear() &&
      targetDate.getMonth() === now.getMonth() &&
      targetDate.getDate() === now.getDate();

  for (
      let hour = WORKING_HOURS.start;
      hour < WORKING_HOURS.end;
      hour++
  ) {
    for (let minute = 0; minute < 60; minute += SLOT_DURATION) {
      if (
          isToday &&
          (hour < now.getHours() ||
              (hour === now.getHours() &&
                  minute <= now.getMinutes() + 60))
      ) {
        continue;
      }

      const time = `${String(hour).padStart(2, "0")}:${String(
          minute
      ).padStart(2, "0")}`;

      slots.push({
        time,
        available: !bookedTimes.includes(time),
      });
    }
  }

  return slots;
}

function getDateRange(): string[] {
  const dates: string[] = [];
  const now = toNairobi(new Date());

  for (let i = 1; i <= ADVANCE_DAYS; i++) {
    const date = new Date(now);
    date.setDate(now.getDate() + i);

    if (WORKING_DAYS.includes(date.getDay())) {
      dates.push(formatDateForNairobi(date));
    }
  }

  return dates;
}

function getDateLabel(dateString: string): string {
  return new Date(`${dateString}T00:00:00`).toLocaleDateString(
      "en-KE",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: NAIROBI_TZ,
      }
  );
}

/* ─── GET — available dates and slots ───────────────────────── */

export async function GET(req: NextRequest) {
  try {
    const supabase = getSupabaseAdmin();
    const requestedDate = req.nextUrl.searchParams.get("date");

    if (
        requestedDate &&
        !isValidDateString(requestedDate)
    ) {
      return NextResponse.json(
          {
            error: "Invalid date format. Use YYYY-MM-DD.",
          },
          { status: 400 }
      );
    }

    if (requestedDate) {
      const { data, error } = await supabase
          .from("bookings")
          .select("time")
          .eq("date", requestedDate)
          .eq("status", "confirmed");

      if (error) {
        console.error("Availability query error:", error);

        return NextResponse.json(
            {
              error: "Unable to load available slots.",
            },
            { status: 500 }
        );
      }

      const bookedTimes = (data ?? []).map(
          (row: { time: string }) => row.time
      );

      return NextResponse.json({
        date: requestedDate,
        slots: buildSlots(requestedDate, bookedTimes),
      });
    }

    const availableDates = getDateRange();
    const firstDate = availableDates[0];
    const lastDate = availableDates[availableDates.length - 1];

    if (!firstDate || !lastDate) {
      return NextResponse.json({
        dates: [],
      });
    }

    const { data, error } = await supabase
        .from("bookings")
        .select("date, time, status")
        .eq("status", "confirmed")
        .gte("date", firstDate)
        .lte("date", lastDate);

    if (error) {
      console.error("Date availability query error:", error);

      return NextResponse.json(
          {
            error: "Unable to load available dates.",
          },
          { status: 500 }
      );
    }

    const bookingsByDate = new Map<string, BookingRow[]>();

    for (const booking of (data ?? []) as BookingRow[]) {
      const existing = bookingsByDate.get(booking.date) ?? [];
      existing.push(booking);
      bookingsByDate.set(booking.date, existing);
    }

    const totalSlots = buildSlots(firstDate, []).length;

    const dates: DateAvailability[] = availableDates.map(
        (dateString) => {
          const bookedTimes =
              bookingsByDate
                  .get(dateString)
                  ?.map((booking) => booking.time) ?? [];

          return {
            date: dateString,
            label: getDateLabel(dateString),
            dayName: new Date(
                `${dateString}T00:00:00`
            ).toLocaleDateString("en-KE", {
              weekday: "long",
            }),
            available: bookedTimes.length < totalSlots,
          };
        }
    );

    return NextResponse.json({ dates });
  } catch (error) {
    console.error("Availability API error:", error);

    return NextResponse.json(
        {
          error: "Unable to load booking availability.",
        },
        { status: 500 }
    );
  }
}

/* ─── POST — create booking ─────────────────────────────────── */

export async function POST(req: NextRequest) {
  const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";

  if (isLimited(ip)) {
    return NextResponse.json(
        {
          error: "Too many requests. Please wait.",
        },
        { status: 429 }
    );
  }

  try {
    const supabase = getSupabaseAdmin();
    const resend = getResend();

    const body = await req.json();

    const {
      name,
      email,
      phone,
      service,
      date,
      time,
      notes,
    } = body;

    if (!name || !email || !date || !time || !service) {
      return NextResponse.json(
          {
            error: "Please fill in all required fields.",
          },
          { status: 400 }
      );
    }

    if (
        typeof email !== "string" ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return NextResponse.json(
          {
            error: "Invalid email address.",
          },
          { status: 400 }
      );
    }

    if (
        typeof date !== "string" ||
        !isValidDateString(date)
    ) {
      return NextResponse.json(
          {
            error: "Invalid date.",
          },
          { status: 400 }
      );
    }

    if (
        typeof time !== "string" ||
        !isValidTimeString(time)
    ) {
      return NextResponse.json(
          {
            error: "Invalid time.",
          },
          { status: 400 }
      );
    }

    const safeName = sanitize(name, 120);
    const safeEmail = sanitize(email, 200);
    const safePhone = sanitize(phone, 40);
    const safeService = sanitize(service, 160);
    const safeNotes = sanitize(notes, 1000);

    const requestedDate = new Date(`${date}T00:00:00`);
    const now = toNairobi(new Date());

    if (requestedDate < new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
    )) {
      return NextResponse.json(
          {
            error: "Please select a future date.",
          },
          { status: 400 }
      );
    }

    const bookingRef = `SOL-${Date.now()
        .toString(36)
        .toUpperCase()}`;

    /*
     * Check whether the requested slot is already occupied.
     * A unique database constraint must still exist to prevent
     * race conditions between simultaneous requests.
     */
    const { data: conflict, error: conflictError } =
        await supabase
            .from("bookings")
            .select("id")
            .eq("date", date)
            .eq("time", time)
            .eq("status", "confirmed")
            .maybeSingle();

    if (conflictError) {
      console.error("Booking conflict check error:", conflictError);

      return NextResponse.json(
          {
            error: "Unable to verify this time slot.",
          },
          { status: 500 }
      );
    }

    if (conflict) {
      return NextResponse.json(
          {
            error:
                "This slot was just taken. Please choose another time.",
          },
          { status: 409 }
      );
    }

    const { error: insertError } = await supabase
        .from("bookings")
        .insert({
          booking_ref: bookingRef,
          name: safeName,
          email: safeEmail,
          phone: safePhone || null,
          service: safeService,
          date,
          time,
          notes: safeNotes || null,
          status: "confirmed",
        });

    if (insertError) {
      if (insertError.code === "23505") {
        return NextResponse.json(
            {
              error:
                  "This slot was just taken. Please choose another time.",
            },
            { status: 409 }
        );
      }

      console.error("Booking insert error:", insertError);

      return NextResponse.json(
          {
            error: "Booking failed. Please try again.",
          },
          { status: 500 }
      );
    }

    const dateLabel = getDateLabel(date);

    const emailName = escapeHtml(safeName);
    const emailAddress = escapeHtml(safeEmail);
    const emailPhone = escapeHtml(
        safePhone || "Not provided"
    );
    const emailService = escapeHtml(safeService);
    const emailNotes = escapeHtml(safeNotes);
    const emailBookingRef = escapeHtml(bookingRef);

    const teamEmail = await resend.emails.send({
      from: "Solvara Bookings <noreply@solvara.tech>",
      to: [
        "solutions.solvara@gmail.com",
        "tonnyonyango79@gmail.com",
      ],
      replyTo: safeEmail,
      subject: `New Booking: ${safeService} — ${dateLabel} at ${time} EAT`,
      html: `
<div style="font-family:Arial,sans-serif;background:#0A0E1A;color:#fff;padding:32px;border-radius:16px;max-width:600px;margin:0 auto;">
  <div style="background:linear-gradient(135deg,#0D518C,#1A6BB5);padding:24px;border-radius:12px;margin-bottom:20px;">
    <h2 style="margin:0;color:#fff;font-weight:900;">New Consultation Booked</h2>
    <p style="margin:8px 0 0;color:rgba(255,255,255,0.75);font-size:14px;">
      Booking Ref: <strong>${emailBookingRef}</strong>
    </p>
  </div>

  <div style="background:rgba(46,204,113,0.08);border:1px solid rgba(46,204,113,0.2);border-radius:12px;padding:18px;margin-bottom:20px;">
    <div style="color:#2ECC71;font-size:20px;font-weight:900;">${escapeHtml(dateLabel)}</div>
    <div style="color:#fff;font-size:16px;font-weight:700;margin-top:4px;">${escapeHtml(time)} EAT (Nairobi)</div>
    <div style="color:#9CA3AF;font-size:13px;margin-top:4px;">Service: ${emailService}</div>
  </div>

  <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
    <tr>
      <td style="padding:8px 0;border-bottom:1px solid #1A2540;color:#9CA3AF;font-size:13px;width:80px;">Name</td>
      <td style="padding:8px 0;border-bottom:1px solid #1A2540;color:#fff;font-size:13px;font-weight:600;">${emailName}</td>
    </tr>
    <tr>
      <td style="padding:8px 0;border-bottom:1px solid #1A2540;color:#9CA3AF;font-size:13px;">Email</td>
      <td style="padding:8px 0;border-bottom:1px solid #1A2540;color:#fff;font-size:13px;font-weight:600;">${emailAddress}</td>
    </tr>
    <tr>
      <td style="padding:8px 0;border-bottom:1px solid #1A2540;color:#9CA3AF;font-size:13px;">Phone</td>
      <td style="padding:8px 0;border-bottom:1px solid #1A2540;color:#fff;font-size:13px;font-weight:600;">${emailPhone}</td>
    </tr>
  </table>

  ${
          safeNotes
              ? `
  <div style="background:#0F1629;border:1px solid #1A2540;border-radius:10px;padding:14px;margin-bottom:20px;">
    <div style="color:#6B7280;font-size:11px;font-weight:700;text-transform:uppercase;margin-bottom:6px;">Notes</div>
    <div style="color:#D1D5DB;font-size:13px;">${emailNotes}</div>
  </div>
  `
              : ""
      }

  <a
    href="mailto:${encodeURIComponent(safeEmail)}?subject=${encodeURIComponent(
          `Your Solvara Consultation — ${dateLabel} at ${time}`
      )}"
    style="display:block;background:#2ECC71;color:#0A0E1A;font-weight:900;padding:14px;border-radius:10px;text-decoration:none;text-align:center;font-size:15px;"
  >
    Reply to ${emailName} →
  </a>
</div>
      `,
    });

    if (teamEmail.error) {
      console.error("Team email error:", teamEmail.error);
    }

    const clientEmail = await resend.emails.send({
      from: "Solvara Solutions <noreply@solvara.tech>",
      to: [safeEmail],
      subject: `Consultation Confirmed — ${dateLabel} at ${time} EAT`,
      html: `
<div style="font-family:Arial,sans-serif;background:#0A0E1A;color:#fff;padding:32px;border-radius:16px;max-width:520px;margin:0 auto;">
  <div style="background:linear-gradient(135deg,#0D518C,#1A6BB5);padding:28px;border-radius:12px;text-align:center;margin-bottom:24px;">
    <div style="font-size:40px;margin-bottom:8px;">📅</div>
    <h2 style="margin:0;color:#fff;font-weight:900;">Consultation Confirmed!</h2>
    <p style="margin:6px 0 0;color:rgba(255,255,255,0.7);font-size:13px;">
      Ref: <strong>${emailBookingRef}</strong>
    </p>
  </div>

  <p style="color:#D1D5DB;font-size:15px;">
    Hi <strong>${escapeHtml(safeName.split(" ")[0])}</strong>, your free consultation is confirmed!
  </p>

  <div style="background:rgba(46,204,113,0.08);border:1px solid rgba(46,204,113,0.2);border-radius:12px;padding:20px;text-align:center;margin:20px 0;">
    <div style="color:#2ECC71;font-size:20px;font-weight:900;">${escapeHtml(dateLabel)}</div>
    <div style="color:#fff;font-size:18px;font-weight:700;margin-top:6px;">${escapeHtml(time)} EAT (Nairobi)</div>
    <div style="color:#9CA3AF;font-size:13px;margin-top:4px;">${emailService}</div>
  </div>

  <p style="color:#9CA3AF;font-size:14px;">
    We will call you on <strong style="color:#fff;">${emailPhone}</strong>
    or send a video call link before the session.
  </p>

  <div style="display:flex;gap:12px;margin:24px 0;">
    <a href="https://wa.me/254792837632"
      style="flex:1;display:block;background:rgba(37,168,94,0.15);border:1px solid rgba(37,168,94,0.3);color:#2ECC71;padding:12px;border-radius:10px;text-decoration:none;text-align:center;font-weight:700;font-size:13px;">
      WhatsApp
    </a>

    <a href="tel:+254792837632"
      style="flex:1;display:block;background:rgba(13,81,140,0.2);border:1px solid rgba(13,81,140,0.3);color:#93c5fd;padding:12px;border-radius:10px;text-decoration:none;text-align:center;font-weight:700;font-size:13px;">
      +254 792 837 632
    </a>
  </div>

  <p style="color:#6B7280;font-size:12px;text-align:center;">
    Need to reschedule? WhatsApp us at least 2 hours before your session.<br />
    © ${new Date().getFullYear()} Solvara Solutions · Nairobi, Kenya
  </p>
</div>
      `,
    });

    if (clientEmail.error) {
      console.error("Client confirmation email error:", clientEmail.error);
    }

    return NextResponse.json(
        {
          success: true,
          bookingRef,
        },
        { status: 200 }
    );
  } catch (error) {
    console.error("Booking API error:", error);

    return NextResponse.json(
        {
          error: "Booking service unavailable. Please try again.",
        },
        { status: 500 }
    );
  }
}