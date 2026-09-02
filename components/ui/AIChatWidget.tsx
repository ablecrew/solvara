"use client";

import { useState, useEffect, useRef, useCallback, type KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  Loader2,
  RotateCcw,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";

/* ─── Types ──────────────────────────────────────────────────── */

type Role = "user" | "assistant";

type Msg = {
  id: string;
  role: Role;
  content: string;
  ts: Date;
};

/* ─── Constants ──────────────────────────────────────────────── */

const BOOKING_URL = "https://solvarasolutions.vercel.app/book";

const SUGGESTIONS = [
  "What services do you offer?",
  "How does your Discovery Sprint work?",
  "What's your pricing approach?",
  "Book a free consultation",
  "Do you work with international clients?",
  "Can I see your portfolio?",
];

/* ─── Markdown renderer ─────────────────────────────────────── */

const markdownComponents: Components = {
  p: ({ children }) => (
      <p className="mb-2 last:mb-0 leading-6">{children}</p>
  ),

  ul: ({ children }) => (
      <ul className="my-2 list-disc space-y-1 pl-5">{children}</ul>
  ),

  ol: ({ children }) => (
      <ol className="my-2 list-decimal space-y-1 pl-5">{children}</ol>
  ),

  li: ({ children }) => <li className="pl-1">{children}</li>,

  strong: ({ children }) => (
      <strong className="font-bold text-white">{children}</strong>
  ),

  em: ({ children }) => <em className="italic">{children}</em>,

  a: ({ href, children }) => {
    const isExternal = href?.startsWith("http");

    return (
        <a
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="font-semibold text-[#2ECC71] underline decoration-[#2ECC71]/40 underline-offset-2 transition hover:text-white hover:decoration-[#2ECC71]"
        >
          {children}
        </a>
    );
  },

  blockquote: ({ children }) => (
      <blockquote className="my-3 border-l-2 border-[#2ECC71] pl-3 italic text-slate-300">
        {children}
      </blockquote>
  ),

  code: ({ children }) => (
      <code className="rounded-md bg-white/10 px-1.5 py-0.5 font-mono text-[12px] text-[#93c5fd]">
        {children}
      </code>
  ),

  pre: ({ children }) => (
      <pre className="my-3 overflow-x-auto rounded-xl bg-black/30 p-3 text-xs">
      {children}
    </pre>
  ),
};

/* ─── Helpers ────────────────────────────────────────────────── */

function createId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/**
 * Ensures the booking URL is displayed as "book"
 * even if the model accidentally returns the raw URL.
 */
function normalizeAssistantContent(text: string): string {
  return text.replace(
      /(?<!\]\()https:\/\/solvarasolutions\.vercel\.app\/book\/?/gi,
      `[book](${BOOKING_URL})`
  );
}

/* ─── Widget ─────────────────────────────────────────────────── */

export default function AIChatWidget() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [error, setError] = useState("");
  const [showSugg, setShowSugg] = useState(true);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* ─── Client mount ────────────────────────────────────────── */

  useEffect(() => {
    setMounted(true);

    const pulseStart = setTimeout(() => setPulse(true), 6000);
    const pulseEnd = setTimeout(() => setPulse(false), 10000);

    return () => {
      clearTimeout(pulseStart);
      clearTimeout(pulseEnd);
    };
  }, []);

  /* ─── Greeting ─────────────────────────────────────────────── */

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          id: "greet",
          role: "assistant",
          content:
              "👋 Hi! I'm **Sola**, Solvara's assistant.\n\nWhat would you like to know about our software consultancy?",
          ts: new Date(),
        },
      ]);
    }

    if (open) {
      const focusTimer = setTimeout(() => {
        inputRef.current?.focus();
      }, 300);

      return () => clearTimeout(focusTimer);
    }
  }, [open, messages.length]);

  /* ─── Auto-scroll ──────────────────────────────────────────── */

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, loading]);

  /* ─── Send message ─────────────────────────────────────────── */

  const sendMessage = useCallback(
      async (text: string) => {
        const content = text.trim();

        if (!content || loading) {
          return;
        }

        setShowSugg(false);
        setError("");
        setInput("");

        const userMessage: Msg = {
          id: createId(),
          role: "user",
          content,
          ts: new Date(),
        };

        const updatedMessages = [...messages, userMessage];

        setMessages(updatedMessages);
        setLoading(true);

        try {
          const history = updatedMessages.map((message) => ({
            role: message.role,
            content: message.content,
          }));

          const response = await fetch("/api/ai-chat", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              messages: history,
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(
                data?.error ||
                "AI is temporarily unavailable. Please try again."
            );
          }

          const assistantContent =
              typeof data?.message === "string"
                  ? normalizeAssistantContent(data.message)
                  : "I'm having trouble responding. Please contact us on WhatsApp.";

          const assistantMessage: Msg = {
            id: createId(),
            role: "assistant",
            content: assistantContent,
            ts: new Date(),
          };

          setMessages((currentMessages) => [
            ...currentMessages,
            assistantMessage,
          ]);
        } catch (requestError: unknown) {
          console.error("AI chat request failed:", requestError);

          setError(
              requestError instanceof Error
                  ? requestError.message
                  : "Something went wrong."
          );
        } finally {
          setLoading(false);
        }
      },
      [loading, messages]
  );

  /* ─── Keyboard handling ───────────────────────────────────── */

  function handleKey(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      void sendMessage(input);
    }
  }

  /* ─── Reset conversation ──────────────────────────────────── */

  function reset() {
    setMessages([]);
    setShowSugg(true);
    setError("");
    setInput("");
  }

  if (!mounted) {
    return null;
  }

  return (
      <div
          className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3"
          style={{ maxWidth: "calc(100vw - 3rem)" }}
      >
        {/* Chat window */}
        <AnimatePresence>
          {open && (
              <motion.div
                  initial={{ opacity: 0, scale: 0.92, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 16 }}
                  transition={{ type: "spring", damping: 22, stiffness: 280 }}
                  className="flex flex-col overflow-hidden rounded-2xl"
                  style={{
                    width: "min(390px, calc(100vw - 3rem))",
                    height: "min(600px, calc(100vh - 120px))",
                    background: "#0F1629",
                    border: "1px solid #1A2540",
                    boxShadow:
                        "0 16px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(46,204,113,0.1)",
                  }}
              >
                {/* Header */}
                <div
                    className="flex shrink-0 items-center justify-between px-4 py-3.5"
                    style={{
                      background: "linear-gradient(135deg,#0D518C,#2ECC71)",
                      borderBottom: "1px solid rgba(255,255,255,0.1)",
                    }}
                >
                  <div className="flex items-center gap-3">
                    <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-lg font-black"
                        style={{
                          background: "rgba(10,14,26,0.6)",
                          boxShadow: "0 0 12px rgba(46,204,113,0.3)",
                        }}
                    >
                      <span className="text-white">S</span>
                    </div>

                    <div>
                      <div className="text-sm font-bold leading-tight text-white">
                        Sola
                      </div>

                      <div className="flex items-center gap-1.5">
                        <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
                        <span className="text-xs text-white/80">
                      Solvara AI Assistant
                    </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                        type="button"
                        onClick={reset}
                        title="New conversation"
                        aria-label="New conversation"
                        className="rounded-lg p-2 text-white/60 transition-all hover:bg-white/10 hover:text-white"
                    >
                      <RotateCcw size={15} />
                    </button>

                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        title="Close chat"
                        aria-label="Close chat"
                        className="rounded-lg p-2 text-white/60 transition-all hover:bg-white/10 hover:text-white"
                    >
                      <X size={17} />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div
                    className="flex-1 space-y-4 overflow-y-auto px-4 py-4"
                    style={{
                      scrollbarWidth: "thin",
                      scrollbarColor: "#1A2540 transparent",
                    }}
                >
                  {messages.map((message) => {
                    const isUser = message.role === "user";

                    return (
                        <div
                            key={message.id}
                            className={`flex gap-2.5 ${
                                isUser ? "flex-row-reverse" : "flex-row"
                            }`}
                        >
                          {/* Avatar */}
                          <div
                              className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                              style={
                                isUser
                                    ? {
                                      background: "rgba(255,255,255,0.1)",
                                    }
                                    : {
                                      background:
                                          "linear-gradient(135deg,#0D518C,#2ECC71)",
                                      fontSize: 12,
                                      fontWeight: 900,
                                      color: "#fff",
                                    }
                              }
                          >
                            {isUser ? (
                                <UserRound size={14} className="text-gray-400" />
                            ) : (
                                "S"
                            )}
                          </div>

                          {/* Bubble */}
                          <div className="max-w-[84%]">
                            <div
                                className="rounded-2xl px-3.5 py-2.5 text-sm"
                                style={
                                  isUser
                                      ? {
                                        background: "#2ECC71",
                                        color: "#0A0E1A",
                                        borderTopRightRadius: 4,
                                      }
                                      : {
                                        background: "rgba(46,204,113,0.08)",
                                        border:
                                            "1px solid rgba(46,204,113,0.15)",
                                        color: "#E2E8F0",
                                        borderTopLeftRadius: 4,
                                      }
                                }
                            >
                              {isUser ? (
                                  <p className="whitespace-pre-wrap leading-6">
                                    {message.content}
                                  </p>
                              ) : (
                                  <ReactMarkdown components={markdownComponents}>
                                    {message.content}
                                  </ReactMarkdown>
                              )}
                            </div>

                            <div
                                className={`mt-1 text-[10px] text-gray-600 ${
                                    isUser ? "text-right" : "text-left"
                                }`}
                            >
                              {message.ts.toLocaleTimeString("en-KE", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                          </div>
                        </div>
                    );
                  })}

                  {/* Loading indicator */}
                  {loading && (
                      <div className="flex gap-2.5">
                        <div
                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-black text-white"
                            style={{
                              background:
                                  "linear-gradient(135deg,#0D518C,#2ECC71)",
                            }}
                        >
                          S
                        </div>

                        <div
                            className="rounded-2xl rounded-bl-sm px-4 py-3"
                            style={{
                              background: "rgba(46,204,113,0.08)",
                              border: "1px solid rgba(46,204,113,0.15)",
                            }}
                        >
                          <div className="flex h-4 items-center gap-1">
                            {[0, 1, 2].map((index) => (
                                <motion.div
                                    key={index}
                                    className="h-1.5 w-1.5 rounded-full"
                                    style={{ background: "#2ECC71" }}
                                    animate={{
                                      opacity: [0.3, 1, 0.3],
                                      scale: [0.8, 1, 0.8],
                                    }}
                                    transition={{
                                      duration: 1,
                                      repeat: Infinity,
                                      delay: index * 0.2,
                                    }}
                                />
                            ))}
                          </div>
                        </div>
                      </div>
                  )}

                  {/* Error */}
                  {error && (
                      <div
                          className="flex items-start gap-2 rounded-xl px-3 py-2 text-xs"
                          style={{
                            background: "rgba(231,76,60,0.1)",
                            border: "1px solid rgba(231,76,60,0.3)",
                            color: "#f87171",
                          }}
                      >
                        <span>⚠️</span>

                        <span className="flex-1">{error}</span>

                        <a
                            href="https://wa.me/254792837632"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 underline"
                            style={{ color: "#2ECC71" }}
                        >
                          WhatsApp us
                        </a>
                      </div>
                  )}

                  <div ref={bottomRef} />
                </div>

                {/* Suggestions */}
                <AnimatePresence>
                  {showSugg && messages.length <= 1 && (
                      <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="shrink-0 overflow-hidden px-4 pb-3"
                      >
                        <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-gray-600">
                          Quick Questions
                        </p>

                        <div className="flex flex-wrap gap-1.5">
                          {SUGGESTIONS.map((suggestion) => {
                            const isBooking =
                                suggestion === "Book a free consultation";

                            if (isBooking) {
                              return (
                                  <Link
                                      key={suggestion}
                                      href="/book"
                                      onClick={() => setOpen(false)}
                                      className="rounded-full px-3 py-1.5 text-xs font-medium transition-all hover:scale-105"
                                      style={{
                                        background: "rgba(46,204,113,0.15)",
                                        color: "#2ECC71",
                                        border:
                                            "1px solid rgba(46,204,113,0.3)",
                                      }}
                                  >
                                    📅 {suggestion}
                                  </Link>
                              );
                            }

                            return (
                                <button
                                    key={suggestion}
                                    type="button"
                                    onClick={() => void sendMessage(suggestion)}
                                    className="rounded-full px-3 py-1.5 text-left text-xs font-medium text-blue-200 transition-all hover:scale-105"
                                    style={{
                                      background: "rgba(46,204,113,0.08)",
                                      border:
                                          "1px solid rgba(46,204,113,0.15)",
                                    }}
                                >
                                  {suggestion}
                                </button>
                            );
                          })}
                        </div>
                      </motion.div>
                  )}
                </AnimatePresence>

                {/* Input */}
                <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      void sendMessage(input);
                    }}
                    className="shrink-0 px-4 pb-4 pt-2"
                    style={{ borderTop: "1px solid #1A2540" }}
                >
                  <div className="flex items-center gap-2">
                    <input
                        ref={inputRef}
                        value={input}
                        onChange={(event) => setInput(event.target.value)}
                        onKeyDown={handleKey}
                        placeholder="Ask about our consultancy..."
                        disabled={loading}
                        maxLength={2000}
                        className="flex-1 rounded-xl px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-gray-500 disabled:opacity-60"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid #1A2540",
                        }}
                        onFocus={(event) => {
                          event.currentTarget.style.borderColor = "#2ECC71";
                        }}
                        onBlur={(event) => {
                          event.currentTarget.style.borderColor = "#1A2540";
                        }}
                    />

                    <button
                        type="submit"
                        disabled={!input.trim() || loading}
                        aria-label="Send message"
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all hover:scale-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                        style={{
                          background:
                              input.trim() && !loading ? "#2ECC71" : "#1A2540",
                        }}
                    >
                      {loading ? (
                          <Loader2 size={16} className="animate-spin text-gray-400" />
                      ) : (
                          <Send
                              size={16}
                              style={{
                                color: input.trim() ? "#0A0E1A" : "#6B7280",
                              }}
                          />
                      )}
                    </button>
                  </div>

                  <p className="mt-2 text-center text-[10px] text-gray-700">
                    Powered by{" "}
                    <span className="text-gray-500">Solvara AI</span> ·{" "}
                    <a
                        href="https://wa.me/254792837632"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#2ECC71]"
                    >
                      WhatsApp us
                    </a>
                  </p>
                </form>
              </motion.div>
          )}
        </AnimatePresence>

        {/* Floating button */}
        <div className="relative">
          {!open && (
              <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-1 -top-1 z-10 flex h-5 w-5 items-center justify-center rounded-full"
                  style={{
                    background: "#2ECC71",
                    boxShadow: "0 0 8px rgba(46,204,113,0.6)",
                  }}
              >
                <span className="text-[9px] font-black text-[#0A0E1A]">AI</span>
              </motion.div>
          )}

          <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.1,
              }}
              type="button"
              onClick={() => setOpen((current) => !current)}
              aria-label={open ? "Close AI Chat" : "Open AI Chat"}
              className="relative flex h-14 w-14 items-center justify-center rounded-2xl transition-all hover:scale-110 active:scale-95"
              style={{
                background: open
                    ? "linear-gradient(135deg,#0A0E1A,#1A2540)"
                    : "linear-gradient(135deg,#0D518C,#2ECC71)",
                boxShadow: open
                    ? "0 4px 24px rgba(0,0,0,0.4)"
                    : `0 4px 24px rgba(46,204,113,0.5)${
                        pulse
                            ? ", 0 0 0 8px rgba(46,204,113,0.15)"
                            : ""
                    }`,
              }}
          >
            {pulse && !open && (
                <motion.span
                    className="absolute inset-0 rounded-2xl"
                    animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{ background: "rgba(46,204,113,0.3)" }}
                />
            )}

            <AnimatePresence mode="wait">
              {open ? (
                  <motion.div
                      key="close-icon"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                  >
                    <X size={22} className="text-white" />
                  </motion.div>
              ) : (
                  <motion.span
                      key="solvara-icon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      className="select-none text-[26px] font-black leading-none text-white"
                  >
                    S
                  </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {!open && (
              <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 3.5 }}
                  className="pointer-events-none absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap"
              >
                <div
                    className="rounded-lg px-3 py-1.5 text-xs font-semibold text-white shadow-lg"
                    style={{
                      background: "#0D518C",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
                    }}
                >
                  Chat with Sola AI

                  <div
                      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full border-4 border-transparent"
                      style={{ borderLeftColor: "#0D518C" }}
                  />
                </div>
              </motion.div>
          )}
        </div>
      </div>
  );
}