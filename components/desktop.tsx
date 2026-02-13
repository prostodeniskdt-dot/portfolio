"use client"

import React, { memo, useMemo, useState } from "react"
import { desktopIcons } from "@/lib/data"
import { soundManager } from "@/lib/sounds"
import { IconRenderer } from "./icon-renderer"
import { useIsMobile } from "@/hooks/use-mobile"
import { useWindowRenderer } from "./window-renderer"

interface DesktopProps {
  openWindows: string[]
  activeWindow: string | null
  onClose: (windowId: string) => void
  onFocus: (windowId: string) => void
  onIconClick: (windowId: string) => void
  onMinimize: (windowId: string) => void
  onFolderClick?: (folderId: string) => void
  onProductClick?: (productId: string) => void
}

export const Desktop = memo(function Desktop({
  openWindows,
  activeWindow,
  onClose,
  onFocus,
  onIconClick,
  onMinimize,
  onFolderClick,
  onProductClick,
}: DesktopProps) {
  const [isDragging, setIsDragging] = useState(false)
  const isMobile = useIsMobile()

  const memoizedWindows = useWindowRenderer({
    openWindows,
    activeWindow,
    onClose,
    onFocus,
    onMinimize,
    onProductClick,
    isMobile: false,
  })

  const memoizedIcons = useMemo(
    () =>
      desktopIcons.map((item, index) => {
        const handleClick = () => {
          soundManager.playClick()
          if (item.type === "folder") {
            const folderId = item.id.replace("-folder", "")
            onFolderClick?.(folderId)
          } else if (item.type === "action") {
            onIconClick(item.id)
          } else {
            onIconClick(item.id)
          }
        }

        return (
          <button
            key={item.id}
            onClick={handleClick}
            onDoubleClick={() => {
              soundManager.playWindowOpen()
              handleClick()
            }}
            aria-label={`Открыть ${item.label}`}
            className="flex flex-col items-center gap-1 p-2 cursor-pointer hover:bg-[#FFD700]/20 active:bg-[#FFD700]/30 group select-none animate-slide-up hover-lift touch-manipulation"
            style={{ 
              animationDelay: `${index * 0.1}s`,
              width: "80px",
            }}
          >
            <IconRenderer 
              icon={item.icon} 
              label={item.label} 
              size={isMobile ? 40 : 48} 
              className="" 
            />
            <span 
              className={`${isMobile ? "text-xs" : "text-sm"} text-center font-bold drop-shadow-[1px_1px_0_#000] group-hover:bg-[#FFD700] group-hover:text-black group-active:bg-[#FFD700] group-active:text-black px-2 py-0.5 transition-colors duration-200`}
              style={{
                color: item.type === "folder" ? "#FFFFFF" : "#FFD700"
              }}
            >
              {item.label.split('\n').map((line, i, arr) => (
                <React.Fragment key={i}>
                  {line}
                  {i < arr.length - 1 && <br />}
                </React.Fragment>
              ))}
            </span>
          </button>
        )
      }),
    [onIconClick, onFolderClick, isMobile],
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
      if (process.env.NODE_ENV === 'development') {
        console.log("Dropped files:", files)
      }
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
        marginLeft: isMobile ? "0" : "420px",
        marginBottom: isMobile ? "48px" : "0",
        transition: "margin-left 0.3s ease, margin-bottom 0.3s ease",
        width: isMobile ? "100%" : undefined,
        minHeight: isMobile ? "calc(100vh - 48px)" : undefined,
      }}
    >
      {/* Drop zone indicator */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-200"
        style={{
          background: "rgba(255, 215, 0, 0.1)",
          border: "3px dashed #FFD700",
        }}
        id="drop-zone-indicator"
      />

      {/* Windows */}
      {memoizedWindows}
    </main>
  )
})
