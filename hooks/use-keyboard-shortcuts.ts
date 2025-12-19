"use client"

import { useEffect } from "react"

interface KeyboardShortcutsOptions {
  onAltTab?: () => void
  onAltF4?: () => void
  onAltSpace?: () => void
  onEscape?: () => void
  enabled?: boolean
}

export function useKeyboardShortcuts({
  onAltTab,
  onAltF4,
  onAltSpace,
  onEscape,
  enabled = true,
}: KeyboardShortcutsOptions) {
  useEffect(() => {
    if (!enabled) return

    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt+Tab - переключение между окнами
      if (e.altKey && e.key === "Tab" && !e.shiftKey) {
        e.preventDefault()
        onAltTab?.()
        return
      }

      // Alt+F4 - закрытие активного окна
      if (e.altKey && e.key === "F4") {
        e.preventDefault()
        onAltF4?.()
        return
      }

      // Alt+Space - меню окна (можно использовать для максимизации)
      if (e.altKey && e.key === " ") {
        e.preventDefault()
        onAltSpace?.()
        return
      }

      // Escape - закрытие модальных окон/меню
      if (e.key === "Escape") {
        e.preventDefault()
        onEscape?.()
        return
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [onAltTab, onAltF4, onAltSpace, onEscape, enabled])
}


