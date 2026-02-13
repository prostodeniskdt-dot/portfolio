"use client"

import dynamic from "next/dynamic"
import type { ComponentType } from "react"

// Shared loading fallback for all dynamically loaded windows
const WindowLoading = () => null

// Lazy load window components with optimized code splitting
export const AboutWindow = dynamic(
  () => import("./windows/about-window").then((mod) => ({ default: mod.AboutWindow })),
  {
    ssr: false,
    loading: WindowLoading,
  },
)

export const PlayerWindow = dynamic(
  () => import("./windows/player-window").then((mod) => ({ default: mod.PlayerWindow })),
  {
    ssr: false,
    loading: WindowLoading,
  },
)

export const ContactWindow = dynamic(
  () => import("./windows/contact-window").then((mod) => ({ default: mod.ContactWindow })),
  {
    ssr: false,
    loading: WindowLoading,
  },
)

export const SettingsWindow = dynamic(
  () => import("./windows/settings-window").then((mod) => ({ default: mod.SettingsWindow })),
  {
    ssr: false,
    loading: WindowLoading,
  },
)

export const SocialsWindow = dynamic(
  () => import("./windows/socials-window").then((mod) => ({ default: mod.SocialsWindow })),
  {
    ssr: false,
    loading: WindowLoading,
  },
)

export const ClippyChatWindow = dynamic(
  () => import("./windows/clippy-chat-window").then((mod) => ({ default: mod.ClippyChatWindow })),
  {
    ssr: false,
    loading: WindowLoading,
  },
)

export const FolderWindowDynamic = dynamic(
  () => import("./windows/folder-window").then((mod) => ({ default: mod.FolderWindow })),
  {
    ssr: false,
    loading: WindowLoading,
  },
) as ComponentType<{ folderId: string; onOpenProduct?: (productId: string) => void }>

export const ProductWindowDynamic = dynamic(
  () => import("./windows/product-window").then((mod) => ({ default: mod.ProductWindow })),
  {
    ssr: false,
    loading: WindowLoading,
  },
) as ComponentType<{ productId: string }>

export const IndividualCoursesWindowDynamic = dynamic(
  () => import("./windows/courses-window").then((mod) => ({ default: mod.IndividualCoursesWindow })),
  {
    ssr: false,
    loading: WindowLoading,
  },
)

/** Map of window IDs to lazy-loaded components (for regular, non-folder/product windows) */
export const windowComponents: Record<string, ComponentType> = {
  about: AboutWindow,
  contact: ContactWindow,
  settings: SettingsWindow,
  player: PlayerWindow,
  socials: SocialsWindow,
  clippy: ClippyChatWindow,
  "individual-courses": IndividualCoursesWindowDynamic,
}
