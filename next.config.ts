import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/api/assistant": ["./content/**/*"],
  },
};

export default nextConfig;