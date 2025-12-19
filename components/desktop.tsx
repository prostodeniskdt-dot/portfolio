"use client"

import { memo, useMemo, type ComponentType } from "react"
import dynamic from "next/dynamic"
import { OSWindow } from "./os-window"
import { windowConfigs, desktopIcons } from "@/lib/data"

interface DesktopProps {
  openWindows: string[]
  activeWindow: string | null
  onClose: (windowId: string) => void
  onFocus: (windowId: string) => void
  onIconClick: (windowId: string) => void
  onMinimize: (windowId: string) => void
}

// Lazy load window components
const AboutWindow = dynamic(() => import("./windows/about-window").then((mod) => ({ default: mod.AboutWindow })), {
  loading: () => <div className="p-4">Загрузка...</div>,
})

const CoursesWindow = dynamic(
  () => import("./windows/courses-window").then((mod) => ({ default: mod.CoursesWindow })),
  {
    loading: () => <div className="p-4">Загрузка...</div>,
  },
)

const PricesWindow = dynamic(() => import("./windows/prices-window").then((mod) => ({ default: mod.PricesWindow })), {
  loading: () => <div className="p-4">Загрузка...</div>,
})

const ContactWindow = dynamic(
  () => import("./windows/contact-window").then((mod) => ({ default: mod.ContactWindow })),
  {
    loading: () => <div className="p-4">Загрузка...</div>,
  },
)

// Map window IDs to lazy-loaded components
const windowComponents: Record<string, ComponentType> = {
  about: AboutWindow,
  courses: CoursesWindow,
  prices: PricesWindow,
  contact: ContactWindow,
}

export const Desktop = memo(function Desktop({
  openWindows,
  activeWindow,
  onClose,
  onFocus,
  onIconClick,
  onMinimize,
}: DesktopProps) {
  const memoizedIcons = useMemo(
    () =>
      desktopIcons.map((item, index) => (
        <button
          key={item.id}
          onClick={() => onIconClick(item.id)}
          onDoubleClick={() => onIconClick(item.id)}
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

  return (
    <main className="relative flex-1">
      {/* Desktop icons - hidden on mobile, shown on desktop */}
      <div className="absolute bottom-16 left-4 flex flex-col-reverse gap-4 hidden md:flex">{memoizedIcons}</div>

      {/* Windows */}
      {memoizedWindows}
    </main>
  )
})
