import { friends } from "@/lib/data/friends"
import type { Metadata } from "next"

export type RouteSectionType = "folder" | "window" | "player"

export interface RouteSectionConfig {
  type: RouteSectionType
  folderId?: string
  windowId?: string
  title: string
  description: string
}

/** URL slug → section config */
export const ROUTE_SECTIONS: Record<string, RouteSectionConfig> = {
  products: {
    type: "folder",
    folderId: "products",
    title: "Продукты",
    description: "Пакеты документов и продукты БАР БОСС ONLINE",
  },
  "individual-products": {
    type: "folder",
    folderId: "individual-products",
    title: "Индивидуальные продукты",
    description: "Индивидуальные продукты и услуги для заведений",
  },
  "it-products": {
    type: "folder",
    folderId: "it-products",
    title: "IT-продукты",
    description: "Сайты, веб-приложения и интеграции",
  },
  vacancies: {
    type: "folder",
    folderId: "vacancies",
    title: "Вакансии",
    description: "Вакансии и карьера в БАР БОСС ONLINE",
  },
  advertising: {
    type: "folder",
    folderId: "advertising",
    title: "Реклама на площадке",
    description: "Размещение рекламы на площадке БАР БОСС",
  },
  contest: {
    type: "folder",
    folderId: "contest",
    title: "Конкурсы и мероприятия",
    description: "Конкурсы и мероприятия БАР БОСС ONLINE",
  },
  friends: {
    type: "folder",
    folderId: "friends",
    title: "Друзья",
    description: "Партнёры и друзья БАР БОСС ONLINE",
  },
  "legal-documents": {
    type: "folder",
    folderId: "legal-documents",
    title: "Юридические документы",
    description: "Политики и соглашения БАР БОСС ONLINE",
  },
  contact: {
    type: "window",
    windowId: "contact",
    title: "Контакты",
    description: "Связаться с БАР БОСС ONLINE",
  },
  about: {
    type: "window",
    windowId: "about",
    title: "Команда",
    description: "Команда БАР БОСС ONLINE",
  },
  socials: {
    type: "window",
    windowId: "socials",
    title: "Социальные сети",
    description: "Социальные сети БАР БОСС ONLINE",
  },
  settings: {
    type: "window",
    windowId: "settings",
    title: "Настройки",
    description: "Настройки сайта БАР БОСС ONLINE",
  },
  player: {
    type: "player",
    title: "Музыка для работы",
    description: "Плеер музыки для работы от БАР БОСС ONLINE",
  },
}

export const ROUTE_SLUGS = Object.keys(ROUTE_SECTIONS)

const FOLDER_ID_TO_WINDOW: Record<string, string> = {
  products: "products-folder",
  "individual-products": "individual-products-folder",
  "it-products": "it-products-folder",
  vacancies: "vacancies-folder",
  advertising: "advertising-folder",
  contest: "contest-folder",
  friends: "friends-folder",
  "legal-documents": "legal-documents-folder",
}

const WINDOW_TO_FOLDER_ID: Record<string, string> = Object.fromEntries(
  Object.entries(FOLDER_ID_TO_WINDOW).map(([folderId, windowId]) => [windowId, folderId]),
)

const WINDOW_TO_SLUG: Record<string, string> = {
  contact: "contact",
  about: "about",
  socials: "socials",
  settings: "settings",
  player: "player",
  ...Object.fromEntries(
    Object.entries(FOLDER_ID_TO_WINDOW).map(([folderId, windowId]) => [windowId, folderId]),
  ),
}

export function folderIdToWindowId(folderId: string): string {
  return FOLDER_ID_TO_WINDOW[folderId] ?? `${folderId}-folder`
}

export function isValidSectionSlug(slug: string): boolean {
  return slug in ROUTE_SECTIONS
}

export function isValidFriendItemSlug(item: string): boolean {
  return friends.some((f) => f.id === item)
}

export interface DeepLinkState {
  openWindows: string[]
  activeWindow: string | null
  openPlayer?: boolean
}

export function resolveDeepLink(section: string, item?: string): DeepLinkState | null {
  const config = ROUTE_SECTIONS[section]
  if (!config) return null

  if (config.type === "player") {
    return { openWindows: ["about"], activeWindow: "about", openPlayer: true }
  }

  if (config.type === "window" && config.windowId) {
    return { openWindows: [config.windowId], activeWindow: config.windowId }
  }

  if (config.type === "folder" && config.folderId) {
    const folderWindow = folderIdToWindowId(config.folderId)
    const openWindows = [folderWindow]
    let activeWindow: string | null = folderWindow

    if (item && config.folderId === "friends" && isValidFriendItemSlug(item)) {
      const friendWindow = `product-friend-${item}`
      openWindows.push(friendWindow)
      activeWindow = friendWindow
    }

    return { openWindows, activeWindow }
  }

  return null
}

export function getPathForSection(section: string, item?: string): string {
  if (item) return `/${section}/${item}/`
  return `/${section}/`
}

export function windowIdToPath(windowId: string): string | null {
  const slug = WINDOW_TO_SLUG[windowId]
  if (slug) return getPathForSection(slug)
  return null
}

export function folderIdToPath(folderId: string): string {
  return getPathForSection(folderId)
}

export function parsePathname(pathname: string): { section: string; item?: string } | null {
  const normalized = pathname.replace(/\/$/, "") || "/"
  if (normalized === "/") return null

  const parts = normalized.split("/").filter(Boolean)
  if (parts.length === 0 || parts.length > 2) return null

  const [section, item] = parts
  if (!isValidSectionSlug(section)) return null
  if (item && (section !== "friends" || !isValidFriendItemSlug(item))) return null

  return item ? { section, item } : { section }
}

export function getNestedStaticParams(): { section: string; item: string }[] {
  return friends.map((f) => ({ section: "friends", item: f.id }))
}

export function getSectionMetadata(section: string): Metadata {
  const config = ROUTE_SECTIONS[section]
  if (!config) {
    return { title: "БАР БОСС ONLINE" }
  }
  return {
    title: `${config.title} | БАР БОСС ONLINE`,
    description: config.description,
    openGraph: {
      title: `${config.title} | БАР БОСС ONLINE`,
      description: config.description,
    },
  }
}

export function getNestedMetadata(section: string, item: string): Metadata {
  const friend = friends.find((f) => f.id === item)
  if (!friend) return getSectionMetadata(section)
  return {
    title: `${friend.name} | Друзья | БАР БОСС ONLINE`,
    description: friend.description,
    openGraph: {
      title: `${friend.name} | БАР БОСС ONLINE`,
      description: friend.description,
    },
  }
}
