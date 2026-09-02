import { NextRequest, NextResponse } from "next/server";
import { retrieveKnowledge } from "@/lib/ai/retrieveKnowledge";

export const runtime = "nodejs";

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

  if (entry.count >= 20) {
    return true;
  }

  entry.count++;
  return false;
}

/* ─── System prompt ─────────────────────────────────────────── */

const SYSTEM = `You are Sola, the AI assistant for Solvara Solutions — a global software consultancy and engineering firm headquartered in Nairobi, Kenya.

Your personality: friendly, knowledgeable, concise, and genuinely helpful. You speak naturally, not like a robot. You're an expert in software engineering, architecture, and digital transformation.

ABOUT SOLVARA:
- We are a custom software development and consulting agency serving clients globally across North America, Europe, Africa, Asia, and the Middle East.
- Services: Discovery & Strategy Sprint, MVP & Startup Launch, Full-Scale Platform Development, AI & Automation Solutions, Legacy Modernization & Security, Dedicated Team Retainer
- Global presence: USA, UK, Germany, UAE, Kenya, Singapore, and more.
- Team: Duke Teddy (CEO & CTO), Otieno Tonny (Director of Engineering), Daltone Dande (Creative Director)
- Contact: +254 707 528 980 | +254 792 837 632 | solutions.solvara@gmail.com
- WhatsApp: wa.me/254792837632
- Location: Nairobi, Kenya (serving clients worldwide)
- Live projects: MediCore (healthcare platform), EduSync (school management + AI), Eventify (ticketing system), Watalii Podcast, MC AOL Portfolio, OnPoint Cyber

OUR SERVICES:
1. Discovery & Strategy Sprint — 4-week engagement to analyze needs, design architecture, deliver wireframes, and provide a fixed-price project quote.
2. MVP & Startup Launch — Fast-track your product to market with scalable, cloud-native foundations.
3. Full-Scale Platform Development — Enterprise-grade custom platforms with multi-tenant architecture, advanced APIs, and SLA-backed reliability.
4. AI & Automation Solutions — Custom AI/ML models, NLP, predictive analytics, computer vision, and intelligent process automation.
5. Legacy Modernization & Security — Zero-downtime cloud migration, security audits, penetration testing, and compliance implementation including GDPR, HIPAA, and SOC2.
6. Dedicated Team Retainer — Full-time dedicated engineers, agile delivery, and flexible scaling.

PRICING PHILOSOPHY:
- We believe in value-based pricing, not hourly rates.
- Every project is unique — we provide fixed-price quotes after a Discovery Sprint.
- For detailed pricing information specific to your project requirements, we provide a comprehensive brochure upon request. This brochure includes all service packages, investment ranges, and add-on options tailored to different business needs. Contact us to request your copy.
- We work in USD, EUR, GBP, and KES.
- Payment terms: 50% deposit, 50% on delivery, customized for enterprise clients.

BOOKING:
Users can [book](https://solvarasolutions.vercel.app/book) a free 30-minute consultation at any time.

YOUR RULES:
1. Keep responses SHORT, normally 2-4 sentences unless the user asks for detail. Use bullet points for lists.
2. Always offer to help further or suggest booking a free consultation.
3. If asked about pricing, explain our philosophy: "We provide fixed-price quotes after understanding your specific needs. Start with a Discovery Sprint to get clarity and a guaranteed quote." Give the typical investment ranges above.
4. Never give exact quotes. Always say: "We can give you an accurate quote after a Discovery Sprint."
5. If asked something you don't know about Solvara, say: "I'm not sure — let me connect you with the team" and provide the contact details.
6. Never make up project details or client names.
7. When relevant, mention: "You can [book](https://solvarasolutions.vercel.app/book) a free consultation."
8. Be warm and conversational — this is a chat, not a manual.
9. If the user seems ready to start a project, encourage them to book a Discovery Sprint or contact the team directly.
10. Do not discuss topics unrelated to Solvara, software development, AI, cloud architecture, or digital transformation.
11. Always respond in the same language the user writes in.
12. Emphasize Solvara's global reach and world-class engineering capabilities.`;

/* ─── Groq configuration ───────────────────────────────────── */

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_BASE_URL = "https://api.groq.com/openai/v1";

// Current Groq model
const MODEL = "openai/gpt-oss-120b";

/* ─── Types ─────────────────────────────────────────────────── */

type ChatRole = "user" | "assistant";

type ChatMessage = {
  role: ChatRole;
  content: string;
};

/* ─── Retry helper ──────────────────────────────────────────── */

async function fetchWithRetry(
    url: string,
    options: RequestInit,
    retries = 2,
    delay = 1000
): Promise<Response> {
  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 30_000);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Retry temporary Groq errors and rate limits.
      if (
          (response.status === 429 || response.status >= 500) &&
          attempt < retries
      ) {
        const retryAfterHeader = response.headers.get("retry-after");
        const retryAfter = retryAfterHeader
            ? Number(retryAfterHeader) * 1000
            : delay * 2 ** attempt;

        await new Promise((resolve) => setTimeout(resolve, retryAfter));
        continue;
      }

      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      lastError = error;

      if (attempt < retries) {
        await new Promise((resolve) =>
            setTimeout(resolve, delay * 2 ** attempt)
        );
        continue;
      }
    }
  }

  throw lastError instanceof Error
      ? lastError
      : new Error("Groq request failed");
}

/* ─── POST handler ──────────────────────────────────────────── */

export async function POST(req: NextRequest) {
  const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isLimited(ip)) {
    return NextResponse.json(
        {
          error: "Too many messages. Please wait a moment.",
        },
        { status: 429 }
    );
  }

  if (!GROQ_API_KEY) {
    console.error("GROQ_API_KEY is missing.");

    return NextResponse.json(
        {
          error: "AI service is not configured.",
        },
        { status: 500 }
    );
  }

  try {
    const body = await req.json();
    const messages = body?.messages;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
          {
            error: "Invalid request.",
          },
          { status: 400 }
      );
    }

    const history: ChatMessage[] = messages
        .slice(-10)
        .filter((message: unknown): message is ChatMessage => {
          if (!message || typeof message !== "object") {
            return false;
          }

          const item = message as Record<string, unknown>;

          return (
              (item.role === "user" || item.role === "assistant") &&
              typeof item.content === "string"
          );
        })
        .map((message: ChatMessage) => ({
          role: message.role,
          content: message.content.slice(0, 1000),
        }));

    if (history.length === 0) {
      return NextResponse.json(
          {
            error: "No valid messages were provided.",
          },
          { status: 400 }
      );
    }

      const lastUserMessage = [...history]
          .reverse()
          .find((message) => message.role === "user");

      const knowledgeDocuments = await retrieveKnowledge(
          lastUserMessage?.content ?? ""
      );

      const databaseContext =
          knowledgeDocuments.length > 0
              ? knowledgeDocuments
                  .map(
                      (document) =>
                          `Category: ${document.category}
Title: ${document.title}
Content: ${document.content}`
                  )
                  .join("\n\n")
              : "No relevant information was found in the Solvara knowledge base.";

      const databaseAwareSystemPrompt = `${SYSTEM}

DATABASE CONTEXT:
${databaseContext}

DATABASE RULES:
- Use the database context as the source of truth for Solvara information.
- Do not invent services, prices, projects, team members, or company facts.
- If the answer is not in the database context, say:
  "I'm not sure — let me connect you with the team."
- For booking, use this Markdown link:
  [book](https://solvarasolutions.vercel.app/book)
`;

    const response = await fetchWithRetry(
        `${GROQ_BASE_URL}/chat/completions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${GROQ_API_KEY}`,
          },
          body: JSON.stringify({
            model: MODEL,
              messages: [
                  {
                      role: "system",
                      content: databaseAwareSystemPrompt,
                  },
                  ...history,
              ],
            temperature: 0.7,
            max_tokens: 400,
          }),
        }
    );

    if (!response.ok) {
      const errorText = await response.text();

      console.error("Groq API error:", {
        status: response.status,
        statusText: response.statusText,
        model: MODEL,
        body: errorText,
      });

      return NextResponse.json(
          {
            error:
                "AI is temporarily unavailable. Please contact us directly on WhatsApp: +254 792 837 632",
            ...(process.env.NODE_ENV === "development"
                ? {
                  providerStatus: response.status,
                  providerError: errorText,
                }
                : {}),
          },
          { status: 502 }
      );
    }

    const data = await response.json();

    const text =
        data?.choices?.[0]?.message?.content ??
        "I'm having trouble responding. Please contact us on WhatsApp.";

    return NextResponse.json(
        {
          message: text,
        },
        {
          status: 200,
          headers: {
            "Cache-Control": "no-store",
          },
        }
    );
  } catch (error: unknown) {
    console.error("AI Chat error:", error);

    if (error instanceof Error && error.name === "AbortError") {
      return NextResponse.json(
          {
            error:
                "The AI is taking too long. Please try again or contact us on WhatsApp.",
          },
          { status: 504 }
      );
    }

    return NextResponse.json(
        {
          error:
              "AI service unavailable. Please contact us directly on WhatsApp: +254 792 837 632",
        },
        { status: 502 }
    );
  }
}