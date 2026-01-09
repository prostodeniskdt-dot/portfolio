/** @type {import('next').NextConfig} */
const { withSentryConfig } = require("@sentry/nextjs")

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
}

// Sentry configuration
const sentryWebpackPluginOptions = {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  // Suppresses source map uploading logs during build
  silent: true,
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
}

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps are uploaded correctly
module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions)
