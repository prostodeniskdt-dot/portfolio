"use client"

import React from "react"
import { useIsMobile } from "@/hooks/use-mobile"

interface FileIconProps {
  size?: number
  className?: string
}

// Иконка папки - желтая папка
export function FolderIcon({ size = 64, className = "", logo }: FileIconProps & { logo?: string }) {
  const isMobile = useIsMobile()
  const iconSize = isMobile ? 48 : size
  const [imageError, setImageError] = React.useState(false)

  // Если есть логотип, показываем его
  if (logo && !imageError) {
    return (
      <img
        src={logo}
        alt="Folder"
        width={iconSize}
        height={iconSize}
        className={className}
        style={{ 
          imageRendering: "crisp-edges",
          objectFit: "cover",
          border: "2px solid #000000"
        }}
        onError={() => setImageError(true)}
      />
    )
  }

  // Стандартная желтая папка
  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 64 64"
      className={className}
      style={{ imageRendering: "pixelated" }}
    >
      {/* Желтая папка */}
      <path d="M8 16 L8 56 L56 56 L56 24 L32 24 L28 16 Z" fill="#FFD700" stroke="#000000" strokeWidth="2" />
      <path d="M8 16 L28 16 L32 24 L56 24" fill="#FFA500" stroke="#000000" strokeWidth="1" />
    </svg>
  )
}

// Иконка изображения - белый лист с синим пейзажем
export function ImageFileIcon({ size = 64, className = "" }: FileIconProps) {
  const isMobile = useIsMobile()
  const iconSize = isMobile ? 48 : size

  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 64 64"
      className={className}
      style={{ imageRendering: "pixelated" }}
    >
      {/* Белый фон листа */}
      <rect width="64" height="64" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      
      {/* Синий пейзаж */}
      <rect x="8" y="40" width="48" height="16" fill="#4A90E2" />
      {/* Горы */}
      <polygon points="8,40 20,28 32,32 44,24 56,28 56,40" fill="#5BA3F5" />
      {/* Солнце/луна */}
      <circle cx="48" cy="20" r="6" fill="#FFD700" />
    </svg>
  )
}

// Иконка видео - белый лист с видеокамерой
export function VideoFileIcon({ size = 64, className = "" }: FileIconProps) {
  const isMobile = useIsMobile()
  const iconSize = isMobile ? 48 : size

  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 64 64"
      className={className}
      style={{ imageRendering: "pixelated" }}
    >
      {/* Белый фон листа */}
      <rect width="64" height="64" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      
      {/* Видеокамера */}
      <rect x="16" y="20" width="32" height="24" fill="#333333" rx="2" />
      <rect x="18" y="22" width="28" height="20" fill="#1a1a1a" />
      {/* Объектив */}
      <circle cx="32" cy="32" r="8" fill="#4A90E2" />
      <circle cx="32" cy="32" r="5" fill="#1a1a1a" />
      {/* Видоискатель */}
      <rect x="40" y="16" width="6" height="4" fill="#333333" />
    </svg>
  )
}

// Компонент для иконки файла описания (документ Word)
interface DescriptionFileIconProps {
  size?: number
  className?: string
  alt?: string
}

export function DescriptionFileIcon({ 
  size = 64, 
  className = "",
  alt = "Описание"
}: DescriptionFileIconProps) {
  const isMobile = useIsMobile()
  const iconSize = isMobile ? 48 : size

  // Иконка документа Word - белый лист с синими линиями текста
  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 64 64"
      className={className}
      style={{ imageRendering: "pixelated" }}
    >
      {/* Белый фон листа */}
      <rect width="64" height="64" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      
      {/* Синий прямоугольник вверху (как в Word) */}
      <rect x="8" y="8" width="48" height="12" fill="#2B579A" />
      
      {/* Белые линии в синем прямоугольнике */}
      <line x1="12" y1="12" x2="52" y2="12" stroke="#FFFFFF" strokeWidth="1.5" />
      <line x1="12" y1="15" x2="40" y2="15" stroke="#FFFFFF" strokeWidth="1.5" />
      
      {/* Синие линии текста */}
      <line x1="12" y1="26" x2="52" y2="26" stroke="#2B579A" strokeWidth="2" />
      <line x1="12" y1="32" x2="52" y2="32" stroke="#2B579A" strokeWidth="2" />
      <line x1="12" y1="38" x2="52" y2="38" stroke="#2B579A" strokeWidth="2" />
      <line x1="12" y1="44" x2="48" y2="44" stroke="#2B579A" strokeWidth="2" />
      <line x1="12" y1="50" x2="44" y2="50" stroke="#2B579A" strokeWidth="2" />
    </svg>
  )
}
