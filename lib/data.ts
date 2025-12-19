import type React from "react"
import { AboutWindow } from "@/components/windows/about-window"
import { CoursesWindow } from "@/components/windows/courses-window"
import { PricesWindow } from "@/components/windows/prices-window"
import { ContactWindow } from "@/components/windows/contact-window"

export interface Course {
  title: string
  description: string
  icon: string
  duration: string
  level: string
  price: string
}

export interface PricePlan {
  id: string
  name: string
  price: string
  features: string[]
  color: string
}

export interface Contact {
  icon: string
  label: string
  value: string
}

export interface WindowConfig {
  title: string
  defaultPosition: { x: number; y: number }
  defaultSize: { width: number; height: number }
  component: React.ComponentType
  icon: string
}

export interface TaskbarItem {
  id: string
  label: string
  icon: string
}

export const courses: Course[] = [
  {
    title: "Веб-дизайн PRO",
    description: "От макета до готового сайта",
    icon: "🎨",
    duration: "3 месяца",
    level: "С нуля",
    price: "29 900 ₽",
  },
  {
    title: "Frontend-разработка",
    description: "React, TypeScript, Next.js",
    icon: "💻",
    duration: "4 месяца",
    level: "Базовый JS",
    price: "39 900 ₽",
  },
  {
    title: "UX/UI Design",
    description: "Исследования, прототипы, тесты",
    icon: "✨",
    duration: "2.5 месяца",
    level: "С нуля",
    price: "24 900 ₽",
  },
  {
    title: "Digital-маркетинг",
    description: "SMM, таргет, аналитика",
    icon: "📈",
    duration: "2 месяца",
    level: "С нуля",
    price: "19 900 ₽",
  },
]

export const prices: PricePlan[] = [
  {
    id: "basic",
    name: "Базовый",
    price: "9 900 ₽/мес",
    features: ["Видеоуроки", "Домашние задания", "Чат поддержки"],
    color: "#f5f0e1",
  },
  {
    id: "optimal",
    name: "Оптимальный",
    price: "14 900 ₽/мес",
    features: ["Всё из Базового", "Проверка ДЗ", "Групповые созвоны"],
    color: "#f8cf2c",
  },
  {
    id: "premium",
    name: "Премиум",
    price: "24 900 ₽/мес",
    features: ["Всё из Оптимального", "Личный ментор", "Карьерный коуч"],
    color: "#000000",
  },
]

export const contacts: Contact[] = [
  { icon: "📧", label: "Email", value: "hello@barboss.online" },
  { icon: "📱", label: "Telegram", value: "@barboss_school" },
  { icon: "📞", label: "Телефон", value: "+7 (999) 123-45-67" },
  { icon: "🌐", label: "Сайт", value: "barboss.online" },
]

export const windowConfigs: Record<string, WindowConfig> = {
  about: {
    title: "О школе BARBOSS",
    defaultPosition: { x: 40, y: 40 },
    defaultSize: { width: 380, height: 400 },
    component: AboutWindow,
    icon: "🎓",
  },
  courses: {
    title: "Наши курсы",
    defaultPosition: { x: 460, y: 60 },
    defaultSize: { width: 500, height: 380 },
    component: CoursesWindow,
    icon: "📚",
  },
  prices: {
    title: "Тарифы и цены",
    defaultPosition: { x: 80, y: 420 },
    defaultSize: { width: 360, height: 320 },
    component: PricesWindow,
    icon: "💰",
  },
  contact: {
    title: "Связаться с нами",
    defaultPosition: { x: 520, y: 380 },
    defaultSize: { width: 360, height: 320 },
    component: ContactWindow,
    icon: "📞",
  },
}

export const taskbarItems: TaskbarItem[] = [
  { id: "about", label: "О школе", icon: "🎓" },
  { id: "courses", label: "Курсы", icon: "📚" },
  { id: "prices", label: "Тарифы", icon: "💰" },
  { id: "contact", label: "Контакты", icon: "📞" },
]

export const desktopIcons = [
  { id: "about", icon: "🎓", label: "О школе" },
  { id: "courses", icon: "📚", label: "Курсы" },
  { id: "prices", icon: "💰", label: "Тарифы" },
  { id: "contact", icon: "📞", label: "Контакты" },
]


