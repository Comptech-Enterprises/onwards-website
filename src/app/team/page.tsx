import type { Metadata } from "next";
import TeamPageClient from "@/components/TeamPageClient";

export const metadata: Metadata = {
  title: "Our Team | Onward Workspaces",
  description: "The people who make up Onward Workspaces.",
};

export default function TeamPage() {
  return <TeamPageClient />;
}
