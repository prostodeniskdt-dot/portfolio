import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Логируем ошибку
    console.error("Client error:", body)
    
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("Error logging failed:", error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

