"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, ChevronDown, Globe, ShoppingCart, User, Building2,
  Hospital, Code2, BarChart3, Phone, ArrowRight,
  BookOpen, Info, MessageSquare, Zap, Shield, TrendingUp,
  Palette, MousePointer2, FolderOpen, Calendar, Users,
  Rocket, Layers, Brain, Briefcase,
} from "lucide-react";

// ✅ Updated services — aligned with your software consultancy positioning
const services = [
  { icon: Rocket,       title: "Discovery & Strategy Sprint", desc: "Get clarity, a fixed-price quote & roadmap", href: "/investments#discovery", color: "text-[#2ECC71]" },
  { icon: Zap,          title: "MVP & Startup Launch",        desc: "Launch fast with a scalable foundation",   href: "/investments#mvp",       color: "text-blue-400" },
  { icon: Layers,       title: "Full-Scale Platform Dev",     desc: "Enterprise-grade platforms that scale",    href: "/investments#platform", color: "text-purple-400" },
  { icon: Brain,        title: "AI & Automation Solutions",   desc: "Intelligent automation & AI models",      href: "/investments#ai",        color: "text-cyan-400" },
  { icon: Shield,       title: "Legacy Modernization",        desc: "Zero-downtime migration & security",      href: "/investments#modernization", color: "text-red-400" },
  { icon: Briefcase,    title: "Dedicated Team Retainer",     desc: "Scale your team with dedicated engineers", href: "/investments#retainer", color: "text-amber-400" },
];

const company = [
  { icon: Info,          title: "About Us",   desc: "Our story, mission and vision",          href: "/about" },
  { icon: Users,         title: "Our Team",   desc: "Meet the people behind Solvara",         href: "/team" },
  { icon: FolderOpen,    title: "Portfolio",  desc: "Our live projects and design work",       href: "/portfolio" },
  { icon: BarChart3,     title: "Investments",    desc: "Transparent packages for every budget",  href: "/investments" },
  { icon: BookOpen,      title: "Blog",       desc: "Insights, tutorials and tech news",       href: "/blog" },
  { icon: MessageSquare, title: "Contact",    desc: "Let's discuss your project",              href: "/contact" },
];

const features = [
  { icon: Zap,    text: "Fast Delivery" },
  { icon: Shield, text: "Secure & Reliable" },
  { icon: TrendingUp, text: "Global Reach" },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleMouseEnter = (menu: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(menu);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 150);
  };

  return (
      <>
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled ? "glass-dark shadow-2xl py-2" : "bg-transparent py-4"
            }`}
        >
          <div className="container-max px-4 sm:px-6 flex items-center justify-between">

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                  src="/images/solvara-logo.png"
                  alt="Solvara Solutions Logo"
                  width={220}
                  height={60}
                  priority
                  className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              <Link href="/" className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg text-sm font-medium transition-all">
                Home
              </Link>

              {/* Services mega menu */}
              <div onMouseEnter={() => handleMouseEnter("services")} onMouseLeave={handleMouseLeave} className="relative">
                <button className="flex items-center gap-1 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg text-sm font-medium transition-all">
                  Services <ChevronDown size={14} className={`transition-transform ${activeMenu === "services" ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {activeMenu === "services" && (
                      <motion.div
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          onMouseEnter={() => handleMouseEnter("services")} onMouseLeave={handleMouseLeave}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[820px] glass-dark rounded-2xl p-6 shadow-2xl border border-white/10"
                      >
                        <div className="mb-4 flex items-center justify-between">
                          <div>
                            <p className="text-white font-bold text-base">Our Services</p>
                            <p className="text-gray-400 text-xs">Custom software solutions for global businesses</p>
                          </div>
                          <div className="flex gap-2">
                            {features.map((f) => (
                                <div key={f.text} className="flex items-center gap-1.5 bg-accent/10 border border-accent/20 rounded-full px-3 py-1">
                                  <f.icon size={12} className="text-accent" />
                                  <span className="text-accent text-xs font-medium">{f.text}</span>
                                </div>
                            ))}
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {services.map((s) => (
                              <Link key={s.title} href={s.href}
                                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-all group"
                                    onClick={() => setActiveMenu(null)}>
                                <div className={`mt-0.5 ${s.color}`}><s.icon size={18} /></div>
                                <div>
                                  <p className="text-white text-sm font-semibold group-hover:text-accent transition-colors">{s.title}</p>
                                  <p className="text-gray-400 text-xs mt-0.5">{s.desc}</p>
                                </div>
                              </Link>
                          ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                          <p className="text-gray-400 text-xs">Not sure which service fits your needs?</p>
                          <Link href="/book" className="flex items-center gap-2 text-accent text-sm font-semibold hover:gap-3 transition-all"
                                onClick={() => setActiveMenu(null)}>
                            Book Free Consultation <ArrowRight size={14} />
                          </Link>
                        </div>
                      </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Company menu */}
              <div onMouseEnter={() => handleMouseEnter("company")} onMouseLeave={handleMouseLeave} className="relative">
                <button className="flex items-center gap-1 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg text-sm font-medium transition-all">
                  Company <ChevronDown size={14} className={`transition-transform ${activeMenu === "company" ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {activeMenu === "company" && (
                      <motion.div
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          onMouseEnter={() => handleMouseEnter("company")} onMouseLeave={handleMouseLeave}
                          className="absolute top-full right-0 mt-2 w-64 glass-dark rounded-2xl p-4 shadow-2xl border border-white/10"
                      >
                        {company.map((c) => (
                            <Link key={c.title} href={c.href}
                                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-all group"
                                  onClick={() => setActiveMenu(null)}>
                              <div className="mt-0.5 text-primary-light"><c.icon size={16} /></div>
                              <div>
                                <p className="text-white text-sm font-semibold group-hover:text-accent transition-colors">{c.title}</p>
                                <p className="text-gray-400 text-xs mt-0.5">{c.desc}</p>
                              </div>
                            </Link>
                        ))}
                      </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/portfolio" className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg text-sm font-medium transition-all">Portfolio</Link>
              <Link href="/investments"   className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg text-sm font-medium transition-all">Investments</Link>
              <Link href="/blog"      className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg text-sm font-medium transition-all">Blog</Link>
            </div>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <Link href="/book"
                    className="flex items-center gap-2 text-gray-300 hover:text-white text-sm font-medium transition-colors"
              >
                <Calendar size={14} className="text-accent" /> Book a Call
              </Link>
              <Link href="/contact"
                    className="bg-accent hover:bg-accent-light text-dark font-bold px-5 py-2.5 rounded-xl text-sm transition-all glow-green hover:scale-105 active:scale-95"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile toggle */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors">
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </motion.nav>

        {/* ✅ Mobile menu — Updated with lime-green/dark blue gradient */}
        <AnimatePresence>
          {mobileOpen && (
              <motion.div
                  initial={{ opacity: 0, x: "100%" }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="fixed inset-0 z-40 lg:hidden overflow-y-auto"
                  style={{
                    background: "linear-gradient(135deg, #2ECC71 0%, #1a6b3a 50%, #0A0E1A 100%)",
                  }}
              >
                <div className="pt-24 pb-8 px-6">
                  {/* All links with dark text for contrast on light gradient */}
                  <Link
                      href="/"
                      onClick={() => setMobileOpen(false)}
                      className="block py-3 font-semibold border-b"
                      style={{ color: "#0A0E1A", borderColor: "rgba(10,14,26,0.15)" }}
                  >
                    Home
                  </Link>

                  {/* Mobile Services */}
                  <div>
                    <button
                        onClick={() => setMobileExpanded(mobileExpanded === "services" ? null : "services")}
                        className="w-full flex items-center justify-between py-3 font-semibold border-b"
                        style={{ color: "#0A0E1A", borderColor: "rgba(10,14,26,0.15)" }}
                    >
                      Services
                      <ChevronDown
                          size={16}
                          className={`transition-transform ${mobileExpanded === "services" ? "rotate-180" : ""}`}
                          style={{ color: "#0A0E1A" }}
                      />
                    </button>
                    <AnimatePresence>
                      {mobileExpanded === "services" && (
                          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                            {services.map((s) => (
                                <Link
                                    key={s.title}
                                    href={s.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center gap-3 py-3 pl-4 border-b"
                                    style={{ color: "#0A0E1A", borderColor: "rgba(10,14,26,0.08)" }}
                                >
                                  <s.icon size={16} className={s.color} />
                                  <span className="text-sm" style={{ color: "#0A0E1A" }}>{s.title}</span>
                                </Link>
                            ))}
                          </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Mobile Company */}
                  <div>
                    <button
                        onClick={() => setMobileExpanded(mobileExpanded === "company" ? null : "company")}
                        className="w-full flex items-center justify-between py-3 font-semibold border-b"
                        style={{ color: "#0A0E1A", borderColor: "rgba(10,14,26,0.15)" }}
                    >
                      Company
                      <ChevronDown
                          size={16}
                          className={`transition-transform ${mobileExpanded === "company" ? "rotate-180" : ""}`}
                          style={{ color: "#0A0E1A" }}
                      />
                    </button>
                    <AnimatePresence>
                      {mobileExpanded === "company" && (
                          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                            {company.map((c) => (
                                <Link
                                    key={c.title}
                                    href={c.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center gap-3 py-3 pl-4 border-b"
                                    style={{ color: "#0A0E1A", borderColor: "rgba(10,14,26,0.08)" }}
                                >
                                  <c.icon size={16} style={{ color: "#0A0E1A" }} />
                                  <span className="text-sm" style={{ color: "#0A0E1A" }}>{c.title}</span>
                                </Link>
                            ))}
                          </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Link
                      href="/portfolio"
                      onClick={() => setMobileOpen(false)}
                      className="block py-3 font-semibold border-b"
                      style={{ color: "#0A0E1A", borderColor: "rgba(10,14,26,0.15)" }}
                  >
                    Portfolio
                  </Link>
                  <Link
                      href="/investments"
                      onClick={() => setMobileOpen(false)}
                      className="block py-3 font-semibold border-b"
                      style={{ color: "#0A0E1A", borderColor: "rgba(10,14,26,0.15)" }}
                  >
                    Investments
                  </Link>
                  <Link
                      href="/blog"
                      onClick={() => setMobileOpen(false)}
                      className="block py-3 font-semibold border-b"
                      style={{ color: "#0A0E1A", borderColor: "rgba(10,14,26,0.15)" }}
                  >
                    Blog
                  </Link>
                  <Link
                      href="/book"
                      onClick={() => setMobileOpen(false)}
                      className="block py-3 font-semibold border-b"
                      style={{ color: "#0A0E1A", borderColor: "rgba(10,14,26,0.15)" }}
                  >
                    📅 Book a Call
                  </Link>
                  <Link
                      href="/contact"
                      onClick={() => setMobileOpen(false)}
                      className="block py-3 font-semibold border-b"
                      style={{ color: "#0A0E1A", borderColor: "rgba(10,14,26,0.15)" }}
                  >
                    Contact
                  </Link>

                  <div className="mt-8 space-y-4">
                    <a
                        href="tel:+254707528980"
                        className="flex items-center gap-3"
                        style={{ color: "#0A0E1A" }}
                    >
                      <Phone size={16} style={{ color: "#0A0E1A" }} />
                      <span>+254 707 528 980</span>
                    </a>
                    <a
                        href="tel:+254792837632"
                        className="flex items-center gap-3"
                        style={{ color: "#0A0E1A" }}
                    >
                      <Phone size={16} style={{ color: "#0A0E1A" }} />
                      <span>+254 792 837 632</span>
                    </a>

                    {/* ✅ Primary CTA — Dark button on light gradient */}
                    <Link
                        href="/book"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-center gap-2 w-full font-bold py-4 rounded-xl mt-4 text-lg"
                        style={{
                          background: "#0A0E1A",
                          color: "#2ECC71",
                          boxShadow: "0 4px 20px rgba(10,14,26,0.3)",
                        }}
                    >
                      <Calendar size={18} /> Book Free Consultation
                    </Link>

                    {/* ✅ Secondary CTA — Outline dark */}
                    <Link
                        href="/contact"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-center w-full font-semibold py-3 rounded-xl text-base"
                        style={{
                          border: "2px solid #0A0E1A",
                          color: "#0A0E1A",
                        }}
                    >
                      Send a Message
                    </Link>
                  </div>
                </div>
              </motion.div>
          )}
        </AnimatePresence>
      </>
  );
}