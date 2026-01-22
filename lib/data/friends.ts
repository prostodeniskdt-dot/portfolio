import type { Friend, FriendFile } from "./types"

export const friends: Friend[] = [
  {
    id: "cocktail-design",
    name: "Cocktail Design",
    description: "Дизайн коктейлей и барная эстетика",
    fullDescription:
      "Cocktail Design - команда профессионалов, специализирующаяся на создании уникальных дизайнов коктейлей и развитии барной эстетики. Мы работаем над созданием визуально привлекательных и вкусных напитков, которые запоминаются.",
    thumbnail: "/friends/cocktail-design/description-thumbnail.png",
    category: "Партнеры",
    website: "https://cocktaildesign.example",
    contact: "hello@cocktaildesign.example",
    features: [
      "Уникальные дизайны коктейлей",
      "Профессиональная команда",
      "Инновационные решения",
      "Высокое качество",
      "Креативный подход",
    ],
    services: [
      "Дизайн коктейлей",
      "Фотосессии напитков",
      "Консультации по барной эстетике",
      "Разработка меню",
      "Обучение персонала",
    ],
    subfolders: [
      {
        id: "cocktail-design-folder",
        name: "Cocktail Design",
        logo: "/friends/cocktail-design/logo.png", // Логотип команды 1280x1280
        files: [
          {
            id: "desc-cocktail-design",
            name: "описание",
            type: "description",
            friendId: "cocktail-design",
            order: 0,
          },
          {
            id: "img-cocktail-design-1",
            name: "1.png",
            type: "image",
            filePath: "/friends/cocktail-design/1.png",
            friendId: "cocktail-design",
            order: 1,
          },
          {
            id: "img-cocktail-design-2",
            name: "2.png",
            type: "image",
            filePath: "/friends/cocktail-design/2.png",
            friendId: "cocktail-design",
            order: 2,
          },
          {
            id: "img-cocktail-design-3",
            name: "3.png",
            type: "image",
            filePath: "/friends/cocktail-design/3.png",
            friendId: "cocktail-design",
            order: 3,
          },
          {
            id: "img-cocktail-design-4",
            name: "4.png",
            type: "image",
            filePath: "/friends/cocktail-design/4.png",
            friendId: "cocktail-design",
            order: 4,
          },
          {
            id: "img-cocktail-design-5",
            name: "5.png",
            type: "image",
            filePath: "/friends/cocktail-design/5.png",
            friendId: "cocktail-design",
            order: 5,
          },
          {
            id: "img-cocktail-design-6",
            name: "6.png",
            type: "image",
            filePath: "/friends/cocktail-design/6.png",
            friendId: "cocktail-design",
            order: 6,
          },
        ],
      },
    ],
    // Оставляем files для обратной совместимости, но они не используются
    files: [],
  },
]
