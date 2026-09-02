import { defineField, defineType } from "sanity";

const ICONS = [
    "Zap", "Globe", "TrendingUp", "Heart", "Star",
    "Users", "Briefcase", "CheckCircle2", "Shield",
    "Coffee", "Award", "Laptop", "Clock", "Gift",
];

export const perkSchema = defineType({
    name: "perk",
    title: "Perk / Benefit",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Perk Title",
            type: "string",
            validation: (r) => r.required(),
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "text",
            rows: 2,
            validation: (r) => r.required(),
        }),
        defineField({
            name: "icon",
            title: "Icon Name",
            type: "string",
            description: "Lucide icon name — choose from the list",
            options: {
                list: ICONS.map((i) => ({ title: i, value: i })),
                layout: "dropdown",
            },
            validation: (r) => r.required(),
        }),
        defineField({
            name: "order",
            title: "Display Order",
            type: "number",
            description: "Lower number = shown first",
        }),
    ],
    orderings: [
        {
            title: "Display Order",
            name: "orderAsc",
            by: [{ field: "order", direction: "asc" }],
        },
    ],
    preview: {
        select: { title: "title", subtitle: "icon" },
    },
});