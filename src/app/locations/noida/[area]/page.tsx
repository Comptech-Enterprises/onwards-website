import { notFound } from "next/navigation";
import AreaDetailView from "@/components/AreaDetailView";
import { noidaCity } from "@/data/locations";

export function generateStaticParams() {
  return noidaCity.areas.map((area) => ({ area: area.slug }));
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
