import { notFound } from "next/navigation";
import AreaDetailView from "@/components/AreaDetailView";
import { delhiCity } from "@/data/locations";

export function generateStaticParams() {
  return delhiCity.areas.map((area) => ({
    area: area.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ area: string }> }) {
  const { area } = await params;
  const areaData = delhiCity.areas.find((a) => a.slug === area);
  if (!areaData) return {};
  return {
    title: areaData.metaTitle ?? `${areaData.name} Coworking & Managed Office Space, Delhi | Onward Workspaces`,
    description: areaData.metaDescription ?? areaData.description,
    ...(areaData.metaTitle
      ? {
          alternates: { canonical: `https://onwardworkspaces.com/delhi/${areaData.slug}` },
          openGraph: {
            title: areaData.metaTitle,
            description: areaData.metaDescription ?? areaData.description,
            url: `https://onwardworkspaces.com/delhi/${areaData.slug}`,
            siteName: "Onward Workspaces",
            type: "website" as const,
          },
        }
      : {}),
  };
}

export default async function DelhiAreaPage({ params }: { params: Promise<{ area: string }> }) {
  const { area } = await params;
  const areaData = delhiCity.areas.find((a) => a.slug === area);
  if (!areaData) notFound();

  return <AreaDetailView city={delhiCity} area={areaData} />;
}
