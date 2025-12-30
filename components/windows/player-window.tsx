"use client"

import { useState, useRef, useEffect } from "react"

// Список треков (можно расширить, добавив автоматическое сканирование)
const defaultTracks = [
  { id: 1, name: "Track 1", url: "/music/track1.mp3" },
  { id: 2, name: "Track 2", url: "/music/track2.mp3" },
  { id: 3, name: "Track 3", url: "/music/track3.mp3" },
]

export function PlayerWindow() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
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

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return
    const newTime = parseFloat(e.target.value)
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00"
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div
      className="p-4 space-y-4"
      style={{
        background: "#FFF8DC",
        fontFamily: "monospace",
      }}
    >
      <audio ref={audioRef} src={currentTrack.url} preload="metadata" />

      {/* Заголовок */}
      <div
        className="text-center font-bold text-lg mb-4"
        style={{
          color: "#000000",
          textShadow: "2px 2px 0px #FFD700",
        }}
      >
        МЕДИА ПЛЕЕР
      </div>

      {/* Текущий трек */}
      <div
        className="p-3 border-2"
        style={{
          borderColor: "#000000",
          background: "#000000",
          color: "#FFD700",
        }}
      >
        <div className="text-sm font-bold mb-1">Текущий трек:</div>
        <div className="text-xs">{currentTrack.name}</div>
      </div>

      {/* Прогресс-бар */}
      <div className="space-y-2">
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="w-full"
          style={{
            accentColor: "#FFD700",
          }}
        />
        <div className="flex justify-between text-xs" style={{ color: "#000000" }}>
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Кнопки управления */}
      <div className="flex gap-2 justify-center">
        <button
          onClick={handlePrevious}
          className="px-4 py-2 border-2 font-bold text-sm"
          style={{
            borderColor: "#000000",
            background: "#FFD700",
            color: "#000000",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#FFED4E"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#FFD700"
          }}
        >
          ⏮
        </button>
        {isPlaying ? (
          <button
            onClick={handlePause}
            className="px-4 py-2 border-2 font-bold text-sm"
            style={{
              borderColor: "#000000",
              background: "#FFD700",
              color: "#000000",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#FFED4E"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#FFD700"
            }}
          >
            ⏸
          </button>
        ) : (
          <button
            onClick={handlePlay}
            className="px-4 py-2 border-2 font-bold text-sm"
            style={{
              borderColor: "#000000",
              background: "#FFD700",
              color: "#000000",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#FFED4E"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#FFD700"
            }}
          >
            ▶
          </button>
        )}
        <button
          onClick={handleStop}
          className="px-4 py-2 border-2 font-bold text-sm"
          style={{
            borderColor: "#000000",
            background: "#FFD700",
            color: "#000000",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#FFED4E"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#FFD700"
          }}
        >
          ⏹
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 border-2 font-bold text-sm"
          style={{
            borderColor: "#000000",
            background: "#FFD700",
            color: "#000000",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#FFED4E"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#FFD700"
          }}
        >
          ⏭
        </button>
      </div>

      {/* Громкость */}
      <div className="space-y-2">
        <div className="text-xs font-bold" style={{ color: "#000000" }}>
          Громкость: {Math.round(volume * 100)}%
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-full"
          style={{
            accentColor: "#FFD700",
          }}
        />
      </div>

      {/* Список треков */}
      <div
        className="p-3 border-2 space-y-1"
        style={{
          borderColor: "#000000",
          background: "#000000",
          maxHeight: "150px",
          overflowY: "auto",
        }}
      >
        <div className="text-xs font-bold mb-2" style={{ color: "#FFD700" }}>
          Список треков:
        </div>
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
            className="w-full text-left px-2 py-1 text-xs"
            style={{
              color: index === currentTrackIndex ? "#FFD700" : "#FFFFFF",
              background: index === currentTrackIndex ? "rgba(255, 215, 0, 0.2)" : "transparent",
              border: index === currentTrackIndex ? "1px solid #FFD700" : "1px solid transparent",
            }}
            onMouseEnter={(e) => {
              if (index !== currentTrackIndex) {
                e.currentTarget.style.background = "rgba(255, 215, 0, 0.1)"
              }
            }}
            onMouseLeave={(e) => {
              if (index !== currentTrackIndex) {
                e.currentTarget.style.background = "transparent"
              }
            }}
          >
            {index + 1}. {track.name}
          </button>
        ))}
      </div>

      {/* Инструкция */}
      <div
        className="p-2 text-xs border-2"
        style={{
          borderColor: "#FFD700",
          background: "rgba(255, 215, 0, 0.1)",
          color: "#000000",
        }}
      >
        <div className="font-bold mb-1">Инструкция:</div>
        <div>Поместите файлы музыки (MP3, OGG, WAV) в папку public/music/</div>
        <div>Обновите список треков в player-window.tsx</div>
      </div>
    </div>
  )
}

