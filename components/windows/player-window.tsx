"use client"

import { useState, useRef, useEffect } from "react"

const defaultTracks = [
  { id: 1, name: "Музыка для работы 1", url: "/music/Музыка для работы 1.mp3" },
  { id: 2, name: "Музыка для работы 2", url: "/music/Музыка для работы 2.mp3" },
  { id: 3, name: "Музыка для работы 3", url: "/music/Музыка для работы 3.mp3" },
  { id: 4, name: "Музыка для работы 4", url: "/music/Музыка для работы 4.mp3" },
  { id: 5, name: "Музыка для работы 5", url: "/music/Музыка для работы 5.mp3" },
  { id: 6, name: "Музыка для работы 6", url: "/music/Музыка для работы 6.mp3" },
  { id: 7, name: "Музыка для работы 7", url: "/music/Музыка для работы 7.mp3" },
]

export function PlayerWindow() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const audioRef = useRef<HTMLAudioElement>(null)

  const currentTrack = defaultTracks[currentTrackIndex]

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

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "00:00"
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const progressPercent = duration ? (currentTime / duration) * 100 : 0

  return (
    <div
      className="select-none"
      style={{
        background: "linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 50%, #0d0d0d 100%)",
        fontFamily: "'Arial', sans-serif",
        border: "3px solid #FFD700",
        borderRadius: "4px",
        boxShadow: "inset 0 0 10px rgba(0,0,0,0.8), 0 4px 20px rgba(0,0,0,0.5)",
      }}
    >
      <audio ref={audioRef} src={currentTrack.url} preload="metadata" />

      {/* Winamp Header */}
      <div
        className="px-3 py-1 flex items-center justify-between"
        style={{
          background: "linear-gradient(180deg, #3a3a3a 0%, #2a2a2a 100%)",
          borderBottom: "1px solid #FFD700",
        }}
      >
        <div className="flex items-center gap-2">
          <span style={{ color: "#FFD700", fontSize: "10px", fontWeight: "bold" }}>⚡</span>
          <span style={{ color: "#FFD700", fontSize: "11px", fontWeight: "bold", letterSpacing: "1px" }}>
            BAR BOSS PLAYER
          </span>
        </div>
      </div>

      {/* LED Display */}
      <div
        className="mx-2 mt-2 p-3"
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
                fontSize: "28px",
                fontWeight: "bold",
                color: "#00FF00",
                textShadow: "0 0 10px #00FF00, 0 0 20px #00FF00",
                letterSpacing: "2px",
              }}
            >
              {formatTime(currentTime)}
            </span>
          </div>
          <div className="text-right" style={{ color: "#888", fontSize: "10px" }}>
            <div>kbps: 320</div>
            <div>khz: 44</div>
          </div>
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
            height: "12px",
            background: "linear-gradient(180deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)",
            border: "1px solid #444",
            borderRadius: "2px",
          }}
          onClick={handleSeek}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              height: "100%",
              width: `${progressPercent}%`,
              background: "linear-gradient(180deg, #FFD700 0%, #B8860B 50%, #FFD700 100%)",
              borderRadius: "1px",
              transition: "width 0.1s linear",
            }}
          />
          {/* Progress Thumb */}
          <div
            style={{
              position: "absolute",
              left: `${progressPercent}%`,
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "8px",
              height: "14px",
              background: "linear-gradient(180deg, #666 0%, #444 50%, #333 100%)",
              border: "1px solid #888",
              borderRadius: "2px",
            }}
          />
        </div>

        {/* Time Labels */}
        <div className="flex justify-between mt-1" style={{ color: "#888", fontSize: "10px" }}>
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-between px-3 py-2">
        <div className="flex gap-1">
          {/* Previous */}
          <button
            onClick={handlePrevious}
            className="transition-all active:scale-95"
            style={{
              width: "32px",
              height: "24px",
              background: "linear-gradient(180deg, #4a4a4a 0%, #3a3a3a 50%, #2a2a2a 100%)",
              border: "1px solid #666",
              borderRadius: "3px",
              color: "#FFD700",
              fontSize: "10px",
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
              width: "32px",
              height: "24px",
              background: isPlaying
                ? "linear-gradient(180deg, #3a3a3a 0%, #2a2a2a 50%, #1a1a1a 100%)"
                : "linear-gradient(180deg, #4a4a4a 0%, #3a3a3a 50%, #2a2a2a 100%)",
              border: "1px solid #666",
              borderRadius: "3px",
              color: isPlaying ? "#00FF00" : "#FFD700",
              fontSize: "10px",
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
              width: "32px",
              height: "24px",
              background: "linear-gradient(180deg, #4a4a4a 0%, #3a3a3a 50%, #2a2a2a 100%)",
              border: "1px solid #666",
              borderRadius: "3px",
              color: "#FFD700",
              fontSize: "10px",
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
              width: "32px",
              height: "24px",
              background: "linear-gradient(180deg, #4a4a4a 0%, #3a3a3a 50%, #2a2a2a 100%)",
              border: "1px solid #666",
              borderRadius: "3px",
              color: "#FFD700",
              fontSize: "10px",
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
              width: "32px",
              height: "24px",
              background: "linear-gradient(180deg, #4a4a4a 0%, #3a3a3a 50%, #2a2a2a 100%)",
              border: "1px solid #666",
              borderRadius: "3px",
              color: "#FFD700",
              fontSize: "10px",
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
          <span style={{ color: "#FFD700", fontSize: "12px" }}>
            {volume === 0 ? "🔇" : volume < 0.5 ? "🔉" : "🔊"}
          </span>
          <div
            className="relative cursor-pointer"
            style={{
              width: "80px",
              height: "8px",
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
                width: "6px",
                height: "10px",
                background: "linear-gradient(180deg, #666 0%, #444 50%, #333 100%)",
                border: "1px solid #888",
                borderRadius: "2px",
                maxWidth: "100%",
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
        <span style={{ color: "#FFD700", fontSize: "10px", fontWeight: "bold", paddingLeft: "8px" }}>
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
          maxHeight: "150px",
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
              fontSize: "11px",
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
