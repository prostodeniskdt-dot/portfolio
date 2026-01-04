"use client"

import { useMemo, useCallback, useState, useEffect, Suspense } from "react"
import { Desktop } from "@/components/desktop"
import { Taskbar } from "@/components/taskbar"
import { RetroBackground } from "@/components/retro-background"
import { SidebarNavigation } from "@/components/sidebar-navigation"
import { LoadingScreen } from "@/components/loading-screen"
import { WindowSkeleton } from "@/components/window-skeleton"
import { useWindowState } from "@/hooks/use-window-state"
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts"
import { desktopIcons } from "@/lib/data"
import { DeleteWarningModal } from "@/components/delete-warning-modal"
import { ClippyAssistant } from "@/components/clippy-assistant"
import { StandalonePlayer } from "@/components/standalone-player"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [isBackgroundAnimated, setIsBackgroundAnimated] = useState(false)
  const [showDeleteWarning, setShowDeleteWarning] = useState(false)
  const [isPlayerOpen, setIsPlayerOpen] = useState(false)
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
    if (isPlayerOpen) {
      setIsPlayerOpen(false)
    }
  }, [taskbarMenuOpen, isPlayerOpen])

  useKeyboardShortcuts({
    onAltTab: handleAltTab,
    onAltF4: handleAltF4,
    onEscape: handleEscape,
  })

  // Handler for opening a folder
  const handleOpenFolder = useCallback((folderId: string) => {
    // Map folder IDs to window IDs
    const folderWindowMap: Record<string, string> = {
      "products": "products-folder",
      "individual-products": "individual-products-folder",
      "it-products": "it-products-folder",
      "vacancies": "vacancies-folder",
      "advertising": "advertising-folder",
      "contest": "contest-folder",
      "friends": "friends-folder",
      "legal-documents": "legal-documents-folder",
    }
    const windowId = folderWindowMap[folderId] || `${folderId}-folder`
    toggleWindow(windowId)
  }, [toggleWindow])

  // Handler for opening a product
  const handleOpenProduct = useCallback((productId: string) => {
    toggleWindow(`product-${productId}`)
  }, [toggleWindow])

  // Handler for icon clicks - distinguishes between folders, windows, and actions
  const handleIconClick = useCallback((windowId: string) => {
    if (windowId === "player") {
      setIsPlayerOpen(true)
      return
    }
    const icon = desktopIcons.find((i) => i.id === windowId)
    if (icon?.type === "folder") {
      const folderId = windowId.replace("-folder", "")
      handleOpenFolder(folderId)
    } else if (icon?.type === "action") {
      if (windowId === "animate-background") {
        setIsBackgroundAnimated(prev => !prev)
      }
    } else {
      toggleWindow(windowId)
    }
  }, [toggleWindow, handleOpenFolder])

  // Handler for sidebar navigation clicks
  const handleSidebarClick = useCallback((itemId: string) => {
    if (itemId === "animate-background") {
      setIsBackgroundAnimated(prev => !prev)
      return
    }
    if (itemId === "player") {
      setIsPlayerOpen(true)
      return
    }
    if (itemId.endsWith("-folder")) {
      const folderId = itemId.replace("-folder", "")
      handleOpenFolder(folderId)
    } else {
      toggleWindow(itemId)
    }
  }, [toggleWindow, handleOpenFolder])

  // Handler for opening Clippy chat
  const handleOpenClippy = useCallback(() => {
    toggleWindow("clippy")
  }, [toggleWindow])

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
      <RetroBackground isAnimated={isBackgroundAnimated} />
      <div className="relative z-10 flex h-full flex-col">
        <SidebarNavigation 
          onItemClick={handleSidebarClick}
          onShowDeleteWarning={() => setShowDeleteWarning(true)}
        />
        <DeleteWarningModal 
          isOpen={showDeleteWarning} 
          onClose={() => setShowDeleteWarning(false)} 
        />
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
        <ClippyAssistant onOpenChat={handleOpenClippy} />
        <Taskbar
          onItemClick={(itemId: string) => {
            if (itemId === "player") {
              setIsPlayerOpen(true)
            } else {
              toggleWindow(itemId)
            }
          }}
          openWindows={openWindows}
          minimizedWindows={minimizedWindows}
          onMenuStateChange={setTaskbarMenuOpen}
        />
        {isPlayerOpen && (
          <StandalonePlayer 
            onClose={() => setIsPlayerOpen(false)}
            defaultPosition={{ x: 100, y: 100 }}
          />
        )}
      </div>
    </div>
  )
}
