"use client"

import { useState, useEffect } from "react"
import { PixelPear } from "@/components/pixel-pear"

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
        background: "#000000",
      }}
    >
      {/* Pixel Pear Logo */}
      <div className="mb-8 animate-pulse">
        <PixelPear size={80} />
      </div>

      {/* Progress Bar Container */}
      <div className="w-80">
        <div
          className="mb-2 p-2"
          style={{
            background: "#1a1a1a",
            border: "3px solid",
            borderColor: "#f8cf2c #000000 #000000 #f8cf2c",
          }}
        >
          <div className="text-xs font-bold text-[#f8cf2c] mb-1">{status}</div>
          {/* Progress Bar */}
          <div
            className="h-4 relative overflow-hidden"
            style={{
              background: "#000000",
              border: "2px solid #f8cf2c",
            }}
          >
            <div
              className="h-full transition-all duration-300"
              style={{
                background: "linear-gradient(90deg, #f8cf2c 0%, #ffe066 100%)",
                width: `${Math.min(progress, 100)}%`,
                boxShadow: "inset 0 0 10px rgba(0,0,0,0.3)",
              }}
            />
            {/* Animated stripes */}
            <div
              className="absolute inset-0 opacity-20 animate-slide-stripe"
              style={{
                background: "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(248,207,44,0.3) 4px, rgba(248,207,44,0.3) 8px)",
              }}
            />
          </div>
        </div>

        {/* Percentage */}
        <div className="text-center">
          <span className="text-sm font-bold text-[#f8cf2c]" style={{ textShadow: "1px 1px 0 #000" }}>
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </div>
  )
}

