"use client"

import { useState } from "react"
import { getPixelIcon } from "@/components/icons/pixel-icons"

interface SidebarItem {
  id: string
  label: string
  icon: string
  onClick: () => void
}

interface SidebarNavigationProps {
  onItemClick: (itemId: string) => void
}

export function SidebarNavigation({ onItemClick }: SidebarNavigationProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const menuItems: SidebarItem[] = [
    {
      id: "settings",
      label: "Настройки",
      icon: "settings",
      onClick: () => onItemClick("settings"),
    },
    {
      id: "contact",
      label: "Контакты",
      icon: "contact",
      onClick: () => onItemClick("contact"),
    },
    {
      id: "prices",
      label: "Тарифы",
      icon: "prices",
      onClick: () => onItemClick("prices"),
    },
    {
      id: "individual-courses",
      label: "Индивидуальные курсы",
      icon: "individual-courses",
      onClick: () => onItemClick("individual-courses"),
    },
    {
      id: "about",
      label: "О школе",
      icon: "about",
      onClick: () => onItemClick("about"),
    },
    {
      id: "products-folder",
      label: "Продукты",
      icon: "products-folder",
      onClick: () => onItemClick("products-folder"),
    },
  ]

  return (
    <nav
      className="absolute left-4 top-20 z-20 flex flex-col gap-6"
      style={{
        fontFamily: "Oswald, sans-serif",
      }}
    >
      {menuItems.map((item) => {
        const IconComponent = getPixelIcon(item.icon)
        const isHovered = hoveredItem === item.id

        return (
          <button
            key={item.id}
            onClick={item.onClick}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            className="flex flex-col items-center gap-2 p-3 transition-all duration-200 group"
            style={{
              cursor: "pointer",
            }}
            aria-label={item.label}
          >
            {/* Иконка */}
            <div
              className="transition-all duration-200"
              style={{
                transform: isHovered ? "scale(1.1)" : "scale(1)",
                filter: isHovered
                  ? "drop-shadow(0 0 8px rgba(248, 207, 44, 0.8)) drop-shadow(0 0 12px rgba(248, 207, 44, 0.6))"
                  : "drop-shadow(0 0 4px rgba(248, 207, 44, 0.4))",
              }}
            >
              {IconComponent ? (
                <IconComponent
                  size={32}
                  className="transition-all duration-200"
                />
              ) : (
                <div
                  className="w-8 h-8 flex items-center justify-center text-2xl transition-all duration-200"
                  style={{
                    color: "#f8cf2c",
                  }}
                >
                  {item.icon}
                </div>
              )}
            </div>

            {/* Текст */}
            <span
              className="text-xs font-bold text-center transition-all duration-200"
              style={{
                color: "#000000",
                textShadow: isHovered
                  ? `
                    0 0 6px rgba(248, 207, 44, 0.8),
                    0 0 10px rgba(248, 207, 44, 0.6),
                    1px 1px 0px rgba(248, 207, 44, 0.9),
                    -1px -1px 0px rgba(248, 207, 44, 0.9)
                  `
                  : `
                    1px 1px 0px rgba(248, 207, 44, 0.5),
                    -1px -1px 0px rgba(248, 207, 44, 0.5)
                  `,
                transform: isHovered ? "scale(1.05)" : "scale(1)",
                maxWidth: "80px",
                lineHeight: "1.2",
              }}
            >
              {item.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}

