"use client"

import { useMemo, useRef, useEffect, useState } from "react"
import { friends } from "@/lib/data/friends"
import { useIsMobile } from "@/hooks/use-mobile"
import { ImageFileIcon, VideoFileIcon, DescriptionFileIcon } from "@/components/file-icons"
import type { FriendFile } from "@/lib/data/types"

interface FriendsFolderWindowProps {
  folderId: string
  onOpenProduct?: (productId: string) => void
  onNavigateBack?: () => void
}

export function FriendsFolderWindow({ folderId, onOpenProduct, onNavigateBack }: FriendsFolderWindowProps) {
  const isMobile = useIsMobile()
  const [searchQuery, setSearchQuery] = useState("")
  const [needsScroll, setNeedsScroll] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  // Собираем все файлы из всех друзей
  const allFiles = useMemo(() => {
    const files: (FriendFile & { friendName: string })[] = []
    friends.forEach((friend) => {
      friend.files.forEach((file) => {
        files.push({ ...file, friendName: friend.name })
      })
    })
    return files.sort((a, b) => a.order - b.order)
  }, [])

  // Фильтрация по поисковому запросу
  const filteredFiles = useMemo(() => {
    if (!searchQuery.trim()) return allFiles
    const query = searchQuery.toLowerCase()
    return allFiles.filter(
      (file) =>
        file.name.toLowerCase().includes(query) ||
        file.friendName.toLowerCase().includes(query)
    )
  }, [allFiles, searchQuery])

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
  }, [filteredFiles, searchQuery])

  const handleFileClick = (file: FriendFile) => {
    if (file.type === "description") {
      // Открываем окно с описанием друга
      onOpenProduct?.(`friend-${file.friendId}`)
    } else if (file.filePath) {
      // Открываем медиа-файл в новой вкладке
      window.open(file.filePath, "_blank", "noreferrer")
    }
  }

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
          onClick={onNavigateBack}
          className="px-3 py-1 text-xs font-bold transition-colors"
          style={{
            background: "#000000",
            color: "#FFD700",
            border: "2px solid #FFD700",
          }}
          disabled={!onNavigateBack}
        >
          ← Назад
        </button>
        <div className="flex-1" />
        <span className="text-xs font-bold text-black">
          {filteredFiles.length} {filteredFiles.length === 1 ? 'файл' : filteredFiles.length >= 2 && filteredFiles.length <= 4 ? 'файла' : 'файлов'}
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

      {/* Files Grid */}
      <div
        ref={contentRef}
        className="flex-1 p-4"
        style={{
          background: "#1a1a1a",
          border: "2px solid #000000",
          overflowY: needsScroll ? "auto" : "hidden",
        }}
      >
        {filteredFiles.length === 0 ? (
          <div className="text-center p-8 text-sm" style={{ color: "#ffffff" }}>
            <span>Файлы не найдены</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFiles.map((file) => (
              <button
                key={file.id}
                onClick={(e) => {
                  e.stopPropagation()
                  handleFileClick(file)
                }}
                onDoubleClick={(e) => {
                  e.stopPropagation()
                  handleFileClick(file)
                }}
                className="flex flex-col items-center gap-2 p-3 cursor-pointer transition-colors hover:bg-[#2d2d2d] group"
                style={{
                  minHeight: isMobile ? "120px" : "140px",
                  touchAction: "manipulation",
                }}
              >
                {/* Иконка файла */}
                <div className="flex items-center justify-center" style={{ minHeight: isMobile ? "48px" : "64px" }}>
                  {file.type === "description" ? (
                    <DescriptionFileIcon
                      thumbnail={file.thumbnail || ""}
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
                  className="text-xs font-bold text-center break-words"
                  style={{
                    color: "#ffffff",
                    maxWidth: "100%",
                  }}
                >
                  {file.name}
                </span>
              </button>
            ))}
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
        📂 C:\BARBOSS\Друзья\
      </div>
    </div>
  )
}
