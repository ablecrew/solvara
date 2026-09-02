/* ════════════════════════════════════════════════════════════
   SANITY TYPES
   These match the fields defined in sanity/schemas/
   ════════════════════════════════════════════════════════════ */

/* ─── Blog ───────────────────────────────────────────────────── */
export type SanityAuthor = {
    name:        string;
    role:        string;
    avatar:      string;      // initials e.g. "BM"
    avatarColor: string;      // hex e.g. "#0D518C"
};

export type SanityBlogPost = {
    _id:         string;
    title:       string;
    slug:        string;      // already unwrapped by GROQ ("slug": slug.current)
    excerpt:     string;
    category:    string;
    tag?:        string;
    publishedAt: string;      // ISO date string
    readTime:    string;
    viewCount:   number;
    likeCount:   number;
    gradient:    string;
    featured:    boolean;
    body?:       string;      // HTML string
    author:      SanityAuthor;
};

/* Flat type used by BlogPage + BlogSlugClient */
export type BlogPost = {
    _id:          string;
    title:        string;
    slug:         string;
    excerpt:      string;
    category:     string;
    tag?:         string;
    date:         string;     // formatted from publishedAt
    readTime:     string;
    views:        string;     // formatted e.g. "4.2k"
    likes:        number;
    gradient:     string;
    featured:     boolean;
    content:      string;     // HTML body
    author:       string;
    authorRole:   string;
    authorAvatar: string;
    avatarColor:  string;
};

/* ─── Portfolio ──────────────────────────────────────────────── */
export type SanityPortfolioProject = {
    _id:         string;
    title:       string;
    subtitle:    string;
    slug:        string;      // already unwrapped
    url:         string;
    category:    string;
    tags:        string[];
    color:       string;
    accentColor: string;
    gradient:    string;
    description: string;
    challenge?:  string;
    solution?:   string;
    results?:    string[];
    features:    string[];
    tech:        string[];
    duration:    string;
    year:        string;
    badge?:      string;
    testimonial?: { text: string; author: string; role: string };
    stats?:      { label: string; value: string }[];
};

/* Flat type used by PortfolioPage + PortfolioSlugClient */
export type PortfolioProject = {
    _id:         string;
    title:       string;
    subtitle:    string;
    slug:        string;
    url:         string;
    category:    string;
    tags:        string[];
    color:       string;
    accentColor: string;
    gradient:    string;
    description: string;
    challenge:   string;
    solution:    string;
    results:     string[];
    features:    string[];
    tech:        string[];
    duration:    string;
    year:        string;
    badge?:      string;
    testimonial?: { text: string; author: string; role: string };
    stats?:      { label: string; value: string }[];
};

/* ════════════════════════════════════════════════════════════
   FLATTEN HELPERS
   Convert raw Sanity responses into the flat types above
   ════════════════════════════════════════════════════════════ */

export function flattenPost(p: SanityBlogPost): BlogPost {
    const views = p.viewCount >= 1000
        ? `${(p.viewCount / 1000).toFixed(1)}k`
        : String(p.viewCount);

    return {
        _id:          p._id,
        title:        p.title,
        slug:         p.slug,
        excerpt:      p.excerpt,
        category:     p.category,
        tag:          p.tag,
        date:         new Date(p.publishedAt).toLocaleDateString("en-KE", {
            day: "numeric", month: "long", year: "numeric",
        }),
        readTime:     p.readTime,
        views,
        likes:        p.likeCount,
        gradient:     p.gradient,
        featured:     p.featured,
        content:      p.body ?? "",
        author:       p.author.name,
        authorRole:   p.author.role,
        authorAvatar: p.author.avatar,
        avatarColor:  p.author.avatarColor,
    };
}

export function flattenProject(p: SanityPortfolioProject): PortfolioProject {
    return {
        _id:         p._id,
        title:       p.title,
        subtitle:    p.subtitle,
        slug:        p.slug,
        url:         p.url,
        category:    p.category,
        tags:        p.tags        ?? [],
        color:       p.color,
        accentColor: p.accentColor,
        gradient:    p.gradient,
        description: p.description,
        challenge:   p.challenge   ?? "",
        solution:    p.solution    ?? "",
        results:     p.results     ?? [],
        features:    p.features    ?? [],
        tech:        p.tech        ?? [],
        duration:    p.duration,
        year:        p.year,
        badge:       p.badge,
        testimonial: p.testimonial,
        stats:       p.stats,
    };
}