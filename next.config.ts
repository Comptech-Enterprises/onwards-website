import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    formats: ["image/webp"],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-378f88a78cba4484be6bf66065e91a59.r2.dev",
      },
      {
        protocol: "https",
        hostname: "**.r2.dev",
      },
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  async redirects() {
    const city = ["delhi", "noida", "gurgaon"].flatMap((c) => [
      { source: `/locations/${c}`, destination: `/${c}`, permanent: true },
      { source: `/locations/${c}/:path*`, destination: `/${c}/:path*`, permanent: true },
    ]);
    const areas = [
      ["delhi", "mohan-cooperative", "mohan-estate"],
      ["noida", "sector-4", "noida-sector-4"],
      ["noida", "sector-126", "noida-sector-126"],
      ["noida", "sector-132", "noida-sector-132"],
    ].flatMap(([c, from, to]) => [
      { source: `/${c}/${from}`, destination: `/${c}/${to}`, permanent: true },
      { source: `/${c}/${from}/:path*`, destination: `/${c}/${to}/:path*`, permanent: true },
    ]);
    const solutions = [
      ["managed-office", "managed-office-space-in-delhi"],
      ["private-suites", "private-suites-in-delhi-ncr"],
      ["private-cabins", "private-cabins-in-delhi-ncr"],
      ["virtual-office", "virtual-office-in-delhi-ncr"],
      ["on-demand", "meeting-rooms/day-passes"],
      ["custom-built", "custom-built-in-delhi-ncr"],
    ].map(([from, to]) => ({ source: `/solutions/${from}`, destination: `/offices/${to}`, permanent: true }));
    return [...city, ...areas, ...solutions];
  },
};

export default nextConfig;
