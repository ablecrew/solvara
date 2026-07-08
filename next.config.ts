import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "export",
  images: {
      remotePatterns: [
        { protocol: "https", hostname: "res.cloudinary.com" },
      ],
    },
};

export default nextConfig;
