import { describe, it, expect, beforeEach, vi } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { useWindowState } from "@/hooks/use-window-state"

describe("useWindowState", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it("should initialize with default state", () => {
    const { result } = renderHook(() => useWindowState())

    expect(result.current.openWindows).toEqual(["about", "courses", "prices"])
    expect(result.current.activeWindow).toBe("about")
    expect(result.current.minimizedWindows).toEqual([])
  })

  it("should toggle window", () => {
    const { result } = renderHook(() => useWindowState())

    act(() => {
      result.current.toggleWindow("contact")
    })

    expect(result.current.openWindows).toContain("contact")
    expect(result.current.activeWindow).toBe("contact")
  })

  it("should close window", () => {
    const { result } = renderHook(() => useWindowState())

    act(() => {
      result.current.closeWindow("about")
    })

    expect(result.current.openWindows).not.toContain("about")
  })

  it("should minimize window", () => {
    const { result } = renderHook(() => useWindowState())

    act(() => {
      result.current.minimizeWindow("about")
    })

    expect(result.current.minimizedWindows).toContain("about")
  })

  it("should bring window to front", () => {
    const { result } = renderHook(() => useWindowState())

    act(() => {
      result.current.bringToFront("courses")
    })

    expect(result.current.activeWindow).toBe("courses")
  })
})

