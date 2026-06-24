import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow LAN devices to load dev assets (e.g. phone testing on 192.168.x.x)
  allowedDevOrigins: ["192.168.1.3"],
  images: {
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'drive.google.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
