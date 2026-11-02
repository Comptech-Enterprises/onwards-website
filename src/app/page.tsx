import dynamic from "next/dynamic";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import { seoMetadata } from "@/data/seo";

const HomeContent = dynamic(() => import("@/components/HomePage"), {
  loading: () => null,
});

export const metadata = seoMetadata("/");

export default function Page() {
  return (
    <>
      <Header />
      <HeroSection />
      <HomeContent />
    </>
  );
}
