"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, Mail, Phone, MapPin, Globe, GitBranch,
  AtSign, Code2, Palette, CheckCircle2, Star,
  ChevronDown, ExternalLink, Award, Zap, Users,
} from "lucide-react";

/* ─── Team Data ──────────────────────────────────────────────── */
const team = [
  {
    id: 1,
    name: "Otieno Tonny Onyango",
    role: "Director of Engineering & Product Innovation",
    department: "Engineering",
    photo: "https://res.cloudinary.com/dg14rzy7r/image/upload/v1783508965/Tonny_som52c.jpg",
    avatar: "OT",
    color: "#0D518C",
    accentColor: "#1A6BB5",
    tagline: "Build working products, solve real problems, ensure clients grow.",
    bio: [
      "Otieno Tonny Onyango is the Director of Engineering and Product Innovation at Solvara Solutions — a tech and consultancy firm that builds scalable digital solutions for businesses across Africa and beyond.",
      "With over three years of hands-on experience in full-stack development, cloud infrastructure, and service operations engineering, Tonny bridges the gap between business processes and technical execution. He leads the development of custom web applications, institutional systems, e-commerce platforms, and digital dashboards — ensuring that every product is scalable, reliable, and built to solve real problems.",
      "Tonny has led the delivery of hospital management systems, integrated payment platforms, and business automation tools — working with clients across healthcare, education, retail, and logistics. His work has helped businesses digitize operations, improve service delivery, and increase revenue through technology.",
      "Beyond building products, Tonny is passionate about innovation and automation. He is currently expanding his skills in AI-driven workflows, using tools like n8n and Python to automate repetitive business tasks and improve operational efficiency.",
    ],
    skills: ["Full-Stack Development", "Cloud Infrastructure", "AWS", "Google Cloud", "Node.js", "React", "Python", "n8n Automation", "CISM"],
    certifications: ["AWS Certified", "Google Cloud Certified", "CISM Certified"],
    experience: "3+ years",
    projects: "50+",
    location: "Kenya",
    email: "tonnyonyango79@gmail.com",
    phone: "+254792837632",
    social: {
      email: "tonnyonyango79@gmail.com",
      linkedin: "https://www.linkedin.com/in/otieno-onyango-8a63953a5?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    },
    achievements: [
      "Led delivery of hospital management systems across Kenya",
      "Built integrated M-Pesa payment platforms for retail & logistics",
      "Architected business automation tools serving healthcare & education",
      "Certified in AWS, Google Cloud and CISM",
    ],
    icon: Code2,
    featured: true,
  },
  {
    id: 2,
    name: "Daltone Dande",
    role: "Creative Director & Lead Graphic Designer",
    department: "Design",
    photo: "https://res.cloudinary.com/dg14rzy7r/image/upload/v1783515583/1000101960_oyve4l.jpg",
    avatar: "DD",
    color: "#EC4899",
    accentColor: "#F472B6",
    tagline: "Great design doesn't just look good — it communicates, converts and endures.",
    bio: [
      "Daltone Dande is the Creative Director and Lead Graphic Designer at Solvara Solutions, bringing a rare combination of artistic vision and strategic thinking to every project. With a deep mastery of both print and digital design, Daltone shapes the visual identity of brands that want to stand out and be remembered.",
      "His expertise spans the full spectrum of visual communication — from brand identity and logo design to social media graphics, marketing materials, UI design, and digital content creation. Whether a business needs a compelling flyer, a professional company profile, or a complete brand overhaul, Daltone delivers work that is polished, purposeful and built to make an impact.",
      "Proficient in the industry's leading tools — Adobe Photoshop, Adobe Illustrator, Adobe InDesign, CorelDRAW, and Canva — Daltone seamlessly transitions between complex print production and pixel-perfect digital execution. His process is rooted in understanding the client's audience first, then crafting visuals that speak directly to them.",
      "At Solvara, Daltone leads all creative output, ensures visual consistency across every client deliverable, and champions the belief that world-class design should be accessible to every business — no matter their size or budget.",
    ],
    skills: ["Adobe Photoshop", "Adobe Illustrator", "Adobe InDesign", "CorelDRAW", "Canva", "Brand Identity", "Logo Design", "Social Media Graphics", "UI Design", "Print Design"],
    certifications: ["Adobe Certified Professional", "Brand Strategy Specialist"],
    experience: "4+ years",
    projects: "200+",
    location: "Kenya",
    email: "daltone@solvara.solutions",
    phone: "+254113982018",
    social: {
      email: "daltone@solvara.solutions",
    },
    achievements: [
      "Designed brand identities for 50+ Kenyan businesses",
      "Delivered 200+ print and digital design projects",
      "Built Solvara's visual identity and design language",
      "Expert in Adobe Creative Suite & CorelDRAW",
    ],
    icon: Palette,
    featured: true,
  },
  {
    id: 3,
    name: "Duke Teddy",
    role: "Lead Tech & Chief Technology Officer",
    department: "Engineering",
    photo: "https://res.cloudinary.com/dg14rzy7r/image/upload/v1783515583/1000101959_a7kbjx.jpg",
    avatar: "DT",
    color: "#2ECC71",
    accentColor: "#3DE882",
    tagline: "Technology is only valuable when it works for people — that's what I build.",
    bio: [
      "Duke Teddy is the Lead Technologist and Chief Technology Officer at Solvara Solutions, the architect of the company's technical direction and the driving force behind its culture of engineering excellence. He combines deep full-stack expertise with a product-minded approach — ensuring that every system Solvara ships is not only technically sound but genuinely useful to the people who depend on it.",
      "Duke leads all strategic technology decisions at Solvara, from platform architecture and developer tooling to client technical advisory and quality assurance. His fingerprint is on every major product the company has delivered — from complex e-commerce ecosystems and hospital information systems to scalable SaaS platforms and government digital portals.",
      "With a passion for clean code, thoughtful system design, and relentless problem-solving, Duke has built a reputation for turning ambitious client visions into reliable, high-performance digital products. He thrives at the intersection of engineering rigour and business impact — making technology decisions that move the needle for clients across industries.",
      "Outside of building products, Duke is an active open-source contributor and a vocal advocate for raising the bar of software engineering across the East African tech ecosystem. He believes the best technology is invisible — it just works, every time.",
    ],
    skills: ["System Architecture", "Full-Stack Engineering", "Next.js", "TypeScript", "Node.js", "Cloud Platforms", "DevOps", "API Design", "Technical Leadership", "Open Source"],
    certifications: ["Full-Stack Engineering Lead", "Cloud Architecture Specialist"],
    experience: "3+ years",
    projects: "100+",
    location: "Kenya",
    email: "solvarasolutions@gmail.com",
    phone: "+254707528980",
    social: {
      github: "https://github.com/ablecrew",
      linkedin: "https://www.linkedin.com/in/teddy-dande-0b804b310/",
      email: "solvarasolutions@gmail.com",
    },
    achievements: [
      "Architected Solvara's entire technical stack and product delivery pipeline",
      "Delivered 100+ projects spanning e-commerce, healthcare and government sectors",
      "Active open-source contributor on GitHub (@ablecrew)",
      "Champions engineering best practices across the East African tech ecosystem",
    ],
    icon: Code2,
    featured: true,
  },
];

/* ─── Social Icon Map ────────────────────────────────────────── */
function SocialLink({ platform, href, color }: { platform: string; href: string; color: string }) {
  const configs: Record<string, { icon: React.ElementType; label: string; bg: string }> = {
    github:   { icon: GitBranch, label: "GitHub",   bg: "rgba(255,255,255,0.08)" },
    linkedin: { icon: AtSign,    label: "LinkedIn",  bg: "rgba(10,102,194,0.2)" },
    email:    { icon: Mail,      label: "Email",     bg: "rgba(46,204,113,0.15)" },
    phone:    { icon: Phone,     label: "Phone",     bg: "rgba(13,81,140,0.2)" },
  };

  const cfg = configs[platform];
  if (!cfg) return null;
  const Icon = cfg.icon;

  const isEmail = platform === "email";
  const finalHref = isEmail ? `mailto:${href}` : platform === "phone" ? `tel:${href}` : href;

  return (
    <a
      href={finalHref}
      target={platform === "github" || platform === "linkedin" ? "_blank" : undefined}
      rel="noopener noreferrer"
      title={cfg.label}
      className="group flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all hover:scale-105"
      style={{ background: cfg.bg, border: `1px solid ${color}25`, color: "#d1d5db" }}
    >
      <Icon size={13} style={{ color }} />
      <span className="group-hover:text-white transition-colors">{cfg.label}</span>
      <ExternalLink size={10} className="opacity-40 group-hover:opacity-80" />
    </a>
  );
}

/* ─── Featured Team Card ─────────────────────────────────────── */
function FeaturedCard({ member, index }: { member: typeof team[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className="rounded-3xl overflow-hidden relative"
      style={{ background: "#0F1629", border: `1px solid ${member.color}30` }}
    >
      {/* Top accent bar */}
      <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${member.color}, ${member.accentColor}, transparent)` }} />

      <div className="p-6 sm:p-8">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row gap-6 mb-6">

          {/* Photo / Avatar */}
          <div className="relative shrink-0 mx-auto sm:mx-0">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden relative"
              style={{ border: `3px solid ${member.color}50`, boxShadow: `0 0 30px ${member.color}25` }}>
              {member.photo ? (
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="object-cover object-top"
                  sizes="128px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-black text-3xl text-white"
                  style={{ background: `linear-gradient(135deg, ${member.color}40, ${member.accentColor}20)` }}>
                  {member.avatar}
                </div>
              )}
            </div>
            {/* Online indicator */}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-[#0F1629]"
              style={{ background: "#2ECC71" }} />
          </div>

          {/* Name + role + quick info */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start mb-1 flex-wrap">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                style={{ background: `${member.color}18`, color: member.color, border: `1px solid ${member.color}30` }}>
                {member.department}
              </span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                style={{ background: "rgba(46,204,113,0.1)", color: "#2ECC71", border: "1px solid rgba(46,204,113,0.2)" }}>
                ✦ Core Team
              </span>
            </div>
            <h3 className="text-white font-black text-xl sm:text-2xl leading-tight mb-1">{member.name}</h3>
            <p className="font-semibold text-sm mb-3" style={{ color: member.color }}>{member.role}</p>

            <div className="flex flex-wrap gap-3 justify-center sm:justify-start text-xs text-gray-400">
              <span className="flex items-center gap-1.5">
                <MapPin size={11} style={{ color: member.color }} /> {member.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Zap size={11} style={{ color: "#2ECC71" }} /> {member.experience} exp.
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={11} style={{ color: "#2ECC71" }} /> {member.projects} projects
              </span>
            </div>
          </div>
        </div>

        {/* Tagline */}
        <blockquote className="text-gray-300 text-sm italic leading-relaxed mb-5 pl-4 relative">
          <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full" style={{ background: member.color }} />
          &ldquo;{member.tagline}&rdquo;
        </blockquote>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-5">
          {member.skills.slice(0, 6).map((s) => (
            <span key={s} className="text-xs px-3 py-1 rounded-full text-gray-300 transition-colors hover:text-white"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid #1A2540" }}>
              {s}
            </span>
          ))}
          {member.skills.length > 6 && (
            <span className="text-xs px-3 py-1 rounded-full font-semibold"
              style={{ background: `${member.color}18`, color: member.color }}>
              +{member.skills.length - 6} more
            </span>
          )}
        </div>

        {/* Social links */}
        <div className="flex flex-wrap gap-2 mb-5">
          {Object.entries(member.social).map(([platform, href]) => (
            <SocialLink key={platform} platform={platform} href={href} color={member.color} />
          ))}
          {member.phone && (
            <SocialLink platform="phone" href={member.phone} color={member.color} />
          )}
        </div>

        {/* Expand button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all"
          style={{
            background: expanded ? `${member.color}15` : "rgba(255,255,255,0.04)",
            border: `1px solid ${expanded ? member.color + "40" : "#1A2540"}`,
            color: expanded ? member.color : "#9CA3AF",
          }}
        >
          {expanded ? "Hide Full Bio" : "Read Full Bio"}
          <ChevronDown size={15} className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* ── Expanded bio section ── */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <div className="px-6 sm:px-8 pb-8" style={{ borderTop: `1px solid ${member.color}20` }}>
              <div className="pt-6 space-y-4 mb-6">
                {member.bio.map((para, i) => (
                  <p key={i} className="text-gray-400 text-sm leading-relaxed">{para}</p>
                ))}
              </div>

              {/* Achievements */}
              <div className="rounded-2xl p-5 mb-5" style={{ background: "rgba(0,0,0,0.2)", border: "1px solid #1A2540" }}>
                <h4 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                  <Star size={14} style={{ color: member.color }} /> Key Achievements
                </h4>
                <ul className="space-y-2.5">
                  {member.achievements.map((a) => (
                    <li key={a} className="flex items-start gap-2.5 text-gray-300 text-sm">
                      <CheckCircle2 size={13} style={{ color: "#2ECC71" }} className="shrink-0 mt-0.5" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Certifications */}
              <div className="mb-5">
                <h4 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                  <Award size={14} style={{ color: member.color }} /> Certifications
                </h4>
                <div className="flex flex-wrap gap-2">
                  {member.certifications.map((c) => (
                    <div key={c} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-semibold"
                      style={{ background: `${member.color}15`, color: member.color, border: `1px solid ${member.color}30` }}>
                      <Award size={10} /> {c}
                    </div>
                  ))}
                </div>
              </div>

              {/* All skills */}
              <div>
                <h4 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                  <Zap size={14} style={{ color: member.color }} /> Full Skill Set
                </h4>
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((s) => (
                    <span key={s} className="text-xs px-3 py-1.5 rounded-full text-gray-200"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid #1A2540" }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function TeamPage() {
  return (
    <div className="bg-[#0A0E1A] min-h-screen">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-32 pb-20"
        style={{ background: "linear-gradient(135deg,rgba(13,81,140,0.22) 0%,#0A0E1A 65%)" }}>
        {/* Grid */}
        <div aria-hidden className="absolute inset-0 opacity-[0.1] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(13,81,140,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(13,81,140,0.5) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        {/* Glow top-right */}
        <div aria-hidden className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(46,204,113,0.1) 0%,transparent 70%)", filter: "blur(90px)" }} />
        {/* Glow bottom-left */}
        <div aria-hidden className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(13,81,140,0.15) 0%,transparent 70%)", filter: "blur(80px)" }} />

        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 rounded-full px-5 py-2 mb-6 text-sm font-semibold"
              style={{ background: "rgba(46,204,113,0.1)", border: "1px solid rgba(46,204,113,0.25)", color: "#2ECC71" }}>
              — MEET THE TEAM —
            </div>
            <h1 className="font-black text-white leading-tight mb-5" style={{ fontSize: "clamp(2.6rem,6vw,4.8rem)" }}>
              The Minds Behind{" "}
              <span style={{ background: "linear-gradient(135deg,#2ECC71,#3DE882)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Solvara
              </span>
            </h1>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              A compact, high-performance team united by one mission — building digital products that make a real difference for businesses across Africa.
            </p>

            {/* Team stats */}
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { value: "3",     label: "Core Team Members",   color: "#2ECC71" },
                { value: "3+",   label: "Years Combined Exp.",  color: "#0D518C" },
                { value: "50+",  label: "Projects Delivered",   color: "#2ECC71" },
                { value: "100%",  label: "Client Satisfaction",  color: "#0D518C" },
              ].map((s) => (
                <div key={s.label} className="px-5 py-3 rounded-2xl text-center"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid #1A2540", minWidth: 110 }}>
                  <div className="font-black text-2xl" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-gray-400 text-xs mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Departments strip ── */}
      <div style={{ background: "#0F1629", borderTop: "1px solid #1A2540", borderBottom: "1px solid #1A2540" }}>
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 py-5 flex flex-wrap gap-4 justify-center">
          {[
            { icon: Code2,    label: "Engineering",  count: 2, color: "#0D518C" },
            { icon: Palette,  label: "Design",       count: 1, color: "#EC4899" },
          ].map((d) => (
            <div key={d.label} className="flex items-center gap-3 px-5 py-3 rounded-xl"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid #1A2540" }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: `${d.color}18` }}>
                <d.icon size={16} style={{ color: d.color }} />
              </div>
              <div>
                <div className="text-white font-semibold text-sm">{d.label}</div>
                <div className="text-gray-500 text-xs">{d.count} member{d.count > 1 ? "s" : ""}</div>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-3 px-5 py-3 rounded-xl"
            style={{ background: "rgba(46,204,113,0.06)", border: "1px solid rgba(46,204,113,0.15)" }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(46,204,113,0.15)" }}>
              <Users size={16} style={{ color: "#2ECC71" }} />
            </div>
            <div>
              <div className="text-white font-semibold text-sm">Full Team</div>
              <div style={{ color: "#2ECC71" }} className="text-xs font-semibold">3 Members</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Team Cards ── */}
      <section style={{ padding: "5rem 1.5rem", background: "#0A0E1A" }}>
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6">

          {/* Section label */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
              Core Team —{" "}
              <span style={{ background: "linear-gradient(135deg,#2ECC71,#3DE882)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                The People You Work With
              </span>
            </h2>
            <p className="text-gray-500 text-sm">Click &ldquo;Read Full Bio&rdquo; on any card to learn more about each team member.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-7">
            {team.map((member, i) => (
              <FeaturedCard key={member.id} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Values strip ── */}
      <section style={{ padding: "4rem 1.5rem", background: "#0F1629", borderTop: "1px solid #1A2540" }}>
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: Code2,   color: "#0D518C", title: "Engineering First",       desc: "Every solution starts with clean architecture, rigorous testing and a long-term mindset." },
              { icon: Palette, color: "#EC4899", title: "Design with Intent",       desc: "Beautiful is not enough — every design decision serves a business or user purpose." },
              { icon: Zap,     color: "#2ECC71", title: "Speed & Reliability",      desc: "We move fast without cutting corners — delivering on time, every time, without excuses." },
            ].map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-5 rounded-2xl"
                style={{ background: "#0A0E1A", border: "1px solid #1A2540" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${v.color}15`, border: `1px solid ${v.color}25` }}>
                  <v.icon size={18} style={{ color: v.color }} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm mb-1">{v.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Join CTA ── */}
      <section style={{ padding: "5rem 1.5rem", background: "#0A0E1A" }}>
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
            style={{ background: "linear-gradient(135deg,rgba(13,81,140,0.25),rgba(46,204,113,0.08))", border: "1px solid rgba(46,204,113,0.2)" }}>
            {/* Background accent */}
            <div aria-hidden className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(circle at 60% 40%,rgba(46,204,113,0.07) 0%,transparent 60%)" }} />
            <div className="relative z-10">
              <div className="text-5xl mb-4">👋</div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
                Want to Join This Team?
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
                We&apos;re a small, focused team that&apos;s always open to exceptional talent. If you&apos;re passionate about building great digital products, we&apos;d love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/careers"
                  className="flex items-center gap-2 font-bold px-8 py-4 rounded-xl text-lg transition-all hover:scale-105"
                  style={{ background: "#2ECC71", color: "#0A0E1A", boxShadow: "0 0 28px rgba(46,204,113,0.3)" }}>
                  View Open Roles <ArrowRight size={18} />
                </Link>
                <a href="mailto:solvarasolutions@gmail.com"
                  className="flex items-center gap-2 font-semibold px-8 py-4 rounded-xl text-lg text-white transition-all hover:brightness-125"
                  style={{ background: "rgba(13,81,140,0.2)", border: "1px solid rgba(13,81,140,0.35)" }}>
                  <Mail size={18} /> Send Your CV
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}