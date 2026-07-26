import { MetadataRoute } from "next";

const BASE_URL = "https://solvarasolutions.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages = [
    { url: "/",               priority: 1.0,  changeFrequency: "weekly"  as const },
    { url: "/about",          priority: 0.9,  changeFrequency: "monthly" as const },
    { url: "/services",       priority: 0.95, changeFrequency: "monthly" as const },
    { url: "/pricing",        priority: 0.9,  changeFrequency: "monthly" as const },
    { url: "/portfolio",      priority: 0.85, changeFrequency: "weekly"  as const },
    { url: "/blog",           priority: 0.85, changeFrequency: "weekly"  as const },
    { url: "/contact",        priority: 0.9,  changeFrequency: "monthly" as const },
    { url: "/team",           priority: 0.75, changeFrequency: "monthly" as const },
    { url: "/careers",        priority: 0.8,  changeFrequency: "weekly"  as const },
    { url: "/privacy", priority: 0.3,  changeFrequency: "yearly"  as const },
    { url: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
    { url: "/cookie",  priority: 0.3,  changeFrequency: "yearly"  as const },
  ];

  // Blog post slugs — add new slugs here as you publish
  const blogSlugs = [
    "mpesa-ecommerce-integration-guide",
    "nextjs-vs-wordpress-kenya",
    "seo-tips-kenyan-businesses",
    "hospital-management-system-guide",
    "web-design-trends-africa-2025",
    "ecommerce-launch-checklist",
    "government-digital-transformation",
    "website-speed-optimization",
  ];

  // Portfolio slugs
  const portfolioSlugs = [
    "medicore",
    "edusync",
    "eventify",
    "watalii-podcast",
    "mcaol-portfolio",
    "onpoint-cyber",
  ];

  return [
    ...staticPages.map(({ url, priority, changeFrequency }) => ({
      url: `${BASE_URL}${url}`,
      lastModified: now,
      changeFrequency,
      priority,
    })),
    ...blogSlugs.map((slug) => ({
      url: `${BASE_URL}/blog/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...portfolioSlugs.map((slug) => ({
      url: `${BASE_URL}/portfolio/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];
}