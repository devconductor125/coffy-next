/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    domains: ["https://coffy-next.netlify.app/", "localhost"],
    loader: "akamai",
    path: "/",
  },
  NETLIFY_NEXT_PLUGIN_SKIP: true,
};

module.exports = nextConfig;
