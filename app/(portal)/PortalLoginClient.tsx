"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, ArrowRight, CheckCircle2, Shield, Lock } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function PortalLoginClient() {
    const [email,   setEmail]   = useState("");
    const [status,  setStatus]  = useState<"idle" | "loading" | "sent" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setStatus("loading");
        setMessage("");

        const supabase = createClient();
        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: `${window.location.origin}/portal/dashboard`,
                shouldCreateUser: false, // only existing clients can log in
            },
        });

        if (error) {
            setStatus("error");
            setMessage(
                error.message.includes("not found") || error.message.includes("User not found")
                    ? "No portal account found for this email. Please contact Solvara to set up your client access."
                    : error.message
            );
        } else {
            setStatus("sent");
        }
    };

    return (
        <div className="bg-[#0A0E1A] min-h-screen flex items-center justify-center px-4">
            {/* Grid bg */}
            <div aria-hidden className="fixed inset-0 opacity-[0.06] pointer-events-none"
                 style={{ backgroundImage: "linear-gradient(rgba(13,81,140,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(13,81,140,0.5) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
            <div aria-hidden className="fixed top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none opacity-30"
                 style={{ background: "radial-gradient(circle,rgba(13,81,140,0.15) 0%,transparent 70%)", filter: "blur(80px)" }} />

            <div className="relative z-10 w-full max-w-md">

                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-3 group mb-6">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl text-white transition-transform group-hover:scale-110"
                             style={{ background: "linear-gradient(135deg,#0D518C,#2ECC71)" }}>
                            S
                        </div>
                        <div className="text-left">
                            <div className="text-white font-black text-xl">SOLVARA</div>
                            <div className="text-xs font-semibold tracking-widest" style={{ color: "#2ECC71" }}>CLIENT PORTAL</div>
                        </div>
                    </Link>
                </div>

                {/* Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl overflow-hidden"
                    style={{ background: "#0F1629", border: "1px solid #1A2540", boxShadow: "0 24px 60px rgba(0,0,0,0.4)" }}
                >
                    {/* Header */}
                    <div className="px-8 py-7" style={{ borderBottom: "1px solid #1A2540", background: "rgba(13,81,140,0.1)" }}>
                        <div className="flex items-center gap-3 mb-1">
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                                 style={{ background: "rgba(46,204,113,0.15)", border: "1px solid rgba(46,204,113,0.25)" }}>
                                <Lock size={18} style={{ color: "#2ECC71" }} />
                            </div>
                            <h1 className="text-white font-black text-xl">Client Login</h1>
                        </div>
                        <p className="text-gray-400 text-sm mt-1 ml-12">
                            We'll send a secure magic link to your email — no password needed.
                        </p>
                    </div>

                    <div className="px-8 py-8">
                        {status === "sent" ? (
                            /* ── Success state ── */
                            <motion.div
                                initial={{ opacity: 0, scale: 0.96 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-4"
                            >
                                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                                     style={{ background: "rgba(46,204,113,0.15)", border: "2px solid rgba(46,204,113,0.4)", boxShadow: "0 0 30px rgba(46,204,113,0.2)" }}>
                                    <CheckCircle2 size={32} style={{ color: "#2ECC71" }} />
                                </div>
                                <h2 className="text-white font-black text-xl mb-3">Check Your Email!</h2>
                                <p className="text-gray-400 text-sm leading-relaxed mb-2">
                                    We sent a magic link to <strong className="text-white">{email}</strong>
                                </p>
                                <p className="text-gray-500 text-xs mb-6">
                                    Click the link in the email to access your portal. The link expires in 10 minutes.
                                </p>
                                <p className="text-gray-600 text-xs">
                                    Didn&apos;t receive it? Check your spam folder or{" "}
                                    <button onClick={() => setStatus("idle")} className="underline" style={{ color: "#2ECC71" }}>
                                        try again
                                    </button>
                                </p>
                            </motion.div>
                        ) : (
                            /* ── Login form ── */
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest mb-2"
                                           style={{ color: "rgba(255,255,255,0.4)" }}>
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            placeholder="your@email.com"
                                            className="w-full pl-11 pr-4 py-3.5 rounded-xl text-white text-sm placeholder-gray-500 outline-none transition-all"
                                            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid #1A2540" }}
                                            onFocus={(e) => (e.target.style.borderColor = "#2ECC71")}
                                            onBlur={(e) => (e.target.style.borderColor = "#1A2540")}
                                        />
                                    </div>
                                </div>

                                {status === "error" && (
                                    <div className="flex items-start gap-2 px-4 py-3 rounded-xl text-sm"
                                         style={{ background: "rgba(231,76,60,0.1)", border: "1px solid rgba(231,76,60,0.25)", color: "#f87171" }}>
                                        ⚠️ {message}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === "loading" || !email}
                                    className="w-full flex items-center justify-center gap-2 font-bold py-3.5 rounded-xl text-base transition-all hover:scale-[1.02] disabled:opacity-50"
                                    style={{ background: "#2ECC71", color: "#0A0E1A", boxShadow: "0 0 24px rgba(46,204,113,0.3)" }}
                                >
                                    {status === "loading" ? (
                                        <><div className="w-5 h-5 border-2 border-[#0A0E1A]/30 border-t-[#0A0E1A] rounded-full animate-spin" /> Sending Link...</>
                                    ) : (
                                        <>Send Magic Link <ArrowRight size={18} /></>
                                    )}
                                </button>

                                {/* Security note */}
                                <div className="flex items-start gap-2 p-3 rounded-xl"
                                     style={{ background: "rgba(255,255,255,0.03)", border: "1px solid #1A2540" }}>
                                    <Shield size={14} style={{ color: "#2ECC71" }} className="shrink-0 mt-0.5" />
                                    <p className="text-gray-500 text-xs leading-relaxed">
                                        Only registered Solvara clients can access the portal. Access is set up by our team when your project starts.
                                    </p>
                                </div>
                            </form>
                        )}
                    </div>
                </motion.div>

                {/* Links */}
                <div className="flex justify-between mt-6 text-xs text-gray-600">
                    <Link href="/" className="hover:text-white transition-colors">← Back to Website</Link>
                    <a href="mailto:solvarasolutions@gmail.com" className="hover:text-white transition-colors">Need access? Contact us</a>
                </div>
            </div>
        </div>
    );
}