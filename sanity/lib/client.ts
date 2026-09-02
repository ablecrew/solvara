import { createClient } from "next-sanity";

export const client = createClient({
    projectId:  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset:    process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
    apiVersion: "2024-01-01",
    useCdn:     false,
    token:      process.env.SANITY_API_TOKEN,
});

/** Typed fetch helper with ISR revalidation every 60 seconds */
export async function sanityFetch<T>(
    query: string,
    params: Record<string, unknown> = {}
): Promise<T> {
    return client.fetch<T>(query, params, {
        next: { revalidate: 60 },
    });
}