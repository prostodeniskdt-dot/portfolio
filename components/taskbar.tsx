"use client"

import { useState, useEffect } from "react"
import { taskbarItems } from "@/lib/data"
import { soundManager } from "@/lib/sounds"

interface TaskbarProps {
  onItemClick: (windowId: string) => void
  openWindows: string[]
  minimizedWindows: string[]
  onMenuStateChange?: (isOpen: boolean) => void
}

export function Taskbar({ onItemClick, openWindows, minimizedWindows, onMenuStateChange }: TaskbarProps) {
  const [time, setTime] = useState<string>("")
  const [startOpen, setStartOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showExitConfirm, setShowExitConfirm] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      )
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  // Escape handler для закрытия меню и модальных окон
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showExitConfirm) {
          setShowExitConfirm(false)
        } else if (startOpen) {
          setStartOpen(false)
          onMenuStateChange?.(false)
        }
      }
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [startOpen, showExitConfirm, onMenuStateChange])

  // Слушаем событие выхода из TopBar
  useEffect(() => {
    const handleExitRequest = () => {
      setShowExitConfirm(true)
    }
    window.addEventListener("exit-request", handleExitRequest)
    return () => window.removeEventListener("exit-request", handleExitRequest)
  }, [])

  return (
    <footer
      role="toolbar"
      aria-label="Панель задач"
      className={`${isMobile ? "h-10" : "h-12"} flex items-center px-2 relative animate-slide-up`}
      style={{
        background: "#000000",
        borderTop: "3px solid #f8cf2c",
        animationDelay: "0.2s",
      }}
    >
      {/* Start button with glow */}
      <button
        onClick={() => {
          soundManager.playClick()
          const newState = !startOpen
          setStartOpen(newState)
          onMenuStateChange?.(newState)
        }}
        aria-label="Меню BARBOSS"
        aria-expanded={startOpen}
        aria-haspopup="menu"
        className={`${isMobile ? "h-7 px-2" : "h-9 px-3"} flex items-center gap-2 mr-2 transition-all duration-200 ${startOpen ? "animate-pulse-glow" : "hover-lift"}`}
        style={{
          background: startOpen ? "#f8cf2c" : "#1a1a1a",
          border: "3px solid",
          borderColor: startOpen ? "#000000 #f8cf2c #f8cf2c #000000" : "#f8cf2c #000000 #000000 #f8cf2c",
          color: startOpen ? "#000000" : "#f8cf2c",
        }}
      >
        <span className={isMobile ? "text-sm" : "text-lg"} aria-hidden="true">
          ⚡
        </span>
        {!isMobile && <span className="text-sm font-bold">BARBOSS</span>}
      </button>

      {startOpen && (
        <div
          role="menu"
          aria-label="Меню приложения"
          className="absolute bottom-12 left-2 animate-scale-in"
          style={{
            background: "#f5f0e1",
            border: "3px solid",
            borderColor: "#f8cf2c #000000 #000000 #f8cf2c",
            boxShadow: "8px 8px 0 rgba(248,207,44,0.3), 0 0 30px rgba(248,207,44,0.2)",
            minWidth: "220px",
          }}
        >
          {/* Yellow sidebar with shimmer */}
          <div className="flex">
            <div
              className="w-8 flex flex-col justify-end p-2 relative overflow-hidden"
              style={{
                background: "#f8cf2c",
              }}
            >
              <div className="absolute inset-0 animate-shimmer" />
              <span
                className="text-black text-xs font-bold relative z-10"
                style={{
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}
              >
                BARBOSS ONLINE
              </span>
            </div>

            {/* Menu items with staggered animations */}
            <div className="flex-1 py-2">
              {taskbarItems.map((item, index) => (
                <button
                  key={item.id}
                  role="menuitem"
                  onClick={() => {
                    soundManager.playClick()
                    onItemClick(item.id)
                    setStartOpen(false)
                    onMenuStateChange?.(false)
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[#f8cf2c] hover:text-black text-black text-left transition-all duration-150 animate-slide-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <span className="text-xl" aria-hidden="true">
                    {item.icon}
                  </span>
                  <span className="text-sm font-bold">{item.label}</span>
                </button>
              ))}
              <div className="h-px bg-[#000000] my-2 mx-3" />
              <button
                onClick={() => {
                  soundManager.playClick()
                  setShowExitConfirm(true)
                  setStartOpen(false)
                  onMenuStateChange?.(false)
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    soundManager.playClick()
                    setShowExitConfirm(true)
                    setStartOpen(false)
                    onMenuStateChange?.(false)
                  }
                }}
                className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[#f8cf2c] hover:text-black text-black transition-colors duration-150"
              >
                <span className="text-xl">🔌</span>
                <span className="text-sm font-bold">Выход...</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Exit confirmation dialog */}
      {showExitConfirm && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{
            background: "rgba(0, 0, 0, 0.7)",
          }}
          onClick={() => setShowExitConfirm(false)}
        >
          <div
            className="animate-scale-in"
            style={{
              background: "#f5f0e1",
              border: "3px solid",
              borderColor: "#f8cf2c #000000 #000000 #f8cf2c",
              boxShadow: "8px 8px 0 rgba(248,207,44,0.3), 0 0 30px rgba(248,207,44,0.2)",
              minWidth: "300px",
              maxWidth: "400px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              <h3
                className="text-lg font-bold mb-3"
                style={{
                  color: "#000000",
                }}
              >
                🔌 Выход из BARBOSS OS
              </h3>
              <p
                className="text-sm mb-4"
                style={{
                  color: "#000000",
                }}
              >
                Вы уверены, что хотите выйти?
              </p>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setShowExitConfirm(false)}
                  className="px-4 py-2 text-xs font-bold transition-colors hover:opacity-90"
                  style={{
                    background: "#000000",
                    color: "#f8cf2c",
                    border: "3px solid",
                    borderColor: "#3a3a3a #f8cf2c #f8cf2c #3a3a3a",
                  }}
                >
                  Отмена
                </button>
                <button
                  onClick={() => {
                    setIsExiting(true)
                    // Анимация закрытия
                    setTimeout(() => {
                      // В реальном приложении здесь может быть редирект или закрытие приложения
                      // Для веб-версии можно показать сообщение или закрыть все окна
                      window.location.href = "/"
                    }, 500)
                  }}
                  disabled={isExiting}
                  className="px-4 py-2 text-xs font-bold transition-colors hover:opacity-90 disabled:opacity-50"
                  style={{
                    background: "#f8cf2c",
                    color: "#000000",
                    border: "3px solid",
                    borderColor: "#ffe066 #000000 #000000 #ffe066",
                  }}
                >
                  {isExiting ? "Выход..." : "Выход"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="w-0.5 h-8 mx-2 bg-[#f8cf2c]" />

      {/* Open windows with animations */}
      <div className="flex-1 flex items-center gap-2 overflow-x-auto">
        {openWindows.map((windowId) => {
          const item = taskbarItems.find((i) => i.id === windowId)
          if (!item) return null
          const isMinimized = minimizedWindows.includes(windowId)
          return (
            <button
              key={windowId}
              onClick={() => {
                soundManager.playClick()
                onItemClick(windowId)
              }}
              className={`${isMobile ? "h-7 px-2 min-w-[60px]" : "h-9 px-3 min-w-[140px] max-w-[180px]"} flex items-center gap-2 transition-all duration-200 animate-scale-in hover:scale-105`}
              style={{
                background: isMinimized ? "#000000" : "#1a1a1a",
                border: "3px solid",
                borderColor: isMinimized ? "#f8cf2c #000000 #000000 #f8cf2c" : "#000000 #f8cf2c #f8cf2c #000000",
                color: "#f8cf2c",
              }}
            >
              <span className={isMobile ? "text-xs" : "text-sm"}>{item.icon}</span>
              {!isMobile && <span className="text-xs font-bold truncate">{item.label}</span>}
            </button>
          )
        })}
      </div>

      {/* System tray with glow effect */}
      <div
        className={`${isMobile ? "h-7 px-2 gap-2" : "h-8 px-3 gap-3"} flex items-center transition-all duration-300 hover:shadow-[0_0_15px_rgba(248,207,44,0.3)]`}
        style={{
          background: "#1a1a1a",
          border: "2px solid",
          borderColor: "#000000 #f8cf2c #f8cf2c #000000",
        }}
      >
        {!isMobile && (
          <>
            <span className="text-sm">🔊</span>
            <span className="text-sm">🌐</span>
          </>
        )}
        <span className={`${isMobile ? "text-xs" : "text-sm"} text-[#f8cf2c] font-bold animate-flicker`}>{time}</span>
      </div>
    </footer>
  )
}
