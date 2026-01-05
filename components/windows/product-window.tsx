"use client"

import { products, contests, partners, legalDocuments } from "@/lib/data"
import { toast } from "sonner"
import { TELEGRAM_LEAD_URL } from "@/lib/links"

interface ProductWindowProps {
  productId: string
}

export function ProductWindow({ productId }: ProductWindowProps) {
  // Ищем во всех массивах
  const product = products.find((p) => p.id === productId)
  const contest = contests.find((c) => c.id === productId)
  const partner = partners.find((p) => p.id === productId)
  const document = legalDocuments.find((d) => d.id === productId)
  
  const item = product || contest || partner || document
  const itemType = product ? 'product' : contest ? 'contest' : partner ? 'partner' : 'document'

  if (!item) {
    return (
      <div className="p-4 text-black text-sm">
        <div className="text-red-600 font-bold">Ошибка: Элемент не найден</div>
      </div>
    )
  }

  const handleOrder = () => {
    toast.success(`Запрос на "${item.title}" отправлен!`, {
      description: "Мы свяжемся с вами в ближайшее время",
    })
    window.open(TELEGRAM_LEAD_URL, "_blank", "noreferrer")
  }

  return (
    <div className="text-black text-sm space-y-4 h-full flex flex-col">
      {/* Header */}
      <div
        className="flex items-center gap-4 p-3"
        style={{
          background: "#FFD700",
          border: "2px solid #000000",
        }}
      >
        <span className="text-4xl">{item.icon}</span>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-black">{item.title}</h2>
          <p className="text-xs text-[#666666]">{item.category}</p>
        </div>
      </div>

      {/* Description */}
      <div
        className="p-3 flex-1 overflow-y-auto"
        style={{
          background: "#f5f0e1",
          border: "2px solid #000000",
        }}
      >
        <div className="space-y-3">
          <div>
            {/* Заголовок Описание как активная ссылка без рамки для пакета №1 */}
            {itemType === 'product' && 'descriptionLink' in item && item.descriptionLink ? (
              <h3 className="font-bold text-sm mb-1">
                <a
                  href={item.descriptionLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-black hover:text-blue-600 underline"
                >
                  Описание
                </a>
              </h3>
            ) : (
              <h3 className="font-bold text-sm mb-1">Описание</h3>
            )}
            {itemType === 'document' ? (
              <div 
                className="text-xs leading-relaxed whitespace-pre-line"
                style={{ fontFamily: 'inherit' }}
              >
                {item.fullDescription}
              </div>
            ) : (
              <p className="text-xs leading-relaxed">{item.fullDescription}</p>
            )}
          </div>

          {/* Видеообзоры для пакетов документов */}
          {itemType === 'product' && 'videoReviewLink' in item && item.videoReviewLink && (
            <div>
              <a
                href={item.videoReviewLink}
                target="_blank"
                rel="noreferrer"
                className="inline-block px-3 py-2 text-xs font-bold transition-all hover:scale-[1.02]"
                style={{
                  background: "#000000",
                  color: "#FFD700",
                  border: "2px solid #FFD700",
                }}
              >
                🎥 Видеообзор
              </a>
            </div>
          )}

          {/* Краткий видео обзор для пакета №1 */}
          {itemType === 'product' && 'shortVideoReviewLink' in item && item.shortVideoReviewLink && (
            <div>
              <a
                href={item.shortVideoReviewLink}
                target="_blank"
                rel="noreferrer"
                className="inline-block px-3 py-2 text-xs font-bold transition-all hover:scale-[1.02]"
                style={{
                  background: "#000000",
                  color: "#FFD700",
                  border: "2px solid #FFD700",
                }}
              >
                🎬 Краткий видео обзор
              </a>
            </div>
          )}

          {/* Для конкурсов */}
          {itemType === 'contest' && 'prize' in item && item.prize && (
            <div>
              <h3 className="font-bold text-sm mb-1">Приз</h3>
              <p className="text-xs font-bold text-[#FFD700] bg-black px-2 py-1 inline-block">
                {String(item.prize)}
              </p>
            </div>
          )}

          {itemType === 'contest' && 'deadline' in item && item.deadline && (
            <div>
              <h3 className="font-bold text-sm mb-1">Дедлайн</h3>
              <p className="text-xs">{String(item.deadline)}</p>
            </div>
          )}

          {itemType === 'contest' && 'status' in item && item.status && (
            <div>
              <h3 className="font-bold text-sm mb-1">Статус</h3>
              <p className="text-xs">
                {item.status === 'active' ? '🟢 Активный' : 
                 item.status === 'upcoming' ? '🔵 Скоро' : 
                 '⚫ Завершен'}
              </p>
            </div>
          )}

          {/* Бейдж подписчиков для Telegram каналов */}
          {itemType === 'product' && product && product.subscribers && (
            <div>
              <span 
                className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold"
                style={{
                  background: "#0088cc",
                  color: "#ffffff",
                  border: "2px solid #006699",
                }}
              >
                👥 {product.subscribers} подписчиков
              </span>
            </div>
          )}

          {/* Блок акции со старой ценой и скидкой */}
          {itemType === 'product' && product && product.isPromo && product.originalPrice && (
            <div 
              className="p-3"
              style={{
                background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
                border: "3px solid #000000",
              }}
            >
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xs line-through text-[#666666]">
                  {product.originalPrice}
                </span>
                <span className="text-lg font-bold text-black">
                  {product.price}
                </span>
                {product.discount && (
                  <span 
                    className="px-2 py-1 text-xs font-bold"
                    style={{
                      background: "#FF0000",
                      color: "#FFFFFF",
                    }}
                  >
                    Экономия {product.discount}!
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Для продуктов (обычная цена, если не акция) */}
          {'price' in item && item.price && !(itemType === 'product' && product?.isPromo) && (
            <div>
              <h3 className="font-bold text-sm mb-1">Цена</h3>
              <div className="flex items-center gap-3">
                <div
                  className="px-2 py-1"
                  style={{
                    background: "#000000",
                    border: "2px solid #000000",
                  }}
                >
                  <p className="text-xs font-bold text-[#FFD700]">
                    {item.price}
                  </p>
                </div>
                {/* Кнопка оплатить для пакетов документов - в таком же квадрате */}
                {itemType === 'product' && 'paymentLink' in item && item.paymentLink && (
                  <a
                    href={item.paymentLink}
                    target="_blank"
                    rel="noreferrer"
                    className="px-2 py-1 text-xs font-bold transition-all hover:scale-[1.02] inline-block"
                    style={{
                      background: "#FFD700",
                      color: "#000000",
                      border: "2px solid #000000",
                    }}
                  >
                    💳 Оплатить
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Убрать длительность для пакетов документов №1 и №2 */}
          {'duration' in item && item.duration && item.id !== 'documents-package-1' && item.id !== 'documents-package-2' && (
            <div>
              <h3 className="font-bold text-sm mb-1">Длительность</h3>
              <p className="text-xs">{item.duration}</p>
            </div>
          )}

          {'level' in item && item.level && (
            <div>
              <h3 className="font-bold text-sm mb-1">Уровень</h3>
              <p className="text-xs">{item.level}</p>
            </div>
          )}

          {/* Для партнеров */}
          {itemType === 'partner' && 'website' in item && item.website && (
            <div>
              <h3 className="font-bold text-sm mb-1">Сайт</h3>
              <a 
                href={item.website} 
                target="_blank" 
                rel="noreferrer"
                className="text-xs text-blue-600 underline hover:text-blue-800 break-all"
              >
                {item.website}
              </a>
            </div>
          )}

          {itemType === 'partner' && 'contact' in item && item.contact && (
            <div>
              <h3 className="font-bold text-sm mb-1">Контакты</h3>
              <p className="text-xs">{item.contact}</p>
            </div>
          )}

          {/* Для документов */}
          {itemType === 'document' && 'documentType' in item && (
            <div>
              <h3 className="font-bold text-sm mb-1">Тип документа</h3>
              <p className="text-xs">{item.documentType}</p>
            </div>
          )}

          {/* Правила конкурса */}
          {itemType === 'contest' && 'rules' in item && item.rules && (
            <div>
              <h3 className="font-bold text-sm mb-2">Правила участия:</h3>
              <ul className="space-y-1">
                {item.rules.map((rule, index) => (
                  <li key={index} className="text-xs flex items-center gap-2">
                    <span className="text-[#FFD700] font-bold">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Услуги партнера */}
          {itemType === 'partner' && 'services' in item && item.services && (
            <div>
              <h3 className="font-bold text-sm mb-2">Услуги:</h3>
              <ul className="space-y-1">
                {item.services.map((service, index) => (
                  <li key={index} className="text-xs flex items-center gap-2">
                    <span className="text-[#FFD700] font-bold">✓</span>
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Основные особенности */}
          <div>
            <h3 className="font-bold text-sm mb-2">Что входит:</h3>
            <ul className="space-y-1">
              {item.features.map((feature, index) => (
                <li key={index} className="text-xs flex items-center gap-2">
                  <span className="text-[#FFD700] font-bold">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Блок доверия для рекламы в Telegram */}
          {itemType === 'product' && 'category' in item && item.category === "Реклама в Telegram" && (
            <div 
              className="p-2 text-xs"
              style={{
                background: "#e8f4fd",
                border: "1px solid #0088cc",
                borderLeft: "4px solid #0088cc",
              }}
            >
              💡 <strong>Индивидуальный подход:</strong> Мы подбираем формат и подачу под ваши задачи, согласовываем каждый материал перед публикацией.
            </div>
          )}
        </div>
      </div>

      {/* Action Button */}
      <div className="p-2">
        {itemType === 'document' ? null : itemType === 'partner' && 'website' in item && item.website ? (
          <button
            onClick={() => window.open(item.website, "_blank", "noreferrer")}
            className="w-full py-2 text-xs font-bold transition-all hover:scale-[1.02]"
            style={{
              background: "#000000",
              color: "#FFD700",
              border: "3px solid",
              borderColor: "#3a3a3a #FFD700 #FFD700 #3a3a3a",
            }}
          >
            🌐 Перейти на сайт партнера
          </button>
        ) : itemType === 'product' && 'paymentLink' in item && item.paymentLink ? (
          // Для продуктов с paymentLink показываем кнопку оплатить вместо стандартной
          <a
            href={item.paymentLink}
            target="_blank"
            rel="noreferrer"
            className="w-full py-2 text-xs font-bold transition-all hover:scale-[1.02] block text-center"
            style={{
              background: "#000000",
              color: "#FFD700",
              border: "3px solid",
              borderColor: "#3a3a3a #FFD700 #FFD700 #3a3a3a",
            }}
          >
            💳 Оплатить
          </a>
        ) : (
          <button
            onClick={handleOrder}
            className="w-full py-2 text-xs font-bold transition-all hover:scale-[1.02]"
            style={{
              background: "#000000",
              color: "#FFD700",
              border: "3px solid",
              borderColor: "#3a3a3a #FFD700 #FFD700 #3a3a3a",
            }}
          >
            {itemType === 'contest' ? '🎯 Участвовать' : 'Заказать / Связаться'}
          </button>
        )}
      </div>
    </div>
  )
}


