"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, ArrowRight } from "lucide-react";

type Variant = "banner" | "inline" | "card";

export default function NewsletterSignup({ variant = "card" }: { variant?: Variant }) {
    const [email,     setEmail]     = useState("");
    const [name,      setName]      = useState("");
    const [status,    setStatus]    = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message,   setMessage]   = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setStatus("loading");
        setMessage("");

        try {
            const res  = await fetch("/api/newsletter", {
                method:  "POST",
                headers: { "Content-Type": "application/json" },
                body:    JSON.stringify({ email, name }),
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
            setStatus("success");
            setEmail("");
            setName("");
        } catch (err: unknown) {
            setStatus("error");
            setMessage(err instanceof Error ? err.message : "Failed. Please try again.");
        }
    };

    /* ── Success state (shared) ── */
    if (status === "success") {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center gap-3 text-center py-6"
            >
                <div className="w-14 h-14 rounded-full flex items-center justify-center"
                     style={{ background: "rgba(46,204,113,0.15)", border: "2px solid rgba(46,204,113,0.4)" }}>
                    <CheckCircle2 size={28} style={{ color: "#2ECC71" }} />
                </div>
                <div>
                    <p className="text-white font-bold">You&apos;re subscribed! 🎉</p>
                    <p className="text-gray-400 text-sm mt-1">Check your inbox for a welcome email from Solvara.</p>
                </div>
            </motion.div>
        );
    }

    /* ── Banner variant ── */
    if (variant === "banner") {
        return (
            <section style={{ padding: "4rem 1.5rem", background: "linear-gradient(135deg,rgba(13,81,140,0.2),rgba(46,204,113,0.06))", borderTop: "1px solid #1A2540" }}>
                <div className="w-full max-w-[900px] mx-auto px-4 sm:px-6">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-1 text-center md:text-left">
                            <div className="text-3xl mb-3">📬</div>
                            <h2 className="text-white font-black text-2xl sm:text-3xl mb-2">
                                Get Weekly Insights — Free
                            </h2>
                            <p className="text-gray-400 leading-relaxed">
                                Web development tips, digital growth strategies and Solvara case studies. Delivered to your inbox every week. No spam, ever.
                            </p>
                        </div>
                        <form onSubmit={handleSubmit} className="w-full md:w-auto flex flex-col gap-3 min-w-[300px]">
                            <input
                                type="text" value={name} onChange={(e) => setName(e.target.value)}
                                placeholder="Your name (optional)"
                                className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-gray-500 outline-none"
                                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid #1A2540" }}
                                onFocus={(e) => (e.target.style.borderColor = "#2ECC71")}
                                onBlur={(e) => (e.target.style.borderColor = "#1A2540")}
                            />
                            <div className="flex gap-2">
                                <input
                                    type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                                    placeholder="your@email.com"
                                    className="flex-1 px-4 py-3 rounded-xl text-white text-sm placeholder-gray-500 outline-none"
                                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid #1A2540" }}
                                    onFocus={(e) => (e.target.style.borderColor = "#2ECC71")}
                                    onBlur={(e) => (e.target.style.borderColor = "#1A2540")}
                                />
                                <button type="submit" disabled={status === "loading"}
                                        className="flex items-center gap-2 font-bold px-5 py-3 rounded-xl transition-all hover:scale-105 disabled:opacity-60 shrink-0"
                                        style={{ background: "#2ECC71", color: "#0A0E1A" }}>
                                    {status === "loading"
                                        ? <div className="w-4 h-4 border-2 border-[#0A0E1A]/30 border-t-[#0A0E1A] rounded-full animate-spin" />
                                        : <Send size={16} />}
                                </button>
                            </div>
                            {status === "error" && (
                                <p className="text-red-400 text-xs">{message}</p>
                            )}
                            <p className="text-gray-600 text-xs">
                                Join 500+ subscribers · Unsubscribe any time
                            </p>
                        </form>
                    </div>
                </div>
            </section>
        );
    }

    /* ── Inline variant (sidebar) ── */
    if (variant === "inline") {
        return (
            <form onSubmit={handleSubmit} className="space-y-2">
                <input
                    type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                    placeholder="Your email address"
                    className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-gray-500 outline-none"
                    style={{ background: "rgba(10,14,26,0.6)", border: "1px solid #1A2540" }}
                    onFocus={(e) => (e.target.style.borderColor = "#2ECC71")}
                    onBlur={(e) => (e.target.style.borderColor = "#1A2540")}
                />
                <button type="submit" disabled={status === "loading"}
                        className="w-full flex items-center justify-center gap-2 font-bold py-3 rounded-xl text-sm transition-all hover:scale-105 disabled:opacity-60"
                        style={{ background: "#2ECC71", color: "#0A0E1A" }}>
                    {status === "loading"
                        ? <div className="w-4 h-4 border-2 border-[#0A0E1A]/30 border-t-[#0A0E1A] rounded-full animate-spin" />
                        : <><Send size={14} /> Subscribe Free</>}
                </button>
                {status === "error" && <p className="text-red-400 text-xs">{message}</p>}
            </form>
        );
    }

    /* ── Card variant (default) ── */
    return (
        <div className="rounded-2xl p-6 relative overflow-hidden"
             style={{ background: "linear-gradient(135deg,rgba(13,81,140,0.3),rgba(46,204,113,0.1))", border: "1px solid rgba(46,204,113,0.2)" }}>
            <div className="text-3xl mb-3">📬</div>
            <h3 className="text-white font-bold mb-1">Get Weekly Insights</h3>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                Join 500+ subscribers getting our best articles, tips and case studies every week.
            </p>
            <form onSubmit={handleSubmit} className="space-y-2">
                <input
                    type="text" value={name} onChange={(e) => setName(e.target.value)}
                    placeholder="Your name (optional)"
                    className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-gray-500 outline-none"
                    style={{ background: "rgba(10,14,26,0.6)", border: "1px solid #1A2540" }}
                    onFocus={(e) => (e.target.style.borderColor = "#2ECC71")}
                    onBlur={(e) => (e.target.style.borderColor = "#1A2540")}
                />
                <input
                    type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-gray-500 outline-none"
                    style={{ background: "rgba(10,14,26,0.6)", border: "1px solid #1A2540" }}
                    onFocus={(e) => (e.target.style.borderColor = "#2ECC71")}
                    onBlur={(e) => (e.target.style.borderColor = "#1A2540")}
                />
                <button type="submit" disabled={status === "loading"}
                        className="w-full flex items-center justify-center gap-2 font-bold py-3 rounded-xl text-sm transition-all hover:scale-105 disabled:opacity-60"
                        style={{ background: "#2ECC71", color: "#0A0E1A" }}>
                    {status === "loading"
                        ? <div className="w-4 h-4 border-2 border-[#0A0E1A]/30 border-t-[#0A0E1A] rounded-full animate-spin" />
                        : <><Send size={14} /> Subscribe — It&apos;s Free</>}
                </button>
                {status === "error" && <p className="text-red-400 text-xs mt-1">{message}</p>}
            </form>
            <p className="text-gray-600 text-xs text-center mt-3">No spam · Unsubscribe any time</p>
        </div>
    );
}