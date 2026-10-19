import CityLocationsView from "@/components/CityLocationsView";
import { noidaCity } from "@/data/locations";
import { seoMetadata } from "@/data/seo";

export const metadata = seoMetadata("/noida", {
  title: noidaCity.metaTitle,
  description: noidaCity.metaDescription,
});

export default function NoidaLocationsPage() {
  return <CityLocationsView city={noidaCity} />;
}
