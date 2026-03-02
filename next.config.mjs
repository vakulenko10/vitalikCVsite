import { withAutoUI } from '@autoai-ui/autoui/plugin';

/** @type {import('next').NextConfig} */
const baseConfig = {
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
  // Explicit Turbopack config to silence Next 16 warning
  turbopack: {},
};

// Wrap the Next.js config with the AutoUI Next.js plugin
const nextConfig = withAutoUI({
  appId: 'app_1772479552034_wp9b4mk',
  version: '0.1.0',
})(baseConfig);

export default nextConfig;




