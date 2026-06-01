"use client"

import { useCallback, useEffect, useState } from "react"
import { parsePathname } from "@/lib/routes"

function readPathname(): string {
  if (typeof window === "undefined") return "/"
  return window.location.pathname
}

function normalizePath(path: string): string {
  const localePrefixMatch = path.match(/^\/([a-z]{2})(\/.*|$)/i)
  const localeSection = localePrefixMatch?.[1]?.toLowerCase()
  const withoutLocalePrefix =
    localeSection === "ru" || localeSection === "en"
      ? path.replace(/^\/[a-z]{2}(?=\/|$)/i, "") || "/"
      : path

  return withoutLocalePrefix.replace(/\/$/, "") || "/"
}

/**
 * Синхронизация URL для статического экспорта (без полноценного Next.js router).
 * pushState не перезагружает страницу — обновляем path в React вручную.
 */
export function useAppPath() {
  const [pathname, setPathname] = useState(readPathname)

  useEffect(() => {
    const sync = () => setPathname(readPathname())

    window.addEventListener("popstate", sync)
    window.addEventListener("app-navigate", sync)

    return () => {
      window.removeEventListener("popstate", sync)
      window.removeEventListener("app-navigate", sync)
    }
  }, [])

  const navigate = useCallback((path: string) => {
    const current = readPathname()
    if (normalizePath(current) === normalizePath(path)) return

    window.history.pushState(null, "", path)
    setPathname(path)
    window.dispatchEvent(new Event("app-navigate"))
  }, [])

  const parsed = parsePathname(pathname)

  return { pathname, parsed, navigate }
}
