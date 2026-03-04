"use client"

import { useEffect } from "react"
import { getPixelIcon } from "@/components/icons/pixel-icons"
import { soundManager } from "@/lib/sounds"

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

  const FolderIcon = getPixelIcon("products-folder")

  const handleClose = () => {
    soundManager.playWindowClose()
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
      style={{ background: "rgba(0, 0, 0, 0.5)" }}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-modal-title"
    >
      <div
        className="flex flex-col max-h-[90vh] animate-window-open"
        style={{
          background: "#f5f0e1",
          border: "3px solid",
          borderColor: "#FFD700 #000000 #000000 #FFD700",
          boxShadow: "0 8px 32px rgba(184,134,11,0.4), 0 0 60px rgba(184,134,11,0.15)",
          maxWidth: "560px",
          width: "100%",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title bar — как у окна папки */}
        <div
          className="h-8 flex items-center justify-between px-2 select-none shrink-0"
          style={{ background: "#FFD700" }}
        >
          <div className="flex items-center gap-2 flex-1 min-w-0 overflow-hidden">
            {FolderIcon ? (
              <FolderIcon size={16} className="" />
            ) : (
              <span className="text-sm" aria-hidden="true">📁</span>
            )}
            <span
              id="welcome-modal-title"
              className="text-sm font-bold tracking-wide text-black flex-1 min-w-0 truncate"
            >
              Добро пожаловать в BAR BOSS ONLINE
            </span>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Закрыть окно"
            className="group w-5 h-5 flex items-center justify-center hover:scale-110 transition-transform"
            style={{
              background: "transparent",
              border: "none",
              padding: 0,
            }}
          >
            <div
              className="w-5 h-5 flex items-center justify-center group-hover:bg-red-600"
              style={{
                background: "#000000",
                border: "2px solid",
                borderColor: "#3a3a3a #FFD700 #FFD700 #3a3a3a",
                color: "#FFD700",
              }}
            >
              <span aria-hidden="true" className="leading-none font-bold text-[20px] group-hover:text-white">
                ×
              </span>
            </div>
          </button>
        </div>

        {/* Content area — белое поле как в окне папки */}
        <div
          className="flex-1 overflow-y-auto"
          style={{
            background: "#ffffff",
            border: "3px solid",
            borderColor: "#000000 #FFD700 #FFD700 #000000",
          }}
        >
          <div className="p-5 text-black">
            {/* Разделитель под заголовком */}
            <div className="border-t border-black mb-4" style={{ borderColor: "#000000" }} />

            <section className="mb-5">
              <h3 className="text-sm font-bold text-black mb-2">
                Как пользоваться
              </h3>
              <ul className="list-disc list-outside pl-5 space-y-1.5 text-sm leading-relaxed text-black">
                <li>Клик по иконке на рабочем столе или в боковой панели открывает папку или окно.</li>
                <li>Окна можно перетаскивать, сворачивать и закрывать (крестик или Alt+F4).</li>
                <li>В папках внутри — карточки продуктов или документов; клик по карточке открывает подробное окно.</li>
              </ul>
            </section>

            {/* Разделитель между секциями */}
            <div className="border-t border-black mb-4" style={{ borderColor: "#000000" }} />

            <section>
              <h3 className="text-sm font-bold text-black mb-3">
                За что отвечает каждая папка
              </h3>
              <div
                className="grid gap-y-2 text-sm leading-relaxed"
                style={{ gridTemplateColumns: "minmax(12rem, auto) 1fr" }}
              >
                {FOLDER_DESCRIPTIONS.map(({ name, description }) => (
                  <span key={name} className="contents">
                    <span className="font-bold text-black pr-3 shrink-0">
                      {name}
                    </span>
                    <span className="text-black">
                      — {description}
                    </span>
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Нижняя панель — как статус-бар окна папки */}
        <div
          className="h-6 flex items-center px-2 shrink-0"
          style={{
            background: "#000000",
            borderTop: "2px solid #FFD700",
          }}
        >
          <button
            type="button"
            onClick={handleClose}
            className="text-xs text-[#FFD700] hover:underline cursor-pointer transition-all font-bold"
            style={{ background: "transparent", border: "none", padding: 0 }}
          >
            Понятно
          </button>
          <span className="text-[#FFD700] animate-blink ml-1">_</span>
        </div>
      </div>
    </div>
  )
}
