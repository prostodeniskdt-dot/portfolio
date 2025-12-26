"use client"

interface TopBarProps {
  // Props kept for compatibility but not used
}

export function TopBar({}: TopBarProps) {

  return (
    <header className="h-10 bg-[#000000] flex items-center px-3 border-b-3 border-[#b8860b] animate-slide-up relative overflow-hidden">
      <div className="absolute inset-0 animate-shimmer opacity-20" />

      {/* Logo with glow animation */}
      <div className="flex items-center gap-2 relative z-10">
        <h1
          className="text-2xl md:text-3xl font-bold"
          style={{
            fontFamily: "Oswald, sans-serif",
            color: "#000000",
            textShadow: `
              0 0 10px rgba(184, 134, 11, 0.8),
              0 0 20px rgba(184, 134, 11, 0.6),
              0 0 30px rgba(184, 134, 11, 0.4),
              2px 2px 0px rgba(184, 134, 11, 0.9),
              -2px -2px 0px rgba(184, 134, 11, 0.9),
              2px -2px 0px rgba(184, 134, 11, 0.9),
              -2px 2px 0px rgba(184, 134, 11, 0.9)
            `,
            WebkitTextStroke: "1px rgba(184, 134, 11, 0.5)",
            animation: "glow-text 2s ease-in-out infinite",
            letterSpacing: "0.05em",
          }}
        >
          <span style={{ color: "#000000" }}>BAR</span>{" "}
          <span style={{ color: "#b8860b" }}>BOSS</span>{" "}
          <span style={{ color: "#000000" }}>ONLINE</span>
        </h1>
      </div>

      {/* Spacer */}
      <div className="flex-1" />
    </header>
  )
}
