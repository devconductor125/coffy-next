/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    domains: ["*"],
    loader: "akamai",
    path: "",
    unoptimized: true,
  },
  NETLIFY_NEXT_PLUGIN_SKIP: true,
  assetPrefix: "",
};

module.exports = nextConfig;
