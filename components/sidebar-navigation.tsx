"use client"

import { useState, useMemo } from "react"
import { getPixelIcon } from "@/components/icons/pixel-icons"
import { desktopIcons } from "@/lib/data"

interface SidebarNavigationProps {
  onItemClick: (itemId: string) => void
  onShowDeleteWarning?: () => void
}

export function SidebarNavigation({ onItemClick, onShowDeleteWarning }: SidebarNavigationProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [draggedItem, setDraggedItem] = useState<string | null>(null)
  const [dragOverTrash, setDragOverTrash] = useState(false)

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
  const windows = menuItems.filter(item => item.type !== "folder" && item.type !== "trash")
  const folders = menuItems.filter(item => item.type === "folder")
  const trash = menuItems.find(item => item.type === "trash")

  return (
    <div 
      className="absolute left-0 top-0 h-full z-20 flex"
      style={{ fontFamily: "Oswald, sans-serif" }}
    >
      {/* Вертикальная черная полоска с логотипом */}
      <div 
        className="flex flex-col items-center justify-between py-6 px-4"
        style={{
          width: '280px',
          background: '#000000',
          borderRight: '3px solid #FFD700',
          boxShadow: '4px 0 20px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Логотип BAR BOSS ONLINE - горизонтально в три строки */}
        <div 
          className="flex flex-col items-center gap-1 mb-8"
          style={{
            textAlign: 'center',
          }}
        >
          <h1
            className="text-3xl font-bold"
            style={{
              fontFamily: "Oswald, sans-serif",
              color: "#000000",
              textShadow: `
                0 0 10px rgba(255, 215, 0, 0.8),
                0 0 20px rgba(255, 215, 0, 0.6),
                0 0 30px rgba(255, 215, 0, 0.4),
                2px 2px 0px rgba(255, 215, 0, 0.9),
                -2px -2px 0px rgba(255, 215, 0, 0.9),
                2px -2px 0px rgba(255, 215, 0, 0.9),
                -2px 2px 0px rgba(255, 215, 0, 0.9)
              `,
              WebkitTextStroke: "1px rgba(255, 215, 0, 0.5)",
              animation: "glow-text 2s ease-in-out infinite",
              letterSpacing: "0.05em",
            }}
          >
            <div style={{ color: "#000000" }}>BAR</div>
            <div style={{ color: "#FFD700" }}>BOSS</div>
            <div style={{ color: "#000000" }}>ONLINE</div>
          </h1>
        </div>

        {/* Иконки - две колонки */}
        <div className="flex-1 flex gap-4 items-start justify-center w-full px-3 overflow-y-auto">
          {/* Первая колонка - окна */}
          <nav className="flex flex-col gap-6 items-center">
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

              const handleDragStart = (e: React.DragEvent) => {
                if (item.type === "trash" || item.type === "action") return
                setDraggedItem(item.id)
                e.dataTransfer.effectAllowed = "move"
                e.dataTransfer.setData("text/plain", item.id)
              }

              const handleDragEnd = () => {
                setDraggedItem(null)
                setDragOverTrash(false)
              }

              return (
                <button
                  key={item.id}
                  onClick={handleClick}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  draggable={item.type !== "trash" && item.type !== "action"}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  className="flex flex-col items-center gap-2 p-3 transition-all duration-200 group"
                  style={{
                    cursor: item.type !== "trash" && item.type !== "action" ? "grab" : "pointer",
                    width: '110px',
                    minHeight: '100px',
                    opacity: draggedItem === item.id ? 0.5 : 1,
                  }}
                  aria-label={item.label}
                >
                  {/* Иконка с контрастным фоном */}
                  <div
                    className="transition-all duration-200 flex items-center justify-center"
                    style={{
                      width: '44px',
                      height: '44px',
                      background: isHovered ? '#FFED4E' : '#FFFFFF',
                      border: '3px solid #FFD700',
                      borderRadius: '4px',
                      boxShadow: isHovered
                        ? '0 0 20px rgba(255, 215, 0, 0.8), 0 0 30px rgba(255, 215, 0, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.4), inset 0 -2px 4px rgba(0, 0, 0, 0.2)'
                        : '0 4px 12px rgba(255, 215, 0, 0.4), 0 0 8px rgba(255, 215, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.3), inset 0 -1px 2px rgba(0, 0, 0, 0.1)',
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
                      color: "#FFD700",
                      background: isHovered ? 'rgba(255, 215, 0, 0.2)' : 'transparent',
                      border: '1px solid rgba(255, 215, 0, 0.4)',
                      textShadow: isHovered
                        ? `
                          0 0 8px rgba(255, 215, 0, 1),
                          0 0 12px rgba(255, 215, 0, 0.8),
                          2px 2px 0px rgba(0, 0, 0, 0.9),
                          -1px -1px 0px rgba(0, 0, 0, 0.9)
                        `
                        : `
                          0 0 4px rgba(255, 215, 0, 0.8),
                          1px 1px 0px rgba(0, 0, 0, 0.9),
                          -1px -1px 0px rgba(0, 0, 0, 0.9)
                        `,
                      transform: isHovered ? "scale(1.05)" : "scale(1)",
                      width: '110px',
                      minHeight: '32px',
                      lineHeight: "1.2",
                      wordBreak: "break-word",
                      overflowWrap: "break-word",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.label}
                  </span>
                </button>
              )
            })}
          </nav>
          
          {/* Вторая колонка - папки */}
          <nav className="flex flex-col gap-6 items-center">
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

              const handleDragStart = (e: React.DragEvent) => {
                if (item.type === "trash" || item.type === "action") return
                setDraggedItem(item.id)
                e.dataTransfer.effectAllowed = "move"
                e.dataTransfer.setData("text/plain", item.id)
              }

              const handleDragEnd = () => {
                setDraggedItem(null)
                setDragOverTrash(false)
              }

              return (
                <button
                  key={item.id}
                  onClick={handleClick}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  draggable={item.type !== "trash" && item.type !== "action"}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  className="flex flex-col items-center gap-2 p-3 transition-all duration-200 group"
                  style={{
                    cursor: item.type !== "trash" && item.type !== "action" ? "grab" : "pointer",
                    width: '110px',
                    minHeight: '100px',
                    opacity: draggedItem === item.id ? 0.5 : 1,
                  }}
                  aria-label={item.label}
                >
                  {/* Иконка с контрастным фоном */}
                  <div
                    className="transition-all duration-200 flex items-center justify-center"
                    style={{
                      width: '44px',
                      height: '44px',
                      background: isHovered ? '#FFED4E' : '#FFFFFF',
                      border: '3px solid #FFD700',
                      borderRadius: '4px',
                      boxShadow: isHovered
                        ? '0 0 20px rgba(255, 215, 0, 0.8), 0 0 30px rgba(255, 215, 0, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.4), inset 0 -2px 4px rgba(0, 0, 0, 0.2)'
                        : '0 4px 12px rgba(255, 215, 0, 0.4), 0 0 8px rgba(255, 215, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.3), inset 0 -1px 2px rgba(0, 0, 0, 0.1)',
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
                      color: "#FFD700",
                      background: isHovered ? 'rgba(255, 215, 0, 0.2)' : 'transparent',
                      border: '1px solid rgba(255, 215, 0, 0.4)',
                      textShadow: isHovered
                        ? `
                          0 0 8px rgba(255, 215, 0, 1),
                          0 0 12px rgba(255, 215, 0, 0.8),
                          2px 2px 0px rgba(0, 0, 0, 0.9),
                          -1px -1px 0px rgba(0, 0, 0, 0.9)
                        `
                        : `
                          0 0 4px rgba(255, 215, 0, 0.8),
                          1px 1px 0px rgba(0, 0, 0, 0.9),
                          -1px -1px 0px rgba(0, 0, 0, 0.9)
                        `,
                      transform: isHovered ? "scale(1.05)" : "scale(1)",
                      width: '110px',
                      minHeight: '32px',
                      lineHeight: "1.2",
                      wordBreak: "break-word",
                      overflowWrap: "break-word",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.label}
                  </span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Корзина внизу */}
        {trash && (
          <div className="mt-auto mb-4">
            <div
              onDragOver={(e) => {
                e.preventDefault()
                e.stopPropagation()
                if (draggedItem) {
                  setDragOverTrash(true)
                  e.dataTransfer.dropEffect = "move"
                }
              }}
              onDragLeave={() => {
                setDragOverTrash(false)
              }}
              onDrop={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setDragOverTrash(false)
                if (draggedItem && onShowDeleteWarning) {
                  onShowDeleteWarning()
                }
                setDraggedItem(null)
              }}
              className="flex flex-col items-center gap-2 p-3 transition-all duration-200"
              style={{
                cursor: "pointer",
                width: '110px',
                minHeight: '100px',
                background: dragOverTrash ? 'rgba(255, 215, 0, 0.3)' : 'transparent',
                border: dragOverTrash ? '2px dashed #FFD700' : '2px solid transparent',
              }}
            >
              {(() => {
                const IconComponent = getPixelIcon(trash.icon)
                return IconComponent ? (
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      background: dragOverTrash ? '#FFED4E' : '#FFFFFF',
                      border: '3px solid #FFD700',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <IconComponent size={32} />
                  </div>
                ) : null
              })()}
              <span
                className="text-xs font-bold text-center px-1.5 py-0.5 rounded"
                style={{
                  color: "#FFD700",
                  background: 'transparent',
                  border: '1px solid rgba(255, 215, 0, 0.4)',
                  width: '110px',
                  minHeight: '32px',
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {trash.label}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

