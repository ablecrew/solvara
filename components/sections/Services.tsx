"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Building2, ShoppingCart, User, Hospital, Globe, Code2, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Building2,
    id: "corporate",
    title: "Business / Corporate Websites",
    desc: "Professional multi-page websites with service pages, blog/news, inquiry forms and SEO optimization.",
    features: ["Multi-page layout", "SEO optimized", "Blog/News system", "Inquiry forms"],
    color: "from-blue-500/20 to-blue-600/5",
    iconColor: "text-blue-400",
    borderColor: "border-blue-500/20",
    hoverBorder: "hover:border-blue-500/50",
    badge: "Most Popular",
  },
  {
    icon: ShoppingCart,
    id: "ecommerce",
    title: "E-Commerce Websites",
    desc: "Online stores with secure payments (M-Pesa & Cards), cart & admin dashboard.",
    features: ["M-Pesa integration", "Card payments", "Admin dashboard", "Inventory management"],
    color: "from-green-500/20 to-green-600/5",
    iconColor: "text-accent",
    borderColor: "border-accent/20",
    hoverBorder: "hover:border-accent/50",
    badge: "Best Value",
  },
  {
    icon: User,
    id: "portfolio",
    title: "Personal / Portfolio Websites",
    desc: "Showcase your brand, skills and projects with style and impact.",
    features: ["Custom design", "Project showcase", "Contact forms", "Fast loading"],
    color: "from-purple-500/20 to-purple-600/5",
    iconColor: "text-purple-400",
    borderColor: "border-purple-500/20",
    hoverBorder: "hover:border-purple-500/50",
    badge: null,
  },
  {
    icon: Hospital,
    id: "hospital",
    title: "Hospital / Clinic Systems",
    desc: "Appointment booking, patient records and admin management systems.",
    features: ["Appointment booking", "Patient records", "Admin dashboard", "Secure data"],
    color: "from-red-500/20 to-red-600/5",
    iconColor: "text-red-400",
    borderColor: "border-red-500/20",
    hoverBorder: "hover:border-red-500/50",
    badge: null,
  },
  {
    icon: Globe,
    id: "government",
    title: "Government / Institutional Sites",
    desc: "Information portals, document management, announcements & more.",
    features: ["Document management", "Announcements", "Multi-language", "High security"],
    color: "from-yellow-500/20 to-yellow-600/5",
    iconColor: "text-yellow-400",
    borderColor: "border-yellow-500/20",
    hoverBorder: "hover:border-yellow-500/50",
    badge: null,
  },
  {
    icon: Code2,
    id: "custom",
    title: "Custom Web Applications",
    desc: "Dashboards, SaaS platforms and systems built for your unique workflow.",
    features: ["Custom architecture", "SaaS platforms", "API integration", "Scalable systems"],
    color: "from-cyan-500/20 to-cyan-600/5",
    iconColor: "text-cyan-400",
    borderColor: "border-cyan-500/20",
    hoverBorder: "hover:border-cyan-500/50",
    badge: "Enterprise",
  },
];

export default function Services() {
  return (
    <section id="services" className="section-padding bg-dark-DEFAULT relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container-max px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 mb-4">
            <span className="text-accent text-sm font-semibold">— OUR SERVICES —</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Everything Your Business <span className="text-gradient-green">Needs Online</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From simple portfolios to complex enterprise systems — we deliver digital solutions that perform.
          </p>
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
              <Link href={`/services#${s.id}`}
                className={`group relative block p-6 rounded-2xl bg-dark-card border ${s.borderColor} ${s.hoverBorder} card-hover transition-all overflow-hidden h-full`}
              >
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                {s.badge && (
                  <div className="absolute top-4 right-4 bg-accent/20 border border-accent/30 text-accent text-xs font-bold px-2 py-1 rounded-full">
                    {s.badge}
                  </div>
                )}

                <div className={`relative z-10 ${s.iconColor} mb-4`}>
                  <s.icon size={32} />
                </div>

                <h3 className="relative z-10 text-white font-bold text-lg mb-3 group-hover:text-accent transition-colors">{s.title}</h3>
                <p className="relative z-10 text-gray-400 text-sm leading-relaxed mb-4">{s.desc}</p>

                <ul className="relative z-10 space-y-1.5 mb-4">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-gray-300 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="relative z-10 flex items-center gap-1 text-accent font-semibold text-sm group-hover:gap-2 transition-all">
                  Learn more <ArrowRight size={14} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mt-12">
          <Link href="/services"
            className="inline-flex items-center gap-2 glass border border-white/20 hover:border-accent/40 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:bg-white/5"
          >
            View All Services <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}