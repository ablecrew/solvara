import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const rateMap = new Map<string, { count: number; resetAt: number }>();
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  if (entry.count >= 2) return true;
  entry.count++;
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Too many requests." }, { status: 429 });
    }

    const { email } = await req.json();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const safeEmail = String(email).trim().slice(0, 254);

    // Notify team
    await resend.emails.send({
      from: "Solvara Newsletter <noreply@solvara.tech>",
      to: ["solvarasolutions@gmail.com"],
      subject: `📬 New Newsletter Subscriber: ${safeEmail}`,
      html: `<div style="font-family:sans-serif;background:#0A0E1A;color:#fff;padding:24px;border-radius:12px;">
        <h2 style="color:#2ECC71;margin:0 0 12px;">New Subscriber!</h2>
        <p style="color:#9CA3AF;margin:0;"><strong style="color:#fff;">${safeEmail}</strong> just subscribed to the Solvara newsletter.</p>
        <p style="color:#6B7280;font-size:12px;margin-top:16px;">Add to your mailing list in Mailchimp/Brevo.</p>
      </div>`,
    });

    // Welcome email to subscriber
    await resend.emails.send({
      from: "Solvara Technologies <noreply@solvara.tech>",
      to: [safeEmail],
      subject: "🎉 Welcome to the Solvara Newsletter!",
      html: `<div style="font-family:sans-serif;background:#0A0E1A;color:#fff;padding:32px;border-radius:16px;max-width:520px;margin:0 auto;">
        <div style="background:linear-gradient(135deg,#0D518C,#1A6BB5);padding:24px;border-radius:12px;text-align:center;margin-bottom:24px;">
          <div style="font-size:36px;margin-bottom:8px;">📬</div>
          <h1 style="color:#fff;font-size:22px;font-weight:900;margin:0;">You're subscribed!</h1>
          <p style="color:rgba(255,255,255,0.75);margin:8px 0 0;font-size:14px;">Welcome to the Solvara insider list</p>
        </div>
        <p style="color:#D1D5DB;font-size:15px;line-height:1.7;">You'll now receive our best articles on web development, SEO, e-commerce and digital growth — straight to your inbox, once a week. No spam, ever.</p>
        <div style="background:#0F1629;border:1px solid #1A2540;border-radius:12px;padding:16px;margin:20px 0;">
          <p style="color:#9CA3AF;font-size:13px;margin:0;">While you wait for your first issue, explore our work:</p>
          <a href="https://solvara.vercel.app/portfolio" style="display:inline-block;margin-top:12px;background:#2ECC71;color:#0A0E1A;font-weight:700;padding:10px 24px;border-radius:8px;text-decoration:none;font-size:13px;">View Our Portfolio →</a>
        </div>
        <p style="color:#6B7280;font-size:12px;text-align:center;margin:0;">© ${new Date().getFullYear()} Solvara Technologies · Nairobi, Kenya</p>
      </div>`,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json({ error: "Failed to subscribe. Please try again." }, { status: 500 });
  }
}