"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Play, CheckCircle2, Globe, Zap, Shield } from "lucide-react";

/* ─── Particle types ─────────────────────────────────────────── */
type Particle = {
  id: number;
  x: number; y: number;
  size: number;
  duration: number; delay: number;
  opacity: number;
  color: string;
};

/* ─── Particles rendered ONLY on the client ──────────────────── */
function Particles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = ["#2ECC71", "#0D518C", "#ffffff"];
    setParticles(
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 1,
        duration: Math.random() * 18 + 10,
        delay: Math.random() * 8,
        opacity: Math.random() * 0.5 + 0.1,
        color: colors[i % 3],
      }))
    );
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -28, 0],
            x: [0, Math.sin(p.id) * 16, 0],
            opacity: [p.opacity, Math.min(p.opacity * 1.6, 0.9), p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Static data ────────────────────────────────────────────── */
const HEADLINES = ["Real Results.", "Digital Growth.", "Powerful Websites."];

const STATS = [
  { value: "200+", label: "Projects Delivered" },
  { value: "98%",  label: "Client Satisfaction" },
  { value: "5★",   label: "Average Rating" },
  { value: "24/7", label: "Support Available" },
];

const BADGES = [
  { icon: Globe,  text: "Web Solutions" },
  { icon: Zap,    text: "Fast Delivery" },
  { icon: Shield, text: "Secure & Reliable" },
];

const FEATURES = [
  { icon: Globe,  label: "Modern Design" },
  { icon: Zap,    label: "High Performance" },
  { icon: Shield, label: "Reliable Support" },
];

/* ─── Hero ───────────────────────────────────────────────────── */
export default function Hero() {
  const { scrollY } = useScroll();
  const y1      = useTransform(scrollY, [0, 600], [0, 150]);
  const y2      = useTransform(scrollY, [0, 600], [0, -80]);
  const fadeOut = useTransform(scrollY, [0, 400], [1, 0]);

  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % HEADLINES.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#0A0E1A] pt-20">

      {/* Grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(13,81,140,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(13,81,140,0.4) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Parallax glow blobs */}
      <motion.div
        style={{ y: y1 }}
        aria-hidden
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: "radial-gradient(circle,rgba(13,81,140,0.28) 0%,transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </motion.div>
      <motion.div
        style={{ y: y2 }}
        aria-hidden
        className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: "radial-gradient(circle,rgba(46,204,113,0.14) 0%,transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </motion.div>

      {/* Client-only particles — no SSR, no hydration mismatch */}
      <Particles />

      {/* Floating stat orbs — desktop */}
      <motion.div
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute top-1/4 right-[8%] hidden xl:flex w-24 h-24 rounded-2xl items-center justify-center"
        style={{
          background: "rgba(13,81,140,0.15)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(13,81,140,0.3)",
        }}
      >
        <div className="text-center">
          <div className="font-black text-xl" style={{ color: "#2ECC71" }}>98%</div>
          <div className="text-gray-400 text-xs">Success</div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [8, -8, 8] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        className="absolute bottom-1/3 right-[4%] hidden xl:flex w-20 h-20 rounded-2xl items-center justify-center"
        style={{
          background: "rgba(13,81,140,0.15)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(13,81,140,0.25)",
        }}
      >
        <div className="text-center">
          <div className="text-white font-black text-lg">200+</div>
          <div className="text-gray-400 text-[10px]">Projects</div>
        </div>
      </motion.div>

      {/* ── Main content ── */}
      <motion.div
        style={{ opacity: fadeOut }}
        className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-6 py-16 grid lg:grid-cols-2 gap-12 items-center"
      >
        {/* LEFT */}
        <div>
          {/* Pill badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-6"
          >
            {BADGES.map((b) => (
              <div
                key={b.text}
                className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold"
                style={{
                  background: "rgba(46,204,113,0.1)",
                  border: "1px solid rgba(46,204,113,0.25)",
                  color: "#2ECC71",
                }}
              >
                <b.icon size={13} />
                {b.text}
              </div>
            ))}
          </motion.div>

          {/* Headline with animated ticker */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <h1
              className="font-black leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(2.6rem,6vw,4.5rem)" }}
            >
              <span className="text-white block">POWERFUL</span>
              <div className="overflow-hidden" style={{ height: "1.1em" }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={idx}
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-110%" }}
                    transition={{ duration: 0.45, ease: "easeInOut" }}
                    className="block"
                    style={{
                      background: "linear-gradient(135deg,#2ECC71,#3DE882)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {HEADLINES[idx].toUpperCase()}
                  </motion.span>
                </AnimatePresence>
              </div>
            </h1>
          </motion.div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32 }}
            className="text-gray-400 text-lg leading-relaxed mb-8 max-w-xl"
          >
            We build modern, fast and scalable websites and web applications that help
            your business stand out, win trust and grow online.
          </motion.p>

          {/* Feature checks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42 }}
            className="flex flex-wrap gap-x-6 gap-y-2 mb-10"
          >
            {["Modern Design", "M-Pesa Integrated", "SEO Optimized", "24/7 Support"].map((t) => (
              <div key={t} className="flex items-center gap-2 text-gray-300 text-sm">
                <CheckCircle2 size={15} style={{ color: "#2ECC71" }} className="shrink-0" />
                {t}
              </div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.52 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/contact"
              className="group flex items-center gap-2 font-bold px-8 py-4 rounded-xl text-lg transition-all hover:scale-105 active:scale-95"
              style={{
                background: "#2ECC71",
                color: "#0A0E1A",
                boxShadow: "0 0 28px rgba(46,204,113,0.35)",
              }}
            >
              Get Started Free
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/services"
              className="group flex items-center gap-2 font-semibold px-8 py-4 rounded-xl text-lg text-white transition-all hover:brightness-125"
              style={{
                background: "rgba(13,81,140,0.15)",
                border: "1px solid rgba(255,255,255,0.15)",
                backdropFilter: "blur(12px)",
              }}
            >
              <Play size={18} style={{ color: "#2ECC71" }} />
              View Our Work
            </Link>
          </motion.div>
        </div>

        {/* RIGHT — mock browser window */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.38, duration: 0.7 }}
          className="hidden lg:block"
        >
          <div className="relative">
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="rounded-2xl overflow-hidden shadow-2xl"
              style={{
                background: "rgba(13,81,140,0.1)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Browser chrome */}
              <div
                className="px-4 py-3 flex items-center gap-2"
                style={{ background: "#0F1629", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full" style={{ background: "rgba(239,68,68,0.6)" }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: "rgba(234,179,8,0.6)" }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: "rgba(34,197,94,0.6)" }} />
                </div>
                <div
                  className="flex-1 rounded-md px-3 py-1 text-center text-xs text-gray-400"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  solvara.tech
                </div>
              </div>

              {/* Browser body */}
              <div
                className="p-6"
                style={{ background: "linear-gradient(135deg,rgba(13,81,140,0.2),#0F1629)" }}
              >
                <div className="text-2xl font-black text-white mb-1">Digital Solutions</div>
                <div className="font-bold text-lg mb-3" style={{ color: "#2ECC71" }}>That Drive Growth</div>
                <div className="text-gray-400 text-sm mb-5 leading-relaxed">
                  We build modern web experiences that move your business forward.
                </div>
                <div
                  className="inline-block font-bold px-5 py-2.5 rounded-lg text-sm mb-6"
                  style={{ background: "#2ECC71", color: "#0A0E1A" }}
                >
                  GET STARTED →
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {FEATURES.map((f) => (
                    <div
                      key={f.label}
                      className="rounded-xl p-3 text-center"
                      style={{
                        background: "rgba(13,81,140,0.15)",
                        border: "1px solid rgba(13,81,140,0.25)",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      <f.icon size={18} style={{ color: "#2ECC71" }} className="mx-auto mb-1" />
                      <div className="text-white text-xs font-semibold leading-tight">{f.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Floating notification card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.8 }}
              className="absolute -bottom-5 -left-6 rounded-xl p-4 shadow-xl"
              style={{
                background: "rgba(10,14,26,0.9)",
                border: "1px solid rgba(46,204,113,0.25)",
                backdropFilter: "blur(16px)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(46,204,113,0.15)" }}
                >
                  <CheckCircle2 size={20} style={{ color: "#2ECC71" }} />
                </div>
                <div>
                  <div className="text-white font-bold text-sm">Project Live! 🚀</div>
                  <div className="text-gray-400 text-xs">E-Commerce Store</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
        className="relative z-10 w-full mt-auto"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          background: "rgba(15,22,41,0.7)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-black text-xl sm:text-2xl" style={{ color: "#2ECC71" }}>
                {s.value}
              </div>
              <div className="text-gray-400 text-xs sm:text-sm mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}