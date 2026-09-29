import { notFound } from "next/navigation";
import AreaDetailView from "@/components/AreaDetailView";
import { gurgaonCity } from "@/data/locations";

export function generateStaticParams() {
  return gurgaonCity.areas.map((area) => ({ area: area.slug }));
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
