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

      {/* Contacts */}
      <div
        className="p-3 space-y-2"
        style={{
          background: "#f5f0e1",
          border: "2px solid #000000",
        }}
      >
        <div className="text-xs font-bold">📞 Контактная информация</div>

        <div className="text-xs">
          <span className="font-bold">Номер:</span>{" "}
          <a className="underline" href="tel:+79102537167">
            +7 910 253 7167
          </a>
          <div className="text-[10px]" style={{ color: "#666666" }}>
            Можно писать в мессенджеры
          </div>
        </div>

        <div className="text-xs">
          <span className="font-bold">Telegram (приоритетный канал):</span>{" "}
          <a className="underline break-all" href={SOCIAL_LINKS.priorityTelegram} target="_blank" rel="noreferrer">
            {SOCIAL_LINKS.priorityTelegram}
          </a>
          <div className="text-[10px]" style={{ color: "#666666" }}>
            ⚡ Быстрее всего отвечаю в Telegram
          </div>
        </div>

        <div className="text-xs space-y-1">
          <div className="font-bold">📧 EMAIL:</div>
          <div>
            Основной:{" "}
            <a className="underline" href="mailto:vitaly.arshuk@gmail.com">
              vitaly.arshuk@gmail.com
            </a>
          </div>
          <div>
            Общий (из футера):{" "}
            <a className="underline" href="mailto:info@barboss.ru">
              info@barboss.ru
            </a>
          </div>
        </div>

        <div className="text-xs space-y-1">
          <div className="font-bold">📍 ЮРИДИЧЕСКИЙ АДРЕС:</div>
          <div className="text-xs" style={{ color: "#000000" }}>
            216500, Россия, обл. Смоленская,
            <br />
            г. Рославль, ул. Красноармейская,
            <br />
            д. 102А, кв. 32
          </div>
        </div>

        <div className="text-xs space-y-1">
          <div className="font-bold">🕒 ГРАФИК РАБОТЫ:</div>
          <div>Понедельник - Пятница: 9:00 - 21:00</div>
          <div>Суббота - Воскресенье: 10:00 - 18:00</div>
        </div>

        <div className="text-xs space-y-1">
          <div className="font-bold">💬 ВРЕМЯ ОТВЕТА:</div>
          <div>Отвечаю лично, обычно в тот же день</div>
          <div>
            Если ответ не пришёл в течение суток — напишите на{" "}
            <a className="underline" href="mailto:vitaly.arshuk@gmail.com">
              vitaly.arshuk@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Team */}
      <div
        className="p-3 space-y-2"
        style={{
          background: "#000000",
          border: "2px solid #FFD700",
          color: "#FFD700",
        }}
      >
        <div className="text-xs font-bold">👥 Команда</div>

        <div className="p-2" style={{ background: "rgba(255, 215, 0, 0.08)", border: "1px solid #FFD700" }}>
          <div className="text-xs font-bold">ДЕНИС КОЛОДЕШНИКОВ</div>
          <div className="text-[10px]">Должность: Руководитель ИИ направления</div>
          <div className="text-[10px]">
            Описание: Отвечает за внедрение AI-решений и автоматизацию барных процессов
          </div>
          <div className="text-[10px]">Город: Санкт-Петербург 📍</div>
        </div>

        <div className="p-2" style={{ background: "rgba(255, 215, 0, 0.08)", border: "1px solid #FFD700" }}>
          <div className="text-xs font-bold">ВАЛЕРИЯ КОЛОДЕШНИКОВА</div>
          <div className="text-[10px]">Должность: Руководитель маркетингового отдела</div>
          <div className="text-[10px]">
            Описание: Управляет стратегией продвижения и коммуникацией с клиентами
          </div>
          <div className="text-[10px]">Город: Санкт-Петербург 📍</div>
        </div>
      </div>
    </div>
  )
}
