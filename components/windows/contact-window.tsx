"use client"

import { TELEGRAM_LEAD_URL, SOCIAL_LINKS } from "@/lib/links"
import { useIsMobile } from "@/hooks/use-mobile"

export function ContactWindow() {
  const isMobile = useIsMobile()
  return (
    <div className={`text-black ${isMobile ? "text-[10px] space-y-2" : "text-sm space-y-3"}`}>
      {/* Header */}
      <div
        className={isMobile ? "p-2" : "p-3"}
        style={{
          background: "#FFD700",
          border: "2px solid #000000",
        }}
      >
        <div className={`${isMobile ? "text-[10px]" : "text-xs"} font-bold`}>📬 Контакты</div>
      </div>

      {/* Primary CTA */}
      <div
        className={`w-full text-left ${isMobile ? "p-2" : "p-3"}`}
        style={{
          background: "#000000",
          border: "3px solid #FFD700",
          color: "#FFD700",
          boxShadow: "8px 8px 0 rgba(184,134,11,0.25)",
        }}
      >
        <div className={`${isMobile ? "text-xs" : "text-sm"} font-bold mb-1`}>⚡ Написать в Telegram</div>
        <div className={`${isMobile ? "text-[10px]" : "text-xs"} mb-2`}>
          Быстрее всего отвечаем здесь
        </div>
        <a
          href={TELEGRAM_LEAD_URL}
          target="_blank"
          rel="noreferrer"
          className={`inline-flex items-center justify-center font-bold transition-all hover:scale-[1.02] whitespace-nowrap ${isMobile ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs"}`}
          style={{
            background: "#FFD700",
            color: "#000000",
            border: "2px solid #000000",
          }}
        >
          Перейти
        </a>
      </div>

      {/* Phone & Telegram Card */}
      <div
        className={`transition-all duration-150 hover:scale-[1.01] ${isMobile ? "p-2" : "p-3"}`}
        style={{
          background: "#f5f0e1",
          border: "2px solid #000000",
          boxShadow: "4px 4px 0 rgba(0,0,0,0.1)",
        }}
      >
        <div className={`flex items-start ${isMobile ? "gap-2" : "gap-3"}`}>
          <div
            className={`${isMobile ? "w-8 h-8" : "w-10 h-10"} shrink-0 flex items-center justify-center`}
            style={{
              background: "#000000",
              border: "2px solid #FFD700",
            }}
          >
            <span className={isMobile ? "text-base" : "text-xl"}>📞</span>
          </div>
          <div className={`flex-1 ${isMobile ? "space-y-1.5" : "space-y-2"}`}>
            <div className={`${isMobile ? "text-[10px]" : "text-xs"} font-bold`}>Телефон и Telegram</div>
            <div className={`${isMobile ? "text-[10px]" : "text-xs"}`}>
              <span className="font-bold">+7 910 253 7167</span>
              <div className={`${isMobile ? "text-[9px]" : "text-[10px]"} mt-0.5`} style={{ color: "#666666" }}>
                Можно писать в мессенджеры
              </div>
            </div>
            <div className={`${isMobile ? "text-[10px]" : "text-xs"}`}>
              <span className="font-bold">Telegram (приоритетный):</span>
              <div className={`${isMobile ? "mt-1.5" : "mt-2"}`}>
                <a
                  href={SOCIAL_LINKS.priorityTelegram}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center justify-center font-bold transition-all hover:scale-[1.02] whitespace-nowrap ${isMobile ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs"}`}
                  style={{
                    background: "#FFD700",
                    color: "#000000",
                    border: "2px solid #000000",
                  }}
                >
                  Перейти
                </a>
              </div>
              <span className={`${isMobile ? "text-[9px]" : "text-[10px]"} mt-1 block`} style={{ color: "#666666" }}>
                ⚡ Быстрее всего отвечаю в Telegram
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Email Card */}
      <div
        className={`transition-all duration-150 hover:scale-[1.01] ${isMobile ? "p-2" : "p-3"}`}
        style={{
          background: "#f5f0e1",
          border: "2px solid #000000",
          boxShadow: "4px 4px 0 rgba(0,0,0,0.1)",
        }}
      >
        <div className={`flex items-start ${isMobile ? "gap-2" : "gap-3"}`}>
          <div
            className={`${isMobile ? "w-8 h-8" : "w-10 h-10"} shrink-0 flex items-center justify-center`}
            style={{
              background: "#000000",
              border: "2px solid #FFD700",
            }}
          >
            <span className={isMobile ? "text-base" : "text-xl"}>📧</span>
          </div>
          <div className={`flex-1 ${isMobile ? "space-y-1.5" : "space-y-2"}`}>
            <div className={`${isMobile ? "text-[10px]" : "text-xs"} font-bold`}>Email</div>
            <div className={`${isMobile ? "text-[10px]" : "text-xs"}`}>
              <span className="font-bold">Основной: vitaly.arshuk@gmail.com</span>
            </div>
            <div>
              <a
                href="mailto:vitaly.arshuk@gmail.com"
                className={`inline-flex items-center justify-center font-bold transition-all hover:scale-[1.02] whitespace-nowrap ${isMobile ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs"}`}
                style={{
                  background: "#FFD700",
                  color: "#000000",
                  border: "2px solid #000000",
                }}
              >
                Перейти
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Address Card */}
      <div
        className={`transition-all duration-150 hover:scale-[1.01] ${isMobile ? "p-2" : "p-3"}`}
        style={{
          background: "#f5f0e1",
          border: "2px solid #000000",
          boxShadow: "4px 4px 0 rgba(0,0,0,0.1)",
        }}
      >
        <div className={`flex items-start ${isMobile ? "gap-2" : "gap-3"}`}>
          <div
            className={`${isMobile ? "w-8 h-8" : "w-10 h-10"} shrink-0 flex items-center justify-center`}
            style={{
              background: "#000000",
              border: "2px solid #FFD700",
            }}
          >
            <span className={isMobile ? "text-base" : "text-xl"}>📍</span>
          </div>
          <div className="flex-1">
            <div className={`${isMobile ? "text-[10px]" : "text-xs"} font-bold mb-1`}>Юридический адрес</div>
            <div className={`${isMobile ? "text-[10px]" : "text-xs"} mb-2`} style={{ color: "#000000" }}>
              216500, Россия, обл. Смоленская,
              <br />
              г. Рославль, ул. Красноармейская,
              <br />
              д. 102А, кв. 32
            </div>
            <a
              href="https://yandex.ru/maps/?text=216500,+Россия,+обл.+Смоленская,+г.+Рославль,+ул.+Красноармейская,+д.+102А,+кв.+32"
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center justify-center font-bold transition-all hover:scale-[1.02] whitespace-nowrap ${isMobile ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs"}`}
              style={{
                background: "#FFD700",
                color: "#000000",
                border: "2px solid #000000",
              }}
            >
              Перейти
            </a>
          </div>
        </div>
      </div>

      {/* Working Hours Card */}
      <div
        className={`transition-all duration-150 hover:scale-[1.01] ${isMobile ? "p-2" : "p-3"}`}
        style={{
          background: "#f5f0e1",
          border: "2px solid #000000",
          boxShadow: "4px 4px 0 rgba(0,0,0,0.1)",
        }}
      >
        <div className={`flex items-start ${isMobile ? "gap-2" : "gap-3"}`}>
          <div
            className={`${isMobile ? "w-8 h-8" : "w-10 h-10"} shrink-0 flex items-center justify-center`}
            style={{
              background: "#000000",
              border: "2px solid #FFD700",
            }}
          >
            <span className={isMobile ? "text-base" : "text-xl"}>🕒</span>
          </div>
          <div className="flex-1">
            <div className={`${isMobile ? "text-[10px]" : "text-xs"} font-bold mb-1`}>График работы</div>
            <div className={`${isMobile ? "text-[10px]" : "text-xs"} mb-2 space-y-0.5`}>
              <div>Понедельник - Пятница: 9:00 - 21:00</div>
              <div>Суббота - Воскресенье: 10:00 - 18:00</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
