"use client"

import { friends } from "@/lib/data/friends"
import { useIsMobile } from "@/hooks/use-mobile"

interface FriendDescriptionWindowProps {
  friendId: string
}

export function FriendDescriptionWindow({ friendId }: FriendDescriptionWindowProps) {
  const isMobile = useIsMobile()
  
  // Убираем префикс "friend-" если он есть
  const actualFriendId = friendId.startsWith("friend-") ? friendId.replace("friend-", "") : friendId
  const friend = friends.find((f) => f.id === actualFriendId)

  if (!friend) {
    return (
      <div className="p-4 text-black text-sm">
        <div className="text-red-600 font-bold">Ошибка: Друг не найден</div>
      </div>
    )
  }

  return (
    <div className="text-black text-sm space-y-4 h-full flex flex-col">
      {/* Header */}
      <div
        className="flex items-center gap-4 p-3"
        style={{
          background: "#FFD700",
          border: "2px solid #000000",
        }}
      >
        {friend.thumbnail && (
          <img
            src={friend.thumbnail}
            alt={friend.name}
            width={isMobile ? 48 : 64}
            height={isMobile ? 48 : 64}
            style={{
              border: "2px solid #000000",
              objectFit: "cover",
            }}
          />
        )}
        <div className="flex-1">
          <h2 className={`${isMobile ? "text-lg" : "text-xl"} font-bold text-black`}>{friend.name}</h2>
          <p className="text-xs text-[#666666]">{friend.category}</p>
        </div>
      </div>

      {/* Description */}
      <div
        className="p-3 flex-1 overflow-y-auto"
        style={{
          background: "#f5f0e1",
          border: "2px solid #000000",
        }}
      >
        <div className="space-y-3">
          <div>
            <h3 className="font-bold text-sm mb-1">Описание</h3>
            <p className="text-xs leading-relaxed">{friend.fullDescription}</p>
          </div>

          {/* Features */}
          {friend.features && friend.features.length > 0 && (
            <div>
              <h3 className="font-bold text-sm mb-1">Особенности</h3>
              <ul className="text-xs space-y-1 list-disc list-inside">
                {friend.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Services */}
          {friend.services && friend.services.length > 0 && (
            <div>
              <h3 className="font-bold text-sm mb-1">Услуги</h3>
              <ul className="text-xs space-y-1 list-disc list-inside">
                {friend.services.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact Information */}
          <div
            className="p-3 mt-4"
            style={{
              background: "#FFFFFF",
              border: "2px solid #000000",
            }}
          >
            <h3 className="font-bold text-sm mb-2">Контакты</h3>
            <div className="space-y-2 text-xs">
              {friend.website && (
                <div>
                  <span className="font-bold">🌐 Сайт: </span>
                  <a
                    href={friend.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    {friend.website}
                  </a>
                </div>
              )}
              {friend.contact && (
                <div>
                  <span className="font-bold">📧 Контакт: </span>
                  <a
                    href={`mailto:${friend.contact}`}
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    {friend.contact}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
