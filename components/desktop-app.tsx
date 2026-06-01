"use client"

import { useMemo, useCallback, useState, useEffect, Suspense, useRef } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Desktop } from "@/components/desktop"
import { MobileWindows } from "@/components/mobile-windows"
import { Taskbar } from "@/components/taskbar"
import { RetroBackground } from "@/components/retro-background"
import { SidebarNavigation } from "@/components/sidebar-navigation"
import { LoadingScreen } from "@/components/loading-screen"
import { WindowSkeleton } from "@/components/window-skeleton"
import { useWindowState } from "@/hooks/use-window-state"
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
  parsePathname,
  getPathForSection,
} from "@/lib/routes"

export interface DesktopAppProps {
  deepLinkSection?: string
  deepLinkItem?: string
}

export function DesktopApp({ deepLinkSection, deepLinkItem }: DesktopAppProps) {
  const deepLink = deepLinkSection
    ? resolveDeepLink(deepLinkSection, deepLinkItem)
    : null

  const [isLoading, setIsLoading] = useState(true)
  const [isBackgroundAnimated, setIsBackgroundAnimated] = useState(false)
  const [showDeleteWarning, setShowDeleteWarning] = useState(false)
  const [showWelcomeModal, setShowWelcomeModal] = useState(!deepLinkSection)
  const [isPlayerOpen, setIsPlayerOpen] = useState(deepLink?.openPlayer ?? false)
  const isMobile = useIsMobile()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const router = useRouter()
  const pathname = usePathname()
  const isSyncingFromUrl = useRef(false)

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
    openWindow,
  } = useWindowState(
    deepLink
      ? {
          openWindows: deepLink.openWindows,
          activeWindow: deepLink.activeWindow,
        }
      : undefined,
  )

  const [taskbarMenuOpen, setTaskbarMenuOpen] = useState(false)

  const visibleWindows = useMemo(
    () => openWindows.filter((w: string) => !minimizedWindows.includes(w)),
    [openWindows, minimizedWindows],
  )

  const syncUrlForWindow = useCallback(
    (windowId: string) => {
      const path = windowIdToPath(windowId)
      if (path && pathname !== path) {
        router.push(path)
      }
    },
    [router, pathname],
  )

  const syncUrlForFolder = useCallback(
    (folderId: string) => {
      const path = folderIdToPath(folderId)
      if (pathname !== path) {
        router.push(path)
      }
    },
    [router, pathname],
  )

  const syncUrlForPlayer = useCallback(() => {
    const path = getPathForSection("player")
    if (pathname !== path) {
      router.push(path)
    }
  }, [router, pathname])

  const syncUrlHome = useCallback(() => {
    if (pathname !== "/") {
      router.push("/")
    }
  }, [router, pathname])

  const applyPathToUI = useCallback(
    (path: { section: string; item?: string } | null) => {
      isSyncingFromUrl.current = true
      try {
        if (!path) {
          return
        }
        const state = resolveDeepLink(path.section, path.item)
        if (!state) return

        if (state.openPlayer) {
          setIsPlayerOpen(true)
        }

        for (const windowId of state.openWindows) {
          openWindow(windowId)
        }
        if (state.activeWindow) {
          bringToFront(state.activeWindow)
        }
      } finally {
        isSyncingFromUrl.current = false
      }
    },
    [openWindow, bringToFront],
  )

  useEffect(() => {
    const parsed = parsePathname(pathname)
    if (!parsed) return
    if (parsed.section === deepLinkSection && parsed.item === deepLinkItem) return
    applyPathToUI(parsed)
  }, [pathname, deepLinkSection, deepLinkItem, applyPathToUI])

  const handleAltTab = useCallback(() => {
    if (visibleWindows.length === 0) return
    const currentIndex = activeWindow ? visibleWindows.indexOf(activeWindow) : -1
    const nextIndex = (currentIndex + 1) % visibleWindows.length
    bringToFront(visibleWindows[nextIndex])
  }, [visibleWindows, activeWindow, bringToFront])

  const handleAltF4 = useCallback(() => {
    if (activeWindow) {
      closeWindow(activeWindow)
      const path = activeWindow ? windowIdToPath(activeWindow) : null
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
      if (!isSyncingFromUrl.current) {
        syncUrlForFolder(folderId)
      }
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
        if (!isSyncingFromUrl.current) {
          syncUrlForPlayer()
        }
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
        if (!isSyncingFromUrl.current) {
          syncUrlForWindow(windowId)
        }
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
        if (!isSyncingFromUrl.current) {
          syncUrlForPlayer()
        }
        return
      }
      if (itemId.endsWith("-folder")) {
        const folderId = itemId.replace("-folder", "")
        handleOpenFolder(folderId)
      } else {
        toggleWindow(itemId)
        if (!isSyncingFromUrl.current) {
          syncUrlForWindow(itemId)
        }
      }
    },
    [toggleWindow, handleOpenFolder, syncUrlForWindow, syncUrlForPlayer],
  )

  const handleCloseWindow = useCallback(
    (windowId: string) => {
      closeWindow(windowId)
      if (!isSyncingFromUrl.current) {
        const path = windowIdToPath(windowId)
        if (path && pathname === path) {
          syncUrlHome()
        }
      }
    },
    [closeWindow, pathname, syncUrlHome],
  )

  useEffect(() => {
    const handleOpenContact = () => {
      toggleWindow("contact")
      if (!isSyncingFromUrl.current) {
        syncUrlForWindow("contact")
      }
    }
    window.addEventListener("openContactWindow", handleOpenContact)
    return () => window.removeEventListener("openContactWindow", handleOpenContact)
  }, [toggleWindow, syncUrlForWindow])

  if (isLoading) {
    return (
      <LoadingScreen
        onComplete={() => {
          setIsLoading(false)
          if (!deepLinkSection) {
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
              if (!isSyncingFromUrl.current) {
                syncUrlForPlayer()
              }
            } else {
              toggleWindow(itemId)
              if (!isSyncingFromUrl.current) {
                syncUrlForWindow(itemId)
              }
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
              if (!isSyncingFromUrl.current && pathname === getPathForSection("player")) {
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
