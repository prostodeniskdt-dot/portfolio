import { NextRequest, NextResponse } from "next/server"
import * as Sentry from "@sentry/nextjs"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Отправляем ошибку в Sentry
    if (body.error) {
      Sentry.captureException(new Error(body.error.message || "Client error"), {
        tags: {
          source: "client",
          url: body.url,
          userAgent: body.userAgent,
        },
        extra: {
          error: body.error,
          stack: body.error.stack,
          timestamp: body.timestamp,
        },
      })
    } else {
      // Логируем общую ошибку
      Sentry.captureMessage("Client error reported", {
        level: "error",
        tags: {
          source: "client",
        },
        extra: body,
      })
    }
    
    console.error("Client error:", body)
    
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("Error logging failed:", error)
    Sentry.captureException(error as Error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

