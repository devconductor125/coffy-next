const { plugins } = require("eslint-config-next");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    loader: "akamai",
    path: "",
  },
  [[plugins]]: "@netlify/plugin-nextjs",
};

module.exports = nextConfig;
