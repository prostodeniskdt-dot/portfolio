import type { Friend, FriendFile } from "./types"

export const friends: Friend[] = [
  {
    id: "cocktail-design",
    name: "Cocktail Design",
    description: "Дизайн коктейлей и барная эстетика",
    fullDescription: `Cocktail Design - это не только магазин барного инвентаря.

В собственной мастерской происходит создание барного инвентаря, где внимание к деталям это принцип работы. Там изготавливают:
гравировки,
аксессуары,
клише и оттиски для брендирования льда

Всё это про визуальный стиль, эстетику и комфорт.

В Cocktail Design впервые в мире сделали барный инвентарь с цветной гравировкой для еще большего вдохновения в работе.

В магазине можно найти инвентарь, который:
• качественный и стильный
• подойдёт под любые цели и задачи
• идёт с пожизненной гарантией на собственное производство
• как классический, так и уникальный с цветной гравировкой
• представлен в большом ассортименте

А также гарниши для воплощения любых идей в подаче:
• аспарагус
• яблочный лист
• эвкалипт
• гомфрена
• гипсофила
• скелетированные листья
• сушенные цветки`,
    thumbnail: "/friends/cocktail-design/description-thumbnail.png",
    category: "Партнеры",
    website: "https://cocktaildesign.ru/",
    contact: "cocktaildesign@yandex.ru",
    phone: "+7(995)622-62-02",
    address: "Санкт-Петербург, ул. Уральская 19к8, бизнес-центр «Урал Плаза», оф.120",
    telegramManager: "https://t.me/Manager_cocktail_design",
    socials: {
      vk: "https://vk.com/cocktail_design",
      instagram: "https://www.instagram.com/cocktail_design?igsh=ZW03NDRldndzODUx",
      telegram: "https://t.me/Cocktail_Design_official",
    },
    features: [
      "Качественный и стильный инвентарь",
      "Подходит под любые цели и задачи",
      "Пожизненная гарантия на собственное производство",
      "Классический и уникальный с цветной гравировкой",
      "Большой ассортимент",
    ],
    services: [
      "Гравировки",
      "Аксессуары",
      "Клише и оттиски для брендирования льда",
      "Барный инвентарь с цветной гравировкой",
      "Гарниши для коктейлей",
    ],
    subfolders: [
      {
        id: "cocktail-design-folder",
        name: "Cocktail Design",
        logo: "/friends/cocktail-design/logo.png",
        files: [
          {
            id: "desc-cocktail-design",
            name: "О Cocktail Design",
            type: "description",
            friendId: "cocktail-design",
            order: 0,
          },
          {
            id: "img-cocktail-design-1",
            name: "Отпечаток льда",
            type: "image",
            filePath: "/friends/cocktail-design/1.png",
            friendId: "cocktail-design",
            order: 1,
          },
          {
            id: "img-cocktail-design-2",
            name: "Отпечаток льда. Практика",
            type: "image",
            filePath: "/friends/cocktail-design/2.png",
            friendId: "cocktail-design",
            order: 2,
          },
          {
            id: "img-cocktail-design-3",
            name: "Фирменный стрейнер",
            type: "image",
            filePath: "/friends/cocktail-design/3.png",
            friendId: "cocktail-design",
            order: 3,
          },
          {
            id: "img-cocktail-design-4",
            name: "Набор стрейнеров",
            type: "image",
            filePath: "/friends/cocktail-design/4.png",
            friendId: "cocktail-design",
            order: 4,
          },
          {
            id: "img-cocktail-design-5",
            name: "Гарниш для коктейля",
            type: "image",
            filePath: "/friends/cocktail-design/5.png",
            friendId: "cocktail-design",
            order: 5,
          },
          {
            id: "img-cocktail-design-6",
            name: "Гарниш для коктейля. Листок",
            type: "image",
            filePath: "/friends/cocktail-design/6.png",
            friendId: "cocktail-design",
            order: 6,
          },
          {
            id: "img-cocktail-design-7",
            name: "Гарниш для коктейля. Цветок",
            type: "image",
            filePath: "/friends/cocktail-design/7.png",
            friendId: "cocktail-design",
            order: 7,
          },
          {
            id: "img-cocktail-design-8",
            name: "Набор VINTAGE · LEAVES",
            type: "image",
            filePath: "/friends/cocktail-design/8.png",
            friendId: "cocktail-design",
            order: 8,
          },
          {
            id: "img-cocktail-design-9",
            name: "Стрейнер VINTAGE · LEAVES",
            type: "image",
            filePath: "/friends/cocktail-design/9.png",
            friendId: "cocktail-design",
            order: 9,
          },
          {
            id: "video-cocktail-design-1",
            name: "video1.mp4",
            type: "video",
            filePath: "/friends/cocktail-design/video1.mp4",
            friendId: "cocktail-design",
            order: 10,
          },
          {
            id: "video-cocktail-design-2",
            name: "video2.mp4",
            type: "video",
            filePath: "/friends/cocktail-design/video2.mp4",
            friendId: "cocktail-design",
            order: 11,
          },
          {
            id: "video-cocktail-design-3",
            name: "video3.mp4",
            type: "video",
            filePath: "/friends/cocktail-design/video3.mp4",
            friendId: "cocktail-design",
            order: 12,
          },
          {
            id: "video-cocktail-design-4",
            name: "video4.mp4",
            type: "video",
            filePath: "/friends/cocktail-design/video4.mp4",
            friendId: "cocktail-design",
            order: 13,
          },
        ],
      },
    ],
    // Оставляем files для обратной совместимости, но они не используются
    files: [],
  },
]
