"use client";
import { motion } from "framer-motion";
import { Star, Quote, Zap, Shield, TrendingUp, Headphones, Smartphone, Search } from "lucide-react";

const testimonials = [
  {
    name: "James Mwangi",
    role: "CEO, TechHub Kenya",
    content: "Solvara delivered our e-commerce site in record time. M-Pesa integration worked flawlessly from day one. Sales increased by 300% in the first month.",
    rating: 5,
    avatar: "JM",
    color: "bg-blue-500",
  },
  {
    name: "Dr. Aisha Omondi",
    role: "Director, Nairobi Wellness Clinic",
    content: "Our appointment booking system is incredible. Patients can now book online 24/7. The admin dashboard gives us full control over everything.",
    rating: 5,
    avatar: "AO",
    color: "bg-green-500",
  },
  {
    name: "Sarah Kamau",
    role: "Founder, Kamau Designs",
    content: "My portfolio website looks stunning. Got 5 new clients within two weeks of launch. The SEO work they did is exceptional!",
    rating: 5,
    avatar: "SK",
    color: "bg-purple-500",
  },
  {
    name: "Peter Njoroge",
    role: "IT Manager, County Government",
    content: "Professional, responsive and delivered exactly what we needed. Our public portal is now used by thousands of citizens daily.",
    rating: 5,
    avatar: "PN",
    color: "bg-orange-500",
  },
];

const whyUs = [
  { icon: Zap, title: "Lightning Fast Delivery", desc: "We work with agile methodology to deliver projects on time, every time." },
  { icon: Shield, title: "Secure & Reliable", desc: "Enterprise-grade security on every project. SSL, backups, and uptime monitoring included." },
  { icon: TrendingUp, title: "SEO First Approach", desc: "Every website we build is optimized to rank on Google and drive organic traffic." },
  { icon: Headphones, title: "24/7 Reliable Support", desc: "Our team is always available. Get support via WhatsApp, call, or email anytime." },
  { icon: Smartphone, title: "Mobile-First Design", desc: "All our sites look stunning and work perfectly on every device — phones, tablets, desktops." },
  { icon: Search, title: "Custom Solutions", desc: "No templates. Every project is designed and built from scratch to match your vision." },
];

export default function WhyUs() {
  return (
    <>
      {/* Why Us */}
      <section className="section-padding bg-dark-DEFAULT relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="container-max px-4 sm:px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 mb-4">
              <span className="text-accent text-sm font-semibold">— WHY SOLVARA —</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Custom Solutions. <span className="text-gradient-green">Lasting Impact.</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              We don&apos;t just build websites. We build digital experiences that convert visitors into customers.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map((w, i) => (
              <motion.div
                key={w.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 rounded-2xl bg-dark-card border border-dark-border hover:border-accent/30 transition-all card-hover"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <w.icon size={22} className="text-accent" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-accent transition-colors">{w.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-dark-card relative overflow-hidden">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="container-max px-4 sm:px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 mb-4">
              <span className="text-accent text-sm font-semibold">— CLIENT REVIEWS —</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Loved by <span className="text-gradient-green">Our Clients</span>
            </h2>
            <div className="flex items-center justify-center gap-1 mb-2">
              {Array(5).fill(0).map((_, i) => <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />)}
            </div>
            <p className="text-gray-400">4.9/5 average from 200+ reviews</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-dark-DEFAULT border border-dark-border hover:border-accent/20 transition-all card-hover"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1">
                    {Array(t.rating).fill(0).map((_, j) => (
                      <Star key={j} size={14} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <Quote size={24} className="text-accent/30" />
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">&ldquo;{t.content}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white font-bold text-sm`}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{t.name}</div>
                    <div className="text-gray-400 text-xs">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}