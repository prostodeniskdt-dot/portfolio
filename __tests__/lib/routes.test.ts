import { describe, it, expect } from "vitest"
import {
  ROUTE_SLUGS,
  folderIdToWindowId,
  folderIdToPath,
  windowIdToPath,
  resolveDeepLink,
  parsePathname,
  isValidSectionSlug,
  isValidFriendItemSlug,
} from "@/lib/routes"

describe("routes", () => {
  it("exposes all section slugs", () => {
    expect(ROUTE_SLUGS.length).toBeGreaterThanOrEqual(12)
    expect(ROUTE_SLUGS).toContain("friends")
    expect(ROUTE_SLUGS).toContain("contact")
  })

  it("maps folder ids to window ids", () => {
    expect(folderIdToWindowId("friends")).toBe("friends-folder")
    expect(folderIdToWindowId("products")).toBe("products-folder")
  })

  it("maps window ids to paths", () => {
    expect(windowIdToPath("contact")).toBe("/contact/")
    expect(windowIdToPath("friends-folder")).toBe("/friends/")
    expect(folderIdToPath("products")).toBe("/products/")
  })

  it("resolves folder deep links", () => {
    const state = resolveDeepLink("friends")
    expect(state?.openWindows).toEqual(["friends-folder"])
    expect(state?.activeWindow).toBe("friends-folder")
  })

  it("resolves nested friend deep links", () => {
    const state = resolveDeepLink("friends", "cocktail-design")
    expect(state?.openWindows).toContain("friends-folder")
    expect(state?.openWindows).toContain("product-friend-cocktail-design")
    expect(state?.activeWindow).toBe("product-friend-cocktail-design")
  })

  it("resolves player deep link", () => {
    const state = resolveDeepLink("player")
    expect(state?.openPlayer).toBe(true)
  })

  it("parses pathnames", () => {
    expect(parsePathname("/")).toBeNull()
    expect(parsePathname("/friends/")).toEqual({ section: "friends" })
    expect(parsePathname("/friends/cocktail-design/")).toEqual({
      section: "friends",
      item: "cocktail-design",
    })
    expect(parsePathname("/ru/friends/")).toEqual({ section: "friends" })
    expect(parsePathname("/ru/friends/cocktail-design/")).toEqual({
      section: "friends",
      item: "cocktail-design",
    })
    expect(parsePathname("/en/products/")).toEqual({ section: "products" })
    expect(parsePathname("/unknown")).toBeNull()
    expect(parsePathname("/friends/unknown")).toBeNull()
  })

  it("validates slugs", () => {
    expect(isValidSectionSlug("friends")).toBe(true)
    expect(isValidSectionSlug("nope")).toBe(false)
    expect(isValidFriendItemSlug("steelbar")).toBe(true)
    expect(isValidFriendItemSlug("nope")).toBe(false)
  })
})
