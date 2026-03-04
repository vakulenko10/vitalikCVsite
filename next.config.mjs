import { withAutoUI } from '@autoai-ui/autoui/nextjs';

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
  // Explicit Turbopack config to silence Next 16 warning
  turbopack: {},
};

// Wrap the Next.js config with the AutoUI Next.js plugin
const nextConfig = withAutoUI({
  appId: 'app_1772479552034_wp9b4mk',
  version: '0.1.0',
  // Let the plugin/CLI write the schema to the project root
  // (default path: ".autoui-runtime-schema.json")
})(baseConfig);

export default nextConfig;




