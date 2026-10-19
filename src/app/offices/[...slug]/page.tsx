import { seoMetadata } from "@/data/seo";
import { notFound } from "next/navigation";
import SolutionPageView from "@/components/SolutionPageView";
import { solutions, getSolutionByPath } from "@/data/solutions";

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.path.split("/") }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const sol = getSolutionByPath(slug.join("/"));
  if (!sol) return {};
  return seoMetadata(`/offices/${sol.path}`, {
    title: sol.metaTitle ?? `${sol.title} — Office Space Solutions | Onward Workspaces`,
    description: sol.metaDescription ?? sol.tagline,
  });
}

export default async function OfficePage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const sol = getSolutionByPath(slug.join("/"));
  if (!sol) notFound();

  return <SolutionPageView sol={sol} />;
}
