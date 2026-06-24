/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['sanity', '@sanity/image-url'],
};

module.exports = nextConfig;
