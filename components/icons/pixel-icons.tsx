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
      <rect x="8" y="6" width="16" height="20" fill="#000000" stroke="#FFD700" strokeWidth="2" />
      <rect x="10" y="8" width="12" height="2" fill="#FFD700" />
      <rect x="10" y="12" width="8" height="2" fill="#FFD700" />
      <rect x="10" y="16" width="10" height="2" fill="#FFD700" />
      <circle cx="20" cy="20" r="2" fill="#FFD700" />
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
      <rect x="6" y="10" width="20" height="16" fill="#000000" stroke="#FFD700" strokeWidth="2" />
      <polygon points="6,10 14,10 16,6 26,6 26,10" fill="#FFD700" />
      <rect x="10" y="14" width="12" height="2" fill="#FFD700" />
      <rect x="10" y="18" width="8" height="2" fill="#FFD700" />
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
      <rect x="9" y="7" width="14" height="18" fill="#000000" stroke="#FFD700" strokeWidth="2" />
      <line x1="16" y1="7" x2="16" y2="25" stroke="#FFD700" strokeWidth="2" />
      <rect x="11" y="11" width="4" height="2" fill="#FFD700" />
      <rect x="18" y="11" width="3" height="2" fill="#FFD700" />
      <rect x="11" y="15" width="5" height="2" fill="#FFD700" />
      <rect x="18" y="15" width="3" height="2" fill="#FFD700" />
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
      <circle cx="16" cy="16" r="10" fill="#000000" stroke="#FFD700" strokeWidth="2" />
      <rect x="12" y="14" width="8" height="4" fill="#FFD700" />
      <line x1="12" y1="12" x2="20" y2="12" stroke="#FFD700" strokeWidth="2" />
      <line x1="12" y1="20" x2="20" y2="20" stroke="#FFD700" strokeWidth="2" />
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
      <rect x="10" y="6" width="12" height="20" rx="2" fill="#000000" stroke="#FFD700" strokeWidth="2" />
      <rect x="12" y="8" width="8" height="10" fill="#FFD700" />
      <circle cx="16" cy="22" r="1.5" fill="#FFD700" />
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
      <circle cx="16" cy="16" r="8" fill="#000000" stroke="#FFD700" strokeWidth="2" />
      <circle cx="16" cy="16" r="3" fill="#FFD700" />
      <rect x="15" y="6" width="2" height="4" fill="#FFD700" />
      <rect x="15" y="22" width="2" height="4" fill="#FFD700" />
      <rect x="6" y="15" width="4" height="2" fill="#FFD700" />
      <rect x="22" y="15" width="4" height="2" fill="#FFD700" />
      <rect x="9" y="9" width="2" height="2" fill="#FFD700" />
      <rect x="21" y="9" width="2" height="2" fill="#FFD700" />
      <rect x="9" y="21" width="2" height="2" fill="#FFD700" />
      <rect x="21" y="21" width="2" height="2" fill="#FFD700" />
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
      <rect x="6" y="10" width="20" height="16" fill="#000000" stroke="#FFD700" strokeWidth="2" />
      <polygon points="6,10 14,10 16,6 26,6 26,10" fill="#FFD700" />
      <rect x="10" y="14" width="12" height="2" fill="#FFD700" />
      <rect x="10" y="18" width="8" height="2" fill="#FFD700" />
      <rect x="10" y="22" width="10" height="2" fill="#FFD700" />
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
      <rect x="6" y="10" width="20" height="16" fill="#000000" stroke="#FFD700" strokeWidth="2" />
      <polygon points="6,10 14,10 16,6 26,6 26,10" fill="#FFD700" />
      <rect x="10" y="14" width="12" height="2" fill="#FFD700" />
      <rect x="10" y="18" width="8" height="2" fill="#FFD700" />
      {/* Цифра 1 */}
      <rect x="15" y="22" width="2" height="4" fill="#FFD700" />
      <rect x="14" y="24" width="4" height="2" fill="#FFD700" />
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
      <rect x="6" y="10" width="20" height="16" fill="#000000" stroke="#FFD700" strokeWidth="2" />
      <polygon points="6,10 14,10 16,6 26,6 26,10" fill="#FFD700" />
      <rect x="10" y="14" width="12" height="2" fill="#FFD700" />
      <rect x="10" y="18" width="8" height="2" fill="#FFD700" />
      {/* Цифра 2 */}
      <rect x="13" y="22" width="6" height="2" fill="#FFD700" />
      <rect x="17" y="24" width="2" height="2" fill="#FFD700" />
      <rect x="13" y="24" width="6" height="2" fill="#FFD700" />
      <rect x="13" y="26" width="2" height="2" fill="#FFD700" />
      <rect x="13" y="26" width="6" height="2" fill="#FFD700" />
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
      <rect x="6" y="10" width="20" height="16" fill="#000000" stroke="#FFD700" strokeWidth="2" />
      <polygon points="6,10 14,10 16,6 26,6 26,10" fill="#FFD700" />
      <rect x="10" y="14" width="12" height="2" fill="#FFD700" />
      <rect x="10" y="18" width="8" height="2" fill="#FFD700" />
      {/* Цифра 3 */}
      <rect x="13" y="22" width="6" height="2" fill="#FFD700" />
      <rect x="17" y="24" width="2" height="2" fill="#FFD700" />
      <rect x="13" y="24" width="6" height="2" fill="#FFD700" />
      <rect x="17" y="26" width="2" height="2" fill="#FFD700" />
      <rect x="13" y="26" width="6" height="2" fill="#FFD700" />
    </svg>
  )
}

export function PixelVideoIcon({ size = 32, className = "" }: PixelIconProps) {
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
      {/* Пиксельная иконка видео/камеры */}
      <rect x="6" y="8" width="20" height="16" fill="#000000" stroke="#FFD700" strokeWidth="2" />
      <circle cx="16" cy="16" r="5" fill="#FFD700" />
      <polygon points="13,14 13,18 17,16" fill="#000000" />
      <rect x="8" y="6" width="16" height="2" fill="#FFD700" />
      <rect x="10" y="4" width="12" height="2" fill="#FFD700" />
    </svg>
  )
}

export function PixelPlayerIcon({ size = 32, className = "" }: PixelIconProps) {
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
      {/* Пиксельная иконка плеера в стиле Windows 95 */}
      {/* Корпус плеера */}
      <rect x="4" y="6" width="24" height="20" fill="#000000" stroke="#FFD700" strokeWidth="2" />
      {/* Дисплей */}
      <rect x="6" y="8" width="20" height="8" fill="#000000" stroke="#FFD700" strokeWidth="1" />
      <rect x="7" y="9" width="18" height="6" fill="#FFD700" opacity="0.3" />
      {/* Линии на дисплее (имитация экрана) */}
      <rect x="8" y="10" width="16" height="1" fill="#FFD700" />
      <rect x="8" y="12" width="12" height="1" fill="#FFD700" />
      <rect x="8" y="14" width="14" height="1" fill="#FFD700" />
      {/* Кнопки управления */}
      <rect x="8" y="18" width="4" height="4" fill="#FFD700" stroke="#000000" strokeWidth="1" />
      <rect x="13" y="18" width="4" height="4" fill="#FFD700" stroke="#000000" strokeWidth="1" />
      <rect x="18" y="18" width="4" height="4" fill="#FFD700" stroke="#000000" strokeWidth="1" />
      <rect x="23" y="18" width="4" height="4" fill="#FFD700" stroke="#000000" strokeWidth="1" />
      {/* Иконка play на первой кнопке */}
      <polygon points="9,19 9,21 11,20" fill="#000000" />
    </svg>
  )
}

export function PixelTrashIcon({ size = 32, className = "" }: PixelIconProps) {
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
      {/* Пиксельная иконка корзины */}
      {/* Крышка */}
      <rect x="8" y="6" width="16" height="3" fill="#000000" stroke="#FFD700" strokeWidth="2" />
      <rect x="9" y="7" width="14" height="1" fill="#FFD700" />
      {/* Ручка */}
      <rect x="14" y="4" width="4" height="2" fill="#FFD700" stroke="#000000" strokeWidth="1" />
      {/* Корпус корзины */}
      <rect x="8" y="9" width="16" height="16" fill="#000000" stroke="#FFD700" strokeWidth="2" />
      {/* Вертикальные линии (прутья корзины) */}
      <line x1="11" y1="9" x2="11" y2="25" stroke="#FFD700" strokeWidth="1" />
      <line x1="16" y1="9" x2="16" y2="25" stroke="#FFD700" strokeWidth="1" />
      <line x1="21" y1="9" x2="21" y2="25" stroke="#FFD700" strokeWidth="1" />
      {/* Горизонтальные линии */}
      <line x1="8" y1="13" x2="24" y2="13" stroke="#FFD700" strokeWidth="1" />
      <line x1="8" y1="17" x2="24" y2="17" stroke="#FFD700" strokeWidth="1" />
      <line x1="8" y1="21" x2="24" y2="21" stroke="#FFD700" strokeWidth="1" />
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
  "video": PixelVideoIcon,
  "player": PixelPlayerIcon,
  "trash": PixelTrashIcon,
  "individual-products-folder": PixelLvl2ProfessionalIcon,
  "it-products-folder": PixelLvl3DigitalIcon,
  "vacancies-folder": PixelFolderIcon,
  "advertising-folder": PixelFolderIcon,
}

// Хелпер для получения иконки
export function getPixelIcon(iconId: string): React.ComponentType<PixelIconProps> | null {
  return pixelIcons[iconId] || null
}
