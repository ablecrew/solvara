"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, ChevronDown, Globe, ShoppingCart, User, Building2,
  Hospital, Code2, BarChart3, Phone, Mail, MapPin, ArrowRight,
  Briefcase, BookOpen, Info, MessageSquare, Zap, Shield, TrendingUp,
  Palette, MousePointer2, Users,
} from "lucide-react";

const services = [
  { icon: Building2, title: "Business / Corporate Websites", desc: "Multi-page sites with blog, SEO & inquiry forms", href: "/services#corporate", color: "text-blue-400" },
  { icon: ShoppingCart, title: "E-Commerce Websites", desc: "Online stores with M-Pesa, cart & admin dashboard", href: "/services#ecommerce", color: "text-green-400" },
  { icon: User, title: "Personal / Portfolio Websites", desc: "Showcase your brand, skills and projects", href: "/services#portfolio", color: "text-purple-400" },
  { icon: Hospital, title: "Hospital / Clinic Systems", desc: "Appointment, patient records & management", href: "/services#hospital", color: "text-red-400" },
  { icon: Globe, title: "Government / Institutional Sites", desc: "Info portals, document management & more", href: "/services#government", color: "text-yellow-400" },
  { icon: Code2, title: "Custom Web Applications", desc: "Dashboards, SaaS platforms & workflow systems", href: "/services#custom", color: "text-cyan-400" },
  { icon: Palette, title: "Graphic Design", desc: "Logos, flyers, branding & print materials — from KES 500", href: "/services#graphic", color: "text-pink-400" },
  { icon: MousePointer2, title: "UI/UX Design", desc: "Wireframes, prototypes & user-tested interfaces", href: "/services#uiux", color: "text-orange-400" },
];

const company = [
  { icon: Info, title: "About Us", desc: "Our story, mission and vision", href: "/about" },
  { icon: BarChart3, title: "Pricing", desc: "Transparent packages for every budget", href: "/pricing" },
  { icon: BookOpen, title: "Blog", desc: "Insights, tutorials and tech news", href: "/blog" },
  { icon: MessageSquare, title: "Contact", desc: "Let's discuss your project", href: "/contact" },
  { icon: Users, title: "Our Team",   desc: "Meet the people behind Solvara", href: "/team" },
  { icon: Briefcase, title: "Careers", desc: "Join our growing team", href: "/careers" },
];

const features = [
  { icon: Zap, text: "Fast Delivery" },
  { icon: Shield, text: "Secure & Reliable" },
  { icon: TrendingUp, text: "SEO Optimized" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
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
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-green transition-transform group-hover:scale-110">
              <span className="text-white font-black text-lg">S</span>
            </div>
            <div>
              <span className="text-white font-black text-xl tracking-tight">SOLVARA</span>
              <div className="text-accent text-[9px] font-semibold tracking-[0.2em] uppercase -mt-0.5">Solutions</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1" ref={menuRef}>
            <Link href="/" className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg text-sm font-medium transition-all">Home</Link>

            {/* Services Mega Menu */}
            <div
              onMouseEnter={() => handleMouseEnter("services")}
              onMouseLeave={handleMouseLeave}
              className="relative"
            >
              <button className="flex items-center gap-1 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg text-sm font-medium transition-all">
                Services <ChevronDown size={14} className={`transition-transform ${activeMenu === "services" ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {activeMenu === "services" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    onMouseEnter={() => handleMouseEnter("services")}
                    onMouseLeave={handleMouseLeave}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[820px] glass-dark rounded-2xl p-6 shadow-2xl border border-white/10"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <p className="text-white font-bold text-base">Our Services</p>
                        <p className="text-gray-400 text-xs">End-to-end digital solutions for every need</p>
                      </div>
                      <div className="flex gap-3">
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
                          onClick={() => setActiveMenu(null)}
                        >
                          <div className={`mt-0.5 ${s.color}`}><s.icon size={18} /></div>
                          <div>
                            <p className="text-white text-sm font-semibold group-hover:text-accent transition-colors">{s.title}</p>
                            <p className="text-gray-400 text-xs mt-0.5">{s.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                      <p className="text-gray-400 text-xs">Not sure which service you need?</p>
                      <Link href="/contact" className="flex items-center gap-2 text-accent text-sm font-semibold hover:gap-3 transition-all" onClick={() => setActiveMenu(null)}>
                        Get Free Consultation <ArrowRight size={14} />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Company Menu */}
            <div
              onMouseEnter={() => handleMouseEnter("company")}
              onMouseLeave={handleMouseLeave}
              className="relative"
            >
              <button className="flex items-center gap-1 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg text-sm font-medium transition-all">
                Company <ChevronDown size={14} className={`transition-transform ${activeMenu === "company" ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {activeMenu === "company" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    onMouseEnter={() => handleMouseEnter("company")}
                    onMouseLeave={handleMouseLeave}
                    className="absolute top-full right-0 mt-2 w-64 glass-dark rounded-2xl p-4 shadow-2xl border border-white/10"
                  >
                    {company.map((c) => (
                      <Link key={c.title} href={c.href}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-all group"
                        onClick={() => setActiveMenu(null)}
                      >
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

            <Link href="/pricing" className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg text-sm font-medium transition-all">Pricing</Link>
            <Link href="/blog" className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg text-sm font-medium transition-all">Blog</Link>
            <Link href="/portfolio" className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg text-sm font-medium transition-all">Portfolio</Link>
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="tel:+254792837632" className="flex items-center gap-2 text-gray-300 hover:text-white text-sm transition-colors">
              <Phone size={14} /> <span>+254 792 837 632</span>
            </Link>
            <Link href="/contact"
              className="bg-accent hover:bg-accent-light text-dark font-bold px-5 py-2.5 rounded-xl text-sm transition-all glow-green hover:scale-105 active:scale-95"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-dark-DEFAULT lg:hidden overflow-y-auto"
          >
            <div className="pt-24 pb-8 px-6">
              <Link href="/" onClick={() => setMobileOpen(false)} className="block py-3 text-white font-semibold border-b border-white/10">Home</Link>

              {/* Mobile Services */}
              <div>
                <button
                  onClick={() => setMobileExpanded(mobileExpanded === "services" ? null : "services")}
                  className="w-full flex items-center justify-between py-3 text-white font-semibold border-b border-white/10"
                >
                  Services <ChevronDown size={16} className={`transition-transform ${mobileExpanded === "services" ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {mobileExpanded === "services" && (
                    <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                      {services.map((s) => (
                        <Link key={s.title} href={s.href} onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-3 py-3 pl-4 text-gray-300 hover:text-white border-b border-white/5"
                        >
                          <s.icon size={16} className={s.color} />
                          <span className="text-sm">{s.title}</span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/about" onClick={() => setMobileOpen(false)} className="block py-3 text-white font-semibold border-b border-white/10">About</Link>
              <Link href="/pricing" onClick={() => setMobileOpen(false)} className="block py-3 text-white font-semibold border-b border-white/10">Pricing</Link>
              <Link href="/blog" onClick={() => setMobileOpen(false)} className="block py-3 text-white font-semibold border-b border-white/10">Blog</Link>
              <Link href="/contact" onClick={() => setMobileOpen(false)} className="block py-3 text-white font-semibold border-b border-white/10">Contact</Link>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-gray-300"><Phone size={16} className="text-accent" /><span>+254 707 528 980</span></div>
                <div className="flex items-center gap-3 text-gray-300"><Phone size={16} className="text-accent" /><span>+254 792 837 632</span></div>
                <div className="flex items-center gap-3 text-gray-300"><Mail size={16} className="text-accent" /><span>info@solvara.tech</span></div>
                <Link href="/contact" onClick={() => setMobileOpen(false)}
                  className="block w-full bg-accent text-dark font-bold py-4 rounded-xl text-center mt-6 text-lg"
                >
                  Get Started →
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}