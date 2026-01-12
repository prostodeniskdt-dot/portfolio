"use client"

import { Suspense, useMemo } from "react"
import dynamic from "next/dynamic"
import { OSWindow } from "@/components/os-window"
import { windowConfigs } from "@/lib/data"
import { WindowSkeleton } from "@/components/window-skeleton"
import type { ComponentType } from "react"

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
  socials: SocialsWindow,
  clippy: ClippyChatWindow,
  "individual-courses": IndividualCoursesWindowDynamic,
}

interface MobileWindowsProps {
  openWindows: string[]
  activeWindow: string | null
  minimizedWindows: string[]
  onClose: (windowId: string) => void
  onFocus: (windowId: string) => void
  onMinimize: (windowId: string) => void
  onProductClick?: (productId: string) => void
}

export function MobileWindows({
  openWindows,
  activeWindow,
  minimizedWindows,
  onClose,
  onFocus,
  onMinimize,
  onProductClick,
}: MobileWindowsProps) {
  // Фильтруем только видимые окна (не минимизированные)
  const visibleWindows = useMemo(
    () => openWindows.filter((w: string) => !minimizedWindows.includes(w)),
    [openWindows, minimizedWindows],
  )

  // Разделяем окна по типам для правильного z-index
  const folderWindows: string[] = []
  const productWindows: string[] = []
  const otherWindows: string[] = []
  
  visibleWindows.forEach((windowId) => {
    if (windowId.endsWith("-folder")) {
      folderWindows.push(windowId)
    } else if (windowId.startsWith("product-")) {
      productWindows.push(windowId)
    } else {
      otherWindows.push(windowId)
    }
  })

  const memoizedWindows = useMemo(
    () => {
      return visibleWindows.map((windowId) => {
        const config = windowConfigs[windowId]
        if (!config) return null

        // Получаем размеры экрана для мобильных
        const screenWidth = typeof window !== "undefined" ? window.innerWidth : 800
        const screenHeight = typeof window !== "undefined" ? window.innerHeight : 600

        // Папки
        if (windowId.endsWith("-folder")) {
          const folderId = windowId.replace("-folder", "")
          const folderIndex = folderWindows.indexOf(windowId)
          // Активное окно имеет z-index 100, остальные папки - 50+
          const zIndex = activeWindow === windowId 
            ? 100 
            : 50 + folderIndex
          return (
            <OSWindow
              key={windowId}
              title={config.title}
              defaultPosition={{ x: 0, y: 0 }}
              defaultSize={{ width: screenWidth, height: screenHeight }}
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
                onOpenProduct={(productId: string) => onProductClick?.(productId)}
              />
            </OSWindow>
          )
        }

        // Продукты
        if (windowId.startsWith("product-")) {
          const productId = windowId.replace("product-", "")
          const productIndex = productWindows.indexOf(windowId)
          // Продукты всегда поверх папок
          const zIndex = activeWindow === windowId 
            ? 100 
            : 60 + productIndex
          return (
            <OSWindow
              key={windowId}
              title={config.title}
              defaultPosition={{ x: 0, y: 0 }}
              defaultSize={{ width: screenWidth, height: screenHeight }}
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

        // Обычные окна
        const Component = windowComponents[windowId]
        if (!Component) return null
        
        // Пропускаем плеер, так как он standalone
        if (windowId === "player") return null
        
        const otherIndex = otherWindows.indexOf(windowId)
        const zIndex = activeWindow === windowId 
          ? 100 
          : 50 + otherIndex

        return (
          <OSWindow
            key={windowId}
            title={config.title}
            defaultPosition={{ x: 0, y: 0 }}
            defaultSize={{ width: screenWidth, height: screenHeight }}
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
    [visibleWindows, activeWindow, folderWindows, productWindows, otherWindows, onClose, onFocus, onMinimize, onProductClick],
  )

  return (
    <Suspense fallback={<WindowSkeleton />}>
      {memoizedWindows}
    </Suspense>
  )
}
