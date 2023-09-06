/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    domains: ["https://coffy-next.netlify.app/", "localhost"],
    loader: "akamai",
    path: "",
    remotePatterns: [
      {
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
