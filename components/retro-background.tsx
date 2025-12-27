"use client"

import { useState, useEffect } from "react"

interface RetroBackgroundProps {
  isAnimated?: boolean
}

export function RetroBackground({ isAnimated = false }: RetroBackgroundProps) {
  const [showVideo, setShowVideo] = useState(false)

  useEffect(() => {
    if (isAnimated) {
      // Небольшая задержка для плавного перехода
      const timer = setTimeout(() => setShowVideo(true), 150)
      return () => clearTimeout(timer)
    } else {
      setShowVideo(false)
    }
  }, [isAnimated])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Изображение (первый кадр видео) */}
      <img
        src="/background.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
        style={{ 
          imageRendering: "crisp-edges",
          opacity: showVideo ? 0 : 1,
          pointerEvents: showVideo ? "none" : "auto"
        }}
      />
      
      {/* Видео */}
      {showVideo && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{ 
            imageRendering: "crisp-edges",
            opacity: showVideo ? 1 : 0
          }}
        >
          <source src="/background.mp4" type="video/mp4" />
          <source src="/background.webm" type="video/webm" />
          {/* Fallback на изображение */}
          <img src="/background.jpg" alt="Background" />
        </video>
      )}
      
      {/* Затемняющий оверлей для улучшения читаемости интерфейса */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(0, 0, 0, 0.3)",
        }}
      />
      
      {/* Золотые акценты для сохранения стиля сайта */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(255, 215, 0, 0.05) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(255, 215, 0, 0.03) 0%, transparent 40%)
          `,
        }}
      />
    </div>
  )
}
