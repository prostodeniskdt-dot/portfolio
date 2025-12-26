"use client"

export function BarBossLogo() {
  return (
    <div className="absolute top-4 left-4 z-50 pointer-events-none">
      <h1
        className="text-4xl md:text-5xl lg:text-6xl font-bold"
        style={{
          fontFamily: "Oswald, sans-serif",
          color: "#000000",
          textShadow: `
            0 0 10px rgba(248, 207, 44, 0.8),
            0 0 20px rgba(248, 207, 44, 0.6),
            0 0 30px rgba(248, 207, 44, 0.4),
            2px 2px 0px rgba(248, 207, 44, 0.9),
            -2px -2px 0px rgba(248, 207, 44, 0.9),
            2px -2px 0px rgba(248, 207, 44, 0.9),
            -2px 2px 0px rgba(248, 207, 44, 0.9)
          `,
          WebkitTextStroke: "1px rgba(248, 207, 44, 0.5)",
          animation: "glow-text 2s ease-in-out infinite",
          letterSpacing: "0.05em",
        }}
      >
        <span style={{ color: "#000000" }}>BAR</span>{" "}
        <span style={{ color: "#f8cf2c" }}>BOSS</span>{" "}
        <span style={{ color: "#000000" }}>ONLINE</span>
      </h1>
    </div>
  )
}

