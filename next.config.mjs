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
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ]
  },
 distDir: 'dist',
  output: 'export' 
}

export default nextConfig
