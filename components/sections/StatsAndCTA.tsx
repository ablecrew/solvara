"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, LineChart, Line, CartesianGrid,
} from "recharts";

/* ─── Sparkle dots — client-only, generated after mount ─────── */
type Sparkle = { id: number; left: number; top: number; delay: number };

function Sparkles() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    setSparkles(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 3,
      }))
    );
  }, []);

  if (sparkles.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            background: "rgba(46,204,113,0.45)",
          }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1.6, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: s.delay }}
        />
      ))}
    </div>
  );
}

/* ─── Data ───────────────────────────────────────────────────── */
const growthData = [
  { month: "Jan", projects: 12, clients: 8  },
  { month: "Feb", projects: 18, clients: 14 },
  { month: "Mar", projects: 24, clients: 20 },
  { month: "Apr", projects: 30, clients: 26 },
  { month: "May", projects: 35, clients: 30 },
  { month: "Jun", projects: 45, clients: 38 },
  { month: "Jul", projects: 52, clients: 44 },
  { month: "Aug", projects: 60, clients: 52 },
];

const steps = [
  { step: "01", title: "Discovery Call",  desc: "We discuss your goals, requirements and timeline in a free consultation." },
  { step: "02", title: "Design & Plan",   desc: "We create wireframes and design mockups for your approval before coding." },
  { step: "03", title: "Development",     desc: "Our team builds your project with clean code and regular progress updates." },
  { step: "04", title: "Launch & Support",desc: "We deploy your project and provide ongoing maintenance and support." },
];

/* ─── Tooltip ────────────────────────────────────────────────── */
const ChartTooltip = ({
  active, payload, label,
}: {
  active?: boolean;
  payload?: { color: string; name: string; value: number }[];
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-xl p-3 text-sm"
      style={{
        background: "rgba(10,14,26,0.9)",
        border: "1px solid rgba(255,255,255,0.1)",
        backdropFilter: "blur(12px)",
      }}
    >
      <p className="text-white font-bold mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
};

/* ─── Component ──────────────────────────────────────────────── */
export default function StatsAndCTA() {
  return (
    <>
      {/* ── Process ── */}
      <section
        className="relative overflow-hidden"
        style={{ padding: "5rem 1.5rem", background: "#0A0E1A" }}
      >
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-4 text-sm font-semibold"
              style={{
                background: "rgba(46,204,113,0.1)",
                border: "1px solid rgba(46,204,113,0.2)",
                color: "#2ECC71",
              }}
            >
              — OUR PROCESS —
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              How We Work{" "}
              <span
                style={{
                  background: "linear-gradient(135deg,#2ECC71,#3DE882)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                With You
              </span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="relative"
              >
                {i < steps.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-8 left-full w-full h-px z-0"
                    style={{ background: "linear-gradient(90deg,rgba(46,204,113,0.3),transparent)" }}
                  />
                )}
                <div
                  className="relative z-10 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-2"
                  style={{
                    background: "#0F1629",
                    border: "1px solid #1A2540",
                  }}
                >
                  <div
                    className="text-5xl font-black mb-4"
                    style={{ color: "rgba(46,204,113,0.2)" }}
                  >
                    {s.step}
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Charts ── */}
      <section
        className="relative overflow-hidden"
        style={{ padding: "5rem 1.5rem", background: "#0F1629" }}
      >
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-4 text-sm font-semibold"
              style={{
                background: "rgba(46,204,113,0.1)",
                border: "1px solid rgba(46,204,113,0.2)",
                color: "#2ECC71",
              }}
            >
              — OUR GROWTH —
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Numbers That{" "}
              <span
                style={{
                  background: "linear-gradient(135deg,#2ECC71,#3DE882)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Speak for Themselves
              </span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl p-6"
              style={{
                background: "rgba(10,14,26,0.8)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(20px)",
              }}
            >
              <h3 className="text-white font-bold mb-6">Projects Delivered (2024)</h3>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="month" stroke="#6b7280" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar dataKey="projects" name="Projects" fill="#0D518C" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl p-6"
              style={{
                background: "rgba(10,14,26,0.8)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(20px)",
              }}
            >
              <h3 className="text-white font-bold mb-6">Client Growth Trend</h3>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="month" stroke="#6b7280" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
                  <Tooltip content={<ChartTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="clients"
                    name="Clients"
                    stroke="#2ECC71"
                    strokeWidth={3}
                    dot={{ fill: "#2ECC71", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section
        className="relative overflow-hidden"
        style={{
          padding: "5rem 1.5rem",
          background: "linear-gradient(135deg,rgba(13,81,140,0.25) 0%,#0A0E1A 60%)",
        }}
      >
        {/* gradient overlay */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(135deg,rgba(13,81,140,0.15),rgba(46,204,113,0.05))" }}
        />

        {/* Client-only sparkle dots */}
        <Sparkles />

        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-5xl mb-4">🚀</div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
              Let&apos;s Build Something
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg,#2ECC71,#3DE882)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Great Together!
              </span>
            </h2>
            <p className="text-gray-300 text-xl mb-3 max-w-2xl mx-auto">
              Your vision. Our expertise. Real results.
            </p>
            <p className="text-gray-500 mb-12">
              Free consultation · Fast delivery · Ongoing support
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <Link
                href="/contact"
                className="group flex items-center gap-2 font-black px-10 py-5 rounded-2xl text-xl transition-all hover:scale-105 active:scale-95"
                style={{
                  background: "#2ECC71",
                  color: "#0A0E1A",
                  boxShadow: "0 0 32px rgba(46,204,113,0.4)",
                }}
              >
                Start Your Project
                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:+254707528980"
                className="flex items-center gap-3 font-semibold px-10 py-5 rounded-2xl text-xl text-white transition-all hover:brightness-125"
                style={{
                  background: "rgba(13,81,140,0.15)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <Phone size={22} /> Call Us Now
              </a>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-400 text-sm">
              <a href="tel:+254707528980" className="hover:text-[#2ECC71] transition-colors">
                📞 +254 707 528 980
              </a>
              <a href="tel:+254792837632" className="hover:text-[#2ECC71] transition-colors">
                📞 +254 792 837 632
              </a>
              <a href="https://solvara.vercel.app" className="hover:text-[#2ECC71] transition-colors">
                🌐 solvara.vercel.app
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}