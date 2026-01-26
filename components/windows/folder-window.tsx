"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import { folders, products, contests, partners, legalDocuments } from "@/lib/data"
import { useIsMobile } from "@/hooks/use-mobile"
import { FriendsFolderWindow } from "./friends-folder-window"

interface FolderWindowProps {
  folderId: string
  onOpenProduct?: (productId: string) => void
  onNavigateBack?: () => void
}

export function FolderWindow({ folderId, onOpenProduct, onNavigateBack }: FolderWindowProps) {
  // Специальная обработка для папки "friends"
  if (folderId === "friends") {
    return <FriendsFolderWindow folderId={folderId} onOpenProduct={onOpenProduct} onNavigateBack={onNavigateBack} />
  }

  const isMobile = useIsMobile()
  const folder = folders[folderId]
  const [searchQuery, setSearchQuery] = useState("")
  const [needsScroll, setNeedsScroll] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const formatPriceLabel = (price: string | undefined) => {
    if (!price) return ""
    if (!isMobile) return price
    const lower = price.toLowerCase()
    if (lower.includes("договор")) return "По договор."
    return price
  }

  const folderItems = useMemo(() => {
    if (!folder) return []

    const items = folder.items
      .map((itemId) => {
        // Ищем в разных массивах данных
        const product = products.find((p) => p.id === itemId)
        if (product) return { ...product, type: 'product' as const }
        
        const contest = contests.find((c) => c.id === itemId)
        if (contest) return { ...contest, type: 'contest' as const }
        
        const partner = partners.find((p) => p.id === itemId)
        if (partner) return { ...partner, type: 'partner' as const }
        
        const document = legalDocuments.find((d) => d.id === itemId)
        if (document) return { ...document, type: 'document' as const }
        
        return null
      })
      .filter((item): item is NonNullable<typeof item> => item !== null)

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      return items.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query),
      )
    }

    return items
  }, [folder, searchQuery])

  useEffect(() => {
    const checkScroll = () => {
      if (contentRef.current) {
        const { scrollHeight, clientHeight } = contentRef.current
        setNeedsScroll(scrollHeight > clientHeight)
      }
    }

    checkScroll()

    // Используем ResizeObserver для отслеживания изменения размера контейнера
    const resizeObserver = new ResizeObserver(() => {
      checkScroll()
    })

    if (contentRef.current) {
      resizeObserver.observe(contentRef.current)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [folderItems, searchQuery])

  if (!folder) {
    return (
      <div className="p-4 text-black text-sm">
        <div className="text-red-600 font-bold">Ошибка: Папка не найдена</div>
      </div>
    )
  }

  return (
    <div className="text-black text-sm h-full flex flex-col">
      {/* Toolbar */}
      <div
        className="flex items-center gap-2 p-2 mb-2"
        style={{
          background: "#FFD700",
          border: "2px solid #000000",
        }}
      >
        <button
          onClick={onNavigateBack}
          className="px-3 py-1 text-xs font-bold transition-colors"
          style={{
            background: "#000000",
            color: "#FFD700",
            border: "2px solid #FFD700",
          }}
          disabled={!onNavigateBack}
        >
          ← Назад
        </button>
        <div className="flex-1" />
        <span className="text-xs font-bold text-black">
          {folderItems.length} {folderItems.length === 1 ? 'элемент' : folderItems.length >= 2 && folderItems.length <= 4 ? 'элемента' : 'элементов'}
        </span>
      </div>

      {/* Search */}
      <div className="mb-2 px-2">
        <input
          type="text"
          placeholder="🔍 Поиск..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 text-xs"
          style={{
            background: "#ffffff",
            border: "3px solid",
            borderColor: "#000000 #FFD700 #FFD700 #000000",
          }}
        />
      </div>

      {/* Items Grid */}
      <div
        ref={contentRef}
        className="flex-1 p-2"
        style={{
          background: "#f5f0e1",
          border: "2px solid #000000",
          overflowY: needsScroll ? "auto" : "hidden",
        }}
      >
        {folderItems.length === 0 ? (
          <div className="text-center p-8 text-sm">
            <span>Элементы не найдены</span>
          </div>
        ) : folderId === "advertising" ? (
          // Custom layout for advertising folder
          <div className="space-y-3">
            {/* First row: website, barboss, otomosom in one line */}
            <div className="grid grid-cols-3 gap-3">
              {folderItems
                .filter(item => item.id === "ad-website" || item.id === "ad-telegram-barboss" || item.id === "ad-telegram-otomosom")
                .map((item) => {
                  const isPromo = 'isPromo' in item && item.isPromo
                  const hasSubscribers = 'subscribers' in item && item.subscribers
                  const hasPrice = 'price' in item && item.price
                  
                  return (
                    <button
                      key={item.id}
                      onClick={(e) => {
                        e.stopPropagation()
                        onOpenProduct?.(item.id)
                      }}
                      onDoubleClick={(e) => {
                        e.stopPropagation()
                        onOpenProduct?.(item.id)
                      }}
                      className={`flex flex-col items-center cursor-pointer hover:bg-[#FFD700] group transition-colors relative ${isMobile ? "gap-1 p-1.5" : "gap-2 p-3"}`}
                      style={{
                        background: isPromo 
                          ? "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)"
                          : "#ffffff",
                        border: isPromo 
                          ? "3px solid #FF0000" 
                          : "2px solid #000000",
                      }}
                    >
                      {(hasSubscribers || (hasPrice && !isPromo)) && (
                        <div className="w-full min-w-0 flex flex-col items-start gap-0.5">
                          {hasSubscribers && (
                            <span
                              className="px-1 py-0.5 text-[8px] font-bold whitespace-nowrap"
                              style={{
                                background: "#0088cc",
                                color: "#ffffff",
                              }}
                            >
                              👥 {item.subscribers}
                            </span>
                          )}
                          {hasPrice && !isPromo && item.price && (
                            <span
                              className="px-1 py-0.5 text-[8px] font-bold w-full text-right"
                              style={{
                                background: "#000000",
                                color: "#FFD700",
                                whiteSpace: "normal",
                                wordBreak: "break-word",
                                display: "block",
                              }}
                              title={item.price}
                            >
                              {formatPriceLabel(item.price)}
                            </span>
                          )}
                        </div>
                      )}
                      <span className={isMobile ? "text-2xl" : "text-4xl"}>{item.icon}</span>
                      <span className={`${isMobile ? "text-[10px]" : "text-xs"} font-bold text-center text-black group-hover:text-black`}>
                        {item.title}
                      </span>
                      <span 
                        className={`${isMobile ? "text-[8px]" : "text-[10px]"} text-center text-[#666666] group-hover:text-black`}
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: isMobile ? 3 : 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          wordBreak: "break-word",
                          lineHeight: "1.2",
                        }}
                      >
                        {item.description}
                      </span>
                      {isPromo && hasPrice && (
                        <span 
                          className="text-sm font-bold text-black mt-1"
                        >
                          {item.price}
                        </span>
                      )}
                    </button>
                  )
                })}
            </div>
            {/* Second row: package-all and animated side by side */}
            <div className="grid grid-cols-3 gap-3">
              <div style={{ width: "100%", height: "0" }}></div>
              {folderItems
                .filter(item => item.id === "ad-package-all" || item.id === "ad-animated")
                .sort((a, b) => {
                  // Ensure ad-package-all comes first, then ad-animated
                  if (a.id === "ad-package-all") return -1
                  if (b.id === "ad-package-all") return 1
                  return 0
                })
                .map((item) => {
                  const hasPrice = 'price' in item && item.price
                  const isAnimated = item.id === "ad-animated"
                  
                  return (
                    <button
                      key={item.id}
                      onClick={(e) => {
                        e.stopPropagation()
                        onOpenProduct?.(item.id)
                      }}
                      onDoubleClick={(e) => {
                        e.stopPropagation()
                        onOpenProduct?.(item.id)
                      }}
                      className={`flex flex-col items-center cursor-pointer hover:bg-[#FFD700] group transition-colors relative ${isAnimated ? '' : 'animate-pulse'} ${isMobile ? "gap-1 p-1.5" : "gap-2 p-3"}`}
                      style={{
                        background: isAnimated ? "#ffffff" : "#000000",
                        border: "2px solid #000000",
                      }}
                    >
                      <span className={isMobile ? "text-2xl" : "text-4xl"}>{item.icon}</span>
                      <span className={`${isMobile ? "text-[10px]" : "text-xs"} font-bold text-center ${isAnimated ? 'text-black group-hover:text-black' : 'text-[#FFD700] group-hover:text-[#FFD700]'}`}>
                        {item.title}
                      </span>
                      <span 
                        className={`${isMobile ? "text-[8px]" : "text-[10px]"} text-center ${isAnimated ? 'text-[#666666] group-hover:text-black' : 'text-[#FFD700] group-hover:text-[#FFD700]'}`}
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: isMobile ? 3 : 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          wordBreak: "break-word",
                          lineHeight: "1.2",
                        }}
                      >
                        {item.description}
                      </span>
                      {hasPrice && (
                        <span 
                          className={`text-sm font-bold mt-1 ${isAnimated ? 'text-black' : 'text-[#FFD700]'}`}
                        >
                          {item.price}
                        </span>
                      )}
                    </button>
                  )
                })}
              <div style={{ width: "100%", height: "0" }}></div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {folderItems.map((item) => {
              const isInDevelopment = item.id === "documents-package-3"
              const isPromo = 'isPromo' in item && item.isPromo
              const hasSubscribers = 'subscribers' in item && item.subscribers
              const hasPrice = 'price' in item && item.price
              
              return (
                <button
                  key={item.id}
                  onClick={(e) => {
                    // Prevent the parent OSWindow onClick from refocusing the folder window
                    // which could push the newly opened product window behind it.
                    e.stopPropagation()
                    if (!isInDevelopment) {
                      onOpenProduct?.(item.id)
                    }
                  }}
                  onDoubleClick={(e) => {
                    e.stopPropagation()
                    if (!isInDevelopment) {
                      onOpenProduct?.(item.id)
                    }
                  }}
                  disabled={isInDevelopment}
                  className={`flex flex-col items-center transition-colors relative ${isMobile ? "gap-1 p-1.5" : "gap-2 p-3"}`}
                  style={{
                    background: isInDevelopment 
                      ? "#cccccc" 
                      : isPromo 
                        ? "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)"
                        : "#ffffff",
                    border: isPromo 
                      ? "3px solid #FF0000" 
                      : "2px solid #000000",
                    opacity: isInDevelopment ? 0.7 : 1,
                    cursor: isInDevelopment ? "not-allowed" : "pointer",
                  }}
                >
                  {/* Бейдж "АКЦИЯ" для промо-товаров */}
                  {isPromo && (
                    <span 
                      className="absolute -top-2 -right-2 px-2 py-0.5 text-[10px] font-bold animate-pulse"
                      style={{
                        background: "#FF0000",
                        color: "#FFFFFF",
                        transform: "rotate(15deg)",
                      }}
                    >
                      АКЦИЯ!
                    </span>
                  )}
                  
                  {/* Верхняя строка (цена/подписчики) — без наложения на иконку */}
                  {(hasSubscribers || (hasPrice && !isPromo)) && (
                    <div className="w-full min-w-0 flex items-start gap-1">
                      {hasSubscribers ? (
                        <span
                          className="px-1 py-0.5 text-[8px] font-bold whitespace-nowrap"
                          style={{
                            background: "#0088cc",
                            color: "#ffffff",
                          }}
                        >
                          👥 {item.subscribers}
                        </span>
                      ) : null}
                      <div className="flex-1" />
                      {hasPrice && !isPromo && item.price ? (
                        <span
                          className="px-1 py-0.5 text-[8px] font-bold whitespace-nowrap truncate max-w-[70%]"
                          style={{
                            background: "#000000",
                            color: "#FFD700",
                          }}
                          title={item.price}
                        >
                          {formatPriceLabel(item.price)}
                        </span>
                      ) : null}
                    </div>
                  )}
                  
                  <span className={isMobile ? "text-2xl" : "text-4xl"}>{item.icon}</span>
                  <span className={`${isMobile ? "text-[10px]" : "text-xs"} font-bold text-center text-black group-hover:text-black`}>
                    {item.title}
                  </span>
                  <span 
                    className={`${isMobile ? "text-[8px]" : "text-[10px]"} text-center text-[#666666] group-hover:text-black`}
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: isMobile ? 3 : 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      wordBreak: "break-word",
                      lineHeight: "1.2",
                    }}
                  >
                    {item.description}
                  </span>
                  
                  {/* Цена для промо-товаров */}
                  {isPromo && hasPrice && (
                    <span 
                      className="text-sm font-bold text-black mt-1"
                    >
                      {item.price}
                    </span>
                  )}
                  
                  {isInDevelopment && (
                    <span className="text-[10px] text-center text-[#666666] font-bold mt-1">
                      В разработке
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        className="p-2 text-xs font-bold"
        style={{
          background: "#000000",
          color: "#FFD700",
          borderTop: "2px solid #FFD700",
        }}
      >
        📂 C:\BARBOSS\{folder.title}\
      </div>
    </div>
  )
}


