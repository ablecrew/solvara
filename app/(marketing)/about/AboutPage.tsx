"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, Users, Target, Eye, Heart,
  Award, Clock, Globe, TrendingUp, Code2, Headphones,
  Star, Zap, Shield, MapPin, Mail, Phone,
} from "lucide-react";

/* ─── Data ───────────────────────────────────────────────────── */
const stats = [
  { value: "200+", label: "Projects Delivered",  icon: CheckCircle2 },
  { value: "5+",   label: "Years Experience",     icon: Clock },
  { value: "98%",  label: "Client Satisfaction",  icon: Star },
  { value: "24/7", label: "Support Available",    icon: Headphones },
];

const values = [
  {
    icon: Target,
    title: "Results-Driven",
    desc: "Every project we take on is built with your business goals at the center. We measure success by the growth we drive for you.",
    color: "#2ECC71",
  },
  {
    icon: Heart,
    title: "Client-First Always",
    desc: "We treat every client like a long-term partner. Your satisfaction isn't a metric — it's our mission.",
    color: "#0D518C",
  },
  {
    icon: Shield,
    title: "Quality & Security",
    desc: "Enterprise-grade code quality, SSL, backups and uptime monitoring on every project we deliver.",
    color: "#2ECC71",
  },
  {
    icon: Zap,
    title: "Speed Without Compromise",
    desc: "We move fast without cutting corners. Agile delivery that keeps projects on time and on budget.",
    color: "#0D518C",
  },
  {
    icon: Globe,
    title: "Built for Growth",
    desc: "Every website is architected to scale with your business — SEO-first, mobile-first, future-ready.",
    color: "#2ECC71",
  },
  {
    icon: Code2,
    title: "Clean Code",
    desc: "No bloated templates. Every line of code is written from scratch, clean, maintainable and documented.",
    color: "#0D518C",
  },
];

const team = [
  { name: "Tonny Otieno",   role: "Director of Engineering",  avatar: "BM", color: "#0D518C", skills: ["React", "Next.js", "Node.js"] },
  { name: "Daltone Dande",  role: " Designer",             avatar: "AN", color: "#2ECC71", skills: ["Figma", "Tailwind", "Framer"] },
  { name: "Duke Dande",  role: " CTO ",            avatar: "KO", color: "#1A6BB5", skills: ["Python", "PostgreSQL", "AWS"] },
];

const milestones = [
  { year: "2019", title: "Company Founded",        desc: "Started as a freelance web studio in Nairobi with a vision to make world-class web solutions accessible to Kenyan businesses." },
  { year: "2020", title: "First 50 Projects",      desc: "Grew rapidly through referrals, delivering 50 websites across retail, healthcare and government sectors." },
  { year: "2021", title: "M-Pesa Integration",     desc: "Became one of the first agencies offering seamless M-Pesa payment integration in custom e-commerce solutions." },
  { year: "2022", title: "Team Expansion",          desc: "Grew from a solo founder to a full team of 8 developers, designers and project managers." },
  { year: "2023", title: "Enterprise Clients",      desc: "Onboarded first county government and hospital system clients, expanding into institutional digital infrastructure." },
  { year: "2024", title: "200+ Projects",           desc: "Crossed the 200-project milestone with a 98% client satisfaction rate and zero missed deadlines." },
];

/* ─── Reusable section header ────────────────────────────────── */
function SectionHeader({ badge, title, highlight, subtitle }: {
  badge: string; title: string; highlight: string; subtitle?: string;
}) {
  return (
    <div className="text-center mb-14">
      <div
        className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-4 text-sm font-semibold"
        style={{ background: "rgba(46,204,113,0.1)", border: "1px solid rgba(46,204,113,0.2)", color: "#2ECC71" }}
      >
        — {badge} —
      </div>
      <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
        {title}{" "}
        <span style={{
          background: "linear-gradient(135deg,#2ECC71,#3DE882)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
        }}>
          {highlight}
        </span>
      </h2>
      {subtitle && <p className="text-gray-400 text-lg max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <div className="bg-[#0A0E1A] min-h-screen">

      {/* ── Hero Banner ── */}
      <section className="relative overflow-hidden pt-32 pb-20" style={{ background: "linear-gradient(135deg,rgba(13,81,140,0.2) 0%,#0A0E1A 60%)" }}>
        <div aria-hidden className="absolute inset-0 opacity-[0.12] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(13,81,140,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(13,81,140,0.5) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div aria-hidden className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(46,204,113,0.1) 0%,transparent 70%)", filter: "blur(80px)" }} />

        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 text-sm font-semibold"
              style={{ background: "rgba(46,204,113,0.1)", border: "1px solid rgba(46,204,113,0.2)", color: "#2ECC71" }}>
              — ABOUT SOLVARA —
            </div>
            <h1 className="font-black text-white leading-tight mb-6" style={{ fontSize: "clamp(2.8rem,6vw,5rem)" }}>
              We Build Digital Solutions That{" "}
              <span style={{ background: "linear-gradient(135deg,#2ECC71,#3DE882)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Drive Real Growth
              </span>
            </h1>
            <p className="text-gray-400 text-xl leading-relaxed mb-8 max-w-2xl">
              Solvara Solutions is a Nairobi-based web development agency delivering modern, fast and scalable digital solutions to businesses across Kenya and beyond.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact"
                className="flex items-center gap-2 font-bold px-8 py-4 rounded-xl text-lg transition-all hover:scale-105"
                style={{ background: "#2ECC71", color: "#0A0E1A", boxShadow: "0 0 28px rgba(46,204,113,0.3)" }}>
                Work With Us <ArrowRight size={18} />
              </Link>
              <Link href="/services"
                className="flex items-center gap-2 font-semibold px-8 py-4 rounded-xl text-lg text-white transition-all hover:brightness-125"
                style={{ background: "rgba(13,81,140,0.15)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(12px)" }}>
                Our Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ background: "#0F1629", borderTop: "1px solid #1A2540", borderBottom: "1px solid #1A2540" }}>
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
              <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
                style={{ background: "rgba(46,204,113,0.1)", border: "1px solid rgba(46,204,113,0.2)" }}>
                <s.icon size={22} style={{ color: "#2ECC71" }} />
              </div>
              <div className="font-black text-3xl mb-1" style={{ color: "#2ECC71" }}>{s.value}</div>
              <div className="text-gray-400 text-sm">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section style={{ padding: "5rem 1.5rem", background: "#0A0E1A" }}>
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8">
          {[
            { icon: Target, label: "OUR MISSION", color: "#2ECC71",
              title: "Empowering Businesses Through Technology",
              desc: "To deliver world-class digital solutions that are accessible, affordable and impactful — helping Kenyan businesses compete on the global stage through the power of the web." },
            { icon: Eye, label: "OUR VISION", color: "#0D518C",
              title: "Africa's Most Trusted Web Agency",
              desc: "To become the leading web development agency in East Africa, recognised for exceptional quality, reliability and the measurable growth we create for every client we partner with." },
          ].map((item, i) => (
            <motion.div key={item.label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              className="p-8 rounded-2xl" style={{ background: "#0F1629", border: "1px solid #1A2540" }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: `${item.color}18`, border: `1px solid ${item.color}30` }}>
                <item.icon size={28} style={{ color: item.color }} />
              </div>
              <div className="text-xs font-bold tracking-[0.2em] mb-3" style={{ color: item.color }}>{item.label}</div>
              <h3 className="text-white font-black text-2xl mb-4">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Values ── */}
      <section id="values" style={{ padding: "5rem 1.5rem", background: "#0F1629" }}>
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6">
          <SectionHeader badge="OUR VALUES" title="What We" highlight="Stand For"
            subtitle="Six principles that guide every project, every client interaction and every line of code we write." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group p-6 rounded-2xl transition-all duration-300 hover:-translate-y-2"
                style={{ background: "#0A0E1A", border: "1px solid #1A2540" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors"
                  style={{ background: `${v.color}15`, border: `1px solid ${v.color}25` }}>
                  <v.icon size={22} style={{ color: v.color }} />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{v.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section id="team" style={{ padding: "5rem 1.5rem", background: "#0A0E1A" }}>
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6">
          <SectionHeader badge="OUR TEAM" title="The People Behind" highlight="Solvara"
            subtitle="A tight-knit team of passionate developers, designers and strategists." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl text-center transition-all duration-300 hover:-translate-y-2"
                style={{ background: "#0F1629", border: "1px solid #1A2540" }}>
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white font-black text-2xl"
                  style={{ background: `${t.color}30`, border: `2px solid ${t.color}50` }}>
                  {t.avatar}
                </div>
                <h3 className="text-white font-bold text-lg mb-1">{t.name}</h3>
                <p className="text-sm mb-4" style={{ color: "#2ECC71" }}>{t.role}</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {t.skills.map((s) => (
                    <span key={s} className="text-xs px-2 py-1 rounded-full text-gray-300"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section style={{ padding: "5rem 1.5rem", background: "#0F1629" }}>
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6">
          <SectionHeader badge="OUR JOURNEY" title="Built Over" highlight="5 Years"
            subtitle="From a solo freelancer to a full-service agency — here's how we got here." />
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px"
              style={{ background: "linear-gradient(180deg,transparent,#2ECC71,#0D518C,transparent)" }} />
            <div className="space-y-10">
              {milestones.map((m, i) => (
                <motion.div key={m.year} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                  className={`relative flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full -translate-x-1/2 mt-1 z-10 shrink-0"
                    style={{ background: i % 2 === 0 ? "#2ECC71" : "#0D518C", boxShadow: `0 0 12px ${i % 2 === 0 ? "rgba(46,204,113,0.5)" : "rgba(13,81,140,0.5)"}` }} />
                  {/* Card */}
                  <div className={`ml-12 md:ml-0 md:w-[45%] p-6 rounded-2xl ${i % 2 === 0 ? "md:mr-auto" : "md:ml-auto"}`}
                    style={{ background: "#0A0E1A", border: "1px solid #1A2540" }}>
                    <div className="font-black text-2xl mb-1" style={{ color: i % 2 === 0 ? "#2ECC71" : "#1A6BB5" }}>{m.year}</div>
                    <h3 className="text-white font-bold text-lg mb-2">{m.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{m.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Careers teaser ── */}
      <section id="careers" style={{ padding: "5rem 1.5rem", background: "#0A0E1A" }}>
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-2xl p-10 md:p-14 text-center relative overflow-hidden"
            style={{ background: "linear-gradient(135deg,rgba(13,81,140,0.3),rgba(46,204,113,0.1))", border: "1px solid rgba(46,204,113,0.2)" }}>
            <div aria-hidden className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(circle at 50% 50%,rgba(46,204,113,0.08) 0%,transparent 70%)" }} />
            <div className="relative z-10">
              <div className="text-5xl mb-4">👋</div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Want to Join Our Team?</h2>
              <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
                We&apos;re always looking for talented developers, designers and strategists who share our passion for building great digital products.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/contact"
                  className="flex items-center gap-2 font-bold px-8 py-4 rounded-xl transition-all hover:scale-105"
                  style={{ background: "#2ECC71", color: "#0A0E1A", boxShadow: "0 0 24px rgba(46,204,113,0.3)" }}>
                  Send Your CV <ArrowRight size={18} />
                </Link>
                <div className="flex items-center gap-6 text-gray-400 text-sm">
                  <span className="flex items-center gap-2"><MapPin size={14} style={{ color: "#2ECC71" }} /> Nairobi, Kenya</span>
                  <span className="flex items-center gap-2"><Globe size={14} style={{ color: "#2ECC71" }} /> Remote OK</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Contact strip ── */}
      <section style={{ padding: "3rem 1.5rem", background: "#0F1629", borderTop: "1px solid #1A2540" }}>
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white font-bold text-xl mb-1">Ready to start your project?</h3>
            <p className="text-gray-400">Let&apos;s have a free 30-minute consultation call.</p>
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            <a href="tel:+254707528980" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
              <Phone size={16} style={{ color: "#2ECC71" }} /> +254 707 528 980
            </a>
            <a href="mailto:info@solvara.solutions" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
              <Mail size={16} style={{ color: "#2ECC71" }} /> info@solvara.solutions
            </a>
            <Link href="/contact"
              className="flex items-center gap-2 font-bold px-6 py-3 rounded-xl transition-all hover:scale-105"
              style={{ background: "#2ECC71", color: "#0A0E1A" }}>
              Get In Touch <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}