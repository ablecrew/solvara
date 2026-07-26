import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getPost, getRelatedPosts, posts } from "@/lib/blog-data";
import BlogSlugClient from "./BlogSlugClient";

/* ─── Static params ──────────────────────────────────────────── */
export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

/* ─── Metadata ───────────────────────────────────────────────── */
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

/* ─── Page ───────────────────────────────────────────────────── */
export default async function BlogPostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, post.category);

  return <BlogSlugClient post={post} related={related} />;
}