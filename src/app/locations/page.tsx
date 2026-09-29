import CityLocationsView from "@/components/CityLocationsView";
import { delhiCity } from "@/data/locations";

export default function LocationsPage() {
  return <CityLocationsView city={delhiCity} />;
}
