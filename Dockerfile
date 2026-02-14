# ============================================
# Сборка Next.js (статический экспорт)
# ============================================
FROM node:22-alpine AS builder

# Установка pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm add -g pnpm

WORKDIR /app

# Копируем файлы зависимостей
COPY package.json pnpm-lock.yaml* ./

# Устанавливаем зависимости (включая dev для сборки)
RUN pnpm install --frozen-lockfile

# Копируем исходный код
COPY . .

# Сборка статического экспорта (результат в ./out)
RUN pnpm run build

# ============================================
# Продакшен: Nginx раздаёт статику
# ============================================
FROM nginx:alpine

# Копируем собранный сайт из стадии сборки
COPY --from=builder /app/out /usr/share/nginx/html

# Конфиг Nginx для SPA и порта 8080 (требование App Platform Timeweb Cloud)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Порт для App Platform (по умолчанию 8080, если EXPOSE не указан)
EXPOSE 8080

# Nginx запускается по умолчанию при старте контейнера
CMD ["nginx", "-g", "daemon off;"]
