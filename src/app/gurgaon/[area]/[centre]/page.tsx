import { notFound, permanentRedirect } from "next/navigation";
import CentreDetailView from "@/components/CentreDetailView";
import { gurgaonCity } from "@/data/locations";
import { getWorkspacesForArea } from "@/data/workspaces";

export function generateStaticParams() {
  const params: { area: string; centre: string }[] = [];
  for (const area of gurgaonCity.areas) {
    const workspaces = getWorkspacesForArea(area);
    for (const ws of workspaces) {
      params.push({ area: area.slug, centre: ws.centreKey });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ area: string; centre: string }> }) {
  const { area, centre } = await params;
  const areaData = gurgaonCity.areas.find((a) => a.slug === area);
  if (!areaData) return {};
  const workspaces = getWorkspacesForArea(areaData);
  const ws = workspaces.find((w) => w.centreKey === centre);
  if (!ws) return {};
  if (ws.copy?.metaTitle) {
    const url = `https://onwardworkspaces.com/gurgaon/${areaData.slug}/${ws.centreKey}`;
    const description = ws.copy.metaDescription ?? areaData.description;
    return {
      title: ws.copy.metaTitle,
      description,
      alternates: { canonical: url },
      openGraph: { title: ws.copy.metaTitle, description, url, siteName: "Onward Workspaces", type: "website" as const },
    };
  }
  return {
    title: `${ws.title} | Onward Workspaces`,
    description: `${ws.tagline} ${areaData.description}`,
  };
}

export default async function GurgaonCentrePage({ params }: { params: Promise<{ area: string; centre: string }> }) {
  const { area, centre } = await params;
  const areaData = gurgaonCity.areas.find((a) => a.slug === area);
  if (!areaData) notFound();

  const workspaces = getWorkspacesForArea(areaData);
  const ws = workspaces.find((w) => w.centreKey === centre);
  if (!ws) {
    const legacy = workspaces.find((w) => w.category === centre);
    if (legacy) permanentRedirect(`${gurgaonCity.basePath}/${areaData.slug}/${legacy.centreKey}`);
    notFound();
  }

  return <CentreDetailView city={gurgaonCity} area={areaData} centre={ws} />;
}
