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
  // headers отключены: при output: 'export' Next.js не поддерживает
  // кастомные headers — они работают только с серверным рендерингом.
  // Для заголовков безопасности настройте их на стороне хостинга (timeweb.cloud).
  distDir: 'dist',
  output: 'export' 
}

export default nextConfig
