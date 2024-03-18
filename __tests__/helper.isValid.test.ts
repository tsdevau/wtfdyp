import { describe, expect, it } from "vitest"
import { isValid } from "../src/lib/helperFunctions"

describe("Test isValid Function Returns", () => {
  it("should return true for non-empty strings", () => {
    expect(isValid("hello")).toBe(true)
    expect(isValid("world")).toBe(true)
  })

  it("should return true for empty strings", () => {
    expect(isValid("")).toBe(true)
  })

  it("should return true for non-zero numbers", () => {
    expect(isValid(42)).toBe(true)
    expect(isValid(3.14)).toBe(true)
  })

  it("should return true for the number 0", () => {
    expect(isValid(0)).toBe(true)
  })

  it("should return true for a boolean value of true or false", () => {
    expect(isValid(true)).toBe(true)
    expect(isValid(false)).toBe(true)
    expect(isValid([true, false, true, false])).toBe(true)
  })

  it("should return false for null and undefined", () => {
    expect(isValid(null)).toBe(false)
    expect(isValid(undefined)).toBe(false)
  })

  it("should return true for arrays with all valid elements", () => {
    expect(isValid(["hello", 42, "", 0, false])).toBe(true)
    expect(isValid([3.14, "world", false])).toBe(true)
    expect(isValid(["hello", 42, true, false, ""])).toBe(true)
    expect(isValid(["", 42])).toBe(true)
    expect(isValid([0, "world"])).toBe(true)
  })

  it("should return false for arrays with any invalid element", () => {
    expect(isValid([null, "valid", 42, ""])).toBe(false)
    expect(isValid([undefined, 42, "valid", true])).toBe(false)
  })

  it("should return true for empty arrays", () => {
    expect(isValid([])).toBe(true)
  })
})
