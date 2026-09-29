import { notFound } from "next/navigation";
import AreaDetailView from "@/components/AreaDetailView";
import { delhiCity } from "@/data/locations";

export function generateStaticParams() {
  return delhiCity.areas.map((area) => ({ area: area.slug }));
}

export default async function DelhiAreaPage({
  params,
}: {
  params: Promise<{ area: string }>;
}) {
  const { area: areaSlug } = await params;
  const area = delhiCity.areas.find((a) => a.slug === areaSlug);
  if (!area) notFound();

  return <AreaDetailView city={delhiCity} area={area} />;
}
