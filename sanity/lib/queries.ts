import { groq } from "next-sanity";

/* ══════════════════════════════════════════
   BLOG QUERIES
══════════════════════════════════════════ */

export const ALL_POSTS_QUERY = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id, title, "slug": slug.current, excerpt, category, tag,
    publishedAt, readTime, viewCount, likeCount, gradient, featured,
    "author": author-> { name, role, avatar, avatarColor }
  }
`;

export const POST_BY_SLUG_QUERY = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id, title, "slug": slug.current, excerpt, category, tag,
    publishedAt, readTime, viewCount, likeCount, gradient, featured, body,
    "author": author-> { name, role, avatar, avatarColor }
  }
`;

export const RELATED_POSTS_QUERY = groq`
  *[_type == "blogPost" && category == $category && slug.current != $slug]
  | order(publishedAt desc) [0...3] {
    _id, title, "slug": slug.current, excerpt, category,
    readTime, gradient,
    "author": author-> { name, avatar, avatarColor }
  }
`;

export const ALL_POST_SLUGS_QUERY = groq`
  *[_type == "blogPost"] { "slug": slug.current }
`;

/* ══════════════════════════════════════════
   PORTFOLIO QUERIES
══════════════════════════════════════════ */

export const ALL_PROJECTS_QUERY = groq`
  *[_type == "portfolioProject"] | order(year desc) {
    _id, title, subtitle, "slug": slug.current, url, category,
    tags, color, accentColor, gradient, description,
    features, tech, duration, year, badge,
  }
`;

export const PROJECT_BY_SLUG_QUERY = groq`
  *[_type == "portfolioProject" && slug.current == $slug][0] {
    _id, title, subtitle, "slug": slug.current, url, category,
    tags, color, accentColor, gradient, description,
    challenge, solution, results, features, tech,
    duration, year, badge, testimonial, stats,
  }
`;

export const RELATED_PROJECTS_QUERY = groq`
  *[_type == "portfolioProject" && category == $category && slug.current != $slug]
  | order(year desc) [0...2] {
    _id, title, subtitle, "slug": slug.current,
    url, category, color, gradient,
  }
`;

export const ALL_PROJECT_SLUGS_QUERY = groq`
  *[_type == "portfolioProject"] { "slug": slug.current }
`;

/* ══════════════════════════════════════════
   CAREERS QUERIES
══════════════════════════════════════════ */

export const ALL_JOBS_QUERY = groq`
  *[_type == "jobListing" && isOpen == true]
  | order(urgent desc, order asc) {
    _id, title, department, color, type,
    location, salaryRange, urgent,
    description, responsibilities, requirements,
  }
`;

export const ALL_PERKS_QUERY = groq`
  *[_type == "perk"] | order(order asc) {
    _id, title, description, icon,
  }
`;