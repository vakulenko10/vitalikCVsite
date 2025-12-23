/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize images from external domains (Cloudinary, etc.)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
  // Production optimizations
  compress: true,
  poweredByHeader: false,
  // Reduce bundle size
  swcMinify: true,
};

export default nextConfig;




