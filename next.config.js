/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    'sanity',
    '@sanity/client',
    '@sanity/image-url',
    '@sanity/vision',
    'next-sanity',
  ],
};

module.exports = nextConfig;
