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
  isFolder?: boolean
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
  isFolder = false,
}: OSWindowProps) {
  const [position, setPosition] = useState(defaultPosition)
  const [size, setSize] = useState(defaultSize)
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [resizeDirection, setResizeDirection] = useState<string | null>(null)
  const [isMaximized, setIsMaximized] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  // Hide visible scrollbars by default (on first open). Show after user resizes/maximizes.
  const [scrollbarsVisible, setScrollbarsVisible] = useState(false)
  const dragOffset = useRef({ x: 0, y: 0 })
  const resizeStart = useRef({ x: 0, y: 0, width: 0, height: 0 })
  const previousPosition = useRef(defaultPosition)
  const previousSize = useRef(defaultSize)
  const touchStartTime = useRef(0)
  const touchStartPos = useRef({ x: 0, y: 0 })
  const swipeStartY = useRef<number | null>(null)
  const swipeDistance = useRef<number>(0)
  const [isSwipeClosing, setIsSwipeClosing] = useState(false)
  const windowRef = useRef<HTMLDivElement>(null)
  const scrollableContentRef = useRef<HTMLDivElement | null>(null)
  const touchStartScrollTop = useRef<number>(0)
  const touchStartElement = useRef<HTMLElement | null>(null)

  // Minimum window size - адаптивные размеры для мобильных
  const MIN_WIDTH = 300
  const MIN_HEIGHT = 200
  const MOBILE_MIN_WIDTH = 280

  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth < 768 || 
        ('ontouchstart' in window || navigator.maxTouchPoints > 0)
      setIsMobile(isMobileDevice)
      
      // На мобильных устройствах автоматически максимизируем окно при открытии
      if (isMobileDevice && !isMaximized) {
        setIsMaximized(true)
        setScrollbarsVisible(true)
      }
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Звук при открытии окна
  useEffect(() => {
    soundManager.playWindowOpen()
  }, [])

  // Touch handlers for mobile - улучшенная обработка жестов
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isMobile) return
    
    const touch = e.touches[0]
    touchStartTime.current = Date.now()
    touchStartPos.current = { x: touch.clientX, y: touch.clientY }
    swipeStartY.current = touch.clientY
    swipeDistance.current = 0
    setIsSwipeClosing(false)
    
    // Определяем начальный элемент касания
    touchStartElement.current = e.target as HTMLElement
    
    // Если это папка, проверяем scrollTop контента
    if (isFolder && isMaximized) {
      // Ищем скроллируемый контент внутри папки
      const scrollableContent = windowRef.current?.querySelector('[style*="overflow-y"]') as HTMLElement
      if (!scrollableContent) {
        // Пробуем найти через ref или другие селекторы
        const contentDiv = windowRef.current?.querySelector('div[class*="flex-1"]') as HTMLElement
        if (contentDiv && (contentDiv.scrollHeight > contentDiv.clientHeight)) {
          scrollableContentRef.current = contentDiv
          touchStartScrollTop.current = contentDiv.scrollTop || 0
        } else {
          scrollableContentRef.current = null
          touchStartScrollTop.current = 0
        }
      } else {
        scrollableContentRef.current = scrollableContent
        touchStartScrollTop.current = scrollableContent.scrollTop || 0
      }
    } else {
      scrollableContentRef.current = null
      touchStartScrollTop.current = 0
    }
    
    // Если окно максимизировано, обрабатываем только свайп для закрытия
    if (isMaximized) {
      onFocus()
      return
    }
    
    // Если не максимизировано, обрабатываем перетаскивание
    onFocus()
    setIsDragging(true)
    dragOffset.current = {
      x: touch.clientX - position.x,
      y: touch.clientY - position.y,
    }
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isMobile) return
    
    const touch = e.touches[0]
    
    // Если окно максимизировано, обрабатываем свайп для закрытия с умной проверкой
    if (isMaximized && swipeStartY.current !== null) {
      const deltaY = touch.clientY - swipeStartY.current
      
      // Умное определение: проверяем, можно ли закрывать
      let canSwipeClose = false
      
      // 1. Если свайп начинается в заголовке - всегда можно закрывать
      const titleBar = windowRef.current?.querySelector('[role="button"][aria-label*="Окно"]') as HTMLElement
      const isTouchInTitleBar = titleBar && (
        touchStartElement.current?.closest('[role="button"][aria-label*="Окно"]') === titleBar ||
        (touch.clientY - (titleBar.getBoundingClientRect().top + titleBar.offsetHeight)) < 0
      )
      
      if (isTouchInTitleBar) {
        canSwipeClose = true
      } else if (isFolder && scrollableContentRef.current) {
        // 2. Для папок: проверяем scrollTop
        const currentScrollTop = scrollableContentRef.current.scrollTop
        const scrollHeight = scrollableContentRef.current.scrollHeight
        const clientHeight = scrollableContentRef.current.clientHeight
        const isScrollable = scrollHeight > clientHeight
        
        // Закрываем только если:
        // - контент в начале (scrollTop === 0) И свайп вниз
        // - или контент не прокручивается
        if (!isScrollable || (currentScrollTop === 0 && deltaY > 0)) {
          canSwipeClose = true
        }
      } else {
        // 3. Для других окон - всегда можно закрывать
        canSwipeClose = true
      }
      
      if (canSwipeClose) {
        swipeDistance.current = deltaY
        
        // Если свайп вниз больше 50px или вверх больше 100px
        if (deltaY > 50 || deltaY < -100) {
          setIsSwipeClosing(true)
          // Визуальная обратная связь - затемнение и сдвиг окна
          if (windowRef.current) {
            const opacity = Math.max(0.3, 1 - Math.abs(deltaY) / 400)
            const transform = `translateY(${deltaY}px)`
            windowRef.current.style.opacity = String(opacity)
            windowRef.current.style.transform = transform
          }
        }
        e.preventDefault()
        return
      }
      // Если нельзя закрывать, позволяем скролл работать нормально
      return
    }
    
    // Если не максимизировано и не перетаскиваем, выходим
    if (!isDragging || isMaximized) return
    
    e.preventDefault()
    const newX = touch.clientX - dragOffset.current.x
    const newY = touch.clientY - dragOffset.current.y

    const maxX = typeof window !== "undefined" ? window.innerWidth - defaultSize.width : 0
    const maxY = typeof window !== "undefined" ? window.innerHeight - 80 - defaultSize.height : 0

    const constrainedX = Math.max(0, Math.min(newX, maxX))
    const constrainedY = Math.max(0, Math.min(newY, maxY))

    setPosition({
      x: constrainedX,
      y: constrainedY,
    })
  }

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isMobile) return
    
    // Обработка свайпа для закрытия
    if (isMaximized && swipeStartY.current !== null) {
      const touch = e.changedTouches[0]
      const finalDeltaY = touch.clientY - swipeStartY.current
      const timeDiff = Date.now() - touchStartTime.current
      const swipeSpeed = timeDiff > 0 ? Math.abs(finalDeltaY) / timeDiff : 0
      
      // Проверяем, можно ли закрывать (та же логика что в handleTouchMove)
      let canSwipeClose = false
      
      const titleBar = windowRef.current?.querySelector('[role="button"][aria-label*="Окно"]') as HTMLElement
      const isTouchInTitleBar = titleBar && (
        touchStartElement.current?.closest('[role="button"][aria-label*="Окно"]') === titleBar ||
        (touch.clientY - (titleBar.getBoundingClientRect().top + titleBar.offsetHeight)) < 0
      )
      
      if (isTouchInTitleBar) {
        canSwipeClose = true
      } else if (isFolder && scrollableContentRef.current) {
        const currentScrollTop = scrollableContentRef.current.scrollTop
        const scrollHeight = scrollableContentRef.current.scrollHeight
        const clientHeight = scrollableContentRef.current.clientHeight
        const isScrollable = scrollHeight > clientHeight
        
        if (!isScrollable || (currentScrollTop === 0 && finalDeltaY > 0)) {
          canSwipeClose = true
        }
      } else {
        canSwipeClose = true
      }
      
      // Закрываем только если разрешено
      if (canSwipeClose && (finalDeltaY > 100 || finalDeltaY < -150 || swipeSpeed > 0.5)) {
        handleClose()
        scrollableContentRef.current = null
        touchStartElement.current = null
        return
      }
      
      // Возвращаем окно на место
      setIsSwipeClosing(false)
      if (windowRef.current) {
        windowRef.current.style.opacity = "1"
        windowRef.current.style.transform = "translateY(0)"
      }
      swipeStartY.current = null
      swipeDistance.current = 0
      scrollableContentRef.current = null
      touchStartElement.current = null
      return
    }
    
    // Проверка на двойное касание для максимизации (только если не максимизировано)
    if (!isMaximized) {
      const touchEndTime = Date.now()
      const timeDiff = touchEndTime - touchStartTime.current
      
      if (timeDiff < 300 && isDragging) {
        const touch = e.changedTouches[0]
        const moveX = Math.abs(touch.clientX - touchStartPos.current.x)
        const moveY = Math.abs(touch.clientY - touchStartPos.current.y)
        
        // Если движение минимальное, считаем это двойным касанием
        if (moveX < 10 && moveY < 10) {
          handleMaximize(e as unknown as MouseEvent)
        }
      }
    }
    
    swipeStartY.current = null
    swipeDistance.current = 0
    scrollableContentRef.current = null
    touchStartElement.current = null
    setIsDragging(false)
  }

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
    setScrollbarsVisible(true)
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
      const minWidth = isMobile ? MOBILE_MIN_WIDTH : MIN_WIDTH

      if (resizeDirection?.includes("e")) {
        newWidth = Math.max(minWidth, resizeStart.current.width + deltaX)
      }
      if (resizeDirection?.includes("w")) {
        newWidth = Math.max(minWidth, resizeStart.current.width - deltaX)
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
    setScrollbarsVisible(true)
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
    // Плавная анимация закрытия на мобильных
    if (isMobile && windowRef.current) {
      windowRef.current.style.transition = "opacity 0.2s ease-out, transform 0.2s ease-out"
      windowRef.current.style.opacity = "0"
      windowRef.current.style.transform = "scale(0.95)"
      setTimeout(() => {
        onClose()
      }, 200)
    } else {
      onClose()
    }
  }

  return (
    <div
      ref={windowRef}
      className="absolute animate-window-open"
      role="dialog"
      aria-modal="false"
      aria-labelledby={`window-title-${title}`}
      aria-describedby={`window-content-${title}`}
      tabIndex={isActive ? 0 : -1}
      data-barboss-window="true"
      data-scrollbars={scrollbarsVisible ? "shown" : "hidden"}
        style={{
          left: isMaximized || isMobile ? 0 : position.x,
          top: isMaximized || isMobile ? 0 : position.y,
          width: isMaximized || isMobile ? "100%" : Math.max(isMobile ? MOBILE_MIN_WIDTH : MIN_WIDTH, size.width),
          height: isMaximized || isMobile ? "100vh" : Math.max(MIN_HEIGHT, size.height),
          minWidth: isMobile ? "100vw" : MIN_WIDTH,
          minHeight: isMobile ? "100vh" : MIN_HEIGHT,
          zIndex,
          transition: isSwipeClosing ? "none" : (isMaximized || isMobile ? "all 0.25s ease-out" : isResizing ? undefined : "none"),
          maxWidth: isMobile ? "100vw" : undefined,
          maxHeight: isMobile ? "100vh" : undefined,
          touchAction: isMobile ? (isMaximized ? "pan-y" : "auto") : "auto",
        }}
      onClick={onFocus}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={(e) => {
        // Не обрабатываем свайп если клик на интерактивном элементе
        const target = e.target as HTMLElement
        if (!target.closest('button') && !target.closest('a') && !target.closest('input')) {
          handleTouchStart(e)
        }
      }}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
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
          className={`${isMobile ? "h-14" : "h-8"} flex items-center justify-between ${isMobile ? "px-2" : "px-2"} ${isMobile ? "cursor-default" : "cursor-move"} select-none shrink-0 transition-colors duration-200`}
          style={{
            background: isActive ? "#FFD700" : "#3a3a3a",
          }}
          onMouseDown={handleMouseDown}
          onDoubleClick={handleMaximize}
          onTouchStart={(e) => {
            // Обрабатываем свайп только если клик не на кнопке
            const target = e.target as HTMLElement
            if (!target.closest('button[aria-label="Назад"]')) {
              handleTouchStart(e)
            }
          }}
          role="button"
          aria-label={`Окно ${title}`}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleMaximize(e as unknown as MouseEvent)
            }
          }}
        >
          <div className="flex items-center gap-2 flex-1">
            {/* Кнопка "Назад" на мобильных */}
            {isMobile && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleClose()
                }}
                className="px-2 py-1 font-bold text-xs mr-1 transition-all active:scale-95"
                style={{
                  background: "#FFD700",
                  border: "2px solid #000000",
                  color: "#000000",
                  minWidth: "50px",
                  minHeight: "32px",
                }}
                aria-label="Назад"
              >
                ← Назад
              </button>
            )}
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
          <div className={`flex items-center gap-1 ${isMobile ? "gap-2" : ""}`}>
            {/* Minimize */}
            <button
              onClick={handleMinimize}
              aria-label="Свернуть окно"
              className={`${isMobile ? "w-10 h-10 text-base" : "w-5 h-5 text-xs"} flex items-center justify-center font-bold transition-all duration-150 ${isMobile ? "active:scale-95" : "hover:scale-110 hover:bg-[#FFD700] hover:text-black"}`}
              style={{
                minWidth: isMobile ? "44px" : undefined,
                minHeight: isMobile ? "44px" : undefined,
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
              className={`${isMobile ? "w-10 h-10" : "w-5 h-5"} flex items-center justify-center transition-all duration-150 ${isMobile ? "active:scale-95" : "hover:scale-110 hover:bg-[#FFD700]"} group`}
              style={{
                minWidth: isMobile ? "44px" : undefined,
                minHeight: isMobile ? "44px" : undefined,
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
              className={`${isMobile ? "w-10 h-10 text-lg" : "w-5 h-5 text-sm"} flex items-center justify-center font-bold transition-all duration-150 ${isMobile ? "active:scale-95 active:bg-red-600 active:text-white" : "hover:scale-110 hover:bg-red-600 hover:text-white"}`}
              style={{
                minWidth: isMobile ? "44px" : undefined,
                minHeight: isMobile ? "44px" : undefined,
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
          className={`flex-1 overflow-auto ${isMobile ? "m-1" : "m-2"}`}
          role="region"
          aria-label={`Содержимое окна ${title}`}
          style={{
            background: "#ffffff",
            border: "3px solid",
            borderColor: "#000000 #FFD700 #FFD700 #000000",
            WebkitOverflowScrolling: "touch", // Smooth scrolling on iOS
          }}
        >
          <div className={isMobile ? "p-3" : "p-3"} style={{ fontSize: isMobile ? "14px" : undefined }}>{children}</div>
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
            <button
              onClick={(e) => {
                e.stopPropagation()
                soundManager.playClick()
                onClose()
              }}
              className="text-xs text-[#FFD700] hover:text-[#FFD700] hover:underline cursor-pointer transition-all"
              style={{ background: "transparent", border: "none", padding: 0 }}
            >
              Готово
            </button>
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
