import { defineField, defineType } from "sanity";

export const jobListingSchema = defineType({
    name: "jobListing",
    title: "Job Listing",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Job Title",
            type: "string",
            validation: (r) => r.required(),
        }),
        defineField({
            name: "department",
            title: "Department",
            type: "string",
            options: {
                list: [
                    { title: "Engineering",  value: "Engineering"  },
                    { title: "Design",       value: "Design"       },
                    { title: "Growth",       value: "Growth"       },
                    { title: "Operations",   value: "Operations"   },
                    { title: "Sales",        value: "Sales"        },
                    { title: "Finance",      value: "Finance"      },
                ],
                layout: "radio",
            },
            validation: (r) => r.required(),
        }),
        defineField({
            name: "color",
            title: "Accent Color (hex)",
            type: "string",
            description: "e.g. #1A6BB5 — used for the card accent and icon color",
            validation: (r) => r.required(),
        }),
        defineField({
            name: "type",
            title: "Employment Type",
            type: "string",
            options: {
                list: [
                    { title: "Full-time",  value: "Full-time"  },
                    { title: "Part-time",  value: "Part-time"  },
                    { title: "Contract",   value: "Contract"   },
                    { title: "Internship", value: "Internship" },
                ],
                layout: "radio",
            },
            validation: (r) => r.required(),
        }),
        defineField({
            name: "location",
            title: "Location",
            type: "string",
            description: "e.g. Nairobi / Remote",
            validation: (r) => r.required(),
        }),
        defineField({
            name: "salaryRange",
            title: "Salary Range",
            type: "string",
            description: "e.g. KES 150,000 – 220,000/mo",
            validation: (r) => r.required(),
        }),
        defineField({
            name: "urgent",
            title: "Mark as Urgent",
            type: "boolean",
            initialValue: false,
            description: "Shows an Urgent badge on the listing",
        }),
        defineField({
            name: "isOpen",
            title: "Accepting Applications",
            type: "boolean",
            initialValue: true,
            description: "Uncheck to hide this role without deleting it",
        }),
        defineField({
            name: "description",
            title: "Role Description",
            type: "text",
            rows: 4,
            validation: (r) => r.required(),
        }),
        defineField({
            name: "responsibilities",
            title: "Responsibilities",
            type: "array",
            of: [{ type: "string" }],
            description: "One responsibility per item",
            validation: (r) => r.required().min(3),
        }),
        defineField({
            name: "requirements",
            title: "Requirements",
            type: "array",
            of: [{ type: "string" }],
            description: "One requirement per item",
            validation: (r) => r.required().min(3),
        }),
        defineField({
            name: "order",
            title: "Display Order",
            type: "number",
            description: "Lower number = shown first. Leave blank for default ordering.",
        }),
    ],
    orderings: [
        {
            title: "Display Order",
            name: "orderAsc",
            by: [{ field: "order", direction: "asc" }],
        },
        {
            title: "Urgent First",
            name: "urgentFirst",
            by: [
                { field: "urgent", direction: "desc" },
                { field: "order",  direction: "asc"  },
            ],
        },
    ],
    preview: {
        select: {
            title:    "title",
            subtitle: "department",
            media:    "urgent",
        },
        prepare({ title, subtitle, media }) {
            return {
                title,
                subtitle: `${subtitle}${media ? " · 🔴 Urgent" : ""}`,
            };
        },
    },
});