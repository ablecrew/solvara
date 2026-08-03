"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Rocket,
  Zap,
  Layers,
  Brain,
  Shield,
  Briefcase,
  ArrowRight,
  Award,
  Users,
  Clock,
  Globe,
} from "lucide-react";

const services = [
  {
    icon: Rocket,
    id: "discovery",
    title: "Discovery & Strategy Sprint",
    desc: "Get clarity, a fixed-price quote, and a roadmap before committing to development.",
    features: [
      "Deep-dive technical & business analysis",
      "System architecture design & documentation",
      "User journey mapping & wireframes",
      "Security & compliance assessment",
      "Detailed fixed-price project quote",
      "Clear roadmap & timeline",
    ],
    color: "from-emerald-500/20 to-emerald-600/5",
    iconColor: "text-[#2ECC71]",
    borderColor: "border-emerald-500/20",
    hoverBorder: "hover:border-emerald-500/50",
    badge: "Start Here",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  },
  {
    icon: Zap,
    id: "mvp",
    title: "MVP & Startup Launch",
    desc: "Launch fast with a scalable, cloud-native foundation built for growth.",
    features: [
      "Core feature development",
      "RESTful API architecture",
      "Seamless third-party integrations",
      "Admin dashboard & analytics",
      "Cloud-native deployment (AWS/Azure/GCP)",
      "Scalable foundation for growth",
    ],
    color: "from-blue-500/20 to-blue-600/5",
    iconColor: "text-blue-400",
    borderColor: "border-blue-500/20",
    hoverBorder: "hover:border-blue-500/50",
    badge: "Go-to-Market Ready",
    badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  },
  {
    icon: Layers,
    id: "platform",
    title: "Full-Scale Platform Development",
    desc: "Build robust, enterprise-grade platforms that scale with your business.",
    features: [
      "Full custom platform development",
      "Multi-tenant architecture",
      "Advanced API ecosystem",
      "Real-time features & websockets",
      "Advanced analytics & reporting",
      "SLA-backed reliability",
    ],
    color: "from-purple-500/20 to-purple-600/5",
    iconColor: "text-purple-400",
    borderColor: "border-purple-500/20",
    hoverBorder: "hover:border-purple-500/50",
    badge: "Enterprise-Grade",
    badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  },
  {
    icon: Brain,
    id: "ai",
    title: "AI & Automation Solutions",
    desc: "Harness the power of AI with custom models, automation, and intelligent systems.",
    features: [
      "Custom AI/ML model development",
      "Process automation & workflow optimization",
      "Natural language processing (NLP)",
      "Predictive analytics & forecasting",
      "Smart chatbots & virtual assistants",
      "Ongoing model optimization",
    ],
    color: "from-cyan-500/20 to-cyan-600/5",
    iconColor: "text-cyan-400",
    borderColor: "border-cyan-500/20",
    hoverBorder: "hover:border-cyan-500/50",
    badge: "Future-Ready",
    badgeColor: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  },
  {
    icon: Shield,
    id: "modernization",
    title: "Legacy Modernization & Security",
    desc: "Modernize legacy systems with zero downtime and enterprise-grade security.",
    features: [
      "Legacy system assessment & migration strategy",
      "Cloud migration & re-platforming",
      "Security audit & penetration testing",
      "Compliance (GDPR, HIPAA, SOC2)",
      "Zero-downtime migration",
      "Ongoing security monitoring",
    ],
    color: "from-red-500/20 to-red-600/5",
    iconColor: "text-red-400",
    borderColor: "border-red-500/20",
    hoverBorder: "hover:border-red-500/50",
    badge: "Risk-Free",
    badgeColor: "bg-red-500/20 text-red-400 border-red-500/30",
  },
  {
    icon: Briefcase,
    id: "retainer",
    title: "Dedicated Team Retainer",
    desc: "Scale your team with dedicated engineering resources on a flexible retainer.",
    features: [
      "Full-time dedicated software engineers",
      "Agile sprint planning & delivery",
      "Continuous feature development",
      "Bug fixes & maintenance",
      "Monthly stakeholder reviews",
      "Flexible scaling (add/remove engineers)",
    ],
    color: "from-amber-500/20 to-amber-600/5",
    iconColor: "text-amber-400",
    borderColor: "border-amber-500/20",
    hoverBorder: "hover:border-amber-500/50",
    badge: "Flexible",
    badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  },
];

export default function Services() {
  return (
      <section id="services" className="section-padding bg-dark-DEFAULT relative overflow-hidden">
        {/* ✅ Kept your original background — just the blur circle */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="container-max px-4 sm:px-6 relative z-10">
          {/* Header */}
          <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
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
              — OUR SERVICES —
            </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
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
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              We partner with global businesses to build custom software, modernize legacy systems,
              and deploy AI-driven solutions. Start with a low-risk Discovery Sprint.
            </p>

            {/* Trust Bar */}
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

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
                <motion.div
                    key={s.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                >
                  <Link
                      href={`/investments#${s.id}`}
                      className={`group relative block p-6 rounded-2xl bg-dark-card border ${s.borderColor} ${s.hoverBorder} card-hover transition-all overflow-hidden h-full`}
                  >
                    {/* Gradient background on hover */}
                    <div
                        className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                    />

                    {/* Badge */}
                    {s.badge && (
                        <div
                            className={`absolute top-4 right-4 border text-xs font-bold px-2 py-1 rounded-full ${s.badgeColor}`}
                        >
                          {s.badge}
                        </div>
                    )}

                    {/* Icon */}
                    <div className={`relative z-10 ${s.iconColor} mb-4`}>
                      <s.icon size={32} />
                    </div>

                    {/* Title */}
                    <h3 className="relative z-10 text-white font-bold text-lg mb-3 group-hover:text-[#2ECC71] transition-colors">
                      {s.title}
                    </h3>

                    {/* Description */}
                    <p className="relative z-10 text-gray-400 text-sm leading-relaxed mb-4">{s.desc}</p>

                    {/* Features (2-3 shown, rest on hover or full page) */}
                    <ul className="relative z-10 space-y-1.5 mb-4">
                      {s.features.slice(0, 3).map((f) => (
                          <li key={f} className="flex items-center gap-2 text-gray-300 text-sm">
                            <div
                                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                style={{ background: "#2ECC71" }}
                            />
                            {f}
                          </li>
                      ))}
                      {s.features.length > 3 && (
                          <li className="text-gray-500 text-xs pl-3.5">+ {s.features.length - 3} more</li>
                      )}
                    </ul>

                    {/* CTA */}
                    <div className="relative z-10 flex items-center gap-1 font-semibold text-sm transition-all group-hover:gap-2" style={{ color: "#2ECC71" }}>
                      Learn More <ArrowRight size={14} />
                    </div>
                  </Link>
                </motion.div>
            ))}
          </div>

          {/* Bottom CTAs */}
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
          >
            <Link
                href="/investments"
                className="inline-flex items-center gap-2 font-bold px-8 py-4 rounded-xl transition-all hover:scale-105"
                style={{
                  background: "#2ECC71",
                  color: "#0A0E1A",
                  boxShadow: "0 0 24px rgba(46,204,113,0.3)",
                }}
            >
              View All Services <ArrowRight size={18} />
            </Link>
            <Link
                href="/book"
                className="inline-flex items-center gap-2 font-semibold px-8 py-4 rounded-xl transition-all"
                style={{
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#fff",
                  background: "rgba(255,255,255,0.04)",
                }}
            >
              Book Free Consultation <ArrowRight size={18} />
            </Link>
          </motion.div>

          {/* Bottom Note */}
          <p className="text-gray-500 text-xs text-center mt-8 max-w-2xl mx-auto">
            🌍 Serving clients globally across North America, Europe, Africa, Asia, and the Middle East.
            Every engagement is tailored to your unique needs.
          </p>
        </div>
      </section>
  );
}