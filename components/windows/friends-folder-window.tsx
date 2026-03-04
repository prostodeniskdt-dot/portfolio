"use client"

import { useMemo, useRef, useEffect, useState } from "react"
import { friends } from "@/lib/data/friends"
import { useIsMobile } from "@/hooks/use-mobile"
import { ImageFileIcon, VideoFileIcon, DescriptionFileIcon, FolderIcon } from "@/components/file-icons"
import { PartnerMediaViewer } from "./partner-media-viewer"
import type { FriendFile, FriendSubfolder } from "@/lib/data/types"

function FilePreviewImage({ filePath, name, isMobile }: { filePath: string; name: string; isMobile: boolean }) {
  const [hasError, setHasError] = useState(false)
  const size = isMobile ? 48 : 64
  if (hasError) {
    return <ImageFileIcon size={size} />
  }
  return (
    <img
      src={filePath}
      alt={name}
      className="w-full h-full object-cover"
      style={{
        border: "2px solid #000000",
        imageRendering: "crisp-edges",
        maxHeight: size,
        maxWidth: size,
        minHeight: size,
        minWidth: size,
      }}
      loading="lazy"
      onError={() => setHasError(true)}
    />
  )
}

interface FriendsFolderWindowProps {
  folderId: string
  onOpenProduct?: (productId: string) => void
  onNavigateBack?: () => void
}

export function FriendsFolderWindow({ 
  folderId, 
  onOpenProduct, 
  onNavigateBack
}: FriendsFolderWindowProps) {
  const isMobile = useIsMobile()
  const [searchQuery, setSearchQuery] = useState("")
  const [needsScroll, setNeedsScroll] = useState(false)
  const [currentSubfolderId, setCurrentSubfolderId] = useState<string | null>(null)
  const [mediaViewerOpen, setMediaViewerOpen] = useState(false)
  const [mediaViewerIndex, setMediaViewerIndex] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)

  // Список только медиа (фото + видео с filePath) текущей подпапки для просмотрщика
  const mediaViewerItems = useMemo(() => {
    if (!currentSubfolder) return []
    return currentSubfolder.files
      .filter(
        (f): f is FriendFile & { filePath: string } =>
          (f.type === "image" || f.type === "video") && Boolean(f.filePath)
      )
      .sort((a, b) => a.order - b.order)
  }, [currentSubfolder])

  // Если открыта подпапка, показываем файлы из неё
  const currentSubfolder = useMemo(() => {
    if (!currentSubfolderId) return null
    for (const friend of friends) {
      if (friend.subfolders) {
        const subfolder = friend.subfolders.find(sf => sf.id === currentSubfolderId)
        if (subfolder) return subfolder
      }
    }
    return null
  }, [currentSubfolderId])

  // Если открыта подпапка, показываем файлы, иначе показываем подпапки
  const items = useMemo(() => {
    if (currentSubfolder) {
      // Показываем файлы из подпапки
      return currentSubfolder.files.sort((a, b) => a.order - b.order)
    } else {
      // Показываем подпапки
      const subfolders: (FriendSubfolder & { friendId: string })[] = []
      friends.forEach((friend) => {
        if (friend.subfolders) {
          friend.subfolders.forEach((subfolder) => {
            subfolders.push({ ...subfolder, friendId: friend.id })
          })
        }
      })
      return subfolders
    }
  }, [currentSubfolder])

  // Фильтрация по поисковому запросу
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items
    const query = searchQuery.toLowerCase()
    
    if (currentSubfolder) {
      // Фильтруем файлы
      const files = items as FriendFile[]
      return files.filter(
        (item) =>
          item.name.toLowerCase().includes(query)
      )
    } else {
      // Фильтруем подпапки
      const subfolders = items as (FriendSubfolder & { friendId: string })[]
      return subfolders.filter(
        (item) =>
          item.name.toLowerCase().includes(query)
      )
    }
  }, [items, searchQuery, currentSubfolder])

  useEffect(() => {
    const checkScroll = () => {
      if (contentRef.current) {
        const { scrollHeight, clientHeight } = contentRef.current
        setNeedsScroll(scrollHeight > clientHeight)
      }
    }

    checkScroll()

    const resizeObserver = new ResizeObserver(() => {
      checkScroll()
    })

    if (contentRef.current) {
      resizeObserver.observe(contentRef.current)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [filteredItems, searchQuery])

  const openMediaViewer = (file: FriendFile) => {
    const idx = mediaViewerItems.findIndex((f) => f.id === file.id)
    setMediaViewerIndex(idx >= 0 ? idx : 0)
    setMediaViewerOpen(true)
  }

  const handleItemClick = (item: FriendFile | (FriendSubfolder & { friendId: string })) => {
    if (currentSubfolder) {
      // Клик по файлу в подпапке
      const file = item as FriendFile
      if (file.type === "description") {
        onOpenProduct?.(`friend-${file.friendId}`)
      } else if ((file.type === "image" || file.type === "video") && file.filePath) {
        openMediaViewer(file)
      }
    } else {
      // Клик по подпапке
      const subfolder = item as FriendSubfolder & { friendId: string }
      setCurrentSubfolderId(subfolder.id)
    }
  }

  const handleBack = () => {
    if (currentSubfolderId) {
      setCurrentSubfolderId(null) // Закрываем подпапку
    } else if (onNavigateBack) {
      onNavigateBack()
    }
  }

  const displayCount = filteredItems.length
  const itemType = currentSubfolder ? "файл" : "папка"
  const countText = displayCount === 1 
    ? `1 ${itemType}` 
    : displayCount >= 2 && displayCount <= 4 
      ? `${displayCount} ${itemType === "файл" ? "файла" : "папки"}`
      : `${displayCount} ${itemType === "файл" ? "файлов" : "папок"}`

  return (
    <div className="text-black text-sm h-full flex flex-col">
      {/* Toolbar */}
      <div
        className="flex items-center gap-2 p-2 mb-2"
        style={{
          background: "#FFD700",
          border: "2px solid #000000",
        }}
      >
        <button
          onClick={handleBack}
          className="px-3 py-1 text-xs font-bold transition-colors"
          style={{
            background: "#000000",
            color: "#FFD700",
            border: "2px solid #FFD700",
          }}
          disabled={!currentSubfolderId && !onNavigateBack}
        >
          ← Назад
        </button>
        <div className="flex-1" />
        <span className="text-xs font-bold text-black">
          {countText}
        </span>
      </div>

      {/* Search */}
      <div className="mb-2 px-2">
        <input
          type="text"
          placeholder="🔍 Поиск..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 text-xs"
          style={{
            background: "#ffffff",
            border: "3px solid",
            borderColor: "#000000 #FFD700 #FFD700 #000000",
          }}
        />
      </div>

      {/* Items Grid */}
      <div
        ref={contentRef}
        className="flex-1 p-2 sm:p-3 lg:p-4"
        style={{
          background: "#f5f0e1",
          border: "2px solid #000000",
          overflowY: needsScroll ? "auto" : "hidden",
        }}
      >
        {filteredItems.length === 0 ? (
          <div className="text-center p-8 text-sm text-black">
            <span>{currentSubfolder ? "Файлы не найдены" : "Папки не найдены"}</span>
          </div>
        ) : (
          <div className={`grid gap-3 sm:gap-4 ${
            currentSubfolder && ["cocktail-design-folder", "enjoy-barware-folder", "steelbar-folder"].includes(currentSubfolder.id)
              ? isMobile 
                ? "grid-cols-2" 
                : "sm:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          }`}>
            {filteredItems.map((item) => {
              if (currentSubfolder) {
                // Отображаем файлы
                const file = item as FriendFile
                const isMediaLink = (file.type === "image" || file.type === "video") && file.filePath
                const fileContent = (
                  <>
                    {/* Превью файла или иконка */}
                    <div 
                      className="flex items-center justify-center group-hover:scale-105 transition-transform"
                      style={{ 
                        minHeight: isMobile ? "48px" : "64px",
                        width: isMobile ? "48px" : "64px",
                        maxWidth: isMobile ? "48px" : "64px",
                      }}
                    >
                      {file.type === "description" ? (
                        <DescriptionFileIcon
                          size={isMobile ? 48 : 64}
                          alt={file.name}
                        />
                      ) : file.type === "image" && file.filePath ? (
                        <FilePreviewImage
                          filePath={file.filePath}
                          name={file.name}
                          isMobile={isMobile}
                        />
                      ) : file.type === "video" && file.filePath ? (
                        <video
                          src={file.filePath}
                          className="w-full h-full object-cover"
                          style={{
                            border: "2px solid #000000",
                            maxHeight: isMobile ? "48px" : "64px",
                            maxWidth: isMobile ? "48px" : "64px",
                          }}
                          muted
                          playsInline
                          preload="metadata"
                          onMouseEnter={(e) => {
                            const video = e.currentTarget
                            video.currentTime = 0.1
                          }}
                        />
                      ) : (
                        <VideoFileIcon
                          size={isMobile ? 48 : 64}
                        />
                      )}
                    </div>
                    <span
                      className="text-xs font-bold text-center break-words text-black"
                      style={{ maxWidth: "100%" }}
                    >
                      {file.name}
                    </span>
                  </>
                )
                const sharedClasses = "flex flex-col items-center gap-2 p-2 sm:p-3 cursor-pointer transition-colors group focus-visible:outline-none"
                const sharedStyle = { minHeight: isMobile ? "120px" : "140px", touchAction: "manipulation" as const }

                if (isMediaLink) {
                  return (
                    <button
                      key={file.id}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        openMediaViewer(file)
                      }}
                      onDoubleClick={(e) => {
                        e.stopPropagation()
                        openMediaViewer(file)
                      }}
                      className={sharedClasses}
                      style={sharedStyle}
                    >
                      {fileContent}
                    </button>
                  )
                }

                return (
                  <button
                    key={file.id}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleItemClick(file)
                    }}
                    onDoubleClick={(e) => {
                      e.stopPropagation()
                      handleItemClick(file)
                    }}
                    className={sharedClasses}
                    style={sharedStyle}
                  >
                    {fileContent}
                  </button>
                )
              } else {
                // Отображаем подпапки
                const subfolder = item as FriendSubfolder & { friendId: string }
                return (
                  <button
                    key={subfolder.id}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleItemClick(subfolder)
                    }}
                    onDoubleClick={(e) => {
                      e.stopPropagation()
                      handleItemClick(subfolder)
                    }}
                    className="flex flex-col items-center gap-2 p-2 sm:p-3 cursor-pointer transition-colors group focus-visible:outline-none"
                    style={{
                      minHeight: isMobile ? "120px" : "140px",
                      touchAction: "manipulation",
                    }}
                  >
                    {/* Иконка папки с логотипом */}
                    <div className="flex items-center justify-center" style={{ minHeight: isMobile ? "48px" : "64px" }}>
                      <FolderIcon
                        logo={subfolder.logo}
                        size={isMobile ? 48 : 64}
                        className="group-hover:scale-105 transition-transform"
                      />
                    </div>

                    {/* Имя папки */}
                    <span
                      className="text-xs font-bold text-center break-words text-black"
                      style={{
                        maxWidth: "100%",
                      }}
                    >
                      {subfolder.name}
                    </span>
                  </button>
                )
              }
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        className="p-2 text-xs font-bold"
        style={{
          background: "#000000",
          color: "#FFD700",
          borderTop: "2px solid #FFD700",
        }}
      >
        📂 C:\BARBOSS\Друзья{currentSubfolder ? `\\${currentSubfolder.name}` : ""}\
      </div>

      {/* Встроенный просмотрщик медиа */}
      {mediaViewerOpen && (
        <PartnerMediaViewer
          items={mediaViewerItems}
          currentIndex={mediaViewerIndex}
          onClose={() => setMediaViewerOpen(false)}
          onNavigate={(newIndex) => {
            const len = mediaViewerItems.length
            if (len <= 0) return
            const idx = newIndex < 0 ? len - 1 : newIndex >= len ? 0 : newIndex
            setMediaViewerIndex(idx)
          }}
          subfolderName={currentSubfolder?.name}
        />
      )}
    </div>
  )
}
