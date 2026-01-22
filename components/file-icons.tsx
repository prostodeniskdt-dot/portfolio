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

// Компонент для кастомного превью описания
interface DescriptionFileIconProps {
  thumbnail: string
  size?: number
  className?: string
  alt?: string
}

export function DescriptionFileIcon({ 
  thumbnail, 
  size = 64, 
  className = "",
  alt = "Описание"
}: DescriptionFileIconProps) {
  const isMobile = useIsMobile()
  const iconSize = isMobile ? 48 : size
  const [imageError, setImageError] = React.useState(false)

  if (imageError) {
    // Fallback на простую иконку документа
    return (
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 64 64"
        className={className}
        style={{ imageRendering: "pixelated" }}
      >
        <rect width="64" height="64" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
        <rect x="16" y="16" width="32" height="32" fill="#4A90E2" />
        <line x1="20" y1="24" x2="44" y2="24" stroke="#000000" strokeWidth="2" />
        <line x1="20" y1="32" x2="44" y2="32" stroke="#000000" strokeWidth="2" />
        <line x1="20" y1="40" x2="36" y2="40" stroke="#000000" strokeWidth="2" />
      </svg>
    )
  }

  return (
    <img
      src={thumbnail}
      alt={alt}
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
