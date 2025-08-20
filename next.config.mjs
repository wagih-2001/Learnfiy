// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "awesome-feast-138dabdda7.media.strapiapp.com",
      },
    ]
  }
};

export default nextConfig;
