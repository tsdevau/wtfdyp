import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { getInvoiceCombinations } from "../src/getInvoiceCombinations"

describe("Test getInvoiceCombinations Function Returns", () => {
  beforeEach(() => {
    // Reset validCombos or any other necessary setup before each test
  })

  it("handles empty invoice amounts array", () => {
    expect(getInvoiceCombinations([], 100)).toEqual([])
  })

  it("finds a single invoice amount that exactly matches the payment amount", () => {
    expect(getInvoiceCombinations([100, 200, 300], 100)).toEqual([[{ amount: 100, index: 0 }]])
  })

  it("identifies multiple combinations that match the payment amount", () => {
    const combos = getInvoiceCombinations([50, 50, 100], 100)
    expect(combos).toEqual(
      expect.arrayContaining([
        expect.arrayContaining([
          { amount: 50, index: 0 },
          { amount: 50, index: 1 },
        ]),
        expect.arrayContaining([{ amount: 100, index: 2 }]),
      ]),
    )
  })

  it("correctly returns empty when no combinations match the payment amount", () => {
    expect(getInvoiceCombinations([30, 40, 50], 100)).toEqual([])
  })

  it("should maintain precision with large numbers", () => {
    const combos = getInvoiceCombinations([99999.95, 0.05, 100000], 100000)
    expect(combos).toEqual(
      expect.arrayContaining([
        expect.arrayContaining([
          { amount: 99999.95, index: 0 },
          { amount: 0.05, index: 1 },
        ]),
        expect.arrayContaining([{ amount: 100000, index: 2 }]),
      ]),
    )
  })

  it("handles cases where only partial matches exist", () => {
    expect(getInvoiceCombinations([50, 60], 120)).toEqual([])
  })

  it("handles zero payment amount", () => {
    expect(getInvoiceCombinations([0, 100, 200], 0)).toEqual([])
  })

  it("handles negative numbers correctly or flags them as invalid", () => {
    // Assuming the function should ignore or treat negative values as invalid inputs
    expect(getInvoiceCombinations([-100, 100], 0)).toEqual([])
  })
})

describe("Test getInvoiceCombinations Logging Behavior", () => {
  let consoleLogSpy: any
  let consoleErrorSpy: any

  beforeEach(() => {
    // Setup spies on console methods before each test
    consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {})
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {})
  })

  afterEach(() => {
    // Restore the original implementations after each test
    consoleLogSpy.mockRestore()
    consoleErrorSpy.mockRestore()
  })

  it("should log an error for invalid payment amounts", () => {
    getInvoiceCombinations([100, 200, 300], -1)
    expect(consoleErrorSpy).toHaveBeenCalledWith("Invalid payment amount...")
  })

  it("should log a single match found correctly", () => {
    getInvoiceCombinations([100, 200, 300], 100)
    expect(consoleLogSpy).toHaveBeenCalledWith("1 match found...\n", expect.any(Array))
  })

  it("should log multiple matches found correctly", () => {
    getInvoiceCombinations([50, 50, 100, 150], 100)
    expect(consoleLogSpy).toHaveBeenCalled()
    expect(consoleLogSpy.mock.calls[0][0]).toMatch(/matches found/)
  })

  it("should log no possible combinations correctly", async () => {
    getInvoiceCombinations([100, 200, 300], 700)
    expect(consoleLogSpy).toHaveBeenCalledWith(
      "There are no possible invoice combinations to match the payment amount...",
    )
  })
})
