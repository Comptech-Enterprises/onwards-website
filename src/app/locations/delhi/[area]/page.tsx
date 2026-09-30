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
    title: `${areaData.name} Coworking & Managed Office Space, Delhi | Onward Workspaces`,
    description: areaData.description,
  };
}

export default async function DelhiAreaPage({ params }: { params: Promise<{ area: string }> }) {
  const { area } = await params;
  const areaData = delhiCity.areas.find((a) => a.slug === area);
  if (!areaData) notFound();

  return <AreaDetailView city={delhiCity} area={areaData} />;
}
