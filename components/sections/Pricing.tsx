"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Building2, ShoppingCart, User, Hospital, Globe, Code2 } from "lucide-react";

const packages = [
  {
    icon: Building2,
    title: "Business / Corporate",
    tiers: [
      { name: "BASIC", price: "KES 20,000 – 48,000", color: "bg-primary/20 text-blue-300 border-primary/30" },
      { name: "ADVANCED", price: "KES 48,000 – 96,000", color: "bg-accent/20 text-accent border-accent/30" },
    ],
    features: ["Multi-page layout", "Blog/News system", "SEO optimization", "Inquiry forms", "Mobile responsive", "1 year support"],
    popular: true,
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce",
    tiers: [
      { name: "STARTER", price: "KES 32,000 – 64,000", color: "bg-primary/20 text-blue-300 border-primary/30" },
      { name: "STANDARD", price: "KES 64,000 – 120,000", color: "bg-white/10 text-gray-300 border-white/20" },
      { name: "ADVANCED", price: "KES 120,000 – 240,000+", color: "bg-accent/20 text-accent border-accent/30" },
    ],
    features: ["M-Pesa integration", "Card payments", "Admin dashboard", "Inventory system", "Order management", "Product catalog"],
    popular: false,
  },
  {
    icon: User,
    title: "Personal / Portfolio",
    tiers: [
      { name: "BASIC", price: "KES 8,000 – 16,000", color: "bg-primary/20 text-blue-300 border-primary/30" },
      { name: "ADVANCED", price: "KES 16,000 – 32,000", color: "bg-accent/20 text-accent border-accent/30" },
    ],
    features: ["Custom design", "Up to 5 pages", "Project showcase", "Contact form", "SEO basics", "Mobile first"],
    popular: false,
  },
  {
    icon: Hospital,
    title: "Hospital / Clinic",
    tiers: [
      { name: "BASIC", price: "KES 64,000 – 120,000", color: "bg-primary/20 text-blue-300 border-primary/30" },
      { name: "ADVANCED", price: "KES 120,000 – 240,000+", color: "bg-accent/20 text-accent border-accent/30" },
    ],
    features: ["Appointment booking", "Patient records", "Admin panel", "Secure data", "Reports & analytics", "Multi-doctor support"],
    popular: false,
  },
  {
    icon: Globe,
    title: "Government / Institutional",
    tiers: [
      { name: "BASIC", price: "KES 40,000 – 80,000", color: "bg-primary/20 text-blue-300 border-primary/30" },
      { name: "ADVANCED", price: "KES 80,000 – 200,000", color: "bg-accent/20 text-accent border-accent/30" },
    ],
    features: ["Document management", "Announcement system", "Public portal", "High security", "Multi-language", "Compliance ready"],
    popular: false,
  },
  {
    icon: Code2,
    title: "Custom Web Applications",
    tiers: [
      { name: "MVP", price: "KES 80,000 – 200,000", color: "bg-primary/20 text-blue-300 border-primary/30" },
      { name: "FULL SAAS", price: "KES 200,000 – 480,000+", color: "bg-accent/20 text-accent border-accent/30" },
    ],
    features: ["Custom architecture", "SaaS platform", "API integration", "Scalable design", "Analytics dashboard", "Cloud deployment"],
    popular: false,
  },
];

export default function Pricing() {
  const [selected, setSelected] = useState(0);
  const pkg = packages[selected];

  return (
    <section className="section-padding bg-dark-card relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-DEFAULT via-dark-card to-dark-DEFAULT pointer-events-none" />

      <div className="container-max px-4 sm:px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 mb-4">
            <span className="text-accent text-sm font-semibold">— PRICING PACKAGES —</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Transparent Pricing, <span className="text-gradient-green">No Hidden Fees</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Choose the package that fits your budget. All prices in Kenyan Shillings (KES).
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {packages.map((p, i) => (
            <button
              key={p.title}
              onClick={() => setSelected(i)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                selected === i
                  ? "bg-primary text-white glow-blue"
                  : "glass border border-white/10 text-gray-400 hover:text-white hover:border-primary/40"
              }`}
            >
              <p.icon size={15} />
              <span className="hidden sm:inline">{p.title.split("/")[0].trim()}</span>
            </button>
          ))}
        </div>

        {/* Pricing Card */}
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-dark rounded-2xl border border-white/10 overflow-hidden">
            <div className="p-8 border-b border-white/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <pkg.icon size={28} className="text-accent" />
                </div>
                <div>
                  <h3 className="text-white font-black text-2xl">{pkg.title}</h3>
                  {pkg.popular && (
                    <div className="inline-flex items-center gap-1 bg-accent/20 text-accent text-xs font-bold px-3 py-1 rounded-full mt-1">
                      ⭐ Most Popular
                    </div>
                  )}
                </div>
              </div>

              {/* Tier Cards */}
              <div className="grid sm:grid-cols-3 gap-4">
                {pkg.tiers.map((t) => (
                  <div key={t.name} className={`border ${t.color} rounded-xl p-4`}>
                    <div className="font-black text-xs tracking-widest mb-2 uppercase">{t.name}</div>
                    <div className="font-bold text-white text-sm leading-snug">{t.price}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8">
              <h4 className="text-white font-bold mb-4">What&apos;s Included:</h4>
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {pkg.features.map((f) => (
                  <div key={f} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle2 size={16} className="text-accent flex-shrink-0" />
                    <span className="text-sm">{f}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact"
                  className="flex-1 flex items-center justify-center gap-2 bg-accent hover:bg-accent-light text-dark font-bold px-8 py-4 rounded-xl transition-all glow-green hover:scale-105 text-center"
                >
                  Get This Package <ArrowRight size={18} />
                </Link>
                <Link href="/pricing"
                  className="flex items-center justify-center gap-2 glass border border-white/20 hover:border-accent/40 text-white font-semibold px-6 py-4 rounded-xl transition-all text-sm"
                >
                  Compare All Packages
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Guarantee */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-10">
          <p className="text-gray-400 text-sm">
            💯 <span className="text-white font-semibold">100% Satisfaction Guaranteed</span> · Free consultation · No upfront payment required
          </p>
        </motion.div>
      </div>
    </section>
  );
}