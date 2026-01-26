"use client"

import { useState, useRef, useEffect, MouseEvent } from "react"
import { soundManager } from "@/lib/sounds"

const defaultTracks = [
  { id: 1, name: "Музыка для работы 1", url: "/music/Музыка для работы 1.mp3" },
  { id: 2, name: "Музыка для работы 2", url: "/music/Музыка для работы 2.mp3" },
  { id: 3, name: "Музыка для работы 3", url: "/music/Музыка для работы 3.mp3" },
  { id: 4, name: "Музыка для работы 4", url: "/music/Музыка для работы 4.mp3" },
  { id: 5, name: "Музыка для работы 5", url: "/music/Музыка для работы 5.mp3" },
  { id: 6, name: "Музыка для работы 6", url: "/music/Музыка для работы 6.mp3" },
  { id: 7, name: "Музыка для работы 7", url: "/music/Музыка для работы 7.mp3" },
]

interface StandalonePlayerProps {
  onClose: () => void
  defaultPosition?: { x: number; y: number }
}

export function StandalonePlayer({ onClose, defaultPosition = { x: 100, y: 100 } }: StandalonePlayerProps) {
  const [position, setPosition] = useState(() => {
    if (typeof window !== "undefined") {
      const isMobileDevice = window.innerWidth < 768
      if (isMobileDevice) {
        // Центрируем снизу на мобильных
        return { x: window.innerWidth / 2 - 200, y: window.innerHeight - 250 }
      }
    }
    return defaultPosition
  })
  const [isDragging, setIsDragging] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const dragOffset = useRef({ x: 0, y: 0 })
  const playerRef = useRef<HTMLDivElement>(null)

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const audioRef = useRef<HTMLAudioElement>(null)

  const currentTrack = defaultTracks[currentTrackIndex]

  // Звук при открытии плеера
  useEffect(() => {
    soundManager.playWindowOpen()
  }, [])

  // Определение мобильного устройства
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth < 768 || 
        ('ontouchstart' in window || navigator.maxTouchPoints > 0)
      setIsMobile(isMobileDevice)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Drag handlers
  const handleHeaderMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (isMobile) return // Отключаем перетаскивание на мобильных
    if (e.button !== 0) return
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
    const rect = playerRef.current?.getBoundingClientRect()
    if (rect) {
      dragOffset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = e.clientX - dragOffset.current.x
        const newY = e.clientY - dragOffset.current.y

        // Constrain position to viewport
        const maxX = typeof window !== "undefined" ? window.innerWidth - 400 : 0
        const maxY = typeof window !== "undefined" ? window.innerHeight - 80 : 0

        const constrainedX = Math.max(0, Math.min(newX, maxX))
        const constrainedY = Math.max(0, Math.min(newY, maxY))

        setPosition({
          x: constrainedX,
          y: constrainedY,
        })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove as any)
      window.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove as any)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, isMobile])

  // Audio handlers
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => {
      setIsPlaying(false)
      handleNext()
    }

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("loadedmetadata", updateDuration)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("loadedmetadata", updateDuration)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [currentTrackIndex])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = volume
  }, [volume])

  const handlePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.play()
    setIsPlaying(true)
  }

  const handlePause = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    setIsPlaying(false)
  }

  const handleStop = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    audio.currentTime = 0
    setIsPlaying(false)
    setCurrentTime(0)
  }

  const handleNext = () => {
    const nextIndex = (currentTrackIndex + 1) % defaultTracks.length
    setCurrentTrackIndex(nextIndex)
    setCurrentTime(0)
    if (isPlaying) {
      setTimeout(() => {
        const audio = audioRef.current
        if (audio) audio.play()
      }, 100)
    }
  }

  const handlePrevious = () => {
    const prevIndex = (currentTrackIndex - 1 + defaultTracks.length) % defaultTracks.length
    setCurrentTrackIndex(prevIndex)
    setCurrentTime(0)
    if (isPlaying) {
      setTimeout(() => {
        const audio = audioRef.current
        if (audio) audio.play()
      }, 100)
    }
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    if (!audio || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = x / rect.width
    const newTime = percentage * duration
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleClose = () => {
    const audio = audioRef.current
    if (audio) {
      audio.pause()
      audio.currentTime = 0
    }
    setIsPlaying(false)
    soundManager.playWindowClose()
    onClose()
  }

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "00:00"
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const progressPercent = duration ? (currentTime / duration) * 100 : 0

  const buttonSize = isMobile ? { width: "44px", height: "44px", fontSize: "16px" } : { width: "32px", height: "24px", fontSize: "10px" }

  return (
    <div
      ref={playerRef}
      className="fixed select-none"
      style={{
        left: isMobile ? "50%" : `${position.x}px`,
        top: isMobile ? "auto" : `${position.y}px`,
        bottom: isMobile ? "20px" : "auto",
        transform: isMobile ? "translateX(-50%)" : "none",
        width: isMobile ? "calc(100vw - 20px)" : "400px",
        maxWidth: isMobile ? "400px" : undefined,
        zIndex: 1000,
        background: "linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 50%, #0d0d0d 100%)",
        fontFamily: "'Arial', sans-serif",
        border: "3px solid #FFD700",
        borderRadius: "4px",
        boxShadow: "inset 0 0 10px rgba(0,0,0,0.8), 0 4px 20px rgba(0,0,0,0.5)",
      }}
    >
      <audio ref={audioRef} src={currentTrack.url} preload="metadata" />

      {/* Winamp Header with drag and close */}
      <div
        className={`px-3 py-1 flex items-center justify-between ${isMobile ? "" : "cursor-move"}`}
        style={{
          background: "linear-gradient(180deg, #3a3a3a 0%, #2a2a2a 100%)",
          borderBottom: "1px solid #FFD700",
        }}
        onMouseDown={isMobile ? undefined : handleHeaderMouseDown}
      >
        <div className="flex items-center gap-2">
          <span style={{ color: "#FFD700", fontSize: "10px", fontWeight: "bold" }}>⚡</span>
          <span style={{ color: "#FFD700", fontSize: isMobile ? "14px" : "11px", fontWeight: "bold", letterSpacing: "1px" }}>
            BAR BOSS PLAYER
          </span>
        </div>
        <button
          onClick={handleClose}
          className="w-5 h-5 flex items-center justify-center text-xs font-bold text-black hover:bg-red-600 hover:text-white transition-colors"
          style={{
            background: "#FFD700",
            border: "1px solid #000000",
            borderRadius: "2px",
          }}
          title="Закрыть"
        >
          ×
        </button>
      </div>

      {/* LED Display */}
      <div
        className={`mx-2 mt-2 ${isMobile ? "p-2" : "p-3"}`}
        style={{
          background: "linear-gradient(180deg, #0a0a0a 0%, #1a1a0a 50%, #0a0a0a 100%)",
          border: "2px solid #333",
          borderRadius: "2px",
          boxShadow: "inset 0 2px 8px rgba(0,0,0,0.9)",
        }}
      >
        {/* Time and Status Row */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            {/* Play/Pause Indicator */}
            <span
              style={{
                color: isPlaying ? "#00FF00" : "#FFD700",
                fontSize: "16px",
                textShadow: isPlaying ? "0 0 10px #00FF00" : "0 0 5px #FFD700",
              }}
            >
              {isPlaying ? "▶" : "❚❚"}
            </span>
            {/* LED Time Display */}
            <span
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: isMobile ? "24px" : "28px",
                fontWeight: "bold",
                color: "#00FF00",
                textShadow: "0 0 10px #00FF00, 0 0 20px #00FF00",
                letterSpacing: "2px",
              }}
            >
              {formatTime(currentTime)}
            </span>
          </div>
          {!isMobile && (
            <div className="text-right" style={{ color: "#888", fontSize: "10px" }}>
              <div>kbps: 320</div>
              <div>khz: 44</div>
            </div>
          )}
        </div>

        {/* Track Name Marquee */}
        <div
          className="overflow-hidden whitespace-nowrap mb-3"
          style={{
            background: "#0a0a0a",
            padding: "4px 8px",
            borderRadius: "2px",
          }}
        >
          <div
            className="inline-block"
            style={{
              color: "#FFD700",
              fontSize: "12px",
              fontWeight: "bold",
              animation: isPlaying ? "marquee 10s linear infinite" : "none",
              textShadow: "0 0 5px #FFD700",
            }}
          >
            ♫ {currentTrack.name} ♫ {currentTrack.name} ♫
          </div>
        </div>

        {/* Progress Bar */}
        <div
          className="relative cursor-pointer"
          style={{
            height: isMobile ? "16px" : "12px",
            background: "linear-gradient(180deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)",
            border: "1px solid #444",
            borderRadius: "2px",
            overflow: "hidden",
          }}
          onClick={handleSeek}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              height: "100%",
              width: `${Math.min(100, Math.max(0, progressPercent))}%`,
              background: "linear-gradient(180deg, #FFD700 0%, #B8860B 50%, #FFD700 100%)",
              borderRadius: "1px",
              transition: "width 0.1s linear",
            }}
          />
          {/* Progress Thumb */}
          <div
            style={{
              position: "absolute",
              left: `${Math.min(100, Math.max(0, progressPercent))}%`,
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: isMobile ? "12px" : "8px",
              height: isMobile ? "18px" : "14px",
              background: "linear-gradient(180deg, #666 0%, #444 50%, #333 100%)",
              border: "1px solid #888",
              borderRadius: "2px",
            }}
          />
        </div>

        {/* Time Labels */}
        <div className="flex justify-between mt-1" style={{ color: "#888", fontSize: isMobile ? "9px" : "10px" }}>
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Control Buttons */}
      <div className={`flex items-center justify-between ${isMobile ? "px-2 py-2" : "px-3 py-2"}`}>
        <div className={`flex ${isMobile ? "gap-2" : "gap-1"}`}>
          {/* Previous */}
          <button
            onClick={handlePrevious}
            className="transition-all active:scale-95"
            style={{
              width: buttonSize.width,
              height: buttonSize.height,
              background: "linear-gradient(180deg, #4a4a4a 0%, #3a3a3a 50%, #2a2a2a 100%)",
              border: "1px solid #666",
              borderRadius: "3px",
              color: "#FFD700",
              fontSize: buttonSize.fontSize,
              boxShadow: "0 2px 4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.boxShadow = "inset 0 2px 4px rgba(0,0,0,0.8)"
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)"
            }}
          >
            ⏮
          </button>

          {/* Play */}
          <button
            onClick={handlePlay}
            className="transition-all active:scale-95"
            style={{
              width: buttonSize.width,
              height: buttonSize.height,
              background: isPlaying
                ? "linear-gradient(180deg, #3a3a3a 0%, #2a2a2a 50%, #1a1a1a 100%)"
                : "linear-gradient(180deg, #4a4a4a 0%, #3a3a3a 50%, #2a2a2a 100%)",
              border: "1px solid #666",
              borderRadius: "3px",
              color: isPlaying ? "#00FF00" : "#FFD700",
              fontSize: buttonSize.fontSize,
              boxShadow: isPlaying
                ? "inset 0 2px 4px rgba(0,0,0,0.8)"
                : "0 2px 4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
          >
            ▶
          </button>

          {/* Pause */}
          <button
            onClick={handlePause}
            className="transition-all active:scale-95"
            style={{
              width: buttonSize.width,
              height: buttonSize.height,
              background: "linear-gradient(180deg, #4a4a4a 0%, #3a3a3a 50%, #2a2a2a 100%)",
              border: "1px solid #666",
              borderRadius: "3px",
              color: "#FFD700",
              fontSize: buttonSize.fontSize,
              boxShadow: "0 2px 4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.boxShadow = "inset 0 2px 4px rgba(0,0,0,0.8)"
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)"
            }}
          >
            ⏸
          </button>

          {/* Stop */}
          <button
            onClick={handleStop}
            className="transition-all active:scale-95"
            style={{
              width: buttonSize.width,
              height: buttonSize.height,
              background: "linear-gradient(180deg, #4a4a4a 0%, #3a3a3a 50%, #2a2a2a 100%)",
              border: "1px solid #666",
              borderRadius: "3px",
              color: "#FFD700",
              fontSize: buttonSize.fontSize,
              boxShadow: "0 2px 4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.boxShadow = "inset 0 2px 4px rgba(0,0,0,0.8)"
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)"
            }}
          >
            ⏹
          </button>

          {/* Next */}
          <button
            onClick={handleNext}
            className="transition-all active:scale-95"
            style={{
              width: buttonSize.width,
              height: buttonSize.height,
              background: "linear-gradient(180deg, #4a4a4a 0%, #3a3a3a 50%, #2a2a2a 100%)",
              border: "1px solid #666",
              borderRadius: "3px",
              color: "#FFD700",
              fontSize: buttonSize.fontSize,
              boxShadow: "0 2px 4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.boxShadow = "inset 0 2px 4px rgba(0,0,0,0.8)"
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)"
            }}
          >
            ⏭
          </button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-2">
          <span style={{ color: "#FFD700", fontSize: isMobile ? "14px" : "12px" }}>
            {volume === 0 ? "🔇" : volume < 0.5 ? "🔉" : "🔊"}
          </span>
          <div
            className="relative cursor-pointer"
            style={{
              width: isMobile ? "100px" : "80px",
              height: isMobile ? "12px" : "8px",
              background: "linear-gradient(180deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)",
              border: "1px solid #444",
              borderRadius: "2px",
              overflow: "hidden",
            }}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              const x = e.clientX - rect.left
              const newVolume = Math.max(0, Math.min(1, x / rect.width))
              setVolume(newVolume)
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                height: "100%",
                width: `${volume * 100}%`,
                background: "linear-gradient(180deg, #FFD700 0%, #B8860B 50%, #FFD700 100%)",
                borderRadius: "1px",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: `${Math.min(100, Math.max(0, volume * 100))}%`,
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: isMobile ? "10px" : "6px",
                height: isMobile ? "14px" : "10px",
                background: "linear-gradient(180deg, #666 0%, #444 50%, #333 100%)",
                border: "1px solid #888",
                borderRadius: "2px",
              }}
            />
          </div>
        </div>
      </div>

      {/* Playlist Separator */}
      <div
        className="mx-2 flex items-center gap-2 py-1"
        style={{
          borderTop: "1px solid #444",
          borderBottom: "1px solid #444",
          background: "linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%)",
        }}
      >
        <span style={{ color: "#FFD700", fontSize: isMobile ? "11px" : "10px", fontWeight: "bold", paddingLeft: "8px" }}>
          PLAYLIST
        </span>
        <div style={{ flex: 1, height: "1px", background: "#444" }} />
      </div>

      {/* Playlist */}
      <div
        className="mx-2 mb-2"
        style={{
          background: "#0a0a0a",
          border: "1px solid #333",
          borderRadius: "2px",
          maxHeight: isMobile ? "120px" : "150px",
          overflowY: "auto",
        }}
      >
        {defaultTracks.map((track, index) => (
          <button
            key={track.id}
            onClick={() => {
              setCurrentTrackIndex(index)
              setCurrentTime(0)
              if (isPlaying) {
                setTimeout(() => {
                  const audio = audioRef.current
                  if (audio) audio.play()
                }, 100)
              }
            }}
            className="w-full text-left px-2 py-1 transition-colors"
            style={{
              color: index === currentTrackIndex ? "#FFD700" : "#CCCCCC",
              background: index === currentTrackIndex 
                ? "linear-gradient(90deg, rgba(255,215,0,0.2) 0%, rgba(255,215,0,0.1) 100%)" 
                : "transparent",
              fontSize: isMobile ? "10px" : "11px",
              fontFamily: "'Arial', sans-serif",
              borderBottom: "1px solid #1a1a1a",
            }}
            onMouseEnter={(e) => {
              if (index !== currentTrackIndex) {
                e.currentTarget.style.background = "rgba(255,215,0,0.05)"
                e.currentTarget.style.color = "#FFD700"
              }
            }}
            onMouseLeave={(e) => {
              if (index !== currentTrackIndex) {
                e.currentTarget.style.background = "transparent"
                e.currentTarget.style.color = "#CCCCCC"
              }
            }}
          >
            <span style={{ color: "#888", marginRight: "8px" }}>{index + 1}.</span>
            {track.name}
            {index === currentTrackIndex && isPlaying && (
              <span style={{ color: "#00FF00", marginLeft: "8px" }}>▶</span>
            )}
          </button>
        ))}
      </div>

      {/* CSS for marquee animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  )
}

