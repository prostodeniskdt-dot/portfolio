"use client"

import { useState, useMemo } from "react"
import { courses } from "@/lib/data"

type FilterType = "all" | "popular" | "new"

export function IndividualCoursesWindow() {
  const [filter, setFilter] = useState<FilterType>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCourses = useMemo(() => {
    let result = courses

    // Фильтрация по типу
    if (filter === "popular") {
      // Популярные курсы (можно добавить поле popularity в данные)
      result = result.filter((_, index) => index < 2)
    } else if (filter === "new") {
      // Новые курсы (последние 2)
      result = result.slice(-2)
    }

    // Поиск
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (course) =>
          course.title.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query) ||
          course.level.toLowerCase().includes(query),
      )
    }

    return result
  }, [filter, searchQuery])

  return (
    <div className="text-black text-sm">
      {/* Toolbar */}
      <div
        className="flex items-center gap-2 p-2 mb-3"
        style={{
          background: "#b8860b",
          border: "2px solid #000000",
        }}
      >
        <button
          onClick={() => setFilter("all")}
          className="px-3 py-1 text-xs font-bold transition-colors"
          style={{
            background: filter === "all" ? "#000000" : "#b8860b",
            color: filter === "all" ? "#b8860b" : "#000000",
            border: "2px solid",
            borderColor: filter === "all" ? "#b8860b" : "#000000",
          }}
        >
          Все индивидуальные курсы
        </button>
        <button
          onClick={() => setFilter("popular")}
          className="px-3 py-1 text-xs font-bold transition-colors"
          style={{
            background: filter === "popular" ? "#000000" : "#b8860b",
            color: filter === "popular" ? "#b8860b" : "#000000",
            border: "2px solid",
            borderColor: filter === "popular" ? "#b8860b" : "#000000",
          }}
        >
          Популярные
        </button>
        <button
          onClick={() => setFilter("new")}
          className="px-3 py-1 text-xs font-bold transition-colors"
          style={{
            background: filter === "new" ? "#000000" : "#b8860b",
            color: filter === "new" ? "#b8860b" : "#000000",
            border: "2px solid",
            borderColor: filter === "new" ? "#b8860b" : "#000000",
          }}
        >
          Новые
        </button>
        <div className="flex-1" />
        <span className="text-xs font-bold text-black">{filteredCourses.length} курса</span>
      </div>

      {/* Search */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="🔍 Поиск курсов..."
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

      {/* Course list */}
      <div className="space-y-2">
        {filteredCourses.length === 0 ? (
          <div
            className="p-4 text-center"
            style={{
              background: "#f5f0e1",
              border: "2px solid #000000",
            }}
          >
            <span className="text-sm">Курсы не найдены</span>
          </div>
        ) : (
          filteredCourses.map((course, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3 cursor-pointer hover:bg-[#b8860b] group transition-colors"
            style={{
              background: "#f5f0e1",
              border: "2px solid #000000",
            }}
          >
            <span className="text-2xl">{course.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm">{course.title}</div>
              <div className="text-xs text-[#666666] group-hover:text-black">{course.description}</div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-xs text-[#666666] group-hover:text-black">{course.duration}</div>
              <div className="text-sm font-bold text-black">{course.price}</div>
            </div>
          </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div
        className="mt-3 p-2 text-xs font-bold"
        style={{
          background: "#000000",
          color: "#b8860b",
        }}
      >
        📂 C:\BARBOSS\IndividualCourses\
      </div>
    </div>
  )
}
