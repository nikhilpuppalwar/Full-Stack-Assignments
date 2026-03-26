import type { NextConfig } from "next";

// Conditional configuration for different deployment targets
const isStaticExport = process.env.STATIC_EXPORT === 'true';

const nextConfig: NextConfig = {
  // For static export (GitHub Pages), add output: 'export'
  ...(isStaticExport && {
    output: 'export',
    trailingSlash: true,
  }),

  images: {
    // Disable optimization for static export, enable for Vercel
    unoptimized: isStaticExport,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
