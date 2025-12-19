"use client"

export function AboutWindow() {
  return (
    <div className="text-black text-sm space-y-4">
      {/* Header with animation */}
      <div className="flex gap-4 items-center animate-slide-up">
        <div
          className="w-20 h-20 shrink-0 flex items-center justify-center animate-pulse-glow"
          style={{
            background: "#f8cf2c",
            border: "3px solid #000000",
          }}
        >
          <span className="text-4xl animate-bounce-subtle">⚡</span>
        </div>

        <div className="flex-1">
          <h2 className="text-xl font-bold text-black animate-glow-text" style={{ color: "#000" }}>
            BARBOSS ONLINE
          </h2>
          <p className="text-xs text-[#666666]">Онлайн-школа креативных профессий</p>
          <div className="flex gap-2 mt-2">
            <span className="px-2 py-0.5 text-xs bg-[#f8cf2c] text-black font-bold hover:scale-105 transition-transform">
              с 2020
            </span>
            <span className="px-2 py-0.5 text-xs bg-black text-[#f8cf2c] font-bold hover:scale-105 transition-transform">
              5000+ студентов
            </span>
          </div>
        </div>
      </div>

      {/* Divider with shimmer */}
      <div className="h-1 bg-[#f8cf2c] relative overflow-hidden">
        <div className="absolute inset-0 animate-shimmer" />
      </div>

      {/* Description with slide animation */}
      <div
        className="p-3 animate-slide-up hover-lift"
        style={{
          background: "#f8cf2c",
          border: "2px solid #000000",
          animationDelay: "0.1s",
        }}
      >
        <p className="text-xs leading-relaxed text-black font-bold">
          ⚡ BARBOSS ONLINE — это современная онлайн-школа, где вы освоите востребованные навыки дизайна,
          программирования и digital-маркетинга. Учитесь у практиков!
        </p>
      </div>

      {/* Features with staggered animations */}
      <div className="grid grid-cols-2 gap-2">
        {[
          { icon: "🎯", text: "Практика с первого дня" },
          { icon: "👨‍🏫", text: "Менторская поддержка" },
          { icon: "📜", text: "Сертификат по окончании" },
          { icon: "💼", text: "Помощь с трудоустройством" },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2 p-2 animate-slide-up hover-lift cursor-pointer"
            style={{
              background: "#f5f0e1",
              border: "2px solid #000000",
              animationDelay: `${0.15 + i * 0.05}s`,
            }}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-xs">{item.text}</span>
          </div>
        ))}
      </div>

      {/* Stats with animation */}
      <div
        className="p-2 text-xs space-y-1 animate-slide-up"
        style={{
          background: "#000000",
          color: "#f8cf2c",
          animationDelay: "0.3s",
        }}
      >
        <div className="flex justify-between">
          <span>📊 Завершённых курсов:</span>
          <span className="font-bold animate-flicker">12,450+</span>
        </div>
        <div className="flex justify-between">
          <span>⭐ Средняя оценка:</span>
          <span className="font-bold animate-flicker">4.9/5</span>
        </div>
      </div>
    </div>
  )
}
