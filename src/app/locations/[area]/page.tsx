import { redirect } from "next/navigation";
import { delhiCity } from "@/data/locations";

export function generateStaticParams() {
  return delhiCity.areas.map((area) => ({ area: area.slug }));
}

export default async function LegacyDelhiAreaPage({
  params,
}: {
  params: Promise<{ area: string }>;
}) {
  const { area: areaSlug } = await params;
  redirect(`/locations/delhi/${areaSlug}`);
}
