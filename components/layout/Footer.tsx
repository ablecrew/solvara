"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Mail, Globe, MapPin, ArrowRight, Send } from "lucide-react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import { useState } from "react";

const footerLinks = {
  Services: [
    { label: "Business Websites", href: "/services#corporate" },
    { label: "E-Commerce", href: "/services#ecommerce" },
    { label: "Portfolio Sites", href: "/services#portfolio" },
    { label: "Hospital Systems", href: "/services#hospital" },
    { label: "Government Sites", href: "/services#government" },
    { label: "Custom Web Apps", href: "/services#custom" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/about#team" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/about#careers" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "SLA Agreement", href: "/sla" },
  ],
};

const socials = [
  { icon: FaFacebook, href: "#", label: "Facebook" },
  { icon: FaTwitter, href: "#", label: "Twitter" },
  { icon: FaLinkedin, href: "#", label: "LinkedIn" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaGithub, href: "#", label: "GitHub" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(""); }
  };

  return (
    <footer className="bg-dark-card border-t border-dark-border relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container-max px-4 sm:px-6 py-16 relative z-10">
        {/* Top CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 mb-16 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">Ready to build something great?</h3>
            <p className="text-gray-400">Let&apos;s turn your vision into a powerful digital solution.</p>
          </div>
          <Link href="/contact"
            className="flex items-center gap-2 bg-accent hover:bg-accent-light text-dark font-bold px-8 py-4 rounded-xl transition-all hover:scale-105 whitespace-nowrap glow-green"
          >
            Start Your Project <ArrowRight size={18} />
          </Link>
        </motion.div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white font-black text-lg">S</span>
              </div>
              <div>
                <span className="text-white font-black text-xl tracking-tight">SOLVARA</span>
                <div className="text-accent text-[9px] font-semibold tracking-[0.2em] uppercase -mt-0.5">Technologies</div>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              We build modern, fast and scalable websites and web applications that help your business stand out, win trust and grow online. Your vision, our expertise. Real results.
            </p>
            <div className="space-y-3 mb-6">
              <a href="tel:+254707528980" className="flex items-center gap-3 text-gray-400 hover:text-accent transition-colors text-sm">
                <Phone size={15} className="text-accent" /> +254 707 528 980
              </a>
              <a href="tel:+254792837632" className="flex items-center gap-3 text-gray-400 hover:text-accent transition-colors text-sm">
                <Phone size={15} className="text-accent" /> +254 792 837 632
              </a>
              <a href="mailto:info@solvara.tech" className="flex items-center gap-3 text-gray-400 hover:text-accent transition-colors text-sm">
                <Mail size={15} className="text-accent" /> info@solvara.tech
              </a>
              <a href="https://solvara.tech" className="flex items-center gap-3 text-gray-400 hover:text-accent transition-colors text-sm">
                <Globe size={15} className="text-accent" /> https://solvara.vercel.app
              </a>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <MapPin size={15} className="text-accent flex-shrink-0" /> Nairobi, Kenya
              </div>
            </div>
            {/* Socials */}
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-accent/20 hover:text-accent text-gray-400 flex items-center justify-center transition-all hover:scale-110"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">{title}</h4>
              <ul className="space-y-2">
                {links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-gray-400 hover:text-accent text-sm transition-colors flex items-center gap-1 group">
                      <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -ml-3 group-hover:ml-0 transition-all" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="glass rounded-2xl p-6 mb-10">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h4 className="text-white font-bold mb-1">Subscribe to our newsletter</h4>
              <p className="text-gray-400 text-sm">Get the latest web trends, tips and case studies.</p>
            </div>
            {subscribed ? (
              <div className="text-accent font-semibold flex items-center gap-2">
                ✓ Thanks for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-3 w-full md:w-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 md:w-64 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
                />
                <button type="submit" className="bg-accent hover:bg-accent-light text-dark font-bold px-5 py-3 rounded-xl transition-all flex items-center gap-2">
                  <Send size={16} /> Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-dark-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Solvara Technologies. All rights reserved.</p>
          <p className="text-gray-500 text-sm">Solutions That Drive Growth 🚀</p>
        </div>
      </div>
    </footer>
  );
}