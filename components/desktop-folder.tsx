"use client"

import React, { memo } from "react"
import { soundManager } from "@/lib/sounds"

interface DesktopFolderProps {
  id: string
  icon: string
  label: string
  onClick: () => void
  isOpen?: boolean
}

export const DesktopFolder = memo(function DesktopFolder({
  id,
  icon,
  label,
  onClick,
  isOpen = false,
}: DesktopFolderProps) {
  return (
    <button
      onClick={() => {
        soundManager.playClick()
        onClick()
      }}
      onDoubleClick={() => {
        soundManager.playWindowOpen()
        onClick()
      }}
      aria-label={`Открыть ${label}`}
      className="flex flex-col items-center gap-1 p-2 cursor-pointer hover:bg-[#FFD700]/20 group w-20 select-none animate-slide-up hover-lift"
    >
      <span
        className={`text-4xl drop-shadow-lg group-hover:animate-float transition-transform ${
          isOpen ? "animate-pulse" : ""
        }`}
        aria-hidden="true"
      >
        {icon}
      </span>
      <span className="text-sm text-[#FFD700] text-center font-bold drop-shadow-[1px_1px_0_#000] group-hover:bg-[#FFD700] group-hover:text-black px-2 py-0.5 transition-colors duration-200">
        {label}
      </span>
    </button>
  )
})


