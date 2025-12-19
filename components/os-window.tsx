"use client"

import { useState, useRef, type ReactNode, type MouseEvent } from "react"

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

export function OSWindow({
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
  const dragOffset = useRef({ x: 0, y: 0 })
  const previousPosition = useRef(defaultPosition)

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (isMaximized) return
    onFocus()
    setIsDragging(true)
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    }
  }

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || isMaximized) return
    setPosition({
      x: e.clientX - dragOffset.current.x,
      y: e.clientY - dragOffset.current.y,
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
      style={{
        left: isMaximized ? 0 : position.x,
        top: isMaximized ? 0 : position.y,
        width: isMaximized ? "100%" : defaultSize.width,
        height: isMaximized ? "calc(100vh - 80px)" : defaultSize.height,
        zIndex,
        transition: isMaximized ? "all 0.25s ease-out" : undefined,
      }}
      onClick={onFocus}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
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
        >
          <div className="flex items-center gap-2">
            <span className={`text-sm ${isActive ? "animate-bounce-subtle" : ""}`}>{icon}</span>
            <span
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
              className="w-5 h-5 flex items-center justify-center text-xs font-bold transition-all duration-150 hover:scale-110 hover:bg-[#f8cf2c] hover:text-black"
              style={{
                background: "#000000",
                color: "#f8cf2c",
                border: "2px solid",
                borderColor: "#3a3a3a #f8cf2c #f8cf2c #3a3a3a",
              }}
            >
              _
            </button>
            {/* Maximize */}
            <button
              onClick={handleMaximize}
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
              className="w-5 h-5 flex items-center justify-center text-sm font-bold transition-all duration-150 hover:scale-110 hover:bg-red-600 hover:text-white"
              style={{
                background: "#000000",
                color: "#f8cf2c",
                border: "2px solid",
                borderColor: "#3a3a3a #f8cf2c #f8cf2c #3a3a3a",
              }}
            >
              ×
            </button>
          </div>
        </div>

        {/* Content area */}
        <div
          className="flex-1 overflow-auto m-2"
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
}
