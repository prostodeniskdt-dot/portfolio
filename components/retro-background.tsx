"use client"

export function RetroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Нейтральный градиентный фон */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 50%, #0f0f0f 100%)
          `,
        }}
      />

      {/* Тонкая сетка в стиле ретро */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 40px,
              rgba(248,207,44,0.1) 40px,
              rgba(248,207,44,0.1) 41px
            ),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 40px,
              rgba(248,207,44,0.1) 40px,
              rgba(248,207,44,0.1) 41px
            )
          `,
          backgroundSize: "41px 41px",
        }}
      />

      {/* Тонкие акцентные линии */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-30"
        style={{
          background: "linear-gradient(90deg, transparent, #f8cf2c, transparent)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-30"
        style={{
          background: "linear-gradient(90deg, transparent, #f8cf2c, transparent)",
        }}
      />

      {/* Логотип BARBOSS (более тонкий) */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ opacity: 0.03 }}
      >
        <span className="text-[#f8cf2c] text-[180px] font-bold tracking-widest">BARBOSS</span>
      </div>

      {/* Scanline эффект (опционально, с уменьшенной непрозрачностью) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(248,207,44,0.1) 2px, rgba(248,207,44,0.1) 4px)",
        }}
      />
    </div>
  )
}
