"use client"

import type React from "react"
import { OSWindow } from "./os-window"
import { AboutWindow } from "./windows/about-window"
import { CoursesWindow } from "./windows/courses-window"
import { PricesWindow } from "./windows/prices-window"
import { ContactWindow } from "./windows/contact-window"

interface DesktopProps {
  openWindows: string[]
  activeWindow: string | null
  onClose: (windowId: string) => void
  onFocus: (windowId: string) => void
  onIconClick: (windowId: string) => void
  onMinimize: (windowId: string) => void
}

const windowConfigs: Record<
  string,
  {
    title: string
    defaultPosition: { x: number; y: number }
    defaultSize: { width: number; height: number }
    component: React.ComponentType
    icon: string
  }
> = {
  about: {
    title: "О школе BARBOSS",
    defaultPosition: { x: 40, y: 40 },
    defaultSize: { width: 380, height: 400 },
    component: AboutWindow,
    icon: "🎓",
  },
  courses: {
    title: "Наши курсы",
    defaultPosition: { x: 460, y: 60 },
    defaultSize: { width: 500, height: 380 },
    component: CoursesWindow,
    icon: "📚",
  },
  prices: {
    title: "Тарифы и цены",
    defaultPosition: { x: 80, y: 420 },
    defaultSize: { width: 360, height: 320 },
    component: PricesWindow,
    icon: "💰",
  },
  contact: {
    title: "Связаться с нами",
    defaultPosition: { x: 520, y: 380 },
    defaultSize: { width: 360, height: 320 },
    component: ContactWindow,
    icon: "📞",
  },
}

const desktopIcons = [
  { id: "about", icon: "🎓", label: "О школе" },
  { id: "courses", icon: "📚", label: "Курсы" },
  { id: "prices", icon: "💰", label: "Тарифы" },
  { id: "contact", icon: "📞", label: "Контакты" },
]

export function Desktop({ openWindows, activeWindow, onClose, onFocus, onIconClick, onMinimize }: DesktopProps) {
  return (
    <main className="relative flex-1">
      <div className="absolute bottom-16 left-4 flex flex-col-reverse gap-4">
        {desktopIcons.map((item, index) => (
          <div
            key={item.id}
            onClick={() => onIconClick(item.id)}
            onDoubleClick={() => onIconClick(item.id)}
            className="flex flex-col items-center gap-1 p-2 cursor-pointer hover:bg-[#f8cf2c]/20 group w-20 select-none animate-slide-up hover-lift"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <span className="text-4xl drop-shadow-lg group-hover:animate-float transition-transform">{item.icon}</span>
            <span className="text-xs text-[#f8cf2c] text-center font-bold drop-shadow-[1px_1px_0_#000] group-hover:bg-[#f8cf2c] group-hover:text-black px-2 py-0.5 transition-colors duration-200">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Windows */}
      {openWindows.map((windowId, index) => {
        const config = windowConfigs[windowId]
        if (!config) return null

        const Component = config.component

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
      })}
    </main>
  )
}
