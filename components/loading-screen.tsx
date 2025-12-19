"use client"

import { useState, useEffect } from "react"

interface LoadingScreenProps {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState("Инициализация системы...")

  useEffect(() => {
    const statuses = [
      "Инициализация системы...",
      "Загрузка компонентов...",
      "Подготовка интерфейса...",
      "Почти готово...",
    ]

    const interval = setInterval(() => {
      setProgress((prev: number) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => onComplete(), 300)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 150)

    const statusInterval = setInterval(() => {
      setStatus((current: string) => {
        const currentIndex = statuses.indexOf(current)
        if (currentIndex < statuses.length - 1) {
          return statuses[currentIndex + 1]
        }
        return current
      })
    }, 800)

    return () => {
      clearInterval(interval)
      clearInterval(statusInterval)
    }
  }, [onComplete])

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{
        background: "linear-gradient(135deg, #008080 0%, #004040 100%)",
      }}
    >
      {/* Windows 95 Logo */}
      <div className="mb-8 animate-pulse">
        <div className="flex items-center gap-3">
          <div
            className="w-16 h-16 flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #c0c0c0 0%, #808080 100%)",
              border: "3px solid",
              borderColor: "#ffffff #000000 #000000 #ffffff",
              boxShadow: "inset 2px 2px 0 rgba(0,0,0,0.3)",
            }}
          >
            <span className="text-3xl">🪟</span>
          </div>
          <div>
            <div className="text-2xl font-bold text-white" style={{ textShadow: "2px 2px 0 #000" }}>
              Microsoft
            </div>
            <div className="text-xl font-bold text-white" style={{ textShadow: "2px 2px 0 #000" }}>
              Windows 95
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="w-80">
        <div
          className="mb-2 p-2"
          style={{
            background: "#c0c0c0",
            border: "2px solid",
            borderColor: "#000000 #ffffff #ffffff #000000",
          }}
        >
          <div className="text-xs font-bold text-black mb-1">{status}</div>
          {/* Progress Bar */}
          <div
            className="h-4 relative overflow-hidden"
            style={{
              background: "#ffffff",
              border: "2px inset #808080",
            }}
          >
            <div
              className="h-full transition-all duration-300"
              style={{
                background: "linear-gradient(90deg, #0080ff 0%, #0040ff 100%)",
                width: `${Math.min(progress, 100)}%`,
                boxShadow: "inset 0 0 10px rgba(255,255,255,0.3)",
              }}
            />
            {/* Animated stripes */}
            <div
              className="absolute inset-0 opacity-30 animate-slide-stripe"
            />
          </div>
        </div>

        {/* Percentage */}
        <div className="text-center">
          <span className="text-sm font-bold text-white" style={{ textShadow: "1px 1px 0 #000" }}>
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-xs text-white/70" style={{ textShadow: "1px 1px 0 #000" }}>
        Copyright © 1995-2025 BARBOSS ONLINE
      </div>
    </div>
  )
}

