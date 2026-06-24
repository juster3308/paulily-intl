/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['sanity', 'next-sanity', '@sanity/client', '@sanity/image-url'],
};

module.exports = nextConfig;
