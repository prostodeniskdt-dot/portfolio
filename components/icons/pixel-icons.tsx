"use client"

import type React from "react"

interface PixelIconProps {
  size?: number
  className?: string
}

// Базовый стиль для всех иконок
const iconStyle: React.CSSProperties = {
  imageRendering: "crisp-edges",
}

export function PixelAboutIcon({ size = 32, className = "" }: PixelIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={className}
      style={iconStyle}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Пиксельная иконка "О школе" - книга/шляпа */}
      <rect x="8" y="6" width="16" height="20" fill="#000000" stroke="#b8860b" strokeWidth="2" />
      <rect x="10" y="8" width="12" height="2" fill="#b8860b" />
      <rect x="10" y="12" width="8" height="2" fill="#b8860b" />
      <rect x="10" y="16" width="10" height="2" fill="#b8860b" />
      <circle cx="20" cy="20" r="2" fill="#b8860b" />
    </svg>
  )
}

export function PixelProductsIcon({ size = 32, className = "" }: PixelIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={className}
      style={iconStyle}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Пиксельная иконка папки */}
      <rect x="6" y="10" width="20" height="16" fill="#000000" stroke="#b8860b" strokeWidth="2" />
      <polygon points="6,10 14,10 16,6 26,6 26,10" fill="#b8860b" />
      <rect x="10" y="14" width="12" height="2" fill="#b8860b" />
      <rect x="10" y="18" width="8" height="2" fill="#b8860b" />
    </svg>
  )
}

export function PixelCoursesIcon({ size = 32, className = "" }: PixelIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={className}
      style={iconStyle}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Пиксельная иконка книги - исправлена для предотвращения выхода за рамки */}
      <rect x="9" y="7" width="14" height="18" fill="#000000" stroke="#b8860b" strokeWidth="2" />
      <line x1="16" y1="7" x2="16" y2="25" stroke="#b8860b" strokeWidth="2" />
      <rect x="11" y="11" width="4" height="2" fill="#b8860b" />
      <rect x="18" y="11" width="3" height="2" fill="#b8860b" />
      <rect x="11" y="15" width="5" height="2" fill="#b8860b" />
      <rect x="18" y="15" width="3" height="2" fill="#b8860b" />
    </svg>
  )
}

export function PixelPricesIcon({ size = 32, className = "" }: PixelIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={className}
      style={iconStyle}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Пиксельная иконка денег/монеты */}
      <circle cx="16" cy="16" r="10" fill="#000000" stroke="#b8860b" strokeWidth="2" />
      <rect x="12" y="14" width="8" height="4" fill="#b8860b" />
      <line x1="12" y1="12" x2="20" y2="12" stroke="#b8860b" strokeWidth="2" />
      <line x1="12" y1="20" x2="20" y2="20" stroke="#b8860b" strokeWidth="2" />
    </svg>
  )
}

export function PixelContactIcon({ size = 32, className = "" }: PixelIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={className}
      style={iconStyle}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Пиксельная иконка телефона */}
      <rect x="10" y="6" width="12" height="20" rx="2" fill="#000000" stroke="#b8860b" strokeWidth="2" />
      <rect x="12" y="8" width="8" height="10" fill="#b8860b" />
      <circle cx="16" cy="22" r="1.5" fill="#b8860b" />
    </svg>
  )
}

export function PixelSettingsIcon({ size = 32, className = "" }: PixelIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={className}
      style={iconStyle}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Пиксельная иконка шестеренки */}
      <circle cx="16" cy="16" r="8" fill="#000000" stroke="#b8860b" strokeWidth="2" />
      <circle cx="16" cy="16" r="3" fill="#b8860b" />
      <rect x="15" y="6" width="2" height="4" fill="#b8860b" />
      <rect x="15" y="22" width="2" height="4" fill="#b8860b" />
      <rect x="6" y="15" width="4" height="2" fill="#b8860b" />
      <rect x="22" y="15" width="4" height="2" fill="#b8860b" />
      <rect x="9" y="9" width="2" height="2" fill="#b8860b" />
      <rect x="21" y="9" width="2" height="2" fill="#b8860b" />
      <rect x="9" y="21" width="2" height="2" fill="#b8860b" />
      <rect x="21" y="21" width="2" height="2" fill="#b8860b" />
    </svg>
  )
}

export function PixelFolderIcon({ size = 32, className = "" }: PixelIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={className}
      style={iconStyle}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Пиксельная иконка папки */}
      <rect x="6" y="10" width="20" height="16" fill="#000000" stroke="#b8860b" strokeWidth="2" />
      <polygon points="6,10 14,10 16,6 26,6 26,10" fill="#b8860b" />
      <rect x="10" y="14" width="12" height="2" fill="#b8860b" />
      <rect x="10" y="18" width="8" height="2" fill="#b8860b" />
      <rect x="10" y="22" width="10" height="2" fill="#b8860b" />
    </svg>
  )
}

export function PixelLvl1BasicIcon({ size = 32, className = "" }: PixelIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={className}
      style={iconStyle}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Пиксельная иконка папки LVL 1 */}
      <rect x="6" y="10" width="20" height="16" fill="#000000" stroke="#b8860b" strokeWidth="2" />
      <polygon points="6,10 14,10 16,6 26,6 26,10" fill="#b8860b" />
      <rect x="10" y="14" width="12" height="2" fill="#b8860b" />
      <rect x="10" y="18" width="8" height="2" fill="#b8860b" />
      <text x="16" y="26" fontSize="8" fill="#b8860b" textAnchor="middle" fontWeight="bold">1</text>
    </svg>
  )
}

export function PixelLvl2ProfessionalIcon({ size = 32, className = "" }: PixelIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={className}
      style={iconStyle}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Пиксельная иконка папки LVL 2 */}
      <rect x="6" y="10" width="20" height="16" fill="#000000" stroke="#b8860b" strokeWidth="2" />
      <polygon points="6,10 14,10 16,6 26,6 26,10" fill="#b8860b" />
      <rect x="10" y="14" width="12" height="2" fill="#b8860b" />
      <rect x="10" y="18" width="8" height="2" fill="#b8860b" />
      <text x="16" y="26" fontSize="8" fill="#b8860b" textAnchor="middle" fontWeight="bold">2</text>
    </svg>
  )
}

export function PixelLvl3DigitalIcon({ size = 32, className = "" }: PixelIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={className}
      style={iconStyle}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Пиксельная иконка папки LVL 3 */}
      <rect x="6" y="10" width="20" height="16" fill="#000000" stroke="#b8860b" strokeWidth="2" />
      <polygon points="6,10 14,10 16,6 26,6 26,10" fill="#b8860b" />
      <rect x="10" y="14" width="12" height="2" fill="#b8860b" />
      <rect x="10" y="18" width="8" height="2" fill="#b8860b" />
      <text x="16" y="26" fontSize="8" fill="#b8860b" textAnchor="middle" fontWeight="bold">3</text>
    </svg>
  )
}

// Маппинг иконок по ID
export const pixelIcons: Record<string, React.ComponentType<PixelIconProps>> = {
  "about": PixelAboutIcon,
  "products-folder": PixelFolderIcon,
  "individual-courses": PixelCoursesIcon,
  "prices": PixelPricesIcon,
  "contact": PixelContactIcon,
  "settings": PixelSettingsIcon,
  "folder": PixelFolderIcon,
  "lvl1-basic-folder": PixelLvl1BasicIcon,
  "lvl2-professional-folder": PixelLvl2ProfessionalIcon,
  "lvl3-digital-folder": PixelLvl3DigitalIcon,
}

// Хелпер для получения иконки
export function getPixelIcon(iconId: string): React.ComponentType<PixelIconProps> | null {
  return pixelIcons[iconId] || null
}
