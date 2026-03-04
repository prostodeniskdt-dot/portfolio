"use client"

import { useEffect } from "react"

interface WelcomeModalProps {
  isOpen: boolean
  onClose: () => void
}

const FOLDER_DESCRIPTIONS: { name: string; description: string }[] = [
  { name: "Продукты", description: "Пакетные предложения: документы, инвентарь и др." },
  { name: "Индивидуальные продукты", description: "Услуги под заказ: запуск заведения, меню, консультации, курсы" },
  { name: "IT-продукты", description: "Сайты, веб-приложения, интеграции с GPT" },
  { name: "Вакансии", description: "Работа в BAR BOSS и у партнёров" },
  { name: "Реклама на площадке", description: "Размещения в Telegram, на сайте, анимации" },
  { name: "Конкурсы и мероприятия", description: "Текущие конкурсы и события" },
  { name: "Друзья", description: "Партнёры и бренды: фото, видео, описания" },
  { name: "Юридические документы", description: "Политика конфиденциальности, оферты, условия" },
]

export function WelcomeModal({ isOpen, onClose }: WelcomeModalProps) {
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
      style={{ background: "rgba(0, 0, 0, 0.7)" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-modal-title"
    >
      <div
        className="p-6 border-4 max-h-[90vh] overflow-y-auto"
        style={{
          background: "#FFF8DC",
          borderColor: "#000000",
          maxWidth: "520px",
          width: "100%",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="mb-4 pb-3 border-b-2"
          style={{ borderColor: "#000000" }}
        >
          <h2
            id="welcome-modal-title"
            className="text-xl font-bold"
            style={{
              color: "#000000",
              textShadow: "2px 2px 0px #FFD700",
            }}
          >
            Добро пожаловать в BAR BOSS ONLINE
          </h2>
        </div>

        <div className="space-y-4 text-black text-sm leading-relaxed">
          <section>
            <h3 className="font-bold mb-2" style={{ color: "#000000" }}>
              Как пользоваться
            </h3>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>Клик по иконке на рабочем столе или в боковой панели открывает папку или окно.</li>
              <li>Окна можно перетаскивать, сворачивать и закрывать (крестик или Alt+F4).</li>
              <li>В папках внутри — карточки продуктов или документов; клик по карточке открывает подробное окно.</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold mb-2" style={{ color: "#000000" }}>
              За что отвечает каждая папка
            </h3>
            <ul className="space-y-2">
              {FOLDER_DESCRIPTIONS.map(({ name, description }) => (
                <li key={name} className="flex gap-2">
                  <span className="font-semibold shrink-0" style={{ minWidth: "140px" }}>
                    {name}
                  </span>
                  <span>— {description}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={onClose}
            className="px-8 py-3 border-2 font-bold text-base"
            style={{
              borderColor: "#000000",
              background: "#FFD700",
              color: "#000000",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#FFED4E"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#FFD700"
            }}
            aria-label="Закрыть приветственное окно"
          >
            Понятно
          </button>
        </div>
      </div>
    </div>
  )
}
