import type { WindowConfig } from "./types"
import { products } from "./products"
import { contests } from "./contests"
import { partners } from "./partners"
import { legalDocuments } from "./legal-documents"
import { friends } from "./friends"

export const windowConfigs: Record<string, WindowConfig> = {
  about: {
    title: "Команда",
    defaultPosition: { x: 100, y: 100 },
    defaultSize: { width: 800, height: 650 },
    icon: "about",
  },
  contact: {
    title: "Связаться с нами",
    defaultPosition: { x: 100, y: 100 },
    defaultSize: { width: 800, height: 650 },
    icon: "contact",
  },
  settings: {
    title: "Настройки",
    defaultPosition: { x: 100, y: 100 },
    defaultSize: { width: 800, height: 650 },
    icon: "settings",
  },
  player: {
    title: "Музыка для работы",
    defaultPosition: { x: 100, y: 100 },
    defaultSize: { width: 800, height: 650 },
    icon: "player",
  },
  socials: {
    title: "Социальные сети",
    defaultPosition: { x: 100, y: 100 },
    defaultSize: { width: 800, height: 650 },
    icon: "🌐",
  },
  clippy: {
    title: "Помощник Clippy",
    defaultPosition: { x: 100, y: 100 },
    defaultSize: { width: 800, height: 650 },
    icon: "🐕",
  },
  "individual-courses": {
    title: "Индивидуальные курсы",
    defaultPosition: { x: 100, y: 100 },
    defaultSize: { width: 800, height: 650 },
    icon: "individual-courses",
  },
  "products-folder": {
    title: "Продукты",
    defaultPosition: { x: 100, y: 100 },
    defaultSize: { width: 800, height: 650 },
    icon: "products-folder",
  },
  "individual-products-folder": {
    title: "Индивидуальные продукты",
    defaultPosition: { x: 100, y: 100 },
    defaultSize: { width: 800, height: 650 },
    icon: "individual-products-folder",
  },
  "it-products-folder": {
    title: "IT-продукты",
    defaultPosition: { x: 100, y: 100 },
    defaultSize: { width: 800, height: 650 },
    icon: "it-products-folder",
  },
  "vacancies-folder": {
    title: "Вакансии",
    defaultPosition: { x: 100, y: 100 },
    defaultSize: { width: 800, height: 650 },
    icon: "vacancies-folder",
  },
  "advertising-folder": {
    title: "Реклама на площадке",
    defaultPosition: { x: 100, y: 100 },
    defaultSize: { width: 800, height: 650 },
    icon: "advertising-folder",
  },
  "contest-folder": {
    title: "Конкурсы и мероприятия",
    defaultPosition: { x: 100, y: 100 },
    defaultSize: { width: 800, height: 650 },
    icon: "contest-folder",
  },
  "friends-folder": {
    title: "Друзья",
    defaultPosition: { x: 100, y: 100 },
    defaultSize: { width: 800, height: 650 },
    icon: "friends-folder",
  },
  "legal-documents-folder": {
    title: "Юридические документы",
    defaultPosition: { x: 100, y: 100 },
    defaultSize: { width: 800, height: 650 },
    icon: "legal-documents-folder",
  },
  // Динамически добавленные конфигурации для всех продуктов
  ...products.reduce((acc, product) => {
    acc[`product-${product.id}`] = {
      title: product.title,
      defaultPosition: { x: 100, y: 100 },
      defaultSize: { width: 800, height: 650 },
      icon: product.icon,
    }
    return acc
  }, {} as Record<string, WindowConfig>),
  // Динамически добавленные конфигурации для конкурсов
  ...contests.reduce((acc, contest) => {
    acc[`product-${contest.id}`] = {
      title: contest.title,
      defaultPosition: { x: 100, y: 100 },
      defaultSize: { width: 800, height: 650 },
      icon: contest.icon,
    }
    return acc
  }, {} as Record<string, WindowConfig>),
  // Динамически добавленные конфигурации для партнеров
  ...partners.reduce((acc, partner) => {
    acc[`product-${partner.id}`] = {
      title: partner.title,
      defaultPosition: { x: 100, y: 100 },
      defaultSize: { width: 800, height: 650 },
      icon: partner.icon,
    }
    return acc
  }, {} as Record<string, WindowConfig>),
  // Динамически добавленные конфигурации для документов
  ...legalDocuments.reduce((acc, document) => {
    acc[`product-${document.id}`] = {
      title: document.title,
      defaultPosition: { x: 100, y: 100 },
      defaultSize: { width: 800, height: 650 },
      icon: document.icon,
    }
    return acc
  }, {} as Record<string, WindowConfig>),
  // Динамически добавленные конфигурации для друзей
  ...friends.reduce((acc, friend) => {
    acc[`product-friend-${friend.id}`] = {
      title: `О ${friend.name}`,
      defaultPosition: { x: 100, y: 100 },
      defaultSize: { width: 800, height: 650 },
      icon: "friends-folder",
    }
    return acc
  }, {} as Record<string, WindowConfig>),
}
