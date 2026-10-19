import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
  async redirects() {
    return ["delhi", "noida", "gurgaon"].flatMap((city) => [
      { source: `/locations/${city}`, destination: `/${city}`, permanent: true },
      { source: `/locations/${city}/:path*`, destination: `/${city}/:path*`, permanent: true },
    ]);
  },
};

export default nextConfig;
