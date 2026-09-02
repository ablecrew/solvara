import { defineField, defineType } from "sanity";

const CATEGORIES = [
    "Healthcare",
    "Education",
    "E-Commerce",
    "Media & Commerce",
    "Personal / Portfolio",
    "Business / Corporate",
];

export const portfolioProjectSchema = defineType({
    name: "portfolioProject",
    title: "Portfolio Project",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Project Name",
            type: "string",
            validation: (r) => r.required(),
        }),
        defineField({
            name: "subtitle",
            title: "Subtitle",
            type: "string",
            description: "Short descriptor e.g. Healthcare Management System",
            validation: (r) => r.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: { source: "title", maxLength: 96 },
            validation: (r) => r.required(),
        }),
        defineField({
            name: "url",
            title: "Live URL",
            type: "url",
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
            name: "tags",
            title: "Tags",
            type: "array",
            of: [{ type: "string" }],
            options: { layout: "tags" },
            description: "e.g. Hospital System, M-Pesa, Patient Records",
        }),
        defineField({
            name: "badge",
            title: "Badge Label",
            type: "string",
            description: "Optional badge shown on card e.g. Live, AI Integrated",
        }),
        defineField({
            name: "color",
            title: "Primary Color (hex)",
            type: "string",
            description: "Main brand color for this project e.g. #E74C3C",
            validation: (r) => r.required(),
        }),
        defineField({
            name: "accentColor",
            title: "Accent Color (hex)",
            type: "string",
            validation: (r) => r.required(),
        }),
        defineField({
            name: "gradient",
            title: "Card Gradient (CSS)",
            type: "string",
            description:
                "e.g. linear-gradient(135deg, rgba(231,76,60,0.4), rgba(13,81,140,0.25))",
            validation: (r) => r.required(),
        }),
        defineField({
            name: "description",
            title: "Project Overview",
            type: "text",
            rows: 4,
            description: "One paragraph overview shown at the top of the case study",
            validation: (r) => r.required(),
        }),
        defineField({
            name: "challenge",
            title: "The Challenge",
            type: "text",
            rows: 4,
            description: "What problem were you solving for the client?",
        }),
        defineField({
            name: "solution",
            title: "Our Solution",
            type: "text",
            rows: 4,
            description: "How did Solvara solve it?",
        }),
        defineField({
            name: "results",
            title: "Results & Impact",
            type: "array",
            of: [{ type: "string" }],
            description: "One result per item e.g. 60% reduction in patient waiting time",
        }),
        defineField({
            name: "features",
            title: "Key Features Built",
            type: "array",
            of: [{ type: "string" }],
            description: "One feature per item e.g. M-Pesa STK Push integration",
        }),
        defineField({
            name: "tech",
            title: "Tech Stack",
            type: "array",
            of: [{ type: "string" }],
            options: { layout: "tags" },
        }),
        defineField({
            name: "duration",
            title: "Project Duration",
            type: "string",
            description: "e.g. 10 weeks",
        }),
        defineField({
            name: "year",
            title: "Year Delivered",
            type: "string",
            description: "e.g. 2024 or 2025",
            validation: (r) => r.required(),
        }),
        defineField({
            name: "stats",
            title: "Impact Stats",
            type: "array",
            description: "Key metrics shown on the case study page",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "label", title: "Label", type: "string" },
                        { name: "value", title: "Value", type: "string" },
                    ],
                    preview: {
                        select: { title: "value", subtitle: "label" },
                    },
                },
            ],
        }),
        defineField({
            name: "testimonial",
            title: "Client Testimonial",
            type: "object",
            fields: [
                { name: "text",   title: "Quote Text",  type: "text"   },
                { name: "author", title: "Client Name", type: "string" },
                { name: "role",   title: "Client Role", type: "string" },
            ],
        }),
    ],
    orderings: [
        {
            title: "Year (newest first)",
            name: "yearDesc",
            by: [{ field: "year", direction: "desc" }],
        },
    ],
    preview: {
        select: {
            title:       "title",
            subtitle:    "category",
            description: "year",
        },
        prepare({ title, subtitle, description }) {
            return { title, subtitle: `${subtitle} · ${description}` };
        },
    },
});