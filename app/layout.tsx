import type React from "react"
import type { Metadata } from "next"
import { VT323 } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ErrorBoundaryWrapper } from "@/components/error-boundary-wrapper"
import { ToastProvider } from "@/components/toast-provider"
import "./globals.css"

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: "BARBOSS ONLINE | Онлайн-школа креативных профессий",
  description:
    "BARBOSS ONLINE - современная онлайн-школа, где вы освоите востребованные навыки дизайна, программирования и digital-маркетинга. Учитесь у практиков!",
  keywords: [
    "онлайн школа",
    "обучение дизайну",
    "frontend разработка",
    "UX/UI дизайн",
    "digital маркетинг",
    "курсы программирования",
    "BARBOSS",
    "онлайн образование",
  ],
  authors: [{ name: "BARBOSS ONLINE" }],
  creator: "BARBOSS ONLINE",
  publisher: "BARBOSS ONLINE",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://portfolio-six-blue-37.vercel.app"),
  openGraph: {
    title: "BARBOSS ONLINE | Онлайн-школа креативных профессий",
    description:
      "Освойте востребованные навыки дизайна, программирования и digital-маркетинга. Учитесь у практиков!",
    url: "https://portfolio-six-blue-37.vercel.app",
    siteName: "BARBOSS ONLINE",
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BARBOSS ONLINE | Онлайн-школа креативных профессий",
    description:
      "Освойте востребованные навыки дизайна, программирования и digital-маркетинга. Учитесь у практиков!",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "BARBOSS ONLINE",
  description:
    "Онлайн-школа креативных профессий. Обучение дизайну, программированию и digital-маркетингу.",
  url: "https://portfolio-six-blue-37.vercel.app",
  logo: "https://portfolio-six-blue-37.vercel.app/icon.svg",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "hello@barboss.online",
  },
  sameAs: ["https://barboss.online"],
  offers: {
    "@type": "AggregateOffer",
    offerCount: "4",
    lowPrice: "19900",
    highPrice: "39900",
    priceCurrency: "RUB",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <head>
        {/* Preload critical resources */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=VT323&display=swap"
          as="style"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${vt323.className} font-sans antialiased overflow-hidden`}>
        <ErrorBoundaryWrapper>
          {children}
          <ToastProvider />
          <Analytics />
        </ErrorBoundaryWrapper>
      </body>
    </html>
  )
}
