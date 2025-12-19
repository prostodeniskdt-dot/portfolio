"use client"

import React, { memo, useMemo, useState, type ComponentType } from "react"
import dynamic from "next/dynamic"
import { OSWindow } from "./os-window"
import { windowConfigs, desktopIcons } from "@/lib/data"
import { soundManager } from "@/lib/sounds"

interface DesktopProps {
  openWindows: string[]
  activeWindow: string | null
  onClose: (windowId: string) => void
  onFocus: (windowId: string) => void
  onIconClick: (windowId: string) => void
  onMinimize: (windowId: string) => void
}

// Lazy load window components with optimized code splitting
const AboutWindow = dynamic(
  () => import("./windows/about-window").then((mod) => ({ default: mod.AboutWindow })),
  {
    ssr: false,
    loading: () => (
      <div className="p-4 flex items-center justify-center">
        <div className="animate-pulse text-xs text-black">Загрузка...</div>
      </div>
    ),
  },
)

const CoursesWindow = dynamic(
  () => import("./windows/courses-window").then((mod) => ({ default: mod.CoursesWindow })),
  {
    ssr: false,
    loading: () => (
      <div className="p-4 flex items-center justify-center">
        <div className="animate-pulse text-xs text-black">Загрузка...</div>
      </div>
    ),
  },
)

const PricesWindow = dynamic(
  () => import("./windows/prices-window").then((mod) => ({ default: mod.PricesWindow })),
  {
    ssr: false,
    loading: () => (
      <div className="p-4 flex items-center justify-center">
        <div className="animate-pulse text-xs text-black">Загрузка...</div>
      </div>
    ),
  },
)

const ContactWindow = dynamic(
  () => import("./windows/contact-window").then((mod) => ({ default: mod.ContactWindow })),
  {
    ssr: false,
    loading: () => (
      <div className="p-4 flex items-center justify-center">
        <div className="animate-pulse text-xs text-black">Загрузка...</div>
      </div>
    ),
  },
)

const SettingsWindow = dynamic(
  () => import("./windows/settings-window").then((mod) => ({ default: mod.SettingsWindow })),
  {
    ssr: false,
    loading: () => (
      <div className="p-4 flex items-center justify-center">
        <div className="animate-pulse text-xs text-black">Загрузка...</div>
      </div>
    ),
  },
)

// Map window IDs to lazy-loaded components
const windowComponents: Record<string, ComponentType> = {
  about: AboutWindow,
  courses: CoursesWindow,
  prices: PricesWindow,
  contact: ContactWindow,
  settings: SettingsWindow,
}

export const Desktop = memo(function Desktop({
  openWindows,
  activeWindow,
  onClose,
  onFocus,
  onIconClick,
  onMinimize,
}: DesktopProps) {
  const [isDragging, setIsDragging] = useState(false)
  const memoizedIcons = useMemo(
    () =>
      desktopIcons.map((item, index) => (
        <button
          key={item.id}
          onClick={() => {
            soundManager.playClick()
            onIconClick(item.id)
          }}
          onDoubleClick={() => {
            soundManager.playWindowOpen()
            onIconClick(item.id)
          }}
          aria-label={`Открыть ${item.label}`}
          className="flex flex-col items-center gap-1 p-2 cursor-pointer hover:bg-[#f8cf2c]/20 group w-20 select-none animate-slide-up hover-lift"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <span
            className="text-4xl drop-shadow-lg group-hover:animate-float transition-transform"
            aria-hidden="true"
          >
            {item.icon}
          </span>
          <span className="text-xs text-[#f8cf2c] text-center font-bold drop-shadow-[1px_1px_0_#000] group-hover:bg-[#f8cf2c] group-hover:text-black px-2 py-0.5 transition-colors duration-200">
            {item.label}
          </span>
        </button>
      )),
    [onIconClick],
  )

  const memoizedWindows = useMemo(
    () =>
      openWindows.map((windowId, index) => {
        const config = windowConfigs[windowId]
        if (!config) return null

        const Component = windowComponents[windowId]
        if (!Component) return null

        return (
          <OSWindow
            key={windowId}
            title={config.title}
            defaultPosition={config.defaultPosition}
            defaultSize={config.defaultSize}
            isActive={activeWindow === windowId}
            zIndex={activeWindow === windowId ? 50 : 10 + index}
            onClose={() => onClose(windowId)}
            onFocus={() => onFocus(windowId)}
            onMinimize={() => onMinimize(windowId)}
            icon={config.icon}
          >
            <Component />
          </OSWindow>
        )
      }),
    [openWindows, activeWindow, onClose, onFocus, onMinimize],
  )

      const handleDragEnter = (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.dataTransfer.types.includes("Files")) {
          setIsDragging(true)
          const indicator = document.getElementById("drop-zone-indicator")
          if (indicator) {
            indicator.style.opacity = "1"
          }
        }
      }

      const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault()
        e.stopPropagation()
      }

      const handleDragLeave = (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault()
        e.stopPropagation()
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setIsDragging(false)
          const indicator = document.getElementById("drop-zone-indicator")
          if (indicator) {
            indicator.style.opacity = "0"
          }
        }
      }

      const handleDrop = (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
        const indicator = document.getElementById("drop-zone-indicator")
        if (indicator) {
          indicator.style.opacity = "0"
        }

        const files = Array.from(e.dataTransfer.files)
        if (files.length > 0) {
          soundManager.playClick()
          // Можно добавить обработку файлов
          console.log("Dropped files:", files)
          // Здесь можно добавить логику обработки файлов
        }
      }

      return (
        <main
          className="relative flex-1"
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{
            background: "transparent",
          }}
        >
          {/* Desktop icons - hidden on mobile, shown on desktop */}
          <div className="absolute bottom-16 left-4 flex flex-col-reverse gap-4 hidden md:flex">{memoizedIcons}</div>

          {/* Drop zone indicator */}
          <div
            className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-200"
            style={{
              background: "rgba(248, 207, 44, 0.1)",
              border: "3px dashed #f8cf2c",
            }}
            id="drop-zone-indicator"
          />

          {/* Windows */}
          {memoizedWindows}
        </main>
      )
})
