import CityLocationsView from "@/components/CityLocationsView";
import { gurgaonCity } from "@/data/locations";
import { seoMetadata } from "@/data/seo";

export const metadata = seoMetadata("/gurgaon", {
  title: gurgaonCity.metaTitle,
  description: gurgaonCity.metaDescription,
});

export default function GurgaonLocationsPage() {
  return <CityLocationsView city={gurgaonCity} />;
}
