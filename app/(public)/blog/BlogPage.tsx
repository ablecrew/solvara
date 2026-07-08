"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, Search, Clock, Tag, TrendingUp,
  BookOpen, Eye, Heart, Share2, ChevronRight,
} from "lucide-react";

/* ─── Data ───────────────────────────────────────────────────── */
const categories = ["All", "Web Development", "E-Commerce", "Design", "SEO", "Business", "Tech News"];

const posts = [
  {
    id: 1,
    slug: "mpesa-ecommerce-integration-guide",
    category: "E-Commerce",
    tag: "Featured",
    title: "The Complete Guide to M-Pesa STK Push Integration for Your Online Store",
    excerpt: "Learn step-by-step how to integrate M-Pesa STK Push into your e-commerce website, accept payments instantly and increase your conversion rate by up to 60%.",
    author: "Brian Mwangi",
    authorRole: "Lead Developer",
    authorAvatar: "BM",
    avatarColor: "#0D518C",
    date: "June 15, 2025",
    readTime: "8 min read",
    views: "4.2k",
    likes: 142,
    image: null,
    gradient: "linear-gradient(135deg, rgba(13,81,140,0.4), rgba(46,204,113,0.2))",
    featured: true,
  },
  {
    id: 2,
    slug: "nextjs-vs-wordpress-kenya",
    category: "Web Development",
    tag: "Popular",
    title: "Next.js vs WordPress in 2025 — Which is Better for Kenyan Businesses?",
    excerpt: "A practical comparison of Next.js and WordPress for SMEs in Kenya. We cover performance, cost, SEO, maintenance and which platform suits which type of business.",
    author: "Kevin Ochieng",
    authorRole: "Backend Engineer",
    authorAvatar: "KO",
    avatarColor: "#1A6BB5",
    date: "May 28, 2025",
    readTime: "6 min read",
    views: "3.8k",
    likes: 98,
    image: null,
    gradient: "linear-gradient(135deg, rgba(26,107,181,0.4), rgba(13,81,140,0.2))",
    featured: false,
  },
  {
    id: 3,
    slug: "seo-tips-kenyan-businesses",
    category: "SEO",
    tag: "New",
    title: "10 SEO Strategies That Actually Work for Kenyan Businesses in 2025",
    excerpt: "Stop guessing and start ranking. These proven SEO tactics are tailored for the Kenyan market, covering local SEO, Google Business Profile and content that converts.",
    author: "Aisha Njoroge",
    authorRole: "UI/UX Designer",
    authorAvatar: "AN",
    avatarColor: "#2ECC71",
    date: "May 10, 2025",
    readTime: "5 min read",
    views: "2.9k",
    likes: 76,
    image: null,
    gradient: "linear-gradient(135deg, rgba(46,204,113,0.3), rgba(13,81,140,0.15))",
    featured: false,
  },
  {
    id: 4,
    slug: "hospital-management-system-guide",
    category: "Business",
    tag: null,
    title: "Why Every Kenyan Hospital Needs a Digital Management System in 2025",
    excerpt: "From appointment booking to patient records — discover how a modern hospital management system reduces costs, improves patient experience and eliminates paperwork.",
    author: "Brian Mwangi",
    authorRole: "Lead Developer",
    authorAvatar: "BM",
    avatarColor: "#0D518C",
    date: "April 22, 2025",
    readTime: "7 min read",
    views: "1.8k",
    likes: 54,
    image: null,
    gradient: "linear-gradient(135deg, rgba(231,76,60,0.25), rgba(13,81,140,0.2))",
    featured: false,
  },
  {
    id: 5,
    slug: "web-design-trends-africa-2025",
    category: "Design",
    tag: null,
    title: "Web Design Trends Dominating African Markets in 2025",
    excerpt: "From bold typography to mobile-first experiences — explore the design trends that are resonating with African audiences and driving higher engagement on local websites.",
    author: "Aisha Njoroge",
    authorRole: "UI/UX Designer",
    authorAvatar: "AN",
    avatarColor: "#2ECC71",
    date: "April 5, 2025",
    readTime: "4 min read",
    views: "2.1k",
    likes: 89,
    image: null,
    gradient: "linear-gradient(135deg, rgba(155,89,182,0.3), rgba(13,81,140,0.15))",
    featured: false,
  },
  {
    id: 6,
    slug: "ecommerce-launch-checklist",
    category: "E-Commerce",
    tag: null,
    title: "The 20-Point Checklist Before Launching Your Online Store in Kenya",
    excerpt: "Don't launch your e-commerce store before reading this. We cover payments, security, SEO, legal requirements and the critical tests that save you from costly mistakes.",
    author: "Mercy Wanjiku",
    authorRole: "Project Manager",
    authorAvatar: "MW",
    avatarColor: "#25A85E",
    date: "March 18, 2025",
    readTime: "9 min read",
    views: "3.2k",
    likes: 112,
    image: null,
    gradient: "linear-gradient(135deg, rgba(46,204,113,0.25), rgba(243,156,18,0.15))",
    featured: false,
  },
  {
    id: 7,
    slug: "government-digital-transformation",
    category: "Tech News",
    tag: null,
    title: "Kenya's Digital Government Push: What It Means for Web Development",
    excerpt: "The Kenyan government's eCitizen expansion is creating massive demand for digital services. Here's what tech companies and developers need to know to tap into this opportunity.",
    author: "Kevin Ochieng",
    authorRole: "Backend Engineer",
    authorAvatar: "KO",
    avatarColor: "#1A6BB5",
    date: "March 2, 2025",
    readTime: "5 min read",
    views: "1.5k",
    likes: 43,
    image: null,
    gradient: "linear-gradient(135deg, rgba(243,156,18,0.25), rgba(13,81,140,0.2))",
    featured: false,
  },
  {
    id: 8,
    slug: "website-speed-optimization",
    category: "Web Development",
    tag: null,
    title: "How to Make Your Website Load in Under 2 Seconds on Kenyan Networks",
    excerpt: "Slow websites lose customers. Learn practical optimization techniques — image compression, caching, CDNs and code splitting — that dramatically improve load times on mobile networks.",
    author: "Brian Mwangi",
    authorRole: "Lead Developer",
    authorAvatar: "BM",
    avatarColor: "#0D518C",
    date: "February 14, 2025",
    readTime: "6 min read",
    views: "2.7k",
    likes: 95,
    image: null,
    gradient: "linear-gradient(135deg, rgba(0,188,212,0.25), rgba(13,81,140,0.2))",
    featured: false,
  },
];

const trending = posts.slice().sort((a, b) => b.likes - a.likes).slice(0, 4);

/* ─── Post Card ──────────────────────────────────────────────── */
function PostCard({ post, index, featured = false }: {
  post: typeof posts[0]; index: number; featured?: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className={`group rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 ${featured ? "md:col-span-2" : ""}`}
      style={{ background: "#0F1629", border: "1px solid #1A2540", boxShadow: "0 4px 24px rgba(0,0,0,0.2)" }}
    >
      {/* Image / gradient placeholder */}
      <div
        className="relative overflow-hidden"
        style={{ height: featured ? 280 : 180, background: post.gradient }}
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <BookOpen size={featured ? 80 : 60} className="text-white" />
        </div>
        {/* Overlays */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full"
            style={{ background: "rgba(10,14,26,0.8)", color: "#2ECC71", border: "1px solid rgba(46,204,113,0.3)" }}>
            {post.category}
          </span>
          {post.tag && (
            <span className="text-xs font-bold px-3 py-1 rounded-full"
              style={{ background: "#2ECC71", color: "#0A0E1A" }}>
              {post.tag}
            </span>
          )}
        </div>
        <div className="absolute bottom-4 right-4 flex items-center gap-3 text-white/70 text-xs">
          <span className="flex items-center gap-1"><Eye size={12} /> {post.views}</span>
          <span className="flex items-center gap-1"><Heart size={12} /> {post.likes}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h2 className={`text-white font-black mb-3 leading-snug group-hover:text-[#2ECC71] transition-colors ${featured ? "text-xl sm:text-2xl" : "text-lg"}`}>
          {post.title}
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">{post.excerpt}</p>

        <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid #1A2540" }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black"
              style={{ background: post.avatarColor }}>
              {post.authorAvatar}
            </div>
            <div>
              <div className="text-white text-xs font-semibold">{post.author}</div>
              <div className="text-gray-500 text-xs">{post.date}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-gray-500 text-xs">
            <span className="flex items-center gap-1"><Clock size={11} /> {post.readTime}</span>
            <Link href={`/blog/${post.slug}`}
              className="flex items-center gap-1 font-semibold transition-colors hover:text-[#2ECC71]"
              style={{ color: "#2ECC71" }}>
              Read <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = posts.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = filtered.find((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

  return (
    <div className="bg-[#0A0E1A] min-h-screen">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-32 pb-20"
        style={{ background: "linear-gradient(135deg,rgba(13,81,140,0.2) 0%,#0A0E1A 60%)" }}>
        <div aria-hidden className="absolute inset-0 opacity-[0.1] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(13,81,140,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(13,81,140,0.5) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div aria-hidden className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(46,204,113,0.1) 0%,transparent 70%)", filter: "blur(80px)" }} />

        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 text-sm font-semibold"
              style={{ background: "rgba(46,204,113,0.1)", border: "1px solid rgba(46,204,113,0.2)", color: "#2ECC71" }}>
              — SOLVARA BLOG —
            </div>
            <h1 className="font-black text-white leading-tight mb-6" style={{ fontSize: "clamp(2.6rem,6vw,4.5rem)" }}>
              Insights, Guides &{" "}
              <span style={{ background: "linear-gradient(135deg,#2ECC71,#3DE882)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Tech Tips
              </span>
            </h1>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-10">
              Expert articles on web development, e-commerce, SEO and digital growth for Kenyan businesses.
            </p>

            {/* Search */}
            <div className="max-w-lg mx-auto relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl text-white placeholder-gray-500 outline-none transition-all"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid #1A2540" }}
                onFocus={(e) => (e.target.style.borderColor = "#2ECC71")}
                onBlur={(e) => (e.target.style.borderColor = "#1A2540")}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Main content ── */}
      <section style={{ padding: "4rem 1.5rem 6rem", background: "#0A0E1A" }}>
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex gap-8 flex-col lg:flex-row">

            {/* Posts column */}
            <div className="flex-1 min-w-0">
              {/* Category filters */}
              <div className="flex flex-wrap gap-2 mb-8">
                {categories.map((c) => (
                  <button key={c} onClick={() => setActiveCategory(c)}
                    className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                    style={activeCategory === c
                      ? { background: "#2ECC71", color: "#0A0E1A" }
                      : { background: "rgba(255,255,255,0.04)", color: "#9CA3AF", border: "1px solid #1A2540" }}>
                    {c}
                  </button>
                ))}
              </div>

              {filtered.length === 0 ? (
                <div className="text-center py-20">
                  <BookOpen size={48} className="text-gray-700 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No articles found. Try a different search.</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-6">
                  {featured && <PostCard post={featured} index={0} featured />}
                  {rest.map((post, i) => <PostCard key={post.id} post={post} index={i + 1} />)}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="w-full lg:w-72 shrink-0 space-y-6">

              {/* Trending */}
              <div className="rounded-2xl p-6" style={{ background: "#0F1629", border: "1px solid #1A2540" }}>
                <div className="flex items-center gap-2 mb-5">
                  <TrendingUp size={18} style={{ color: "#2ECC71" }} />
                  <h3 className="text-white font-bold">Trending Articles</h3>
                </div>
                <div className="space-y-4">
                  {trending.map((p, i) => (
                    <Link key={p.id} href={`/blog/${p.slug}`}
                      className="flex gap-3 group">
                      <div className="text-2xl font-black shrink-0 w-8" style={{ color: i === 0 ? "#2ECC71" : "#1A2540" }}>
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div>
                        <p className="text-gray-300 text-sm leading-snug group-hover:text-white transition-colors line-clamp-2">{p.title}</p>
                        <p className="text-gray-600 text-xs mt-1 flex items-center gap-2">
                          <Clock size={10} /> {p.readTime}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="rounded-2xl p-6" style={{ background: "#0F1629", border: "1px solid #1A2540" }}>
                <div className="flex items-center gap-2 mb-5">
                  <Tag size={18} style={{ color: "#2ECC71" }} />
                  <h3 className="text-white font-bold">Categories</h3>
                </div>
                <div className="space-y-2">
                  {categories.slice(1).map((c) => {
                    const count = posts.filter((p) => p.category === c).length;
                    return (
                      <button key={c} onClick={() => setActiveCategory(c)}
                        className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all group"
                        style={{ background: activeCategory === c ? "rgba(46,204,113,0.1)" : "transparent" }}>
                        <span className="flex items-center gap-2 text-gray-300 group-hover:text-white transition-colors">
                          <ChevronRight size={12} style={{ color: "#2ECC71" }} /> {c}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full"
                          style={{ background: "#1A2540", color: "#6b7280" }}>{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Newsletter */}
              <div className="rounded-2xl p-6 relative overflow-hidden"
                style={{ background: "linear-gradient(135deg,rgba(13,81,140,0.3),rgba(46,204,113,0.1))", border: "1px solid rgba(46,204,113,0.2)" }}>
                <div className="text-3xl mb-3">📬</div>
                <h3 className="text-white font-bold mb-2">Get Weekly Insights</h3>
                <p className="text-gray-400 text-sm mb-4">Join 500+ subscribers getting our best articles every week.</p>
                <input type="email" placeholder="Your email address"
                  className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-gray-500 outline-none mb-3"
                  style={{ background: "rgba(10,14,26,0.6)", border: "1px solid #1A2540" }} />
                <button className="w-full py-3 rounded-xl font-bold text-sm transition-all hover:scale-105"
                  style={{ background: "#2ECC71", color: "#0A0E1A" }}>
                  Subscribe Free
                </button>
              </div>

              {/* CTA */}
              <div className="rounded-2xl p-6 text-center" style={{ background: "#0F1629", border: "1px solid #1A2540" }}>
                <div className="text-3xl mb-3">🚀</div>
                <h3 className="text-white font-bold mb-2">Ready to Go Digital?</h3>
                <p className="text-gray-400 text-sm mb-4">Let&apos;s build something great together.</p>
                <Link href="/contact"
                  className="flex items-center justify-center gap-2 font-bold py-3 rounded-xl text-sm transition-all hover:scale-105"
                  style={{ background: "#2ECC71", color: "#0A0E1A" }}>
                  Get a Free Quote <ArrowRight size={14} />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}