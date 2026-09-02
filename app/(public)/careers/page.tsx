import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/client";
import { ALL_JOBS_QUERY, ALL_PERKS_QUERY } from "@/sanity/lib/queries";
import CareersPageClient from "./CareersPageClient";

export const metadata: Metadata = {
  title: "Careers | Solvara Solutions",
  description: "Join the Solvara team. We're hiring talented developers, designers and marketers to help build Kenya's digital future.",
};

export type SanityJob = {
  _id: string;
  title: string;
  department: string;
  color: string;
  type: string;
  location: string;
  salaryRange: string;
  urgent: boolean;
  description: string;
  responsibilities: string[];
  requirements: string[];
};

export type SanityPerk = {
  _id: string;
  title: string;
  description: string;
  icon: string;
};

export default async function CareersPage() {
  const [jobs, perks] = await Promise.all([
    sanityFetch<SanityJob[]>(ALL_JOBS_QUERY),
    sanityFetch<SanityPerk[]>(ALL_PERKS_QUERY),
  ]);

  return <CareersPageClient jobs={jobs} perks={perks} />;
}