"use client"

export function RetroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#1a1a1a]" />

      {/* Grid pattern floor */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(180deg, transparent 0%, transparent 60%, rgba(248,207,44,0.1) 100%),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 60px,
              rgba(248,207,44,0.15) 60px,
              rgba(248,207,44,0.15) 62px
            ),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 60px,
              rgba(248,207,44,0.15) 60px,
              rgba(248,207,44,0.15) 62px
            )
          `,
          backgroundSize: "100% 100%, 62px 62px, 62px 62px",
        }}
      />

      {/* Retro pixel city silhouette */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 200" className="w-full h-auto" style={{ imageRendering: "pixelated" }}>
          <polygon
            points="0,200 0,150 40,150 40,120 80,120 80,150 120,150 120,80 160,80 160,150 200,150 200,100 240,100 240,60 280,60 280,100 320,100 320,150 400,150 400,90 440,90 440,150 480,150 480,130 520,130 520,70 560,70 560,130 600,130 600,150 680,150 680,110 720,110 720,50 760,50 760,110 800,110 800,150 880,150 880,120 920,120 920,80 960,80 960,120 1000,120 1000,150 1040,150 1040,100 1080,100 1080,150 1120,150 1120,90 1160,90 1160,40 1200,40 1200,90 1240,90 1240,150 1320,150 1320,110 1360,110 1360,150 1400,150 1400,130 1440,130 1440,200"
            fill="#000000"
          />
          {[
            { x: 130, y: 90, delay: 0 },
            { x: 150, y: 100, delay: 0.5 },
            { x: 250, y: 70, delay: 1 },
            { x: 410, y: 100, delay: 1.5 },
            { x: 410, y: 120, delay: 2 },
            { x: 530, y: 80, delay: 0.3 },
            { x: 730, y: 60, delay: 0.8 },
            { x: 730, y: 80, delay: 1.3 },
            { x: 930, y: 90, delay: 1.8 },
            { x: 1170, y: 50, delay: 0.2 },
            { x: 1170, y: 70, delay: 0.7 },
          ].map((light, i) => (
            <rect
              key={i}
              x={light.x}
              y={light.y}
              width="10"
              height="10"
              fill="#f8cf2c"
              className="animate-city-light"
              style={{ animationDelay: `${light.delay}s` }}
            />
          ))}
        </svg>
      </div>

      {[...Array(25)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-[#f8cf2c] animate-star"
          style={{
            left: `${10 + ((i * 47) % 80)}%`,
            top: `${5 + ((i * 23) % 40)}%`,
            animationDelay: `${i * 0.2}s`,
            animationDuration: `${2 + (i % 3)}s`,
          }}
        />
      ))}

      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-pulse-glow"
        style={{ opacity: 0.08 }}
      >
        <span className="text-[#f8cf2c] text-[180px] font-bold tracking-widest animate-glow-text">BARBOSS</span>
      </div>

      {/* Scanline effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(248,207,44,0.1) 2px, rgba(248,207,44,0.1) 4px)",
        }}
      />
    </div>
  )
}
