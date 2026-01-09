import type React from "react"
import type { Metadata } from "next"
import { Oswald } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ErrorBoundaryWrapper } from "@/components/error-boundary-wrapper"
import { ToastProvider } from "@/components/toast-provider"
import "./globals.css"

const oswald = Oswald({
  weight: ["400", "500", "600"],
  subsets: ["latin", "cyrillic"],
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: "БАР БОСС ONLINE | Онлайн-школа креативных профессий",
  description:
    "БАР БОСС ONLINE - современная онлайн-школа, где вы освоите востребованные навыки дизайна, программирования и digital-маркетинга. Учитесь у практиков!",
  keywords: [
    "онлайн школа",
    "обучение дизайну",
    "frontend разработка",
    "UX/UI дизайн",
    "digital маркетинг",
    "курсы программирования",
    "БАР БОСС",
    "онлайн образование",
  ],
  authors: [{ name: "БАР БОСС ONLINE" }],
  creator: "БАР БОСС ONLINE",
  publisher: "БАР БОСС ONLINE",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://barbossonline.com"),
  openGraph: {
    title: "БАР БОСС ONLINE | Онлайн-школа креативных профессий",
    description:
      "Освойте востребованные навыки дизайна, программирования и digital-маркетинга. Учитесь у практиков!",
    url: "https://barbossonline.com",
    siteName: "БАР БОСС ONLINE",
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "БАР БОСС ONLINE | Онлайн-школа креативных профессий",
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
  name: "БАР БОСС ONLINE",
  description:
    "Онлайн-школа креативных профессий. Обучение дизайну, программированию и digital-маркетингу.",
  url: "https://barbossonline.com",
  logo: "https://barbossonline.com/icon.svg",
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
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600&display=swap"
          as="style"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${oswald.className} font-sans antialiased overflow-hidden`}>
        <ErrorBoundaryWrapper>
          {children}
          <ToastProvider />
          <Analytics />
        </ErrorBoundaryWrapper>
      </body>
    </html>
  )
}
