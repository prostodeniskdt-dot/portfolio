"use client"

const contacts = [
  { icon: "📧", label: "Email", value: "hello@barboss.online" },
  { icon: "📱", label: "Telegram", value: "@barboss_school" },
  { icon: "📞", label: "Телефон", value: "+7 (999) 123-45-67" },
  { icon: "🌐", label: "Сайт", value: "barboss.online" },
]

export function ContactWindow() {
  return (
    <div className="text-black text-sm space-y-3">
      {/* Header */}
      <div
        className="p-2"
        style={{
          background: "#f8cf2c",
          border: "2px solid #000000",
        }}
      >
        <span className="text-xs font-bold">📬 Свяжитесь с BARBOSS ONLINE</span>
      </div>

      {/* Form fields */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <label className="text-xs w-16 font-bold">Имя:</label>
          <input
            type="text"
            placeholder="Ваше имя"
            className="flex-1 px-2 py-1 text-xs"
            style={{
              background: "#ffffff",
              border: "3px solid",
              borderColor: "#000000 #f8cf2c #f8cf2c #000000",
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs w-16 font-bold">Email:</label>
          <input
            type="email"
            placeholder="email@example.com"
            className="flex-1 px-2 py-1 text-xs"
            style={{
              background: "#ffffff",
              border: "3px solid",
              borderColor: "#000000 #f8cf2c #f8cf2c #000000",
            }}
          />
        </div>
      </div>

      {/* Divider */}
      <div className="h-0.5 bg-[#f8cf2c]" />

      {/* Contact links */}
      <div className="space-y-1">
        {contacts.map((contact, index) => (
          <div
            key={index}
            className="flex items-center gap-2 p-2 cursor-pointer hover:bg-[#f8cf2c] transition-colors"
            style={{
              background: "#f5f0e1",
              border: "1px solid #000000",
            }}
          >
            <span>{contact.icon}</span>
            <span className="text-xs font-bold w-20">{contact.label}:</span>
            <span className="text-xs underline">{contact.value}</span>
          </div>
        ))}
      </div>

      {/* Send button */}
      <div className="flex justify-end gap-2">
        <button
          className="px-4 py-2 text-xs font-bold transition-colors hover:opacity-90"
          style={{
            background: "#f8cf2c",
            color: "#000000",
            border: "3px solid",
            borderColor: "#ffe066 #000000 #000000 #ffe066",
          }}
        >
          📤 Отправить
        </button>
        <button
          className="px-4 py-2 text-xs font-bold transition-colors hover:opacity-90"
          style={{
            background: "#000000",
            color: "#f8cf2c",
            border: "3px solid",
            borderColor: "#3a3a3a #f8cf2c #f8cf2c #3a3a3a",
          }}
        >
          Отмена
        </button>
      </div>
    </div>
  )
}
