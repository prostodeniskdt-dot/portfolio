"use client"

export function RetroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ imageRendering: "crisp-edges" }}>
      {/* Базовый фон - темный для архитектурного чертежа */}
      <div
        className="absolute inset-0"
        style={{
          background: "#0f0f0f",
        }}
      />

      {/* Пиксельная сетка архитектурного чертежа */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 20px,
              #f8cf2c 20px,
              #f8cf2c 21px
            ),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 20px,
              #f8cf2c 20px,
              #f8cf2c 21px
            )
          `,
          backgroundSize: "21px 21px",
        }}
      />

      {/* Горизонтальные линии чертежа */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(to bottom, transparent 0%, transparent 10%, #f8cf2c 10%, #f8cf2c 11%, transparent 11%, transparent 20%, #f8cf2c 20%, #f8cf2c 21%, transparent 21%),
            linear-gradient(to right, transparent 0%, transparent 10%, #f8cf2c 10%, #f8cf2c 11%, transparent 11%, transparent 20%, #f8cf2c 20%, #f8cf2c 21%, transparent 21%)
          `,
          opacity: 0.3,
        }}
      />

      {/* Элементы архитектурного чертежа - углы и размеры */}
      <svg className="absolute inset-0 w-full h-full opacity-30" style={{ imageRendering: "crisp-edges" }}>
        {/* Углы чертежа */}
        <line x1="100" y1="100" x2="120" y2="100" stroke="#f8cf2c" strokeWidth="2" />
        <line x1="100" y1="100" x2="100" y2="120" stroke="#f8cf2c" strokeWidth="2" />
        
        <line x1="300" y1="100" x2="280" y2="100" stroke="#f8cf2c" strokeWidth="2" />
        <line x1="300" y1="100" x2="300" y2="120" stroke="#f8cf2c" strokeWidth="2" />
        
        <line x1="100" y1="200" x2="120" y2="200" stroke="#f8cf2c" strokeWidth="2" />
        <line x1="100" y1="200" x2="100" y2="180" stroke="#f8cf2c" strokeWidth="2" />
        
        <line x1="500" y1="200" x2="480" y2="200" stroke="#f8cf2c" strokeWidth="2" />
        <line x1="500" y1="200" x2="500" y2="180" stroke="#f8cf2c" strokeWidth="2" />

        {/* Линии размеров */}
        <line x1="150" y1="80" x2="250" y2="80" stroke="#f8cf2c" strokeWidth="1" />
        <line x1="150" y1="75" x2="150" y2="85" stroke="#f8cf2c" strokeWidth="1" />
        <line x1="250" y1="75" x2="250" y2="85" stroke="#f8cf2c" strokeWidth="1" />

        {/* Прямоугольники как элементы плана */}
        <rect x="200" y="150" width="100" height="60" fill="none" stroke="#f8cf2c" strokeWidth="2" opacity="0.4" />
        <rect x="400" y="250" width="80" height="80" fill="none" stroke="#f8cf2c" strokeWidth="2" opacity="0.4" />
      </svg>

      {/* Тонкие акцентные линии по краям */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-50"
        style={{
          background: "linear-gradient(90deg, transparent, #f8cf2c, transparent)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-50"
        style={{
          background: "linear-gradient(90deg, transparent, #f8cf2c, transparent)",
        }}
      />
      <div
        className="absolute top-0 bottom-0 left-0 w-px opacity-50"
        style={{
          background: "linear-gradient(180deg, transparent, #f8cf2c, transparent)",
        }}
      />
      <div
        className="absolute top-0 bottom-0 right-0 w-px opacity-50"
        style={{
          background: "linear-gradient(180deg, transparent, #f8cf2c, transparent)",
        }}
      />

      {/* Минимальный scanline эффект для пиксельного стиля */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(248,207,44,0.1) 2px, rgba(248,207,44,0.1) 4px)",
        }}
      />
    </div>
  )
}
