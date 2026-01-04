"use client"

import React, { memo, useMemo, useState, type ComponentType } from "react"
import dynamic from "next/dynamic"
import { OSWindow } from "./os-window"
import { windowConfigs, desktopIcons } from "@/lib/data"
import { soundManager } from "@/lib/sounds"
import { IconRenderer } from "./icon-renderer"

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

// Lazy load window components with optimized code splitting
const AboutWindow = dynamic(
  () => import("./windows/about-window").then((mod) => ({ default: mod.AboutWindow })),
  {
    ssr: false,
    loading: () => (
      <div className="p-4 flex items-center justify-center">
        <div className="animate-pulse text-xs text-black">Загрузка...</div>
      </div>
    ),
  },
)

const PlayerWindow = dynamic(
  () => import("./windows/player-window").then((mod) => ({ default: mod.PlayerWindow })),
  {
    ssr: false,
    loading: () => (
      <div className="p-4 flex items-center justify-center">
        <div className="animate-pulse text-xs text-black">Загрузка...</div>
      </div>
    ),
  },
)

const ContactWindow = dynamic(
  () => import("./windows/contact-window").then((mod) => ({ default: mod.ContactWindow })),
  {
    ssr: false,
    loading: () => (
      <div className="p-4 flex items-center justify-center">
        <div className="animate-pulse text-xs text-black">Загрузка...</div>
      </div>
    ),
  },
)

const SettingsWindow = dynamic(
  () => import("./windows/settings-window").then((mod) => ({ default: mod.SettingsWindow })),
  {
    ssr: false,
    loading: () => (
      <div className="p-4 flex items-center justify-center">
        <div className="animate-pulse text-xs text-black">Загрузка...</div>
      </div>
    ),
  },
)

const SocialsWindow = dynamic(
  () => import("./windows/socials-window").then((mod) => ({ default: mod.SocialsWindow })),
  {
    ssr: false,
    loading: () => (
      <div className="p-4 flex items-center justify-center">
        <div className="animate-pulse text-xs text-black">Загрузка...</div>
      </div>
    ),
  },
)

const ClippyChatWindow = dynamic(
  () => import("./windows/clippy-chat-window").then((mod) => ({ default: mod.ClippyChatWindow })),
  {
    ssr: false,
    loading: () => (
      <div className="p-4 flex items-center justify-center">
        <div className="animate-pulse text-xs text-black">Загрузка...</div>
      </div>
    ),
  },
)

const FolderWindowDynamic = dynamic(
  () => import("./windows/folder-window").then((mod) => ({ default: mod.FolderWindow })),
  {
    ssr: false,
    loading: () => (
      <div className="p-4 flex items-center justify-center">
        <div className="animate-pulse text-xs text-black">Загрузка...</div>
      </div>
    ),
  },
) as ComponentType<{ folderId: string; onOpenProduct?: (productId: string) => void }>

const ProductWindowDynamic = dynamic(
  () => import("./windows/product-window").then((mod) => ({ default: mod.ProductWindow })),
  {
    ssr: false,
    loading: () => (
      <div className="p-4 flex items-center justify-center">
        <div className="animate-pulse text-xs text-black">Загрузка...</div>
      </div>
    ),
  },
) as ComponentType<{ productId: string }>

const IndividualCoursesWindowDynamic = dynamic(
  () => import("./windows/courses-window").then((mod) => ({ default: mod.IndividualCoursesWindow })),
  {
    ssr: false,
    loading: () => (
      <div className="p-4 flex items-center justify-center">
        <div className="animate-pulse text-xs text-black">Загрузка...</div>
      </div>
    ),
  },
)

// Map window IDs to lazy-loaded components
const windowComponents: Record<string, ComponentType> = {
  about: AboutWindow,
  contact: ContactWindow,
  settings: SettingsWindow,
  player: PlayerWindow,
  socials: SocialsWindow,
  clippy: ClippyChatWindow,
  "individual-courses": IndividualCoursesWindowDynamic,
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
  const memoizedIcons = useMemo(
    () =>
      desktopIcons.map((item, index) => {
        const handleClick = () => {
          soundManager.playClick()
          if (item.type === "folder") {
            // Для папок извлекаем folderId из id (например, "products-folder" -> "products")
            const folderId = item.id.replace("-folder", "")
            onFolderClick?.(folderId)
          } else if (item.type === "action") {
            // Для действий вызываем onIconClick, который обработает их в page.tsx
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
            className="flex flex-col items-center gap-1 p-2 cursor-pointer hover:bg-[#FFD700]/20 group w-20 select-none animate-slide-up hover-lift"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <IconRenderer icon={item.icon} label={item.label} size={48} className="" />
            <span 
              className="text-xs text-center font-bold drop-shadow-[1px_1px_0_#000] group-hover:bg-[#FFD700] group-hover:text-black px-2 py-0.5 transition-colors duration-200"
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
    [onIconClick, onFolderClick],
  )

  const memoizedWindows = useMemo(
    () => {
      // First pass: calculate z-index for all windows
      // Product windows should always appear above folder windows
      const folderWindows: string[] = []
      const productWindows: string[] = []
      const otherWindows: string[] = []
      
      openWindows.forEach((windowId) => {
        if (windowId.endsWith("-folder")) {
          folderWindows.push(windowId)
        } else if (windowId.startsWith("product-")) {
          productWindows.push(windowId)
        } else {
          otherWindows.push(windowId)
        }
      })
      
      // Calculate z-index ranges:
      // Folders: 10-49
      // Products: 50-99 (or 100 if active)
      // Other: 10-99 (or 100 if active)
      
      return openWindows.map((windowId, index) => {
        const config = windowConfigs[windowId]
        if (!config) return null

        // Handle folder windows
        if (windowId.endsWith("-folder")) {
          const folderId = windowId.replace("-folder", "")
          const folderIndex = folderWindows.indexOf(windowId)
          const zIndex = activeWindow === windowId 
            ? 100 
            : Math.max(10, 49 - (folderWindows.length - folderIndex - 1))
          return (
            <OSWindow
              key={windowId}
              title={config.title}
              defaultPosition={config.defaultPosition}
              defaultSize={config.defaultSize}
              isActive={activeWindow === windowId}
              zIndex={zIndex}
              onClose={() => onClose(windowId)}
              onFocus={() => onFocus(windowId)}
              onMinimize={() => onMinimize(windowId)}
              icon={config.icon}
              isFolder={true}
            >
              <FolderWindowDynamic
                folderId={folderId}
                onOpenProduct={(productId: string) => {
                  onProductClick?.(productId)
                }}
              />
            </OSWindow>
          )
        }

        // Handle product windows
        if (windowId.startsWith("product-")) {
          const productId = windowId.replace("product-", "")
          const productIndex = productWindows.indexOf(windowId)
          // Product windows should always appear above folder windows
          const zIndex = activeWindow === windowId 
            ? 100 
            : Math.max(50, 99 - (productWindows.length - productIndex - 1))
          return (
            <OSWindow
              key={windowId}
              title={config.title}
              defaultPosition={config.defaultPosition}
              defaultSize={config.defaultSize}
              isActive={activeWindow === windowId}
              zIndex={zIndex}
              onClose={() => onClose(windowId)}
              onFocus={() => onFocus(windowId)}
              onMinimize={() => onMinimize(windowId)}
              icon={config.icon}
            >
              <ProductWindowDynamic productId={productId} />
            </OSWindow>
          )
        }

        // Handle regular windows
        const Component = windowComponents[windowId]
        if (!Component) return null
        
        const otherIndex = otherWindows.indexOf(windowId)
        const zIndex = activeWindow === windowId 
          ? 100 
          : Math.max(10, 99 - (otherWindows.length - otherIndex - 1))

        return (
          <OSWindow
            key={windowId}
            title={config.title}
            defaultPosition={config.defaultPosition}
            defaultSize={config.defaultSize}
            isActive={activeWindow === windowId}
            zIndex={zIndex}
            onClose={() => onClose(windowId)}
            onFocus={() => onFocus(windowId)}
            onMinimize={() => onMinimize(windowId)}
            icon={config.icon}
          >
            <Component />
          </OSWindow>
        )
      })
    },
    [openWindows, activeWindow, onClose, onFocus, onMinimize, onProductClick],
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
          // Можно добавить обработку файлов
          if (process.env.NODE_ENV === 'development') {
            console.log("Dropped files:", files)
          }
          // Здесь можно добавить логику обработки файлов
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
            marginLeft: "420px",
          }}
        >
          {/* Desktop icons - скрыто, так как все иконки в сайдбаре */}
          {/* <div className="absolute bottom-16 left-4 grid grid-cols-3 gap-4 hidden">{memoizedIcons}</div> */}

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
