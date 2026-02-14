/**
 * Копирует результат статического экспорта Next.js (папка out)
 * в директорию, которую ожидает Timeweb Cloud: dist/barboss/browser
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

fs.mkdirSync(dest, { recursive: true });
fs.cpSync(src, dest, { recursive: true });
console.log('Скопировано: out → dist/barboss/browser');
