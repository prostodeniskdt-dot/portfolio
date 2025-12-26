"use client"

export function RetroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ imageRendering: "crisp-edges" }}>
      {/* Базовый фон - кремово-желтый градиент */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at top left, rgba(184, 134, 11, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at bottom right, rgba(184, 134, 11, 0.06) 0%, transparent 50%),
            radial-gradient(ellipse at center, rgba(0, 0, 0, 0.02) 0%, transparent 70%),
            linear-gradient(135deg, #f5f0e1 0%, #faf8f0 50%, #f5f0e1 100%)
          `,
        }}
      />
      
      {/* Тонкие декоративные линии */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 100px,
              rgba(184, 134, 11, 0.03) 100px,
              rgba(184, 134, 11, 0.03) 101px
            ),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 100px,
              rgba(184, 134, 11, 0.03) 100px,
              rgba(184, 134, 11, 0.03) 101px
            )
          `,
        }}
      />
      
      {/* Мягкие акцентные точки */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(184, 134, 11, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(184, 134, 11, 0.04) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.01) 0%, transparent 60%)
          `,
        }}
      />

      {/* Пиксельная барная станция */}
      <div className="absolute bottom-0 right-8 flex items-end gap-1 opacity-20 pointer-events-none">
        {/* Барная стойка */}
        <div className="relative" style={{ width: '120px', height: '80px' }}>
          {/* Столешница */}
          <div
            className="absolute bottom-12 left-0 right-0"
            style={{
              height: '8px',
              background: 'linear-gradient(180deg, #8b6914 0%, #6b5010 100%)',
              border: '2px solid #000',
              boxShadow: '0 4px 0 rgba(0,0,0,0.3)',
            }}
          />
          {/* Основание стойки */}
          <div
            className="absolute bottom-0 left-2 right-2"
            style={{
              height: '48px',
              background: 'linear-gradient(90deg, #5a4a2a 0%, #4a3a1a 50%, #5a4a2a 100%)',
              border: '2px solid #000',
            }}
          />
        </div>

        {/* Бутылки */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="relative"
            style={{
              width: '12px',
              height: `${45 + i * 5}px`,
              marginBottom: '20px',
            }}
          >
            {/* Горлышко */}
            <div
              style={{
                width: '6px',
                height: '12px',
                margin: '0 auto',
                background: i === 1 ? '#b8860b' : i === 0 ? '#8b6914' : '#6b5010',
                border: '1px solid #000',
              }}
            />
            {/* Тело бутылки */}
            <div
              style={{
                width: '12px',
                height: `${28 + i * 5}px`,
                background: i === 1 ? 'rgba(184, 134, 11, 0.3)' : i === 0 ? 'rgba(139, 105, 20, 0.3)' : 'rgba(107, 80, 16, 0.3)',
                border: '1px solid #000',
                marginTop: '2px',
              }}
            />
          </div>
        ))}

        {/* Бокалы */}
        {[0, 1].map((i) => (
          <div
            key={`glass-${i}`}
            className="relative"
            style={{
              width: '16px',
              height: '24px',
              marginBottom: '20px',
              marginLeft: '8px',
            }}
          >
            {/* Чаша бокала */}
            <div
              style={{
                width: '16px',
                height: '16px',
                background: 'rgba(184, 134, 11, 0.1)',
                border: '2px solid rgba(0,0,0,0.4)',
                borderRadius: '2px 2px 8px 8px',
              }}
            />
            {/* Ножка */}
            <div
              style={{
                width: '4px',
                height: '6px',
                margin: '0 auto',
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid rgba(0,0,0,0.4)',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
