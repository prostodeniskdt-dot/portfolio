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
          <p className="text-xs text-[#666666]">Команда</p>
          <div className="flex gap-2 mt-2">
            <span className="px-2 py-0.5 text-xs bg-[#FFD700] text-black font-bold hover:scale-105 transition-transform">
              с 2021
            </span>
            <span className="px-2 py-0.5 text-xs bg-black text-[#FFD700] font-bold hover:scale-105 transition-transform">
              1000+ студентов
            </span>
          </div>
        </div>
      </div>

      {/* Divider with shimmer */}
      <div className="h-1 bg-[#FFD700] relative overflow-hidden">
        <div className="absolute inset-0 animate-shimmer" />
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
            className="w-48 h-48 shrink-0 overflow-hidden"
            style={{
              border: "3px solid #FFD700",
            }}
          >
            <img src="/images/team/vitaly.jpg" alt="Виталий Аршук" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-black mb-1">Виталий Аршук</h3>
            <p className="text-xs text-[#666666] mb-2">Основатель BAR BOSS</p>
            <p className="text-xs text-black font-bold">
              Менеджер бара • Эксперт
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

        {/* Виталий - Достижения */}
        <div className="mt-3 p-2" style={{ background: "#000000", border: "2px solid #FFD700" }}>
          <h4 className="text-xs font-bold text-[#FFD700] mb-1">🏆 ДОСТИЖЕНИЯ:</h4>
          <div className="space-y-0.5 text-xs text-[#FFD700]">
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
      </div>

      {/* Denis Kolodeshnikov section */}
      <div
        className="p-3 animate-slide-up"
        style={{
          background: "#f5f0e1",
          border: "3px solid #000000",
          animationDelay: "0.18s",
        }}
      >
        <div className="flex items-start gap-3 mb-2">
          <div
            className="w-48 h-48 shrink-0 overflow-hidden"
            style={{
              border: "3px solid #FFD700",
            }}
          >
            <img src="/images/team/denis.jpg" alt="Денис Колодешников" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-black mb-1">Денис Колодешников</h3>
            <p className="text-xs text-[#666666] mb-2">Руководитель ИИ направления</p>
            <p className="text-xs text-black font-bold">
              AI-эксперт • Автоматизация
            </p>
            <p className="text-xs text-[#666666] mt-1">
              Санкт-Петербург 📍
            </p>
            <p className="text-xs text-[#666666] mt-1">
              5 лет в индустрии, работал на руководящих позициях
            </p>
          </div>
        </div>
        <p className="text-xs leading-relaxed text-black mt-2">
          Отвечает за внедрение AI-решений и автоматизацию барных процессов. 
          Помогает внедрять современные технологии для оптимизации работы заведений.
        </p>
        
        {/* Денис - Достижения */}
        <div className="mt-3 p-2" style={{ background: "#000000", border: "2px solid #FFD700" }}>
          <h4 className="text-xs font-bold text-[#FFD700] mb-1">🏆 ДОСТИЖЕНИЯ:</h4>
          <div className="space-y-0.5 text-xs text-[#FFD700]">
            <div className="flex items-start gap-2">
              <span>•</span>
              <span>Разработал AI-системы для автоматизации баров</span>
            </div>
            <div className="flex items-start gap-2">
              <span>•</span>
              <span>Внедрил чат-ботов для обработки заказов</span>
            </div>
            <div className="flex items-start gap-2">
              <span>•</span>
              <span>Создал аналитические дашборды для менеджмента</span>
            </div>
            <div className="flex items-start gap-2">
              <span>•</span>
              <span>Обучил команду работе с AI-инструментами</span>
            </div>
          </div>
        </div>
      </div>

      {/* Valeria Kolodeshnikova section */}
      <div
        className="p-3 animate-slide-up"
        style={{
          background: "#f5f0e1",
          border: "3px solid #000000",
          animationDelay: "0.19s",
        }}
      >
        <div className="flex items-start gap-3 mb-2">
          <div
            className="w-48 h-48 shrink-0 overflow-hidden"
            style={{
              border: "3px solid #FFD700",
            }}
          >
            <img src="/images/team/valeria.jpg" alt="Валерия Колодешникова" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-black mb-1">Валерия Колодешникова</h3>
            <p className="text-xs text-[#666666] mb-2">Руководитель маркетингового отдела</p>
            <p className="text-xs text-black font-bold">
              Маркетолог • Коммуникации
            </p>
            <p className="text-xs text-[#666666] mt-1">
              Санкт-Петербург 📍
            </p>
          </div>
        </div>
        <p className="text-xs leading-relaxed text-black mt-2">
          Управляет стратегией продвижения и коммуникацией с клиентами. 
          Создаёт эффективные маркетинговые кампании и развивает бренд BAR BOSS.
        </p>
        
        {/* Валерия - Достижения */}
        <div className="mt-3 p-2" style={{ background: "#000000", border: "2px solid #FFD700" }}>
          <h4 className="text-xs font-bold text-[#FFD700] mb-1">🏆 ДОСТИЖЕНИЯ:</h4>
          <div className="space-y-0.5 text-xs text-[#FFD700]">
            <div className="flex items-start gap-2">
              <span>•</span>
              <span>Увеличила охват аудитории на 300%</span>
            </div>
            <div className="flex items-start gap-2">
              <span>•</span>
              <span>Запустила успешные рекламные кампании</span>
            </div>
            <div className="flex items-start gap-2">
              <span>•</span>
              <span>Разработала стратегию контент-маркетинга</span>
            </div>
            <div className="flex items-start gap-2">
              <span>•</span>
              <span>Организовала участие в крупных конференциях</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
