"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, ExternalLink, CheckCircle2, ArrowRight,
  Globe, Clock, Calendar, TrendingUp, Code2, Tag,
  Lightbulb, Target, Rocket, ChevronRight,
} from "lucide-react";
import type { PortfolioProject } from "@/lib/portfolio-data";

/* ─── Section heading ────────────────────────────────────────── */
function SectionHeading({
  icon: Icon,
  title,
  color,
}: {
  icon: React.ElementType;
  title: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: `${color}18`, border: `1px solid ${color}35` }}
      >
        <Icon size={18} style={{ color }} />
      </div>
      <h2 className="text-white font-black text-xl">{title}</h2>
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────── */
export default function PortfolioSlugClient({
  project,
  related,
}: {
  project: PortfolioProject;
  related: PortfolioProject[];
}) {
  const lightColor = ["#2ECC71", "#F39C12", "#F7DC6F", "#F59E0B", "#FBBF24"].includes(project.color);

  return (
    <div style={{ background: "#0A0E1A", minHeight: "100vh" }}>

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <div
        className="relative overflow-hidden"
        style={{ paddingTop: "7rem", paddingBottom: "4rem", background: project.gradient }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0" style={{ background: "rgba(10,14,26,0.75)" }} />

        {/* Decorative large letter */}
        <div
          className="absolute right-0 top-0 bottom-0 flex items-center pr-8 select-none pointer-events-none"
          aria-hidden
          style={{
            fontSize: "clamp(8rem,18vw,16rem)",
            fontWeight: 900,
            color: project.color,
            opacity: 0.04,
            lineHeight: 1,
          }}
        >
          {project.title[0]}
        </div>

        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>

            {/* Back */}
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-medium mb-10 transition-colors"
              style={{ color: "rgba(255,255,255,0.55)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#fff")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)")}
            >
              <ArrowLeft size={15} /> Back to Portfolio
            </Link>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <div className="flex-1">
                {/* Category breadcrumb */}
                <div className="flex items-center gap-2 text-xs mb-4" style={{ color: "rgba(255,255,255,0.45)" }}>
                  <span>Portfolio</span>
                  <ChevronRight size={12} />
                  <span style={{ color: project.color }}>{project.category}</span>
                </div>

                {/* Title */}
                <h1
                  className="text-white font-black leading-[1.05] mb-3"
                  style={{ fontSize: "clamp(2.2rem, 5.5vw, 4rem)" }}
                >
                  {project.title}
                </h1>
                <p className="font-semibold text-xl mb-5" style={{ color: project.color }}>
                  {project.subtitle}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-semibold px-3 py-1.5 rounded-full"
                      style={{
                        background: "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        color: "rgba(255,255,255,0.7)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hero meta card */}
              <div
                className="rounded-2xl p-5 shrink-0 w-full lg:w-56"
                style={{
                  background: "rgba(10,14,26,0.6)",
                  border: `1px solid ${project.color}30`,
                  backdropFilter: "blur(12px)",
                }}
              >
                {[
                  { icon: Calendar, label: "Year",     value: project.year },
                  { icon: Clock,    label: "Duration", value: project.duration },
                  { icon: Tag,      label: "Category", value: project.category },
                ].map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 py-2.5"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <Icon size={14} style={{ color: project.color, flexShrink: 0 }} />
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.35)" }}>
                        {label}
                      </div>
                      <div className="text-white text-sm font-semibold">{value}</div>
                    </div>
                  </div>
                ))}

                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 font-bold text-sm rounded-xl mt-4 py-2.5 transition-all hover:scale-105"
                  style={{
                    background: project.color,
                    color: lightColor ? "#0A0E1A" : "#fff",
                  }}
                >
                  <Globe size={14} /> View Live Site <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          BODY
      ════════════════════════════════════════ */}
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-16">
        <div className="flex flex-col xl:flex-row gap-12">

          {/* ── LEFT: main content ── */}
          <div className="flex-1 min-w-0">

            {/* ── Overview ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-10"
            >
              <p
                className="text-lg leading-relaxed"
                style={{ color: "rgba(255,255,255,0.65)", borderLeft: `3px solid ${project.color}`, paddingLeft: "1.25rem" }}
              >
                {project.description}
              </p>
            </motion.div>

            {/* ── Challenge ── */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8 rounded-2xl p-7"
              style={{ background: "#0F1629", border: "1px solid #1A2540" }}
            >
              <SectionHeading icon={Target} title="The Challenge" color={project.color} />
              <p className="text-sm leading-[1.85]" style={{ color: "rgba(255,255,255,0.6)" }}>
                {project.challenge}
              </p>
            </motion.section>

            {/* ── Solution ── */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8 rounded-2xl p-7"
              style={{ background: "#0F1629", border: "1px solid #1A2540" }}
            >
              <SectionHeading icon={Lightbulb} title="Our Solution" color={project.color} />
              <p className="text-sm leading-[1.85]" style={{ color: "rgba(255,255,255,0.6)" }}>
                {project.solution}
              </p>
            </motion.section>

            {/* ── Results ── */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8 rounded-2xl p-7"
              style={{
                background: `linear-gradient(135deg, ${project.color}0A, rgba(13,81,140,0.08))`,
                border: `1px solid ${project.color}28`,
              }}
            >
              <SectionHeading icon={TrendingUp} title="Results & Impact" color={project.color} />
              <div className="grid sm:grid-cols-2 gap-3">
                {project.results.map((r, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-start gap-3 rounded-xl p-3.5"
                    style={{ background: "rgba(10,14,26,0.5)" }}
                  >
                    <CheckCircle2
                      size={16}
                      className="shrink-0 mt-0.5"
                      style={{ color: "#2ECC71" }}
                    />
                    <span className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
                      {r}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* ── Features ── */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <SectionHeading icon={Rocket} title="Key Features Built" color={project.color} />
              <div className="grid sm:grid-cols-2 gap-3">
                {project.features.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all"
                    style={{
                      background: "#0F1629",
                      border: "1px solid #1A2540",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = `${project.color}40`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "#1A2540";
                    }}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: project.color }}
                    />
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                      {f}
                    </span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* ── Live CTA banner ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-5 mb-12"
              style={{
                background: `linear-gradient(135deg, ${project.color}12, rgba(13,81,140,0.15))`,
                border: `1px solid ${project.color}30`,
              }}
            >
              <div>
                <p className="text-white font-bold text-base">Ready to see it in action?</p>
                <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {project.url}
                </p>
              </div>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-bold px-7 py-3.5 rounded-xl text-sm transition-all hover:scale-105 shrink-0 w-full sm:w-auto justify-center"
                style={{
                  background: project.color,
                  color: lightColor ? "#0A0E1A" : "#fff",
                  boxShadow: `0 6px 24px ${project.color}30`,
                }}
              >
                <Globe size={15} /> Open Live Site
                <ExternalLink size={13} />
              </a>
            </motion.div>

            {/* ── Related projects ── */}
            {related.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-white font-black text-xl mb-5">More Projects</h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/portfolio/${r.slug}`}
                      className="group block rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
                      style={{
                        background: "#0F1629",
                        border: "1px solid #1A2540",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = `${r.color}40`;
                        (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 30px ${r.color}15`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "#1A2540";
                        (e.currentTarget as HTMLElement).style.boxShadow = "none";
                      }}
                    >
                      {/* Mini hero */}
                      <div
                        className="h-32 relative overflow-hidden"
                        style={{ background: r.gradient }}
                      >
                        <div className="absolute inset-0" style={{ background: "rgba(10,14,26,0.5)" }} />
                        <div
                          className="absolute inset-0 flex items-center justify-center select-none"
                          style={{
                            fontSize: "5rem",
                            fontWeight: 900,
                            color: r.color,
                            opacity: 0.12,
                          }}
                          aria-hidden
                        >
                          {r.title[0]}
                        </div>
                        {/* Badges */}
                        <div className="absolute top-3 left-3">
                          <span
                            className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                            style={{ background: "rgba(10,14,26,0.8)", color: r.color }}
                          >
                            {r.category}
                          </span>
                        </div>
                        <a
                          href={r.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1"
                          style={{ background: "rgba(10,14,26,0.8)", color: "#2ECC71" }}
                        >
                          <Globe size={9} /> Live
                        </a>
                      </div>

                      {/* Card body */}
                      <div className="p-5">
                        <h4 className="text-white font-black text-base mb-1 group-hover:transition-colors"
                          style={{ color: undefined }}>
                          {r.title}
                        </h4>
                        <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>
                          {r.subtitle}
                        </p>
                        <div
                          className="inline-flex items-center gap-1.5 text-xs font-semibold transition-all group-hover:gap-2.5"
                          style={{ color: r.color }}
                        >
                          View Case Study <ArrowRight size={12} />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* ── RIGHT: sticky sidebar ── */}
          <aside className="w-full xl:w-64 shrink-0">
            <div className="xl:sticky xl:top-28 space-y-5">

              {/* Tech stack card */}
              <div
                className="rounded-2xl overflow-hidden"
                style={{ background: "#0F1629", border: "1px solid #1A2540" }}
              >
                {/* Card header */}
                <div
                  className="px-5 py-4 flex items-center gap-2"
                  style={{ borderBottom: "1px solid #1A2540", background: `${project.color}08` }}
                >
                  <Code2 size={15} style={{ color: project.color }} />
                  <span className="text-white font-bold text-sm">Tech Stack</span>
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] px-2.5 py-1.5 rounded-lg font-semibold"
                        style={{
                          background: `${project.color}10`,
                          color: project.color,
                          border: `1px solid ${project.color}22`,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Project info card */}
              <div
                className="rounded-2xl overflow-hidden"
                style={{ background: "#0F1629", border: "1px solid #1A2540" }}
              >
                <div
                  className="px-5 py-4 flex items-center gap-2"
                  style={{ borderBottom: "1px solid #1A2540", background: `${project.color}08` }}
                >
                  <Tag size={15} style={{ color: project.color }} />
                  <span className="text-white font-bold text-sm">Project Info</span>
                </div>
                <div className="p-5 space-y-3">
                  {[
                    { label: "Category",  value: project.category },
                    { label: "Duration",  value: project.duration },
                    { label: "Delivered", value: project.year },
                    { label: "Tags",      value: project.tags.join(", ") },
                  ].map((d) => (
                    <div key={d.label}>
                      <div
                        className="text-[10px] font-bold uppercase tracking-widest mb-1"
                        style={{ color: "rgba(255,255,255,0.3)" }}
                      >
                        {d.label}
                      </div>
                      <div className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.75)" }}>
                        {d.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA card */}
              <div
                className="rounded-2xl p-6 text-center"
                style={{
                  background: "linear-gradient(135deg, rgba(13,81,140,0.22), rgba(46,204,113,0.08))",
                  border: "1px solid rgba(46,204,113,0.2)",
                }}
              >
                <div className="text-4xl mb-4">💼</div>
                <h4 className="text-white font-black text-base mb-2">
                  Want something like this?
                </h4>
                <p className="text-xs leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.45)" }}>
                  Book a free 30-min consultation and let&apos;s discuss your project.
                </p>
                <Link
                  href="/book"
                  className="flex items-center justify-center gap-2 font-bold py-3 rounded-xl text-sm mb-3 transition-all hover:scale-105"
                  style={{ background: "#2ECC71", color: "#0A0E1A", boxShadow: "0 0 20px rgba(46,204,113,0.3)" }}
                >
                  Book Free Call <ArrowRight size={14} />
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 text-xs font-semibold py-2.5 rounded-xl transition-colors"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid #1A2540",
                    color: "rgba(255,255,255,0.5)",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#fff")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)")}
                >
                  Send a Message
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}