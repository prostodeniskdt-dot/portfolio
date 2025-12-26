"use client"

export function RetroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ imageRendering: "crisp-edges" }}>
      {/* Базовый фон - мягкий черно-желтый градиент */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at top left, rgba(248, 207, 44, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at bottom right, rgba(248, 207, 44, 0.06) 0%, transparent 50%),
            radial-gradient(ellipse at center, rgba(0, 0, 0, 0.02) 0%, transparent 70%),
            linear-gradient(135deg, #fafafa 0%, #f5f5f5 50%, #fafafa 100%)
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
              rgba(248, 207, 44, 0.03) 100px,
              rgba(248, 207, 44, 0.03) 101px
            ),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 100px,
              rgba(248, 207, 44, 0.03) 100px,
              rgba(248, 207, 44, 0.03) 101px
            )
          `,
        }}
      />
      
      {/* Мягкие акцентные точки */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(248, 207, 44, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(248, 207, 44, 0.04) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.01) 0%, transparent 60%)
          `,
        }}
      />
    </div>
  )
}
