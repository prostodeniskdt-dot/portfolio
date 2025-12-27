"use client"

export function RetroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Основное изображение */}
      <img
        src="/background.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ imageRendering: "crisp-edges" }}
      />
      
      {/* Затемняющий оверлей для улучшения читаемости интерфейса */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(0, 0, 0, 0.3)",
        }}
      />
      
      {/* Золотые акценты для сохранения стиля сайта */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(255, 215, 0, 0.05) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(255, 215, 0, 0.03) 0%, transparent 40%)
          `,
        }}
      />
    </div>
  )
}
