"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  Rocket,
  Zap,
  Layers,
  Brain,
  Shield,
  Briefcase,
  Globe,
  Award,
  Users,
  Clock,
  Calendar,
  Phone,
  MessageCircle,
  TrendingUp,
} from "lucide-react";

const services = [
  {
    icon: Rocket,
    title: "Discovery & Strategy Sprint",
    color: "#2ECC71",
    bgColor: "rgba(46,204,113,0.12)",
    borderColor: "rgba(46,204,113,0.3)",
    popular: true,
    tag: "Start Here — Low-Risk Entry",
    description: "Get clarity, a fixed-price quote, and a roadmap before committing.",
    features: [
      "Deep-dive into your business & technical needs",
      "Full system architecture design & documentation",
      "User journey mapping & wireframes",
      "Security & compliance assessment",
      "Technical feasibility & risk analysis",
      "Detailed fixed-price project quote delivered",
      "Clear roadmap & timeline",
    ],
    cta: "Start with Clarity",
  },
  {
    icon: Zap,
    title: "MVP & Startup Launch",
    color: "#1A6BB5",
    bgColor: "rgba(26,107,181,0.12)",
    borderColor: "rgba(26,107,181,0.3)",
    popular: false,
    tag: "Go-to-Market Ready",
    description: "Launch your product fast with a scalable foundation.",
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
    cta: "Launch Faster",
  },
  {
    icon: Layers,
    title: "Full-Scale Platform Development",
    color: "#9B59B6",
    bgColor: "rgba(155,89,182,0.12)",
    borderColor: "rgba(155,89,182,0.3)",
    popular: false,
    tag: "Enterprise-Grade",
    description: "Build robust, scalable platforms for enterprise growth.",
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
    cta: "Built to Scale",
  },
  {
    icon: Brain,
    title: "AI & Automation Solutions",
    color: "#00BCD4",
    bgColor: "rgba(0,188,212,0.12)",
    borderColor: "rgba(0,188,212,0.3)",
    popular: false,
    tag: "Future-Ready",
    description: "Intelligent automation and AI-powered solutions.",
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
    cta: "Intelligent Automation",
  },
  {
    icon: Shield,
    title: "Legacy Modernization & Security",
    color: "#E74C3C",
    bgColor: "rgba(231,76,60,0.12)",
    borderColor: "rgba(231,76,60,0.3)",
    popular: false,
    tag: "Risk-Free Migration",
    description: "Modernize legacy systems with zero downtime.",
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
    cta: "Secure & Upgrade",
  },
  {
    icon: Briefcase,
    title: "Dedicated Team Retainer",
    color: "#F39C12",
    bgColor: "rgba(243,156,18,0.12)",
    borderColor: "rgba(243,156,18,0.3)",
    popular: false,
    tag: "Flexible & Scalable",
    description: "Scale your team with dedicated engineering resources.",
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
    cta: "Your Team, Extended",
  },
];

export default function Investments() {
  const [selected, setSelected] = useState(0);
  const service = services[selected];

  return (
      <section className="section-padding bg-dark-card relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-DEFAULT via-dark-card to-dark-DEFAULT pointer-events-none" />

        <div className="container-max px-4 sm:px-6 relative z-10">
          <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
          >
            <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-4"
                style={{
                  background: "rgba(46,204,113,0.1)",
                  border: "1px solid rgba(46,204,113,0.2)",
                }}
            >
              <Globe size={14} style={{ color: "#2ECC71" }} />
              <span className="text-sm font-semibold" style={{ color: "#2ECC71" }}>
              — Global Software Consultancy —
            </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Smart Investments for{" "}
              <span
                  style={{
                    background: "linear-gradient(135deg,#2ECC71,#3DE882)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
              >
              Digital Growth
            </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              We partner with global businesses to build custom software, modernize legacy systems,
              and deploy AI-driven solutions. Every engagement is tailored to your unique needs.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <Award size={16} style={{ color: "#2ECC71" }} /> Trusted Globally
            </span>
              <span className="flex items-center gap-2">
              <Users size={16} style={{ color: "#2ECC71" }} /> 50+ Clients Worldwide
            </span>
              <span className="flex items-center gap-2">
              <Clock size={16} style={{ color: "#2ECC71" }} /> On-Time Delivery
            </span>
            </div>
          </motion.div>

          {/* Service Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {services.map((s, i) => (
                <button
                    key={s.title}
                    onClick={() => setSelected(i)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
                    style={
                      selected === i
                          ? {
                            background: s.color,
                            color: s.color === "#2ECC71" ? "#0A0E1A" : "#fff",
                            boxShadow: `0 0 20px ${s.color}40`,
                          }
                          : {
                            background: "rgba(255,255,255,0.04)",
                            color: "#9CA3AF",
                            border: "1px solid #1A2540",
                          }
                    }
                >
                  <s.icon size={15} />
                  <span className="hidden sm:inline">{s.title}</span>
                </button>
            ))}
          </div>

          {/* Service Detail Card */}
          <motion.div
              key={selected}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto"
          >
            <div
                className="rounded-2xl overflow-hidden"
                style={{
                  background: "#0F1629",
                  border: service.popular ? `2px solid ${service.color}` : "1px solid #1A2540",
                  boxShadow: service.popular ? `0 0 40px ${service.color}20` : "none",
                }}
            >
              {/* Header */}
              <div
                  className="p-8"
                  style={{
                    borderBottom: `1px solid ${service.borderColor}`,
                    background: service.bgColor,
                  }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{
                        background: service.bgColor,
                        border: `1px solid ${service.borderColor}`,
                      }}
                  >
                    <service.icon size={28} style={{ color: service.color }} />
                  </div>
                  <div>
                    <h3 className="text-white font-black text-2xl">{service.title}</h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      {service.popular && (
                          <div
                              className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full"
                              style={{
                                background: "rgba(46,204,113,0.15)",
                                color: "#2ECC71",
                                border: "1px solid rgba(46,204,113,0.3)",
                              }}
                          >
                            ⭐ Start Here — Low-Risk Entry
                          </div>
                      )}
                      <div
                          className="inline-flex items-center text-[10px] font-semibold px-3 py-0.5 rounded-full"
                          style={{
                            background: "rgba(46,204,113,0.12)",
                            color: "#2ECC71",
                            border: "1px solid rgba(46,204,113,0.15)",
                          }}
                      >
                        {service.tag}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-400 text-sm">{service.description}</p>
              </div>

              {/* Features */}
              <div className="p-8">
                <h4 className="text-white font-bold mb-4">
                  What&apos;s Included:
                </h4>
                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                  {service.features.map((f) => (
                      <div key={f} className="flex items-center gap-3 text-gray-300">
                        <CheckCircle2 size={16} style={{ color: service.color }} className="flex-shrink-0" />
                        <span className="text-sm">{f}</span>
                      </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                      href="/contact"
                      className="flex-1 flex items-center justify-center gap-2 font-bold px-8 py-4 rounded-xl transition-all hover:scale-105 text-center"
                      style={{
                        background: service.color,
                        color: service.color === "#2ECC71" ? "#0A0E1A" : "#fff",
                        boxShadow: `0 0 24px ${service.color}30`,
                      }}
                  >
                    Discuss Your Project <ArrowRight size={18} />
                  </Link>
                  <Link
                      href="/book"
                      className="flex items-center justify-center gap-2 font-semibold px-6 py-4 rounded-xl transition-all text-sm"
                      style={{
                        border: "1px solid rgba(255,255,255,0.15)",
                        color: "#fff",
                        background: "rgba(255,255,255,0.04)",
                      }}
                  >
                    <Calendar size={16} /> Book Free Consultation
                  </Link>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-gray-500 text-xs flex items-center justify-center gap-4">
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> Response within 24 hours
                  </span>
                    <span className="flex items-center gap-1">
                    <MessageCircle size={12} /> Free technical consultation
                  </span>
                    <span className="flex items-center gap-1">
                    <TrendingUp size={12} /> No commitment required
                  </span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Comparison Table */}
          <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-16"
          >
            <h4 className="text-white font-bold text-center mb-6 text-xl">
              Our Services at a Glance
            </h4>
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
                    title: "Discovery & Strategy Sprint",
                    ideal: "Clarity & Fixed Price",
                    time: "4 weeks",
                    icon: Rocket,
                    color: "#2ECC71",
                    id: 0,
                  },
                  {
                    title: "MVP & Startup Launch",
                    ideal: "Fast Market Entry",
                    time: "2–3 months",
                    icon: Zap,
                    color: "#1A6BB5",
                    id: 1,
                  },
                  {
                    title: "Full-Scale Platform Development",
                    ideal: "Enterprise Scale",
                    time: "4–8 months",
                    icon: Layers,
                    color: "#9B59B6",
                    id: 2,
                  },
                  {
                    title: "AI & Automation Solutions",
                    ideal: "Intelligent Systems",
                    time: "3–5 months",
                    icon: Brain,
                    color: "#00BCD4",
                    id: 3,
                  },
                  {
                    title: "Legacy Modernization & Security",
                    ideal: "Migration & Compliance",
                    time: "3–6 months",
                    icon: Shield,
                    color: "#E74C3C",
                    id: 4,
                  },
                  {
                    title: "Dedicated Team Retainer",
                    ideal: "Long-Term Partnership",
                    time: "Ongoing",
                    icon: Briefcase,
                    color: "#F39C12",
                    id: 5,
                  },
                ].map((row) => (
                    <tr
                        key={row.id}
                        className="transition-colors cursor-pointer"
                        style={{
                          borderBottom: "1px solid #1A2540",
                          background: selected === row.id ? "rgba(255,255,255,0.03)" : "transparent",
                        }}
                        onClick={() => setSelected(row.id)}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                              style={{ background: `${row.color}18` }}
                          >
                            <row.icon size={15} style={{ color: row.color }} />
                          </div>
                          <span className="text-white font-medium">{row.title}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 hidden sm:table-cell text-gray-400">
                        {row.ideal}
                      </td>
                      <td className="py-4 px-4 hidden md:table-cell text-gray-400">
                        {row.time}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button
                            className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
                            style={{
                              background: selected === row.id ? row.color : "rgba(255,255,255,0.06)",
                              color:
                                  selected === row.id && row.color === "#2ECC71"
                                      ? "#0A0E1A"
                                      : selected === row.id
                                          ? "#fff"
                                          : "#9CA3AF",
                            }}
                        >
                          {selected === row.id ? "Viewing" : "View"}
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
          </motion.div>

          {/* Guarantee */}
          <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-10"
          >
            <p className="text-gray-400 text-sm flex flex-wrap items-center justify-center gap-4">
            <span className="flex items-center gap-2">
              <Award size={14} style={{ color: "#2ECC71" }} />
              <span className="text-white font-semibold">100% Satisfaction Guaranteed</span>
            </span>
              <span className="flex items-center gap-2">
              <MessageCircle size={14} style={{ color: "#2ECC71" }} />
              Free consultation
            </span>
              <span className="flex items-center gap-2">
              <CheckCircle2 size={14} style={{ color: "#2ECC71" }} />
              No upfront payment required
            </span>
            </p>
          </motion.div>
        </div>
      </section>
  );
}