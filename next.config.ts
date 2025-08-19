import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Skip ESLint during build to deploy faster
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Keep TypeScript checking enabled
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;