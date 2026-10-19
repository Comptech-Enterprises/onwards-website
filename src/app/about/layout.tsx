import { seoMetadata } from "@/data/seo";

export const metadata = seoMetadata("/about");

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
