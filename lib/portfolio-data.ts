export type PortfolioProject = {
  slug: string;
  title: string;
  subtitle: string;
  url: string;
  category: string;
  tags: string[];
  color: string;
  accentColor: string;
  gradient: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  features: string[];
  tech: string[];
  duration: string;
  year: string;
};

export const projects: PortfolioProject[] = [
  {
    slug: "medicore",
    title: "MediCore",
    subtitle: "Healthcare Management System",
    url: "https://medicore-z9li.onrender.com",
    category: "Healthcare",
    tags: ["Hospital System", "Patient Records", "Appointments", "Billing"],
    color: "#E74C3C",
    accentColor: "#FF6B6B",
    gradient: "linear-gradient(135deg, rgba(231,76,60,0.4), rgba(13,81,140,0.25))",
    description: "A comprehensive digital healthcare management system built for hospitals and clinics across Kenya. MediCore replaces paper-based workflows with a secure, fast and scalable platform that improves patient care and operational efficiency.",
    challenge: "The client — a multi-branch clinic in Nairobi — was spending 4+ hours daily on paper-based patient registration, appointment scheduling and billing reconciliation. Patient files were frequently lost, appointments double-booked and billing errors commonplace. Staff were overwhelmed with administrative work that left less time for patient care.",
    solution: "We built MediCore from scratch as a full-stack web application with role-based access for administrators, doctors, nurses and receptionists. The system centralises all patient data, automates appointment scheduling with conflict detection, and integrates billing with M-Pesa payments. A real-time dashboard gives management instant visibility into clinic operations.",
    results: [
      "60% reduction in patient waiting time",
      "40% reduction in billing errors",
      "Zero lost patient files since go-live",
      "30% increase in daily patient throughput",
      "4+ hours of administrative time saved per day",
    ],
    features: [
      "Patient registration & digital records",
      "Appointment booking with conflict detection",
      "Doctor & staff management portal",
      "Billing & M-Pesa payment integration",
      "Prescription & lab results tracking",
      "Real-time analytics dashboard",
      "Role-based access control",
      "Multi-branch support",
    ],
    tech: ["React", "Node.js", "PostgreSQL", "Express", "JWT Auth", "M-Pesa API", "Render Cloud", "Tailwind CSS"],
    duration: "10 weeks",
    year: "2024",
  },
  {
    slug: "edusync",
    title: "EduSync",
    subtitle: "AI-Powered School Management System",
    url: "https://edusync-8t81.onrender.com",
    category: "Education",
    tags: ["School System", "AI Support", "EdTech", "Parent Portal"],
    color: "#3498DB",
    accentColor: "#5DADE2",
    gradient: "linear-gradient(135deg, rgba(52,152,219,0.4), rgba(46,204,113,0.2))",
    description: "EduSync is a next-generation school management platform with integrated AI support for all school stakeholders. From automated timetabling to AI-powered homework assistance, EduSync modernises every aspect of school operations.",
    challenge: "A network of private schools was managing student records in spreadsheets, communicating with parents via WhatsApp groups and manually generating report cards — a process that took the admin team two full weeks per term. Teachers had no digital tools for lesson planning or grading, and parents had no visibility into their children's academic progress between report days.",
    solution: "We designed and built EduSync as a comprehensive platform serving four user types: administrators, teachers, students and parents — each with their own tailored dashboard. The AI integration (built on Claude) provides students with homework assistance, helps teachers generate lesson plans and gives administrators automated report generation. The parent portal sends real-time notifications on attendance, grades and school news.",
    results: [
      "Report card generation reduced from 2 weeks to 4 hours",
      "90% of parents actively using the portal within 3 months",
      "Teachers report 3 hours/week saved on administrative tasks",
      "Zero missed parent communications since launch",
      "Student engagement scores up 25% with AI homework support",
    ],
    features: [
      "AI chatbot for students, teachers & parents",
      "Student admission & enrollment management",
      "Automated timetable generation",
      "Gradebook & performance analytics",
      "Parent portal with real-time notifications",
      "Fee management & payment tracking",
      "Teacher lesson planning tools",
      "Automated report card generation",
    ],
    tech: ["Next.js", "TypeScript", "Claude AI API", "PostgreSQL", "Tailwind CSS", "Framer Motion", "Render", "Cloudinary"],
    duration: "14 weeks",
    year: "2024",
  },
  {
    slug: "eventify",
    title: "Eventify",
    subtitle: "Event Ticketing & Booking Platform",
    url: "https://eventify-g37x.onrender.com",
    category: "E-Commerce",
    tags: ["Ticketing", "Events", "M-Pesa", "QR Codes"],
    color: "#9B59B6",
    accentColor: "#A569BD",
    gradient: "linear-gradient(135deg, rgba(155,89,182,0.4), rgba(13,81,140,0.2))",
    description: "Eventify is a full-featured event discovery and ticketing platform for the Kenyan market. It enables event organisers to list, manage and sell tickets while giving attendees a seamless mobile-first experience to discover events and pay with M-Pesa.",
    challenge: "Event organisers in Kenya were relying on manual bank transfers, WhatsApp payments and physical ticket booths — creating massive reconciliation headaches and enabling widespread ticket fraud. Attendees had no centralised platform to discover events and purchase authentic, verifiable tickets.",
    solution: "We built a two-sided marketplace — an organiser dashboard for event management and a consumer-facing discovery platform. M-Pesa STK Push handles all payments, with QR code tickets generated instantly upon payment confirmation. A check-in app allows organiser staff to scan and validate tickets at venue gates in real time.",
    results: [
      "First event sold out 800 tickets in 48 hours",
      "Zero fraudulent tickets across all events",
      "Organisers receive funds within 24 hours of event",
      "Average 4.8/5 rating from event attendees",
      "15+ events hosted in first 3 months",
    ],
    features: [
      "Event listing & management dashboard",
      "M-Pesa STK Push ticket payments",
      "QR code ticket generation & scanning",
      "Real-time capacity management",
      "Organiser revenue analytics",
      "Mobile check-in application",
      "Event discovery & search",
      "Email & SMS ticket delivery",
    ],
    tech: ["React", "Node.js", "M-Pesa Daraja API", "MongoDB", "QR Code Generation", "Render", "Tailwind CSS", "Nodemailer"],
    duration: "8 weeks",
    year: "2024",
  },
  {
    slug: "watalii-podcast",
    title: "Watalii Podcast",
    subtitle: "Podcast Platform with Merch & Skills Marketplace",
    url: "https://watalii-yz7r.onrender.com",
    category: "Media & Commerce",
    tags: ["Podcast", "Marketplace", "Digital Skills", "Merchandise"],
    color: "#F39C12",
    accentColor: "#F7DC6F",
    gradient: "linear-gradient(135deg, rgba(243,156,18,0.4), rgba(46,204,113,0.15))",
    description: "Watalii is a multi-revenue digital media platform that combines a podcast streaming site with a merchandise store and a digital skills marketplace — giving the host multiple monetisation streams from one platform.",
    challenge: "The Watalii podcast host was streaming on third-party platforms (Spotify, YouTube) with no direct revenue from their growing audience and no way to sell merchandise or their digital skills courses to listeners. They needed a home base that they owned and could monetise directly.",
    solution: "We built a custom platform that unifies three revenue streams: podcast streaming (with episode management and RSS feed), a merchandise store with M-Pesa checkout, and a digital skills marketplace where listeners can enrol in courses taught by the host. A subscriber newsletter system keeps the audience engaged between episodes.",
    results: [
      "KES 180,000 in merchandise revenue in first 2 months",
      "45 students enrolled in digital skills courses",
      "Podcast audience grew 40% after platform launch",
      "3x more listener engagement vs third-party platforms",
      "All revenue streams managed in one dashboard",
    ],
    features: [
      "Podcast streaming & episode management",
      "Merchandise store with M-Pesa checkout",
      "Digital skills course marketplace",
      "Course enrollment & progress tracking",
      "Host & guest profile pages",
      "Episode comments & community",
      "Newsletter & subscriber management",
      "Revenue analytics dashboard",
    ],
    tech: ["Next.js", "M-Pesa API", "Cloudinary", "PostgreSQL", "Render", "Tailwind CSS", "Framer Motion", "Nodemailer"],
    duration: "12 weeks",
    year: "2024",
  },
  {
    slug: "mcaol-portfolio",
    title: "MC AOL Portfolio",
    subtitle: "MC & Comedian Personal Brand Website with Booking Dashboard",
    url: "https://mcaol-book-mac.vercel.app",
    category: "Personal / Portfolio",
    tags: ["Portfolio", "Bookings", "Payments", "Dashboard"],
    color: "#2ECC71",
    accentColor: "#3DE882",
    gradient: "linear-gradient(135deg, rgba(46,204,113,0.35), rgba(13,81,140,0.2))",
    description: "A premium personal brand website for a professional MC and comedian, combining a polished public portfolio with a private booking and payment management dashboard — giving the artist full control of their business online.",
    challenge: "The client was booking gigs through informal WhatsApp negotiations with no contracts, no payment tracking and clients frequently rescheduling or cancelling without notice. Their online presence was limited to social media with no professional website to build credibility with corporate clients.",
    solution: "We built a two-part platform: a stunning public-facing website showcasing their showreel, testimonials, services and media coverage — designed to win corporate bookings. The private dashboard allows them to manage booking requests, send contracts and invoices, collect M-Pesa payments and track their event schedule.",
    results: [
      "First corporate booking secured within 2 weeks of launch",
      "Booking cancellations reduced by 70% with deposit system",
      "Average booking value increased 35% with professional presence",
      "100% of payments now collected digitally",
      "Zero unpaid invoices since launch",
    ],
    features: [
      "Professional portfolio & showreel",
      "Online booking request system",
      "Booking management dashboard",
      "M-Pesa payment & invoice generation",
      "Client testimonials & media gallery",
      "Event calendar management",
      "Contact & inquiry forms",
      "SEO-optimized personal brand",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "M-Pesa Integration", "Vercel"],
    duration: "6 weeks",
    year: "2025",
  },
  {
    slug: "onpoint-cyber",
    title: "OnPoint Cyber",
    subtitle: "Modern Cyber Cafe & Government Services Platform",
    url: "https://onpoint-cyber.vercel.app",
    category: "Business / Corporate",
    tags: ["Cyber Cafe", "Government Services", "Print Media", "Business"],
    color: "#00BCD4",
    accentColor: "#26C6DA",
    gradient: "linear-gradient(135deg, rgba(0,188,212,0.35), rgba(13,81,140,0.2))",
    description: "OnPoint Cyber is a modern platform for a cyber cafe that goes beyond printing and browsing — providing a structured digital gateway to government services, print media and institutional services for individuals and businesses in Nairobi.",
    challenge: "The cyber cafe had no online presence and was losing business to competitors with websites. Walk-in customers were frequently confused about which services were available and what they cost. Government services in particular required explanation, causing long queues as staff explained processes repeatedly.",
    solution: "We built a clean, professional website that serves as both a business showcase and a digital service directory. Each government service (eCitizen, NTSA, KRA, NHIF, NSSF) has its own guide page explaining what's needed and how the cyber cafe assists. Online print orders allow customers to upload documents before arriving, reducing wait times.",
    results: [
      "Online enquiries increased by 300% in first month",
      "Walk-in queue times reduced by 45%",
      "10+ new corporate print accounts acquired",
      "Staff spend 2 fewer hours/day explaining services",
      "Top 3 Google ranking for 'cyber cafe Nairobi services'",
    ],
    features: [
      "Government services directory & guides",
      "Online print order & document upload",
      "Service booking & queue management",
      "Institutional services catalogue",
      "eCitizen, NTSA, KRA service guides",
      "Price list & service packages",
      "Business services section",
      "WhatsApp integration for enquiries",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
    duration: "4 weeks",
    year: "2025",
  },
];

export function getProject(slug: string): PortfolioProject | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getRelatedProjects(slug: string, category: string, count = 2): PortfolioProject[] {
  return projects.filter((p) => p.slug !== slug && p.category === category).slice(0, count);
}