/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    output: "export",
    domains: [
      "lh3.googleusercontent.com",
      "firebasestorage.googleapis.com",
      "cdn.pixabay.com",
      "pixabay.com",
    ],
    // remotePatterns: [
    //     {
    //       protocol: 'https',
    //       hostname: 'lh3.googleusercontent.com',
    //       pathname: '**',
    //     },
    //   ],
    reactStrictMode: true,
    swcMinify: true,
    basePath: "/github-pages",
    images: {
      loader: "akamai",
      path: "",
    },
    assetPrefix: "./",
  },
};

module.exports = nextConfig;
