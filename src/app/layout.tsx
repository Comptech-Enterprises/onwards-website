import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";

const GTM_ID = "GTM-579N3RH";
const GADS_ID = "AW-11144813402";

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
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Script
          id="gtm-script"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
        <Script
          id="gtag-js"
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=${GADS_ID}`}
        />
        <Script
          id="gtag-config"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GADS_ID}');`,
          }}
        />
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
