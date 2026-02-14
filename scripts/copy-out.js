/**
 * Копирует результат статического экспорта Next.js (папка out)
 * в dist/barboss/browser (для некоторых сценариев деплоя).
 * Для Timeweb Cloud используется папка out напрямую.
 */
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const src = path.join(root, 'out');
const dest = path.join(root, 'dist', 'barboss', 'browser');

if (!fs.existsSync(src)) {
  console.error('Ошибка: папка out не найдена. Сначала выполните next build.');
  process.exit(1);
}

try {
  fs.mkdirSync(dest, { recursive: true });
  fs.cpSync(src, dest, { recursive: true });
  console.log('Скопировано: out → dist/barboss/browser');
} catch (err) {
  // Копия не критична для деплоя Timeweb (используется out)
  console.warn('postbuild: копия пропущена:', err.message);
}
