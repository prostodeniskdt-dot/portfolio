import { describe, it, expect } from "vitest"
import { courses, prices, contacts, desktopIcons, taskbarItems, windowConfigs } from "@/lib/data"

describe("Data", () => {
  it("should have courses data", () => {
    expect(courses).toBeDefined()
    expect(courses.length).toBeGreaterThan(0)
    expect(courses[0]).toHaveProperty("title")
    expect(courses[0]).toHaveProperty("description")
    expect(courses[0]).toHaveProperty("price")
  })

  it("should have prices data", () => {
    expect(prices).toBeDefined()
    expect(prices.length).toBeGreaterThan(0)
    expect(prices[0]).toHaveProperty("name")
    expect(prices[0]).toHaveProperty("price")
    expect(prices[0]).toHaveProperty("features")
  })

  it("should have contacts data", () => {
    expect(contacts).toBeDefined()
    expect(contacts.length).toBeGreaterThan(0)
    expect(contacts[0]).toHaveProperty("icon")
    expect(contacts[0]).toHaveProperty("label")
    expect(contacts[0]).toHaveProperty("value")
  })

  it("should have desktop icons", () => {
    expect(desktopIcons).toBeDefined()
    expect(desktopIcons.length).toBeGreaterThan(0)
    expect(desktopIcons[0]).toHaveProperty("id")
    expect(desktopIcons[0]).toHaveProperty("icon")
    expect(desktopIcons[0]).toHaveProperty("label")
  })

  it("should have taskbar items", () => {
    expect(taskbarItems).toBeDefined()
    expect(taskbarItems.length).toBeGreaterThan(0)
    expect(taskbarItems[0]).toHaveProperty("id")
    expect(taskbarItems[0]).toHaveProperty("label")
    expect(taskbarItems[0]).toHaveProperty("icon")
  })

  it("should have window configs", () => {
    expect(windowConfigs).toBeDefined()
    expect(windowConfigs["about"]).toBeDefined()
    expect(windowConfigs["about"]).toHaveProperty("title")
    expect(windowConfigs["about"]).toHaveProperty("defaultPosition")
    expect(windowConfigs["about"]).toHaveProperty("defaultSize")
  })
})

