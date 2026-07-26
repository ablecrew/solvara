"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, RotateCcw, MessageCircle, Bot } from "lucide-react";
import Link from "next/link";

/* ─── Types ──────────────────────────────────────────────────── */
type Role = "user" | "assistant";
type Msg  = { id: string; role: Role; content: string; ts: Date };

/* ─── Suggested prompts ──────────────────────────────────────── */
const SUGGESTIONS = [
  "What services do you offer?",
  "How much does a website cost?",
  "Can I see your portfolio?",
  "Book a free consultation",
  "Do you integrate M-Pesa?",
];

/* ─── Markdown-lite renderer ─────────────────────────────────── */
function renderContent(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`(.*?)`/g, '<code style="background:rgba(255,255,255,0.1);padding:1px 5px;border-radius:4px;font-size:0.85em">$1</code>')
    .replace(/^• (.*)/gm, '<span style="display:block;padding-left:12px;position:relative;"><span style="position:absolute;left:0;color:#2ECC71">•</span>$1</span>')
    .replace(/\n/g, "<br/>");
}

/* ─── Widget ─────────────────────────────────────────────────── */
export default function AIChatWidget() {
  const [mounted, setMounted]     = useState(false);
  const [open, setOpen]           = useState(false);
  const [pulse, setPulse]         = useState(false);
  const [input, setInput]         = useState("");
  const [loading, setLoading]     = useState(false);
  const [messages, setMessages]   = useState<Msg[]>([]);
  const [error, setError]         = useState("");
  const [showSugg, setShowSugg]   = useState(true);
  const bottomRef                  = useRef<HTMLDivElement>(null);
  const inputRef                   = useRef<HTMLInputElement>(null);

  // Mount only on client — no SSR, prevents hydration mismatch
  useEffect(() => {
    setMounted(true);
    const t2 = setTimeout(() => setPulse(true),   6000);
    const t3 = setTimeout(() => setPulse(false), 10000);
    return () => { clearTimeout(t2); clearTimeout(t3); };
  }, []);

  // Greeting on first open
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{
        id: "greet",
        role: "assistant",
        content: "👋 Hi! I'm **Sola**, Solvara's AI assistant.\n\nI can help you with pricing, services, portfolio and booking a free consultation. What would you like to know?",
        ts: new Date(),
      }]);
    }
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open, messages.length]);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = useCallback(async (text: string) => {
    const content = text.trim();
    if (!content || loading) return;

    setShowSugg(false);
    setError("");
    setInput("");

    const userMsg: Msg = { id: Date.now().toString(), role: "user", content, ts: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const history = [...messages, userMsg].map((m) => ({ role: m.role, content: m.content }));
      const res  = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "AI unavailable.");

      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString() + "a", role: "assistant", content: data.message, ts: new Date() },
      ]);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [loading, messages]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
  };

  const reset = () => {
    setMessages([]);
    setShowSugg(true);
    setError("");
    setInput("");
  };

  // Return null on server — all hooks must be called before this guard
  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3" style={{ maxWidth: "calc(100vw - 3rem)" }}>

      {/* ── Chat window ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: "spring", damping: 22, stiffness: 280 }}
            className="rounded-2xl overflow-hidden flex flex-col"
            style={{
              width: "min(380px, calc(100vw - 3rem))",
              height: "min(560px, calc(100vh - 120px))",
              background: "#0F1629",
              border: "1px solid #1A2540",
              boxShadow: "0 16px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(13,81,140,0.2)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3.5 shrink-0"
              style={{ background: "linear-gradient(135deg,#0D518C,#1A6BB5)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-lg shrink-0"
                  style={{ background: "linear-gradient(135deg,#0D518C,#2ECC71)", boxShadow: "0 0 12px rgba(46,204,113,0.4)" }}>
                  <span className="text-white" style={{ fontFamily: "system-ui", fontSize: 18, fontWeight: 900 }}>S</span>
                </div>
                <div>
                  <div className="text-white font-bold text-sm leading-tight">Sola</div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-blue-100 text-xs">AI Assistant · Solvara</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={reset} title="New conversation"
                  className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all">
                  <RotateCcw size={14} />
                </button>
                <button onClick={() => setOpen(false)}
                  className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all">
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
              style={{ scrollbarWidth: "thin", scrollbarColor: "#1A2540 transparent" }}>
              {messages.map((m) => (
                <div key={m.id} className={`flex gap-2.5 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  {/* Avatar */}
                  {m.role === "assistant" && (
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: "linear-gradient(135deg,#0D518C,#2ECC71)", fontSize: 12, fontWeight: 900, color: "#fff" }}>
                      S
                    </div>
                  )}
                  {m.role === "user" && (
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: "rgba(255,255,255,0.1)" }}>
                      <Bot size={14} className="text-gray-400" />
                    </div>
                  )}

                  {/* Bubble */}
                  <div className="max-w-[82%]">
                    <div
                      className="px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed"
                      style={m.role === "assistant"
                        ? { background: "rgba(13,81,140,0.2)", border: "1px solid rgba(13,81,140,0.3)", color: "#E2E8F0", borderTopLeftRadius: 4 }
                        : { background: "#0D518C", color: "#fff", borderTopRightRadius: 4 }}
                      dangerouslySetInnerHTML={{ __html: renderContent(m.content) }}
                    />
                    <div className={`text-[10px] text-gray-600 mt-1 ${m.role === "user" ? "text-right" : "text-left"}`}>
                      {m.ts.toLocaleTimeString("en-KE", { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                </div>
              ))}

              {/* Loading dots */}
              {loading && (
                <div className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "linear-gradient(135deg,#0D518C,#2ECC71)", fontSize: 12, fontWeight: 900, color: "#fff" }}>S</div>
                  <div className="px-4 py-3 rounded-2xl" style={{ background: "rgba(13,81,140,0.2)", border: "1px solid rgba(13,81,140,0.3)", borderTopLeftRadius: 4 }}>
                    <div className="flex gap-1 items-center h-4">
                      {[0, 1, 2].map((i) => (
                        <motion.div key={i} className="w-1.5 h-1.5 rounded-full"
                          style={{ background: "#2ECC71" }}
                          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="text-xs px-3 py-2 rounded-xl flex items-start gap-2"
                  style={{ background: "rgba(231,76,60,0.1)", border: "1px solid rgba(231,76,60,0.3)", color: "#f87171" }}>
                  ⚠️ {error}
                  <a href="https://wa.me/254792837632" target="_blank" rel="noopener noreferrer"
                    className="underline shrink-0" style={{ color: "#2ECC71" }}>WhatsApp us</a>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Suggestions */}
            <AnimatePresence>
              {showSugg && messages.length <= 1 && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  className="px-4 pb-3 shrink-0 overflow-hidden">
                  <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest mb-2">Quick Questions</p>
                  <div className="flex flex-wrap gap-1.5">
                    {SUGGESTIONS.map((s) => (
                      s === "Book a free consultation"
                        ? <Link key={s} href="/book"
                            className="text-xs px-3 py-1.5 rounded-full font-medium transition-all hover:scale-105"
                            style={{ background: "rgba(46,204,113,0.15)", color: "#2ECC71", border: "1px solid rgba(46,204,113,0.3)" }}>
                            📅 {s}
                          </Link>
                        : <button key={s} onClick={() => sendMessage(s)}
                            className="text-xs px-3 py-1.5 rounded-full font-medium transition-all hover:scale-105 text-left"
                            style={{ background: "rgba(13,81,140,0.15)", color: "#93c5fd", border: "1px solid rgba(13,81,140,0.3)" }}>
                            {s}
                          </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input */}
            <div className="px-4 pb-4 pt-2 shrink-0" style={{ borderTop: "1px solid #1A2540" }}>
              <div className="flex gap-2 items-end">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Ask me anything about Solvara..."
                  disabled={loading}
                  className="flex-1 px-4 py-3 rounded-xl text-white text-sm placeholder-gray-500 outline-none transition-all resize-none disabled:opacity-60"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid #1A2540" }}
                  onFocus={(e) => (e.target.style.borderColor = "#2ECC71")}
                  onBlur={(e) => (e.target.style.borderColor = "#1A2540")}
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || loading}
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all hover:scale-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: input.trim() && !loading ? "#2ECC71" : "#1A2540" }}
                >
                  {loading
                    ? <Loader2 size={16} className="animate-spin text-gray-400" />
                    : <Send size={16} style={{ color: input.trim() ? "#0A0E1A" : "#6B7280" }} />}
                </button>
              </div>
              <p className="text-gray-700 text-[10px] text-center mt-2">
                Powered by <span className="text-gray-500">Solvara AI</span> · <a href="https://wa.me/254792837632" target="_blank" rel="noopener noreferrer" className="text-[#2ECC71]">WhatsApp us</a> for complex queries
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating S button ── */}
      <div className="relative">
        {/* Notification dot when closed */}
        {!open && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center z-10"
            style={{ background: "#E74C3C", boxShadow: "0 0 8px rgba(231,76,60,0.6)" }}>
            <span className="text-white text-[9px] font-black">AI</span>
          </motion.div>
        )}

        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
          onClick={() => setOpen(!open)}
          className="relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
          style={{
            background: open
              ? "linear-gradient(135deg,#093D6B,#0D518C)"
              : "linear-gradient(135deg,#0D518C,#1A6BB5)",
            boxShadow: open
              ? "0 4px 24px rgba(13,81,140,0.4)"
              : `0 4px 24px rgba(13,81,140,0.5)${pulse ? ", 0 0 0 8px rgba(13,81,140,0.15)" : ""}`,
          }}
          aria-label={open ? "Close AI Chat" : "Open AI Chat"}
        >
          {/* Pulse ring */}
          {pulse && !open && (
            <motion.span
              className="absolute inset-0 rounded-2xl"
              animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ background: "rgba(13,81,140,0.4)" }}
            />
          )}

          <AnimatePresence mode="wait">
            {open ? (
              <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <X size={22} className="text-white" />
              </motion.div>
            ) : (
              <motion.div key="s" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <span
                  className="text-white select-none"
                  style={{ fontSize: 26, fontWeight: 900, fontFamily: "system-ui, sans-serif", lineHeight: 1 }}
                >
                  S
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Tooltip */}
        {!open && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 3.5 }}
            className="absolute right-16 top-1/2 -translate-y-1/2 pointer-events-none whitespace-nowrap"
          >
            <div className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white shadow-lg"
              style={{ background: "#0D518C", boxShadow: "0 4px 16px rgba(0,0,0,0.4)" }}>
              Chat with Sola AI
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full border-4 border-transparent"
                style={{ borderLeftColor: "#0D518C" }} />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}