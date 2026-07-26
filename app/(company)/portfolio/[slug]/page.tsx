import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProject, getRelatedProjects, projects } from "@/lib/portfolio-data";
import PortfolioSlugClient from "./PortfolioSlugClient";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} — ${project.subtitle}`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "website",
    },
  };
}

export default async function PortfolioSlugPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const related = getRelatedProjects(slug, project.category);
  return <PortfolioSlugClient project={project} related={related} />;
}