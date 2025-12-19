"use client"

import { useState, useEffect, useRef } from "react"

interface MenuItem {
  label: string
  action: () => void
  icon?: string
}

interface DividerItem {
  divider: true
}

type MenuItemType = MenuItem | DividerItem

export function TopBar() {
  const [time, setTime] = useState<string>("")
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      )
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(null)
      }
    }

    if (openMenu) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [openMenu])

  const menuItems: Record<string, MenuItemType[]> = {
    Файл: [
      { label: "Новое окно", action: () => window.location.reload(), icon: "📂" },
      { label: "Открыть", action: () => console.log("Открыть"), icon: "📁" },
      { divider: true },
      { label: "Выход", action: () => console.log("Выход"), icon: "🔌" },
    ],
    Курсы: [
      { label: "Все курсы", action: () => console.log("Все курсы"), icon: "📚" },
      { label: "Популярные", action: () => console.log("Популярные"), icon: "⭐" },
      { label: "Новые", action: () => console.log("Новые"), icon: "🆕" },
    ],
    Помощь: [
      { label: "Справка", action: () => window.open("https://barboss.online", "_blank"), icon: "❓" },
      { label: "О программе", action: () => alert("BARBOSS ONLINE v2.0\nОнлайн-школа креативных профессий"), icon: "ℹ️" },
    ],
  }

  const handleMenuClick = (menuName: string) => {
    setOpenMenu(openMenu === menuName ? null : menuName)
  }

  return (
    <header className="h-10 bg-[#000000] flex items-center px-3 border-b-3 border-[#f8cf2c] animate-slide-up relative overflow-hidden">
      <div className="absolute inset-0 animate-shimmer opacity-20" />

      {/* Logo with glow animation */}
      <div className="flex items-center gap-2 relative z-10">
        <div className="relative">
          <div className="absolute -inset-2 bg-[#f8cf2c] opacity-20 blur-md animate-pulse-glow" />
          <span className="relative text-[#f8cf2c] font-bold text-xl tracking-wider animate-glow-text">BARBOSS</span>
        </div>
        <span className="text-[#f5f0e1] text-sm animate-flicker">ONLINE</span>
        <span className="text-[#f8cf2c] animate-blink">_</span>
      </div>

      {/* Menu items with hover animations */}
      <div className="flex items-center ml-4 relative z-10" ref={menuRef}>
        {Object.keys(menuItems).map((menuName, index) => (
          <div key={menuName} className="relative">
            <button
              onClick={() => handleMenuClick(menuName)}
              className="px-3 py-1 text-sm text-[#f5f0e1] hover:bg-[#f8cf2c] hover:text-black transition-all duration-200 hover:scale-105 animate-slide-up"
              style={{
                animationDelay: `${0.1 + index * 0.05}s`,
                background: openMenu === menuName ? "#f8cf2c" : "transparent",
                color: openMenu === menuName ? "#000000" : "#f5f0e1",
              }}
            >
              {menuName}
            </button>
            {openMenu === menuName && (
              <div
                className="absolute top-full left-0 mt-1 animate-scale-in z-50"
                style={{
                  background: "#f5f0e1",
                  border: "3px solid",
                  borderColor: "#f8cf2c #000000 #000000 #f8cf2c",
                  boxShadow: "8px 8px 0 rgba(248,207,44,0.3), 0 0 30px rgba(248,207,44,0.2)",
                  minWidth: "180px",
                }}
                role="menu"
                aria-label={`Меню ${menuName}`}
              >
                {menuItems[menuName].map((item, itemIndex) => {
                  if (item.divider) {
                    return <div key={`divider-${itemIndex}`} className="h-px bg-[#000000] my-1 mx-2" />
                  }
                  return (
                    <button
                      key={item.label}
                      role="menuitem"
                      onClick={() => {
                        item.action()
                        setOpenMenu(null)
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 hover:bg-[#f8cf2c] hover:text-black text-black text-left transition-all duration-150 text-sm"
                    >
                      {item.icon && <span aria-hidden="true">{item.icon}</span>}
                      <span>{item.label}</span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* System info with animations */}
      <div className="flex items-center gap-3 text-sm relative z-10">
        <span className="px-2 py-0.5 bg-[#f8cf2c] text-black text-xs font-bold animate-pulse-glow hover:scale-105 transition-transform">
          BARBOSS OS v2.0
        </span>
        <span className="text-[#f8cf2c] font-bold animate-flicker">{time}</span>
      </div>
    </header>
  )
}
