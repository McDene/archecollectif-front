/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "https://admin.larchcollectif.ch",
        pathname: "/uploads/**",
      },
    ],
  },
  devIndicators: {
    autoPrerender: false,
  },
};

export default nextConfig;
