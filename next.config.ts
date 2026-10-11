import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // llms.txt used to point here. The resume is the about page.
      { source: "/about", destination: "/resume", permanent: true },
      // Retired stub pages. Temporary so the URLs can come back with real content.
      { source: "/books", destination: "/", permanent: false },
      { source: "/user-manual", destination: "/", permanent: false },
      {
        source: "/writing/personal/placeholder-personal-post-:id",
        destination: "/writing",
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "miro.medium.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "codescene.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.modern.ai",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "deifkwefumgah.cloudfront.net",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;