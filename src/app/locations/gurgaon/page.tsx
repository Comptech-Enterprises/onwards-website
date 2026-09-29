import CityLocationsView from "@/components/CityLocationsView";
import { gurgaonCity } from "@/data/locations";

export default function GurgaonLocationsPage() {
  return <CityLocationsView city={gurgaonCity} />;
}
