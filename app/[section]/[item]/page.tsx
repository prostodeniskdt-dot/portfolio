import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { DesktopApp } from "@/components/desktop-app"
import {
  getNestedMetadata,
  getNestedStaticParams,
  isValidFriendItemSlug,
  isValidSectionSlug,
} from "@/lib/routes"

export function generateStaticParams() {
  return getNestedStaticParams()
}

type PageProps = {
  params: Promise<{ section: string; item: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { section, item } = await params
  if (section !== "friends" || !isValidFriendItemSlug(item)) {
    return { title: "БАР БОСС ONLINE" }
  }
  return getNestedMetadata(section, item)
}

export default async function NestedSectionPage({ params }: PageProps) {
  const { section, item } = await params

  if (section !== "friends" || !isValidSectionSlug(section) || !isValidFriendItemSlug(item)) {
    notFound()
  }

  return <DesktopApp />
}
