/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // ignoreBuildErrors: true, // Removed to enforce TypeScript checks
  },
  images: {
    // unoptimized: true, // Removed to enable Next.js image optimization
  },
  // Оптимизация bundle
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
  },
  // Компрессия
  compress: true,
  // Оптимизация production builds
  swcMinify: true,
}

export default nextConfig
