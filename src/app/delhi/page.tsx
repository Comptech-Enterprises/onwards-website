import CityLocationsView from "@/components/CityLocationsView";
import { delhiCity } from "@/data/locations";
import { seoMetadata } from "@/data/seo";

export const metadata = seoMetadata("/delhi", {
  title: delhiCity.metaTitle,
  description: delhiCity.metaDescription,
});

export default function DelhiLocationsPage() {
  return <CityLocationsView city={delhiCity} />;
}
