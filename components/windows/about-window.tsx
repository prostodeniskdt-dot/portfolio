"use client"

export function AboutWindow() {
  return (
    <div className="text-black text-sm space-y-4">
      {/* Header with animation */}
      <div className="flex gap-4 items-center animate-slide-up">
        <div
          className="w-20 h-20 shrink-0 flex items-center justify-center animate-pulse-glow"
          style={{
            background: "#FFD700",
            border: "3px solid #000000",
          }}
        >
          <span className="text-4xl animate-bounce-subtle">⚡</span>
        </div>

        <div className="flex-1">
          <h2 className="text-xl font-bold text-black animate-glow-text" style={{ color: "#000" }}>
            БАР БОСС ONLINE
          </h2>
          <p className="text-xs text-[#666666]">Образовательный проект</p>
          <div className="flex gap-2 mt-2">
            <span className="px-2 py-0.5 text-xs bg-[#FFD700] text-black font-bold hover:scale-105 transition-transform">
              с 2020
            </span>
            <span className="px-2 py-0.5 text-xs bg-black text-[#FFD700] font-bold hover:scale-105 transition-transform">
              5000+ студентов
            </span>
          </div>
        </div>
      </div>

      {/* Divider with shimmer */}
      <div className="h-1 bg-[#FFD700] relative overflow-hidden">
        <div className="absolute inset-0 animate-shimmer" />
      </div>

      {/* Description with slide animation */}
      <div
        className="p-3 animate-slide-up hover-lift"
        style={{
          background: "#FFD700",
          border: "2px solid #000000",
          animationDelay: "0.1s",
        }}
      >
        <p className="text-xs leading-relaxed text-black font-bold">
          ⚡ Образовательный проект, где вы освоите востребованные навыки дизайна,
          программирования и digital-маркетинга. Учитесь у практиков!
        </p>
      </div>

      {/* Founder section */}
      <div
        className="p-3 animate-slide-up"
        style={{
          background: "#f5f0e1",
          border: "3px solid #000000",
          animationDelay: "0.15s",
        }}
      >
        <div className="flex items-start gap-3 mb-2">
          <div
            className="w-16 h-16 shrink-0 flex items-center justify-center"
            style={{
              background: "#000000",
              border: "2px solid #FFD700",
            }}
          >
            <span className="text-2xl">👨‍💼</span>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-black mb-1">Виталий Аршук</h3>
            <p className="text-xs text-[#666666] mb-2">Основатель BAR BOSS</p>
            <p className="text-xs text-black font-bold">
              Бар-менеджер • Эксперт
            </p>
            <p className="text-xs text-[#666666] mt-1">
              17 лет в барной индустрии
            </p>
          </div>
        </div>
        <p className="text-xs leading-relaxed text-black mt-2">
          Создал BAR BOSS Online, чтобы делиться не теорией, а реальным опытом управления баром. 
          Вы получаете практику, которая работает в реальных условиях.
        </p>
      </div>

      {/* Achievements section */}
      <div
        className="p-3 animate-slide-up"
        style={{
          background: "#000000",
          border: "2px solid #FFD700",
          animationDelay: "0.2s",
        }}
      >
        <h3 className="text-xs font-bold text-[#FFD700] mb-2">🏆 ДОСТИЖЕНИЯ:</h3>
        <div className="space-y-1 text-xs text-[#FFD700]">
          <div className="flex items-start gap-2">
            <span>•</span>
            <span>Запустил более 20 баров в России и СНГ</span>
          </div>
          <div className="flex items-start gap-2">
            <span>•</span>
            <span>Автор онлайн-курса по барному менеджменту с 500+ выпускниками</span>
          </div>
          <div className="flex items-start gap-2">
            <span>•</span>
            <span>Консультант федеральных сетей</span>
          </div>
          <div className="flex items-start gap-2">
            <span>•</span>
            <span>Спикер крупнейших барных форумов</span>
          </div>
          <div className="flex items-start gap-2">
            <span>•</span>
            <span>Эксперт по барному менеджменту</span>
          </div>
        </div>
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
              animationDelay: `${0.25 + i * 0.05}s`,
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
          color: "#FFD700",
          animationDelay: "0.4s",
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
