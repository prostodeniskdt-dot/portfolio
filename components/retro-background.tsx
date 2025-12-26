"use client"

export function RetroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ imageRendering: "crisp-edges" }}>
      {/* Базовый фон - белый */}
      <div
        className="absolute inset-0"
        style={{
          background: "#ffffff",
        }}
      />
    </div>
  )
}
