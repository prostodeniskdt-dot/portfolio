"use client"

import { useMemo, useCallback, useState, useEffect, Suspense } from "react"
import { TopBar } from "@/components/top-bar"
import { Desktop } from "@/components/desktop"
import { Taskbar } from "@/components/taskbar"
import { RetroBackground } from "@/components/retro-background"
import { LoadingScreen } from "@/components/loading-screen"
import { WindowSkeleton } from "@/components/window-skeleton"
import { useWindowState } from "@/hooks/use-window-state"
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const {
    openWindows,
    activeWindow,
    minimizedWindows,
    toggleWindow,
    closeWindow,
    bringToFront,
    minimizeWindow,
  } = useWindowState()

  const [topBarMenuOpen, setTopBarMenuOpen] = useState(false)
  const [taskbarMenuOpen, setTaskbarMenuOpen] = useState(false)

  const visibleWindows = useMemo(
    () => openWindows.filter((w: string) => !minimizedWindows.includes(w)),
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

  // Escape - закрытие меню и модальных окон
  const handleEscape = useCallback(() => {
    if (topBarMenuOpen) {
      setTopBarMenuOpen(false)
    }
    if (taskbarMenuOpen) {
      setTaskbarMenuOpen(false)
    }
  }, [topBarMenuOpen, taskbarMenuOpen])

  useKeyboardShortcuts({
    onAltTab: handleAltTab,
    onAltF4: handleAltF4,
    onEscape: handleEscape,
  })

  // Слушаем событие открытия окна контактов
  useEffect(() => {
    const handleOpenContact = () => {
      toggleWindow("contact")
    }
    window.addEventListener("openContactWindow", handleOpenContact)
    return () => window.removeEventListener("openContactWindow", handleOpenContact)
  }, [toggleWindow])

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <RetroBackground />
      <div className="relative z-10 flex h-full flex-col">
        <TopBar
          onMenuStateChange={setTopBarMenuOpen}
          onOpenWindow={toggleWindow}
          onOpenFolder={(folderId) => {
            if (folderId === "products") {
              toggleWindow("products-folder")
            }
          }}
          onOpenProduct={(productId) => {
            toggleWindow(`product-${productId}`)
          }}
          onExit={() => {
            // Триггерим событие выхода (можно использовать тот же механизм, что и в Taskbar)
            const event = new CustomEvent("exit-request")
            window.dispatchEvent(event)
          }}
        />
        <Suspense fallback={<WindowSkeleton />}>
        <Desktop
          openWindows={visibleWindows}
          activeWindow={activeWindow}
          onClose={closeWindow}
          onFocus={bringToFront}
          onIconClick={toggleWindow}
          onMinimize={minimizeWindow}
          onFolderClick={(folderId) => {
            if (folderId === "products") {
              toggleWindow("products-folder")
            }
          }}
          onProductClick={(productId) => {
            toggleWindow(`product-${productId}`)
          }}
        />
        </Suspense>
        <Taskbar
          onItemClick={toggleWindow}
          openWindows={openWindows}
          minimizedWindows={minimizedWindows}
          onMenuStateChange={setTaskbarMenuOpen}
        />
      </div>
    </div>
  )
}
