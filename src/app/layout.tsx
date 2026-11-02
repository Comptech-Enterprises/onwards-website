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
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev" />
        <link rel="dns-prefetch" href="https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev" />
      </head>
      <body className="min-h-full flex flex-col">
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
