import type { NextConfig } from "next";

// Served from the apex custom domain (sdvig.app), so no basePath.
const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;