"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Building2, ShoppingCart, User, Hospital, Globe, Code2,
  CheckCircle2, ArrowRight, Phone, HelpCircle, ChevronDown,
} from "lucide-react";

/* ─── Data ───────────────────────────────────────────────────── */
const categories = [
  {
    id: "corporate",
    icon: Building2,
    color: "#1A6BB5",
    bgColor: "rgba(26,107,181,0.12)",
    borderColor: "rgba(26,107,181,0.3)",
    label: "Business / Corporate",
    popular: true,
    tiers: [
      {
        name: "BASIC", price: "KES 20,000", priceTo: "48,000",
        features: ["Up to 5 pages", "Contact form", "Basic SEO", "Mobile responsive", "1 month support"],
      },
      {
        name: "ADVANCED", price: "KES 48,000", priceTo: "96,000",
        features: ["Unlimited pages", "Blog / News system", "Advanced SEO", "Google Analytics", "Social media links", "6 months support", "Speed optimization"],
        highlight: true,
      },
    ],
    includes: ["Custom design", "Mobile responsive", "SSL certificate", "Free domain setup", "Training session"],
  },
  {
    id: "ecommerce",
    icon: ShoppingCart,
    color: "#2ECC71",
    bgColor: "rgba(46,204,113,0.12)",
    borderColor: "rgba(46,204,113,0.3)",
    label: "E-Commerce",
    popular: false,
    tiers: [
      {
        name: "STARTER", price: "KES 32,000", priceTo: "64,000",
        features: ["Up to 50 products", "M-Pesa integration", "Basic cart", "Order management", "3 months support"],
      },
      {
        name: "STANDARD", price: "KES 64,000", priceTo: "120,000",
        features: ["Up to 500 products", "M-Pesa + Cards", "Advanced cart", "Inventory system", "Customer accounts", "6 months support"],
        highlight: true,
      },
      {
        name: "ADVANCED", price: "KES 120,000", priceTo: "240,000+",
        features: ["Unlimited products", "All payment methods", "Multi-currency", "Analytics dashboard", "API integrations", "1 year support", "Priority support"],
      },
    ],
    includes: ["Payment gateway setup", "Product import", "Admin training", "SSL certificate", "1 month free hosting"],
  },
  {
    id: "portfolio",
    icon: User,
    color: "#9B59B6",
    bgColor: "rgba(155,89,182,0.12)",
    borderColor: "rgba(155,89,182,0.3)",
    label: "Personal / Portfolio",
    popular: false,
    tiers: [
      {
        name: "BASIC", price: "KES 8,000", priceTo: "16,000",
        features: ["1–3 pages", "Contact form", "Basic design", "Mobile responsive"],
      },
      {
        name: "ADVANCED", price: "KES 16,000", priceTo: "32,000",
        features: ["Up to 6 pages", "Portfolio showcase", "Animations", "CV download", "Blog section", "3 months support"],
        highlight: true,
      },
    ],
    includes: ["Custom design", "Mobile responsive", "SSL certificate", "Domain setup"],
  },
  {
    id: "hospital",
    icon: Hospital,
    color: "#E74C3C",
    bgColor: "rgba(231,76,60,0.12)",
    borderColor: "rgba(231,76,60,0.3)",
    label: "Hospital / Clinic",
    popular: false,
    tiers: [
      {
        name: "BASIC", price: "KES 64,000", priceTo: "120,000",
        features: ["Appointment booking", "Patient records", "Basic admin panel", "Reports", "3 months support"],
      },
      {
        name: "ADVANCED", price: "KES 120,000", priceTo: "240,000+",
        features: ["Full HMS", "Multi-doctor support", "Billing system", "Prescription management", "Multi-branch", "1 year support", "Staff training"],
        highlight: true,
      },
    ],
    includes: ["Data migration", "Staff training", "HIPAA-aware design", "SSL & security audit", "6 months free support"],
  },
  {
    id: "government",
    icon: Globe,
    color: "#F39C12",
    bgColor: "rgba(243,156,18,0.12)",
    borderColor: "rgba(243,156,18,0.3)",
    label: "Government / Institutional",
    popular: false,
    tiers: [
      {
        name: "BASIC", price: "KES 40,000", priceTo: "80,000",
        features: ["Public info portal", "Announcements", "Document downloads", "Contact forms", "3 months support"],
      },
      {
        name: "ADVANCED", price: "KES 80,000", priceTo: "200,000",
        features: ["Full citizen portal", "Document management", "Multi-language", "Accessibility (WCAG)", "Secure architecture", "1 year support"],
        highlight: true,
      },
    ],
    includes: ["Compliance review", "Accessibility audit", "Staff training", "SSL & security", "6 months support"],
  },
  {
    id: "custom",
    icon: Code2,
    color: "#00BCD4",
    bgColor: "rgba(0,188,212,0.12)",
    borderColor: "rgba(0,188,212,0.3)",
    label: "Custom Web Applications",
    popular: false,
    tiers: [
      {
        name: "MVP", price: "KES 80,000", priceTo: "200,000",
        features: ["Core features only", "REST API", "Basic dashboard", "1 integration", "3 months support"],
      },
      {
        name: "FULL SAAS", price: "KES 200,000", priceTo: "480,000+",
        features: ["Full platform", "Multi-tenant", "Advanced APIs", "Unlimited integrations", "Real-time features", "Cloud deployment", "1 year support", "SLA agreement"],
        highlight: true,
      },
    ],
    includes: ["Technical discovery", "Architecture docs", "API documentation", "Cloud deployment", "Code handover"],
  },
];

const faqs = [
  { q: "Do I pay the full amount upfront?", a: "No — we work on a 50/50 model. You pay 50% to begin and 50% on final delivery. For larger projects we can arrange milestone-based payments." },
  { q: "What's included in 'support'?", a: "Support covers bug fixes, minor content updates, security patches and technical assistance via WhatsApp, email or call during the support period." },
  { q: "Can I upgrade my package later?", a: "Absolutely. All our projects are built to scale. You can upgrade to a higher tier or add features at any time — we'll quote the additional cost." },
  { q: "Do you offer hosting?", a: "Yes. We can host your site on fast, reliable cloud infrastructure. Hosting is priced separately based on your traffic and storage needs." },
  { q: "How long does delivery take?", a: "It varies by project complexity. Portfolio sites take 1–2 weeks, corporate sites 2–4 weeks, e-commerce 3–6 weeks and custom applications 8–20 weeks." },
  { q: "Do the prices include domain and hosting?", a: "Prices cover design and development only. Domain registration (~KES 1,500/yr) and hosting are charged separately, but we handle the setup for you." },
];

/* ─── FAQ Item ───────────────────────────────────────────────── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #1A2540" }}>
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left transition-colors"
        style={{ background: open ? "#0F1629" : "#0A0E1A" }}>
        <span className="text-white font-semibold pr-4">{q}</span>
        <ChevronDown size={18} className={`text-[#2ECC71] shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
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
export default function PricingPage() {
  const [active, setActive] = useState("corporate");
  const category = categories.find((c) => c.id === active)!;

  return (
    <div className="bg-[#0A0E1A] min-h-screen">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-32 pb-20"
        style={{ background: "linear-gradient(135deg,rgba(13,81,140,0.2) 0%,#0A0E1A 60%)" }}>
        <div aria-hidden className="absolute inset-0 opacity-[0.12] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(13,81,140,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(13,81,140,0.5) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 text-sm font-semibold"
              style={{ background: "rgba(46,204,113,0.1)", border: "1px solid rgba(46,204,113,0.2)", color: "#2ECC71" }}>
              — PRICING PACKAGES —
            </div>
            <h1 className="font-black text-white leading-tight mb-6" style={{ fontSize: "clamp(2.6rem,6vw,4.5rem)" }}>
              Transparent Pricing,{" "}
              <span style={{ background: "linear-gradient(135deg,#2ECC71,#3DE882)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                No Hidden Fees
              </span>
            </h1>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
              All prices in Kenyan Shillings (KES). Every package includes a free consultation, custom design and ongoing support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Category Selector ── */}
      <div style={{ background: "#0F1629", borderTop: "1px solid #1A2540", borderBottom: "1px solid #1A2540", position: "sticky", top: 64, zIndex: 30 }}>
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((c) => (
              <button key={c.id} onClick={() => setActive(c.id)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
                style={active === c.id
                  ? { background: c.color, color: c.color === "#2ECC71" ? "#0A0E1A" : "#fff", boxShadow: `0 0 20px ${c.color}40` }
                  : { background: "rgba(255,255,255,0.04)", color: "#9CA3AF", border: "1px solid #1A2540" }}>
                <c.icon size={15} />
                <span className="hidden sm:inline">{c.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Pricing Cards ── */}
      <section style={{ padding: "4rem 1.5rem", background: "#0A0E1A" }}>
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6">
          <motion.div key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>

            {/* Category header */}
            <div className="text-center mb-12">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: category.bgColor, border: `1px solid ${category.borderColor}` }}>
                <category.icon size={30} style={{ color: category.color }} />
              </div>
              <h2 className="text-3xl font-black text-white mb-2">{category.label}</h2>
              {category.popular && (
                <div className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full"
                  style={{ background: "rgba(46,204,113,0.15)", color: "#2ECC71", border: "1px solid rgba(46,204,113,0.3)" }}>
                  ⭐ Most Requested Service
                </div>
              )}
            </div>

            {/* Tier cards */}
            <div className={`grid gap-6 mb-10 ${category.tiers.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2 max-w-3xl mx-auto"}`}>
              {category.tiers.map((tier, i) => (
                <motion.div key={tier.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl p-6 relative flex flex-col"
                  style={{
                    background: tier.highlight ? `linear-gradient(135deg, ${category.bgColor}, #0F1629)` : "#0F1629",
                    border: tier.highlight ? `2px solid ${category.color}` : "1px solid #1A2540",
                    boxShadow: tier.highlight ? `0 0 40px ${category.color}20` : "none",
                  }}>
                  {tier.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-black px-4 py-1 rounded-full"
                      style={{ background: category.color, color: category.color === "#2ECC71" ? "#0A0E1A" : "#fff" }}>
                      RECOMMENDED
                    </div>
                  )}

                  <div className="mb-4">
                    <div className="text-xs font-black tracking-[0.2em] mb-2" style={{ color: category.color }}>{tier.name}</div>
                    <div className="text-white font-black text-2xl leading-tight">
                      {tier.price}
                      <span className="text-gray-400 text-lg font-normal"> – {tier.priceTo}</span>
                    </div>
                  </div>

                  <ul className="space-y-2.5 mb-6 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-gray-300 text-sm">
                        <CheckCircle2 size={14} style={{ color: category.color }} className="shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link href="/contact"
                    className="flex items-center justify-center gap-2 font-bold py-3 rounded-xl text-sm transition-all hover:scale-105"
                    style={tier.highlight
                      ? { background: category.color, color: category.color === "#2ECC71" ? "#0A0E1A" : "#fff" }
                      : { background: "rgba(255,255,255,0.06)", color: "#fff", border: "1px solid #1A2540" }}>
                    Get This Package <ArrowRight size={15} />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* What's always included */}
            <div className="rounded-2xl p-6 max-w-3xl mx-auto"
              style={{ background: "#0F1629", border: "1px solid #1A2540" }}>
              <h4 className="text-white font-bold mb-4 text-center">Always Included in Every Package</h4>
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
      <section style={{ padding: "3rem 1.5rem", background: "#0F1629", borderTop: "1px solid #1A2540" }}>
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-black text-white text-center mb-8">All Services at a Glance</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid #1A2540" }}>
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold">Service</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold hidden sm:table-cell">Starting From</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold hidden md:table-cell">Delivery</th>
                  <th className="py-3 px-4"></th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Business / Corporate", from: "KES 20,000", time: "2–4 weeks",   icon: Building2, color: "#1A6BB5", id: "corporate" },
                  { label: "E-Commerce",            from: "KES 32,000", time: "3–6 weeks",   icon: ShoppingCart, color: "#2ECC71", id: "ecommerce" },
                  { label: "Personal / Portfolio",  from: "KES 8,000",  time: "1–2 weeks",   icon: User, color: "#9B59B6", id: "portfolio" },
                  { label: "Hospital / Clinic",     from: "KES 40,000", time: "6–10 weeks",  icon: Hospital, color: "#E74C3C", id: "hospital" },
                  { label: "Government / Inst.",    from: "KES 40,000", time: "8–14 weeks",  icon: Globe, color: "#F39C12", id: "government" },
                  { label: "Custom Web App",        from: "KES 60,000", time: "8–20 weeks",  icon: Code2, color: "#00BCD4", id: "custom" },
                ].map((row) => (
                  <tr key={row.id} className="transition-colors cursor-pointer"
                    style={{ borderBottom: "1px solid #1A2540" }}
                    onClick={() => setActive(row.id)}>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: `${row.color}18` }}>
                          <row.icon size={15} style={{ color: row.color }} />
                        </div>
                        <span className="text-white font-medium">{row.label}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 hidden sm:table-cell">
                      <span style={{ color: "#2ECC71" }} className="font-semibold">{row.from}</span>
                    </td>
                    <td className="py-4 px-4 hidden md:table-cell text-gray-400">{row.time}</td>
                    <td className="py-4 px-4 text-right">
                      <button className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
                        style={{ background: active === row.id ? row.color : "rgba(255,255,255,0.06)",
                          color: active === row.id && row.color === "#2ECC71" ? "#0A0E1A" : "#fff" }}>
                        {active === row.id ? "Viewing" : "View"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section style={{ padding: "5rem 1.5rem", background: "#0A0E1A" }}>
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-4 text-sm font-semibold"
              style={{ background: "rgba(46,204,113,0.1)", border: "1px solid rgba(46,204,113,0.2)", color: "#2ECC71" }}>
              — FAQs —
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Common Questions <span style={{ background: "linear-gradient(135deg,#2ECC71,#3DE882)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Answered</span>
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section style={{ padding: "5rem 1.5rem", background: "#0F1629", borderTop: "1px solid #1A2540" }}>
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-2xl p-10 md:p-14 text-center relative overflow-hidden"
            style={{ background: "linear-gradient(135deg,rgba(13,81,140,0.3),rgba(46,204,113,0.1))", border: "1px solid rgba(46,204,113,0.2)" }}>
            <div className="text-5xl mb-4">💬</div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Get a Custom Quote</h2>
            <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
              Every project is unique. Tell us what you need and we&apos;ll send you a tailored quote within 24 hours — completely free.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact"
                className="flex items-center gap-2 font-bold px-8 py-4 rounded-xl text-lg transition-all hover:scale-105"
                style={{ background: "#2ECC71", color: "#0A0E1A", boxShadow: "0 0 24px rgba(46,204,113,0.3)" }}>
                Request a Quote <ArrowRight size={18} />
              </Link>
              <a href="tel:+254792837632"
                className="flex items-center gap-2 font-semibold px-8 py-4 rounded-xl text-lg text-white transition-all"
                style={{ background: "rgba(13,81,140,0.2)", border: "1px solid rgba(13,81,140,0.3)" }}>
                <Phone size={18} /> +254 792 837 632
              </a>
            </div>
            <p className="text-gray-500 text-sm mt-6 flex items-center justify-center gap-2">
              <HelpCircle size={14} /> No commitment required · Response within 24 hours
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}