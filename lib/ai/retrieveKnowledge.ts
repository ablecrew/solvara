import { createClient } from "@/lib/supabase/server";

export type KnowledgeDocument = {
    category: string;
    title: string;
    content: string;
};

export async function retrieveKnowledge(
    query: string
): Promise<KnowledgeDocument[]> {
    try {
        const cleanedQuery = query
            .replace(/[^\p{L}\p{N}\s]/gu, " ")
            .replace(/\s+/g, " ")
            .trim()
            .slice(0, 500);

        if (!cleanedQuery) {
            return [];
        }

        const supabase = await createClient();

        const { data, error } = await supabase
            .from("knowledge_base")
            .select("category, title, content")
            .eq("is_published", true)
            .textSearch("search_vector", cleanedQuery, {
                type: "websearch",
                config: "simple",
            })
            .limit(8);

        if (error) {
            console.error("Knowledge base search error:", error);
            return [];
        }

        return data ?? [];
    } catch (error) {
        console.error("Knowledge base connection failed:", error);

        // Allow Groq to answer using the fallback prompt
        // if Supabase is temporarily unreachable.
        return [];
    }
}