import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Логируем ошибку (в продакшене можно отправлять в Sentry, LogRocket и т.д.)
    console.error("Client error:", body)
    
    // Здесь можно добавить интеграцию с сервисом мониторинга ошибок
    // Например, Sentry, LogRocket, или собственный сервис
    
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("Error logging failed:", error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

