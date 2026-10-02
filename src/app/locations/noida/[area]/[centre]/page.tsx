import { notFound } from "next/navigation";
import CentreDetailView from "@/components/CentreDetailView";
import { noidaCity } from "@/data/locations";
import { getWorkspacesForArea } from "@/data/workspaces";

export function generateStaticParams() {
  const params: { area: string; centre: string }[] = [];
  for (const area of noidaCity.areas) {
    const workspaces = getWorkspacesForArea(area);
    for (const ws of workspaces) {
      params.push({ area: area.slug, centre: ws.category });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ area: string; centre: string }> }) {
  const { area, centre } = await params;
  const areaData = noidaCity.areas.find((a) => a.slug === area);
  if (!areaData) return {};
  const workspaces = getWorkspacesForArea(areaData);
  const ws = workspaces.find((w) => w.category === centre);
  if (!ws) return {};
  return {
    title: `${ws.title} | Onward Workspaces`,
    description: `${ws.tagline} ${areaData.description}`,
  };
}

export default async function NoidaCentrePage({ params }: { params: Promise<{ area: string; centre: string }> }) {
  const { area, centre } = await params;
  const areaData = noidaCity.areas.find((a) => a.slug === area);
  if (!areaData) notFound();

  const workspaces = getWorkspacesForArea(areaData);
  const ws = workspaces.find((w) => w.category === centre);
  if (!ws) notFound();

  return <CentreDetailView city={noidaCity} area={areaData} centre={ws} />;
}
