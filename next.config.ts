import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'images.unsplash.com', 
      'rimello-s3-bucket.s3.ap-south-1.amazonaws.com', // Typically S3
      'app-api.dev.rimello.ai',                      // API
      'api.dev.rimello.ai', 
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
