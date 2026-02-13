"use client"

import { useMemo } from "react"
import { OSWindow } from "./os-window"
import { windowConfigs } from "@/lib/data"
import { windowComponents, FolderWindowDynamic, ProductWindowDynamic } from "./window-registry"

interface WindowRendererProps {
  openWindows: string[]
  activeWindow: string | null
  onClose: (windowId: string) => void
  onFocus: (windowId: string) => void
  onMinimize: (windowId: string) => void
  onProductClick?: (productId: string) => void
  /** Mobile mode: forces fullscreen position/size */
  isMobile?: boolean
}

/**
 * Shared window rendering logic for both Desktop and Mobile modes.
 * Handles folder, product, and regular windows with proper z-index layering.
 */
export function useWindowRenderer({
  openWindows,
  activeWindow,
  onClose,
  onFocus,
  onMinimize,
  onProductClick,
  isMobile = false,
}: WindowRendererProps) {
  return useMemo(() => {
    // Classify windows by type for z-index layering
    const folderWindows: string[] = []
    const productWindows: string[] = []
    const otherWindows: string[] = []

    openWindows.forEach((windowId) => {
      if (windowId.endsWith("-folder")) {
        folderWindows.push(windowId)
      } else if (windowId.startsWith("product-")) {
        productWindows.push(windowId)
      } else {
        otherWindows.push(windowId)
      }
    })

    // Screen dimensions for mobile fullscreen
    const screenWidth = typeof window !== "undefined" ? window.innerWidth : 800
    const screenHeight = typeof window !== "undefined" ? window.innerHeight : 600

    return openWindows.map((windowId) => {
      const config = windowConfigs[windowId]
      if (!config) return null

      // Skip standalone player
      if (windowId === "player") return null

      const defaultPos = isMobile ? { x: 0, y: 0 } : config.defaultPosition
      const defaultSize = isMobile
        ? { width: screenWidth, height: screenHeight }
        : config.defaultSize

      // Folder windows
      if (windowId.endsWith("-folder")) {
        const folderId = windowId.replace("-folder", "")
        const folderIndex = folderWindows.indexOf(windowId)
        const zIndex =
          activeWindow === windowId
            ? 100
            : Math.max(10, 49 - (folderWindows.length - folderIndex - 1))

        return (
          <OSWindow
            key={windowId}
            title={config.title}
            defaultPosition={defaultPos}
            defaultSize={defaultSize}
            isActive={activeWindow === windowId}
            zIndex={zIndex}
            onClose={() => onClose(windowId)}
            onFocus={() => onFocus(windowId)}
            onMinimize={() => onMinimize(windowId)}
            icon={config.icon}
            isFolder={true}
          >
            <FolderWindowDynamic
              folderId={folderId}
              onOpenProduct={(productId: string) => onProductClick?.(productId)}
            />
          </OSWindow>
        )
      }

      // Product windows
      if (windowId.startsWith("product-")) {
        const productId = windowId.replace("product-", "")
        const productIndex = productWindows.indexOf(windowId)
        const zIndex =
          activeWindow === windowId
            ? 100
            : Math.max(50, 99 - (productWindows.length - productIndex - 1))

        const isAdvertisingProduct = productId.startsWith("placements-")
        const windowTitle = isAdvertisingProduct ? "Реклама на площадке" : config.title

        return (
          <OSWindow
            key={windowId}
            title={windowTitle}
            defaultPosition={defaultPos}
            defaultSize={defaultSize}
            isActive={activeWindow === windowId}
            zIndex={zIndex}
            onClose={() => onClose(windowId)}
            onFocus={() => onFocus(windowId)}
            onMinimize={() => onMinimize(windowId)}
            icon={config.icon}
          >
            <ProductWindowDynamic productId={productId} />
          </OSWindow>
        )
      }

      // Regular windows
      const Component = windowComponents[windowId]
      if (!Component) return null

      const otherIndex = otherWindows.indexOf(windowId)
      const zIndex =
        activeWindow === windowId
          ? 100
          : Math.max(10, 99 - (otherWindows.length - otherIndex - 1))

      return (
        <OSWindow
          key={windowId}
          title={config.title}
          defaultPosition={defaultPos}
          defaultSize={defaultSize}
          isActive={activeWindow === windowId}
          zIndex={zIndex}
          onClose={() => onClose(windowId)}
          onFocus={() => onFocus(windowId)}
          onMinimize={() => onMinimize(windowId)}
          icon={config.icon}
        >
          <Component />
        </OSWindow>
      )
    })
  }, [openWindows, activeWindow, onClose, onFocus, onMinimize, onProductClick, isMobile])
}
