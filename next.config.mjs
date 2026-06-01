/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  typescript: {
    // ignoreBuildErrors: true, // Removed to enforce TypeScript checks
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
  // distDir не задаём: экспорт должен идти в стандартную папку "out",
  // иначе платформа Timeweb не находит статику на шаге "Unpacking static".
}

export default nextConfig
