import CityLocationsView from "@/components/CityLocationsView";
import { noidaCity } from "@/data/locations";

export default function NoidaLocationsPage() {
  return <CityLocationsView city={noidaCity} />;
}
