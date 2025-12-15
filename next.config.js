/** @type {import('next').NextConfig} */
const nextConfig = { 
    reactStrictMode: false,
      images: {
        remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      // якщо Strapi на проді:
      // {
      //   protocol: "https",
      //   hostname: "strapi.your-domain.com",
      //   pathname: "/uploads/**",
      // },
    ],
    domains: ["localhost", "0.0.0.0", "cms"],
  },
 };

module.exports = nextConfig;
