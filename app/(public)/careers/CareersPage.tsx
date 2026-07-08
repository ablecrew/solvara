"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, MapPin, Clock, Briefcase, Code2,
  Palette, TrendingUp, Headphones, ChevronDown,
  CheckCircle2, Star, Heart, Zap, Globe, Users,
} from "lucide-react";

/* ─── Data ───────────────────────────────────────────────────── */
const perks = [
  { icon: Zap,      title: "Flexible Hours",        desc: "We care about output, not hours. Work when you're most productive." },
  { icon: Globe,    title: "Remote Friendly",        desc: "Work from anywhere in Kenya. We meet online and collaborate async." },
  { icon: TrendingUp, title: "Growth Budget",        desc: "KES 30,000/year per employee for courses, books and conferences." },
  { icon: Heart,    title: "Health Cover",           desc: "Full medical cover for you and one dependent from day one." },
  { icon: Star,     title: "Performance Bonuses",    desc: "Quarterly bonuses tied to project success and client satisfaction." },
  { icon: Users,    title: "Great Team Culture",     desc: "Monthly team events, hackathons and a no-politics work environment." },
  { icon: Briefcase,"title": "Meaningful Work",      desc: "Every project you build impacts real Kenyan businesses and citizens." },
  { icon: CheckCircle2, title: "Equipment Provided", desc: "MacBook Pro or equivalent provided from your first day." },
];

const openRoles = [
  {
    id: 1,
    title: "Senior Full-Stack Developer",
    department: "Engineering",
    icon: Code2,
    color: "#1A6BB5",
    type: "Full-time",
    location: "Nairobi / Remote",
    salary: "KES 150,000 – 220,000/mo",
    urgent: true,
    desc: "We're looking for a senior developer to lead complex client projects. You'll architect solutions, review code, mentor junior developers and work directly with clients on technical requirements.",
    responsibilities: [
      "Architect and build full-stack web applications using Next.js, Node.js and PostgreSQL",
      "Lead technical discovery calls with clients",
      "Review pull requests and mentor junior developers",
      "Ensure code quality, performance and security standards",
      "Collaborate with designers to implement pixel-perfect UIs",
    ],
    requirements: [
      "4+ years of full-stack development experience",
      "Expert in React / Next.js and Node.js",
      "Strong SQL and database design skills",
      "Experience with REST APIs and third-party integrations",
      "M-Pesa Daraja API experience is a big plus",
    ],
  },
  {
    id: 2,
    title: "UI/UX Designer",
    department: "Design",
    icon: Palette,
    color: "#9B59B6",
    type: "Full-time",
    location: "Nairobi / Remote",
    salary: "KES 80,000 – 130,000/mo",
    urgent: false,
    desc: "Join our design team and craft stunning, conversion-focused interfaces for Kenyan businesses. You'll own the design process from research to handoff, working closely with developers and clients.",
    responsibilities: [
      "Create wireframes, prototypes and high-fidelity mockups in Figma",
      "Conduct user research and usability testing",
      "Build and maintain our component design system",
      "Collaborate with developers during implementation",
      "Present design decisions to clients with clear rationale",
    ],
    requirements: [
      "3+ years of UI/UX design experience",
      "Expert in Figma with a strong portfolio",
      "Understanding of web development constraints",
      "Experience designing for mobile-first African markets",
      "Strong visual design and typography skills",
    ],
  },
  {
    id: 3,
    title: "Digital Marketing & SEO Specialist",
    department: "Growth",
    icon: TrendingUp,
    color: "#2ECC71",
    type: "Full-time",
    location: "Nairobi",
    salary: "KES 70,000 – 110,000/mo",
    urgent: false,
    desc: "Help our clients grow their online presence. You'll manage SEO, content strategy and digital campaigns for our portfolio of websites, while also growing Solvara's own brand.",
    responsibilities: [
      "Develop and execute SEO strategies for client websites",
      "Create and publish blog content for Solvara and clients",
      "Manage Google Ads and Meta Ads campaigns",
      "Track KPIs and produce monthly performance reports",
      "Grow Solvara's social media presence",
    ],
    requirements: [
      "2+ years of SEO and digital marketing experience",
      "Proficient in Google Analytics, Search Console and Ahrefs",
      "Strong content writing skills in English",
      "Experience with Google Ads and Meta Ads",
      "Understanding of web development basics",
    ],
  },
  {
    id: 4,
    title: "Client Success Manager",
    department: "Operations",
    icon: Headphones,
    color: "#F39C12",
    type: "Full-time",
    location: "Nairobi",
    salary: "KES 60,000 – 90,000/mo",
    urgent: false,
    desc: "Be the bridge between our clients and our technical team. You'll manage project delivery, client communications and ensure every client has an exceptional experience from first call to final launch.",
    responsibilities: [
      "Own client relationships from onboarding through project delivery",
      "Coordinate between clients and developers/designers",
      "Manage project timelines using Jira and Notion",
      "Conduct weekly status calls and produce progress reports",
      "Handle client feedback, revisions and scope discussions",
    ],
    requirements: [
      "2+ years in client success, project management or account management",
      "Excellent written and verbal communication",
      "Organised and detail-oriented with strong follow-through",
      "Experience with project management tools",
      "Technical curiosity — you don't need to code, but you must understand web projects",
    ],
  },
];

const values = [
  "We ship fast and iterate",
  "We communicate clearly and honestly",
  "We take ownership, no blame culture",
  "We lift each other up",
  "We put clients first, always",
  "We celebrate wins together",
];

/* ─── Role Card ──────────────────────────────────────────────── */
function RoleCard({ role, index }: { role: typeof openRoles[0]; index: number }) {
  const [open, setOpen] = useState(false);

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
              <role.icon size={22} style={{ color: role.color }} />
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
              <div className="text-sm font-semibold" style={{ color: role.color }}>{role.department}</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 sm:text-right">
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

        <p className="text-gray-400 leading-relaxed mb-4">{role.desc}</p>

        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <div className="text-xs text-gray-500 mb-0.5">Salary Range</div>
            <div className="font-black" style={{ color: "#2ECC71" }}>{role.salary}</div>
          </div>
          <button onClick={() => setOpen(!open)}
            className="flex items-center gap-2 text-sm font-semibold transition-all px-4 py-2 rounded-xl"
            style={{ background: open ? `${role.color}18` : "rgba(255,255,255,0.05)", color: role.color, border: `1px solid ${role.color}30` }}>
            {open ? "Hide Details" : "View Details"}
            <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>

      {/* Expandable details */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="px-6 sm:px-8 pb-8 pt-0" style={{ borderTop: "1px solid #1A2540" }}>
              <div className="pt-6 grid sm:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                    <Briefcase size={15} style={{ color: role.color }} /> Responsibilities
                  </h4>
                  <ul className="space-y-2.5">
                    {role.responsibilities.map((r) => (
                      <li key={r} className="flex items-start gap-2 text-gray-300 text-sm">
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
                    {role.requirements.map((r) => (
                      <li key={r} className="flex items-start gap-2 text-gray-300 text-sm">
                        <CheckCircle2 size={13} style={{ color: "#2ECC71" }} className="shrink-0 mt-0.5" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href={`/contact?role=${encodeURIComponent(role.title)}`}
                  className="flex items-center justify-center gap-2 font-bold px-8 py-4 rounded-xl text-base transition-all hover:scale-105"
                  style={{ background: role.color, color: role.color === "#2ECC71" ? "#0A0E1A" : "#fff", boxShadow: `0 0 20px ${role.color}30` }}>
                  Apply for This Role <ArrowRight size={18} />
                </Link>
                <p className="text-gray-500 text-sm flex items-center gap-2">
                  <CheckCircle2 size={14} style={{ color: "#2ECC71" }} />
                  Send CV to <a href="mailto:careers@solvara.tech" className="text-[#2ECC71] hover:underline">careers@solvara.tech</a>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function CareersPage() {
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
              We&apos;re a fast-growing web development agency looking for talented, passionate people who want to do meaningful work and grow fast.
            </p>
            <div className="flex flex-wrap gap-3">
              {["4 Open Roles", "Remote Friendly", "Competitive Pay", "Fast Growth"].map((tag) => (
                <div key={tag} className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
                  style={{ background: "rgba(46,204,113,0.1)", border: "1px solid rgba(46,204,113,0.2)", color: "#2ECC71" }}>
                  <CheckCircle2 size={13} /> {tag}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Perks ── */}
      <section style={{ padding: "5rem 1.5rem", background: "#0F1629", borderTop: "1px solid #1A2540" }}>
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-4 text-sm font-semibold"
              style={{ background: "rgba(46,204,113,0.1)", border: "1px solid rgba(46,204,113,0.2)", color: "#2ECC71" }}>
              — WHY JOIN US —
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Perks & <span style={{ background: "linear-gradient(135deg,#2ECC71,#3DE882)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Benefits</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {perks.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                style={{ background: "#0A0E1A", border: "1px solid #1A2540" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: "rgba(46,204,113,0.1)", border: "1px solid rgba(46,204,113,0.2)" }}>
                  <p.icon size={18} style={{ color: "#2ECC71" }} />
                </div>
                <h3 className="text-white font-bold text-sm mb-1">{p.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Culture ── */}
      <section style={{ padding: "5rem 1.5rem", background: "#0A0E1A" }}>
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-4 text-sm font-semibold"
              style={{ background: "rgba(46,204,113,0.1)", border: "1px solid rgba(46,204,113,0.2)", color: "#2ECC71" }}>
              — OUR CULTURE —
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              How We <span style={{ background: "linear-gradient(135deg,#2ECC71,#3DE882)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Work Together</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              We&apos;re a small, high-performance team that moves fast, communicates clearly and holds each other to a high standard — without the corporate nonsense. Every person here makes a real difference.
            </p>
            <ul className="space-y-3">
              {values.map((v) => (
                <li key={v} className="flex items-center gap-3 text-gray-300">
                  <CheckCircle2 size={16} style={{ color: "#2ECC71" }} className="shrink-0" />
                  {v}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="grid grid-cols-2 gap-4">
            {[
              { label: "Team Members",     value: "8",    color: "#2ECC71" },
              { label: "Avg Tenure",        value: "2.4yr", color: "#0D518C" },
              { label: "Projects/Month",    value: "12+",  color: "#2ECC71" },
              { label: "Client Rating",     value: "4.9★", color: "#0D518C" },
            ].map((s) => (
              <div key={s.label} className="p-6 rounded-2xl text-center"
                style={{ background: "#0F1629", border: "1px solid #1A2540" }}>
                <div className="font-black text-3xl mb-1" style={{ color: s.color }}>{s.value}</div>
                <div className="text-gray-400 text-sm">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Open Roles ── */}
      <section style={{ padding: "5rem 1.5rem", background: "#0F1629", borderTop: "1px solid #1A2540" }}>
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-4 text-sm font-semibold"
              style={{ background: "rgba(46,204,113,0.1)", border: "1px solid rgba(46,204,113,0.2)", color: "#2ECC71" }}>
              — OPEN POSITIONS —
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              We&apos;re Hiring <span style={{ background: "linear-gradient(135deg,#2ECC71,#3DE882)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{openRoles.length} Roles</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Click any role to see the full details, responsibilities and how to apply.
            </p>
          </div>
          <div className="space-y-6">
            {openRoles.map((role, i) => <RoleCard key={role.id} role={role} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── No role fit? ── */}
      <section style={{ padding: "5rem 1.5rem", background: "#0A0E1A" }}>
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-2xl p-10 md:p-14 text-center relative overflow-hidden"
            style={{ background: "linear-gradient(135deg,rgba(13,81,140,0.3),rgba(46,204,113,0.1))", border: "1px solid rgba(46,204,113,0.2)" }}>
            <div className="text-5xl mb-4">📩</div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Don&apos;t See a Fit?</h2>
            <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
              We&apos;re always open to exceptional talent. Send us your CV and tell us how you&apos;d add value to our team.
            </p>
            <a href="mailto:careers@solvara.tech"
              className="inline-flex items-center gap-2 font-bold px-8 py-4 rounded-xl text-lg transition-all hover:scale-105"
              style={{ background: "#2ECC71", color: "#0A0E1A", boxShadow: "0 0 24px rgba(46,204,113,0.3)" }}>
              Email Your CV <ArrowRight size={18} />
            </a>
            <p className="text-gray-500 text-sm mt-4">careers@solvara.tech</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}