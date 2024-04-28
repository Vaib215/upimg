/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'upimg2.vercel.app',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      }
    ],
  },
}

export default nextConfig;
