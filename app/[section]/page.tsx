import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { DesktopApp } from "@/components/desktop-app"
import {
  ROUTE_SLUGS,
  getSectionMetadata,
  isValidSectionSlug,
} from "@/lib/routes"

export function generateStaticParams() {
  return ROUTE_SLUGS.map((section) => ({ section }))
}

type PageProps = {
  params: Promise<{ section: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { section } = await params
  if (!isValidSectionSlug(section)) {
    return { title: "БАР БОСС ONLINE" }
  }
  return getSectionMetadata(section)
}

export default async function SectionPage({ params }: PageProps) {
  const { section } = await params

  if (!isValidSectionSlug(section)) {
    notFound()
  }

  return <DesktopApp deepLinkSection={section} />
}
