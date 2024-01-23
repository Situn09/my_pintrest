/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "firebasestorage.googleapis.com",
      "cdn.pixabay.com",
      "pixabay.com",
    ],
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "lh3.googleusercontent.com",
    //     pathname: "**",
    //   },
    // ],
    loader: "akamai",
    path: "",
  },
};

module.exports = nextConfig;
