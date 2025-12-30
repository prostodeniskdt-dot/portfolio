"use client"

import React, { useState, useMemo } from "react"
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

  // Разделяем иконки по категориям
  const productsFolder = menuItems.find(item => item.id === "products-folder")
  const individualProductsFolder = menuItems.find(item => item.id === "individual-products-folder")
  const itProductsFolder = menuItems.find(item => item.id === "it-products-folder")
  const vacanciesFolder = menuItems.find(item => item.id === "vacancies-folder")
  const advertisingFolder = menuItems.find(item => item.id === "advertising-folder")
  const about = menuItems.find(item => item.id === "about")
  const contact = menuItems.find(item => item.id === "contact")
  const settings = menuItems.find(item => item.id === "settings")
  const animateBackground = menuItems.find(item => item.id === "animate-background")
  const trash = menuItems.find(item => item.type === "trash")

  // Первая строка: Продукты BAR BOSS, Индивидуальные продукты, IT Продукты
  const column1 = [productsFolder, individualProductsFolder, itProductsFolder].filter(Boolean) as typeof menuItems

  // Вторая строка: Вакансии, Реклама на площадке, Команда
  const column2 = [vacanciesFolder, advertisingFolder, about].filter(Boolean) as typeof menuItems

  // Третья строка: Настройки, Корзина, Анимация фона
  const column3 = [settings, trash, animateBackground].filter(Boolean) as typeof menuItems

  return (
    <div 
      className="absolute left-0 top-0 h-full z-20 flex"
      style={{ fontFamily: "Oswald, sans-serif" }}
    >
      {/* Вертикальная черная полоска с логотипом */}
      <div 
        className="flex flex-col items-center justify-between py-6 px-4"
        style={{
          width: '360px',
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

        {/* Иконки - три столбца */}
        <div className="flex-1 flex gap-1.5 items-start justify-center w-full px-1">
          {/* Первый столбец */}
          <nav className="flex flex-col gap-2.5 items-center">
            {column1.map((item) => {
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
                  className="flex flex-col items-center gap-1.5 p-1.5 transition-all duration-200 group"
                  style={{
                    cursor: item.type !== "trash" && item.type !== "action" ? "grab" : "pointer",
                    width: '110px',
                    minHeight: '85px',
                    opacity: draggedItem === item.id ? 0.5 : 1,
                  }}
                  aria-label={item.label}
                >
                  {/* Иконка с контрастным фоном */}
                  <div
                    className="transition-all duration-200 flex items-center justify-center"
                    style={{
                      width: '36px',
                      height: '36px',
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
                          size={28}
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
                    className="text-xs font-bold text-center transition-all duration-200 px-1 py-0.5 rounded"
                    style={{
                      color: item.type === "folder" ? "#FFFFFF" : "#FFD700",
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
                      minHeight: '26px',
                      fontSize: '11px',
                      lineHeight: "1.2",
                      wordBreak: "break-word",
                      overflowWrap: "break-word",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.label.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i < item.label.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </span>
                </button>
              )
            })}
          </nav>
          
          {/* Второй столбец */}
          <nav className="flex flex-col gap-2.5 items-center">
            {column2.map((item) => {
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
                  className="flex flex-col items-center gap-1.5 p-1.5 transition-all duration-200 group"
                  style={{
                    cursor: item.type !== "trash" && item.type !== "action" ? "grab" : "pointer",
                    width: '110px',
                    minHeight: '85px',
                    opacity: draggedItem === item.id ? 0.5 : 1,
                  }}
                  aria-label={item.label}
                >
                  {/* Иконка с контрастным фоном */}
                  <div
                    className="transition-all duration-200 flex items-center justify-center"
                    style={{
                      width: '36px',
                      height: '36px',
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
                          size={28}
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
                    className="text-xs font-bold text-center transition-all duration-200 px-1 py-0.5 rounded"
                    style={{
                      color: item.type === "folder" ? "#FFFFFF" : "#FFD700",
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
                      minHeight: '26px',
                      fontSize: '11px',
                      lineHeight: "1.2",
                      wordBreak: "break-word",
                      overflowWrap: "break-word",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.label.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i < item.label.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </span>
                </button>
              )
            })}
          </nav>
          
          {/* Третий столбец */}
          <nav className="flex flex-col gap-2.5 items-center mb-12">
            {column3.map((item) => {
              if (!item) return null
              const IconComponent = getPixelIcon(item.icon)
              const isHovered = hoveredItem === item.id
              const isAnimateBackground = item.id === "animate-background"
              const isTrash = item.type === "trash"

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
                <div
                  key={item.id}
                  onDragOver={isTrash ? (e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    if (draggedItem) {
                      setDragOverTrash(true)
                      e.dataTransfer.dropEffect = "move"
                    }
                  } : undefined}
                  onDragLeave={isTrash ? () => {
                    setDragOverTrash(false)
                  } : undefined}
                  onDrop={isTrash ? (e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setDragOverTrash(false)
                    if (draggedItem && onShowDeleteWarning) {
                      onShowDeleteWarning()
                    }
                    setDraggedItem(null)
                  } : undefined}
                >
                  <button
                    onClick={handleClick}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    draggable={item.type !== "trash" && item.type !== "action"}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    className={`flex flex-col items-center gap-1.5 p-1.5 transition-all duration-200 group ${isAnimateBackground ? "animate-pulse" : ""}`}
                    style={{
                      cursor: item.type !== "trash" && item.type !== "action" ? "grab" : "pointer",
                      width: '110px',
                      minHeight: '85px',
                      opacity: draggedItem === item.id ? 0.5 : 1,
                      background: isTrash && dragOverTrash ? 'rgba(255, 215, 0, 0.3)' : 'transparent',
                      border: isTrash && dragOverTrash ? '2px dashed #FFD700' : '2px solid transparent',
                    }}
                    aria-label={item.label}
                  >
                    {/* Иконка с контрастным фоном */}
                    <div
                      className="transition-all duration-200 flex items-center justify-center"
                      style={{
                        width: '36px',
                        height: '36px',
                        background: (isTrash && dragOverTrash) ? '#FFED4E' : (isHovered ? '#FFED4E' : '#FFFFFF'),
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
                            size={28}
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
                      className="text-xs font-bold text-center transition-all duration-200 px-1 py-0.5 rounded"
                      style={{
                        color: item.type === "folder" ? "#FFFFFF" : "#FFD700",
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
                        minHeight: '26px',
                        fontSize: '11px',
                        lineHeight: "1.2",
                        wordBreak: "break-word",
                        overflowWrap: "break-word",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {item.label.split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          {i < item.label.split('\n').length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </span>
                  </button>
                </div>
              )
            })}
          </nav>
        </div>
      </div>
    </div>
  )
}

