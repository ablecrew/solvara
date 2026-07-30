import { NextRequest, NextResponse } from "next/server";

/* ─── Rate limit ─────────────────────────────────────────────── */
const rateMap = new Map<string, { count: number; resetAt: number }>();
function isLimited(ip: string) {
  const now = Date.now();
  const e = rateMap.get(ip);
  if (!e || now > e.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  if (e.count >= 20) return true; // 20 messages/min per IP
  e.count++;
  return false;
}

/* ─── System prompt ─────────────────────────────────────────── */
const SYSTEM = `You are Sola, the AI assistant for Solvara Solutions — a software and design agency based in Nairobi, Kenya.

Your personality: friendly, knowledgeable, concise, and genuinely helpful. You speak naturally, not like a robot.

ABOUT SOLVARA:
- Services: Business/Corporate websites, E-Commerce (M-Pesa integration), Hospital/Clinic systems, Government portals, Custom web apps, Graphic Design, UI/UX Design
- Team: Duke Teddy (CEO & CTO), Otieno Tonny (Director of Engineering), Daltone Dande (Creative Director)
- Contact: +254 707 528 980 | +254 792 837 632 | solvarasolutions@gmail.com
- WhatsApp: wa.me/254792837632
- Location: Nairobi, Kenya
- Live projects: MediCore (healthcare), EduSync (school management + AI), Eventify (ticketing), Watalii Podcast, MC AOL Portfolio, OnPoint Cyber

PRICING (always be transparent):
- Graphic Design: KES 500 (standard) | KES 1,000 (professional) | KES 5,000+ (brand pack)
- Personal/Portfolio website: KES 8,000 – 32,000
- Business/Corporate website: KES 20,000 – 96,000
- E-Commerce: KES 32,000 – 150,000+
- Hospital/Clinic system: KES 64,000 – 150,000+
- Government/Institutional: KES 40,000 – 150,000+
- Custom Web App: KES 80,000 – 480,000+
- UI/UX Design: KES 8,000 – 120,000
- Payment: 50% deposit, 50% on delivery
- Custom Mobile Application: KES 90,000 – 150,000+

BOOKING: Users can book a free 30-min consultation at /book

YOUR RULES:
1. Keep responses SHORT (2-4 sentences max unless asked for detail). Use bullet points for lists.
2. Always offer to help further or suggest booking a consultation.
3. If asked about pricing, give the honest KES range from above.
4. If asked something you don't know about Solvara, say "I'm not sure — let me connect you with the team" and provide contact details.
5. Never make up project details or client names.
6. When relevant, mention booking: "You can book a free call at solvarasolutions.vercel.app/book"
7. Be warm and conversational — this is a chat, not a manual.
8. If the user seems ready to start a project, encourage them to book or contact directly.
9. Do not discuss topics unrelated to Solvara, mobile development, web development, design, or tech in general.
10. Always respond in the same language the user writes in.`;

const GROQ_API_KEY = process.env.GROQ_API_KEY ?? "";
const GROQ_BASE_URL = "https://api.groq.com/openai/v1";
const MODEL = "llama-3.3-70b-versatile";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isLimited(ip)) {
    return NextResponse.json({ error: "Too many messages. Please wait a moment." }, { status: 429 });
  }

  const { messages } = await req.json();
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const history = messages.slice(-10).map((m: { role: string; content: string }) => ({
    role: m.role as "user" | "assistant",
    content: String(m.content).slice(0, 1000),
  }));

  const response = await fetch(`${GROQ_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: "system", content: SYSTEM }, ...history],
      temperature: 0.7,
      max_tokens: 400,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    console.error("Groq API error:", err);
    return NextResponse.json(
      { error: "AI is temporarily unavailable. Please contact us directly on WhatsApp: +254 792 837 632" },
      { status: 502 }
    );
  }

  const data = await response.json();
  const text =
    data.choices?.[0]?.message?.content ??
    "I'm having trouble responding. Please contact us on WhatsApp.";

  return NextResponse.json({ message: text });
}