"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, MapPin, Clock, Briefcase,
  Code2, Palette, TrendingUp, Headphones,
  ChevronDown, CheckCircle2, Star,
  Zap, Globe, Heart, Users, Shield,
  Coffee, Award, Gift, Laptop,
} from "lucide-react";
import type { SanityJob, SanityPerk } from "./page";

/* ─── Icon map — matches options in perk schema ──────────────── */
const ICON_MAP: Record<string, React.ElementType> = {
  Zap, Globe, TrendingUp, Heart, Star, Users,
  Briefcase, CheckCircle2, Shield, Coffee,
  Award, Laptop, Clock, Gift,
  Code2, Palette, Headphones,
};

/* ─── Department icon map ────────────────────────────────────── */
const DEPT_ICONS: Record<string, React.ElementType> = {
  Engineering: Code2,
  Design:      Palette,
  Growth:      TrendingUp,
  Operations:  Headphones,
  Sales:       TrendingUp,
  Finance:     Briefcase,
};

/* ─── Role Card ──────────────────────────────────────────────── */
function RoleCard({ role, index }: { role: SanityJob; index: number }) {
  const [open, setOpen] = useState(false);
  const Icon = DEPT_ICONS[role.department] ?? Briefcase;

  return (
      <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="rounded-2xl overflow-hidden"
          style={{ background: "#0F1629", border: "1px solid #1A2540" }}
      >
        {/* Header */}
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                   style={{ background: `${role.color}18`, border: `1px solid ${role.color}30` }}>
                <Icon size={22} style={{ color: role.color }} />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="text-white font-black text-xl">{role.title}</h3>
                  {role.urgent && (
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                            style={{ background: "rgba(231,76,60,0.2)", color: "#E74C3C", border: "1px solid rgba(231,76,60,0.3)" }}>
                    Urgent
                  </span>
                  )}
                </div>
                <div className="text-sm font-semibold" style={{ color: role.color }}>
                  {role.department}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
            <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full text-gray-300"
                  style={{ background: "#1A2540" }}>
              <Clock size={11} /> {role.type}
            </span>
              <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full text-gray-300"
                    style={{ background: "#1A2540" }}>
              <MapPin size={11} /> {role.location}
            </span>
            </div>
          </div>

          <p className="text-gray-400 leading-relaxed mb-4">{role.description}</p>

          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <div className="text-xs text-gray-500 mb-0.5">Salary Range</div>
              <div className="font-black" style={{ color: "#2ECC71" }}>{role.salaryRange}</div>
            </div>
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 text-sm font-semibold transition-all px-4 py-2 rounded-xl"
                style={{
                  background: open ? `${role.color}18` : "rgba(255,255,255,0.05)",
                  color: role.color,
                  border: `1px solid ${role.color}30`,
                }}
            >
              {open ? "Hide Details" : "View Details"}
              <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>

        {/* Expandable */}
        <AnimatePresence>
          {open && (
              <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
              >
                <div className="px-6 sm:px-8 pb-8 pt-0" style={{ borderTop: "1px solid #1A2540" }}>
                  <div className="pt-6 grid sm:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                        <Briefcase size={15} style={{ color: role.color }} /> Responsibilities
                      </h4>
                      <ul className="space-y-2.5">
                        {role.responsibilities.map((r, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                              <CheckCircle2 size={13} style={{ color: role.color }} className="shrink-0 mt-0.5" />
                              {r}
                            </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                        <Star size={15} style={{ color: role.color }} /> Requirements
                      </h4>
                      <ul className="space-y-2.5">
                        {role.requirements.map((r, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                              <CheckCircle2 size={13} style={{ color: "#2ECC71" }} className="shrink-0 mt-0.5" />
                              {r}
                            </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center">
                    <Link
                        href={`/contact?role=${encodeURIComponent(role.title)}`}
                        className="flex items-center justify-center gap-2 font-bold px-8 py-4 rounded-xl text-base transition-all hover:scale-105"
                        style={{
                          background: role.color,
                          color: role.color === "#2ECC71" ? "#0A0E1A" : "#fff",
                          boxShadow: `0 0 20px ${role.color}30`,
                        }}
                    >
                      Apply for This Role <ArrowRight size={18} />
                    </Link>
                    <p className="text-gray-500 text-sm flex items-center gap-2">
                      <CheckCircle2 size={14} style={{ color: "#2ECC71" }} />
                      Or send CV to{" "}
                      <a href="mailto:careers@solvara.solutions"
                         className="hover:underline" style={{ color: "#2ECC71" }}>
                        careers@solvara.solutions
                      </a>
                    </p>
                  </div>
                </div>
              </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
  );
}

/* ─── Perk Card ──────────────────────────────────────────────── */
function PerkCard({ perk, index }: { perk: SanityPerk; index: number }) {
  const Icon = ICON_MAP[perk.icon] ?? Zap;
  return (
      <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08 }}
          className="p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1"
          style={{ background: "#0A0E1A", border: "1px solid #1A2540" }}
      >
        <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
             style={{ background: "rgba(46,204,113,0.1)", border: "1px solid rgba(46,204,113,0.2)" }}>
          <Icon size={18} style={{ color: "#2ECC71" }} />
        </div>
        <h3 className="text-white font-bold text-sm mb-1">{perk.title}</h3>
        <p className="text-gray-400 text-xs leading-relaxed">{perk.description}</p>
      </motion.div>
  );
}

/* ─── Main Page ──────────────────────────────────────────────── */
export default function CareersPageClient({
                                            jobs,
                                            perks,
                                          }: {
  jobs: SanityJob[];
  perks: SanityPerk[];
}) {
  return (
      <div className="bg-[#0A0E1A] min-h-screen">

        {/* ── Hero ── */}
        <section className="relative overflow-hidden pt-32 pb-20"
                 style={{ background: "linear-gradient(135deg,rgba(13,81,140,0.2) 0%,#0A0E1A 60%)" }}>
          <div aria-hidden className="absolute inset-0 opacity-[0.1] pointer-events-none"
               style={{ backgroundImage: "linear-gradient(rgba(13,81,140,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(13,81,140,0.5) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
          <div aria-hidden className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
               style={{ background: "radial-gradient(circle,rgba(46,204,113,0.1) 0%,transparent 70%)", filter: "blur(80px)" }} />

          <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 text-sm font-semibold"
                   style={{ background: "rgba(46,204,113,0.1)", border: "1px solid rgba(46,204,113,0.2)", color: "#2ECC71" }}>
                — JOIN OUR TEAM —
              </div>
              <h1 className="font-black text-white leading-tight mb-6" style={{ fontSize: "clamp(2.6rem,6vw,4.5rem)" }}>
                Build the Future of{" "}
                <span style={{ background: "linear-gradient(135deg,#2ECC71,#3DE882)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Kenya&apos;s Digital Economy
              </span>
              </h1>
              <p className="text-gray-400 text-xl leading-relaxed mb-8 max-w-2xl">
                We&apos;re a fast-growing web development agency looking for talented people who want to do meaningful work and grow fast.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  `${jobs.length} Open Role${jobs.length !== 1 ? "s" : ""}`,
                  "Remote Friendly",
                  "Competitive Pay",
                  "Fast Growth",
                ].map((tag) => (
                    <div key={tag}
                         className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
                         style={{ background: "rgba(46,204,113,0.1)", border: "1px solid rgba(46,204,113,0.2)", color: "#2ECC71" }}>
                      <CheckCircle2 size={13} /> {tag}
                    </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Perks ── */}
        {perks.length > 0 && (
            <section style={{ padding: "5rem 1.5rem", background: "#0F1629", borderTop: "1px solid #1A2540" }}>
              <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-4 text-sm font-semibold"
                       style={{ background: "rgba(46,204,113,0.1)", border: "1px solid rgba(46,204,113,0.2)", color: "#2ECC71" }}>
                    — WHY JOIN US —
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
                    Perks &{" "}
                    <span style={{ background: "linear-gradient(135deg,#2ECC71,#3DE882)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Benefits
                </span>
                  </h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {perks.map((p, i) => <PerkCard key={p._id} perk={p} index={i} />)}
                </div>
              </div>
            </section>
        )}

        {/* ── Open Roles ── */}
        <section style={{ padding: "5rem 1.5rem", background: jobs.length > 0 ? "#0F1629" : "#0A0E1A", borderTop: "1px solid #1A2540" }}>
          <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-4 text-sm font-semibold"
                   style={{ background: "rgba(46,204,113,0.1)", border: "1px solid rgba(46,204,113,0.2)", color: "#2ECC71" }}>
                — OPEN POSITIONS —
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
                {jobs.length > 0 ? (
                    <>We&apos;re Hiring{" "}
                      <span style={{ background: "linear-gradient(135deg,#2ECC71,#3DE882)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    {jobs.length} {jobs.length === 1 ? "Role" : "Roles"}
                  </span>
                    </>
                ) : "No Open Positions"}
              </h2>
              {jobs.length > 0 ? (
                  <p className="text-gray-400 max-w-xl mx-auto">
                    Click any role to see full details, responsibilities and how to apply.
                  </p>
              ) : (
                  <p className="text-gray-400 max-w-xl mx-auto">
                    We don&apos;t have any open roles right now, but we&apos;re always interested in exceptional talent.
                  </p>
              )}
            </div>

            {jobs.length > 0 ? (
                <div className="space-y-6">
                  {jobs.map((job, i) => <RoleCard key={job._id} role={job} index={i} />)}
                </div>
            ) : (
                /* Empty state */
                <div className="text-center py-16 rounded-2xl"
                     style={{ background: "#0F1629", border: "1px solid #1A2540" }}>
                  <div className="text-5xl mb-4">👀</div>
                  <p className="text-gray-400 text-lg mb-2">Check back soon — we&apos;re growing fast.</p>
                  <p className="text-gray-500 text-sm">
                    In the meantime, send your CV to{" "}
                    <a href="mailto:careers@solvara.solutions"
                       className="hover:underline" style={{ color: "#2ECC71" }}>
                      careers@solvara.solutions
                    </a>
                  </p>
                </div>
            )}
          </div>
        </section>

        {/* ── Speculative applications ── */}
        <section style={{ padding: "5rem 1.5rem", background: "#0A0E1A" }}>
          <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl p-10 md:p-14 text-center relative overflow-hidden"
                style={{ background: "linear-gradient(135deg,rgba(13,81,140,0.3),rgba(46,204,113,0.1))", border: "1px solid rgba(46,204,113,0.2)" }}
            >
              <div className="text-5xl mb-4">📩</div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
                Don&apos;t See a Fit?
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
                We&apos;re always open to exceptional talent. Send us your CV and tell us how you&apos;d add value to the team.
              </p>
              <a href="mailto:careers@solvara.solutions"
                 className="inline-flex items-center gap-2 font-bold px-8 py-4 rounded-xl text-lg transition-all hover:scale-105"
                 style={{ background: "#2ECC71", color: "#0A0E1A", boxShadow: "0 0 24px rgba(46,204,113,0.3)" }}>
                Email Your CV <ArrowRight size={18} />
              </a>
              <p className="text-gray-500 text-sm mt-4">careers@solvara.solutions</p>
            </motion.div>
          </div>
        </section>
      </div>
  );
}