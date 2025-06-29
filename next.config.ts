import type { NextConfig } from "next";

const DEFAULT_EXTERNAL_IMAGE_HOST = "workation-nurse-bucket.s3.amazonaws.com";

const nextConfig: NextConfig = {
  // Note: Workaround for AWS server not getting the .env variables. We need to add each env variable here.
  env: {
    AUTH_TRUST_HOST: process.env.AUTH_TRUST_HOST,
    AUTH_SECRET: process.env.AUTH_SECRET,
    API_BASE_PATH: process.env.API_BASE_PATH,
    API_BASE_PATH_ADMIN: process.env.API_BASE_PATH_ADMIN,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
      // This is for local development. Backend serve the images under 127.0.0.1 .
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
      // This is for prod development. Backend serve the images under localhost .
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: `${process.env.EXTERNAL_IMAGE_HOST || DEFAULT_EXTERNAL_IMAGE_HOST}`,
      },
    ],
  },
  // Fix for uploading large images
  experimental: {
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },
};

export default nextConfig;
