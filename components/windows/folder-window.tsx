"use client"

import { useState, useMemo } from "react"
import { folders, products } from "@/lib/data"

interface FolderWindowProps {
  folderId: string
  onOpenProduct?: (productId: string) => void
  onNavigateBack?: () => void
}

export function FolderWindow({ folderId, onOpenProduct, onNavigateBack }: FolderWindowProps) {
  const folder = folders[folderId]
  const [searchQuery, setSearchQuery] = useState("")

  const folderItems = useMemo(() => {
    if (!folder) return []

    const items = folder.items
      .map((itemId) => {
        const product = products.find((p) => p.id === itemId)
        if (!product) return null
        return product
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
          background: "#b8860b",
          border: "2px solid #000000",
        }}
      >
        <button
          onClick={onNavigateBack}
          className="px-3 py-1 text-xs font-bold transition-colors"
          style={{
            background: "#000000",
            color: "#b8860b",
            border: "2px solid #b8860b",
          }}
          disabled={!onNavigateBack}
        >
          ← Назад
        </button>
        <div className="flex-1" />
        <span className="text-xs font-bold text-black">{folderItems.length} элементов</span>
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
            borderColor: "#000000 #b8860b #b8860b #000000",
          }}
        />
      </div>

      {/* Items Grid */}
      <div
        className="flex-1 overflow-y-auto p-2"
        style={{
          background: "#f5f0e1",
          border: "2px solid #000000",
        }}
      >
        {folderItems.length === 0 ? (
          <div className="text-center p-8 text-sm">
            <span>Элементы не найдены</span>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {folderItems.map((item) => (
              <button
                key={item.id}
                onDoubleClick={() => onOpenProduct?.(item.id)}
                className="flex flex-col items-center gap-2 p-3 cursor-pointer hover:bg-[#b8860b] group transition-colors"
                style={{
                  background: "#ffffff",
                  border: "2px solid #000000",
                }}
              >
                <span className="text-4xl">{item.icon}</span>
                <span className="text-xs font-bold text-center text-black group-hover:text-black">
                  {item.title}
                </span>
                <span className="text-[10px] text-center text-[#666666] group-hover:text-black line-clamp-2">
                  {item.description}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        className="p-2 text-xs font-bold"
        style={{
          background: "#000000",
          color: "#b8860b",
          borderTop: "2px solid #b8860b",
        }}
      >
        📂 C:\BARBOSS\{folder.title}\
      </div>
    </div>
  )
}


