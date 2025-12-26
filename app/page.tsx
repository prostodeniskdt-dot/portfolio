"use client"

import { useMemo, useCallback, useState, useEffect, Suspense } from "react"
import { TopBar } from "@/components/top-bar"
import { Desktop } from "@/components/desktop"
import { Taskbar } from "@/components/taskbar"
import { RetroBackground } from "@/components/retro-background"
import { SidebarNavigation } from "@/components/sidebar-navigation"
import { LoadingScreen } from "@/components/loading-screen"
import { WindowSkeleton } from "@/components/window-skeleton"
import { useWindowState } from "@/hooks/use-window-state"
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts"
import { desktopIcons } from "@/lib/data"

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
    if (taskbarMenuOpen) {
      setTaskbarMenuOpen(false)
    }
  }, [taskbarMenuOpen])

  useKeyboardShortcuts({
    onAltTab: handleAltTab,
    onAltF4: handleAltF4,
    onEscape: handleEscape,
  })

  // Handler for opening a folder
  const handleOpenFolder = useCallback((folderId: string) => {
    if (folderId === "products") {
      toggleWindow("products-folder")
    }
  }, [toggleWindow])

  // Handler for opening a product
  const handleOpenProduct = useCallback((productId: string) => {
    toggleWindow(`product-${productId}`)
  }, [toggleWindow])

  // Handler for icon clicks - distinguishes between folders and windows
  const handleIconClick = useCallback((windowId: string) => {
    const icon = desktopIcons.find((i) => i.id === windowId)
    if (icon?.type === "folder") {
      const folderId = windowId.replace("-folder", "")
      handleOpenFolder(folderId)
    } else {
      toggleWindow(windowId)
    }
  }, [toggleWindow, handleOpenFolder])

  // Handler for sidebar navigation clicks
  const handleSidebarClick = useCallback((itemId: string) => {
    if (itemId === "products-folder") {
      handleOpenFolder("products")
    } else {
      toggleWindow(itemId)
    }
  }, [toggleWindow, handleOpenFolder])

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
        <TopBar />
        <SidebarNavigation onItemClick={handleSidebarClick} />
        <Suspense fallback={<WindowSkeleton />}>
        <Desktop
          openWindows={visibleWindows}
          activeWindow={activeWindow}
          onClose={closeWindow}
          onFocus={bringToFront}
          onIconClick={handleIconClick}
          onMinimize={minimizeWindow}
          onFolderClick={handleOpenFolder}
          onProductClick={handleOpenProduct}
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
