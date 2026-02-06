"use client"

import { Analytics } from "@vercel/analytics/next"

export function AnalyticsClient() {
  try {
    return <Analytics />
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      // В dev-режиме оставляем сообщение в консоли для отладки
      console.error("Vercel Analytics failed to render:", error)
    }
    // Если аналитика падает или блокируется, не ломаем всё приложение
    return null
  }
}

