import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/image",
        destination: "http://54.232.230.0/api/image", // URL real da API
      },
    ];
  },
};

export default nextConfig;
