"use client"

import { useMemo, useRef, useEffect, useState } from "react"
import { friends } from "@/lib/data/friends"
import { useIsMobile } from "@/hooks/use-mobile"
import { ImageFileIcon, VideoFileIcon, DescriptionFileIcon, FolderIcon } from "@/components/file-icons"
import type { FriendFile, FriendSubfolder } from "@/lib/data/types"

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
  const contentRef = useRef<HTMLDivElement>(null)

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

  const handleItemClick = (item: FriendFile | (FriendSubfolder & { friendId: string })) => {
    if (currentSubfolder) {
      // Клик по файлу в подпапке
      const file = item as FriendFile
      if (file.type === "description") {
        onOpenProduct?.(`friend-${file.friendId}`)
      } else if (file.filePath) {
        window.open(file.filePath, "_blank", "noreferrer")
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {filteredItems.map((item) => {
              if (currentSubfolder) {
                // Отображаем файлы
                const file = item as FriendFile
                return (
                  <button
                    key={file.id}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleItemClick(file)
                    }}
                    onDoubleClick={(e) => {
                      e.stopPropagation()
                      handleItemClick(file)
                    }}
                    className="flex flex-col items-center gap-2 p-2 sm:p-3 cursor-pointer transition-colors hover:bg-[#FFD700] group"
                    style={{
                      background: "#ffffff",
                      border: "2px solid #000000",
                      minHeight: isMobile ? "120px" : "140px",
                      touchAction: "manipulation",
                    }}
                  >
                    {/* Иконка файла */}
                    <div className="flex items-center justify-center" style={{ minHeight: isMobile ? "48px" : "64px" }}>
                      {file.type === "description" ? (
                        <DescriptionFileIcon
                          size={isMobile ? 48 : 64}
                          alt={file.name}
                          className="group-hover:scale-105 transition-transform"
                        />
                      ) : file.type === "image" ? (
                        <ImageFileIcon
                          size={isMobile ? 48 : 64}
                          className="group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <VideoFileIcon
                          size={isMobile ? 48 : 64}
                          className="group-hover:scale-105 transition-transform"
                        />
                      )}
                    </div>

                    {/* Имя файла */}
                    <span
                      className="text-xs font-bold text-center break-words text-black"
                      style={{
                        maxWidth: "100%",
                      }}
                    >
                      {file.name}
                    </span>
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
                    className="flex flex-col items-center gap-2 p-2 sm:p-3 cursor-pointer transition-colors hover:bg-[#FFD700] group"
                    style={{
                      background: "#ffffff",
                      border: "2px solid #000000",
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
    </div>
  )
}
