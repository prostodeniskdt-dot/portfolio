"use client"

import { products } from "@/lib/data"
import { toast } from "sonner"
import { TELEGRAM_LEAD_URL } from "@/lib/links"

interface ProductWindowProps {
  productId: string
}

export function ProductWindow({ productId }: ProductWindowProps) {
  const product = products.find((p) => p.id === productId)

  if (!product) {
    return (
      <div className="p-4 text-black text-sm">
        <div className="text-red-600 font-bold">Ошибка: Продукт не найден</div>
      </div>
    )
  }

  const handleOrder = () => {
    toast.success(`Запрос на "${product.title}" отправлен!`, {
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
        <span className="text-4xl">{product.icon}</span>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-black">{product.title}</h2>
          <p className="text-xs text-[#666666]">{product.category}</p>
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
            <h3 className="font-bold text-sm mb-1">Описание</h3>
            <p className="text-xs leading-relaxed">{product.fullDescription}</p>
          </div>

          {product.price && (
            <div>
              <h3 className="font-bold text-sm mb-1">Цена</h3>
              <p className="text-xs font-bold text-[#FFD700] bg-black px-2 py-1 inline-block">
                {product.price}
              </p>
            </div>
          )}

          {product.duration && (
            <div>
              <h3 className="font-bold text-sm mb-1">Длительность</h3>
              <p className="text-xs">{product.duration}</p>
            </div>
          )}

          {product.level && (
            <div>
              <h3 className="font-bold text-sm mb-1">Уровень</h3>
              <p className="text-xs">{product.level}</p>
            </div>
          )}

          <div>
            <h3 className="font-bold text-sm mb-2">Что входит:</h3>
            <ul className="space-y-1">
              {product.features.map((feature, index) => (
                <li key={index} className="text-xs flex items-center gap-2">
                  <span className="text-[#FFD700] font-bold">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="p-2">
        <button
          onClick={handleOrder}
          className="w-full py-2 text-sm font-bold transition-all duration-200 hover:scale-105"
          style={{
            background: "#000000",
            color: "#FFD700",
            border: "2px solid #FFD700",
          }}
        >
          Заказать / Связаться
        </button>
      </div>
    </div>
  )
}


