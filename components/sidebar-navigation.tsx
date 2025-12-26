"use client"

import { useState, useMemo } from "react"
import { getPixelIcon } from "@/components/icons/pixel-icons"
import { desktopIcons } from "@/lib/data"

interface SidebarNavigationProps {
  onItemClick: (itemId: string) => void
}

export function SidebarNavigation({ onItemClick }: SidebarNavigationProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  // Используем desktopIcons напрямую, чтобы избежать дублирования данных
  // Фильтруем только уникальные элементы по id
  const menuItems = useMemo(() => {
    const seen = new Set<string>()
    return desktopIcons.filter((item) => {
      if (seen.has(item.id)) {
        return false
      }
      seen.add(item.id)
      return true
    })
  }, [])

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

        const handleClick = () => {
          if (item.type === "folder") {
            const folderId = item.id.replace("-folder", "")
            onItemClick(folderId === "products" ? "products-folder" : item.id)
          } else {
            onItemClick(item.id)
          }
        }

        return (
          <button
            key={item.id}
            onClick={handleClick}
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
                  ? "drop-shadow(0 0 8px rgba(184, 134, 11, 0.8)) drop-shadow(0 0 12px rgba(184, 134, 11, 0.6))"
                  : "drop-shadow(0 0 4px rgba(184, 134, 11, 0.4))",
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
                    color: "#b8860b",
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
                    0 0 6px rgba(184, 134, 11, 0.8),
                    0 0 10px rgba(184, 134, 11, 0.6),
                    1px 1px 0px rgba(184, 134, 11, 0.9),
                    -1px -1px 0px rgba(184, 134, 11, 0.9)
                  `
                  : `
                    1px 1px 0px rgba(184, 134, 11, 0.5),
                    -1px -1px 0px rgba(184, 134, 11, 0.5)
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

