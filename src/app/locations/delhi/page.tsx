import CityLocationsView from "@/components/CityLocationsView";
import { delhiCity } from "@/data/locations";

export const metadata = {
  title: "Coworking & Managed Office Space in Delhi | Onward Workspaces",
  description:
    "Explore premium coworking and managed office spaces in Delhi across Okhla Phase 2, Okhla Phase 3, Mohan Cooperative, Connaught Place, and Janakpuri.",
};

export default function DelhiLocationsPage() {
  return <CityLocationsView city={delhiCity} />;
}
