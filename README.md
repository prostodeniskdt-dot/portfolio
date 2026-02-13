# БАР БОСС ONLINE

Онлайн-школа креативных профессий с ретро-интерфейсом в стиле пиксель-арт.

## Технологии

- **Next.js 15** - React фреймворк для production
- **React 19** - UI библиотека
- **TypeScript** - Типизированный JavaScript
- **Tailwind CSS** - Utility-first CSS фреймворк
- **Vercel** - Платформа для деплоя и хостинга

## Установка

```bash
npm install
# или
pnpm install
```

## Разработка

```bash
npm run dev
# или
pnpm dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## Сборка

```bash
npm run build
npm start
```

## Тестирование

```bash
npm test
# или с UI
npm run test:ui
```

## Деплой

Проект автоматически деплоится на Vercel при push в `main` ветку GitHub.

**URL проекта:** https://barbossonline.com

## Структура проекта

```
portfolio/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── globals.css        # Глобальные стили
│   ├── layout.tsx         # Корневой layout
│   └── page.tsx           # Главная страница
├── components/            # React компоненты
│   ├── icons/            # Пиксельные иконки
│   ├── windows/          # Компоненты окон приложения
│   ├── desktop.tsx       # Рабочий стол (десктоп-режим)
│   ├── mobile-windows.tsx # Мобильный режим окон
│   ├── window-registry.ts # Реестр lazy-loaded окон
│   ├── window-renderer.tsx # Общая логика рендеринга окон
│   ├── os-window.tsx     # Компонент окна ОС
│   ├── retro-background.tsx # Фон с барной станцией
│   ├── sidebar-navigation.tsx # Боковая панель навигации
│   ├── taskbar.tsx       # Панель задач
│   └── toast-provider.tsx # Уведомления (Sonner)
├── hooks/                # Кастомные React хуки
│   ├── use-mobile.ts    # Хук определения мобильного устройства
│   ├── use-window-state.ts # Состояние окон
│   └── use-keyboard-shortcuts.ts # Горячие клавиши
├── lib/                  # Утилиты и данные
│   ├── constants.ts     # Константы (MOBILE_BREAKPOINT)
│   ├── data/            # Данные приложения (модульная структура)
│   │   ├── index.ts     # Реэкспорт всех данных
│   │   ├── types.ts     # TypeScript типы
│   │   ├── products.ts  # Продукты и услуги
│   │   ├── courses.ts   # Курсы и тарифы
│   │   ├── friends.ts   # Партнеры (Друзья)
│   │   ├── folders.ts   # Конфигурация папок
│   │   ├── window-configs.ts # Конфигурации окон
│   │   └── ...          # Остальные модули данных
│   ├── sounds.ts        # Менеджер звуков
│   └── utils.ts         # Утилиты
├── public/              # Статические файлы
│   └── music/          # Музыкальные файлы (MP3, OGG, WAV)
└── __tests__/          # Тесты
```

## Особенности

- 🎨 **Ретро-дизайн** в стиле пиксель-арт
- 🖥️ **Оконный интерфейс** как в классических ОС
- 🎵 **Звуковые эффекты** для интерактивности
- 🎶 **Медиа плеер** в стиле Windows 95
- 🗑️ **Корзина с drag & drop** для иконок
- ⌨️ **Горячие клавиши** (Alt+Tab, Alt+F4, Escape)
- 📱 **Адаптивный дизайн** для мобильных устройств
- 🌙 **Темная цветовая схема** с желтыми акцентами

## Медиа Плеер

Плеер поддерживает воспроизведение музыкальных файлов в форматах MP3, OGG и WAV.

### Как использовать:

1. Поместите файлы музыки в папку `public/music/`
2. Обновите список треков в файле `components/windows/player-window.tsx`:
   ```typescript
   const defaultTracks = [
     { id: 1, name: "Название трека", url: "/music/файл.mp3" },
     // добавьте больше треков
   ]
   ```
3. Откройте плеер через иконку в боковой панели

### Поддерживаемые форматы:
- MP3
- OGG
- WAV

## Скрипты

- `npm run dev` - Запустить dev сервер
- `npm run build` - Собрать production версию
- `npm run start` - Запустить production сервер
- `npm run lint` - Проверить код линтером
- `npm run type-check` - Проверить типы TypeScript
- `npm test` - Запустить тесты

## Цветовая схема

- **Основной желтый:** `#b8860b` (темно-желтый/goldenrod)
- **Черный:** `#000000`
- **Кремовый:** `#f5f0e1`
- **Темный фон:** `#1a1a1a`

## Лицензия

Private project




