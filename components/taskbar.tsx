"use client"

import { useState, useEffect } from "react"

interface TaskbarProps {
  onItemClick: (windowId: string) => void
  openWindows: string[]
  minimizedWindows: string[]
}

const taskbarItems = [
  { id: "about", label: "О школе", icon: "🎓" },
  { id: "courses", label: "Курсы", icon: "📚" },
  { id: "prices", label: "Тарифы", icon: "💰" },
  { id: "contact", label: "Контакты", icon: "📞" },
]

export function Taskbar({ onItemClick, openWindows, minimizedWindows }: TaskbarProps) {
  const [time, setTime] = useState<string>("")
  const [startOpen, setStartOpen] = useState(false)

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

  return (
    <footer
      className="h-12 flex items-center px-2 relative animate-slide-up"
      style={{
        background: "#000000",
        borderTop: "3px solid #f8cf2c",
        animationDelay: "0.2s",
      }}
    >
      {/* Start button with glow */}
      <button
        onClick={() => setStartOpen(!startOpen)}
        className={`h-9 px-3 flex items-center gap-2 mr-2 transition-all duration-200 ${startOpen ? "animate-pulse-glow" : "hover-lift"}`}
        style={{
          background: startOpen ? "#f8cf2c" : "#1a1a1a",
          border: "3px solid",
          borderColor: startOpen ? "#000000 #f8cf2c #f8cf2c #000000" : "#f8cf2c #000000 #000000 #f8cf2c",
          color: startOpen ? "#000000" : "#f8cf2c",
        }}
      >
        <span className="text-lg">⚡</span>
        <span className="text-sm font-bold">BARBOSS</span>
      </button>

      {startOpen && (
        <div
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
                  onClick={() => {
                    onItemClick(item.id)
                    setStartOpen(false)
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[#f8cf2c] hover:text-black text-black text-left transition-all duration-150 animate-slide-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm font-bold">{item.label}</span>
                </button>
              ))}
              <div className="h-px bg-[#000000] my-2 mx-3" />
              <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[#f8cf2c] hover:text-black text-black transition-colors duration-150">
                <span className="text-xl">🔌</span>
                <span className="text-sm font-bold">Выход...</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="w-0.5 h-8 mx-2 bg-[#f8cf2c]" />

      {/* Open windows with animations */}
      <div className="flex-1 flex items-center gap-2">
        {openWindows.map((windowId) => {
          const item = taskbarItems.find((i) => i.id === windowId)
          if (!item) return null
          const isMinimized = minimizedWindows.includes(windowId)
          return (
            <button
              key={windowId}
              onClick={() => onItemClick(windowId)}
              className="h-9 px-3 flex items-center gap-2 min-w-[140px] max-w-[180px] transition-all duration-200 animate-scale-in hover:scale-105"
              style={{
                background: isMinimized ? "#000000" : "#1a1a1a",
                border: "3px solid",
                borderColor: isMinimized ? "#f8cf2c #000000 #000000 #f8cf2c" : "#000000 #f8cf2c #f8cf2c #000000",
                color: "#f8cf2c",
              }}
            >
              <span className="text-sm">{item.icon}</span>
              <span className="text-xs font-bold truncate">{item.label}</span>
            </button>
          )
        })}
      </div>

      {/* System tray with glow effect */}
      <div
        className="h-8 flex items-center gap-3 px-3 transition-all duration-300 hover:shadow-[0_0_15px_rgba(248,207,44,0.3)]"
        style={{
          background: "#1a1a1a",
          border: "2px solid",
          borderColor: "#000000 #f8cf2c #f8cf2c #000000",
        }}
      >
        <span className="text-sm">🔊</span>
        <span className="text-sm">🌐</span>
        <span className="text-sm text-[#f8cf2c] font-bold animate-flicker">{time}</span>
      </div>
    </footer>
  )
}
