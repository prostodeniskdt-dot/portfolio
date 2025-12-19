"use client"

import { useState, useEffect } from "react"

interface WindowState {
  openWindows: string[]
  activeWindow: string | null
  minimizedWindows: string[]
  windowPositions: Record<string, { x: number; y: number }>
  windowSizes: Record<string, { width: number; height: number }>
}

const STORAGE_KEY = "barboss-window-state"

const defaultState: WindowState = {
  openWindows: ["about", "individual-courses", "prices"],
  activeWindow: "about",
  minimizedWindows: [],
  windowPositions: {},
  windowSizes: {},
}

export function useWindowState() {
  const [state, setState] = useState<WindowState>(() => {
    if (typeof window === "undefined") {
      return defaultState
    }

    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        return { ...defaultState, ...JSON.parse(saved) }
      }
    } catch (error) {
      console.error("Failed to load window state from localStorage:", error)
    }

    return defaultState
  })

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (typeof window === "undefined") return

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch (error) {
      console.error("Failed to save window state to localStorage:", error)
    }
  }, [state])

  const setOpenWindows = (windows: string[]) => {
    setState((prev) => ({ ...prev, openWindows: windows }))
  }

  const setActiveWindow = (windowId: string | null) => {
    setState((prev) => ({ ...prev, activeWindow: windowId }))
  }

  const setMinimizedWindows = (windows: string[]) => {
    setState((prev) => ({ ...prev, minimizedWindows: windows }))
  }

  const setWindowPosition = (windowId: string, position: { x: number; y: number }) => {
    setState((prev) => ({
      ...prev,
      windowPositions: { ...prev.windowPositions, [windowId]: position },
    }))
  }

  const setWindowSize = (windowId: string, size: { width: number; height: number }) => {
    setState((prev) => ({
      ...prev,
      windowSizes: { ...prev.windowSizes, [windowId]: size },
    }))
  }

  const toggleWindow = (windowId: string) => {
    setState((prev) => {
      if (prev.openWindows.includes(windowId)) {
        // Window is open, activate it
        if (prev.minimizedWindows.includes(windowId)) {
          // Unminimize
          return {
            ...prev,
            activeWindow: windowId,
            minimizedWindows: prev.minimizedWindows.filter((w) => w !== windowId),
          }
        }
        return { ...prev, activeWindow: windowId }
      } else {
        // Open new window
        return {
          ...prev,
          openWindows: [...prev.openWindows, windowId],
          activeWindow: windowId,
        }
      }
    })
  }

  const closeWindow = (windowId: string) => {
    setState((prev) => {
      const remaining = prev.openWindows.filter((w) => w !== windowId)
      return {
        ...prev,
        openWindows: remaining,
        activeWindow: remaining[0] || null,
        minimizedWindows: prev.minimizedWindows.filter((w) => w !== windowId),
      }
    })
  }

  const minimizeWindow = (windowId: string) => {
    setState((prev) => {
      const visibleWindows = prev.openWindows.filter(
        (w) => w !== windowId && !prev.minimizedWindows.includes(w),
      )
      return {
        ...prev,
        minimizedWindows: [...prev.minimizedWindows, windowId],
        activeWindow: visibleWindows[0] || null,
      }
    })
  }

  const bringToFront = (windowId: string) => {
    setState((prev) => {
      if (prev.minimizedWindows.includes(windowId)) {
        return {
          ...prev,
          minimizedWindows: prev.minimizedWindows.filter((w) => w !== windowId),
          activeWindow: windowId,
        }
      }
      return { ...prev, activeWindow: windowId }
    })
  }

  return {
    ...state,
    setOpenWindows,
    setActiveWindow,
    setMinimizedWindows,
    setWindowPosition,
    setWindowSize,
    toggleWindow,
    closeWindow,
    minimizeWindow,
    bringToFront,
  }
}


