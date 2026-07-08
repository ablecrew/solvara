"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ExternalLink, Globe, Code2, Palette, Star,
  CheckCircle2, Zap, Shield, Users, Layers,
  GraduationCap, Ticket, Mic, Monitor, Coffee,
  Heart, BookOpen, ShoppingBag, Sparkles, Eye,
  Smartphone, Server, CreditCard, BarChart3,
  MessageSquare, ChevronDown,
} from "lucide-react";

/* ════════════════════════════════════════════════════════════
   PORTFOLIO — ALL PROJECTS
   ════════════════════════════════════════════════════════════ */

type Category = "all" | "web" | "ecommerce" | "system" | "creative" | "design";

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string[];
  longDescription: string;
  url: string;
  category: Category[];
  color: string;
  accentColor: string;
  icon: React.ElementType;
  features: string[];
  technologies: string[];
  stats?: { label: string; value: string; icon: React.ElementType }[];
  testimonial?: { text: string; author: string; role: string };
  status: "live" | "case-study" | "launching-soon";
  year: string;
  client?: string;
  location?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "MediCore",
    subtitle: "Health Care Management System",
    description: [
      "A comprehensive hospital and clinic management system digitizing patient workflows from registration to discharge.",
      "Built for healthcare facilities that need to eliminate paperwork, reduce wait times, and improve patient outcomes through technology.",
    ],
    longDescription:
      "MediCore is a full-featured healthcare management platform designed specifically for African hospitals and clinics. It handles patient records (EHR), appointments, billing with M-Pesa integration, pharmacy/inventory management, lab results, doctor scheduling, and detailed analytics dashboards.",
    url: "https://medicore-z9li.onrender.com",
    category: ["web", "system"],
    color: "#0D518C",
    accentColor: "#1A6BB5",
    icon: Heart,
    features: [
      "Electronic Health Records (EHR)",
      "Appointment booking & reminders",
      "M-Pesa integrated payments",
      "Pharmacy & inventory tracking",
      "Lab results management",
      "Doctor/patient portal dashboard",
      "SMS appointment notifications",
      "Role-based access control",
    ],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Tailwind CSS", "M-Pesa Daraja API", "Twilio SMS", "Prisma ORM"],
    stats: [
      { label: "Patient Records", value: "10K+", icon: Users },
      { label: "Uptime", value: "99.9%", icon: Shield },
      { label: "Registration Time", value: "<2 min", icon: Zap },
      { label: "Active Facilities", value: "5+", icon: Layers },
    ],
    testimonial: {
      text: "MediCore reduced our patient registration time by 80% and eliminated lost medical records entirely.",
      author: "Dr. Grace Mwangi",
      role: "Medical Director, Nairobi Family Clinic",
    },
    status: "live",
    year: "2024",
    client: "Private Healthcare Network",
    location: "Nairobi, Kenya",
  },
  {
    id: 2,
    title: "EduSync",
    subtitle: "School Management System with AI Support",
    description: [
      "An intelligent school management platform combining admin tools with AI-powered assistance for students, teachers, and parents.",
      "Designed for Kenyan schools of all sizes — from small academies to large institutions — with features built around the local education system.",
    ],
    longDescription:
      "EduSync is a next-generation school management system that goes beyond basic admin tools. It features AI-powered tutoring assistants for students, automated timetable generation, fee collection via M-Pesa, online learning hub, parent-teacher communication channels, exam management with auto-grading, performance analytics with predictive insights, and attendance tracking. The AI assistant helps students study, answers curriculum questions, and generates personalized revision plans.",
    url: "https://edusync-8t81.onrender.com",
    category: ["web", "system"],
    color: "#8B5CF6",
    accentColor: "#A78BFA",
    icon: GraduationCap,
    features: [
      "AI-powered student support assistant",
      "Automated class timetabling",
      "M-Pesa school fees collection",
      "Digital report cards & transcripts",
      "Online exam & assignment hub",
      "Parent-teacher communication portal",
      "Library & resource management",
      "Attendance with smart notifications",
      "Performance analytics & predictions",
    ],
    technologies: ["Next.js", "Python (AI)", "OpenAI API", "Node.js", "MongoDB", "Redis", "M-Pesa Daraja API", "Socket.io"],
    stats: [
      { label: "Schools Onboarded", value: "15+", icon: BookOpen },
      { label: "AI Queries/Month", value: "50K+", icon: MessageSquare },
      { label: "Fee Transactions", value: "KES 5M+/mo", icon: CreditCard },
      { label: "User Satisfaction", value: "98%", icon: Star },
    ],
    testimonial: {
      text: "The AI assistant is like having an extra teacher available 24/7. Our students' performance has noticeably improved since we deployed EduSync.",
      author: "James Ochieng",
      role: "Principal, Green Valley Academy",
    },
    status: "live",
    year: "2024",
    location: "Kenya (National)",
  },
  {
    id: 3,
    title: "Eventify",
    subtitle: "Event Ticketing & Sales Platform",
    description: [
      "A complete event management and ticket-selling platform for organizers looking to sell, book, and manage event tickets online.",
      "From concerts to conferences, weddings to workshops — Eventify handles everything end-to-end with seamless M-Pesa payment integration.",
    ],
    longDescription:
      "Eventify empowers event organizers across Kenya to create events, sell tickets, manage attendees, and analyze sales data from one dashboard. Features include customizable ticket types (VIP, Early Bird, Regular), QR-code-based check-in, real-time seating charts, promotional code/discount engine, email/SMS attendee marketing, embedded widget for external sites, organizer analytics with revenue breakdowns, and multi-event calendar.",
    url: "https://eventify-g37x.onrender.com",
    category: ["web", "ecommerce"],
    color: "#F59E0B",
    accentColor: "#FBBF24",
    icon: Ticket,
    features: [
      "Multi-type ticket creation (VIP, Early Bird)",
      "QR-code based quick check-in",
      "Real-time seating chart / map view",
      "Promotional codes & discount engine",
      "M-Pesa/Card/Bank payment options",
      "Attendee email/SMS marketing tool",
      "Embedded ticket widget for websites",
      "Revenue & sales analytics dashboard",
    ],
    technologies: ["React", "Node.js", "Stripe", "M-Pesa Daraja", "QRCode.js", "PostgreSQL", "Socket.io", "Cloudinary"],
    stats: [
      { label: "Events Hosted", value: "500+", icon: CalendarIcon },
      { label: "Tickets Sold", value: "50K+", icon: Ticket },
      { label: "Payment Success Rate", value: "99.2%", icon: CheckCircle2 },
      { label: "Setup Time", value: "<5 min", icon: Zap },
    ],
    status: "live",
    year: "2024",
    location: "Kenya (Pan-Africa)",
  },
  {
    id: 4,
    title: "Watalii Podcast",
    subtitle: "Podcast Platform with Merchandising & Digital Skills Marketplace",
    description: [
      "More than a podcast site — Watalii combines immersive audio content with a merchandise store and a digital skills marketplace for creators.",
      "Built for podcasters who want to monetize their audience beyond just ads — through branded products and selling digital products or courses.",
    ],
    longDescription:
      "Watalii is Kenya's first podcast platform that integrates content, commerce, and community into one experience. Listeners can browse and stream episodes, subscribe to shows, leave reviews, and discover new content. Creators get their own branded storefront where they can sell merchandise with print-on-demand fulfillment, plus a marketplace section to sell e-books, courses, presets, templates, and digital downloads.",
    url: "https://watalii-yz7r.onrender.com",
    category: ["web", "ecommerce", "creative"],
    color: "#EF4444",
    accentColor: "#F87171",
    icon: Mic,
    features: [
      "Episode streaming & subscription",
      "Custom creator-branded storefronts",
      "Print-on-demand merch integration",
      "Digital product marketplace",
      "RSS feed generation & distribution",
      "Creator earnings & payout dashboard",
      "Listener engagement analytics",
      "Community comments & discussions",
    ],
    technologies: ["Next.js", "Supabase", "M-Pesa/PayPal", "Printful API", "Redis", "Tailwind CSS"],
    stats: [
      { label: "Active Podcasters", value: "30+", icon: Mic },
      { label: "Products Listed", value: "200+", icon: ShoppingBag },
      { label: "Monthly Active Listeners", value: "12K+", icon: Users },
      { label: "Payouts Processed", value: "KES 800K+", icon: CreditCard },
    ],
    status: "live",
    year: "2024",
    location: "Nairobi, Kenya",
  },
  {
    id: 5,
    title: "MCAol Book",
    subtitle: "MC & Comedian Personal Website + Booking Dashboard",
    description: [
      "A stunning personal portfolio website for a Master of Ceremonies and comedian, featuring event showcase, testimonials, and a powerful booking/payments dashboard.",
      "Designed to convert visitors into clients — showcasing personality while making bookings effortless with integrated payments and calendar management.",
    ],
    longDescription:
      "MCAol Book is more than just a portfolio — it is a business-in-a-box for entertainers. The public-facing website showcases video clips, photo galleries, event history, client testimonials, pricing packages, availability calendar, and reputation section. The private dashboard allows the MC to manage incoming booking requests, confirm/reject dates, send quotes, process deposits via M-Pesa, track income, upload new media, send automated emails to clients, and generate invoices.",
    url: "https://mcaol-book-mc.vercel.app",
    category: ["web", "creative"],
    color: "#EC4899",
    accentColor: "#F472B6",
    icon: Monitor,
    features: [
      "Stunning visual portfolio & gallery",
      "Video clip showcase embed",
      "Client testimonials & ratings",
      "Pricing package display",
      "Real-time availability calendar",
      "Booking request form with deposit payment",
      "Private admin dashboard",
      "Invoice & income tracker",
      "Automated client emails & reminders",
    ],
    technologies: ["Vite + React", "Supabase", "M-Pesa STK Push", "Cloudinary", "Resend Emails", "Tailwind CSS", "Framer Motion"],
    stats: [
      { label: "Bookings/month", value: "25+", icon: CalendarIcon },
      { label: "Monthly Revenue", value: "KES 150K+", icon: BarChart3 },
      { label: "Client Satisfaction", value: "100%", icon: Star },
      { label: "Conversion Rate", value: "35%", icon: TrendUpIcon },
    ],
    testimonial: {
      text: "I went from losing track of bookings to running my entire MC business from my phone. The deposit feature alone has saved me from so many flaky clients!",
      author: "MCAol Book",
      role: "Professional MC & Comedian, Nairobi",
    },
    status: "live",
    year: "2024",
    location: "Nairobi, Kenya",
  },
  {
    id: 6,
    title: "OnPoint Cyber",
    subtitle: "Modern Cyber Cafe & Government Services Platform",
    description: [
      "A revolutionary cyber cafe platform that offers governmental services, printing, photocopying, institutional services, and document processing.",
      "Designed to modernize the traditional cyber cafe into a government-service-access-point for communities underserved by government offices.",
    ],
    longDescription:
      "OnPoint Cyber transforms the traditional cyber cafe into a critical community service hub. Citizens can access eCitizen services (ID applications, birth certificates, good conduct, KRA returns), HELB loan applications, NHIF registrations, printing, photocopying/scanning, typing services, CV writing help, job application assistance, and more. The platform manages service queues, tracks orders, processes payments, generates receipts, manages inventory, and provides full business analytics.",
    url: "https://onpoint-cyber.vercel.app",
    category: ["web", "system"],
    color: "#06B6D4",
    accentColor: "#22D3EE",
    icon: Coffee,
    features: [
      "eCitizen government services integration",
      "Print, copy & scan order management",
      "Photo booth & ID picture module",
      "Service queue & order tracking",
      "Multi-payment (Cash + M-Pesa)",
      "Inventory management (supplies)",
      "Staff roster & productivity tracking",
      "Full business analytics dashboard",
      "Customer loyalty program",
    ],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "M-Pesa", "Thermal Printer SDK", "Prisma", "Tailwind CSS"],
    stats: [
      { label: "Services Offered", value: "20+", icon: Layers },
      { label: "Daily Customers", value: "100+", icon: Users },
      { label: "Revenue Increase", value: "+40%", icon: TrendUpIcon },
      { label: "User Rating", value: "4.9★", icon: Star },
    ],
    status: "live",
    year: "2024",
    location: "Nairobi, Kenya",
  },
];

/* ════════════════════════════════════════════════════════════
   DESIGN WORK
   ════════════════════════════════════════════════════════════ */

interface DesignWork {
  id: number;
  title: string;
  category: "branding" | "uiux" | "print" | "social-media";
  description: string;
  color: string;
  imagePlaceholder: string;
  deliverables: string[];
  tools: string[];
}

const designWorks: DesignWork[] = [
  {
    id: 101,
    title: "Solvara Brand Identity System",
    category: "branding",
    description: "Complete brand identity including logo variations, color palette, typography system, icon set, brand guidelines, and social media templates.",
    color: "#0D518C",
    imagePlaceholder: "Brand Identity Showcase",
    deliverables: ["Primary & Secondary Logos", "Brand Guidelines PDF", "Color Palette & Typography", "Business Cards", "Letterhead & Envelope", "Social Media Templates", "Icon Set (24 icons)"],
    tools: ["Adobe Illustrator", "Adobe InDesign", "Figma"],
  },
  {
    id: 102,
    title: "FarmFresh E-Commerce UI Design",
    category: "uiux",
    description: "Complete user interface design for a fresh produce e-commerce platform targeting urban Kenyan consumers. Includes user flows, wireframes, high-fidelity mockups, and developer handoff kit.",
    color: "#2ECC71",
    imagePlaceholder: "UI/UX Design Preview",
    deliverables: ["User Research Report", "Information Architecture", "Wireframes (40+ screens)", "High-Fidelity Mockups", "Interactive Prototype", "Design System / Component Library", "Developer Handoff Specs"],
    tools: ["Figma", "FigJam", "Adobe XD", "Maze"],
  },
  {
    id: 103,
    title: "Corporate Event Collateral Pack",
    category: "print",
    description: "Complete event branding package for a tech conference including banners, programs, name badges, backdrops, stage design, lanyards, and promotional materials.",
    color: "#8B5CF6",
    imagePlaceholder: "Print Design Gallery",
    deliverables: ["Roll-Up Banners (3 sizes)", "A4 Event Program", "Name Badge Designs", "Stage Backdrop (6m x 3m)", "Lanyard Template", "Social Media Campaign Kit", "Email Invitations"],
    tools: ["Adobe Photoshop", "Adobe Illustrator", "Adobe InDesign", "Canva Pro"],
  },
  {
    id: 104,
    title: "Restaurant Social Media Package",
    category: "social-media",
    description: "30-day curated social media content calendar for a high-end Nairobi restaurant. Menu highlights, chef profiles, daily specials, stories templates, and Reels thumbnails.",
    color: "#F59E0B",
    imagePlaceholder: "Social Media Grid",
    deliverables: ["30 Post Graphics", "Story Templates (15 designs)", "Reels Thumbnail Templates (10)", "Highlight Covers (6)", "Content Calendar Document", "Caption Copy Writing", "Hashtag Strategy"],
    tools: ["Canva Pro", "Adobe Photoshop", "Later / Buffer", "CapCut"],
  },
  {
    id: 105,
    title: "SaaS Dashboard Redesign",
    category: "uiux",
    description: "Complete redesign of a legacy SaaS analytics dashboard for a logistics company. Improved task completion time by 60% through better information architecture.",
    color: "#06B6D4",
    imagePlaceholder: "Dashboard Before → After",
    deliverables: ["Heuristic Evaluation Report", "User Interview Synthesis", "Navigation Restructuring", "Dashboard Wireframes (25 screens)", "High-Fidelity Prototypes", "Usability Test Results", "Design Tokens / Theme"],
    tools: ["Figma", "Hotjar", "Maze", "Loom"],
  },
  {
    id: 106,
    title: "Startup Pitch Deck Suite",
    category: "branding",
    description: "Investor-ready pitch deck template system used by 10+ Kenyan startups. Master slides, chart/graph templates, team bio layouts, financial projection visuals, and logo placement guides.",
    color: "#EC4899",
    imagePlaceholder: "Pitch Deck Preview",
    deliverables: ["Master Deck Template (30+ slides)", "Slide Variations (5 themes)", "Chart & Graph Templates", "Team Photo Layouts", "Financial Model Visuals", "One-Pager Template", "Speaker Notes Guide"],
    tools: ["PowerPoint", "Keynote", "Google Slides", "Figma"],
  },
];

/* ════════════════════════════════════════════════════════════
   UTILITY ICONS
   ════════════════════════════════════════════════════════════ */

function CalendarIcon(props: any) { return <BarChart3 {...props} size={16} />; }
function TrendUpIcon(props: any) { return <Zap {...props} size={16} />; }

/* ════════════════════════════════════════════════════════════
   CATEGORY CONFIG
   ════════════════════════════════════════════════════════════ */

const categories: { key: Category; label: string; icon: React.ElementType }[] = [
  { key: "all", label: "All Work", icon: Globe },
  { key: "web", label: "Web Apps", icon: Code2 },
  { key: "ecommerce", label: "E-Commerce", icon: ShoppingBag },
  { key: "system", label: "Management Systems", icon: Server },
  { key: "creative", label: "Creative/Portfolio", icon: Sparkles },
  { key: "design", label: "Graphic & UI/UX", icon: Palette },
];

/* ════════════════════════════════════════════════════════════
   PROJECT CARD
   ════════════════════════════════════════════════════════════ */

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const isEven = index % 2 === 0;

  const sb = () => {
    switch (project.status) {
      case "live": return { bg: "rgba(46,204,113,0.12)", border: "rgba(46,204,113,0.3)", color: "#2ECC71", text: "● Live" };
      case "case-study": return { bg: "rgba(13,81,140,0.12)", border: "rgba(13,81,140,0.3)", color: "#0D518C", text: "📄 Case Study" };
      default: return { bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.3)", color: "#F59E0B", text: "🚀 Coming Soon" };
    }
  };

  const badge = sb();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="rounded-3xl overflow-hidden relative"
      style={{ background: "#0F1629", border: `1px solid ${project.color}25` }}
    >
      <div className="h-1 w-full" style={{ background: `linear-gradient(90deg,${project.color},${project.accentColor},transparent)` }} />

      <div className="p-6 sm:p-8 lg:p-10">
        {/* ===== MOBILE: Stacked ===== */}
        <div className="lg:hidden space-y-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full mb-2 inline-block" style={{ background: badge.bg, border: `1px solid ${badge.border}`, color: badge.color }}>{badge.text}</span>
              <h3 className="text-white font-black text-xl sm:text-2xl">{project.title}</h3>
              <p className="font-semibold text-sm mt-1" style={{ color: project.color }}>{project.subtitle}</p>
            </div>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ background: `${project.color}18`, border: `1px solid ${project.color}30` }}>
              <project.icon size={24} style={{ color: project.color }} />
            </div>
          </div>

          {project.description.map((p, i) => (
            <p key={i} className="text-gray-400 text-sm leading-relaxed">{p}</p>
          ))}

          <div className="flex flex-wrap gap-2">
            {project.features.slice(0, 4).map((f) => (
              <span key={f} className="text-xs px-2.5 py-1 rounded-full text-gray-300" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid #1A2540" }}>{f}</span>
            ))}
            {project.features.length > 4 && <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ background: `${project.color}15`, color: project.color }}>+{project.features.length - 4}</span>}
          </div>

          <div className="flex flex-wrap gap-1.5 pt-4" style={{ borderTop: `1px solid ${project.color}10` }}>
            {project.technologies.map((t) => (
              <span key={t} className="text-[11px] px-2 py-0.5 rounded-md text-gray-500" style={{ background: "rgba(255,255,255,0.03)" }}>{t}</span>
            ))}
          </div>

          {project.stats && (
            <div className="grid grid-cols-2 gap-3">
              {project.stats.map((s) => (
                <div key={s.label} className="rounded-xl p-3 text-center" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid #1A2540" }}>
                  <s.icon size={14} style={{ color: project.color }} className="mx-auto mb-1" />
                  <div className="font-black text-lg" style={{ color: project.color }}>{s.value}</div>
                  <div className="text-gray-500 text-[10px]">{s.label}</div>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-3">
            <a href={project.url} target="_blank" rel="noopener noreferrer"
              className="group flex items-center gap-2 font-bold px-6 py-3 rounded-xl text-sm transition-all hover:scale-105 flex-1 justify-center"
              style={{ background: project.color, color: "#fff" }}>
              View Live Site <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
            <button onClick={() => setExpanded(!expanded)} className="px-4 py-3 rounded-xl text-sm font-semibold transition-all" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid #1A2540", color: "#9CA3AF" }}>
              {expanded ? "Less" : "Details"}
            </button>
          </div>

          <AnimatePresence>
            {expanded && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mt-4 pt-4" style={{ borderTop: `1px solid ${project.color}15` }}>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">{project.longDescription}</p>
                {project.testimonial && (
                  <div className="rounded-xl p-4 mb-4" style={{ background: `${project.color}08`, border: `1px solid ${project.color}20` }}>
                    <Star size={16} style={{ color: project.color }} className="mb-3" />
                    <p className="text-gray-300 text-sm italic mb-2">{project.testimonial.text}</p>
                    <p className="text-xs font-semibold" style={{ color: project.color }}>— {project.testimonial.author}, {project.testimonial.role}</p>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                  {project.client && <p>Client: <span className="text-white">{project.client}</span></p>}
                  {project.location && <p>Location: <span className="text-white">{project.location}</span></p>}
                  <p>Year: <span className="text-white">{project.year}</span></p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ===== DESKTOP: Alternating Side-by-Side ===== */}
        <div className={`hidden lg:grid ${isEven ? "grid-cols-[340px_1fr]" : "grid-cols-[1fr_340px]"} gap-10 items-start`}>

          {/* LEFT COLUMN */}
          <div className={`${!isEven ? "order-1" : ""}`}>
            <div className="sticky top-24 space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: `linear-gradient(135deg,${project.color}20,${project.accentColor}10)`, border: `1px solid ${project.color}30` }}>
                  <project.icon size={28} style={{ color: project.color }} />
                </div>
                <span className="text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: badge.bg, border: `1px solid ${badge.border}`, color: badge.color }}>{badge.text}</span>
              </div>

              <div>
                <h3 className="text-white font-black text-2xl leading-tight">{project.title}</h3>
                <p className="font-semibold mt-1" style={{ color: project.color }}>{project.subtitle}</p>
              </div>

              <div className="flex flex-wrap gap-3 text-xs text-gray-500 pt-2" style={{ borderTop: `1px solid #1A2540` }}>
                {project.year && <span>Year: <b className="text-gray-300">{project.year}</b></span>}
                {project.location && <span>Location: <b className="text-gray-300">{project.location}</b></span>}
                {project.client && <span>Client: <b className="text-gray-300 truncate max-w-[140px] inline-block align-bottom">{project.client}</b></span>}
              </div>

              <a href={project.url} target="_blank" rel="noopener noreferrer"
                className="group flex items-center gap-2 w-full justify-center font-bold px-6 py-3.5 rounded-xl text-sm transition-all hover:scale-[1.02]"
                style={{ background: project.color, color: "#fff", boxShadow: `0 8px 28px ${project.color}30` }}>
                <ExternalLink size={16} />
                Visit Live Site — {project.url.replace("https://", "").split("/")[0]}
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform ml-auto" />
              </a>

              <div className="pt-4" style={{ borderTop: `1px solid ${project.color}10` }}>
                <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Key Features</h4>
                <div className="space-y-2">
                  {project.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle2 size={13} style={{ color: project.color }} className="shrink-0" />{f}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4" style={{ borderTop: `1px solid #1A2540` }}>
                {project.technologies.map((t) => (
                  <span key={t} className="text-[11px] px-2.5 py-1 rounded-full text-gray-400" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid #1A2540" }}>{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className={`${isEven ? "" : "order-0"}`}>
            <div className="space-y-4 mb-6">
              {project.description.map((p, i) => (
                <p key={i} className="text-gray-400 text-base leading-relaxed">{p}</p>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {!expanded ? (
                <button onClick={() => setExpanded(true)}
                  className="group inline-flex items-center gap-2 font-semibold text-sm mb-6 transition-colors"
                  style={{ color: project.color }}>
                  Read Full Case Study <ChevronDownIcon size={16} className="group-hover:translate-y-0.5 transition-transform" />
                </button>
              ) : (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mb-6">
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">{project.longDescription}</p>
                  <button onClick={() => setExpanded(false)} className="inline-flex items-center gap-2 font-semibold text-sm text-gray-500 hover:text-white transition-colors">Show Less <ChevronDownIcon size={16} className="rotate-180" /></button>
                </motion.div>
              )}
            </AnimatePresence>

            {project.testimonial && (
              <div className="rounded-2xl p-6 mb-6" style={{ background: `linear-gradient(135deg,${project.color}08,transparent)`, border: `1px solid ${project.color}20` }}>
                <Star size={16} style={{ color: project.color }} className="mb-3" />
                <p className="text-gray-200 text-sm italic leading-relaxed mb-3">{project.testimonial.text}</p>
                <p className="text-xs"><span className="font-bold text-white">{project.testimonial.author}</span> <span className="text-gray-500">— {project.testimonial.role}</span></p>
              </div>
            )}

            {project.stats && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {project.stats.map((s) => (
                  <div key={s.label} className="rounded-xl p-4 text-center" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid #1A2540` }}>
                    <s.icon size={18} style={{ color: project.color }} className="mx-auto mb-2" />
                    <div className="font-black text-xl" style={{ color: project.color }}>{s.value}</div>
                    <div className="text-gray-500 text-[11px] mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ChevronDownIcon(props: any) { return <ChevronDown {...props} />; }

/* ════════════════════════════════════════════════════════════
   DESIGN WORK CARD
   ════════════════════════════════════════════════════════════ */

function DesignCard({ work, index }: { work: DesignWork; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="rounded-2xl overflow-hidden group cursor-pointer card-hover-glass"
      style={{ background: "#0F1629", border: `1px solid ${work.color}20` }}
    >
      <div className="relative h-48 sm:h-56 overflow-hidden" style={{ background: `linear-gradient(135deg,${work.color}15,${work.color}05)` }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-4">
            <Palette size={36} style={{ color: work.color, opacity: 0.4 }} className="mx-auto mb-2" />
            <p className="text-gray-500 text-sm font-medium">{work.imagePlaceholder}</p>
            <p className="text-gray-600 text-xs mt-1">{work.category.replace("-", " / ")}</p>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1629] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: `${work.color}25`, color: work.color }}>{work.category.toUpperCase()}</span>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <h4 className="text-white font-bold text-lg mb-2 group-hover:text-white transition-colors" style={{ "--hover-color": work.color } as any}>{work.title}</h4>
        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">{work.description}</p>

        <div className="space-y-1.5 mb-4">
          {work.deliverables.slice(0, 4).map((d) => (
            <div key={d} className="flex items-center gap-2 text-xs text-gray-400">
              <CheckCircle2 size={11} style={{ color: work.color }} className="shrink-0" />{d}
            </div>
          ))}
          {work.deliverables.length > 4 && (
            <span className="text-xs font-semibold" style={{ color: work.color }}>+{work.deliverables.length - 4} more</span>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 pt-3" style={{ borderTop: `1px solid #1A2540` }}>
          {work.tools.map((tool) => (
            <span key={tool} className="text-[10px] px-2 py-0.5 rounded-md text-gray-500" style={{ background: "rgba(255,255,255,0.04)" }}>{tool}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════
   MAIN PAGE
   ════════════════════════════════════════════════════════════ */

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [showDesignSection, setShowDesignSection] = useState(false);

  const filteredProjects = activeCategory === "all"
    ? projects
    : projects.filter((p) => p.category.includes(activeCategory));

  return (
    <div className="bg-[#0A0E1A] min-h-screen">

      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-20" style={{ background: "linear-gradient(135deg,rgba(46,204,113,0.12) 0%,#0A0E1A 55%)" }}>
        <div aria-hidden className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(46,204,113,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(46,204,113,0.4) 1px,transparent 1px)", backgroundSize: "50px 50px" }} />
        <div aria-hidden className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle,rgba(46,204,113,0.1) 0%,transparent 70%)", filter: "blur(90px)" }} />

        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 rounded-full px-5 py-2 mb-6 text-sm font-semibold" style={{ background: "rgba(46,204,113,0.1)", border: "1px solid rgba(46,204,113,0.25)", color: "#2ECC71" }}>— OUR PORTFOLIO —</div>
            <h1 className="font-black text-white leading-tight mb-5" style={{ fontSize: "clamp(2.6rem,6vw,4.8rem)" }}>
              Real Projects,{" "}
              <span style={{ background: "linear-gradient(135deg,#2ECC71,#3DE882)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Real Results.</span>
            </h1>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Every project below is a live deployment solving real business problems for real clients.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              {[
                { value: "350+", label: "Projects Completed", color: "#2ECC71" },
                { value: "6", label: "Featured Showcases", color: "#0D518C" },
                { value: "98%", label: "Client Retention", color: "#2ECC71" },
                { value: "100%", label: "On-Time Delivery", color: "#0D518C" },
              ].map((s) => (
                <div key={s.label} className="px-6 py-4 rounded-2xl text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid #1A2540", minWidth: 130 }}>
                  <div className="font-black text-2xl" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-gray-400 text-xs mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FILTER BAR */}
      <div className="sticky top-16 z-30" style={{ background: "rgba(15,22,41,0.95)", backdropFilter: "blur(16px)", borderBottom: "1px solid #1A2540" }}>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-4 flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            const catColor = cat.key === "design" ? "#EC4899" : cat.key === "all" ? "#2ECC71" : "#0D518C";
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: isActive ? `${catColor}15` : "rgba(255,255,255,0.04)",
                  border: `1px solid ${isActive ? catColor + "40" : "#1A2540"}`,
                  color: isActive ? catColor : "#9CA3AF",
                }}
              >
                <cat.icon size={14} />{cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* PROJECTS SECTION */}
      {(activeCategory !== "design") ? (
        <section style={{ padding: "5rem 1.5rem", background: "#0A0E1A" }}>
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
                Featured Web Projects{" "}
                <span style={{ background: "linear-gradient(135deg,#2ECC71,#3DE882)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>— Click to Explore</span>
              </h2>
              <p className="text-gray-500 text-sm">{filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""} found · Alternating layout showcases each uniquely</p>
            </motion.div>

            <div className="space-y-8">
              {filteredProjects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* DESIGN WORK SECTION */}
      {(activeCategory === "design" || showDesignSection) && (
        <section style={{ padding: "5rem 1.5rem", background: "#0A0E1A" }}>
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
                Graphic Design &{" "}
                <span style={{ background: "linear-gradient(135deg,#EC4899,#F472B6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>UI/UX Portfolio</span>
              </h2>
              <p className="text-gray-500 text-sm">{designWorks.length} design projects showcasing our creative capabilities</p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {designWorks.map((work, i) => (
                <DesignCard key={work.id} work={work} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Show design section toggle when not on design tab */}
      {activeCategory !== "design" && !showDesignSection && (
        <div className="py-8 text-center" style={{ background: "#0A0E1A" }}>
          <button
            onClick={() => { setShowDesignSection(true); window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }); }}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105"
            style={{ background: "rgba(236,72,153,0.1)", border: "1px solid rgba(236,72,153,0.3)", color: "#EC4899" }}
          >
            <Palette size={16} /> Also View Our Graphic & UI/UX Work <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}

      {/* CTA SECTION */}
      <section style={{ padding: "5rem 1.5rem", background: "#0F1629", borderTop: "1px solid #1A2540" }}>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
            style={{ background: "linear-gradient(135deg,rgba(46,204,133,0.12),rgba(13,81,140,0.12))", border: "1px solid rgba(46,204,113,0.2)" }}>
            <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 70% 50%,rgba(46,204,113,0.06) 0%,transparent 60%)" }} />
            <div className="relative z-10">
              <div className="text-5xl mb-4">💼</div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Ready to Be Our Next Success Story?</h2>
              <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
                From hospital systems to e-commerce platforms, from brand identities to UI/UX overhauls — we have delivered results across industries.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#contact"
                  className="group flex items-center gap-2 font-bold px-8 py-4 rounded-xl text-lg transition-all hover:scale-105"
                  style={{ background: "#2ECC71", color: "#0A0E1A", boxShadow: "0 0 28px rgba(46,204,113,0.3)" }}>
                  Start Your Project <ArrowRight size={18} />
                </a>
                <a href="/portfolio"
                  className="group flex items-center gap-2 font-semibold px-8 py-4 rounded-xl text-lg text-white transition-all hover:brightness-125"
                  style={{ background: "rgba(13,81,140,0.2)", border: "1px solid rgba(13,81,140,0.35)" }}>
                  <Eye size={18} style={{ color: "#2ECC71" }} /> View More Work
                </a>
              </div>

              <div className="mt-10 pt-8 flex flex-wrap justify-center gap-8" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                {[
                  { text: "Render Deployed", icon: Globe },
                  { text: "Mobile Responsive", icon: Smartphone },
                  { text: "SEO Optimized", icon: BarChart3 },
                  { text: "Secure Payments", icon: Shield },
                ].map((t) => (
                  <div key={t.text} className="flex items-center gap-2 text-xs text-gray-500">
                    <t.icon size={13} style={{ color: "#2ECC71" }} />{t.text}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
