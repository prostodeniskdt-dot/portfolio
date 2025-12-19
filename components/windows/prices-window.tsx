"use client"

const prices = [
  {
    name: "Базовый",
    price: "9 900 ₽/мес",
    features: ["Видеоуроки", "Домашние задания", "Чат поддержки"],
    color: "#f5f0e1",
  },
  {
    name: "Оптимальный",
    price: "14 900 ₽/мес",
    features: ["Всё из Базового", "Проверка ДЗ", "Групповые созвоны"],
    color: "#f8cf2c",
  },
  {
    name: "Премиум",
    price: "24 900 ₽/мес",
    features: ["Всё из Оптимального", "Личный ментор", "Карьерный коуч"],
    color: "#000000",
  },
]

export function PricesWindow() {
  return (
    <div className="text-black text-sm space-y-3">
      {/* Header */}
      <div
        className="p-2 text-xs font-bold text-center"
        style={{
          background: "#f8cf2c",
          border: "2px solid #000000",
        }}
      >
        💰 ТАРИФНЫЕ ПЛАНЫ
      </div>

      {prices.map((plan, index) => (
        <div
          key={index}
          className="p-3"
          style={{
            background: plan.color,
            border: "3px solid",
            borderColor: plan.color === "#000000" ? "#f8cf2c" : "#000000",
            color: plan.color === "#000000" ? "#f8cf2c" : "#000000",
          }}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-base">{plan.name}</span>
            <span className="font-bold">{plan.price}</span>
          </div>
          <ul className="space-y-1">
            {plan.features.map((feature, i) => (
              <li key={i} className="text-xs flex items-center gap-2">
                <span>✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <button
            className="w-full mt-3 py-1.5 text-xs font-bold transition-colors"
            style={{
              background: plan.color === "#000000" ? "#f8cf2c" : "#000000",
              color: plan.color === "#000000" ? "#000000" : "#f8cf2c",
              border: "2px solid",
              borderColor: plan.color === "#000000" ? "#000000" : "#f8cf2c",
            }}
          >
            ВЫБРАТЬ
          </button>
        </div>
      ))}
    </div>
  )
}
