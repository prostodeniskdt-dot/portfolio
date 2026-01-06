"use client"

import { useState, useEffect, useRef } from "react"
import { soundManager } from "@/lib/sounds"

interface ClippyAssistantProps {
  onOpenChat?: () => void
}

export function ClippyAssistant({ onOpenChat }: ClippyAssistantProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const assistantRef = useRef<HTMLDivElement>(null)

  // Инициализация позиции
  useEffect(() => {
    if (typeof window !== "undefined") {
      setPosition({
        x: window.innerWidth - 120,
        y: window.innerHeight - 200,
      })
    }
  }, [])

  // Проверка скрытого состояния
  useEffect(() => {
    if (typeof window === "undefined") return

    const isHidden = localStorage.getItem("barboss-clippy-hidden") === "true"

    if (isHidden) {
      setIsVisible(false)
    }
  }, [])

  // Слушатель события для показа помощника
  useEffect(() => {
    const handleShowClippy = () => {
      setIsVisible(true)
      if (typeof window !== "undefined") {
        localStorage.removeItem("barboss-clippy-hidden")
      }
    }
    window.addEventListener("show-clippy", handleShowClippy)
    return () => window.removeEventListener("show-clippy", handleShowClippy)
  }, [])

  // Анимация моргания
  const [isBlinking, setIsBlinking] = useState(false)
  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 200)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  if (!isVisible) return null

  return (
    <div
      ref={assistantRef}
      className="fixed z-50 cursor-pointer select-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        imageRendering: "pixelated",
      }}
    >
      {/* Аватар помощника */}
      <div
        className="relative cursor-pointer transition-transform hover:scale-110"
        onClick={() => {
          onOpenChat?.()
          soundManager.playClick()
        }}
        style={{
          width: "80px",
          height: "80px",
        }}
      >
        {/* Простая пиксельная иконка помощника - черный доберман */}
        <div
          className="w-full h-full flex items-center justify-center"
          style={{
            background: "#FFFFFF",
            border: "3px solid #000000",
            boxShadow: "4px 4px 0 rgba(0,0,0,0.3)",
            imageRendering: "pixelated",
          }}
        >
          <div
            className={`text-4xl transition-opacity ${isBlinking ? "opacity-50" : "opacity-100"}`}
            style={{ fontFamily: "monospace", filter: "grayscale(100%) brightness(0.3)" }}
          >
            🐕
          </div>
        </div>
      </div>

      {/* Кнопка скрыть */}
      <button
        onClick={() => {
          setIsVisible(false)
          if (typeof window !== "undefined") {
            localStorage.setItem("barboss-clippy-hidden", "true")
          }
          soundManager.playClick()
        }}
        className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center text-xs font-bold text-black hover:bg-black hover:text-[#FFD700] transition-colors"
        style={{
          background: "#FFD700",
          border: "2px solid #000000",
        }}
        title="Скрыть помощника"
      >
        ×
      </button>
    </div>
  )
}

