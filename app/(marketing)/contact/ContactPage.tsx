"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone, Mail, Globe, MapPin, Send, CheckCircle2,
  Clock, MessageSquare, Headphones, Zap,
} from "lucide-react";

/* ─── Data ───────────────────────────────────────────────────── */
const contactMethods = [
  {
    icon: Phone,
    label: "Call Us",
    value: "+254 113 982 018",
    subValue: "+254 792 837 632",
    href: "tel:+254 792837632",
    color: "#2ECC71",
    desc: "Mon – Fri, 9am – 5pm EAT",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "info@solvara.solution",
    subValue: "support@solvara.solution",
    href: "mailto:info@solvara.solution",
    color: "#0D518C",
    desc: "We reply within 2 hours",
  },
  {
    icon: MessageSquare,
    label: "WhatsApp",
    value: "+254 792 837 632",
    subValue: "Chat with us instantly",
    href: "https://wa.me/254792837632",
    color: "#25A85E",
    desc: "Available 24/7",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "Nairobi, Kenya",
    subValue: "Westlands, Nairobi",
    href: "https://maps.google.com",
    color: "#E74C3C",
    desc: "By appointment only",
  },
];

const services = [
  "Business / Corporate Website",
  "E-Commerce Website",
  "Personal / Portfolio Website",
  "Hospital / Clinic System",
  "Government / Institutional Site",
  "Custom Web Application",
  "Website Redesign",
  "SEO & Performance",
  "Graphic Designing",
  "UI/UX Designing",
  "Other",
];

const budgets = [
  "Under KES 20,000",
  "KES 20,000 – 50,000",
  "KES 50,000 – 100,000",
  "KES 100,000 – 250,000",
  "KES 250,000+",
  "Not Sure Yet",
];

const timelines = [
  "ASAP (< 2 weeks)",
  "1 – 2 months",
  "3 – 6 months",
  "Flexible",
];

const faqs = [
  { q: "How quickly do you respond?", a: "We respond to all enquiries within 2 business hours. For urgent projects, call us directly." },
  { q: "Is the consultation really free?", a: "Yes — completely free with no obligation. We'll understand your needs and suggest the best solution." },
  { q: "Do you work with clients outside Nairobi?", a: "Absolutely. We work with clients across Kenya and internationally. All meetings can be done via Zoom or WhatsApp." },
  { q: "What happens after I submit the form?", a: "You'll receive a confirmation email. Our team will review your brief and schedule a discovery call within 24 hours." },
];

type FormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
};

/* ─── Page ───────────────────────────────────────────────────── */
export default function ContactPage() {
  const [form, setForm] = useState<FormData>({
    name: "", email: "", phone: "", company: "",
    service: "", budget: "", timeline: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  const inputClass = "w-full px-4 py-3.5 rounded-xl text-white text-sm placeholder-gray-500 outline-none transition-all";
  const inputStyle = { background: "rgba(255,255,255,0.04)", border: "1px solid #1A2540" };

  return (
    <div className="bg-[#0A0E1A] min-h-screen">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-32 pb-16"
        style={{ background: "linear-gradient(135deg,rgba(13,81,140,0.2) 0%,#0A0E1A 60%)" }}>
        <div aria-hidden className="absolute inset-0 opacity-[0.1] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(13,81,140,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(13,81,140,0.5) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div aria-hidden className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(46,204,113,0.1) 0%,transparent 70%)", filter: "blur(80px)" }} />

        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 text-sm font-semibold"
              style={{ background: "rgba(46,204,113,0.1)", border: "1px solid rgba(46,204,113,0.2)", color: "#2ECC71" }}>
              — GET IN TOUCH —
            </div>
            <h1 className="font-black text-white leading-tight mb-6" style={{ fontSize: "clamp(2.6rem,6vw,4.5rem)" }}>
              Let&apos;s Build Something{" "}
              <span style={{ background: "linear-gradient(135deg,#2ECC71,#3DE882)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Great Together
              </span>
            </h1>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              Free consultation · 2-hour response · No commitment required
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Contact Methods ── */}
      <section style={{ padding: "3rem 1.5rem 0", background: "#0A0E1A" }}>
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactMethods.map((m, i) => (
              <motion.a key={m.label} href={m.href} target={m.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="group flex items-start gap-4 p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                style={{ background: "#0F1629", border: "1px solid #1A2540" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors"
                  style={{ background: `${m.color}18`, border: `1px solid ${m.color}30` }}>
                  <m.icon size={20} style={{ color: m.color }} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold tracking-widest mb-1" style={{ color: m.color }}>{m.label}</div>
                  <div className="text-white font-semibold text-sm truncate">{m.value}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{m.desc}</div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form + Sidebar ── */}
      <section style={{ padding: "4rem 1.5rem 6rem", background: "#0A0E1A" }}>
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-col lg:flex-row gap-8">

          {/* ── Form ── */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} className="flex-1 min-w-0">
            <div className="rounded-2xl p-8" style={{ background: "#0F1629", border: "1px solid #1A2540" }}>
              <h2 className="text-2xl font-black text-white mb-2">Send Us a Message</h2>
              <p className="text-gray-400 text-sm mb-8">Fill in the details below and we&apos;ll get back to you within 2 hours.</p>

              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ background: "rgba(46,204,113,0.15)", border: "2px solid #2ECC71" }}>
                    <CheckCircle2 size={40} style={{ color: "#2ECC71" }} />
                  </div>
                  <h3 className="text-white font-black text-2xl mb-3">Message Sent! 🎉</h3>
                  <p className="text-gray-400 max-w-sm mx-auto">
                    Thank you, <span className="text-white font-semibold">{form.name || "there"}</span>! We&apos;ve received your enquiry and will contact you within 2 hours.
                  </p>
                  <button onClick={() => setSubmitted(false)}
                    className="mt-8 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105"
                    style={{ background: "rgba(46,204,113,0.1)", color: "#2ECC71", border: "1px solid rgba(46,204,113,0.3)" }}>
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-400 text-xs font-semibold mb-1.5 block">Full Name *</label>
                      <input name="name" value={form.name} onChange={handleChange} required
                        placeholder="John Mwangi" className={inputClass} style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = "#2ECC71")}
                        onBlur={(e) => (e.target.style.borderColor = "#1A2540")} />
                    </div>
                    <div>
                      <label className="text-gray-400 text-xs font-semibold mb-1.5 block">Email Address *</label>
                      <input name="email" type="email" value={form.email} onChange={handleChange} required
                        placeholder="john@company.com" className={inputClass} style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = "#2ECC71")}
                        onBlur={(e) => (e.target.style.borderColor = "#1A2540")} />
                    </div>
                  </div>

                  {/* Phone + Company */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-400 text-xs font-semibold mb-1.5 block">Phone Number</label>
                      <input name="phone" value={form.phone} onChange={handleChange}
                        placeholder="+254 700 000 000" className={inputClass} style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = "#2ECC71")}
                        onBlur={(e) => (e.target.style.borderColor = "#1A2540")} />
                    </div>
                    <div>
                      <label className="text-gray-400 text-xs font-semibold mb-1.5 block">Company / Organisation</label>
                      <input name="company" value={form.company} onChange={handleChange}
                        placeholder="Your Business Name" className={inputClass} style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = "#2ECC71")}
                        onBlur={(e) => (e.target.style.borderColor = "#1A2540")} />
                    </div>
                  </div>

                  {/* Service */}
                  <div>
                    <label className="text-gray-400 text-xs font-semibold mb-1.5 block">Service Interested In *</label>
                    <select name="service" value={form.service} onChange={handleChange} required
                      className={inputClass} style={{ ...inputStyle, color: form.service ? "#fff" : "#6b7280" }}>
                      <option value="" disabled>Select a service...</option>
                      {services.map((s) => <option key={s} value={s} style={{ background: "#0F1629" }}>{s}</option>)}
                    </select>
                  </div>

                  {/* Budget + Timeline */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-400 text-xs font-semibold mb-1.5 block">Estimated Budget</label>
                      <select name="budget" value={form.budget} onChange={handleChange}
                        className={inputClass} style={{ ...inputStyle, color: form.budget ? "#fff" : "#6b7280" }}>
                        <option value="" disabled>Select budget range...</option>
                        {budgets.map((b) => <option key={b} value={b} style={{ background: "#0F1629" }}>{b}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-gray-400 text-xs font-semibold mb-1.5 block">Project Timeline</label>
                      <select name="timeline" value={form.timeline} onChange={handleChange}
                        className={inputClass} style={{ ...inputStyle, color: form.timeline ? "#fff" : "#6b7280" }}>
                        <option value="" disabled>When do you need it?</option>
                        {timelines.map((t) => <option key={t} value={t} style={{ background: "#0F1629" }}>{t}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-gray-400 text-xs font-semibold mb-1.5 block">Project Description *</label>
                    <textarea name="message" value={form.message} onChange={handleChange} required rows={5}
                      placeholder="Tell us about your project — what you need, your target audience, any specific features..."
                      className={inputClass} style={{ ...inputStyle, resize: "vertical" }}
                      onFocus={(e) => (e.target.style.borderColor = "#2ECC71")}
                      onBlur={(e) => (e.target.style.borderColor = "#1A2540")} />
                  </div>

                  <button type="submit" disabled={loading}
                    className="w-full flex items-center justify-center gap-3 font-black py-4 rounded-xl text-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-70 disabled:scale-100"
                    style={{ background: "#2ECC71", color: "#0A0E1A", boxShadow: "0 0 28px rgba(46,204,113,0.3)" }}>
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-[#0A0E1A]/30 border-t-[#0A0E1A] rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <><Send size={20} /> Send Message</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* ── Sidebar ── */}
          <motion.aside initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} className="w-full lg:w-80 shrink-0 space-y-6">

            {/* Response promise */}
            <div className="rounded-2xl p-6" style={{ background: "#0F1629", border: "1px solid #1A2540" }}>
              <h3 className="text-white font-bold mb-5">What Happens Next?</h3>
              {[
                { icon: Send,        color: "#2ECC71", step: "1", title: "Submit your brief",    desc: "Fill the form with your project details." },
                { icon: Clock,       color: "#0D518C", step: "2", title: "We review (≤ 2hrs)",  desc: "Our team reads your brief and prepares questions." },
                { icon: Headphones,  color: "#2ECC71", step: "3", title: "Discovery call",       desc: "Free 30-min call to align on goals and scope." },
                { icon: Zap,         color: "#0D518C", step: "4", title: "Proposal & kickoff",   desc: "We send a detailed quote and we get to work." },
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-3 mb-5 last:mb-0">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0"
                    style={{ background: s.color }}>
                    {s.step}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{s.title}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Office hours */}
            <div className="rounded-2xl p-6" style={{ background: "#0F1629", border: "1px solid #1A2540" }}>
              <div className="flex items-center gap-2 mb-4">
                <Clock size={16} style={{ color: "#2ECC71" }} />
                <h3 className="text-white font-bold">Office Hours</h3>
              </div>
              {[
                { day: "Monday – Friday",  time: "9:00 AM – 5:00 PM" },
                { day: "Saturday",         time: "Emergency Only" },
                { day: "Sunday",           time: "9:00 AM – 4:00 PM" },
              ].map((h) => (
                <div key={h.day} className="flex justify-between items-center py-2.5"
                  style={{ borderBottom: "1px solid #1A2540" }}>
                  <span className="text-gray-400 text-sm">{h.day}</span>
                  <span className="text-white text-sm font-semibold">{h.time}</span>
                </div>
              ))}
              <div className="mt-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#2ECC71] animate-pulse" />
                <span className="text-[#2ECC71] text-xs font-semibold">WhatsApp available 24/7</span>
              </div>
            </div>

            {/* FAQs */}
            <div className="rounded-2xl p-6" style={{ background: "#0F1629", border: "1px solid #1A2540" }}>
              <h3 className="text-white font-bold mb-5">Quick Answers</h3>
              <div className="space-y-3">
                {faqs.map((f, i) => (
                  <div key={i}>
                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full text-left flex items-start justify-between gap-2 text-sm">
                      <span className="text-gray-300 font-medium leading-snug">{f.q}</span>
                      <span style={{ color: "#2ECC71" }} className="shrink-0 text-lg leading-none">
                        {openFaq === i ? "−" : "+"}
                      </span>
                    </button>
                    {openFaq === i && (
                      <p className="text-gray-500 text-xs mt-2 leading-relaxed pl-0">{f.a}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Social / direct contact */}
            <div className="rounded-2xl p-6 text-center relative overflow-hidden"
              style={{ background: "linear-gradient(135deg,rgba(13,81,140,0.3),rgba(46,204,113,0.1))", border: "1px solid rgba(46,204,113,0.2)" }}>
              <Globe size={32} className="mx-auto mb-3" style={{ color: "#2ECC71" }} />
              <h3 className="text-white font-bold mb-1">Visit Our Website</h3>
              <a href="https://solvara.vercel.app" className="text-[#2ECC71] text-sm hover:underline">
                solvara.vercel.app
              </a>
              <div className="mt-4 pt-4 text-gray-400 text-xs" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                 Westlands, Nairobi, Kenya
              </div>
            </div>
          </motion.aside>
        </div>
      </section>
    </div>
  );
}