"use client"

import { useState, useEffect, useRef } from "react"

interface RetroBackgroundProps {
  isAnimated?: boolean
  isMobile?: boolean
}

export function RetroBackground({ isAnimated = false, isMobile = false }: RetroBackgroundProps) {
  const [showVideo, setShowVideo] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (isAnimated) {
      // Небольшая задержка для плавного перехода
      const timer = setTimeout(() => setShowVideo(true), 150)
      return () => clearTimeout(timer)
    } else {
      setShowVideo(false)
    }
  }, [isAnimated])

  // Явный запуск видео после монтирования
  useEffect(() => {
    if (showVideo && videoRef.current) {
      const video = videoRef.current
      
      const handleCanPlay = () => {
        video.play().catch((error) => {
          console.error("Ошибка воспроизведения видео:", error)
        })
      }

      const handleError = (e: Event) => {
        console.error("Ошибка загрузки видео:", e)
      }

      video.addEventListener("canplay", handleCanPlay)
      video.addEventListener("error", handleError)

      // Если видео уже загружено, запускаем сразу
      if (video.readyState >= 3) {
        video.play().catch((error) => {
          console.error("Ошибка воспроизведения видео:", error)
        })
      }

      return () => {
        video.removeEventListener("canplay", handleCanPlay)
        video.removeEventListener("error", handleError)
      }
    }
  }, [showVideo])

  return (
    <div 
      className="absolute inset-0 overflow-hidden"
      style={isMobile ? { background: "#000000" } : {}}
    >
      {/* Изображение (первый кадр видео) - скрыто на мобильных */}
      {!isMobile && (
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
      )}
      
      {/* Видео - скрыто на мобильных */}
      {!isMobile && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{ 
            imageRendering: "crisp-edges",
            opacity: showVideo ? 1 : 0,
            pointerEvents: showVideo ? "auto" : "none",
            display: showVideo ? "block" : "none"
          }}
        >
          <source src="/background.mp4" type="video/mp4" />
          <source src="/background.webm" type="video/webm" />
          {/* Fallback сообщение */}
          Ваш браузер не поддерживает видео.
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
