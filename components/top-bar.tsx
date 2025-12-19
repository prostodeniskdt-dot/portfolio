"use client"

import { useState, useEffect } from "react"

export function TopBar() {
  const [time, setTime] = useState<string>("")

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
    <header className="h-10 bg-[#000000] flex items-center px-3 border-b-3 border-[#f8cf2c] animate-slide-up relative overflow-hidden">
      <div className="absolute inset-0 animate-shimmer opacity-20" />

      {/* Logo with glow animation */}
      <div className="flex items-center gap-2 relative z-10">
        <div className="relative">
          <div className="absolute -inset-2 bg-[#f8cf2c] opacity-20 blur-md animate-pulse-glow" />
          <span className="relative text-[#f8cf2c] font-bold text-xl tracking-wider animate-glow-text">BARBOSS</span>
        </div>
        <span className="text-[#f5f0e1] text-sm animate-flicker">ONLINE</span>
        <span className="text-[#f8cf2c] animate-blink">_</span>
      </div>

      {/* Menu items with hover animations */}
      <div className="flex items-center ml-4 relative z-10">
        {["Файл", "Курсы", "Помощь"].map((item, index) => (
          <button
            key={item}
            className="px-3 py-1 text-sm text-[#f5f0e1] hover:bg-[#f8cf2c] hover:text-black transition-all duration-200 hover:scale-105 animate-slide-up"
            style={{ animationDelay: `${0.1 + index * 0.05}s` }}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* System info with animations */}
      <div className="flex items-center gap-3 text-sm relative z-10">
        <span className="px-2 py-0.5 bg-[#f8cf2c] text-black text-xs font-bold animate-pulse-glow hover:scale-105 transition-transform">
          BARBOSS OS v2.0
        </span>
        <span className="text-[#f8cf2c] font-bold animate-flicker">{time}</span>
      </div>
    </header>
  )
}
