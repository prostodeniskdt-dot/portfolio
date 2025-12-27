"use client"

import { useState, useEffect } from "react"

interface LoadingScreenProps {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [lines, setLines] = useState<string[]>([])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [showComplete, setShowComplete] = useState(false)

  // Список строк кода в стиле системных логов
  const systemLines = [
    "> INITIALIZING SYSTEM...",
    "> LOADING KERNEL MODULES...",
    "> CHECKING HARDWARE...",
    "> MEMORY TEST: OK",
    "> CPU STATUS: READY",
    "> LOADING DRIVERS...",
    "> NETWORK INTERFACE: ACTIVE",
    "> GRAPHICS MODULE: LOADED",
    "> AUDIO SYSTEM: INITIALIZED",
    "> FILE SYSTEM: MOUNTED",
    "> SECURITY PROTOCOLS: ENABLED",
    "> LOADING USER INTERFACE...",
    "> RENDERING ENGINE: READY",
    "> COMPONENT LIBRARY: LOADED",
    "> ASSETS CACHED",
    "> CONFIGURATION LOADED",
    "> SYSTEM READY",
    "> ALL SYSTEMS OPERATIONAL",
  ]

  useEffect(() => {
    if (currentLineIndex < systemLines.length) {
      const timer = setTimeout(() => {
        setLines((prev) => [...prev, systemLines[currentLineIndex]])
        setCurrentLineIndex((prev) => prev + 1)
      }, 150 + Math.random() * 100) // Случайная задержка для реалистичности

      return () => clearTimeout(timer)
    } else if (!showComplete) {
      // После всех строк показываем "Готово на 100%"
      const completeTimer = setTimeout(() => {
        setShowComplete(true)
        setTimeout(() => {
          onComplete()
        }, 800)
      }, 300)

      return () => clearTimeout(completeTimer)
    }
  }, [currentLineIndex, showComplete, onComplete, systemLines])

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        background: "#000000",
        fontFamily: "monospace",
      }}
    >
      {/* Консоль по центру экрана */}
      <div
        className="relative"
        style={{
          width: "600px",
          maxWidth: "90vw",
          maxHeight: "80vh",
          overflow: "hidden",
        }}
      >
        <div
          className="p-6"
          style={{
            background: "#000000",
            border: "3px solid #FFD700",
            boxShadow: "0 0 30px rgba(255, 215, 0, 0.5), 0 0 60px rgba(255, 215, 0, 0.2)",
          }}
        >
          {/* Заголовок консоли */}
          <div
            className="mb-4 pb-3 border-b"
            style={{
              borderColor: "#FFD700",
            }}
          >
            <span className="text-lg font-bold text-[#FFD700]">
              SYSTEM BOOT LOG
            </span>
          </div>

          {/* Строки кода */}
          <div className="space-y-1">
            {lines.map((line, index) => (
              <div
                key={index}
                className="text-base"
                style={{
                  color: index % 3 === 0 ? "#FFD700" : "#00FF00", // Чередование цветов
                  fontFamily: "monospace",
                  lineHeight: "1.6",
                  animation: "fadeIn 0.3s ease-in",
                }}
              >
                {line}
              </div>
            ))}

            {/* Курсор мигающий */}
            {currentLineIndex < systemLines.length && (
              <span
                className="text-base text-[#FFD700] animate-blink"
                style={{
                  fontFamily: "monospace",
                }}
              >
                _
              </span>
            )}

            {/* Финальное сообщение */}
            {showComplete && (
              <div
                className="mt-4 pt-4 border-t"
                style={{
                  borderColor: "#FFD700",
                  animation: "fadeIn 0.5s ease-in",
                }}
              >
                <div className="text-2xl font-bold text-[#FFD700] mb-2">
                  {'>'} Готово на 100%
                </div>
                <div className="text-lg text-[#00FF00]">
                  {'>'} SYSTEM READY
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
