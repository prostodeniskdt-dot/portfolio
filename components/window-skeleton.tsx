"use client"

export function WindowSkeleton() {
  return (
    <div
      className="absolute animate-window-open"
      style={{
        left: "40px",
        top: "40px",
        width: "380px",
        height: "400px",
        zIndex: 10,
      }}
    >
      <div
        className="w-full h-full flex flex-col"
        style={{
          background: "#f5f0e1",
          border: "3px solid",
          borderColor: "#FFD700 #000000 #000000 #FFD700",
        }}
      >
        {/* Title bar skeleton */}
        <div
          className="h-8 flex items-center justify-between px-2"
          style={{
            background: "#3a3a3a",
          }}
        >
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#FFD700] animate-pulse" />
            <div className="w-24 h-4 bg-[#f5f0e1] animate-pulse" />
          </div>
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 bg-[#000000] animate-pulse" />
            <div className="w-5 h-5 bg-[#000000] animate-pulse" />
            <div className="w-5 h-5 bg-[#000000] animate-pulse" />
          </div>
        </div>

        {/* Content skeleton */}
        <div
          className="flex-1 m-2 p-3 space-y-2"
          style={{
            background: "#ffffff",
            border: "3px solid",
            borderColor: "#000000 #FFD700 #FFD700 #000000",
          }}
        >
          <div className="w-full h-4 bg-[#f5f0e1] animate-pulse" />
          <div className="w-3/4 h-4 bg-[#f5f0e1] animate-pulse" />
          <div className="w-full h-4 bg-[#f5f0e1] animate-pulse" />
          <div className="w-5/6 h-4 bg-[#f5f0e1] animate-pulse" />
        </div>

        {/* Status bar skeleton */}
        <div
          className="h-6 px-2"
          style={{
            background: "#000000",
            borderTop: "2px solid #FFD700",
          }}
        >
          <div className="w-16 h-3 bg-[#3a3a3a] animate-pulse" />
        </div>
      </div>
    </div>
  )
}

