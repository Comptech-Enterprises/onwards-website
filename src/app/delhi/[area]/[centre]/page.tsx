import { seoMetadata } from "@/data/seo";
import { notFound, permanentRedirect } from "next/navigation";
import CentreDetailView from "@/components/CentreDetailView";
import { delhiCity } from "@/data/locations";
import { getWorkspacesForArea } from "@/data/workspaces";

export function generateStaticParams() {
  const params: { area: string; centre: string }[] = [];
  for (const area of delhiCity.areas) {
    const workspaces = getWorkspacesForArea(area);
    for (const ws of workspaces) {
      params.push({ area: area.slug, centre: ws.centreKey });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ area: string; centre: string }> }) {
  const { area, centre } = await params;
  const areaData = delhiCity.areas.find((a) => a.slug === area);
  if (!areaData) return {};
  const workspaces = getWorkspacesForArea(areaData);
  const ws = workspaces.find((w) => w.centreKey === centre);
  if (!ws) return {};
  return seoMetadata(`/delhi/${areaData.slug}/${ws.centreKey}`, {
    title: ws.copy?.metaTitle ?? `${ws.title} | Onward Workspaces`,
    description: ws.copy?.metaDescription ?? `${ws.tagline} ${areaData.description}`,
  });
}

export default async function DelhiCentrePage({ params }: { params: Promise<{ area: string; centre: string }> }) {
  const { area, centre } = await params;
  const areaData = delhiCity.areas.find((a) => a.slug === area);
  if (!areaData) notFound();

  const workspaces = getWorkspacesForArea(areaData);
  const ws = workspaces.find((w) => w.centreKey === centre);
  if (!ws) {
    const legacy = workspaces.find((w) => w.category === centre || w.centreKey === centre.toLowerCase());
    if (legacy) permanentRedirect(`${delhiCity.basePath}/${areaData.slug}/${legacy.centreKey}`);
    notFound();
  }

  return <CentreDetailView city={delhiCity} area={areaData} centre={ws} />;
}
