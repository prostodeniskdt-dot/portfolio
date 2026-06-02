"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { parsePathname } from "@/lib/routes"

interface WindowState {
  openWindows: string[]
  activeWindow: string | null
  minimizedWindows: string[]
  windowPositions: Record<string, { x: number; y: number }>
  windowSizes: Record<string, { width: number; height: number }>
}

const STORAGE_KEY = "barboss-window-state"

const defaultState: WindowState = {
  openWindows: ["about"],
  activeWindow: "about",
  minimizedWindows: [],
  windowPositions: {},
  windowSizes: {},
}

export interface WindowStateInitial {
  openWindows: string[]
  activeWindow: string | null
}

function areStringArraysEqual(left: string[], right: string[]): boolean {
  return left.length === right.length && left.every((item, index) => item === right[index])
}

function shouldUseLocalStorage(): boolean {
  if (typeof window === "undefined") return false
  return parsePathname(window.location.pathname) === null
}

function loadFromStorage(): WindowState | null {
  if (typeof window === "undefined") return null

  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      return { ...defaultState, ...JSON.parse(saved) }
    }
  } catch (error) {
    console.error("Failed to load window state from localStorage:", error)
  }
  return null
}

export function useWindowState(initial?: WindowStateInitial) {
  const persistRef = useRef(shouldUseLocalStorage())

  const [state, setState] = useState<WindowState>(() => {
    if (initial) {
      persistRef.current = false
      return {
        ...defaultState,
        openWindows: initial.openWindows,
        activeWindow: initial.activeWindow,
      }
    }

    if (typeof window === "undefined") {
      return defaultState
    }

    if (!shouldUseLocalStorage()) {
      persistRef.current = false
      return defaultState
    }

    return loadFromStorage() ?? defaultState
  })

  useEffect(() => {
    if (typeof window === "undefined" || !persistRef.current) return

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch (error) {
      console.error("Failed to save window state to localStorage:", error)
    }
  }, [state])

  const applyWindowState = useCallback((next: WindowStateInitial) => {
    persistRef.current = false
    setState((prev) => {
      const isSameState =
        areStringArraysEqual(prev.openWindows, next.openWindows) &&
        prev.activeWindow === next.activeWindow &&
        prev.minimizedWindows.length === 0

      if (isSameState) return prev

      return {
        ...prev,
        openWindows: next.openWindows,
        activeWindow: next.activeWindow,
        minimizedWindows: [],
      }
    })
  }, [])

  const setOpenWindows = useCallback((windows: string[]) => {
    setState((prev) => ({ ...prev, openWindows: windows }))
  }, [])

  const setActiveWindow = useCallback((windowId: string | null) => {
    setState((prev) => ({ ...prev, activeWindow: windowId }))
  }, [])

  const setMinimizedWindows = useCallback((windows: string[]) => {
    setState((prev) => ({ ...prev, minimizedWindows: windows }))
  }, [])

  const setWindowPosition = useCallback((windowId: string, position: { x: number; y: number }) => {
    setState((prev) => ({
      ...prev,
      windowPositions: { ...prev.windowPositions, [windowId]: position },
    }))
  }, [])

  const setWindowSize = useCallback((windowId: string, size: { width: number; height: number }) => {
    setState((prev) => ({
      ...prev,
      windowSizes: { ...prev.windowSizes, [windowId]: size },
    }))
  }, [])

  const openWindow = useCallback((windowId: string) => {
    setState((prev) => {
      if (prev.openWindows.includes(windowId)) {
        return {
          ...prev,
          activeWindow: windowId,
          minimizedWindows: prev.minimizedWindows.filter((w) => w !== windowId),
        }
      }
      return {
        ...prev,
        openWindows: [...prev.openWindows, windowId],
        activeWindow: windowId,
      }
    })
  }, [])

  const toggleWindow = useCallback((windowId: string) => {
    setState((prev) => {
      if (prev.openWindows.includes(windowId)) {
        if (prev.minimizedWindows.includes(windowId)) {
          return {
            ...prev,
            activeWindow: windowId,
            minimizedWindows: prev.minimizedWindows.filter((w) => w !== windowId),
          }
        }
        return { ...prev, activeWindow: windowId }
      }
      return {
        ...prev,
        openWindows: [...prev.openWindows, windowId],
        activeWindow: windowId,
      }
    })
  }, [])

  const closeWindow = useCallback((windowId: string) => {
    setState((prev) => {
      const remaining = prev.openWindows.filter((w) => w !== windowId)
      return {
        ...prev,
        openWindows: remaining,
        activeWindow: remaining.length > 0 ? remaining[remaining.length - 1] : null,
        minimizedWindows: prev.minimizedWindows.filter((w) => w !== windowId),
      }
    })
  }, [])

  const minimizeWindow = useCallback((windowId: string) => {
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
  }, [])

  const bringToFront = useCallback((windowId: string) => {
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
  }, [])

  return {
    ...state,
    applyWindowState,
    setOpenWindows,
    setActiveWindow,
    setMinimizedWindows,
    setWindowPosition,
    setWindowSize,
    openWindow,
    toggleWindow,
    closeWindow,
    minimizeWindow,
    bringToFront,
  }
}
