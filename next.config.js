/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    domains: ["*"],
    loader: "akamai",
    path: "",
  },
  NETLIFY_NEXT_PLUGIN_SKIP: true,
};

module.exports = nextConfig;
