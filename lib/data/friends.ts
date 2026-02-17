import type { Friend, FriendFile } from "./types"

export const friends: Friend[] = [
  {
    id: "cocktail-design",
    name: "Cocktail Design",
    description: "Дизайн коктейлей и барная эстетика",
    fullDescription: `Cocktail Design — это не только магазин барного инвентаря, но и собственная мастерская, где внимание к деталям — принцип работы.

Команда создает барный инвентарь и решения для визуального стиля бара: от гравировок и аксессуаров до клише и оттисков для брендирования льда. Всё это про эстетику, аккуратность и комфорт в работе за стойкой.

В Cocktail Design впервые в мире сделали барный инвентарь с цветной гравировкой — это дает еще больше вдохновения в создании авторских подач и визуальных историй.

В магазине можно найти инвентарь, который:
• качественный и стильный
• подходит под любые цели и задачи
• имеет пожизненную гарантию на собственное производство
• бывает как классическим, так и уникальным — с цветной гравировкой
• представлен в большом и продуманном ассортименте

Отдельное направление — гарниши для воплощения любых идей в подаче. В ассортименте:
• аспарагус
• яблочный лист
• эвкалипт
• гомфрена
• гипсофила
• скелетированные листья
• сушеные цветки`,
    thumbnail: "/friends/cocktail-design/description-thumbnail.png",
    category: "Друг",
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
            name: "Фирменный стрейнер",
            type: "video",
            filePath: "/friends/cocktail-design/video1.mp4",
            friendId: "cocktail-design",
            order: 10,
          },
          {
            id: "video-cocktail-design-2",
            name: "Design Vintage Leaves",
            type: "video",
            filePath: "/friends/cocktail-design/video2.mp4",
            friendId: "cocktail-design",
            order: 11,
          },
          {
            id: "video-cocktail-design-3",
            name: "Design Art Deco",
            type: "video",
            filePath: "/friends/cocktail-design/video3.mp4",
            friendId: "cocktail-design",
            order: 12,
          },
          {
            id: "video-cocktail-design-4",
            name: "Набор инвентаря",
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
  {
    id: "enjoy-barware",
    name: "Enjoy Barware",
    description: "Ведущий дистрибьютор профессиональной посуды для HoReCa",
    fullDescription: `ENJOY barware — ведущий дистрибьютор профессиональной посуды для HoReCa.
Проект, созданный барными энтузиастами Алексеем Токаревым и Сергеем Жигаловым,
чтобы вернуть на рынок качественное барное стекло по честным ценам.
ENJOY — это ручная выдувка на одном из лучших китайских заводов бессвинцового
хрусталя, где делают коллекции для лучших брендов Европы. В ассортименте также
имеется линейка машинного производства.
ENJOY — универсальная посуда и собственные разработки с нуля, с возможностью
гравировки. Отгрузки по всей России, два склада c логистикой в Москве и уже более 500
клиентов — среди них Pinsky, Lucky Group, Васильчуки, FOLK team, Steak it Easy и другие.
ENJOY barware — когда форма и качество вдохновляют.
ENJOY поддерживают посудой ивенты, барные школы и конкурсы по всей России

Адрес: Москва, ул. Щипок 28 (10 минут от ст. м. Павелецкая)`,
    thumbnail: "/friends/enjoy-barware/logo.jpg",
    category: "Друг",
    address: "Москва, ул. Щипок 28 (10 минут от ст. м. Павелецкая)",
    socials: {
      instagram: "https://www.instagram.com/enjoy_barware",
      telegram: "https://t.me/enjoy_barware",
    },
    features: [
      "Ручная выдувка бессвинцового хрусталя",
      "Линейка машинного производства",
      "Универсальная посуда и собственные разработки",
      "Гравировка на заказ",
      "Отгрузки по всей России, два склада в Москве",
      "Более 500 клиентов",
    ],
    services: [
      "Профессиональная посуда для HoReCa",
      "Гравировка",
      "Поддержка ивентов, барных школ и конкурсов",
    ],
    subfolders: [
      {
        id: "enjoy-barware-folder",
        name: "Enjoy Barware",
        logo: "/friends/enjoy-barware/logo.jpg",
        files: [
          {
            id: "desc-enjoy-barware",
            name: "О Enjoy Barware",
            type: "description",
            friendId: "enjoy-barware",
            order: 0,
          },
          {
            id: "img-enjoy-barware-1",
            name: "CONVALLARIA Cocktail",
            type: "image",
            filePath: "/friends/enjoy-barware/1.jpg",
            friendId: "enjoy-barware",
            order: 1,
          },
          {
            id: "img-enjoy-barware-2",
            name: "CONVALLARIA",
            type: "image",
            filePath: "/friends/enjoy-barware/2.jpg",
            friendId: "enjoy-barware",
            order: 2,
          },
          {
            id: "img-enjoy-barware-3",
            name: "Shiraz",
            type: "image",
            filePath: "/friends/enjoy-barware/3.jpg",
            friendId: "enjoy-barware",
            order: 3,
          },
          {
            id: "img-enjoy-barware-4",
            name: "Uni Rocks",
            type: "image",
            filePath: "/friends/enjoy-barware/4.jpg",
            friendId: "enjoy-barware",
            order: 4,
          },
          {
            id: "img-enjoy-barware-5",
            name: "Universal New",
            type: "image",
            filePath: "/friends/enjoy-barware/5.jpg",
            friendId: "enjoy-barware",
            order: 5,
          },
          {
            id: "video-enjoy-barware-1",
            name: "Milk Berry Club",
            type: "video",
            filePath: "/friends/enjoy-barware/video1.mp4",
            friendId: "enjoy-barware",
            order: 6,
          },
          {
            id: "video-enjoy-barware-2",
            name: "Гимлет",
            type: "video",
            filePath: "/friends/enjoy-barware/video2.mp4",
            friendId: "enjoy-barware",
            order: 7,
          },
          {
            id: "video-enjoy-barware-3",
            name: "Элегантность посуды",
            type: "video",
            filePath: "/friends/enjoy-barware/video3.mp4",
            friendId: "enjoy-barware",
            order: 8,
          },
        ],
      },
    ],
    files: [],
  },
  {
    id: "steelbar",
    name: "Steelbar",
    description: "Барные станции и нейтральное оборудование для баров, ресторанов и отелей",
    fullDescription: `STEELBAR — российская компания, которая разрабатывает и производит барные
станции и нейтральное оборудование для баров, ресторанов и отелей в России и за
рубежом.
Основал компанию Алексей Токарев - выходец из Simple, Happy Trade, серийный
предприниматель. В индустрии с 2015 года, есть опыт, насмотренность и чувство стиля.
В основе подхода компании - эргономика, выгода и дизайн: STEELBAR проектирует
решения, которые ускоряют работу команды, повышают эффективность пространства и
усиливают визуальную концепцию заведения.
С 2022 года STEELBAR реализует проекты для заведений разного масштаба — от
небольших коктейльных баров до сетевых форматов. В портфолио такие партнеры как
холдинг WRF, Lucky group, Folk team, Vasilchuki, Pub Life, The Бык, Hokkah Place,
Менделеев бар и другие.`,
    thumbnail: "/friends/steelbar/logo.png",
    category: "Друг",
    website: "https://steel-bar.ru/",
    telegramManager: "https://t.me/+hZsu0578E0E3NzEy",
    socials: {
      telegram: "https://t.me/+hZsu0578E0E3NzEy",
    },
    features: [
      "Барные станции и нейтральное оборудование",
      "Эргономика, выгода и дизайн",
      "Решения для ускорения работы команды",
      "Проекты любого масштаба — от баров до сетей",
    ],
    services: [
      "Разработка и производство барных станций",
      "Оборудование для баров, ресторанов и отелей",
      "Проектирование в России и за рубежом",
    ],
    subfolders: [
      {
        id: "steelbar-folder",
        name: "Steelbar",
        logo: "/friends/steelbar/logo.png",
        files: [
          {
            id: "desc-steelbar",
            name: "О Steelbar",
            type: "description",
            friendId: "steelbar",
            order: 0,
          },
          {
            id: "img-steelbar-1",
            name: "Вид сверху",
            type: "image",
            filePath: "/friends/steelbar/1.jpg",
            friendId: "steelbar",
            order: 1,
          },
          {
            id: "img-steelbar-2",
            name: "Макет станции",
            type: "image",
            filePath: "/friends/steelbar/2.jpg",
            friendId: "steelbar",
            order: 2,
          },
          {
            id: "img-steelbar-3",
            name: "Станция вид с угла",
            type: "image",
            filePath: "/friends/steelbar/3.jpg",
            friendId: "steelbar",
            order: 3,
          },
          {
            id: "img-steelbar-4",
            name: "Станция",
            type: "image",
            filePath: "/friends/steelbar/4.jpg",
            friendId: "steelbar",
            order: 4,
          },
        ],
      },
    ],
    files: [],
  },
]
