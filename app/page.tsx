"use client"

import { useMemo, useCallback } from "react"
import { TopBar } from "@/components/top-bar"
import { Desktop } from "@/components/desktop"
import { Taskbar } from "@/components/taskbar"
import { RetroBackground } from "@/components/retro-background"
import { useWindowState } from "@/hooks/use-window-state"
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts"

export default function Home() {
  const {
    openWindows,
    activeWindow,
    minimizedWindows,
    toggleWindow,
    closeWindow,
    bringToFront,
    minimizeWindow,
  } = useWindowState()

  const visibleWindows = useMemo(
    () => openWindows.filter((w) => !minimizedWindows.includes(w)),
    [openWindows, minimizedWindows],
  )

  // Alt+Tab - переключение между окнами
  const handleAltTab = useCallback(() => {
    if (visibleWindows.length === 0) return
    const currentIndex = activeWindow ? visibleWindows.indexOf(activeWindow) : -1
    const nextIndex = (currentIndex + 1) % visibleWindows.length
    bringToFront(visibleWindows[nextIndex])
  }, [visibleWindows, activeWindow, bringToFront])

  // Alt+F4 - закрытие активного окна
  const handleAltF4 = useCallback(() => {
    if (activeWindow) {
      closeWindow(activeWindow)
    }
  }, [activeWindow, closeWindow])

  // Escape - закрытие меню (можно расширить)
  const handleEscape = useCallback(() => {
    // Здесь можно добавить логику закрытия модальных окон или меню
  }, [])

  useKeyboardShortcuts({
    onAltTab: handleAltTab,
    onAltF4: handleAltF4,
    onEscape: handleEscape,
  })

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <RetroBackground />
      <div className="relative z-10 flex h-full flex-col">
        <TopBar />
        <Desktop
          openWindows={visibleWindows}
          activeWindow={activeWindow}
          onClose={closeWindow}
          onFocus={bringToFront}
          onIconClick={toggleWindow}
          onMinimize={minimizeWindow}
        />
        <Taskbar onItemClick={toggleWindow} openWindows={openWindows} minimizedWindows={minimizedWindows} />
      </div>
    </div>
  )
}
