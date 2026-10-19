import HomePage from "@/components/HomePage";
import { seoMetadata } from "@/data/seo";

export const metadata = seoMetadata("/");

export default function Page() {
  return <HomePage />;
}
