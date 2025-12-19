"use client"

import { useState } from "react"
import { TopBar } from "@/components/top-bar"
import { Desktop } from "@/components/desktop"
import { Taskbar } from "@/components/taskbar"
import { RetroBackground } from "@/components/retro-background"

export default function Home() {
  const [activeWindow, setActiveWindow] = useState<string | null>("about")
  const [openWindows, setOpenWindows] = useState<string[]>(["about", "courses", "prices"])
  const [minimizedWindows, setMinimizedWindows] = useState<string[]>([])

  const toggleWindow = (windowId: string) => {
    if (openWindows.includes(windowId)) {
      if (minimizedWindows.includes(windowId)) {
        setMinimizedWindows(minimizedWindows.filter((w) => w !== windowId))
      }
      setActiveWindow(windowId)
    } else {
      setOpenWindows([...openWindows, windowId])
      setActiveWindow(windowId)
    }
  }

  const closeWindow = (windowId: string) => {
    setOpenWindows(openWindows.filter((w) => w !== windowId))
    setMinimizedWindows(minimizedWindows.filter((w) => w !== windowId))
    if (activeWindow === windowId) {
      const remaining = openWindows.filter((w) => w !== windowId)
      setActiveWindow(remaining[0] || null)
    }
  }

  const bringToFront = (windowId: string) => {
    if (minimizedWindows.includes(windowId)) {
      setMinimizedWindows(minimizedWindows.filter((w) => w !== windowId))
    }
    setActiveWindow(windowId)
  }

  const minimizeWindow = (windowId: string) => {
    setMinimizedWindows([...minimizedWindows, windowId])
    if (activeWindow === windowId) {
      const visibleWindows = openWindows.filter((w) => w !== windowId && !minimizedWindows.includes(w))
      setActiveWindow(visibleWindows[0] || null)
    }
  }

  const visibleWindows = openWindows.filter((w) => !minimizedWindows.includes(w))

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <RetroBackground />
      <div className="relative z-10 flex h-full flex-col">
        <TopBar />
        <Desktop
          openWindows={visibleWindows}
          activeWindow={activeWindow}
          onClose={closeWindow}
          onFocus={bringToFront}
          onIconClick={toggleWindow}
          onMinimize={minimizeWindow}
        />
        <Taskbar onItemClick={toggleWindow} openWindows={openWindows} minimizedWindows={minimizedWindows} />
      </div>
    </div>
  )
}
