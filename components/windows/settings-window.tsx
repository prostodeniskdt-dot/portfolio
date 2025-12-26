"use client"

import { useState, useEffect } from "react"
import { soundManager } from "@/lib/sounds"

export function SettingsWindow() {
  const [soundsEnabled, setSoundsEnabled] = useState(true)
  const [animationsEnabled, setAnimationsEnabled] = useState(true)

  useEffect(() => {
    setSoundsEnabled(soundManager.isEnabled())
  }, [])

  const handleSoundsToggle = (enabled: boolean) => {
    setSoundsEnabled(enabled)
    soundManager.setEnabled(enabled)
    if (enabled) {
      soundManager.playClick()
    }
  }

  const handleResetWindows = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("barboss-window-state")
      window.location.reload()
    }
  }

  const handleResetAll = () => {
    if (typeof window !== "undefined") {
      localStorage.clear()
      window.location.reload()
    }
  }

  return (
    <div className="text-black text-sm space-y-4">
      {/* Header */}
      <div
        className="p-2 text-xs font-bold text-center"
        style={{
          background: "#b8860b",
          border: "2px solid #000000",
        }}
      >
        ⚙️ НАСТРОЙКИ OS
      </div>

      {/* Sounds section */}
      <div
        className="p-3"
        style={{
          background: "#f5f0e1",
          border: "2px solid #000000",
        }}
      >
        <h3 className="font-bold text-base mb-2">🔊 Звуки</h3>
        <div className="flex items-center justify-between">
          <span className="text-xs">Включить звуковые эффекты</span>
          <button
            onClick={() => handleSoundsToggle(!soundsEnabled)}
            className="w-12 h-6 relative transition-colors"
            style={{
              background: soundsEnabled ? "#b8860b" : "#3a3a3a",
              border: "3px solid",
              borderColor: soundsEnabled ? "#000000 #b8860b #b8860b #000000" : "#000000 #3a3a3a #3a3a3a #000000",
            }}
          >
            <div
              className="absolute top-0.5 left-0.5 w-4 h-4 transition-transform"
              style={{
                background: soundsEnabled ? "#000000" : "#f5f0e1",
                border: "2px solid",
                borderColor: soundsEnabled ? "#b8860b" : "#3a3a3a",
                transform: soundsEnabled ? "translateX(24px)" : "translateX(0)",
              }}
            />
          </button>
        </div>
      </div>

      {/* Animations section */}
      <div
        className="p-3"
        style={{
          background: "#f5f0e1",
          border: "2px solid #000000",
        }}
      >
        <h3 className="font-bold text-base mb-2">✨ Анимации</h3>
        <div className="flex items-center justify-between">
          <span className="text-xs">Включить анимации</span>
          <button
            onClick={() => setAnimationsEnabled(!animationsEnabled)}
            className="w-12 h-6 relative transition-colors"
            style={{
              background: animationsEnabled ? "#b8860b" : "#3a3a3a",
              border: "3px solid",
              borderColor: animationsEnabled ? "#000000 #b8860b #b8860b #000000" : "#000000 #3a3a3a #3a3a3a #000000",
            }}
          >
            <div
              className="absolute top-0.5 left-0.5 w-4 h-4 transition-transform"
              style={{
                background: animationsEnabled ? "#000000" : "#f5f0e1",
                border: "2px solid",
                borderColor: animationsEnabled ? "#b8860b" : "#3a3a3a",
                transform: animationsEnabled ? "translateX(24px)" : "translateX(0)",
              }}
            />
          </button>
        </div>
      </div>

      {/* Actions section */}
      <div
        className="p-3 space-y-2"
        style={{
          background: "#f5f0e1",
          border: "2px solid #000000",
        }}
      >
        <h3 className="font-bold text-base mb-2">🔄 Действия</h3>
        <button
          onClick={handleResetWindows}
          className="w-full px-3 py-2 text-xs font-bold transition-colors hover:opacity-90"
          style={{
            background: "#b8860b",
            color: "#000000",
            border: "3px solid",
            borderColor: "#d4a017 #000000 #000000 #d4a017",
          }}
        >
          Сбросить позиции окон
        </button>
        <button
          onClick={handleResetAll}
          className="w-full px-3 py-2 text-xs font-bold transition-colors hover:opacity-90"
          style={{
            background: "#000000",
            color: "#b8860b",
            border: "3px solid",
            borderColor: "#3a3a3a #b8860b #b8860b #3a3a3a",
          }}
        >
          Сбросить все настройки
        </button>
      </div>

      {/* Info section */}
      <div
        className="p-3 text-xs"
        style={{
          background: "#000000",
          color: "#b8860b",
          border: "2px solid #b8860b",
        }}
      >
        <div className="space-y-1">
          <div>OS v2.0</div>
          <div>Версия: 2.0.0</div>
          <div>© 2025</div>
        </div>
      </div>
    </div>
  )
}

