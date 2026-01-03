"use client"

import { useState } from "react"
import { getPixelIcon } from "@/components/icons/pixel-icons"

interface IconRendererProps {
  icon: string
  label: string
  size?: number
  className?: string
}

export function IconRenderer({ icon, label, size = 48, className = "" }: IconRendererProps) {
  const [imageError, setImageError] = useState(false)
  
  // Проверяем, является ли иконка эмодзи (короткая строка без латинских букв)
  const hasOnlyEmoji = /^[\p{Emoji}\s]+$/u.test(icon) && icon.length <= 4
  
  if (hasOnlyEmoji) {
    return (
      <span className={`text-4xl drop-shadow-lg group-hover:animate-float transition-transform ${className}`} aria-hidden="true">
        {icon}
      </span>
    )
  }
  
  const IconComponent = getPixelIcon(icon)
  const imagePath = `/icons/desktop/${icon}.png`
  
  // Если изображение не загрузилось и есть SVG компонент, используем его
  if (imageError && IconComponent) {
    return (
      <IconComponent size={size} className={`drop-shadow-lg group-hover:animate-float transition-transform ${className}`} />
    )
  }
  
  // Пытаемся использовать изображение
  return (
    <img 
      src={imagePath}
      alt={label}
      width={size}
      height={size}
      className={`drop-shadow-lg group-hover:animate-float transition-transform ${className}`}
      style={{ imageRendering: "pixelated" }}
      onError={() => {
        setImageError(true)
      }}
    />
  )
}

