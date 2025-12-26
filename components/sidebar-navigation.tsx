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

  // Разделяем элементы на две колонки: окна в первой, папки во второй
  const windows = menuItems.filter(item => item.type !== "folder")
  const folders = menuItems.filter(item => item.type === "folder")

  return (
    <div className="absolute left-4 top-20 z-20 flex gap-8" style={{ fontFamily: "Oswald, sans-serif" }}>
      {/* Первая колонка - окна */}
      <nav className="flex flex-col gap-6">
        {windows.map((item) => {
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
            {/* Иконка с контрастным фоном */}
            <div
              className="transition-all duration-200 flex items-center justify-center"
              style={{
                width: '44px',
                height: '44px',
                background: isHovered ? '#e8e3d4' : '#f5f0e1',
                border: '3px solid #000',
                borderRadius: '4px',
                boxShadow: isHovered
                  ? '0 0 12px rgba(0, 0, 0, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.3), inset 0 -2px 4px rgba(0, 0, 0, 0.2)'
                  : '0 4px 8px rgba(0, 0, 0, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.2), inset 0 -1px 2px rgba(0, 0, 0, 0.3)',
                transform: isHovered ? "scale(1.1)" : "scale(1)",
              }}
            >
              <div
                className="transition-all duration-200"
                style={{
                  filter: isHovered
                    ? "drop-shadow(0 0 6px rgba(0, 0, 0, 0.8))"
                    : "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.6))",
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
                      color: "#000",
                    }}
                  >
                    {item.icon}
                  </div>
                )}
              </div>
            </div>

            {/* Текст с улучшенной читаемостью */}
            <span
              className="text-xs font-bold text-center transition-all duration-200 px-1.5 py-0.5 rounded"
              style={{
                color: "#b8860b",
                background: isHovered ? 'rgba(184, 134, 11, 0.2)' : 'rgba(0, 0, 0, 0.6)',
                border: '1px solid rgba(184, 134, 11, 0.4)',
                textShadow: isHovered
                  ? `
                    0 0 8px rgba(184, 134, 11, 1),
                    0 0 12px rgba(184, 134, 11, 0.8),
                    2px 2px 0px rgba(0, 0, 0, 0.9),
                    -1px -1px 0px rgba(0, 0, 0, 0.9)
                  `
                  : `
                    0 0 4px rgba(184, 134, 11, 0.8),
                    1px 1px 0px rgba(0, 0, 0, 0.9),
                    -1px -1px 0px rgba(0, 0, 0, 0.9)
                  `,
                transform: isHovered ? "scale(1.05)" : "scale(1)",
                maxWidth: item.label.length > 15 ? "110px" : "80px",
                lineHeight: "1.2",
                wordBreak: "break-word",
                overflowWrap: "break-word",
                display: "inline-block",
              }}
            >
              {item.label}
            </span>
          </button>
        )
      })}
      </nav>
      
      {/* Вторая колонка - папки */}
      <nav className="flex flex-col gap-6">
        {folders.map((item) => {
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
              {/* Иконка с контрастным фоном */}
              <div
                className="transition-all duration-200 flex items-center justify-center"
                style={{
                  width: '44px',
                  height: '44px',
                  background: isHovered ? '#e8e3d4' : '#f5f0e1',
                  border: '3px solid #000',
                  borderRadius: '4px',
                  boxShadow: isHovered
                    ? '0 0 12px rgba(0, 0, 0, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.3), inset 0 -2px 4px rgba(0, 0, 0, 0.2)'
                    : '0 4px 8px rgba(0, 0, 0, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.2), inset 0 -1px 2px rgba(0, 0, 0, 0.3)',
                  transform: isHovered ? "scale(1.1)" : "scale(1)",
                }}
              >
                <div
                  className="transition-all duration-200"
                  style={{
                    filter: isHovered
                      ? "drop-shadow(0 0 6px rgba(0, 0, 0, 0.8))"
                      : "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.6))",
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
                        color: "#000",
                      }}
                    >
                      {item.icon}
                    </div>
                  )}
                </div>
              </div>

              {/* Текст с улучшенной читаемостью */}
              <span
                className="text-xs font-bold text-center transition-all duration-200 px-1.5 py-0.5 rounded"
                style={{
                  color: "#b8860b",
                  background: isHovered ? 'rgba(184, 134, 11, 0.2)' : 'rgba(0, 0, 0, 0.6)',
                  border: '1px solid rgba(184, 134, 11, 0.4)',
                  textShadow: isHovered
                    ? `
                      0 0 8px rgba(184, 134, 11, 1),
                      0 0 12px rgba(184, 134, 11, 0.8),
                      2px 2px 0px rgba(0, 0, 0, 0.9),
                      -1px -1px 0px rgba(0, 0, 0, 0.9)
                    `
                    : `
                      0 0 4px rgba(184, 134, 11, 0.8),
                      1px 1px 0px rgba(0, 0, 0, 0.9),
                      -1px -1px 0px rgba(0, 0, 0, 0.9)
                    `,
                  transform: isHovered ? "scale(1.05)" : "scale(1)",
                  maxWidth: item.label.length > 15 ? "110px" : "80px",
                  lineHeight: "1.2",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  display: "inline-block",
                }}
              >
                {item.label}
              </span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}

