"use client"

import { useEffect, useRef } from "react"
import type { FriendFile } from "@/lib/data/types"

interface PartnerMediaViewerProps {
  items: FriendFile[]
  currentIndex: number
  onClose: () => void
  onNavigate: (newIndex: number) => void
  subfolderName?: string
}

export function PartnerMediaViewer({
  items,
  currentIndex,
  onClose,
  onNavigate,
  subfolderName,
}: PartnerMediaViewerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  const total = items.length
  const current = items[currentIndex]

  // Останавливаем видео при смене слайда
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause()
    }
  }, [currentIndex])

  // Клавиши: Escape — закрыть, стрелки — листать
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
        return
      }
      if (total <= 0) return
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        onNavigate(currentIndex <= 0 ? total - 1 : currentIndex - 1)
      }
      if (e.key === "ArrowRight") {
        e.preventDefault()
        onNavigate(currentIndex >= total - 1 ? 0 : currentIndex + 1)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentIndex, total, onClose, onNavigate])

  if (total === 0) {
    return (
      <div
        className="fixed inset-0 flex items-center justify-center z-[300]"
        style={{ background: "rgba(0,0,0,0.85)" }}
        role="dialog"
        aria-label="Просмотр медиа"
      >
        <div
          className="p-6 text-center"
          style={{
            background: "#f5f0e1",
            border: "2px solid #000000",
          }}
        >
          <p className="text-sm font-bold text-black mb-4">Нет медиа для просмотра</p>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold"
            style={{
              background: "#FFD700",
              color: "#000000",
              border: "2px solid #000000",
            }}
          >
            Закрыть
          </button>
        </div>
      </div>
    )
  }

  const goPrev = () => onNavigate(currentIndex <= 0 ? total - 1 : currentIndex - 1)
  const goNext = () => onNavigate(currentIndex >= total - 1 ? 0 : currentIndex + 1)

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[300] p-4"
      style={{ background: "rgba(0,0,0,0.85)" }}
      role="dialog"
      aria-label="Просмотр медиа"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className="relative flex flex-col max-w-[90vw] max-h-[90vh] w-full"
        style={{
          background: "#f5f0e1",
          border: "2px solid #000000",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header: закрыть + подпись */}
        <div
          className="flex items-center justify-between gap-4 p-2 flex-shrink-0"
          style={{
            background: "#FFD700",
            borderBottom: "2px solid #000000",
          }}
        >
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-lg font-bold leading-none transition-colors hover:opacity-90"
            style={{
              background: "#000000",
              color: "#FFD700",
              border: "2px solid #000000",
            }}
            aria-label="Закрыть"
          >
            ×
          </button>
          <div className="flex-1 min-w-0 text-center">
            <p className="text-xs font-bold text-black truncate">
              {subfolderName && <span>{subfolderName} — </span>}
              {current.name}
            </p>
            <p className="text-[10px] text-black/80">
              {currentIndex + 1} / {total}
            </p>
          </div>
          <div className="w-8" aria-hidden />
        </div>

        {/* Контент: фото или видео */}
        <div className="flex-1 flex items-center justify-center min-h-0 p-4">
          {current.type === "image" && current.filePath ? (
            <img
              src={current.filePath}
              alt={current.name}
              className="max-w-full max-h-[70vh] w-auto h-auto object-contain"
              style={{
                border: "2px solid #000000",
                imageRendering: "crisp-edges",
              }}
            />
          ) : current.type === "video" && current.filePath ? (
            <video
              ref={videoRef}
              src={current.filePath}
              controls
              playsInline
              className="max-w-full max-h-[70vh] w-auto"
              style={{ border: "2px solid #000000" }}
            />
          ) : (
            <p className="text-sm text-black">Не удалось загрузить медиа</p>
          )}
        </div>

        {/* Навигация */}
        <div
          className="flex items-center justify-between gap-2 p-2 flex-shrink-0"
          style={{
            background: "#FFD700",
            borderTop: "2px solid #000000",
          }}
        >
          <button
            type="button"
            onClick={goPrev}
            className="px-3 py-2 text-xs font-bold transition-colors"
            style={{
              background: "#000000",
              color: "#FFD700",
              border: "2px solid #000000",
            }}
          >
            ← Назад
          </button>
          <span className="text-xs font-bold text-black">
            {currentIndex + 1} / {total}
          </span>
          <button
            type="button"
            onClick={goNext}
            className="px-3 py-2 text-xs font-bold transition-colors"
            style={{
              background: "#000000",
              color: "#FFD700",
              border: "2px solid #000000",
            }}
          >
            Вперёд →
          </button>
        </div>
      </div>
    </div>
  )
}
