import type React from "react"
import type { Metadata } from "next"
import { VT323 } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _vt323 = VT323({ weight: "400", subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ALEX.DEV OS | Creative Developer",
  description: "Personal portfolio in retro Windows 95 style",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased overflow-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
