import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/* ─── Rate limiting (simple in-memory per IP) ──────────────── */
const rateMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + 60_000 }); // 1 min window
    return false;
  }
  if (entry.count >= 3) return true; // max 3 submissions per minute per IP
  entry.count++;
  return false;
}

/* ─── Input sanitisation ────────────────────────────────────── */
function sanitize(str: string): string {
  return String(str)
    .trim()
    .replace(/<[^>]*>/g, "") // strip HTML tags
    .slice(0, 2000);
}

export async function POST(req: NextRequest) {
  try {
    /* Rate limit */
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment before trying again." },
        { status: 429 }
      );
    }

    /* Parse body */
    const body = await req.json();
    const { name, email, phone, company, service, budget, timeline, message } = body;

    /* Validate required fields */
    if (!name || !email || !message || !service) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    /* Basic email format check */
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    /* Sanitize inputs */
    const safeName     = sanitize(name);
    const safeEmail    = sanitize(email);
    const safePhone    = sanitize(phone    ?? "Not provided");
    const safeCompany  = sanitize(company  ?? "Not provided");
    const safeService  = sanitize(service);
    const safeBudget   = sanitize(budget   ?? "Not specified");
    const safeTimeline = sanitize(timeline ?? "Not specified");
    const safeMessage  = sanitize(message);

    const timestamp = new Date().toLocaleString("en-KE", {
      timeZone: "Africa/Nairobi",
      dateStyle: "full",
      timeStyle: "short",
    });

    /* ── Email to Solvara team ─────────────────────────────── */
    await resend.emails.send({
      from: "Solvara Contact Form <noreply@solvara.tech>",
      to: ["solvarasolutions@gmail.com", "tonnyonyango79@gmail.com"],
      replyTo: safeEmail,
      subject: `🚀 New Enquiry: ${safeService} — ${safeName}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#0A0E1A;font-family:Inter,system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0E1A;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#0F1629;border-radius:16px;overflow:hidden;border:1px solid #1A2540;max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0D518C,#1A6BB5);padding:28px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="background:linear-gradient(135deg,#0D518C,#2ECC71);width:40px;height:40px;border-radius:10px;display:inline-flex;align-items:center;justify-content:center;font-weight:900;color:#fff;font-size:18px;margin-bottom:10px;">S</div>
                    <div style="color:#fff;font-size:20px;font-weight:900;letter-spacing:-0.5px;">SOLVARA Technologies</div>
                    <div style="color:rgba(255,255,255,0.7);font-size:13px;margin-top:2px;">New Project Enquiry Received</div>
                  </td>
                  <td align="right">
                    <div style="background:rgba(46,204,113,0.2);border:1px solid rgba(46,204,113,0.4);color:#2ECC71;padding:6px 14px;border-radius:20px;font-size:12px;font-weight:700;">NEW LEAD</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:28px 32px;">

              <p style="color:#9CA3AF;font-size:13px;margin:0 0 20px;">Received on <strong style="color:#fff;">${timestamp}</strong></p>

              <!-- Service highlight -->
              <div style="background:rgba(46,204,113,0.08);border:1px solid rgba(46,204,113,0.2);border-radius:12px;padding:16px 20px;margin-bottom:24px;">
                <div style="color:#9CA3AF;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:6px;">Service Requested</div>
                <div style="color:#2ECC71;font-size:18px;font-weight:900;">${safeService}</div>
                <div style="color:#9CA3AF;font-size:13px;margin-top:4px;">Budget: <strong style="color:#fff;">${safeBudget}</strong> &nbsp;·&nbsp; Timeline: <strong style="color:#fff;">${safeTimeline}</strong></div>
              </div>

              <!-- Client details grid -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td width="50%" style="padding-right:8px;padding-bottom:12px;">
                    <div style="background:#0A0E1A;border:1px solid #1A2540;border-radius:10px;padding:14px;">
                      <div style="color:#6B7280;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:4px;">Name</div>
                      <div style="color:#fff;font-size:14px;font-weight:600;">${safeName}</div>
                    </div>
                  </td>
                  <td width="50%" style="padding-left:8px;padding-bottom:12px;">
                    <div style="background:#0A0E1A;border:1px solid #1A2540;border-radius:10px;padding:14px;">
                      <div style="color:#6B7280;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:4px;">Email</div>
                      <div style="color:#2ECC71;font-size:14px;font-weight:600;">${safeEmail}</div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td width="50%" style="padding-right:8px;">
                    <div style="background:#0A0E1A;border:1px solid #1A2540;border-radius:10px;padding:14px;">
                      <div style="color:#6B7280;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:4px;">Phone</div>
                      <div style="color:#fff;font-size:14px;font-weight:600;">${safePhone}</div>
                    </div>
                  </td>
                  <td width="50%" style="padding-left:8px;">
                    <div style="background:#0A0E1A;border:1px solid #1A2540;border-radius:10px;padding:14px;">
                      <div style="color:#6B7280;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:4px;">Company</div>
                      <div style="color:#fff;font-size:14px;font-weight:600;">${safeCompany}</div>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <div style="background:#0A0E1A;border:1px solid #1A2540;border-radius:12px;padding:20px;margin-bottom:24px;">
                <div style="color:#6B7280;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:10px;">Project Description</div>
                <div style="color:#D1D5DB;font-size:14px;line-height:1.7;">${safeMessage.replace(/\n/g, "<br/>")}</div>
              </div>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="mailto:${safeEmail}?subject=Re: Your Solvara Enquiry - ${safeService}"
                      style="display:inline-block;background:#2ECC71;color:#0A0E1A;font-weight:900;padding:14px 32px;border-radius:12px;text-decoration:none;font-size:15px;">
                      Reply to ${safeName} →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:16px 32px;border-top:1px solid #1A2540;">
              <p style="color:#4B5563;font-size:11px;margin:0;text-align:center;">
                Solvara Technologies · solvarasolutions@gmail.com · +254 707 528 980
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    });

    /* ── Auto-reply to the client ──────────────────────────── */
    await resend.emails.send({
      from: "Solvara Technologies <noreply@solvara.tech>",
      to: [safeEmail],
      subject: `✅ We received your enquiry, ${safeName.split(" ")[0]}!`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
<body style="margin:0;padding:0;background:#0A0E1A;font-family:Inter,system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0E1A;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#0F1629;border-radius:16px;overflow:hidden;border:1px solid #1A2540;max-width:560px;width:100%;">

          <tr>
            <td style="background:linear-gradient(135deg,#0D518C,#1A6BB5);padding:28px 32px;text-align:center;">
              <div style="background:linear-gradient(135deg,#0D518C,#2ECC71);width:48px;height:48px;border-radius:12px;display:inline-flex;align-items:center;justify-content:center;font-weight:900;color:#fff;font-size:22px;margin-bottom:12px;">S</div>
              <div style="color:#fff;font-size:22px;font-weight:900;">Message Received! 🎉</div>
              <div style="color:rgba(255,255,255,0.75);font-size:14px;margin-top:6px;">We'll be in touch within 2 hours</div>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 32px;">
              <p style="color:#D1D5DB;font-size:15px;line-height:1.7;margin:0 0 20px;">
                Hi <strong style="color:#fff;">${safeName.split(" ")[0]}</strong>,
              </p>
              <p style="color:#9CA3AF;font-size:14px;line-height:1.7;margin:0 0 20px;">
                Thank you for reaching out to Solvara Technologies! We've received your enquiry about <strong style="color:#2ECC71;">${safeService}</strong> and our team is already reviewing it.
              </p>

              <!-- What happens next -->
              <div style="background:#0A0E1A;border:1px solid #1A2540;border-radius:12px;padding:20px;margin-bottom:24px;">
                <div style="color:#6B7280;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:14px;">What Happens Next</div>
                ${[
                  ["01", "#2ECC71", "Our team reviews your brief (≤ 2 hours)"],
                  ["02", "#0D518C", "We schedule a free 30-min discovery call"],
                  ["03", "#2ECC71", "We send you a detailed proposal & quote"],
                  ["04", "#0D518C", "We kick off your project — let's build!"],
                ]
                  .map(
                    ([n, c, t]) => `
                  <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;">
                    <div style="background:${c};color:#0A0E1A;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:11px;flex-shrink:0;">${n}</div>
                    <div style="color:#D1D5DB;font-size:13px;">${t}</div>
                  </div>`
                  )
                  .join("")}
              </div>

              <p style="color:#9CA3AF;font-size:13px;line-height:1.7;margin:0 0 24px;">
                Can't wait? Reach us directly on WhatsApp or call us now:
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td width="50%" style="padding-right:6px;">
                    <a href="https://wa.me/254707528980" style="display:block;background:rgba(37,165,94,0.15);border:1px solid rgba(37,165,94,0.3);color:#2ECC71;padding:12px;border-radius:10px;text-decoration:none;text-align:center;font-weight:700;font-size:13px;">
                      💬 WhatsApp Us
                    </a>
                  </td>
                  <td width="50%" style="padding-left:6px;">
                    <a href="tel:+254707528980" style="display:block;background:rgba(13,81,140,0.2);border:1px solid rgba(13,81,140,0.3);color:#93c5fd;padding:12px;border-radius:10px;text-decoration:none;text-align:center;font-weight:700;font-size:13px;">
                      📞 +254 707 528 980
                    </a>
                  </td>
                </tr>
              </table>

              <p style="color:#6B7280;font-size:12px;line-height:1.6;margin:0;">
                Your vision. Our expertise. Real results.<br/>
                — The Solvara Team
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:16px 32px;border-top:1px solid #1A2540;text-align:center;">
              <p style="color:#4B5563;font-size:11px;margin:0;">
                © ${new Date().getFullYear()} Solvara Technologies · Nairobi, Kenya<br/>
                <a href="https://solvara.vercel.app" style="color:#2ECC71;text-decoration:none;">solvara.vercel.app</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    });

    return NextResponse.json(
      { success: true, message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again or contact us directly on WhatsApp." },
      { status: 500 }
    );
  }
}