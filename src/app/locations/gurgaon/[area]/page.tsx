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
  const title = area.metaTitle ?? `${area.name} Coworking & Managed Office Space, Gurgaon | Onward Workspaces`;
  const description = area.metaDescription ?? area.description;
  const url = `https://onwardworkspaces.com/locations/gurgaon/${area.slug}`;
  return {
    title,
    description,
    ...(area.metaTitle
      ? {
          alternates: { canonical: url },
          openGraph: { title, description, url, siteName: "Onward Workspaces", type: "website" as const },
        }
      : {}),
  };
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
