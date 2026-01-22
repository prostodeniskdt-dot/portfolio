"use client"

import { useIsMobile } from "@/hooks/use-mobile"

export function AboutWindow() {
  const isMobile = useIsMobile()
  return (
    <div className="text-black text-sm space-y-6">
      {/* Header with animation */}
      <div className="flex gap-4 items-center animate-slide-up">
        <div
          className="w-20 h-20 shrink-0 flex items-center justify-center animate-pulse-glow"
          style={{
            background: "#FFD700",
            border: "3px solid #000000",
          }}
        >
          <span className={`${isMobile ? "text-3xl" : "text-4xl"} animate-bounce-subtle`}>⚡</span>
        </div>

        <div className="flex-1">
          <h2 className={`${isMobile ? "text-lg" : "text-xl"} font-bold text-black animate-glow-text`} style={{ color: "#000" }}>
            БАР БОСС ONLINE
          </h2>
          <p className="text-xs text-[#666666]">Команда</p>
          <div className="flex gap-2 mt-2">
            <span className="px-2 py-0.5 text-xs bg-[#FFD700] text-black font-bold hover:scale-105 transition-transform">
              с 2022
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
        className="animate-slide-up p-4" 
        style={{ 
          animationDelay: "0.15s",
          background: "#f5f0e1",
          border: "3px solid #000000",
        }}
      >
        <div className="flex gap-4 items-stretch">
          {/* Портрет слева */}
          <div className="w-64 shrink-0 overflow-hidden relative">
            <img 
              src="/images/team/vitaly.jpg" 
              alt="Виталий Аршук" 
              className="w-full h-full object-cover" 
            />
          </div>

          {/* Текстовая информация справа */}
          <div className="flex-1 flex flex-col gap-2 h-full">
            {/* Верхняя секция - информация */}
            <div className="bg-white p-3">
              <h3 className="text-sm font-bold text-black mb-0.5">Виталий Аршук</h3>
              <p className="text-xs text-[#666666] mb-1">Основатель Bar Boss Online</p>
              <p className="text-xs text-black font-bold mb-0.5">
                Эксперт по барному менеджменту
              </p>
              <p className="text-xs text-[#666666]">
                18 лет в ресторанной индустрии
              </p>
              <p className="text-xs text-[#666666] mt-0.5">
                Москва 📍
              </p>
            </div>

            {/* Средняя секция - описание */}
            <div className="bg-white p-3">
              <p className="text-xs leading-relaxed text-black">
                Создал образовательный проект Bar Boss Online (2022), чтобы владельцы, управляющие, шеф-бармены и менеджеры баров получали прикладные инструменты управления баром: от запуска и меню до команды, стандартов и контроля показателей. Фокус на системном результате и решениях, которые работают в реальных условиях.
              </p>
            </div>

            {/* Нижняя секция - достижения */}
            <div className="bg-black p-3 flex-1 flex flex-col" style={{ border: "2px solid #FFD700" }}>
              <h4 className="text-xs font-bold text-[#FFD700] mb-1">🏆 ДОСТИЖЕНИЯ:</h4>
              <div className="space-y-0.5 text-xs text-[#FFD700] flex-1">
                <div className="flex items-start gap-2">
                  <span>•</span>
                  <span>Запустил 50+ баров в России и СНГ</span>
                </div>
                <div className="flex items-start gap-2">
                  <span>•</span>
                  <span>Автор образовательных программ: 1000+ выпускников</span>
                </div>
                <div className="flex items-start gap-2">
                  <span>•</span>
                  <span>Основатель Академию Bar Boss (2-дневный формат) в городах России</span>
                </div>
                <div className="flex items-start gap-2">
                  <span>•</span>
                  <span>Создатель «Музея Негрони» (150+ авторских вариаций)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span>•</span>
                  <span>Коллекционер барных меню. На июнь 2024 в коллекции 1454 экземпляра из 55 стран, это самая большая коллекция в России и Европе</span>
                </div>
                <div className="flex items-start gap-2">
                  <span>•</span>
                  <span>Спикер в Moscow Bar Show, Hurma Insider, Учебном Центре Романа Торощина, Нетологии, Saint Petersburg Cocktail Week, ПИР</span>
                </div>
                <div className="flex items-start gap-2">
                  <span>•</span>
                  <span>Организатор и судья профессиональных конкурсов (Fin Fusion, Mathieu Teisseire)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span>•</span>
                  <span>Финалист конкурсов Jameson Bartenders Ball, Nikka Perfect Serve, Angostura Global Cocktail Challenge</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Denis Kolodeshnikov section */}
      <div 
        className="animate-slide-up p-4" 
        style={{ 
          animationDelay: "0.18s",
          background: "#f5f0e1",
          border: "3px solid #000000",
        }}
      >
        <div className="flex gap-4 items-stretch">
          {/* Портрет слева */}
          <div className="w-64 shrink-0 overflow-hidden relative">
            <img 
              src="/images/team/denis.jpg" 
              alt="Денис Колодешников" 
              className="w-full h-full object-cover" 
            />
          </div>

          {/* Текстовая информация справа */}
          <div className="flex-1 flex flex-col gap-2 h-full">
            {/* Верхняя секция - информация */}
            <div className="bg-white p-3">
              <h3 className="text-sm font-bold text-black mb-0.5">Денис Колодешников</h3>
              <p className="text-xs text-[#666666] mb-1">Руководитель ИИ направления</p>
              <p className="text-xs text-black font-bold mb-0.5">
                AI-эксперт • Автоматизация
              </p>
              <p className="text-xs text-[#666666]">
                Санкт-Петербург 📍
              </p>
              <p className="text-xs text-[#666666] mt-0.5">
                5 лет в индустрии, работал на руководящих позициях
              </p>
            </div>

            {/* Средняя секция - описание */}
            <div className="bg-white p-3">
              <p className="text-xs leading-relaxed text-black">
                Отвечает за внедрение AI-решений и автоматизацию процессов. Помогает оптимизировать работу заведений за счёт технологий, аналитики и понятных инструментов для команды.
              </p>
            </div>

            {/* Нижняя секция - достижения */}
            <div className="bg-black p-3 flex-1 flex flex-col" style={{ border: "2px solid #FFD700" }}>
              <h4 className="text-xs font-bold text-[#FFD700] mb-1">🏆 ДОСТИЖЕНИЯ:</h4>
              <div className="space-y-0.5 text-xs text-[#FFD700] flex-1">
                <div className="flex items-start gap-2">
                  <span>•</span>
                  <span>Разработал AI-инструменты для автоматизации задач в баре</span>
                </div>
                <div className="flex items-start gap-2">
                  <span>•</span>
                  <span>Внедрил чат-ботов для обработки заказов и обращений</span>
                </div>
                <div className="flex items-start gap-2">
                  <span>•</span>
                  <span>Настроил дашборды и отчётность для управленческих решений</span>
                </div>
                <div className="flex items-start gap-2">
                  <span>•</span>
                  <span>Обучил команду работе с AI-инструментами и регламентами</span>
                </div>
                <div className="flex items-start gap-2">
                  <span>•</span>
                  <span>Работал менеджером бара в 4 проектах</span>
                </div>
                <div className="flex items-start gap-2">
                  <span>•</span>
                  <span>Автор Telegram-канала «О том о сём» о барной литературе</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Valeria Kolodeshnikova section */}
      <div 
        className="animate-slide-up p-4" 
        style={{ 
          animationDelay: "0.19s",
          background: "#f5f0e1",
          border: "3px solid #000000",
        }}
      >
        <div className="flex gap-4 items-stretch">
          {/* Портрет слева */}
          <div className="w-64 shrink-0 overflow-hidden relative">
            <img 
              src="/images/team/valeria.jpg" 
              alt="Валерия Колодешникова" 
              className="w-full h-full object-cover" 
            />
          </div>

          {/* Текстовая информация справа */}
          <div className="flex-1 flex flex-col gap-2 h-full">
            {/* Верхняя секция - информация */}
            <div className="bg-white p-3">
              <h3 className="text-sm font-bold text-black mb-0.5">Валерия Колодешникова</h3>
              <p className="text-xs text-[#666666] mb-1">Руководитель контент направления</p>
              <p className="text-xs text-black font-bold mb-0.5">
                Маркетолог • Коммуникации
              </p>
              <p className="text-xs text-[#666666]">
                Санкт-Петербург 📍
              </p>
            </div>

            {/* Средняя секция - описание */}
            <div className="bg-white p-3">
              <p className="text-xs leading-relaxed text-black">
                Управляет стратегией продвижения и коммуникацией с клиентами. Развивает бренд BAR BOSS.
              </p>
            </div>

            {/* Нижняя секция - достижения */}
            <div className="bg-black p-3 flex-1 flex flex-col" style={{ border: "2px solid #FFD700" }}>
              <h4 className="text-xs font-bold text-[#FFD700] mb-1">🏆 ДОСТИЖЕНИЯ:</h4>
              <div className="space-y-0.5 text-xs text-[#FFD700] flex-1">
                <div className="flex items-start gap-2">
                  <span>•</span>
                  <span>Контент-менеджер проекта Bar Boss Online</span>
                </div>
                <div className="flex items-start gap-2">
                  <span>•</span>
                  <span>Редактор Telegram-канала «о том о сём»</span>
                </div>
                <div className="flex items-start gap-2">
                  <span>•</span>
                  <span>Съёмка и монтаж роликов (Reels/Shorts)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span>•</span>
                  <span>AI-креативы для продвижения</span>
                </div>
                <div className="flex items-start gap-2">
                  <span>•</span>
                  <span>Сбор и систематизация данных под контент и маркетинг</span>
                </div>
                <div className="flex items-start gap-2">
                  <span>•</span>
                  <span>Подготовка к запуску рекламных размещений</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
