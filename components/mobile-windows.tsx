"use client"

import { Suspense, useMemo } from "react"
import { WindowSkeleton } from "@/components/window-skeleton"
import { useWindowRenderer } from "./window-renderer"

interface MobileWindowsProps {
  openWindows: string[]
  activeWindow: string | null
  minimizedWindows: string[]
  onClose: (windowId: string) => void
  onFocus: (windowId: string) => void
  onMinimize: (windowId: string) => void
  onProductClick?: (productId: string) => void
}

export function MobileWindows({
  openWindows,
  activeWindow,
  minimizedWindows,
  onClose,
  onFocus,
  onMinimize,
  onProductClick,
}: MobileWindowsProps) {
  // Filter to only visible (non-minimized) windows
  const visibleWindows = useMemo(
    () => openWindows.filter((w: string) => !minimizedWindows.includes(w)),
    [openWindows, minimizedWindows],
  )

  const memoizedWindows = useWindowRenderer({
    openWindows: visibleWindows,
    activeWindow,
    onClose,
    onFocus,
    onMinimize,
    onProductClick,
    isMobile: true,
  })

  return (
    <Suspense fallback={<WindowSkeleton />}>
      {memoizedWindows}
    </Suspense>
  )
}
