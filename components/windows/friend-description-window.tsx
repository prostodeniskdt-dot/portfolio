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
        <div className="flex-1">
          <h2 className={`${isMobile ? "text-lg" : "text-xl"} font-bold text-black`}>{friend.name}</h2>
          <p className="text-xs text-[#666666]">Друг</p>
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
        <div className="space-y-3 max-w-prose">
          <div>
            <h3 className="font-bold text-sm mb-1">Описание</h3>
            <p className="text-xs leading-relaxed whitespace-pre-line text-left">{friend.fullDescription}</p>
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
            <h3 className="font-bold text-sm mb-2">Способы связи</h3>
            <div className="space-y-2 text-xs">
              {friend.phone && (
                <div>
                  <span className="font-bold">📞 Телефон: </span>
                  <a
                    href={`tel:${friend.phone.replace(/\s/g, '')}`}
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    {friend.phone}
                  </a>
                </div>
              )}
              {friend.contact && (
                <div>
                  <span className="font-bold">📧 Email: </span>
                  <a
                    href={`mailto:${friend.contact}`}
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    {friend.contact}
                  </a>
                </div>
              )}
              {friend.address && (
                <div>
                  <span className="font-bold">📍 Адрес офиса: </span>
                  <span>{friend.address}</span>
                </div>
              )}
            </div>
          </div>

          {/* Website and Telegram Manager Buttons */}
          <div className="flex flex-col gap-2">
            {friend.website && (
              <a
                href={friend.website}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 text-xs font-bold transition-all hover:scale-[1.02] text-center"
                style={{
                  background: "#FFD700",
                  color: "#000000",
                  border: "2px solid #000000",
                }}
              >
                🌐 Оформить заказ на сайте
              </a>
            )}
            {friend.telegramManager && (
              <a
                href={friend.telegramManager}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 text-xs font-bold transition-all hover:scale-[1.02] text-center"
                style={{
                  background: "#0088cc",
                  color: "#FFFFFF",
                  border: "2px solid #000000",
                }}
              >
                💬 Написать менеджерам в Telegram
              </a>
            )}
          </div>

          {/* Social Networks */}
          {friend.socials && (friend.socials.vk || friend.socials.instagram || friend.socials.telegram) && (
            <div>
              <h3 className="font-bold text-sm mb-2">Соцсети</h3>
              <div className="flex flex-col gap-2">
                {friend.socials.vk && (
                  <a
                    href={friend.socials.vk}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 text-xs font-bold transition-all hover:scale-[1.02] text-center"
                    style={{
                      background: "#0077FF",
                      color: "#FFFFFF",
                      border: "2px solid #000000",
                    }}
                  >
                    ВКонтакте
                  </a>
                )}
                {friend.socials.instagram && (
                  <div>
                    <a
                      href={friend.socials.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-2 text-xs font-bold transition-all hover:scale-[1.02] text-center block"
                      style={{
                        background: "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
                        color: "#FFFFFF",
                        border: "2px solid #000000",
                      }}
                    >
                      Instagram
                    </a>
                    <p className="text-[10px] text-[#666666] mt-1 text-center">
                      * Instagram запрещен на территории Российской Федерации
                    </p>
                  </div>
                )}
                {friend.socials.telegram && (
                  <a
                    href={friend.socials.telegram}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 text-xs font-bold transition-all hover:scale-[1.02] text-center"
                    style={{
                      background: "#0088cc",
                      color: "#FFFFFF",
                      border: "2px solid #000000",
                    }}
                  >
                    Telegram
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
