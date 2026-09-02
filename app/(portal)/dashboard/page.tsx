import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import PortalDashboardClient from "./PortalDashboardClient";

export const metadata: Metadata = {
    title: "Dashboard | Solvara Client Portal",
    robots: { index: false, follow: false },
};

export default async function DashboardPage() {
    const supabase = await createClient();

    /* ── Auth check ── */
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) redirect("/portal");

    /* ── Fetch client profile ── */
    const { data: client } = await supabase
        .from("clients")
        .select("*")
        .eq("id", user.id)
        .single();

    if (!client) redirect("/portal");

    /* ── Fetch projects with milestones, files and messages ── */
    const { data: projects } = await supabase
        .from("projects")
        .select(`
      *,
      milestones ( * ),
      project_files ( * ),
      project_messages ( * )
    `)
        .eq("client_id", user.id)
        .order("created_at", { ascending: false });

    return (
        <PortalDashboardClient
            client={client}
            projects={projects ?? []}
            userEmail={user.email ?? ""}
        />
    );
}