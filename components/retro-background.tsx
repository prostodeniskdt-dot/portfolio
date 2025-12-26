"use client"

import Image from "next/image"

export function RetroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ imageRendering: "crisp-edges" }}>
      {/* Базовый фон - белый для архитектурного чертежа */}
      <div
        className="absolute inset-0"
        style={{
          background: "#ffffff",
        }}
      />
      
      {/* Архитектурный чертеж - основное изображение */}
      <div className="absolute inset-0">
        <Image
          src="/architectural-drawing.png"
          alt="Architectural Drawing"
          fill
          className="object-contain"
          priority
          style={{ imageRendering: "crisp-edges" }}
        />
      </div>
    </div>
  )
}
