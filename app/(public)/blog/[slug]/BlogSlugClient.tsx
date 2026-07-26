"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, Clock, Eye, Heart, Share2, BookOpen,
  ArrowRight, CheckCircle2, Calendar, ChevronRight,
  MessageSquare, Bookmark,
} from "lucide-react";
import type { BlogPost } from "@/lib/blog-data";

/* ─── Progress bar ───────────────────────────────────────────── */
function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  if (typeof window !== "undefined") {
    window.onscroll = () => {
      const el  = document.documentElement;
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setProgress(pct);
    };
  }

  return (
    <div className="fixed top-0 left-0 right-0 h-0.5 z-[60]" style={{ background: "#1A2540" }}>
      <div
        className="h-full transition-all duration-100"
        style={{ width: `${progress}%`, background: "linear-gradient(90deg,#0D518C,#2ECC71)" }}
      />
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────── */
export default function BlogSlugClient({
  post,
  related,
}: {
  post: BlogPost;
  related: BlogPost[];
}) {
  const [liked,   setLiked]   = useState(false);
  const [saved,   setSaved]   = useState(false);
  const [copied,  setCopied]  = useState(false);

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({ title: post.title, text: post.excerpt, url });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch { /* cancelled */ }
  };

  return (
    <div style={{ background: "#0A0E1A", minHeight: "100vh" }}>
      <ReadingProgress />

      {/* ══════════════════════════════════════
          HERO BANNER
      ══════════════════════════════════════ */}
      <div
        className="relative overflow-hidden"
        style={{ paddingTop: "6.5rem", paddingBottom: "3.5rem", background: post.gradient }}
      >
        <div className="absolute inset-0" style={{ background: "rgba(10,14,26,0.76)" }} />

        {/* Watermark letter */}
        <div
          aria-hidden
          className="absolute right-0 top-0 bottom-0 flex items-center overflow-hidden pointer-events-none select-none"
          style={{
            paddingRight: "2rem",
            fontSize: "clamp(8rem,20vw,18rem)",
            fontWeight: 900,
            color: "#2ECC71",
            opacity: 0.03,
            lineHeight: 1,
          }}
        >
          {post.category[0]}
        </div>

        <div className="relative z-10 w-full max-w-[880px] mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
              <Link href="/blog"
                className="flex items-center gap-1.5 transition-colors hover:text-white">
                <ArrowLeft size={12} /> Blog
              </Link>
              <ChevronRight size={11} />
              <span style={{ color: "#2ECC71" }}>{post.category}</span>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="inline-flex items-center text-xs font-bold px-3 py-1.5 rounded-full"
                style={{ background: "rgba(10,14,26,0.8)", color: "#2ECC71", border: "1px solid rgba(46,204,113,0.3)" }}>
                {post.category}
              </span>
              {post.tag && (
                <span className="inline-flex items-center text-xs font-black px-3 py-1.5 rounded-full"
                  style={{ background: "#2ECC71", color: "#0A0E1A" }}>
                  {post.tag}
                </span>
              )}
            </div>

            {/* Title */}
            <h1
              className="text-white font-black leading-[1.1] mb-6"
              style={{ fontSize: "clamp(1.65rem, 4vw, 2.65rem)" }}
            >
              {post.title}
            </h1>

            {/* Author + meta */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-black shrink-0"
                  style={{ background: post.avatarColor, boxShadow: `0 0 12px ${post.avatarColor}50` }}
                >
                  {post.authorAvatar}
                </div>
                <div>
                  <div className="text-white font-bold text-sm">{post.author}</div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{post.authorRole}</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                <span className="flex items-center gap-1.5"><Calendar size={11} />{post.date}</span>
                <span className="flex items-center gap-1.5"><Clock size={11} />{post.readTime}</span>
                <span className="flex items-center gap-1.5"><Eye size={11} />{post.views} views</span>
                <span className="flex items-center gap-1.5"><Heart size={11} />{post.likes} likes</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          BODY
      ══════════════════════════════════════ */}
      <div className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-10 xl:gap-14">

          {/* ── ARTICLE ── */}
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex-1 min-w-0"
          >
            {/* Excerpt pull-quote */}
            <div
              className="rounded-2xl p-5 mb-8 text-sm leading-relaxed italic"
              style={{
                background: "rgba(13,81,140,0.1)",
                borderLeft: "3px solid #2ECC71",
                paddingLeft: "1.5rem",
                color: "rgba(203,213,225,0.85)",
              }}
            >
              {post.excerpt}
            </div>

            {/* Article body */}
            <div
              className="prose-solvara mb-10"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* ── Action buttons ── */}
            <div
              className="flex flex-wrap items-center gap-3 py-6 mb-8"
              style={{ borderTop: "1px solid #1A2540", borderBottom: "1px solid #1A2540" }}
            >
              {/* Like */}
              <button
                onClick={() => setLiked(!liked)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all hover:scale-105 active:scale-95"
                style={{
                  background: liked ? "rgba(46,204,113,0.12)" : "rgba(255,255,255,0.05)",
                  border: liked ? "1px solid rgba(46,204,113,0.35)" : "1px solid #1A2540",
                  color: liked ? "#2ECC71" : "#9CA3AF",
                }}
              >
                <Heart size={15} fill={liked ? "#2ECC71" : "none"} stroke={liked ? "#2ECC71" : "#9CA3AF"} />
                {liked ? post.likes + 1 : post.likes} {liked ? "Liked" : "Like"}
              </button>

              {/* Share */}
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all hover:scale-105 active:scale-95"
                style={{
                  background: copied ? "rgba(46,204,113,0.12)" : "rgba(255,255,255,0.05)",
                  border: "1px solid #1A2540",
                  color: copied ? "#2ECC71" : "#9CA3AF",
                }}
              >
                <Share2 size={15} />
                {copied ? "Copied!" : "Share"}
              </button>

              {/* Save */}
              <button
                onClick={() => setSaved(!saved)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all hover:scale-105 active:scale-95"
                style={{
                  background: saved ? "rgba(13,81,140,0.2)" : "rgba(255,255,255,0.05)",
                  border: saved ? "1px solid rgba(13,81,140,0.4)" : "1px solid #1A2540",
                  color: saved ? "#93c5fd" : "#9CA3AF",
                }}
              >
                <Bookmark size={15} fill={saved ? "#93c5fd" : "none"} stroke={saved ? "#93c5fd" : "#9CA3AF"} />
                {saved ? "Saved" : "Save"}
              </button>

              {/* Discuss — links to contact */}
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all hover:scale-105 ml-auto"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid #1A2540",
                  color: "#9CA3AF",
                }}
              >
                <MessageSquare size={15} /> Discuss
              </Link>
            </div>

            {/* Author card */}
            <div
              className="rounded-2xl p-6 mb-10"
              style={{ background: "#0F1629", border: "1px solid #1A2540" }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl shrink-0"
                  style={{ background: post.avatarColor, boxShadow: `0 0 16px ${post.avatarColor}40` }}
                >
                  {post.authorAvatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-white font-bold text-base">{post.author}</span>
                    <span
                      className="text-[10px] font-black px-2.5 py-0.5 rounded-full"
                      style={{ background: "rgba(46,204,113,0.12)", color: "#2ECC71", border: "1px solid rgba(46,204,113,0.25)" }}
                    >
                      AUTHOR
                    </span>
                  </div>
                  <div className="text-sm mb-3" style={{ color: "#2ECC71" }}>
                    {post.authorRole} · Solvara Technologies
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Part of the Solvara Technologies team, building world-class digital solutions for businesses across Kenya and Africa.
                  </p>
                </div>
              </div>
            </div>

            {/* Related articles */}
            {related.length > 0 && (
              <div>
                <h3 className="text-white font-black text-xl mb-5">Related Articles</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/blog/${r.slug}`}
                      className="group flex gap-4 p-4 rounded-2xl transition-all duration-300 hover:-translate-y-0.5"
                      style={{ background: "#0F1629", border: "1px solid #1A2540" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(46,204,113,0.3)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#1A2540")}
                    >
                      {/* Mini colour swatch */}
                      <div
                        className="w-14 h-14 rounded-xl shrink-0 flex items-center justify-center"
                        style={{ background: r.gradient }}
                      >
                        <BookOpen size={22} className="text-white opacity-60" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-bold leading-snug mb-1 group-hover:text-[#2ECC71] transition-colors line-clamp-2">
                          {r.title}
                        </p>
                        <div className="flex items-center gap-3 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                          <span className="flex items-center gap-1"><Clock size={10} />{r.readTime}</span>
                          <span className="flex items-center gap-1 ml-auto font-semibold" style={{ color: "#2ECC71" }}>
                            Read <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </motion.article>

          {/* ── SIDEBAR ── */}
          <aside className="w-full lg:w-60 xl:w-64 shrink-0">
            <div className="lg:sticky lg:top-24 space-y-5">

              {/* Book a call */}
              <div
                className="rounded-2xl p-5 text-center"
                style={{
                  background: "linear-gradient(135deg,rgba(13,81,140,0.25),rgba(46,204,113,0.08))",
                  border: "1px solid rgba(46,204,113,0.2)",
                }}
              >
                <div className="text-3xl mb-3">🚀</div>
                <h3 className="text-white font-black text-base mb-2">Ready to build?</h3>
                <p className="text-xs leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.45)" }}>
                  Free 30-min consultation. No commitment required.
                </p>
                <div className="flex flex-col gap-2">
                  <Link href="/book"
                    className="inline-flex items-center justify-center gap-2 font-bold py-2.5 px-5 rounded-xl text-sm transition-all hover:scale-105 w-full"
                    style={{ background: "#2ECC71", color: "#0A0E1A", boxShadow: "0 0 18px rgba(46,204,113,0.28)" }}>
                    Book Free Call <ArrowRight size={14} />
                  </Link>
                  <Link href="/contact"
                    className="inline-flex items-center justify-center gap-2 font-semibold py-2.5 px-5 rounded-xl text-xs transition-colors w-full"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid #1A2540", color: "rgba(255,255,255,0.5)" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#fff")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)")}>
                    Send a message
                  </Link>
                </div>
              </div>

              {/* Article meta */}
              <div className="rounded-2xl overflow-hidden" style={{ background: "#0F1629", border: "1px solid #1A2540" }}>
                <div className="px-5 py-3.5" style={{ borderBottom: "1px solid #1A2540", background: "rgba(46,204,113,0.05)" }}>
                  <span className="text-white font-bold text-sm">Article Info</span>
                </div>
                <div className="p-5 space-y-3.5">
                  {[
                    { label: "Author",    value: post.author },
                    { label: "Category",  value: post.category },
                    { label: "Published", value: post.date },
                    { label: "Read Time", value: post.readTime },
                    { label: "Views",     value: `${post.views} readers` },
                  ].map((d) => (
                    <div key={d.label} className="flex justify-between items-start gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest shrink-0"
                        style={{ color: "rgba(255,255,255,0.28)" }}>
                        {d.label}
                      </span>
                      <span className="text-xs font-semibold text-right" style={{ color: "rgba(255,255,255,0.75)" }}>
                        {d.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div className="rounded-2xl overflow-hidden" style={{ background: "#0F1629", border: "1px solid #1A2540" }}>
                <div className="px-5 py-3.5" style={{ borderBottom: "1px solid #1A2540", background: "rgba(46,204,113,0.05)" }}>
                  <span className="text-white font-bold text-sm">Our Services</span>
                </div>
                <div className="p-5 space-y-2">
                  {[
                    "Business Websites",
                    "E-Commerce",
                    "Hospital Systems",
                    "Custom Web Apps",
                    "Graphic Design",
                    "UI/UX Design",
                  ].map((s) => (
                    <Link key={s} href="/services"
                      className="flex items-center gap-2 text-xs transition-colors group"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#fff")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)")}>
                      <CheckCircle2 size={11} style={{ color: "#2ECC71" }} className="shrink-0" />
                      {s}
                    </Link>
                  ))}
                  <Link href="/services"
                    className="flex items-center gap-1.5 text-xs font-semibold mt-2 transition-all hover:gap-2.5"
                    style={{ color: "#2ECC71" }}>
                    All services <ArrowRight size={11} />
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}