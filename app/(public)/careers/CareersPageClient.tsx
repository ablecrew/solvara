"use client";

import { useState, type ElementType } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Clock,
  Briefcase,
  Code2,
  Palette,
  TrendingUp,
  Headphones,
  ChevronDown,
  CheckCircle2,
  Star,
  Zap,
  Globe,
  Heart,
  Users,
  Shield,
  Coffee,
  Award,
  Gift,
  Laptop,
} from "lucide-react";

import type { SupabaseJob, SupabasePerk } from "./page";

/* ─── Icon map ──────────────────────────────────────────────── */

const ICON_MAP: Record<string, ElementType> = {
  Zap,
  Globe,
  TrendingUp,
  Heart,
  Star,
  Users,
  Briefcase,
  CheckCircle2,
  Shield,
  Coffee,
  Award,
  Laptop,
  Clock,
  Gift,
  Code2,
  Palette,
  Headphones,
};

/* ─── Department icon map ───────────────────────────────────── */

const DEPT_ICONS: Record<string, ElementType> = {
  Engineering: Code2,
  Design: Palette,
  Growth: TrendingUp,
  Operations: Headphones,
  Sales: TrendingUp,
  Finance: Briefcase,
};

/* ─── Role card ─────────────────────────────────────────────── */

function RoleCard({
                    role,
                    index,
                  }: {
  role: SupabaseJob;
  index: number;
}) {
  const [open, setOpen] = useState(false);

  const Icon = DEPT_ICONS[role.department] ?? Briefcase;

  const responsibilities = role.responsibilities ?? [];
  const requirements = role.requirements ?? [];

  return (
      <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="overflow-hidden rounded-2xl"
          style={{
            background: "#0F1629",
            border: "1px solid #1A2540",
          }}
      >
        {/* Header */}
        <div className="p-6 sm:p-8">
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                  style={{
                    background: `${role.color}18`,
                    border: `1px solid ${role.color}30`,
                  }}
              >
                <Icon size={22} style={{ color: role.color }} />
              </div>

              <div>
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <h3 className="text-xl font-black text-white">
                    {role.title}
                  </h3>

                  {role.urgent && (
                      <span
                          className="rounded-full px-2 py-0.5 text-xs font-bold"
                          style={{
                            background: "rgba(231,76,60,0.2)",
                            color: "#E74C3C",
                            border: "1px solid rgba(231,76,60,0.3)",
                          }}
                      >
                    Urgent
                  </span>
                  )}
                </div>

                <div
                    className="text-sm font-semibold"
                    style={{ color: role.color }}
                >
                  {role.department}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
            <span
                className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-gray-300"
                style={{ background: "#1A2540" }}
            >
              <Clock size={11} />
              {role.type}
            </span>

              <span
                  className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-gray-300"
                  style={{ background: "#1A2540" }}
              >
              <MapPin size={11} />
                {role.location}
            </span>
            </div>
          </div>

          <p className="mb-4 leading-relaxed text-gray-400">
            {role.description}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="mb-0.5 text-xs text-gray-500">
                Salary Range
              </div>

              <div className="font-black text-[#2ECC71]">
                {role.salary_range || "Not specified"}
              </div>
            </div>

            <button
                type="button"
                onClick={() => setOpen((current) => !current)}
                className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all"
                style={{
                  background: open
                      ? `${role.color}18`
                      : "rgba(255,255,255,0.05)",
                  color: role.color,
                  border: `1px solid ${role.color}30`,
                }}
            >
              {open ? "Hide Details" : "View Details"}

              <ChevronDown
                  size={14}
                  className={`transition-transform ${
                      open ? "rotate-180" : ""
                  }`}
              />
            </button>
          </div>
        </div>

        {/* Expandable details */}
        <AnimatePresence initial={false}>
          {open && (
              <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
              >
                <div
                    className="px-6 pb-8 pt-6 sm:px-8"
                    style={{ borderTop: "1px solid #1A2540" }}
                >
                  <div className="grid gap-8 sm:grid-cols-2">
                    {/* Responsibilities */}
                    <div>
                      <h4 className="mb-4 flex items-center gap-2 font-bold text-white">
                        <Briefcase size={15} style={{ color: role.color }} />
                        Responsibilities
                      </h4>

                      {responsibilities.length > 0 ? (
                          <ul className="space-y-2.5">
                            {responsibilities.map((responsibility, index) => (
                                <li
                                    key={`${role.id}-responsibility-${index}`}
                                    className="flex items-start gap-2 text-sm text-gray-300"
                                >
                                  <CheckCircle2
                                      size={13}
                                      style={{ color: role.color }}
                                      className="mt-0.5 shrink-0"
                                  />

                                  <span>{responsibility}</span>
                                </li>
                            ))}
                          </ul>
                      ) : (
                          <p className="text-sm text-gray-500">
                            Responsibilities will be shared during the interview
                            process.
                          </p>
                      )}
                    </div>

                    {/* Requirements */}
                    <div>
                      <h4 className="mb-4 flex items-center gap-2 font-bold text-white">
                        <Star size={15} style={{ color: role.color }} />
                        Requirements
                      </h4>

                      {requirements.length > 0 ? (
                          <ul className="space-y-2.5">
                            {requirements.map((requirement, index) => (
                                <li
                                    key={`${role.id}-requirement-${index}`}
                                    className="flex items-start gap-2 text-sm text-gray-300"
                                >
                                  <CheckCircle2
                                      size={13}
                                      className="mt-0.5 shrink-0 text-[#2ECC71]"
                                  />

                                  <span>{requirement}</span>
                                </li>
                            ))}
                          </ul>
                      ) : (
                          <p className="text-sm text-gray-500">
                            Requirements will be discussed during the interview
                            process.
                          </p>
                      )}
                    </div>
                  </div>

                  {/* Application section */}
                  <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
                    <Link
                        href={`/contact?role=${encodeURIComponent(role.title)}`}
                        className="flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-base font-bold transition-all hover:scale-105"
                        style={{
                          background: role.color,
                          color:
                              role.color.toLowerCase() === "#2ecc71"
                                  ? "#0A0E1A"
                                  : "#fff",
                          boxShadow: `0 0 20px ${role.color}30`,
                        }}
                    >
                      Apply for This Role
                      <ArrowRight size={18} />
                    </Link>

                    <p className="flex items-center gap-2 text-sm text-gray-500">
                      <CheckCircle2
                          size={14}
                          className="shrink-0 text-[#2ECC71]"
                      />

                      <span>
                    Or send CV to{" "}
                        <a
                            href="mailto:careers@solvara.solutions"
                            className="text-[#2ECC71] hover:underline"
                        >
                      careers@solvara.solutions
                    </a>
                  </span>
                    </p>
                  </div>
                </div>
              </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
  );
}

/* ─── Perk card ─────────────────────────────────────────────── */

function PerkCard({
                    perk,
                    index,
                  }: {
  perk: SupabasePerk;
  index: number;
}) {
  const Icon = ICON_MAP[perk.icon] ?? Zap;

  return (
      <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08 }}
          className="rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1"
          style={{
            background: "#0A0E1A",
            border: "1px solid #1A2540",
          }}
      >
        <div
            className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl"
            style={{
              background: "rgba(46,204,113,0.1)",
              border: "1px solid rgba(46,204,113,0.2)",
            }}
        >
          <Icon size={18} className="text-[#2ECC71]" />
        </div>

        <h3 className="mb-1 text-sm font-bold text-white">
          {perk.title}
        </h3>

        <p className="text-xs leading-relaxed text-gray-400">
          {perk.description}
        </p>
      </motion.div>
  );
}

/* ─── Main page ─────────────────────────────────────────────── */

export default function CareersPageClient({
                                            jobs,
                                            perks,
                                          }: {
  jobs: SupabaseJob[];
  perks: SupabasePerk[];
}) {
  return (
      <div className="min-h-screen bg-[#0A0E1A]">
        {/* Hero */}
        <section
            className="relative overflow-hidden pb-20 pt-32"
            style={{
              background:
                  "linear-gradient(135deg,rgba(13,81,140,0.2) 0%,#0A0E1A 60%)",
            }}
        >
          <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.1]"
              style={{
                backgroundImage:
                    "linear-gradient(rgba(13,81,140,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(13,81,140,0.5) 1px,transparent 1px)",
                backgroundSize: "60px 60px",
              }}
          />

          <div
              aria-hidden
              className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full"
              style={{
                background:
                    "radial-gradient(circle,rgba(46,204,113,0.1) 0%,transparent 70%)",
                filter: "blur(80px)",
              }}
          />

          <div className="relative z-10 mx-auto w-full max-w-[1280px] px-4 sm:px-6">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl"
            >
              <div
                  className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
                  style={{
                    background: "rgba(46,204,113,0.1)",
                    border: "1px solid rgba(46,204,113,0.2)",
                    color: "#2ECC71",
                  }}
              >
                — JOIN OUR TEAM —
              </div>

              <h1
                  className="mb-6 font-black leading-tight text-white"
                  style={{ fontSize: "clamp(2.6rem,6vw,4.5rem)" }}
              >
                Build the Future of{" "}
                <span
                    style={{
                      background:
                          "linear-gradient(135deg,#2ECC71,#3DE882)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                >
                Kenya&apos;s Digital Economy
              </span>
              </h1>

              <p className="mb-8 max-w-2xl text-xl leading-relaxed text-gray-400">
                We&apos;re a fast-growing software consultancy looking for
                talented people who want to do meaningful work and grow fast.
              </p>

              <div className="flex flex-wrap gap-3">
                {[
                  `${jobs.length} Open Role${
                      jobs.length !== 1 ? "s" : ""
                  }`,
                  "Remote Friendly",
                  "Competitive Pay",
                  "Fast Growth",
                ].map((tag) => (
                    <div
                        key={tag}
                        className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
                        style={{
                          background: "rgba(46,204,113,0.1)",
                          border: "1px solid rgba(46,204,113,0.2)",
                          color: "#2ECC71",
                        }}
                    >
                      <CheckCircle2 size={13} />
                      {tag}
                    </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Perks */}
        {perks.length > 0 && (
            <section
                className="border-t border-[#1A2540] py-20"
                style={{ background: "#0F1629" }}
            >
              <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6">
                <div className="mb-12 text-center">
                  <div
                      className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
                      style={{
                        background: "rgba(46,204,113,0.1)",
                        border: "1px solid rgba(46,204,113,0.2)",
                        color: "#2ECC71",
                      }}
                  >
                    — WHY JOIN US —
                  </div>

                  <h2 className="mb-4 text-3xl font-black text-white sm:text-4xl">
                    Perks &{" "}
                    <span className="text-[#2ECC71]">Benefits</span>
                  </h2>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {perks.map((perk, index) => (
                      <PerkCard
                          key={perk.id}
                          perk={perk}
                          index={index}
                      />
                  ))}
                </div>
              </div>
            </section>
        )}

        {/* Open roles */}
        <section
            className="border-t border-[#1A2540] py-20"
            style={{
              background: jobs.length > 0 ? "#0F1629" : "#0A0E1A",
            }}
        >
          <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6">
            <div className="mb-12 text-center">
              <div
                  className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
                  style={{
                    background: "rgba(46,204,113,0.1)",
                    border: "1px solid rgba(46,204,113,0.2)",
                    color: "#2ECC71",
                  }}
              >
                — OPEN POSITIONS —
              </div>

              <h2 className="mb-4 text-3xl font-black text-white sm:text-4xl">
                {jobs.length > 0 ? (
                    <>
                      We&apos;re Hiring{" "}
                      <span className="text-[#2ECC71]">
                    {jobs.length}{" "}
                        {jobs.length === 1 ? "Role" : "Roles"}
                  </span>
                    </>
                ) : (
                    "No Open Positions"
                )}
              </h2>

              {jobs.length > 0 ? (
                  <p className="mx-auto max-w-xl text-gray-400">
                    Click any role to see full details, responsibilities, and
                    how to apply.
                  </p>
              ) : (
                  <p className="mx-auto max-w-xl text-gray-400">
                    We don&apos;t have any open roles right now, but we&apos;re
                    always interested in exceptional talent.
                  </p>
              )}
            </div>

            {jobs.length > 0 ? (
                <div className="space-y-6">
                  {jobs.map((job, index) => (
                      <RoleCard
                          key={job.id}
                          role={job}
                          index={index}
                      />
                  ))}
                </div>
            ) : (
                <div
                    className="rounded-2xl py-16 text-center"
                    style={{
                      background: "#0F1629",
                      border: "1px solid #1A2540",
                    }}
                >
                  <div className="mb-4 text-5xl">👀</div>

                  <p className="mb-2 text-lg text-gray-400">
                    Check back soon — we&apos;re growing fast.
                  </p>

                  <p className="text-sm text-gray-500">
                    In the meantime, send your CV to{" "}
                    <a
                        href="mailto:careers@solvara.solutions"
                        className="text-[#2ECC71] hover:underline"
                    >
                      careers@solvara.solutions
                    </a>
                  </p>
                </div>
            )}
          </div>
        </section>

        {/* Speculative applications */}
        <section className="bg-[#0A0E1A] py-20">
          <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-2xl p-10 text-center md:p-14"
                style={{
                  background:
                      "linear-gradient(135deg,rgba(13,81,140,0.3),rgba(46,204,113,0.1))",
                  border: "1px solid rgba(46,204,113,0.2)",
                }}
            >
              <div className="mb-4 text-5xl">📩</div>

              <h2 className="mb-4 text-3xl font-black text-white sm:text-4xl">
                Don&apos;t See a Fit?
              </h2>

              <p className="mx-auto mb-8 max-w-xl text-lg text-gray-400">
                We&apos;re always open to exceptional talent. Send us your CV
                and tell us how you&apos;d add value to the team.
              </p>

              <a
                  href="mailto:careers@solvara.solutions"
                  className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-lg font-bold transition-all hover:scale-105"
                  style={{
                    background: "#2ECC71",
                    color: "#0A0E1A",
                    boxShadow: "0 0 24px rgba(46,204,113,0.3)",
                  }}
              >
                Email Your CV
                <ArrowRight size={18} />
              </a>

              <p className="mt-4 text-sm text-gray-500">
                careers@solvara.solutions
              </p>
            </motion.div>
          </div>
        </section>
      </div>
  );
}