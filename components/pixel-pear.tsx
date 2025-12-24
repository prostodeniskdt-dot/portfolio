"use client"

interface PixelPearProps {
  size?: number
  className?: string
}

export function PixelPear({ size = 64, className = "" }: PixelPearProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      style={{
        imageRendering: "crisp-edges",
      }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Надкусанная груша в пиксельном стиле - черно-желтая */}
      {/* Основная форма груши */}
      <path
        d="M32 8 L28 12 L24 16 L20 20 L18 24 L16 28 L16 32 L18 36 L20 40 L24 44 L28 48 L32 50 L36 48 L40 44 L44 40 L46 36 L48 32 L48 28 L46 24 L44 20 L40 16 L36 12 L32 8 Z"
        fill="#f8cf2c"
        stroke="#000000"
        strokeWidth="2"
      />
      
      {/* Надкус - белая область */}
      <path
        d="M32 8 L30 10 L28 12 L26 14 L24 16 L22 18 L20 20 L18 22 L16 24 L16 26 L18 28 L20 30 L22 32 L24 34 L26 36 L28 38 L30 40 L32 42 L34 40 L36 38 L38 36 L40 34 L42 32 L44 30 L46 28 L48 26 L48 24 L46 22 L44 20 L42 18 L40 16 L38 14 L36 12 L34 10 L32 8 Z"
        fill="#ffffff"
        stroke="#000000"
        strokeWidth="1"
      />
      
      {/* Детали груши - линии */}
      <line x1="32" y1="20" x2="32" y2="30" stroke="#000000" strokeWidth="2" />
      <line x1="28" y1="24" x2="36" y2="24" stroke="#000000" strokeWidth="1" />
      
      {/* Листик */}
      <path
        d="M32 8 L30 6 L28 4 L26 6 L28 8 L30 10 L32 8 Z"
        fill="#000000"
        stroke="#f8cf2c"
        strokeWidth="1"
      />
      
      {/* Тени для объема */}
      <rect x="20" y="20" width="4" height="4" fill="#000000" opacity="0.3" />
      <rect x="40" y="24" width="4" height="4" fill="#000000" opacity="0.2" />
    </svg>
  )
}

