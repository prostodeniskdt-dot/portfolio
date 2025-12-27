"use client"

import { useState, useRef, useEffect, memo, type ReactNode, type MouseEvent } from "react"
import { soundManager } from "@/lib/sounds"
import { getPixelIcon } from "@/components/icons/pixel-icons"

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
  const [size, setSize] = useState(defaultSize)
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [resizeDirection, setResizeDirection] = useState<string | null>(null)
  const [isMaximized, setIsMaximized] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const dragOffset = useRef({ x: 0, y: 0 })
  const resizeStart = useRef({ x: 0, y: 0, width: 0, height: 0 })
  const previousPosition = useRef(defaultPosition)
  const previousSize = useRef(defaultSize)

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

  // Звук при открытии окна
  useEffect(() => {
    soundManager.playWindowOpen()
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
    setIsResizing(false)
    setResizeDirection(null)
  }

  const handleResizeStart = (direction: string) => (e: MouseEvent) => {
    if (isMaximized || isMobile) return
    e.stopPropagation()
    onFocus()
    setIsResizing(true)
    setResizeDirection(direction)
    resizeStart.current = {
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
    }
  }

  useEffect(() => {
    if (!isResizing) return

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      const deltaX = e.clientX - resizeStart.current.x
      const deltaY = e.clientY - resizeStart.current.y

      let newWidth = size.width
      let newHeight = size.height
      let newX = position.x
      let newY = position.y

      if (resizeDirection?.includes("e")) {
        newWidth = Math.max(MIN_WIDTH, resizeStart.current.width + deltaX)
      }
      if (resizeDirection?.includes("w")) {
        newWidth = Math.max(MIN_WIDTH, resizeStart.current.width - deltaX)
        newX = position.x + (resizeStart.current.width - newWidth)
      }
      if (resizeDirection?.includes("s")) {
        newHeight = Math.max(MIN_HEIGHT, resizeStart.current.height + deltaY)
      }
      if (resizeDirection?.includes("n")) {
        newHeight = Math.max(MIN_HEIGHT, resizeStart.current.height - deltaY)
        newY = position.y + (resizeStart.current.height - newHeight)
      }

      // Ограничения по размеру экрана
      const maxWidth = typeof window !== "undefined" ? window.innerWidth - newX : newWidth
      const maxHeight = typeof window !== "undefined" ? window.innerHeight - 80 - newY : newHeight

      newWidth = Math.min(newWidth, maxWidth)
      newHeight = Math.min(newHeight, maxHeight)

      setSize({ width: newWidth, height: newHeight })
      if (resizeDirection?.includes("w") || resizeDirection?.includes("n")) {
        setPosition({ x: newX, y: newY })
      }
    }

    const handleMouseUp = () => {
      setIsResizing(false)
      setResizeDirection(null)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isResizing, resizeDirection, size, position, isMaximized, isMobile, MIN_WIDTH, MIN_HEIGHT])

  const handleMaximize = (e: MouseEvent) => {
    e.stopPropagation()
    soundManager.playClick()
    if (isMaximized) {
      setPosition(previousPosition.current)
      setSize(previousSize.current)
      setIsMaximized(false)
    } else {
      previousPosition.current = position
      previousSize.current = size
      setPosition({ x: 0, y: 0 })
      setIsMaximized(true)
    }
  }

  const handleMinimize = (e: MouseEvent) => {
    e.stopPropagation()
    soundManager.playClick()
    onMinimize()
  }

  const handleClose = () => {
    soundManager.playWindowClose()
    onClose()
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
        width: isMaximized || isMobile ? "100%" : Math.max(MIN_WIDTH, size.width),
        height: isMaximized || isMobile ? "calc(100vh - 80px)" : Math.max(MIN_HEIGHT, size.height),
        minWidth: MIN_WIDTH,
        minHeight: MIN_HEIGHT,
        zIndex,
        transition: isMaximized || isMobile ? "all 0.25s ease-out" : isResizing ? undefined : "none",
        maxWidth: isMobile ? "100vw" : undefined,
        maxHeight: isMobile ? "100vh" : undefined,
      }}
      onClick={onFocus}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onKeyDown={(e) => {
        if (e.key === "Escape" && isActive) {
          handleClose()
        }
      }}
    >
      <div
        className="w-full h-full flex flex-col transition-shadow duration-300"
        style={{
          background: "#f5f0e1",
          border: "3px solid",
          borderColor: "#FFD700 #000000 #000000 #FFD700",
          boxShadow: isActive
            ? "0 8px 32px rgba(184,134,11,0.4), 0 0 60px rgba(184,134,11,0.15)"
            : "0 4px 16px rgba(0,0,0,0.5)",
        }}
      >
        {/* Title bar */}
        <div
          className="h-8 flex items-center justify-between px-2 cursor-move select-none shrink-0 transition-colors duration-200"
          style={{
            background: isActive ? "#FFD700" : "#3a3a3a",
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
            {(() => {
              const IconComponent = typeof icon === "string" && getPixelIcon(icon)
              return IconComponent ? (
                <IconComponent size={16} className={isActive ? "animate-bounce-subtle" : ""} />
              ) : (
                <span className={`text-sm ${isActive ? "animate-bounce-subtle" : ""}`} aria-hidden="true">
                  {icon}
                </span>
              )
            })()}
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
              className="w-5 h-5 flex items-center justify-center text-xs font-bold transition-all duration-150 hover:scale-110 hover:bg-[#FFD700] hover:text-black"
              style={{
                background: "#000000",
                color: "#FFD700",
                border: "2px solid",
                borderColor: "#3a3a3a #FFD700 #FFD700 #3a3a3a",
              }}
            >
              <span aria-hidden="true">_</span>
            </button>
            {/* Maximize */}
            <button
              onClick={handleMaximize}
              aria-label={isMaximized ? "Восстановить размер окна" : "Развернуть окно"}
              className="w-5 h-5 flex items-center justify-center transition-all duration-150 hover:scale-110 hover:bg-[#FFD700] group"
              style={{
                background: "#000000",
                color: "#FFD700",
                border: "2px solid",
                borderColor: "#3a3a3a #FFD700 #FFD700 #3a3a3a",
              }}
            >
              {isMaximized ? (
                <div className="relative w-3 h-2.5">
                  <div
                    className="absolute top-0 right-0 w-2 h-2 border-2 border-[#FFD700] group-hover:border-black"
                    style={{ borderTopWidth: "3px" }}
                  />
                  <div
                    className="absolute bottom-0 left-0 w-2 h-2 border-2 border-[#FFD700] group-hover:border-black bg-black group-hover:bg-[#FFD700]"
                    style={{ borderTopWidth: "3px" }}
                  />
                </div>
              ) : (
                <div
                  className="w-3 h-2.5 border-2 border-[#FFD700] group-hover:border-black"
                  style={{ borderTopWidth: "3px" }}
                />
              )}
            </button>
            {/* Close */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleClose()
              }}
              aria-label="Закрыть окно"
              className="w-5 h-5 flex items-center justify-center text-sm font-bold transition-all duration-150 hover:scale-110 hover:bg-red-600 hover:text-white"
              style={{
                background: "#000000",
                color: "#FFD700",
                border: "2px solid",
                borderColor: "#3a3a3a #FFD700 #FFD700 #3a3a3a",
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
            borderColor: "#000000 #FFD700 #FFD700 #000000",
          }}
        >
          <div className="p-3">{children}</div>
        </div>

        {/* Status bar with blinking cursor */}
        <div
          className="h-6 flex items-center px-2 shrink-0"
          style={{
            background: "#000000",
            borderTop: "2px solid #FFD700",
          }}
        >
          <div className="flex-1 text-xs text-[#FFD700] px-2 flex items-center gap-1">
            <span>Готово</span>
            <span className="animate-blink">_</span>
          </div>
        </div>

        {/* Resize handles */}
        {!isMaximized && !isMobile && (
          <>
            {/* Углы - увеличенные для удобства */}
            <div
              className="absolute top-0 left-0 w-4 h-4 cursor-nwse-resize z-10 group"
              onMouseDown={handleResizeStart("nw")}
              style={{ 
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 215, 0, 0.2)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent"
              }}
            />
            <div
              className="absolute top-0 right-0 w-4 h-4 cursor-nesw-resize z-10"
              onMouseDown={handleResizeStart("ne")}
              style={{ background: "transparent" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 215, 0, 0.2)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent"
              }}
            />
            <div
              className="absolute bottom-0 left-0 w-4 h-4 cursor-nesw-resize z-10"
              onMouseDown={handleResizeStart("sw")}
              style={{ background: "transparent" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 215, 0, 0.2)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent"
              }}
            />
            <div
              className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-10"
              onMouseDown={handleResizeStart("se")}
              style={{ background: "transparent" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 215, 0, 0.2)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent"
              }}
            />
            {/* Края - увеличенные для удобства */}
            <div
              className="absolute top-0 left-4 right-4 h-2 cursor-ns-resize z-10"
              onMouseDown={handleResizeStart("n")}
              style={{ background: "transparent" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 215, 0, 0.15)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent"
              }}
            />
            <div
              className="absolute bottom-0 left-4 right-4 h-2 cursor-ns-resize z-10"
              onMouseDown={handleResizeStart("s")}
              style={{ background: "transparent" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 215, 0, 0.15)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent"
              }}
            />
            <div
              className="absolute left-0 top-4 bottom-4 w-2 cursor-ew-resize z-10"
              onMouseDown={handleResizeStart("w")}
              style={{ background: "transparent" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 215, 0, 0.15)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent"
              }}
            />
            <div
              className="absolute right-0 top-4 bottom-4 w-2 cursor-ew-resize z-10"
              onMouseDown={handleResizeStart("e")}
              style={{ background: "transparent" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 215, 0, 0.15)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent"
              }}
            />
          </>
        )}
      </div>
    </div>
  )
})
