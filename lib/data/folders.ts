import type { Folder } from "./types"

export const folders: Record<string, Folder> = {
  "products": {
    id: "products",
    title: "Продукты",
    icon: "📁",
    isFolder: true,
    items: [
      "documents-package-1",
      "documents-package-2",
      "documents-package-3",
      "inventory-lvl1",
    ],
  },
  "individual-products": {
    id: "individual-products",
    title: "Индивидуальные продукты",
    icon: "📁",
    isFolder: true,
    items: [
      "venue-launch-lvl2",
      "cocktail-menu-dev-lvl2",
      "venue-support-lvl2",
      "menu-design-lvl2",
      "consultations-lvl1",
      "individual-course-lvl1",
    ],
  },
  "it-products": {
    id: "it-products",
    title: "IT-продукты",
    icon: "📁",
    isFolder: true,
    items: [
      "websites-lvl3",
      "web-apps-lvl3",
      "gpt-integration-lvl3",
    ],
  },
  "vacancies": {
    id: "vacancies",
    title: "Вакансии",
    icon: "📁",
    isFolder: true,
    items: [
      "vacancies-lvl3",
    ],
  },
  "advertising": {
    id: "advertising",
    title: "Реклама на площадке",
    icon: "📁",
    isFolder: true,
    items: [
      "placements-package-all",
      "placements-telegram-barboss",
      "placements-telegram-otomosom",
      "placements-animated-barboss",
      "placements-animated-otomosom",
      "placements-website",
    ],
  },
  "contest": {
    id: "contest",
    title: "Конкурсы и мероприятия",
    icon: "📁",
    isFolder: true,
    items: [
      "contest-ginster",
    ],
  },
  "friends": {
    id: "friends",
    title: "Друзья",
    icon: "📁",
    isFolder: true,
    items: [
      "partner-bar-equipment",
      "partner-cocktail-school",
      "partner-premium-spirits",
      "partner-design-studio",
    ],
  },
  "legal-documents": {
    id: "legal-documents",
    title: "Юридические документы",
    icon: "📁",
    isFolder: true,
    items: [
      "legal-privacy-policy",
      "legal-user-agreement",
      "legal-terms-of-service",
      "legal-cookie-policy",
      "legal-offer-agreement",
      "legal-offer-agreement-b2b",
    ],
  },
}
