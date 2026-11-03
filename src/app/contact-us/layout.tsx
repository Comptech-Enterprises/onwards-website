import { seoMetadata } from "@/data/seo";

export const metadata = seoMetadata("/contact-us", {
  title: "Contact Us | Onward Workspaces — Coworking & Managed Offices in Delhi NCR",
  description:
    "Get in touch with Onward Workspaces. Enquire about managed offices, private suites, and coworking spaces across Delhi, Gurgaon, and Noida, or schedule a tour.",
});

export default function ContactUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
