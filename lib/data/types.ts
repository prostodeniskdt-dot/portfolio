import type React from "react"

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
  component?: React.ComponentType
  icon: string
}

export interface TaskbarItem {
  id: string
  label: string
  icon: string
}

export interface Product {
  id: string
  title: string
  description: string
  fullDescription: string
  icon: string
  category: string
  price?: string
  features: string[]
  duration?: string
  level?: string
  promoImage?: string
  descriptionLink?: string
  videoReviewLink?: string
  shortVideoReviewLink?: string
  paymentLink?: string
  // Поля для рекламных продуктов
  subscribers?: string
  originalPrice?: string
  discount?: string
  isPromo?: boolean
}

export interface Contest {
  id: string
  title: string
  description: string
  fullDescription: string
  icon: string
  category: string
  prize?: string
  deadline?: string
  status: "active" | "upcoming" | "finished"
  features: string[]
  rules?: string[]
}

export interface Partner {
  id: string
  title: string
  description: string
  fullDescription: string
  icon: string
  category: string
  website?: string
  contact?: string
  features: string[]
  services?: string[]
}

export interface LegalDocument {
  id: string
  title: string
  description: string
  fullDescription: string
  icon: string
  category: string
  documentType: string
  features: string[]
  downloadUrl?: string
}

export interface Folder {
  id: string
  title: string
  icon: string
  items: string[] // IDs продуктов или подпапок
  isFolder: true
}

export interface DesktopIcon {
  id: string
  icon: string
  label: string
  type?: "folder" | "window" | "action" | "trash"
}
