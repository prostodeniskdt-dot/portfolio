"use client"

import { TELEGRAM_LEAD_URL, SOCIAL_LINKS } from "@/lib/links"

export function ContactWindow() {
  return (
    <div className="text-black text-sm space-y-3">
      {/* Header */}
      <div
        className="p-3"
        style={{
          background: "#FFD700",
          border: "2px solid #000000",
        }}
      >
        <div className="text-xs font-bold">📬 Контакты</div>
        <div className="text-[10px]" style={{ color: "#000000", opacity: 0.8 }}>
          Все лиды принимаем в Telegram (приоритетный канал)
        </div>
      </div>

      {/* Primary CTA */}
      <button
        onClick={() => window.open(TELEGRAM_LEAD_URL, "_blank", "noreferrer")}
        className="w-full p-3 text-left transition-all duration-150 hover:scale-[1.01]"
        style={{
          background: "#000000",
          border: "3px solid #FFD700",
          color: "#FFD700",
          boxShadow: "8px 8px 0 rgba(184,134,11,0.25)",
        }}
      >
        <div className="text-sm font-bold">⚡ Написать в Telegram</div>
        <div className="text-[10px]" style={{ color: "#FFD700", opacity: 0.9 }}>
          Быстрее всего отвечаем здесь: {TELEGRAM_LEAD_URL}
        </div>
      </button>

      {/* Phone & Telegram Card */}
      <div
        className="p-3 transition-all duration-150 hover:scale-[1.01]"
        style={{
          background: "#f5f0e1",
          border: "2px solid #000000",
          boxShadow: "4px 4px 0 rgba(0,0,0,0.1)",
        }}
      >
        <div className="flex items-start gap-3">
          <div
            className="w-10 h-10 shrink-0 flex items-center justify-center"
            style={{
              background: "#000000",
              border: "2px solid #FFD700",
            }}
          >
            <span className="text-xl">📞</span>
          </div>
          <div className="flex-1 space-y-2">
            <div className="text-xs font-bold">Телефон и Telegram</div>
            <div className="text-xs">
              <a
                className="underline hover:text-[#FFD700] transition-colors"
                href="tel:+79102537167"
              >
                +7 910 253 7167
              </a>
              <div className="text-[10px]" style={{ color: "#666666" }}>
                Можно писать в мессенджеры
              </div>
            </div>
            <div className="text-xs">
              <span className="font-bold">Telegram (приоритетный):</span>{" "}
              <a
                className="underline break-all hover:text-[#FFD700] transition-colors"
                href={SOCIAL_LINKS.priorityTelegram}
                target="_blank"
                rel="noreferrer"
              >
                {SOCIAL_LINKS.priorityTelegram}
              </a>
              <div className="text-[10px]" style={{ color: "#666666" }}>
                ⚡ Быстрее всего отвечаю в Telegram
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Card */}
      <div
        className="p-3 transition-all duration-150 hover:scale-[1.01]"
        style={{
          background: "#f5f0e1",
          border: "2px solid #000000",
          boxShadow: "4px 4px 0 rgba(0,0,0,0.1)",
        }}
      >
        <div className="flex items-start gap-3">
          <div
            className="w-10 h-10 shrink-0 flex items-center justify-center"
            style={{
              background: "#000000",
              border: "2px solid #FFD700",
            }}
          >
            <span className="text-xl">📧</span>
          </div>
          <div className="flex-1 space-y-1">
            <div className="text-xs font-bold">Email</div>
            <div className="text-xs">
              Основной:{" "}
              <a
                className="underline hover:text-[#FFD700] transition-colors"
                href="mailto:vitaly.arshuk@gmail.com"
              >
                vitaly.arshuk@gmail.com
              </a>
            </div>
            <div className="text-xs">
              Общий:{" "}
              <a
                className="underline hover:text-[#FFD700] transition-colors"
                href="mailto:info@barboss.ru"
              >
                info@barboss.ru
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Address Card */}
      <div
        className="p-3 transition-all duration-150 hover:scale-[1.01]"
        style={{
          background: "#f5f0e1",
          border: "2px solid #000000",
          boxShadow: "4px 4px 0 rgba(0,0,0,0.1)",
        }}
      >
        <div className="flex items-start gap-3">
          <div
            className="w-10 h-10 shrink-0 flex items-center justify-center"
            style={{
              background: "#000000",
              border: "2px solid #FFD700",
            }}
          >
            <span className="text-xl">📍</span>
          </div>
          <div className="flex-1">
            <div className="text-xs font-bold mb-1">Юридический адрес</div>
            <div className="text-xs" style={{ color: "#000000" }}>
              216500, Россия, обл. Смоленская,
              <br />
              г. Рославль, ул. Красноармейская,
              <br />
              д. 102А, кв. 32
            </div>
          </div>
        </div>
      </div>

      {/* Working Hours Card */}
      <div
        className="p-3 transition-all duration-150 hover:scale-[1.01]"
        style={{
          background: "#f5f0e1",
          border: "2px solid #000000",
          boxShadow: "4px 4px 0 rgba(0,0,0,0.1)",
        }}
      >
        <div className="flex items-start gap-3">
          <div
            className="w-10 h-10 shrink-0 flex items-center justify-center"
            style={{
              background: "#000000",
              border: "2px solid #FFD700",
            }}
          >
            <span className="text-xl">🕒</span>
          </div>
          <div className="flex-1">
            <div className="text-xs font-bold mb-1">График работы</div>
            <div className="text-xs space-y-0.5">
              <div>Понедельник - Пятница: 9:00 - 21:00</div>
              <div>Суббота - Воскресенье: 10:00 - 18:00</div>
            </div>
          </div>
        </div>
      </div>

      {/* Response Time Card */}
      <div
        className="p-3 transition-all duration-150 hover:scale-[1.01]"
        style={{
          background: "#f5f0e1",
          border: "2px solid #000000",
          boxShadow: "4px 4px 0 rgba(0,0,0,0.1)",
        }}
      >
        <div className="flex items-start gap-3">
          <div
            className="w-10 h-10 shrink-0 flex items-center justify-center"
            style={{
              background: "#000000",
              border: "2px solid #FFD700",
            }}
          >
            <span className="text-xl">⏱️</span>
          </div>
          <div className="flex-1">
            <div className="text-xs font-bold mb-1">Время ответа</div>
            <div className="text-xs space-y-0.5">
              <div>Отвечаю лично, обычно в тот же день</div>
              <div>
                Если ответ не пришёл в течение суток — напишите на{" "}
                <a
                  className="underline hover:text-[#FFD700] transition-colors"
                  href="mailto:vitaly.arshuk@gmail.com"
                >
                  vitaly.arshuk@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
