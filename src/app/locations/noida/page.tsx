import CityLocationsView from "@/components/CityLocationsView";
import { noidaCity } from "@/data/locations";

export const metadata = {
  title: noidaCity.metaTitle,
  description: noidaCity.metaDescription,
  alternates: { canonical: "https://onwardworkspaces.com/locations/noida" },
  openGraph: {
    title: noidaCity.metaTitle,
    description: noidaCity.metaDescription,
    url: "https://onwardworkspaces.com/locations/noida",
    siteName: "Onward Workspaces",
    type: "website" as const,
  },
};

export default function NoidaLocationsPage() {
  return <CityLocationsView city={noidaCity} />;
}
