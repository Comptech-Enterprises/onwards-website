import CityLocationsView from "@/components/CityLocationsView";
import { gurgaonCity } from "@/data/locations";

export const metadata = {
  title: gurgaonCity.metaTitle,
  description: gurgaonCity.metaDescription,
  alternates: { canonical: "https://onwardworkspaces.com/locations/gurgaon" },
  openGraph: {
    title: gurgaonCity.metaTitle,
    description: gurgaonCity.metaDescription,
    url: "https://onwardworkspaces.com/locations/gurgaon",
    siteName: "Onward Workspaces",
    type: "website" as const,
  },
};

export default function GurgaonLocationsPage() {
  return <CityLocationsView city={gurgaonCity} />;
}
