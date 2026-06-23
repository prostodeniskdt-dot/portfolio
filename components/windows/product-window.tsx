"use client"

import { products, contests, partners, legalDocuments } from "@/lib/data"
import { toast } from "sonner"
import { TELEGRAM_LEAD_URL } from "@/lib/links"
import { useIsMobile } from "@/hooks/use-mobile"
import { FriendDescriptionWindow } from "./friend-description-window"

interface ProductWindowProps {
  productId: string
}

// Функция для рендеринга markdown жирного текста
function renderMarkdown(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const boldText = part.slice(2, -2)
      return <strong key={index} className="font-bold">{boldText}</strong>
    }
    return <span key={index}>{part}</span>
  })
}

export function ProductWindow({ productId }: ProductWindowProps) {
  // Проверяем, является ли это описанием друга
  if (productId.startsWith('friend-')) {
    return <FriendDescriptionWindow friendId={productId} />
  }

  const isMobile = useIsMobile()
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
        <span className={isMobile ? "text-3xl" : "text-4xl"}>{item.icon}</span>
        <div className="flex-1">
          <h2 className={`${isMobile ? "text-lg" : "text-xl"} font-bold text-black`}>{item.title}</h2>
          <p className="text-xs text-[#666666]">
            {itemType === "product" && productId.startsWith("placements-") ? "Реклама на площадке" : item.category}
          </p>
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
                {renderMarkdown(item.fullDescription)}
              </div>
            ) : itemType === 'contest' && item.id === 'contest-ginster' ? (
              <div className="text-xs leading-relaxed space-y-2">
                <p>Продолжаем знакомить вас с <a href="https://ginstermixmaster.ru/" target="_blank" rel="noreferrer" className="underline text-blue-600 hover:text-blue-800">GINSTER MIX MASTER</a></p>
                <p>Всероссийский конкурс среди барменов по созданию авторских коктейлей. 4 этапа — 4 победителя!</p>
                <p>Сейчас идёт <strong>3 этап — Ginster Пломбир</strong>: джин с характером и приятной ностальгией во вкусе. В основе — классический Ginster London Dry: чистый можжевельник, цитрус, баланс. Ваниль — для тепла, лактоза — для бархатистой сливочной текстуры, и нота пломбира, которую узнаешь с первого глотка. Крепость: 37,5% об.</p>
                <div className="mt-3 p-2" style={{ background: "#FFD700", border: "2px solid #000000" }}>
                  <p className="font-bold mb-2">✏️ КАК ПРИНЯТЬ УЧАСТИЕ:</p>
                  <ol className="list-decimal list-inside space-y-1 mb-2">
                    <li>Пройдите регистрацию на <a href="https://ginstermixmaster.ru/" target="_blank" rel="noreferrer" className="underline text-blue-600 hover:text-blue-800">сайте</a> и заполните заявку (с 15 декабря 2025 по 14 декабря 2026)</li>
                    <li>Разработайте авторский коктейль на джине <strong>Ginster Пломбир</strong> с сезонными ингредиентами</li>
                    <li>Сделайте видео-презентацию коктейля (не более 90 сек.)</li>
                    <li>Выложите видео и рецепт в Instagram* с хэштегом #ginstergin. В кадре — бутылка Ginster и отметка <a href="https://www.instagram.com/gin_ginster" target="_blank" rel="noreferrer" className="underline text-blue-600 hover:text-blue-800">@gin_ginster</a>. Продублируйте видео в Telegram <a href="https://t.me/Ginsteradmin" target="_blank" rel="noreferrer" className="underline text-blue-600 hover:text-blue-800">@Ginsteradmin</a></li>
                    <li>Подпишитесь на TG <a href="https://t.me/ginstergin" target="_blank" rel="noreferrer" className="underline text-blue-600 hover:text-blue-800">@ginstergin</a> и Instagram* <a href="https://www.instagram.com/gin_ginster" target="_blank" rel="noreferrer" className="underline text-blue-600 hover:text-blue-800">@gin_ginster</a></li>
                  </ol>
                  <p className="mb-2">🔍 Читайте внимательно <a href="https://ginstermixmaster.ru/" target="_blank" rel="noreferrer" className="underline text-blue-600 hover:text-blue-800">правила</a></p>
                  <p className="mb-1"><strong>🗓 3 ЭТАП ПРОХОДИТ</strong></p>
                  <p className="mb-1">с 15 июня по 14 августа 2026</p>
                  <p className="mb-1"><strong>🏆 ИТОГИ ЭТАПА</strong></p>
                  <p className="mb-1">до 14 сентября 2026</p>
                  <p className="mb-1"><strong>💰 ПРИЗЫ</strong></p>
                  <p className="mb-1">65 000 ₽ — 1 место</p>
                  <p className="mb-1">35 000 ₽ — 2 место</p>
                  <p className="mt-2">🤝 Удачи Вам</p>
                </div>
              </div>
            ) : itemType === 'product' && productId === 'placements-telegram-barboss' ? (
              <div className="text-xs leading-relaxed space-y-3">
                <p>Аудитория канала - представители барного и ресторанного комьюнити, преимущественно руководители и ЛПР. Контент узкоспециализированный, посвящён барному менеджменту.</p>
                
                <div>
                  <h4 className="font-bold mb-1">Стоимость размещения - 7 500 ₽.</h4>
                  <p>Оплата по безналичному расчёту возможна, стоимость с учётом налога 6% - 7 950 ₽.</p>
                </div>

                <div>
                  <h4 className="font-bold mb-1">В стоимость входит:</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• пост + сторис</li>
                    <li>• дизайн поста в фирменном стиле канала</li>
                    <li>• адаптация текста под стилистику канала</li>
                    <li>• пост остаётся в ленте (удаление возможно по запросу)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold mb-1">Условия сотрудничества:</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• материалы для публикации - за 3 календарных дня</li>
                    <li>• 100% предоплата</li>
                    <li>• согласование поста перед публикацией</li>
                    <li>• маркировка со стороны заказчика</li>
                  </ul>
                </div>
              </div>
            ) : itemType === 'product' && productId === 'placements-telegram-otomosom' ? (
              <div className="text-xs leading-relaxed space-y-3">
                <p>Аудитория канала - представители барного и ресторанного комьюнити</p>
                
                <div>
                  <h4 className="font-bold mb-1">Стоимость размещения - 5 000 ₽.</h4>
                  <p>Оплата по безналичному расчёту возможна, стоимость с учётом налога 6% - 5 300 ₽.</p>
                </div>

                <div>
                  <h4 className="font-bold mb-1">В стоимость входит:</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• пост + сторис</li>
                    <li>• дизайн поста может быть в стиле заказчика или на усмотрение автора</li>
                    <li>• адаптация текста под стилистику канала</li>
                    <li>• пост остаётся в ленте (удаление возможно по запросу)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold mb-1">Условия сотрудничества:</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• материалы для публикации - за 3 календарных дня</li>
                    <li>• 100% предоплата</li>
                    <li>• согласование поста перед публикацией</li>
                    <li>• маркировка со стороны заказчика</li>
                  </ul>
                </div>
              </div>
            ) : itemType === 'product' && productId === 'placements-animated-barboss' ? (
              <div className="text-xs leading-relaxed space-y-3">
                <div>
                  <h4 className="font-bold mb-1">Стоимость размещения - 10 000 ₽.</h4>
                  <p>Оплата по безналичному расчёту возможна, стоимость с учётом налога 6% - 10 600 ₽.</p>
                </div>

                <div>
                  <h4 className="font-bold mb-1">В стоимость входит:</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• анимационный рекламный пост</li>
                    <li>• размещение в ленте канала</li>
                    <li>• адаптация подачи под стилистику площадки</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold mb-1">Условия сотрудничества:</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• материалы для публикации - за 3 календарных дня</li>
                    <li>• согласование поста перед публикацией</li>
                    <li>• 100% предоплата</li>
                    <li>• маркировка со стороны заказчика</li>
                  </ul>
                </div>
              </div>
            ) : itemType === 'product' && productId === 'placements-animated-otomosom' ? (
              <div className="text-xs leading-relaxed space-y-3">
                <div>
                  <h4 className="font-bold mb-1">Стоимость размещения - 7 500 ₽.</h4>
                  <p>Оплата по безналичному расчёту возможна, стоимость с учётом налога 6% - 7 950 ₽.</p>
                </div>

                <div>
                  <h4 className="font-bold mb-1">В стоимость входит:</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• анимационный рекламный пост</li>
                    <li>• размещение в ленте канала</li>
                    <li>• адаптация подачи под стилистику площадки</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold mb-1">Условия сотрудничества:</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• материалы для публикации - за 3 календарных дня</li>
                    <li>• согласование поста перед публикацией</li>
                    <li>• 100% предоплата</li>
                    <li>• маркировка со стороны заказчика</li>
                  </ul>
                </div>
              </div>
            ) : (
              <p className="text-xs leading-relaxed">{item.fullDescription}</p>
            )}
          </div>

          {/* Изображение статистики для Telegram каналов */}
          {itemType === 'product' && (productId === 'placements-telegram-barboss' || productId === 'placements-telegram-otomosom') && (
            <div className="w-full">
              <img
                src={productId === 'placements-telegram-barboss' 
                  ? "/images/stats/telegram-barboss-stats.jpg"
                  : "/images/stats/telegram-otomosom-stats.jpg"
                }
                alt={productId === 'placements-telegram-barboss'
                  ? "Статистика Telegram BAR BOSS ONLINE"
                  : "Статистика Telegram О том о сём"
                }
                className="w-full h-auto"
                style={{
                  border: "2px solid #000000",
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
          )}

          {/* Видеообзоры для пакетов документов */}
          {itemType === 'product' && 'videoReviewLink' in item && item.videoReviewLink && (
            <div>
              <a
                href={item.videoReviewLink}
                target="_blank"
                rel="noreferrer"
                className={`inline-block font-bold transition-all hover:scale-[1.02] ${isMobile ? "px-2 py-1 text-[10px]" : "px-3 py-2 text-xs"}`}
                style={{
                  background: "#FFFFFF",
                  color: "#000000",
                  border: "2px solid #000000",
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
                className={`inline-block font-bold transition-all hover:scale-[1.02] ${isMobile ? "px-2 py-1 text-[10px]" : "px-3 py-2 text-xs"}`}
                style={{
                  background: "#FFFFFF",
                  color: "#000000",
                  border: "2px solid #000000",
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
          {'price' in item && item.price && !(itemType === 'product' && product?.isPromo) && !(itemType === 'product' && (productId === 'placements-telegram-barboss' || productId === 'placements-telegram-otomosom' || productId === 'placements-animated-barboss' || productId === 'placements-animated-otomosom')) && (
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
                  <p className="text-xs font-bold text-[#FFD700] whitespace-nowrap">
                    {item.price}
                  </p>
                </div>
                {/* Кнопка оплатить для пакетов документов - в таком же квадрате */}
                {itemType === 'product' && 'paymentLink' in item && item.paymentLink && (
                  <a
                    href={item.paymentLink}
                    target="_blank"
                    rel="noreferrer"
                    className={`font-bold transition-all hover:scale-[1.02] inline-block ${isMobile ? "px-2 py-1 text-[10px]" : "px-2 py-1 text-xs"}`}
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

          {/* Кнопки для инвентаря */}
          {itemType === 'product' && productId === 'inventory-lvl1' && (
            <div>
              <div className="flex flex-col gap-2 mt-3">
                <a
                  href="https://t.me/BarBoss87/1620"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 text-xs font-bold transition-all hover:scale-[1.02] text-center"
                  style={{
                    background: "#FFD700",
                    color: "#000000",
                    border: "2px solid #000000",
                  }}
                >
                  📦 Распаковка набора BY BAR BOSS
                </a>
                <a
                  href="https://t.me/BarBoss87/1634"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 text-xs font-bold transition-all hover:scale-[1.02] text-center"
                  style={{
                    background: "#FFD700",
                    color: "#000000",
                    border: "2px solid #000000",
                  }}
                >
                  🎒 Отцовский набор, все что нужно для снятия ивента
                </a>
                <a
                  href="https://t.me/BarBoss87/1644"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 text-xs font-bold transition-all hover:scale-[1.02] text-center"
                  style={{
                    background: "#FFD700",
                    color: "#000000",
                    border: "2px solid #000000",
                  }}
                >
                  📖 Короткая инструкция по пользованию приложением
                </a>
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

          {/* Основные особенности - только для не-документов и не рекламных продуктов с специальным форматированием */}
          {itemType !== 'document' && item.features && item.features.length > 0 && !(itemType === 'product' && (productId === 'placements-telegram-barboss' || productId === 'placements-telegram-otomosom' || productId === 'placements-animated-barboss' || productId === 'placements-animated-otomosom')) && (
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
          )}

          {/* Блок доверия для рекламы в Telegram (только для не-рекламных продуктов с специальным форматированием) */}
          {itemType === 'product' && 'category' in item && item.category === "Реклама в Telegram" && !(productId === 'placements-telegram-barboss' || productId === 'placements-telegram-otomosom' || productId === 'placements-animated-barboss' || productId === 'placements-animated-otomosom') && (
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
      <div className="p-2 space-y-2">
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
        ) : itemType === 'product' && productId === 'documents-package-3' ? (
          // Пакет документов №3 неактивен
          <button
            disabled
            className="w-full py-2 text-xs font-bold opacity-50 cursor-not-allowed"
            style={{
              background: "#cccccc",
              color: "#666666",
              border: "3px solid",
              borderColor: "#999999 #666666 #666666 #999999",
            }}
          >
            Недоступно
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
        ) : itemType === 'product' && (productId === 'placements-telegram-barboss' || productId === 'placements-telegram-otomosom' || productId === 'placements-animated-barboss' || productId === 'placements-animated-otomosom') ? (
          // Для рекламных продуктов с специальным форматированием показываем кнопку "Связаться"
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
            Связаться
          </button>
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


