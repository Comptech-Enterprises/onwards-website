import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Coworking Space in Delhi | Office Space | Onward",
  description:
    "Explore coworking space and office space in Delhi with Onward Workspaces. Compare workspace options, request pricing and book a site visit.",
  alternates: {
    canonical: "https://onwardworkspaces.com",
  },
  openGraph: {
    title: "Coworking Space in Delhi | Office Space | Onward",
    description:
      "Explore coworking space and office space in Delhi with Onward Workspaces. Compare workspace options, request pricing and book a site visit.",
    url: "https://onwardworkspaces.com",
    siteName: "Onward Workspaces",
    type: "website",
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
