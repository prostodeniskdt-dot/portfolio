"use client"

interface DeleteWarningModalProps {
  isOpen: boolean
  onClose: () => void
}

export function DeleteWarningModal({ isOpen, onClose }: DeleteWarningModalProps) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center"
      style={{
        background: "rgba(0, 0, 0, 0.7)",
      }}
      onClick={onClose}
    >
      <div
        className="p-6 border-4"
        style={{
          background: "#FFF8DC",
          borderColor: "#000000",
          maxWidth: "400px",
          width: "90%",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Заголовок */}
        <div
          className="mb-4 pb-3 border-b-2"
          style={{
            borderColor: "#000000",
          }}
        >
          <h2
            className="text-xl font-bold"
            style={{
              color: "#000000",
              textShadow: "2px 2px 0px #FFD700",
            }}
          >
            ВНИМАНИЕ!
          </h2>
        </div>

        {/* Текст предупреждения */}
        <div
          className="mb-6 text-center"
          style={{
            color: "#000000",
            fontSize: "16px",
            lineHeight: "1.5",
          }}
        >
          Ты у себя дома чтоб что-то удалять?
        </div>

        {/* Кнопка */}
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="px-8 py-3 border-2 font-bold text-base"
            style={{
              borderColor: "#000000",
              background: "#FFD700",
              color: "#000000",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#FFED4E"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#FFD700"
            }}
          >
            Простите
          </button>
        </div>
      </div>
    </div>
  )
}

