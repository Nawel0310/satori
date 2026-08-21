import type { NextConfig } from "next";

const basePath = "/satori";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath,
  devIndicators: false,
  images: {
    loader: "custom",
    loaderFile: "./image-loader.ts",
  },
};

export default nextConfig;