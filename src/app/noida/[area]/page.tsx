import { notFound } from "next/navigation";
import AreaDetailView from "@/components/AreaDetailView";
import { noidaCity } from "@/data/locations";

export function generateStaticParams() {
  return noidaCity.areas.map((area) => ({ area: area.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ area: string }> }) {
  const { area: areaSlug } = await params;
  const area = noidaCity.areas.find((a) => a.slug === areaSlug);
  if (!area) return {};
  const title = area.metaTitle ?? `${area.name} Coworking & Managed Office Space, Noida | Onward Workspaces`;
  const description = area.metaDescription ?? area.description;
  const url = `https://onwardworkspaces.com/noida/${area.slug}`;
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

export default async function NoidaAreaPage({
  params,
}: {
  params: Promise<{ area: string }>;
}) {
  const { area: areaSlug } = await params;
  const area = noidaCity.areas.find((a) => a.slug === areaSlug);
  if (!area) notFound();

  return <AreaDetailView city={noidaCity} area={area} />;
}
