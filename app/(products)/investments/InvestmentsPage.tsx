"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Building2, ShoppingCart, User, Hospital, Globe, Code2,
  CheckCircle2, ArrowRight, Phone, HelpCircle, ChevronDown,
  Rocket, Shield, Zap, Layers, Database, Cloud, Brain,
  MessageCircle, Calendar, Clock, TrendingUp, Award, Users,
  Target, Sparkles, BarChart3, Briefcase, LucideIcon,
} from "lucide-react";

/* ─── Types ───────────────────────────────────────────────────── */

type Tier = {
  name: string;
  price: string;
  priceTo: string;
  badge?: string;
  highlight?: boolean;
  features: string[];
};

type Category = {
  id: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  borderColor: string;
  label: string;
  popular: boolean;
  tiers: Tier[];
  includes: string[];
};

/* ─── Data ───────────────────────────────────────────────────── */

const categories: Category[] = [
  {
    id: "discovery",
    icon: Rocket,
    color: "#2ECC71",
    bgColor: "rgba(46,204,113,0.12)",
    borderColor: "rgba(46,204,113,0.3)",
    label: "Discovery & Strategy Sprint",
    popular: true,
    tiers: [
      {
        name: "TECHNICAL DISCOVERY",
        price: "Start with Clarity",
        priceTo: "",
        badge: "Most Popular — Low-Risk Entry",
        highlight: false, // ✅ Explicitly false
        features: [
          "Deep-dive into your business & technical needs",
          "Full system architecture design & documentation",
          "User journey mapping & wireframes",
          "Security & compliance assessment",
          "Technical feasibility & risk analysis",
          "Detailed fixed-price project quote delivered",
          "Clear roadmap & timeline",
          "Risk-free way to start — pay only for the sprint",
        ],
      },
    ],
    includes: ["Dedicated solution architect", "Comprehensive technical spec", "Clickable prototype", "Project timeline & roadmap", "Guaranteed fixed-price quote"],
  },
  {
    id: "mvp",
    icon: Zap,
    color: "#1A6BB5",
    bgColor: "rgba(26,107,181,0.12)",
    borderColor: "rgba(26,107,181,0.3)",
    label: "MVP & Startup Launch",
    popular: false,
    tiers: [
      {
        name: "MVP ACCELERATOR",
        price: "Launch Faster",
        priceTo: "",
        badge: "Go-to-Market Ready",
        highlight: true,
        features: [
          "Core feature development",
          "Modern responsive web application",
          "RESTful API architecture",
          "Seamless third-party integrations",
          "Admin dashboard & analytics",
          "Cloud-native deployment (AWS/Azure/GCP)",
          "User authentication & authorization",
          "Scalable foundation for growth",
        ],
      },
    ],
    includes: ["CI/CD pipeline setup", "Database design", "API documentation", "SSL & security", "Performance monitoring"],
  },
  {
    id: "platform",
    icon: Layers,
    color: "#9B59B6",
    bgColor: "rgba(155,89,182,0.12)",
    borderColor: "rgba(155,89,182,0.3)",
    label: "Full-Scale Platform Development",
    popular: false,
    tiers: [
      {
        name: "ENTERPRISE PLATFORM",
        price: "Built to Scale",
        priceTo: "",
        badge: "Enterprise-Grade",
        highlight: true,
        features: [
          "Full custom platform development",
          "Multi-tenant architecture",
          "Advanced API ecosystem",
          "Unlimited custom integrations",
          "Real-time features & websockets",
          "Advanced analytics & reporting",
          "Scalable cloud-native deployment",
          "Team training & knowledge transfer",
          "SLA-backed reliability",
        ],
      },
    ],
    includes: ["Solution architecture", "DevOps & infrastructure", "Security penetration testing", "Load & stress testing", "Comprehensive documentation"],
  },
  {
    id: "ai",
    icon: Brain,
    color: "#00BCD4",
    bgColor: "rgba(0,188,212,0.12)",
    borderColor: "rgba(0,188,212,0.3)",
    label: "AI & Automation Solutions",
    popular: false,
    tiers: [
      {
        name: "AI INTEGRATION",
        price: "Intelligent Automation",
        priceTo: "",
        badge: "Future-Ready",
        highlight: true,
        features: [
          "Custom AI/ML model development",
          "Process automation & workflow optimization",
          "Natural language processing (NLP)",
          "Predictive analytics & forecasting",
          "Computer vision solutions",
          "Smart chatbots & virtual assistants",
          "API-first architecture",
          "Ongoing model optimization & retraining",
        ],
      },
    ],
    includes: ["Data preparation & cleaning", "Model training & validation", "API deployment", "Performance monitoring", "Ongoing model optimization"],
  },
  {
    id: "modernization",
    icon: Shield,
    color: "#E74C3C",
    bgColor: "rgba(231,76,60,0.12)",
    borderColor: "rgba(231,76,60,0.3)",
    label: "Legacy Modernization & Security",
    popular: false,
    tiers: [
      {
        name: "MODERNIZATION",
        price: "Secure & Upgrade",
        priceTo: "",
        badge: "Risk-Free Migration",
        highlight: true,
        features: [
          "Legacy system assessment & migration strategy",
          "Cloud migration & re-platforming",
          "Security audit & penetration testing",
          "Compliance implementation (GDPR, HIPAA, SOC2)",
          "Performance optimization & scaling",
          "Zero-downtime migration",
          "DevOps & CI/CD implementation",
          "Ongoing security monitoring",
        ],
      },
    ],
    includes: ["Security vulnerability assessment", "Data migration strategy", "Compliance documentation", "Team training", "Post-migration support"],
  },
  {
    id: "retainer",
    icon: Briefcase,
    color: "#F39C12",
    bgColor: "rgba(243,156,18,0.12)",
    borderColor: "rgba(243,156,18,0.3)",
    label: "Dedicated Team Retainer",
    popular: false,
    tiers: [
      {
        name: "DEDICATED ENGINEER",
        price: "Your Team, Extended",
        priceTo: "",
        badge: "Flexible & Scalable",
        highlight: true,
        features: [
          "Full-time dedicated software engineers",
          "Agile sprint planning & delivery",
          "Daily standups & progress reports",
          "Continuous feature development",
          "Bug fixes & maintenance",
          "Performance monitoring & optimization",
          "Monthly stakeholder reviews",
          "Flexible scaling (add/remove engineers)",
          "Direct communication with your team",
        ],
      },
    ],
    includes: ["Project management", "QA & testing", "DevOps support", "Monthly reporting", "Emergency hotfix coverage"],
  },
];

/* ─── FAQ Data ─────────────────────────────────────────────────── */

type FaqItem = {
  q: string;
  a: string;
};

const faqs: FaqItem[] = [
  {
    q: "What's the Discovery Sprint and why should I start there?",
    a: "The Discovery Sprint is our low-risk, fixed-price engagement where we deeply analyze your requirements, design the architecture, and deliver a detailed technical specification with a guaranteed quote for the full build. It's the smartest way to start—you get clarity, a fixed price, and confidence before committing to the larger investment."
  },
  {
    q: "How do you determine pricing for complex platforms?",
    a: "We use the Discovery Sprint to fully understand your requirements. The resulting technical specification includes a detailed, fixed-price quote. We never provide blind quotes for complex projects—we believe in transparency and accuracy. Your investment is based on the actual scope, not guesswork."
  },
  {
    q: "What technology stack do you use?",
    a: "We're technology-agnostic and choose the best tools for your specific needs. Typically we use React/Next.js for frontend, Python/Django or Node.js for backend, PostgreSQL/MongoDB for databases, and AWS/Azure/GCP for cloud infrastructure. We recommend the stack that optimizes for your goals, timeline, and budget."
  },
  {
    q: "Do you offer ongoing support and maintenance?",
    a: "Yes. Every project includes a support period (3–12 months depending on scope). We also offer retainer packages for ongoing development, maintenance, and scaling. Our team becomes your long-term technology partner."
  },
  {
    q: "How long does a typical project take?",
    a: "Discovery Sprints take 4 weeks. MVPs typically take 8–12 weeks. Full enterprise platforms take 4–8 months depending on complexity. We provide detailed timelines during the Discovery phase and deliver on schedule."
  },
  {
    q: "Do you work with international clients?",
    a: "Absolutely. We work with clients globally across North America, Europe, Africa, and Asia. Our team is fully remote and we communicate seamlessly across time zones. We've delivered successful projects for clients in the US, UK, Germany, UAE, Kenya, and beyond."
  },
  {
    q: "Do you handle hosting and deployment?",
    a: "Yes. We handle everything from infrastructure setup to CI/CD pipeline implementation and ongoing cloud management. We use world-class cloud providers (AWS, Azure, GCP) to ensure your platform is secure, scalable, and highly available."
  },
  {
    q: "What about data privacy and security?",
    a: "Security is built into our process from day one. We implement encryption, secure authentication, penetration testing, and comply with relevant regulations (GDPR, HIPAA, SOC2, etc.) based on your industry and location requirements. Your data's security is our top priority."
  },
];

/* ─── FAQ Item Component ────────────────────────────────────── */

function FaqItem({ q, a }: FaqItem) {
  const [open, setOpen] = useState(false);
  return (
      <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #1A2540" }}>
        <button
            onClick={() => setOpen(!open)}
            className="w-full flex items-center justify-between p-5 text-left transition-colors"
            style={{ background: open ? "#0F1629" : "#0A0E1A" }}
        >
          <span className="text-white font-semibold pr-4">{q}</span>
          <ChevronDown
              size={18}
              className={`text-[#2ECC71] shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>
        {open && (
            <div className="px-5 pb-5 text-gray-400 leading-relaxed text-sm" style={{ background: "#0F1629" }}>
              {a}
            </div>
        )}
      </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */

export default function InvestmentsPage() {
  const [active, setActive] = useState<string>("discovery");
  const category = categories.find((c) => c.id === active)!;

  return (
      <div className="bg-[#0A0E1A] min-h-screen">

        {/* ── Hero ── */}
        <section
            className="relative overflow-hidden pt-32 pb-20"
            style={{ background: "linear-gradient(135deg,rgba(13,81,140,0.2) 0%,#0A0E1A 60%)" }}
        >
          <div
              aria-hidden
              className="absolute inset-0 opacity-[0.12] pointer-events-none"
              style={{
                backgroundImage:
                    "linear-gradient(rgba(13,81,140,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(13,81,140,0.5) 1px,transparent 1px)",
                backgroundSize: "60px 60px",
              }}
          />
          <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <div
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 text-sm font-semibold"
                  style={{
                    background: "rgba(46,204,113,0.1)",
                    border: "1px solid rgba(46,204,113,0.2)",
                    color: "#2ECC71",
                  }}
              >
                — <Globe size={14} /> Global Software Consultancy —
              </div>
              <h1
                  className="font-black text-white leading-tight mb-6"
                  style={{ fontSize: "clamp(2.6rem,6vw,4.5rem)" }}
              >
                World-Class Engineering,{" "}
                <span
                    style={{
                      background: "linear-gradient(135deg,#2ECC71,#3DE882)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                >
                Tailored to You
              </span>
              </h1>
              <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
                We partner with global businesses to build custom software, modernize legacy systems,
                and deploy AI-driven solutions. Start with a low-risk Discovery Sprint to get clarity,
                a fixed-price quote, and a roadmap—all before committing.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <Award size={16} className="text-[#2ECC71]" /> Trusted Globally
              </span>
                <span className="flex items-center gap-2">
                <Users size={16} className="text-[#2ECC71]" /> 50+ Clients Worldwide
              </span>
                <span className="flex items-center gap-2">
                <Clock size={16} className="text-[#2ECC71]" /> On-Time Delivery
              </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Category Selector ── */}
        <div
            style={{
              background: "#0F1629",
              borderTop: "1px solid #1A2540",
              borderBottom: "1px solid #1A2540",
              position: "sticky",
              top: 64,
              zIndex: 30,
            }}
        >
          <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 py-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((c) => (
                  <button
                      key={c.id}
                      onClick={() => setActive(c.id)}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
                      style={
                        active === c.id
                            ? {
                              background: c.color,
                              color: c.color === "#2ECC71" ? "#0A0E1A" : "#fff",
                              boxShadow: `0 0 20px ${c.color}40`,
                            }
                            : {
                              background: "rgba(255,255,255,0.04)",
                              color: "#9CA3AF",
                              border: "1px solid #1A2540",
                            }
                      }
                  >
                    <c.icon size={15} />
                    <span className="hidden sm:inline">{c.label}</span>
                  </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Trust Bar ── */}
        <div
            style={{
              padding: "1.5rem 1rem",
              background: "#0A0E1A",
              borderBottom: "1px solid #1A2540",
            }}
        >
          <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6">
            <div className="flex flex-wrap items-center justify-center gap-8 text-xs text-gray-500 uppercase tracking-wider">
              <span>Trusted by companies across</span>
              <span className="flex items-center gap-2">
              <span className="w-6 h-4 rounded-sm bg-red-500/20 border border-red-500/30 inline-block" /> USA
            </span>
              <span className="flex items-center gap-2">
              <span className="w-6 h-4 rounded-sm bg-blue-500/20 border border-blue-500/30 inline-block" /> UK
            </span>
              <span className="flex items-center gap-2">
              <span className="w-6 h-4 rounded-sm bg-yellow-500/20 border border-yellow-500/30 inline-block" /> Germany
            </span>
              <span className="flex items-center gap-2">
              <span className="w-6 h-4 rounded-sm bg-green-500/20 border border-green-500/30 inline-block" /> UAE
            </span>
              <span className="flex items-center gap-2">
              <span className="w-6 h-4 rounded-sm bg-orange-500/20 border border-orange-500/30 inline-block" /> Kenya
            </span>
              <span className="flex items-center gap-2">
              <span className="w-6 h-4 rounded-sm bg-purple-500/20 border border-purple-500/30 inline-block" /> Singapore
            </span>
              <span className="text-[#2ECC71]">+ more</span>
            </div>
          </div>
        </div>

        {/* ── Pricing Cards ── */}
        <section style={{ padding: "4rem 1.5rem", background: "#0A0E1A" }}>
          <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6">
            <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
              {/* Category header */}
              <div className="text-center mb-12">
                <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{
                      background: category.bgColor,
                      border: `1px solid ${category.borderColor}`,
                    }}
                >
                  <category.icon size={30} style={{ color: category.color }} />
                </div>
                <h2 className="text-3xl font-black text-white mb-2">{category.label}</h2>
                {category.popular && (
                    <div
                        className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full"
                        style={{
                          background: "rgba(46,204,113,0.15)",
                          color: "#2ECC71",
                          border: "1px solid rgba(46,204,113,0.3)",
                        }}
                    >
                      ⭐ Start Here — Low-Risk Entry Point
                    </div>
                )}
              </div>

              {/* Tier cards */}
              <div
                  className={`grid gap-6 mb-10 ${
                      category.tiers.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2 max-w-3xl mx-auto"
                  }`}
              >
                {category.tiers.map((tier, i) => (
                    <motion.div
                        key={tier.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="rounded-2xl p-6 relative flex flex-col"
                        style={{
                          background: tier.highlight
                              ? `linear-gradient(135deg, ${category.bgColor}, #0F1629)`
                              : "#0F1629",
                          border: tier.highlight ? `2px solid ${category.color}` : "1px solid #1A2540",
                          boxShadow: tier.highlight ? `0 0 40px ${category.color}20` : "none",
                        }}
                    >
                      {tier.highlight && (
                          <div
                              className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-black px-4 py-1 rounded-full"
                              style={{
                                background: category.color,
                                color: category.color === "#2ECC71" ? "#0A0E1A" : "#fff",
                              }}
                          >
                            RECOMMENDED
                          </div>
                      )}
                      {tier.badge && (
                          <div
                              className="absolute -top-3 left-4 text-[10px] font-semibold px-3 py-0.5 rounded-full"
                              style={{
                                background: "rgba(46,204,113,0.15)",
                                color: "#2ECC71",
                                border: "1px solid rgba(46,204,113,0.2)",
                              }}
                          >
                            {tier.badge}
                          </div>
                      )}

                      <div className="mb-4">
                        <div className="text-xs font-black tracking-[0.2em] mb-2" style={{ color: category.color }}>
                          {tier.name}
                        </div>
                        <div className="text-white font-bold text-2xl leading-tight">
                          {tier.price}
                          {tier.priceTo && (
                              <span className="text-gray-400 text-lg font-normal"> – {tier.priceTo}</span>
                          )}
                        </div>
                        <div className="text-gray-500 text-xs mt-1">Investment tailored to your needs</div>
                      </div>

                      <ul className="space-y-2.5 mb-6 flex-1">
                        {tier.features.map((f) => (
                            <li key={f} className="flex items-center gap-2 text-gray-300 text-sm">
                              <CheckCircle2 size={14} style={{ color: category.color }} className="shrink-0" />
                              {f}
                            </li>
                        ))}
                      </ul>

                      <Link
                          href="/contact"
                          className="flex items-center justify-center gap-2 font-bold py-3 rounded-xl text-sm transition-all hover:scale-105"
                          style={
                            tier.highlight
                                ? {
                                  background: category.color,
                                  color: category.color === "#2ECC71" ? "#0A0E1A" : "#fff",
                                }
                                : {
                                  background: "rgba(255,255,255,0.06)",
                                  color: "#fff",
                                  border: "1px solid #1A2540",
                                }
                          }
                      >
                        Discuss Your Project <ArrowRight size={15} />
                      </Link>
                    </motion.div>
                ))}
              </div>

              {/* What's always included */}
              <div
                  className="rounded-2xl p-6 max-w-3xl mx-auto"
                  style={{ background: "#0F1629", border: "1px solid #1A2540" }}
              >
                <h4 className="text-white font-bold mb-4 text-center">Always Included in Every Engagement</h4>
                <div className="flex flex-wrap justify-center gap-4">
                  {category.includes.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-gray-300 text-sm">
                        <CheckCircle2 size={14} style={{ color: "#2ECC71" }} />
                        {item}
                      </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Comparison summary ── */}
        <section
            style={{
              padding: "3rem 1.5rem",
              background: "#0F1629",
              borderTop: "1px solid #1A2540",
            }}
        >
          <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-black text-white text-center mb-8">Our Services at a Glance</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                <tr style={{ borderBottom: "1px solid #1A2540" }}>
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold">Service</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold hidden sm:table-cell">
                    Ideal For
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold hidden md:table-cell">
                    Timeline
                  </th>
                  <th className="py-3 px-4"></th>
                </tr>
                </thead>
                <tbody>
                {[
                  {
                    label: "Discovery & Strategy Sprint",
                    ideal: "Clarity & Fixed Price",
                    time: "4 weeks",
                    icon: Rocket,
                    color: "#2ECC71",
                    id: "discovery",
                  },
                  {
                    label: "MVP & Startup Launch",
                    ideal: "Fast Market Entry",
                    time: "2–3 months",
                    icon: Zap,
                    color: "#1A6BB5",
                    id: "mvp",
                  },
                  {
                    label: "Full-Scale Platform Development",
                    ideal: "Enterprise Scale",
                    time: "4–8 months",
                    icon: Layers,
                    color: "#9B59B6",
                    id: "platform",
                  },
                  {
                    label: "AI & Automation Solutions",
                    ideal: "Intelligent Systems",
                    time: "3–5 months",
                    icon: Brain,
                    color: "#00BCD4",
                    id: "ai",
                  },
                  {
                    label: "Legacy Modernization & Security",
                    ideal: "Migration & Compliance",
                    time: "3–6 months",
                    icon: Shield,
                    color: "#E74C3C",
                    id: "modernization",
                  },
                  {
                    label: "Dedicated Team Retainer",
                    ideal: "Long-Term Partnership",
                    time: "Ongoing",
                    icon: Briefcase,
                    color: "#F39C12",
                    id: "retainer",
                  },
                ].map((row) => (
                    <tr
                        key={row.id}
                        className="transition-colors cursor-pointer"
                        style={{ borderBottom: "1px solid #1A2540" }}
                        onClick={() => setActive(row.id)}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                              style={{ background: `${row.color}18` }}
                          >
                            <row.icon size={15} style={{ color: row.color }} />
                          </div>
                          <span className="text-white font-medium">{row.label}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 hidden sm:table-cell text-gray-400">{row.ideal}</td>
                      <td className="py-4 px-4 hidden md:table-cell text-gray-400">{row.time}</td>
                      <td className="py-4 px-4 text-right">
                        <button
                            className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
                            style={{
                              background: active === row.id ? row.color : "rgba(255,255,255,0.06)",
                              color: active === row.id && row.color === "#2ECC71" ? "#0A0E1A" : "#fff",
                            }}
                        >
                          {active === row.id ? "Viewing" : "View"}
                        </button>
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
            <p className="text-gray-500 text-xs text-center mt-6 max-w-2xl mx-auto">
              🌍 Serving clients globally across North America, Europe, Africa, Asia, and the Middle East.
              We work in USD, EUR, GBP, and KES. Contact us for a tailored quote based on your specific needs.
            </p>
          </div>
        </section>

        {/* ── Value Proposition Section ── */}
        <section
            style={{
              padding: "4rem 1.5rem",
              background: "#0A0E1A",
              borderTop: "1px solid #1A2540",
            }}
        >
          <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
                Why Global Companies Choose{" "}
                <span
                    style={{
                      background: "linear-gradient(135deg,#2ECC71,#3DE882)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                >
                Solvara
              </span>
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div
                  className="rounded-2xl p-6 text-center"
                  style={{ background: "#0F1629", border: "1px solid #1A2540" }}
              >
                <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: "rgba(46,204,113,0.1)" }}
                >
                  <Target size={28} style={{ color: "#2ECC71" }} />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Discovery-First Approach</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  We start with a paid Discovery Sprint to give you clarity, a fixed-price quote, and confidence.
                  No surprises, no hidden costs.
                </p>
              </div>
              <div
                  className="rounded-2xl p-6 text-center"
                  style={{ background: "#0F1629", border: "1px solid #1A2540" }}
              >
                <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: "rgba(26,107,181,0.1)" }}
                >
                  <Users size={28} style={{ color: "#1A6BB5" }} />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Global Team, Local Attention</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Our distributed team works seamlessly across time zones. You get world-class engineering with
                  the personal attention of a dedicated partner.
                </p>
              </div>
              <div
                  className="rounded-2xl p-6 text-center"
                  style={{ background: "#0F1629", border: "1px solid #1A2540" }}
              >
                <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: "rgba(155,89,182,0.1)" }}
                >
                  <BarChart3 size={28} style={{ color: "#9B59B6" }} />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Built to Scale</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  We engineer solutions that grow with you. From MVP to enterprise platform, your architecture is
                  designed for scalability, security, and performance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQs ── */}
        <section style={{ padding: "5rem 1.5rem", background: "#0A0E1A" }}>
          <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <div
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-4 text-sm font-semibold"
                  style={{
                    background: "rgba(46,204,113,0.1)",
                    border: "1px solid rgba(46,204,113,0.2)",
                    color: "#2ECC71",
                  }}
              >
                — FAQs —
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
                Common Questions{" "}
                <span
                    style={{
                      background: "linear-gradient(135deg,#2ECC71,#3DE882)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                >
                Answered
              </span>
              </h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-3">
              {faqs.map((f) => (
                  <FaqItem key={f.q} q={f.q} a={f.a} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section
            style={{
              padding: "5rem 1.5rem",
              background: "#0F1629",
              borderTop: "1px solid #1A2540",
            }}
        >
          <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl p-10 md:p-14 text-center relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg,rgba(13,81,140,0.3),rgba(46,204,113,0.1))",
                  border: "1px solid rgba(46,204,113,0.2)",
                }}
            >
              <div className="text-5xl mb-4">🌍</div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
                Let's Build Something Great Together
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
                Every great partnership starts with a conversation. Tell us about your project, and we'll
                recommend the best path forward — completely free, with no obligation.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                    href="/contact"
                    className="flex items-center gap-2 font-bold px-8 py-4 rounded-xl text-lg transition-all hover:scale-105"
                    style={{
                      background: "#2ECC71",
                      color: "#0A0E1A",
                      boxShadow: "0 0 24px rgba(46,204,113,0.3)",
                    }}
                >
                  <Calendar size={20} /> Book a Free Consultation <ArrowRight size={18} />
                </Link>
                <a
                    href="tel:+254792837632"
                    className="flex items-center gap-2 font-semibold px-8 py-4 rounded-xl text-lg text-white transition-all"
                    style={{
                      background: "rgba(13,81,140,0.2)",
                      border: "1px solid rgba(13,81,140,0.3)",
                    }}
                >
                  <Phone size={18} /> +254 792 837 632
                </a>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-gray-500 text-sm">
              <span className="flex items-center gap-2">
                <Clock size={14} /> Response within 24 hours
              </span>
                <span className="flex items-center gap-2">
                <MessageCircle size={14} /> Free technical consultation
              </span>
                <span className="flex items-center gap-2">
                <TrendingUp size={14} /> No commitment required
              </span>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
  );
}