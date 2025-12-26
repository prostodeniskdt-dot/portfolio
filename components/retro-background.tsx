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

      {/* Пиксельная барная станция - полная версия с полками */}
      <div className="absolute bottom-0 right-8 opacity-35 pointer-events-none" style={{ transform: 'scale(2.8)', transformOrigin: 'bottom right' }}>
        <div className="relative" style={{ width: '240px', height: '200px' }}>
          {/* Вертикальная стена */}
          <div
            className="absolute bottom-0 right-0"
            style={{
              width: '240px',
              height: '160px',
              background: 'linear-gradient(180deg, #5a4a2a 0%, #4a3a1a 50%, #3a2a1a 100%)',
              border: '3px solid #000',
              boxShadow: 'inset 0 0 20px rgba(0,0,0,0.3)',
            }}
          />

          {/* Полки на стене (3 штуки) */}
          {[
            { top: '20px', width: '180px' },   // Верхняя полка
            { top: '60px', width: '200px' },   // Средняя полка
            { top: '100px', width: '220px' },  // Нижняя полка
          ].map((shelf, shelfIndex) => (
            <div
              key={shelfIndex}
              className="absolute left-0"
              style={{
                top: shelf.top,
                width: shelf.width,
                height: '6px',
                background: 'linear-gradient(180deg, #8b6914 0%, #6b5010 50%, #5a4a2a 100%)',
                border: '2px solid #000',
                boxShadow: '0 2px 4px rgba(0,0,0,0.5), inset 0 1px 2px rgba(184, 134, 11, 0.3)',
              }}
            />
          ))}

          {/* Барная стойка - увеличенная */}
          <div className="absolute bottom-0 left-0 right-0" style={{ height: '60px' }}>
            {/* Столешница */}
            <div
              className="absolute bottom-14 left-0 right-0"
              style={{
                height: '14px',
                background: 'linear-gradient(180deg, #b8860b 0%, #8b6914 30%, #6b5010 70%, #5a4a2a 100%)',
                border: '3px solid #000',
                boxShadow: '0 6px 12px rgba(0,0,0,0.6), inset 0 2px 4px rgba(255,255,255,0.1)',
              }}
            />
            {/* Основание стойки */}
            <div
              className="absolute bottom-0 left-4 right-4"
              style={{
                height: '56px',
                background: 'linear-gradient(90deg, #8b6914 0%, #6b5010 20%, #5a4a2a 50%, #6b5010 80%, #8b6914 100%)',
                border: '3px solid #000',
                boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.4)',
              }}
            />
          </div>

          {/* Бутылки на верхней полке (маленькие) */}
          {[0, 1, 2].map((i) => (
            <div
              key={`shelf-top-${i}`}
              className="absolute"
              style={{
                left: `${20 + i * 45}px`,
                bottom: '140px',
                width: '10px',
                height: '32px',
              }}
            >
              <div
                style={{
                  width: '5px',
                  height: '10px',
                  margin: '0 auto',
                  background: '#8b6914',
                  border: '1px solid #000',
                }}
              />
              <div
                style={{
                  width: '10px',
                  height: '22px',
                  marginTop: '2px',
                  background: 'linear-gradient(90deg, rgba(139, 105, 20, 0.6) 0%, rgba(139, 105, 20, 0.4) 50%, rgba(139, 105, 20, 0.6) 100%)',
                  border: '1px solid #000',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)',
                }}
              />
            </div>
          ))}

          {/* Бутылки на средней полке (средние) */}
          {[0, 1, 2].map((i) => (
            <div
              key={`shelf-middle-${i}`}
              className="absolute"
              style={{
                left: `${15 + i * 55}px`,
                bottom: '100px',
                width: '12px',
                height: '42px',
              }}
            >
              <div
                style={{
                  width: '6px',
                  height: '12px',
                  margin: '0 auto',
                  background: i === 1 ? '#b8860b' : '#8b6914',
                  border: '1px solid #000',
                }}
              />
              <div
                style={{
                  width: '12px',
                  height: '30px',
                  marginTop: '2px',
                  background: i === 1
                    ? 'linear-gradient(90deg, rgba(184, 134, 11, 0.6) 0%, rgba(184, 134, 11, 0.4) 50%, rgba(184, 134, 11, 0.6) 100%)'
                    : 'linear-gradient(90deg, rgba(139, 105, 20, 0.6) 0%, rgba(139, 105, 20, 0.4) 50%, rgba(139, 105, 20, 0.6) 100%)',
                  border: '1px solid #000',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)',
                }}
              />
            </div>
          ))}

          {/* Бутылки на нижней полке (большие) */}
          {[0, 1].map((i) => (
            <div
              key={`shelf-bottom-${i}`}
              className="absolute"
              style={{
                left: `${25 + i * 80}px`,
                bottom: '60px',
                width: '14px',
                height: '50px',
              }}
            >
              <div
                style={{
                  width: '7px',
                  height: '14px',
                  margin: '0 auto',
                  background: '#b8860b',
                  border: '1px solid #000',
                }}
              />
              <div
                style={{
                  width: '14px',
                  height: '36px',
                  marginTop: '2px',
                  background: 'linear-gradient(90deg, rgba(184, 134, 11, 0.6) 0%, rgba(184, 134, 11, 0.4) 50%, rgba(184, 134, 11, 0.6) 100%)',
                  border: '1px solid #000',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)',
                }}
              />
            </div>
          ))}

          {/* Бутылки на столешнице (большие) */}
          {[0, 1, 2, 3].map((i) => (
            <div
              key={`counter-${i}`}
              className="absolute"
              style={{
                left: `${20 + i * 50}px`,
                bottom: '14px',
                width: '14px',
                height: '58px',
              }}
            >
              <div
                style={{
                  width: '7px',
                  height: '14px',
                  margin: '0 auto',
                  background: i % 2 === 0 ? '#b8860b' : '#8b6914',
                  border: '1px solid #000',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.4)',
                }}
              />
              <div
                style={{
                  width: '14px',
                  height: '44px',
                  marginTop: '2px',
                  background: i % 2 === 0
                    ? 'linear-gradient(90deg, rgba(184, 134, 11, 0.7) 0%, rgba(184, 134, 11, 0.5) 50%, rgba(184, 134, 11, 0.7) 100%)'
                    : 'linear-gradient(90deg, rgba(139, 105, 20, 0.7) 0%, rgba(139, 105, 20, 0.5) 50%, rgba(139, 105, 20, 0.7) 100%)',
                  border: '1px solid #000',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)',
                }}
              />
            </div>
          ))}

          {/* Бокалы рядом с бутылками на столешнице */}
          {[0, 1].map((i) => (
            <div
              key={`glass-counter-${i}`}
              className="absolute"
              style={{
                left: `${70 + i * 100}px`,
                bottom: '14px',
                width: '18px',
                height: '28px',
              }}
            >
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  background: 'linear-gradient(180deg, rgba(184, 134, 11, 0.4) 0%, rgba(184, 134, 11, 0.2) 100%)',
                  border: '2px solid rgba(184, 134, 11, 0.8)',
                  borderRadius: '3px 3px 10px 10px',
                  boxShadow: '0 3px 6px rgba(0,0,0,0.4)',
                }}
              />
              <div
                style={{
                  width: '5px',
                  height: '8px',
                  margin: '0 auto',
                  background: 'rgba(184, 134, 11, 0.6)',
                  border: '1px solid rgba(0,0,0,0.5)',
                }}
              />
              <div
                style={{
                  width: '10px',
                  height: '2px',
                  margin: '0 auto',
                  background: 'rgba(184, 134, 11, 0.7)',
                  border: '1px solid rgba(0,0,0,0.5)',
                }}
              />
            </div>
          ))}

          {/* Бокал на средней полке */}
          <div
            className="absolute"
            style={{
              left: '190px',
              bottom: '100px',
              width: '16px',
              height: '26px',
            }}
          >
            <div
              style={{
                width: '16px',
                height: '16px',
                background: 'linear-gradient(180deg, rgba(184, 134, 11, 0.35) 0%, rgba(184, 134, 11, 0.15) 100%)',
                border: '2px solid rgba(184, 134, 11, 0.7)',
                borderRadius: '2px 2px 9px 9px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.4)',
              }}
            />
            <div
              style={{
                width: '4px',
                height: '8px',
                margin: '0 auto',
                background: 'rgba(184, 134, 11, 0.5)',
                border: '1px solid rgba(0,0,0,0.4)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
