import { notFound } from "next/navigation";
import SolutionPageView from "@/components/SolutionPageView";
import { solutions, getSolutionBySlug } from "@/data/solutions";

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sol = getSolutionBySlug(slug);
  if (!sol) return {};
  return {
    title: `${sol.title} — Office Space Solutions | Onward Workspaces`,
    description: sol.tagline,
  };
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sol = getSolutionBySlug(slug);
  if (!sol) notFound();

  return <SolutionPageView sol={sol} />;
}
