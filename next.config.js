/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    domains: [],
    loader: "default",
    path: "/",
  },
  NETLIFY_NEXT_PLUGIN_SKIP: true,
};

module.exports = nextConfig;
