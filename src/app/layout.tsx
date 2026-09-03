import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Onward Workspaces | Managed Enterprise Offices & Coworking Delhi NCR",
  description:
    "Premium managed offices, dedicated private suites, executive cabins, and virtual office spaces in Delhi, Noida, and Gurgaon. Tier-1 enterprise infrastructure with zero setup cost.",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth dark">
      <body className="min-h-full flex flex-col bg-[#07090e] text-slate-100 font-sans">
        {children}
      </body>
    </html>
  );
}

