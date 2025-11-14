import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pioneer-alpha-website-django-s3-bucket-new-2.s3.amazonaws.com',
        port: '',
        pathname: '/todo-app/media/profiles/**',
      },
    ],
  },
};

export default nextConfig;
