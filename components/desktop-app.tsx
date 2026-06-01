"use client"

import { useMemo, useCallback, useState, useEffect, Suspense } from "react"
import { Desktop } from "@/components/desktop"
import { MobileWindows } from "@/components/mobile-windows"
import { Taskbar } from "@/components/taskbar"
import { RetroBackground } from "@/components/retro-background"
import { SidebarNavigation } from "@/components/sidebar-navigation"
import { LoadingScreen } from "@/components/loading-screen"
import { WindowSkeleton } from "@/components/window-skeleton"
import { useWindowState } from "@/hooks/use-window-state"
import { useAppPath } from "@/hooks/use-app-path"
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts"
import { useIsMobile } from "@/hooks/use-mobile"
import { desktopIcons } from "@/lib/data"
import { DeleteWarningModal } from "@/components/delete-warning-modal"
import { StandalonePlayer } from "@/components/standalone-player"
import { CookieConsent } from "@/components/cookie-consent"
import { WelcomeModal } from "@/components/welcome-modal"
import {
  resolveDeepLink,
  folderIdToPath,
  folderIdToWindowId,
  windowIdToPath,
  getPathForSection,
} from "@/lib/routes"

export function DesktopApp() {
  const { pathname, parsed, navigate } = useAppPath()
  const hasDeepLinkPath = parsed !== null

  const [isLoading, setIsLoading] = useState(true)
  const [isBackgroundAnimated, setIsBackgroundAnimated] = useState(false)
  const [showDeleteWarning, setShowDeleteWarning] = useState(false)
  const [showWelcomeModal, setShowWelcomeModal] = useState(false)
  const [isPlayerOpen, setIsPlayerOpen] = useState(false)
  const isMobile = useIsMobile()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  useEffect(() => {
    setSidebarOpen(isMobile)
  }, [isMobile])

  const {
    openWindows,
    activeWindow,
    minimizedWindows,
    toggleWindow,
    closeWindow,
    bringToFront,
    minimizeWindow,
    applyWindowState,
  } = useWindowState()

  const [taskbarMenuOpen, setTaskbarMenuOpen] = useState(false)

  const applyDeepLinkFromPath = useCallback(() => {
    if (!parsed) return

    const state = resolveDeepLink(parsed.section, parsed.item)
    if (!state) return

    applyWindowState({
      openWindows: state.openWindows,
      activeWindow: state.activeWindow,
    })

    if (state.openPlayer) {
      setIsPlayerOpen(true)
    }
  }, [parsed, applyWindowState])

  useEffect(() => {
    if (isLoading) return
    applyDeepLinkFromPath()
  }, [pathname, isLoading, applyDeepLinkFromPath])

  const visibleWindows = useMemo(
    () => openWindows.filter((w: string) => !minimizedWindows.includes(w)),
    [openWindows, minimizedWindows],
  )

  const syncUrlForWindow = useCallback(
    (windowId: string) => {
      const path = windowIdToPath(windowId)
      if (path) navigate(path)
    },
    [navigate],
  )

  const syncUrlForFolder = useCallback(
    (folderId: string) => {
      navigate(folderIdToPath(folderId))
    },
    [navigate],
  )

  const syncUrlForPlayer = useCallback(() => {
    navigate(getPathForSection("player"))
  }, [navigate])

  const syncUrlHome = useCallback(() => {
    navigate("/")
  }, [navigate])

  const handleAltTab = useCallback(() => {
    if (visibleWindows.length === 0) return
    const currentIndex = activeWindow ? visibleWindows.indexOf(activeWindow) : -1
    const nextIndex = (currentIndex + 1) % visibleWindows.length
    bringToFront(visibleWindows[nextIndex])
  }, [visibleWindows, activeWindow, bringToFront])

  const handleAltF4 = useCallback(() => {
    if (activeWindow) {
      closeWindow(activeWindow)
      const path = windowIdToPath(activeWindow)
      if (path && pathname === path) {
        syncUrlHome()
      }
    }
  }, [activeWindow, closeWindow, pathname, syncUrlHome])

  const handleEscape = useCallback(() => {
    if (showWelcomeModal) {
      setShowWelcomeModal(false)
      return
    }
    if (taskbarMenuOpen) {
      setTaskbarMenuOpen(false)
    }
    if (isPlayerOpen) {
      setIsPlayerOpen(false)
      if (pathname === getPathForSection("player")) {
        syncUrlHome()
      }
    }
  }, [showWelcomeModal, taskbarMenuOpen, isPlayerOpen, pathname, syncUrlHome])

  useKeyboardShortcuts({
    onAltTab: handleAltTab,
    onAltF4: handleAltF4,
    onEscape: handleEscape,
  })

  const handleOpenFolder = useCallback(
    (folderId: string) => {
      const windowId = folderIdToWindowId(folderId)
      toggleWindow(windowId)
      syncUrlForFolder(folderId)
    },
    [toggleWindow, syncUrlForFolder],
  )

  const handleOpenProduct = useCallback(
    (productId: string) => {
      toggleWindow(`product-${productId}`)
    },
    [toggleWindow],
  )

  const handleIconClick = useCallback(
    (windowId: string) => {
      if (windowId === "player") {
        setIsPlayerOpen(true)
        syncUrlForPlayer()
        return
      }
      const icon = desktopIcons.find((i) => i.id === windowId)
      if (icon?.type === "folder") {
        const folderId = windowId.replace("-folder", "")
        handleOpenFolder(folderId)
      } else if (icon?.type === "action") {
        if (windowId === "animate-background") {
          setIsBackgroundAnimated((prev) => !prev)
        }
      } else {
        toggleWindow(windowId)
        syncUrlForWindow(windowId)
      }
    },
    [toggleWindow, handleOpenFolder, syncUrlForWindow, syncUrlForPlayer],
  )

  const handleSidebarClick = useCallback(
    (itemId: string) => {
      if (itemId === "animate-background") {
        setIsBackgroundAnimated((prev) => !prev)
        return
      }
      if (itemId === "player") {
        setIsPlayerOpen(true)
        syncUrlForPlayer()
        return
      }
      if (itemId.endsWith("-folder")) {
        const folderId = itemId.replace("-folder", "")
        handleOpenFolder(folderId)
      } else {
        toggleWindow(itemId)
        syncUrlForWindow(itemId)
      }
    },
    [toggleWindow, handleOpenFolder, syncUrlForWindow, syncUrlForPlayer],
  )

  const handleCloseWindow = useCallback(
    (windowId: string) => {
      closeWindow(windowId)
      const path = windowIdToPath(windowId)
      if (path && pathname === path) {
        syncUrlHome()
      }
    },
    [closeWindow, pathname, syncUrlHome],
  )

  useEffect(() => {
    const handleOpenContact = () => {
      toggleWindow("contact")
      syncUrlForWindow("contact")
    }
    window.addEventListener("openContactWindow", handleOpenContact)
    return () => window.removeEventListener("openContactWindow", handleOpenContact)
  }, [toggleWindow, syncUrlForWindow])

  if (isLoading) {
    return (
      <LoadingScreen
        onComplete={() => {
          setIsLoading(false)
          if (!hasDeepLinkPath) {
            setShowWelcomeModal(true)
          }
        }}
      />
    )
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden" style={{ position: "relative" }}>
      <RetroBackground isAnimated={isMobile ? false : isBackgroundAnimated} isMobile={isMobile} />
      <div className="relative flex h-full flex-col" style={{ zIndex: 10 }}>
        <SidebarNavigation
          onItemClick={handleSidebarClick}
          onShowDeleteWarning={() => setShowDeleteWarning(true)}
          isMobile={isMobile}
          isOpen={sidebarOpen}
        />
        <DeleteWarningModal isOpen={showDeleteWarning} onClose={() => setShowDeleteWarning(false)} />
        <WelcomeModal isOpen={showWelcomeModal} onClose={() => setShowWelcomeModal(false)} />
        {!isMobile && (
          <Suspense fallback={<WindowSkeleton />}>
            <Desktop
              openWindows={visibleWindows}
              activeWindow={activeWindow}
              onClose={handleCloseWindow}
              onFocus={bringToFront}
              onIconClick={handleIconClick}
              onMinimize={minimizeWindow}
              onFolderClick={handleOpenFolder}
              onProductClick={handleOpenProduct}
            />
          </Suspense>
        )}
        {isMobile && (
          <MobileWindows
            openWindows={openWindows}
            activeWindow={activeWindow}
            minimizedWindows={minimizedWindows}
            onClose={handleCloseWindow}
            onFocus={bringToFront}
            onMinimize={minimizeWindow}
            onProductClick={handleOpenProduct}
          />
        )}
        <Taskbar
          onItemClick={(itemId: string) => {
            if (itemId === "player") {
              setIsPlayerOpen(true)
              syncUrlForPlayer()
            } else {
              toggleWindow(itemId)
              syncUrlForWindow(itemId)
            }
          }}
          openWindows={openWindows}
          minimizedWindows={minimizedWindows}
          onMenuStateChange={setTaskbarMenuOpen}
        />
        {isPlayerOpen && (
          <StandalonePlayer
            onClose={() => {
              setIsPlayerOpen(false)
              if (pathname === getPathForSection("player")) {
                syncUrlHome()
              }
            }}
            defaultPosition={{ x: 100, y: 100 }}
          />
        )}
        <CookieConsent />
      </div>
    </div>
  )
}
