import { authorSchema }           from "./author";
import { blogPostSchema }         from "./blogPost";
import { portfolioProjectSchema } from "./portfolioProject";
import { jobListingSchema }       from "./jobListing";
import { perkSchema }             from "./perk";

export const schemaTypes = [
    authorSchema,
    blogPostSchema,
    portfolioProjectSchema,
    jobListingSchema,
    perkSchema,
];