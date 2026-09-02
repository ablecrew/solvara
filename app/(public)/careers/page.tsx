import type { Metadata } from "next";
import CareersPageClient from "./CareersPageClient";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Careers | Solvara Solutions",
  description:
      "Join the Solvara team. We're hiring talented developers, designers and marketers to help build Kenya's digital future.",
};

export const dynamic = "force-dynamic";

export type SupabaseJob = {
  id: string;
  title: string;
  department: string;
  color: string;
  type: string;
  location: string;
  salary_range: string | null;
  urgent: boolean;
  description: string;
  responsibilities: string[] | null;
  requirements: string[] | null;
  is_published?: boolean;
  created_at?: string;
  updated_at?: string;
};

export type SupabasePerk = {
  id: string;
  title: string;
  description: string;
  icon: string;
  is_published?: boolean;
  created_at?: string;
};

export default async function CareersPage() {
  const supabase = await createClient();

  const [jobsResult, perksResult] = await Promise.all([
    supabase
        .from("jobs")
        .select(
            `
          id,
          title,
          department,
          color,
          type,
          location,
          salary_range,
          urgent,
          description,
          responsibilities,
          requirements,
          is_published,
          created_at,
          updated_at
        `
        )
        .eq("is_published", true)
        .order("urgent", { ascending: false })
        .order("created_at", { ascending: false }),

    supabase
        .from("perks")
        .select(
            `
          id,
          title,
          description,
          icon,
          is_published,
          created_at
        `
        )
        .eq("is_published", true)
        .order("created_at", { ascending: true }),
  ]);

  if (jobsResult.error) {
    console.error("Careers jobs query error:", jobsResult.error);
  }

  if (perksResult.error) {
    console.error("Careers perks query error:", perksResult.error);
  }

  const jobs: SupabaseJob[] = (jobsResult.data ?? []).map((job) => ({
    id: job.id,
    title: job.title,
    department: job.department,
    color: job.color,
    type: job.type,
    location: job.location,
    salary_range: job.salary_range,
    urgent: job.urgent,
    description: job.description,
    responsibilities: job.responsibilities ?? [],
    requirements: job.requirements ?? [],
    is_published: job.is_published,
    created_at: job.created_at,
    updated_at: job.updated_at,
  }));

  const perks: SupabasePerk[] = (perksResult.data ?? []).map((perk) => ({
    id: perk.id,
    title: perk.title,
    description: perk.description,
    icon: perk.icon,
    is_published: perk.is_published,
    created_at: perk.created_at,
  }));

  return <CareersPageClient jobs={jobs} perks={perks} />;
}