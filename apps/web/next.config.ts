import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // React
  reactStrictMode: true,

  // Turbopack
  turbopack: {},

  // Experimental
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  // Images
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Packages
  transpilePackages: ["framer-motion"],

  // Compiler
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn"],
          }
        : false,
  },

  // Security
  poweredByHeader: false,

  // Compression
  compress: true,

  // Source Maps
  productionBrowserSourceMaps: false,

  // TypeScript
  typescript: {
    ignoreBuildErrors: false,
  },

  // Security Headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },

  // Redirects
  async redirects() {
    return [];
  },

  // Rewrites
  async rewrites() {
    return [];
  },

  // Output
  output: "standalone",

  // URL
  trailingSlash: false,

  // Logging
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === "development",
    },
  },
};

export default nextConfig;
