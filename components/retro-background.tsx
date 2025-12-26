"use client"

export function RetroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ imageRendering: "crisp-edges" }}>
      {/* Базовый фон - черно-желтый градиент */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at top left, rgba(184, 134, 11, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at bottom right, rgba(184, 134, 11, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse at center, rgba(184, 134, 11, 0.08) 0%, transparent 70%),
            linear-gradient(135deg, #000000 0%, #1a1a1a 30%, #0a0a0a 70%, #000000 100%)
          `,
        }}
      />
      
      {/* Тонкие декоративные линии - желтые на черном */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 100px,
              rgba(184, 134, 11, 0.08) 100px,
              rgba(184, 134, 11, 0.08) 101px
            ),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 100px,
              rgba(184, 134, 11, 0.08) 100px,
              rgba(184, 134, 11, 0.08) 101px
            )
          `,
        }}
      />
      
      {/* Мягкие акцентные точки - желтые на черном */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(184, 134, 11, 0.12) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(184, 134, 11, 0.10) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(184, 134, 11, 0.06) 0%, transparent 60%)
          `,
        }}
      />

      {/* Пиксельная барная станция - увеличенная */}
      <div className="absolute bottom-0 right-12 flex items-end gap-3 opacity-30 pointer-events-none" style={{ transform: 'scale(2.5)', transformOrigin: 'bottom right' }}>
        {/* Барная стойка */}
        <div className="relative" style={{ width: '120px', height: '80px' }}>
          {/* Столешница */}
          <div
            className="absolute bottom-12 left-0 right-0"
            style={{
              height: '8px',
              background: 'linear-gradient(180deg, #b8860b 0%, #8b6914 50%, #6b5010 100%)',
              border: '2px solid #000',
              boxShadow: '0 4px 0 rgba(0,0,0,0.5)',
            }}
          />
          {/* Основание стойки */}
          <div
            className="absolute bottom-0 left-2 right-2"
            style={{
              height: '48px',
              background: 'linear-gradient(90deg, #8b6914 0%, #6b5010 30%, #5a4a2a 50%, #6b5010 70%, #8b6914 100%)',
              border: '2px solid #000',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)',
            }}
          />
          {/* Декоративные полки внутри стойки */}
          <div
            className="absolute bottom-20 left-4 right-4"
            style={{
              height: '3px',
              background: 'rgba(139, 105, 20, 0.6)',
              border: '1px solid rgba(0,0,0,0.3)',
            }}
          />
        </div>

        {/* Бутылки - увеличенные */}
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
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
              }}
            />
            {/* Тело бутылки */}
            <div
              style={{
                width: '12px',
                height: `${28 + i * 5}px`,
                background: i === 1 
                  ? 'linear-gradient(90deg, rgba(184, 134, 11, 0.5) 0%, rgba(184, 134, 11, 0.3) 50%, rgba(184, 134, 11, 0.5) 100%)' 
                  : i === 0 
                  ? 'linear-gradient(90deg, rgba(139, 105, 20, 0.5) 0%, rgba(139, 105, 20, 0.3) 50%, rgba(139, 105, 20, 0.5) 100%)' 
                  : 'linear-gradient(90deg, rgba(107, 80, 16, 0.5) 0%, rgba(107, 80, 16, 0.3) 50%, rgba(107, 80, 16, 0.5) 100%)',
                border: '1px solid #000',
                marginTop: '2px',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
              }}
            />
            {/* Этикетка на бутылке */}
            <div
              style={{
                position: 'absolute',
                top: '18px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '8px',
                height: '6px',
                background: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid rgba(0,0,0,0.5)',
              }}
            />
          </div>
        ))}

        {/* Бокалы - увеличенные */}
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
                background: 'linear-gradient(180deg, rgba(184, 134, 11, 0.3) 0%, rgba(184, 134, 11, 0.1) 100%)',
                border: '2px solid rgba(184, 134, 11, 0.6)',
                borderRadius: '2px 2px 8px 8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
              }}
            />
            {/* Ножка */}
            <div
              style={{
                width: '4px',
                height: '6px',
                margin: '0 auto',
                background: 'rgba(184, 134, 11, 0.5)',
                border: '1px solid rgba(0,0,0,0.4)',
              }}
            />
            {/* Основание */}
            <div
              style={{
                width: '8px',
                height: '2px',
                margin: '0 auto',
                background: 'rgba(184, 134, 11, 0.6)',
                border: '1px solid rgba(0,0,0,0.4)',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
