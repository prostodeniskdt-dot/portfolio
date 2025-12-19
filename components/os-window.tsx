"use client"

import { useState, useRef, useEffect, memo, type ReactNode, type MouseEvent } from "react"

interface OSWindowProps {
  title: string
  children: ReactNode
  defaultPosition: { x: number; y: number }
  defaultSize: { width: number; height: number }
  isActive: boolean
  zIndex: number
  onClose: () => void
  onFocus: () => void
  onMinimize: () => void
  icon?: string
}

export const OSWindow = memo(function OSWindow({
  title,
  children,
  defaultPosition,
  defaultSize,
  isActive,
  zIndex,
  onClose,
  onFocus,
  onMinimize,
  icon = "📁",
}: OSWindowProps) {
  const [position, setPosition] = useState(defaultPosition)
  const [isDragging, setIsDragging] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const dragOffset = useRef({ x: 0, y: 0 })
  const previousPosition = useRef(defaultPosition)

  // Minimum window size
  const MIN_WIDTH = 300
  const MIN_HEIGHT = 200

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (isMaximized || isMobile) return
    onFocus()
    setIsDragging(true)
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    }
  }

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || isMaximized || isMobile) return

    const newX = e.clientX - dragOffset.current.x
    const newY = e.clientY - dragOffset.current.y

    // Constrain window position to viewport
    const maxX = typeof window !== "undefined" ? window.innerWidth - defaultSize.width : 0
    const maxY = typeof window !== "undefined" ? window.innerHeight - 80 - defaultSize.height : 0

    const constrainedX = Math.max(0, Math.min(newX, maxX))
    const constrainedY = Math.max(0, Math.min(newY, maxY))

    setPosition({
      x: constrainedX,
      y: constrainedY,
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMaximize = (e: MouseEvent) => {
    e.stopPropagation()
    if (isMaximized) {
      setPosition(previousPosition.current)
      setIsMaximized(false)
    } else {
      previousPosition.current = position
      setPosition({ x: 0, y: 0 })
      setIsMaximized(true)
    }
  }

  const handleMinimize = (e: MouseEvent) => {
    e.stopPropagation()
    onMinimize()
  }

  return (
    <div
      className="absolute animate-window-open"
      role="dialog"
      aria-modal="false"
      aria-labelledby={`window-title-${title}`}
      aria-describedby={`window-content-${title}`}
      tabIndex={isActive ? 0 : -1}
      style={{
        left: isMaximized || isMobile ? 0 : position.x,
        top: isMaximized || isMobile ? 0 : position.y,
        width: isMaximized || isMobile ? "100%" : Math.max(MIN_WIDTH, defaultSize.width),
        height: isMaximized || isMobile ? "calc(100vh - 80px)" : Math.max(MIN_HEIGHT, defaultSize.height),
        minWidth: MIN_WIDTH,
        minHeight: MIN_HEIGHT,
        zIndex,
        transition: isMaximized || isMobile ? "all 0.25s ease-out" : undefined,
        maxWidth: isMobile ? "100vw" : undefined,
        maxHeight: isMobile ? "100vh" : undefined,
      }}
      onClick={onFocus}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onKeyDown={(e) => {
        if (e.key === "Escape" && isActive) {
          onClose()
        }
      }}
    >
      <div
        className="w-full h-full flex flex-col transition-shadow duration-300"
        style={{
          background: "#f5f0e1",
          border: "3px solid",
          borderColor: "#f8cf2c #000000 #000000 #f8cf2c",
          boxShadow: isActive
            ? "0 8px 32px rgba(248,207,44,0.4), 0 0 60px rgba(248,207,44,0.15)"
            : "0 4px 16px rgba(0,0,0,0.5)",
        }}
      >
        {/* Title bar */}
        <div
          className="h-8 flex items-center justify-between px-2 cursor-move select-none shrink-0 transition-colors duration-200"
          style={{
            background: isActive ? "#f8cf2c" : "#3a3a3a",
          }}
          onMouseDown={handleMouseDown}
          onDoubleClick={handleMaximize}
          role="button"
          aria-label={`Окно ${title}`}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleMaximize(e as unknown as MouseEvent)
            }
          }}
        >
          <div className="flex items-center gap-2">
            <span className={`text-sm ${isActive ? "animate-bounce-subtle" : ""}`} aria-hidden="true">
              {icon}
            </span>
            <span
              id={`window-title-${title}`}
              className={`text-sm font-bold tracking-wide ${isActive ? "animate-flicker" : ""}`}
              style={{ color: isActive ? "#000000" : "#f5f0e1" }}
            >
              {title}
            </span>
          </div>

          {/* Window controls with hover animations */}
          <div className="flex items-center gap-1">
            {/* Minimize */}
            <button
              onClick={handleMinimize}
              aria-label="Свернуть окно"
              className="w-5 h-5 flex items-center justify-center text-xs font-bold transition-all duration-150 hover:scale-110 hover:bg-[#f8cf2c] hover:text-black"
              style={{
                background: "#000000",
                color: "#f8cf2c",
                border: "2px solid",
                borderColor: "#3a3a3a #f8cf2c #f8cf2c #3a3a3a",
              }}
            >
              <span aria-hidden="true">_</span>
            </button>
            {/* Maximize */}
            <button
              onClick={handleMaximize}
              aria-label={isMaximized ? "Восстановить размер окна" : "Развернуть окно"}
              className="w-5 h-5 flex items-center justify-center transition-all duration-150 hover:scale-110 hover:bg-[#f8cf2c] group"
              style={{
                background: "#000000",
                color: "#f8cf2c",
                border: "2px solid",
                borderColor: "#3a3a3a #f8cf2c #f8cf2c #3a3a3a",
              }}
            >
              {isMaximized ? (
                <div className="relative w-3 h-2.5">
                  <div
                    className="absolute top-0 right-0 w-2 h-2 border-2 border-[#f8cf2c] group-hover:border-black"
                    style={{ borderTopWidth: "3px" }}
                  />
                  <div
                    className="absolute bottom-0 left-0 w-2 h-2 border-2 border-[#f8cf2c] group-hover:border-black bg-black group-hover:bg-[#f8cf2c]"
                    style={{ borderTopWidth: "3px" }}
                  />
                </div>
              ) : (
                <div
                  className="w-3 h-2.5 border-2 border-[#f8cf2c] group-hover:border-black"
                  style={{ borderTopWidth: "3px" }}
                />
              )}
            </button>
            {/* Close */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                onClose()
              }}
              aria-label="Закрыть окно"
              className="w-5 h-5 flex items-center justify-center text-sm font-bold transition-all duration-150 hover:scale-110 hover:bg-red-600 hover:text-white"
              style={{
                background: "#000000",
                color: "#f8cf2c",
                border: "2px solid",
                borderColor: "#3a3a3a #f8cf2c #f8cf2c #3a3a3a",
              }}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
        </div>

        {/* Content area */}
        <div
          id={`window-content-${title}`}
          className="flex-1 overflow-auto m-2"
          role="region"
          aria-label={`Содержимое окна ${title}`}
          style={{
            background: "#ffffff",
            border: "3px solid",
            borderColor: "#000000 #f8cf2c #f8cf2c #000000",
          }}
        >
          <div className="p-3">{children}</div>
        </div>

        {/* Status bar with blinking cursor */}
        <div
          className="h-6 flex items-center px-2 shrink-0"
          style={{
            background: "#000000",
            borderTop: "2px solid #f8cf2c",
          }}
        >
          <div className="flex-1 text-xs text-[#f8cf2c] px-2 flex items-center gap-1">
            <span>Готово</span>
            <span className="animate-blink">_</span>
          </div>
        </div>
      </div>
    </div>
  )
})
