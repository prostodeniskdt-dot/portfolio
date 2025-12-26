"use client"

import { useState, useEffect, useRef } from "react"

interface MenuItem {
  label: string
  action: () => void
  icon?: string
}

interface DividerItem {
  divider: true
}

type MenuItemType = MenuItem | DividerItem

interface TopBarProps {
  onMenuStateChange?: (isOpen: boolean) => void
  onOpenWindow?: (windowId: string) => void
  onOpenFolder?: (folderId: string) => void
  onOpenProduct?: (productId: string) => void
  onExit?: () => void
}

export function TopBar({
  onMenuStateChange,
  onOpenWindow,
  onOpenFolder,
  onOpenProduct,
  onExit,
}: TopBarProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(null)
      }
    }

    if (openMenu) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [openMenu])

  const menuItems: Record<string, MenuItemType[]> = {
    Файл: [
      {
        label: "Новое окно",
        action: () => {
          onOpenWindow?.("contact")
          setOpenMenu(null)
          onMenuStateChange?.(false)
        },
        icon: "📂",
      },
      {
        label: "Открыть Продукты",
        action: () => {
          onOpenFolder?.("products")
          setOpenMenu(null)
          onMenuStateChange?.(false)
        },
        icon: "📁",
      },
      { divider: true },
      {
        label: "Выход",
        action: () => {
          onExit?.()
          setOpenMenu(null)
          onMenuStateChange?.(false)
        },
        icon: "🔌",
      },
    ],
  }

  const handleMenuClick = (menuName: string) => {
    const newState = openMenu === menuName ? null : menuName
    setOpenMenu(newState)
    onMenuStateChange?.(newState !== null)
  }

  // Экспортируем функцию закрытия для Escape handler
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape" && openMenu) {
          setOpenMenu(null)
          onMenuStateChange?.(false)
        }
      }
      window.addEventListener("keydown", handleEscape)
      return () => window.removeEventListener("keydown", handleEscape)
    }
  }, [openMenu, onMenuStateChange])

  return (
    <header className="h-10 bg-[#000000] flex items-center px-3 border-b-3 border-[#b8860b] animate-slide-up relative overflow-hidden">
      <div className="absolute inset-0 animate-shimmer opacity-20" />

      {/* Logo with glow animation */}
      <div className="flex items-center gap-2 relative z-10">
        <h1
          className="text-2xl md:text-3xl font-bold"
          style={{
            fontFamily: "Oswald, sans-serif",
            color: "#000000",
            textShadow: `
              0 0 10px rgba(184, 134, 11, 0.8),
              0 0 20px rgba(184, 134, 11, 0.6),
              0 0 30px rgba(184, 134, 11, 0.4),
              2px 2px 0px rgba(184, 134, 11, 0.9),
              -2px -2px 0px rgba(184, 134, 11, 0.9),
              2px -2px 0px rgba(184, 134, 11, 0.9),
              -2px 2px 0px rgba(184, 134, 11, 0.9)
            `,
            WebkitTextStroke: "1px rgba(184, 134, 11, 0.5)",
            animation: "glow-text 2s ease-in-out infinite",
            letterSpacing: "0.05em",
          }}
        >
          <span style={{ color: "#000000" }}>BAR</span>{" "}
          <span style={{ color: "#b8860b" }}>BOSS</span>{" "}
          <span style={{ color: "#000000" }}>ONLINE</span>
        </h1>
      </div>

      {/* Spacer */}
      <div className="flex-1" />
    </header>
  )
}
