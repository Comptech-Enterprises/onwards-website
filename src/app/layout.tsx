import type { Metadata } from "next";
import { Geist } from "next/font/google";
import ScrollToTop from "@/components/ScrollToTop";
import CookieConsent from "@/components/CookieConsent";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://onwardworkspaces.com"),
  title: "Coworking Space in Delhi | Office Space | Onward",
  description:
    "Explore coworking space and office space in Delhi with Onward Workspaces. Compare workspace options, request pricing and book a site visit.",
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "Coworking Space in Delhi | Office Space | Onward",
    description:
      "Explore coworking space and office space in Delhi with Onward Workspaces. Compare workspace options, request pricing and book a site visit.",
    url: "./",
    siteName: "Onward Workspaces",
    type: "website",
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  verification: {
    google: "gQLDwhQ044IcV_cA6nLeYNpJ8YhkKEU2gY8NCt9C93Y",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ScrollToTop />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
