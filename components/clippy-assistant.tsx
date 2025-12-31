"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { soundManager } from "@/lib/sounds"

interface Tip {
  id: string
  message: string
  context?: string
  action?: {
    label: string
    onClick: () => void
  }
}

const TIPS: Tip[] = [
  {
    id: "welcome",
    message: "Привет! Я твой помощник Clippy. Нажми на любую иконку, чтобы открыть окно!",
    context: "first-visit",
  },
  {
    id: "products",
    message: "Здесь наши продукты и услуги. Открой папку, чтобы узнать больше!",
    context: "hover-products",
  },
  {
    id: "contact",
    message: "Нужна помощь? Открой 'Контакты' или нажми кнопку 'Написать в Telegram'!",
    context: "open-contact",
  },
  {
    id: "team",
    message: "Хочешь узнать о нашей команде? Открой окно 'Команда'!",
    context: "hover-about",
  },
  {
    id: "socials",
    message: "Подписывайся на нас в соцсетях! Открой 'Социальные сети'.",
    context: "hover-socials",
  },
]

interface ClippyAssistantProps {
  onTipAction?: (action: () => void) => void
}

export function ClippyAssistant({ onTipAction }: ClippyAssistantProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [currentTip, setCurrentTip] = useState<Tip | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const isDragging = useRef(false)
  const dragOffset = useRef({ x: 0, y: 0 })
  const assistantRef = useRef<HTMLDivElement>(null)
  const hasShownWelcome = useRef(false)

  // Инициализация позиции
  useEffect(() => {
    if (typeof window !== "undefined") {
      setPosition({
        x: window.innerWidth - 120,
        y: window.innerHeight - 200,
      })
    }
  }, [])

  // Проверка первого визита и скрытого состояния
  useEffect(() => {
    if (typeof window === "undefined") return

    const hasVisited = localStorage.getItem("barboss-has-visited")
    const isHidden = localStorage.getItem("barboss-clippy-hidden") === "true"

    if (isHidden) {
      setIsVisible(false)
      return
    }

    if (!hasVisited) {
      localStorage.setItem("barboss-has-visited", "true")
      setTimeout(() => {
        showTip("welcome")
        hasShownWelcome.current = true
      }, 2000)
    }
  }, [])

  // Показ подсказки
  const showTip = useCallback((tipId: string) => {
    const tip = TIPS.find((t) => t.id === tipId)
    if (tip) {
      setCurrentTip(tip)
      setIsAnimating(true)
      soundManager.playClick()
    }
  }, [])

  // Скрытие подсказки
  const hideTip = useCallback(() => {
    setIsAnimating(false)
    setTimeout(() => setCurrentTip(null), 300)
  }, [])

  // Перетаскивание
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return
    e.preventDefault()
    e.stopPropagation()
    isDragging.current = true
    const rect = assistantRef.current?.getBoundingClientRect()
    if (rect) {
      dragOffset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }
    soundManager.playClick()
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging.current) {
        setPosition({
          x: e.clientX - dragOffset.current.x,
          y: e.clientY - dragOffset.current.y,
        })
      }
    }

    const handleMouseUp = () => {
      isDragging.current = false
    }

    if (isDragging.current) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging.current])

  // Слушаем события для контекстных подсказок
  useEffect(() => {
    const handleContextEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ context?: string }>
      const context = customEvent.detail?.context
      if (context) {
        const tip = TIPS.find((t) => t.context === context)
        if (tip && tip.id !== currentTip?.id) {
          showTip(tip.id)
        }
      }
    }

    window.addEventListener("clippy-context" as any, handleContextEvent)
    return () => window.removeEventListener("clippy-context" as any, handleContextEvent)
  }, [currentTip, showTip])

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
      className="fixed z-50 cursor-move select-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        imageRendering: "pixelated",
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Баллун с подсказкой */}
      {currentTip && (
        <div
          className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 transition-all duration-300 ${
            isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
          }`}
          style={{
            width: "280px",
            animation: "slide-up 0.3s ease-out",
          }}
        >
          <div
            className="p-3 text-xs relative"
            style={{
              background: "#FFD700",
              border: "3px solid #000000",
              boxShadow: "4px 4px 0 rgba(0,0,0,0.3)",
            }}
          >
            {/* Хвостик баллуна */}
            <div
              className="absolute top-full left-1/2 -translate-x-1/2 -mt-1"
              style={{
                width: 0,
                height: 0,
                borderLeft: "10px solid transparent",
                borderRight: "10px solid transparent",
                borderTop: "10px solid #000000",
              }}
            />
            <div
              className="absolute top-full left-1/2 -translate-x-1/2"
              style={{
                width: 0,
                height: 0,
                borderLeft: "8px solid transparent",
                borderRight: "8px solid transparent",
                borderTop: "8px solid #FFD700",
              }}
            />

            <p className="text-black font-bold mb-2">{currentTip.message}</p>

            {currentTip.action && (
              <button
                onClick={() => {
                  if (currentTip.action) {
                    currentTip.action.onClick()
                    hideTip()
                    onTipAction?.(currentTip.action.onClick)
                  }
                }}
                className="w-full py-1.5 text-xs font-bold transition-all hover:scale-105"
                style={{
                  background: "#000000",
                  color: "#FFD700",
                  border: "2px solid #000000",
                }}
              >
                {currentTip.action.label}
              </button>
            )}

            <button
              onClick={hideTip}
              className="absolute top-1 right-1 w-5 h-5 flex items-center justify-center text-black hover:bg-black hover:text-[#FFD700] transition-colors"
              style={{
                border: "2px solid #000000",
                background: "#FFD700",
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Аватар помощника */}
      <div
        className="relative cursor-pointer transition-transform hover:scale-110"
        onClick={() => {
          if (!currentTip) {
            showTip("welcome")
          } else {
            hideTip()
          }
        }}
        style={{
          width: "80px",
          height: "80px",
        }}
      >
        {/* Простая пиксельная иконка помощника */}
        <div
          className="w-full h-full flex items-center justify-center"
          style={{
            background: "#FFD700",
            border: "3px solid #000000",
            boxShadow: "4px 4px 0 rgba(0,0,0,0.3)",
            imageRendering: "pixelated",
          }}
        >
          <div
            className={`text-4xl transition-opacity ${isBlinking ? "opacity-50" : "opacity-100"}`}
            style={{ fontFamily: "monospace" }}
          >
            🤖
          </div>
        </div>

        {/* Индикатор новых подсказок */}
        {!currentTip && (
          <div
            className="absolute -top-1 -right-1 w-4 h-4 animate-bounce"
            style={{
              background: "#FF0000",
              border: "2px solid #000000",
              borderRadius: "50%",
            }}
          />
        )}
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

