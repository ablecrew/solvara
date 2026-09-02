import { defineField, defineType } from "sanity";

const CATEGORIES = [
    "Web Development",
    "E-Commerce",
    "Design",
    "SEO",
    "Business",
    "Tech News",
];

export const blogPostSchema = defineType({
    name: "blogPost",
    title: "Blog Post",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (r) => r.required().min(10).max(120),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: { source: "title", maxLength: 96 },
            validation: (r) => r.required(),
        }),
        defineField({
            name: "author",
            title: "Author",
            type: "reference",
            to: [{ type: "author" }],
            validation: (r) => r.required(),
        }),
        defineField({
            name: "category",
            title: "Category",
            type: "string",
            options: {
                list: CATEGORIES.map((c) => ({ title: c, value: c })),
                layout: "radio",
            },
            validation: (r) => r.required(),
        }),
        defineField({
            name: "tag",
            title: "Tag Badge",
            type: "string",
            description: "Optional badge shown on the card e.g. Featured, Popular, New",
        }),
        defineField({
            name: "excerpt",
            title: "Excerpt",
            type: "text",
            rows: 3,
            description: "Short summary shown on the blog listing card",
            validation: (r) => r.required().min(80).max(300),
        }),
        defineField({
            name: "body",
            title: "Article Body (HTML)",
            type: "text",
            rows: 40,
            description:
                "Paste your article HTML here. Supports <h2>, <h3>, <p>, <ul>, <ol>, <li>, <a>, <code>, <strong>, <em>, <blockquote>.",
        }),
        defineField({
            name: "gradient",
            title: "Card Gradient (CSS)",
            type: "string",
            description:
                "CSS gradient for the card header e.g. linear-gradient(135deg, rgba(13,81,140,0.4), rgba(46,204,113,0.2))",
            validation: (r) => r.required(),
        }),
        defineField({
            name: "readTime",
            title: "Read Time",
            type: "string",
            description: "e.g. 5 min read",
            validation: (r) => r.required(),
        }),
        defineField({
            name: "publishedAt",
            title: "Published At",
            type: "datetime",
            initialValue: () => new Date().toISOString(),
            validation: (r) => r.required(),
        }),
        defineField({
            name: "featured",
            title: "Featured Post",
            type: "boolean",
            description: "Show this post in the wide featured slot on the blog listing page",
            initialValue: false,
        }),
        defineField({
            name: "viewCount",
            title: "View Count",
            type: "number",
            initialValue: 0,
        }),
        defineField({
            name: "likeCount",
            title: "Like Count",
            type: "number",
            initialValue: 0,
        }),
    ],
    orderings: [
        {
            title: "Published (newest first)",
            name: "publishedAtDesc",
            by: [{ field: "publishedAt", direction: "desc" }],
        },
    ],
    preview: {
        select: {
            title: "title",
            subtitle: "category",
            description: "publishedAt",
        },
        prepare({ title, subtitle, description }) {
            return {
                title,
                subtitle: `${subtitle} · ${
                    description
                        ? new Date(description).toLocaleDateString("en-KE")
                        : "Draft"
                }`,
            };
        },
    },
});