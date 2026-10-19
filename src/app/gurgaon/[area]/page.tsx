import { seoMetadata } from "@/data/seo";
import { notFound } from "next/navigation";
import AreaDetailView from "@/components/AreaDetailView";
import { gurgaonCity } from "@/data/locations";

export function generateStaticParams() {
  return gurgaonCity.areas.map((area) => ({ area: area.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ area: string }> }) {
  const { area: areaSlug } = await params;
  const area = gurgaonCity.areas.find((a) => a.slug === areaSlug);
  if (!area) return {};
  return seoMetadata(`/gurgaon/${area.slug}`, {
    title: area.metaTitle ?? `${area.name} Coworking & Managed Office Space | Onward Workspaces`,
    description: area.metaDescription ?? area.description,
  });
}

export default async function GurgaonAreaPage({
  params,
}: {
  params: Promise<{ area: string }>;
}) {
  const { area: areaSlug } = await params;
  const area = gurgaonCity.areas.find((a) => a.slug === areaSlug);
  if (!area) notFound();

  return <AreaDetailView city={gurgaonCity} area={area} />;
}
