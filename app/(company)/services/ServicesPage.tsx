"use client";
import React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Building2, ShoppingCart, User, Hospital, Globe, Code2,
  ArrowRight, CheckCircle2, ChevronDown, Phone, Zap, Shield, Search,
  Palette, MousePointer2, Layers, Sparkles, FileImage, PenTool,
  Monitor, Smartphone, Layout, Users,
} from "lucide-react";

/* ─── Data ───────────────────────────────────────────────────── */
const services = [
  {
    id: "corporate",
    icon: Building2,
    color: "#1A6BB5",
    bgColor: "rgba(26,107,181,0.1)",
    borderColor: "rgba(26,107,181,0.25)",
    tag: "Most Popular",
    title: "Business / Corporate Websites",
    tagline: "Your professional online presence, built to convert.",
    desc: "We build multi-page corporate websites that position your brand as an authority, generate leads and grow your business online — fully customised to your industry.",
    features: [
      "Custom multi-page design",
      "Blog / News system",
      "SEO optimization & meta tags",
      "Contact & inquiry forms",
      "Google Analytics integration",
      "Mobile-first responsive layout",
      "1 year free maintenance",
      "Social media integration",
    ],
    process: ["Discovery & brief", "Wireframes & design", "Development", "Testing & launch"],
    deliveryTime: "2–4 weeks",
    pricing: [
      { tier: "BASIC",    price: "KES 25,000 – 50,000" },
      { tier: "ADVANCED", price: "KES 50,000 – 90,000" },
    ],
  },
  {
    id: "ecommerce",
    icon: ShoppingCart,
    color: "#2ECC71",
    bgColor: "rgba(46,204,113,0.1)",
    borderColor: "rgba(46,204,113,0.25)",
    tag: "Best Value",
    title: "E-Commerce Websites",
    tagline: "Sell online with M-Pesa, cards and more.",
    desc: "Full-featured online stores with secure payment integration (M-Pesa STK Push, Visa/Mastercard), product management, cart system and a powerful admin dashboard.",
    features: [
      "M-Pesa STK Push integration",
      "Visa / Mastercard payments",
      "Product catalogue & variants",
      "Cart & checkout system",
      "Order management dashboard",
      "Inventory tracking",
      "Customer accounts",
      "Sales analytics",
    ],
    process: ["Product & brand audit", "Store design", "Payment integration", "Testing & launch"],
    deliveryTime: "3–6 weeks",
    pricing: [
      { tier: "STARTER",  price: "KES 30,000 – 60,000" },
      { tier: "STANDARD", price: "KES 60,000 – 100,000" },
      { tier: "ADVANCED", price: "KES 100,000 – 150,000+" },
    ],
  },
  {
    id: "portfolio",
    icon: User,
    color: "#9B59B6",
    bgColor: "rgba(155,89,182,0.1)",
    borderColor: "rgba(155,89,182,0.25)",
    tag: null,
    title: "Personal / Portfolio Websites",
    tagline: "Stand out and win more clients.",
    desc: "A stunning personal website that showcases your work, skills and brand with style. Perfect for freelancers, creatives, consultants and job seekers.",
    features: [
      "Custom personal branding",
      "Project / portfolio showcase",
      "Animated sections",
      "Contact & booking form",
      "CV / Resume download",
      "SEO basics",
      "Fast loading (< 2s)",
      "Mobile responsive",
    ],
    process: ["Brand brief", "Design mockup", "Development", "Launch"],
    deliveryTime: "1–2 weeks",
    pricing: [
      { tier: "BASIC",    price: "KES 8,000 – 15,000" },
      { tier: "ADVANCED", price: "KES 15,000 – 30,000" },
    ],
  },
  {
    id: "hospital",
    icon: Hospital,
    color: "#E74C3C",
    bgColor: "rgba(231,76,60,0.1)",
    borderColor: "rgba(231,76,60,0.25)",
    tag: null,
    title: "Hospital / Clinic Systems",
    tagline: "Digitise your healthcare operations.",
    desc: "End-to-end hospital and clinic management systems with patient records, appointment booking, billing, doctor management and a secure admin dashboard.",
    features: [
      "Online appointment booking",
      "Patient records management",
      "Doctor & staff portal",
      "Billing & invoicing",
      "Prescription management",
      "Secure data encryption",
      "Reports & analytics",
      "Multi-branch support",
    ],
    process: ["Operations audit", "System design", "Development & testing", "Staff training & launch"],
    deliveryTime: "6–10 weeks",
    pricing: [
      { tier: "BASIC",    price: "KES 40,000 – 90,000" },
      { tier: "ADVANCED", price: "KES 90,000 – 150,000+" },
    ],
  },
  {
    id: "government",
    icon: Globe,
    color: "#F39C12",
    bgColor: "rgba(243,156,18,0.1)",
    borderColor: "rgba(243,156,18,0.25)",
    tag: null,
    title: "Government / Institutional Sites",
    tagline: "Serving citizens with modern digital infrastructure.",
    desc: "Secure, accessible and scalable government portals and institutional websites with document management, citizen services, announcements and multilingual support.",
    features: [
      "Public information portal",
      "Document management system",
      "News & announcements",
      "Citizen service forms",
      "Multi-language support",
      "Accessibility (WCAG 2.1)",
      "High-security architecture",
      "Compliance ready",
    ],
    process: ["Stakeholder brief", "Compliance planning", "Design & development", "Testing & deployment"],
    deliveryTime: "8–14 weeks",
    pricing: [
      { tier: "BASIC",    price: "KES 40,000 – 80,000" },
      { tier: "ADVANCED", price: "KES 80,000 – 100,000" },
    ],
  },
  {
    id: "custom",
    icon: Code2,
    color: "#00BCD4",
    bgColor: "rgba(0,188,212,0.1)",
    borderColor: "rgba(0,188,212,0.25)",
    tag: "Enterprise",
    title: "Custom Web Applications",
    tagline: "Bespoke systems built for your unique workflow.",
    desc: "Complex dashboards, SaaS platforms, internal tools and workflow automation systems built from scratch with modern architecture, APIs and cloud deployment.",
    features: [
      "Custom architecture design",
      "SaaS platform development",
      "REST / GraphQL APIs",
      "Role-based access control",
      "Real-time features (WebSocket)",
      "Third-party integrations",
      "Cloud deployment (AWS/Vercel)",
      "Scalable database design",
    ],
    process: ["Technical discovery", "Architecture design", "Agile development", "QA, deployment & handover"],
    deliveryTime: "8–20 weeks",
    pricing: [
      { tier: "MVP",       price: "KES 50,000 – 100,000" },
      { tier: "FULL SAAS", price: "KES 100,000 – 150,000+" },
    ],
  },
,
  {
    id: "graphic",
    icon: Palette,
    color: "#EC4899",
    bgColor: "rgba(236,72,153,0.1)",
    borderColor: "rgba(236,72,153,0.25)",
    tag: "From KES 500",
    title: "Graphic Design",
    tagline: "Stunning visuals that make your brand unforgettable.",
    desc: "Professional graphic design for businesses, individuals and organisations. From logos and flyers to full brand identity packages — delivered fast, at the most competitive prices in Kenya.",
    features: [
      "Logo design (primary + variations)",
      "Business cards & letterheads",
      "Social media graphics (posts & covers)",
      "Flyers, posters & banners",
      "Brochures & company profiles",
      "Product packaging design",
      "Pitch deck & presentation design",
      "Print-ready & web-optimised files",
    ],
    process: ["Brief & references", "Concept design", "Revisions", "Final files delivery"],
    deliveryTime: "24hrs – 5 days",
    pricing: [
      { tier: "STANDARD",     price: "KES 500 – 1,000" },
      { tier: "PROFESSIONAL", price: "KES 1,000 –2,500" },
      { tier: "BRAND PACK",   price: "KES 5,000 – 8,000" },
    ],
  },
  {
    id: "uiux",
    icon: MousePointer2,
    color: "#F97316",
    bgColor: "rgba(249,115,22,0.1)",
    borderColor: "rgba(249,115,22,0.25)",
    tag: "High Demand",
    title: "UI/UX Design",
    tagline: "Interfaces users love — designed before a single line of code.",
    desc: "We design intuitive, conversion-optimised digital interfaces for websites and apps. Every UI/UX engagement begins with research and ends with a tested, developer-ready design system.",
    features: [
      "User research & persona development",
      "Information architecture & sitemaps",
      "Low & high-fidelity wireframes",
      "Interactive Figma prototypes",
      "Mobile & desktop responsive designs",
      "Design system & component library",
      "Usability testing & iteration",
      "Developer handoff (Figma + specs)",
    ],
    process: ["Research & discovery", "Wireframes & IA", "UI design & prototype", "Testing & handoff"],
    deliveryTime: "1–3 weeks",
    pricing: [
      { tier: "WIREFRAMES",  price: "KES 8,000 – 15,000" },
      { tier: "FULL UI",     price: "KES 20,000 – 50,000" },
      { tier: "DESIGN SYS.", price: "KES 50,000 – 100,000" },
    ],
  }
];

const whyUs = [
  { icon: Zap,      title: "Fast Delivery",     desc: "Agile sprints, regular updates, on-time launches." },
  { icon: Shield,   title: "Secure by Default", desc: "SSL, encrypted data, best-practice security on every project." },
  { icon: Search,   title: "SEO Built-In",      desc: "Every site is optimised to rank from day one." },
  { icon: Phone,    title: "24/7 Support",       desc: "WhatsApp, call or email — we're always reachable." },
];

/* ─── Service Card ───────────────────────────────────────────── */
type Service = {
  id: string; icon: React.ElementType; color: string; bgColor: string;
  borderColor: string; tag: string | null; title: string; tagline: string;
  desc: string; features: string[]; process: string[]; deliveryTime: string;
  pricing: { tier: string; price: string }[];
};
function ServiceCard({ s, index }: { s: Service; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      id={s.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="rounded-2xl overflow-hidden"
      style={{ background: "#0F1629", border: "1px solid #1A2540" }}
    >
      {/* Card header */}
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: s.bgColor, border: `1px solid ${s.borderColor}` }}>
              <s.icon size={26} style={{ color: s.color }} />
            </div>
            <div>
              {s.tag && (
                <div className="text-xs font-bold px-2 py-0.5 rounded-full mb-1 inline-block"
                  style={{ background: `${s.color}20`, color: s.color, border: `1px solid ${s.color}40` }}>
                  {s.tag}
                </div>
              )}
              <h3 className="text-white font-black text-xl leading-tight">{s.title}</h3>
            </div>
          </div>
          <div className="text-right shrink-0 hidden sm:block">
            <div className="text-xs text-gray-500 mb-1">Delivery</div>
            <div className="font-bold text-sm" style={{ color: "#2ECC71" }}>{s.deliveryTime}</div>
          </div>
        </div>

        <p className="text-[#2ECC71] font-semibold text-sm mb-3">{s.tagline}</p>
        <p className="text-gray-400 leading-relaxed mb-6">{s.desc}</p>

        {/* Pricing tiers */}
        <div className="flex flex-wrap gap-3 mb-6">
          {s.pricing.map((p) => (
            <div key={p.tier} className="px-4 py-2 rounded-xl"
              style={{ background: "rgba(13,81,140,0.2)", border: "1px solid rgba(13,81,140,0.3)" }}>
              <div className="text-xs font-black tracking-widest text-gray-400 mb-0.5">{p.tier}</div>
              <div className="text-white font-bold text-sm">{p.price}</div>
            </div>
          ))}
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 gap-2 mb-6">
          {s.features.map((f) => (
            <div key={f} className="flex items-center gap-2 text-gray-300 text-sm">
              <CheckCircle2 size={14} style={{ color: "#2ECC71" }} className="shrink-0" />
              {f}
            </div>
          ))}
        </div>

        {/* Toggle process */}
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 text-sm font-semibold mb-4 transition-colors"
          style={{ color: s.color }}
        >
          <ChevronDown size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
          {open ? "Hide" : "Show"} our process for this service
        </button>

        <AnimatePresence>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <div className="flex flex-wrap gap-3 pt-2 pb-4">
                {s.process.map((step, i) => (
                  <div key={step} className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0"
                      style={{ background: s.color }}>
                      {i + 1}
                    </div>
                    <span className="text-gray-300 text-sm">{step}</span>
                    {i < s.process.length - 1 && <ArrowRight size={12} className="text-gray-600" />}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Link href="/contact"
          className="inline-flex items-center gap-2 font-bold px-6 py-3 rounded-xl text-sm transition-all hover:scale-105"
          style={{ background: s.color === "#2ECC71" ? "#2ECC71" : s.color, color: s.color === "#2ECC71" ? "#0A0E1A" : "#fff" }}>
          Get a Quote for This <ArrowRight size={16} />
        </Link>
      </div>
    </motion.div>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function ServicesPage() {
  return (
    <div className="bg-[#0A0E1A] min-h-screen">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-32 pb-20"
        style={{ background: "linear-gradient(135deg,rgba(13,81,140,0.2) 0%,#0A0E1A 60%)" }}>
        <div aria-hidden className="absolute inset-0 opacity-[0.12] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(13,81,140,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(13,81,140,0.5) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div aria-hidden className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(13,81,140,0.2) 0%,transparent 70%)", filter: "blur(80px)" }} />

        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 text-sm font-semibold"
              style={{ background: "rgba(46,204,113,0.1)", border: "1px solid rgba(46,204,113,0.2)", color: "#2ECC71" }}>
              — OUR SERVICES —
            </div>
            <h1 className="font-black text-white leading-tight mb-6" style={{ fontSize: "clamp(2.6rem,6vw,4.5rem)" }}>
              Everything Your Business{" "}
              <span style={{ background: "linear-gradient(135deg,#2ECC71,#3DE882)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Needs Online
              </span>
            </h1>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              From simple portfolios to complex enterprise systems — we deliver eight categories of digital solutions, each built from scratch to perform.
            </p>
            {/* Quick jump nav */}
            <div className="flex flex-wrap justify-center gap-3">
              {(services as Service[]).map((s) => (
                <a key={s.id} href={`#${s.id}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-gray-300 transition-all hover:text-white"
                  style={{ background: s.bgColor, border: `1px solid ${s.borderColor}` }}>
                  <s.icon size={14} style={{ color: s.color }} />
                  {s.title.split("/")[0].trim()}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Why Us Strip ── */}
      <div style={{ background: "#0F1629", borderTop: "1px solid #1A2540", borderBottom: "1px solid #1A2540" }}>
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {whyUs.map((w, i) => (
            <motion.div key={w.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(46,204,113,0.1)", border: "1px solid rgba(46,204,113,0.2)" }}>
                <w.icon size={18} style={{ color: "#2ECC71" }} />
              </div>
              <div>
                <div className="text-white font-semibold text-sm">{w.title}</div>
                <div className="text-gray-500 text-xs mt-0.5">{w.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Services Grid ── */}
      <section style={{ padding: "5rem 1.5rem", background: "#0A0E1A" }}>
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {(services as Service[]).map((s, i) => <ServiceCard key={s.id} s={s} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "5rem 1.5rem", background: "#0F1629", borderTop: "1px solid #1A2540" }}>
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-2xl p-10 md:p-14 text-center relative overflow-hidden"
            style={{ background: "linear-gradient(135deg,rgba(13,81,140,0.3),rgba(46,204,113,0.1))", border: "1px solid rgba(46,204,113,0.2)" }}>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Not Sure Which Service You Need?</h2>
            <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
              Book a free 30-minute consultation. We&apos;ll understand your business and recommend the exact solution that fits your goals and budget.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact"
                className="flex items-center gap-2 font-bold px-8 py-4 rounded-xl text-lg transition-all hover:scale-105"
                style={{ background: "#2ECC71", color: "#0A0E1A", boxShadow: "0 0 24px rgba(46,204,113,0.3)" }}>
                Book Free Consultation <ArrowRight size={18} />
              </Link>
              <a href="tel:+254792837632"
                className="flex items-center gap-2 font-semibold px-8 py-4 rounded-xl text-lg text-white transition-all"
                style={{ background: "rgba(13,81,140,0.2)", border: "1px solid rgba(13,81,140,0.3)" }}>
                <Phone size={18} /> +254 792 837 632
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}