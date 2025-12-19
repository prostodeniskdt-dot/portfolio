"use client"

import { useState } from "react"
import { prices } from "@/lib/data"

export function PricesWindow() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [showMessage, setShowMessage] = useState(false)

  const handleSelectPlan = (planId: string, planName: string) => {
    setSelectedPlan(planId)
    setShowMessage(true)

    // Здесь можно добавить логику редиректа или открытия формы контактов
    // Например, можно использовать событие для открытия окна контактов
    // window.dispatchEvent(new CustomEvent('openContactWindow'))

    // Автоматически скрыть сообщение через 3 секунды
    setTimeout(() => {
      setShowMessage(false)
      setSelectedPlan(null)
    }, 3000)
  }

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

      {/* Success message */}
      {showMessage && selectedPlan && (
        <div
          className="p-2 text-xs font-bold text-center animate-slide-up"
          style={{
            background: "#f8cf2c",
            border: "2px solid #000000",
            color: "#000000",
          }}
        >
          ✓ Тариф "{prices.find((p) => p.id === selectedPlan)?.name}" выбран!
          <br />
          <span className="text-[10px]">Свяжитесь с нами для оформления</span>
        </div>
      )}

      {prices.map((plan, index) => (
        <div
          key={plan.id}
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
            onClick={() => handleSelectPlan(plan.id, plan.name)}
            className="w-full mt-3 py-1.5 text-xs font-bold transition-all duration-200 hover:scale-105 disabled:opacity-50"
            disabled={showMessage}
            style={{
              background: plan.color === "#000000" ? "#f8cf2c" : "#000000",
              color: plan.color === "#000000" ? "#000000" : "#f8cf2c",
              border: "2px solid",
              borderColor: plan.color === "#000000" ? "#000000" : "#f8cf2c",
            }}
          >
            {selectedPlan === plan.id && showMessage ? "✓ ВЫБРАНО" : "ВЫБРАТЬ"}
          </button>
        </div>
      ))}
    </div>
  )
}
