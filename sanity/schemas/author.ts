import { defineField, defineType } from "sanity";

export const authorSchema = defineType({
    name: "author",
    title: "Author",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Full Name",
            type: "string",
            validation: (r) => r.required(),
        }),
        defineField({
            name: "role",
            title: "Role / Title",
            type: "string",
            description: "e.g. Lead Developer, UI/UX Designer",
            validation: (r) => r.required(),
        }),
        defineField({
            name: "avatar",
            title: "Avatar Initials",
            type: "string",
            description: "Two-letter initials shown in avatar circle e.g. BM",
            validation: (r) => r.required().max(2),
        }),
        defineField({
            name: "avatarColor",
            title: "Avatar Background Color",
            type: "string",
            description: "Hex color e.g. #0D518C",
            validation: (r) => r.required(),
        }),
        defineField({
            name: "email",
            title: "Email",
            type: "string",
        }),
        defineField({
            name: "bio",
            title: "Short Bio",
            type: "text",
            rows: 3,
        }),
    ],
    preview: {
        select: { title: "name", subtitle: "role" },
    },
});