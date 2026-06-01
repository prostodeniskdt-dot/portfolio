import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#008080] p-6 text-center font-sans text-white">
      <h1 className="text-2xl font-bold drop-shadow-[2px_2px_0_#000]">404 — Страница не найдена</h1>
      <p className="max-w-md text-lg drop-shadow-[1px_1px_0_#000]">
        Такого раздела нет. Вернитесь на рабочий стол.
      </p>
      <Link
        href="/"
        className="border-2 border-t-white border-l-white border-r-black border-b-black bg-[#c0c0c0] px-6 py-2 text-black shadow-[2px_2px_0_#000] active:border-t-black active:border-l-black active:border-r-white active:border-b-white"
      >
        На главную
      </Link>
    </div>
  )
}
