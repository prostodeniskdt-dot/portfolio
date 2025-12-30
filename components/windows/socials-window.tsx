"use client"

import { SOCIAL_LINKS } from "@/lib/links"

type SocialItem = {
  id: "telegram" | "instagram" | "youtube"
  title: string
  subtitle?: string
  url: string
  accent: string
  icon: string
}

const socials: SocialItem[] = [
  {
    id: "telegram",
    title: "Telegram",
    subtitle: "BAR BOSS ONLINE",
    url: SOCIAL_LINKS.telegramChannel,
    accent: "#f8cf2c",
    icon: "💬",
  },
  {
    id: "instagram",
    title: "Instagram",
    subtitle: "В РФ Instagram запрещен",
    url: SOCIAL_LINKS.instagram,
    accent: "#ff8800",
    icon: "📸",
  },
  {
    id: "youtube",
    title: "YouTube",
    subtitle: "@barbossonline",
    url: SOCIAL_LINKS.youtube,
    accent: "#f8cf2c",
    icon: "📺",
  },
]

export function SocialsWindow() {
  return (
    <div className="text-black text-sm space-y-3">
      {/* Header */}
      <div
        className="p-3"
        style={{
          background: "#FFD700",
          border: "2px solid #000000",
        }}
      >
        <div className="text-xs font-bold">🌐 Социальные сети</div>
        <div className="text-[10px]" style={{ color: "#000000", opacity: 0.8 }}>
          Нажмите на карточку, чтобы открыть ссылку
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {socials.map((item) => (
          <button
            key={item.id}
            className="p-3 text-left transition-all duration-150 hover:scale-[1.01]"
            style={{
              background: "#f5f0e1",
              border: `3px solid ${item.accent}`,
              boxShadow: `6px 6px 0 rgba(0,0,0,0.15)`,
            }}
            onClick={() => window.open(item.url, "_blank", "noreferrer")}
          >
            <div className="flex items-start gap-3">
              <div
                className="w-10 h-10 flex items-center justify-center shrink-0"
                style={{
                  background: "#000000",
                  border: `2px solid ${item.accent}`,
                }}
              >
                <span className="text-xl" style={{ color: item.accent }}>
                  {item.icon}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold" style={{ color: "#000000" }}>
                  {item.title}
                </div>
                {item.subtitle && (
                  <div className="text-[10px]" style={{ color: "#666666" }}>
                    {item.subtitle}
                  </div>
                )}
                <div className="text-xs underline break-all mt-1" style={{ color: "#000000" }}>
                  {item.url}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}


