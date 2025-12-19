"use client"

const courses = [
  {
    title: "Веб-дизайн PRO",
    description: "От макета до готового сайта",
    icon: "🎨",
    duration: "3 месяца",
    level: "С нуля",
    price: "29 900 ₽",
  },
  {
    title: "Frontend-разработка",
    description: "React, TypeScript, Next.js",
    icon: "💻",
    duration: "4 месяца",
    level: "Базовый JS",
    price: "39 900 ₽",
  },
  {
    title: "UX/UI Design",
    description: "Исследования, прототипы, тесты",
    icon: "✨",
    duration: "2.5 месяца",
    level: "С нуля",
    price: "24 900 ₽",
  },
  {
    title: "Digital-маркетинг",
    description: "SMM, таргет, аналитика",
    icon: "📈",
    duration: "2 месяца",
    level: "С нуля",
    price: "19 900 ₽",
  },
]

export function CoursesWindow() {
  return (
    <div className="text-black text-sm">
      {/* Toolbar */}
      <div
        className="flex items-center gap-2 p-2 mb-3"
        style={{
          background: "#f8cf2c",
          border: "2px solid #000000",
        }}
      >
        <button
          className="px-3 py-1 text-xs font-bold"
          style={{
            background: "#000000",
            color: "#f8cf2c",
            border: "2px solid #f8cf2c",
          }}
        >
          Все курсы
        </button>
        <button
          className="px-3 py-1 text-xs font-bold hover:bg-black hover:text-[#f8cf2c] transition-colors"
          style={{
            background: "#f8cf2c",
            color: "#000000",
            border: "2px solid #000000",
          }}
        >
          Популярные
        </button>
        <div className="flex-1" />
        <span className="text-xs font-bold text-black">{courses.length} курса</span>
      </div>

      {/* Course list */}
      <div className="space-y-2">
        {courses.map((course, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3 cursor-pointer hover:bg-[#f8cf2c] group transition-colors"
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
        ))}
      </div>

      {/* Footer */}
      <div
        className="mt-3 p-2 text-xs font-bold"
        style={{
          background: "#000000",
          color: "#f8cf2c",
        }}
      >
        📂 C:\BARBOSS\Courses\
      </div>
    </div>
  )
}
