import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_LIST_ID = Number(process.env.BREVO_LIST_ID ?? "2");

/* ─── Rate limit ─────────────────────────────────────────────── */
const rateMap = new Map<string, { count: number; resetAt: number }>();
function isLimited(ip: string) {
  const now = Date.now();
  const e   = rateMap.get(ip);
  if (!e || now > e.resetAt) { rateMap.set(ip, { count: 1, resetAt: now + 60_000 }); return false; }
  if (e.count >= 2) return true;
  e.count++;
  return false;
}

async function addToBrevo(email: string): Promise<boolean> {
  if (!BREVO_API_KEY) return false;
  try {
    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify({
        email,
        listIds: [BREVO_LIST_ID],
        updateEnabled: true,           // update if contact exists
        attributes: {
          SOURCE: "Solvara Website",
          SIGNUP_DATE: new Date().toISOString().split("T")[0],
        },
      }),
    });
    return res.ok || res.status === 204;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isLimited(ip)) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  const { email, name } = await req.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const safeEmail = String(email).trim().slice(0, 254);
  const safeName  = String(name ?? "").trim().slice(0, 100);

  /* 1. Add to Brevo contact list */
  const addedToBrevo = await addToBrevo(safeEmail);

  /* 2. Send welcome email via Resend regardless */
  await resend.emails.send({
    from: "Solvara Technologies <noreply@solvara.tech>",
    to:   [safeEmail],
    subject: "🎉 Welcome to the Solvara Newsletter!",
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#0A0E1A;font-family:Inter,system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0E1A;padding:32px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#0F1629;border-radius:16px;overflow:hidden;border:1px solid #1A2540;max-width:560px;width:100%;">
        <tr>
          <td style="background:linear-gradient(135deg,#0D518C,#1A6BB5);padding:32px;text-align:center;">
            <div style="background:linear-gradient(135deg,#0D518C,#2ECC71);width:52px;height:52px;border-radius:14px;display:inline-flex;align-items:center;justify-content:center;font-weight:900;color:#fff;font-size:24px;margin-bottom:14px;">S</div>
            <div style="color:#fff;font-size:24px;font-weight:900;">Welcome aboard! 🎉</div>
            <div style="color:rgba(255,255,255,0.7);font-size:14px;margin-top:6px;">You're now part of the Solvara insider list</div>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 32px;">
            <p style="color:#D1D5DB;font-size:15px;line-height:1.7;margin:0 0 16px;">
              Hi${safeName ? ` <strong style="color:#fff">${safeName}</strong>` : " there"}! 👋
            </p>
            <p style="color:#9CA3AF;font-size:14px;line-height:1.7;margin:0 0 20px;">
              Thanks for subscribing to the Solvara newsletter. Every week you'll get:
            </p>
            <div style="background:#0A0E1A;border:1px solid #1A2540;border-radius:12px;padding:18px;margin-bottom:24px;">
              ${["🛠 Web development guides & tutorials","💡 Digital growth tips for Kenyan businesses","📊 Case studies from our client projects","🔔 Solvara news, offers and announcements"].map(
        (item) => `<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;color:#D1D5DB;font-size:13px;">${item}</div>`
    ).join("")}
            </div>
            <p style="color:#9CA3AF;font-size:13px;margin:0 0 24px;">
              Emails arrive once a week — no spam, ever. Unsubscribe any time with one click.
            </p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td width="50%" style="padding-right:6px;">
                  <a href="https://solvarasolutions.vercel.app/portfolio" style="display:block;background:#2ECC71;color:#0A0E1A;font-weight:900;padding:12px;border-radius:10px;text-decoration:none;text-align:center;font-size:13px;">
                    🚀 View Our Work
                  </a>
                </td>
                <td width="50%" style="padding-left:6px;">
                  <a href="https://solvarasolutions.vercel.app/book" style="display:block;background:rgba(13,81,140,0.3);border:1px solid rgba(13,81,140,0.4);color:#93c5fd;font-weight:700;padding:12px;border-radius:10px;text-decoration:none;text-align:center;font-size:13px;">
                    📅 Book Free Call
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 32px;border-top:1px solid #1A2540;text-align:center;">
            <p style="color:#4B5563;font-size:11px;margin:0;">
              © ${new Date().getFullYear()} Solvara Solutions · Nairobi, Kenya<br/>
              <a href="https://solvarasolutions.vercel.app" style="color:#2ECC71;text-decoration:none;">solvara.vercel.app</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  });

  /* 3. Notify team */
  await resend.emails.send({
    from: "Solvara Newsletter <noreply@solvara.tech>",
    to:   ["solutions.solvara@gmail.com"],
    subject: `📬 New Subscriber: ${safeEmail}`,
    html: `<div style="font-family:sans-serif;background:#0A0E1A;color:#fff;padding:24px;border-radius:12px;">
      <h2 style="color:#2ECC71;margin:0 0 12px;">New Newsletter Subscriber</h2>
      <p style="color:#9CA3AF;margin:0;"><strong style="color:#fff;">${safeEmail}</strong>${safeName ? ` (${safeName})` : ""}</p>
      <p style="color:#6B7280;font-size:12px;margin-top:12px;">Added to Brevo: ${addedToBrevo ? "✅ Yes" : "⚠️ No — check manually"}</p>
    </div>`,
  });

  return NextResponse.json({ success: true }, { status: 200 });
}