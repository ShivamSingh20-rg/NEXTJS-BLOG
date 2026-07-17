import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  
  // 🐳 ADDED: Enables extremely small, production-ready Docker builds
  output: "standalone",

  // 💡 FIXED: Whitelist your external image domain
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.magnific.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;