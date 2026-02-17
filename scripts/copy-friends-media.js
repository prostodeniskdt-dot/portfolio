#!/usr/bin/env node
/**
 * Скрипт копирования медиа-файлов из Enjoy_barware и steelbar_hug в public/friends/
 * Запуск: node scripts/copy-friends-media.js
 */

const fs = require("fs")
const path = require("path")

const root = path.join(__dirname, "..")

// Enjoy Barware: исходные файлы -> целевые имена
const enjoyBarwareMap = [
  ["logo.jpg", "logo.jpg"],
  ["CONVALLARIA COCTAIIL.jpg", "1.jpg"],
  ["CONVALLARIA.JPG", "2.jpg"],
  ["SHIRAZ.JPG", "3.jpg"],
  ["UNI ROCKS.jpg", "4.jpg"],
  ["UNIVERSAL NEW.JPG", "5.jpg"],
  ["Milk Berry Club.mp4", "video1.mp4"],
  ["Гимлет.mp4", "video2.mp4"],
  ["Элегантность посуды.mp4", "video3.mp4"],
]

// Steelbar: HEIC нужно конвертировать вручную! Копируем только JPG/PNG
const steelbarMap = [
  ["logo.png", "logo.png"],
  ["Макет станции.jpg", "2.jpg"],
  ["Станция.JPG", "4.jpg"],
  // Вид с верху.HEIC -> 1.jpg, Станция вид с угла.HEIC -> 3.jpg - конвертировать вручную
]

function copyFile(src, dest) {
  const srcPath = path.join(root, src)
  const destPath = path.join(root, dest)
  const destDir = path.dirname(destPath)
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true })
  }
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath)
    console.log(`  OK: ${src} -> ${dest}`)
    return true
  } else {
    console.log(`  SKIP (нет файла): ${src}`)
    return false
  }
}

console.log("Копирование Enjoy Barware...")
const enjoySrc = "Enjoy_barware"
const enjoyDest = "public/friends/enjoy-barware"
enjoyBarwareMap.forEach(([src, dest]) => {
  copyFile(path.join(enjoySrc, src), path.join(enjoyDest, dest))
})

console.log("\nКопирование Steelbar...")
const steelSrc = "steelbar_hug"
const steelDest = "public/friends/steelbar"
steelbarMap.forEach(([src, dest]) => {
  copyFile(path.join(steelSrc, src), path.join(steelDest, dest))
})

console.log("\nВнимание: для Steelbar конвертируйте вручную в JPG и переименуйте:")
console.log("  Вид с верху.HEIC -> public/friends/steelbar/1.jpg")
console.log("  Станция вид с угла.HEIC -> public/friends/steelbar/3.jpg")
console.log("\nГотово.")
