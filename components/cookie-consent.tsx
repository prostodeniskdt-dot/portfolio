"use client"

import { useState, useEffect } from "react"

const COOKIE_CONSENT_KEY = "cookie_consent"

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Проверяем, было ли уже дано согласие
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (!consent) {
      // Показываем баннер только если согласие еще не было дано
      setShowBanner(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted")
    setShowBanner(false)
    // Здесь можно добавить инициализацию Яндекс.Метрики или других аналитических сервисов
  }

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined")
    setShowBanner(false)
  }

  if (!showBanner) {
    return null
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[9999] p-4 animate-slide-up"
      style={{
        background: "#FFD700",
        borderTop: "3px solid #000000",
        boxShadow: "0 -4px 12px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🍪</span>
            <h3 className="text-sm font-bold text-black">
              Мы используем cookies
            </h3>
          </div>
          <p className="text-xs text-black leading-relaxed">
            Мы используем cookies для улучшения работы сайта и сбора аналитики. 
            Вы можете принять или отклонить аналитические cookies. 
            Обязательные cookies необходимы для корректной работы сайта.
          </p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-xs font-bold transition-all hover:scale-[1.02]"
            style={{
              background: "#000000",
              color: "#FFD700",
              border: "3px solid",
              borderColor: "#3a3a3a #FFD700 #FFD700 #3a3a3a",
            }}
          >
            Принять
          </button>
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-xs font-bold transition-all hover:scale-[1.02]"
            style={{
              background: "#f5f0e1",
              color: "#000000",
              border: "2px solid #000000",
            }}
          >
            Отклонить
          </button>
        </div>
      </div>
    </div>
  )
}

