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
  const url = `https://onwardworkspaces.com/solutions/${sol.slug}`;
  const title = sol.metaTitle ?? `${sol.title} — Office Space Solutions | Onward Workspaces`;
  const description = sol.metaDescription ?? sol.tagline;
  return {
    title,
    description,
    ...(sol.metaTitle
      ? {
          alternates: { canonical: url },
          openGraph: { title, description, url, siteName: "Onward Workspaces", type: "website" as const },
        }
      : {}),
  };
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sol = getSolutionBySlug(slug);
  if (!sol) notFound();

  return <SolutionPageView sol={sol} />;
}
