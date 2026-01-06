"use client"

import React, { useState, useMemo } from "react"
import { getPixelIcon } from "@/components/icons/pixel-icons"
import { desktopIcons, type DesktopIcon } from "@/lib/data"
import { IconRenderer } from "./icon-renderer"

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

  const byId = useMemo(() => {
    const map = new Map<string, DesktopIcon>()
    for (const item of menuItems) map.set(item.id, item)
    return map
  }, [menuItems])

  // Main grid (by rows)
  const productsFolder = byId.get("products-folder")
  const vacanciesFolder = byId.get("vacancies-folder")
  const contact = byId.get("contact")
  const individualProductsFolder = byId.get("individual-products-folder")
  const advertisingFolder = byId.get("advertising-folder")
  const itProductsFolder = byId.get("it-products-folder")
  const about = byId.get("about")
  const player = byId.get("player")
  const socials = byId.get("socials")
  const contestFolder = byId.get("contest-folder")
  const friendsFolder = byId.get("friends-folder")
  const legalDocumentsFolder = byId.get("legal-documents-folder")

  // Utility row (near Start menu)
  const settings = byId.get("settings")
  const animateBackground = byId.get("animate-background")
  const trash = menuItems.find((item) => item.type === "trash")

  const mainGridCells: Array<DesktopIcon | null> = [
    // Row 1 (variant 1: by rows)
    productsFolder ?? null,
    individualProductsFolder ?? null,
    itProductsFolder ?? null,
    // Row 2
    vacanciesFolder ?? null,
    advertisingFolder ?? null,
    about ?? null,
    // Row 3
    contact ?? null,
    player ?? null,
    socials ?? null,
    // Row 4
    contestFolder ?? null,
    friendsFolder ?? null,
    legalDocumentsFolder ?? null,
  ]

  const utilityCells: Array<DesktopIcon | null> = [
    settings ?? null,
    animateBackground ?? null,
    trash ?? null,
  ]

  const renderIcon = (item: DesktopIcon) => {
    const IconComponent = getPixelIcon(item.icon)
    const isHovered = hoveredItem === item.id
    const isAnimateBackground = item.id === "animate-background"
    const isTrash = item.type === "trash"

    const handleClick = () => {
      onItemClick(item.id)
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

    const button = (
      <button
        onClick={handleClick}
        onMouseEnter={() => setHoveredItem(item.id)}
        onMouseLeave={() => setHoveredItem(null)}
        draggable={item.type !== "trash" && item.type !== "action"}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        className={`flex flex-col items-center gap-1.5 p-1.5 transition-all duration-200 group ${
          isAnimateBackground ? "animate-pulse" : ""
        }`}
        style={{
          cursor: item.type !== "trash" && item.type !== "action" ? "grab" : "pointer",
          width: "110px",
          minHeight: "85px",
          opacity: draggedItem === item.id ? 0.5 : 1,
          background: isTrash && dragOverTrash ? "rgba(255, 215, 0, 0.3)" : "transparent",
          border: isTrash && dragOverTrash ? "2px dashed #FFD700" : "2px solid transparent",
        }}
        aria-label={item.label}
      >
        {/* Icon */}
        <div
          className="transition-all duration-200 flex items-center justify-center"
          style={{
            width: "60px",
            height: "60px",
            background: isTrash && dragOverTrash ? "#FFED4E" : isHovered ? "#FFED4E" : "transparent",
            border: "none",
            borderRadius: "8px",
            boxShadow: isHovered
              ? "0 0 20px rgba(255, 215, 0, 0.5), 0 0 40px rgba(255, 215, 0, 0.3)"
              : "none",
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
            <IconRenderer icon={item.icon} label={item.label} size={56} className="transition-all duration-200" />
          </div>
        </div>

        {/* Label (always white) */}
        <span
          className="text-xs font-bold text-center transition-all duration-200 px-1 py-0.5 rounded"
          style={{
            color: "#FFFFFF",
            background: isHovered ? "rgba(255, 215, 0, 0.2)" : "transparent",
            border: "none",
            textShadow: isHovered
              ? "0 0 8px rgba(255, 215, 0, 1), 0 0 12px rgba(255, 215, 0, 0.8), 2px 2px 0px rgba(0, 0, 0, 0.9), -1px -1px 0px rgba(0, 0, 0, 0.9)"
              : "0 0 4px rgba(255, 215, 0, 0.8), 1px 1px 0px rgba(0, 0, 0, 0.9), -1px -1px 0px rgba(0, 0, 0, 0.9)",
            transform: isHovered ? "scale(1.05)" : "scale(1)",
            width: "110px",
            minHeight: "26px",
            fontSize: "11px",
            lineHeight: "1.2",
            wordBreak: "break-word",
            overflowWrap: "break-word",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {item.label.split("\n").map((line, i, arr) => (
            <React.Fragment key={i}>
              {line}
              {i < arr.length - 1 && <br />}
            </React.Fragment>
          ))}
        </span>
      </button>
    )

    if (!isTrash) return button

    return (
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
      >
        {button}
      </div>
    )
  }

  return (
    <div 
      className="absolute left-0 top-0 h-full z-20 flex"
      style={{ fontFamily: "Oswald, sans-serif" }}
    >
      {/* Вертикальная черная полоска с логотипом */}
      <div 
        className="flex flex-col items-center py-6 px-4"
        style={{
          width: '360px',
          background: '#000000',
          borderRight: '3px solid #FFD700',
          boxShadow: '4px 0 20px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Логотип BAR BOSS ONLINE - одна строка в белом цвете */}
        <div 
          className="flex items-center justify-start mb-8 w-full"
          style={{
            textAlign: 'left',
            paddingLeft: '25px',
          }}
        >
          <div
            className="logo-text"
            style={{
              fontFamily: "Oswald, sans-serif",
              fontSize: '32px',
              fontWeight: 'bold',
              color: "#FFFFFF",
              letterSpacing: "0.1em",
              lineHeight: 1.2,
              cursor: "default",
              textShadow: "none",
            }}
          >
            BAR BOSS ONLINE
          </div>
        </div>

        {/* Иконки (main grid by rows) */}
        <div className="flex-1 w-full px-1">
          <div className="grid grid-cols-3 gap-x-1.5 gap-y-2.5 items-start justify-items-center w-full">
            {mainGridCells.map((item, idx) => {
              if (!item) {
                return <div key={`empty-${idx}`} style={{ width: "110px", minHeight: "85px" }} />
              }
              return <React.Fragment key={item.id}>{renderIcon(item)}</React.Fragment>
            })}
                    </div>
                  </div>

        {/* Utility row near Start menu */}
        <div className="w-full px-1 mt-auto" style={{ paddingBottom: "72px" }}>
          <div className="grid grid-cols-3 gap-x-1.5 gap-y-2.5 items-start justify-items-center w-full">
            {utilityCells.map((item, idx) => {
              if (!item) {
                return <div key={`utility-empty-${idx}`} style={{ width: "110px", minHeight: "85px" }} />
              }
              return <React.Fragment key={item.id}>{renderIcon(item)}</React.Fragment>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

