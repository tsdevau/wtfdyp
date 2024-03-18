import { describe, expect, it } from "vitest"
import { sortCombinations } from "../src/sortCombinations"
import type { Combo, WeightedCombo } from "../src/types"

describe("Test sortCombinations Function", () => {
  it("should handle empty input gracefully", () => {
    const combos: Combo[][] = []
    const result = sortCombinations(combos)
    expect(result).toEqual([])
  })

  it("should return a single combination unchanged", () => {
    const combos: Combo[][] = [
      [
        { index: 1, amount: 10 },
        { index: 2, amount: 20 },
      ],
    ]
    const result = sortCombinations(combos)
    expect(result).toEqual([{ combo: [10, 20], gapScore: 0, sumIndices: 3, lowestIndex: 1 }])
  })

  it("should sort combinations by gap score, lowest first", () => {
    const combos: Combo[][] = [
      [
        { index: 1, amount: 10 },
        { index: 2, amount: 20 },
      ],
      [
        { index: 1, amount: 30 },
        { index: 2, amount: 40 },
      ],
      [
        { index: 1, amount: 50 },
        { index: 2, amount: 60 },
      ],
    ]
    const result = sortCombinations(combos)
    expect(result).toEqual([
      { combo: [10, 20], gapScore: 0, sumIndices: 3, lowestIndex: 1 },
      { combo: [30, 40], gapScore: 0, sumIndices: 3, lowestIndex: 1 },
      { combo: [50, 60], gapScore: 0, sumIndices: 3, lowestIndex: 1 },
    ])
  })

  it("verifies gapScore calculation with combos starting at higher indices", () => {
    const combos: Combo[][] = [
      [
        { index: 2, amount: 20 }, // No preceding gap adjustment, simplified calculation
        { index: 4, amount: 40 },
      ],
    ]
    const result = sortCombinations(combos)
    expect(result).toEqual([
      { combo: [20, 40], gapScore: 1, sumIndices: 6, lowestIndex: 2 }, // Simplified: Only internal gaps count
    ])
  })

  it("should accurately sort combinations by diverse gap scores, lowest first", () => {
    const combos: Combo[][] = [
      [
        { index: 1, amount: 10 }, // gapScore: 0 (since only one element, no gaps)
        { index: 2, amount: 20 },
      ],
      [
        { index: 1, amount: 30 }, // gapScore: 1 (3 - 1 - 1 = 1)
        { index: 3, amount: 40 },
      ],
      [
        { index: 2, amount: 50 }, // gapScore: 2 (5 - 2 - 1 = 2)
        { index: 5, amount: 60 },
      ],
    ]
    const result = sortCombinations(combos)
    expect(result).toEqual([
      { combo: [10, 20], gapScore: 0, sumIndices: 3, lowestIndex: 1 },
      { combo: [30, 40], gapScore: 1, sumIndices: 4, lowestIndex: 1 },
      { combo: [50, 60], gapScore: 2, sumIndices: 7, lowestIndex: 2 },
    ])
  })

  it("should prefer combos including the overall lowest index when gap scores are equal", () => {
    const combos: Combo[][] = [
      [
        { index: 1, amount: 10 },
        { index: 2, amount: 20 },
        { index: 3, amount: 30 },
      ],
      [
        { index: 2, amount: 30 },
        { index: 3, amount: 40 },
      ],
      [
        { index: 3, amount: 50 },
        { index: 4, amount: 60 },
      ],
    ]
    const result = sortCombinations(combos)
    expect(result).toEqual([
      { combo: [10, 20, 30], gapScore: 0, sumIndices: 6, lowestIndex: 1 },
      { combo: [30, 40], gapScore: 0, sumIndices: 5, lowestIndex: 2 },
      { combo: [50, 60], gapScore: 0, sumIndices: 7, lowestIndex: 3 },
    ])
  })

  it("should prioritize combinations including the overall lowest index when gap scores are equal", () => {
    const combos: Combo[][] = [
      [
        // Combo 1
        { index: 2, amount: 20 },
        { index: 3, amount: 30 },
      ],
      [
        // Combo 2 - Includes the overall lowest index
        { index: 1, amount: 10 },
        { index: 4, amount: 40 },
      ],
      [
        // Combo 3
        { index: 5, amount: 50 },
        { index: 6, amount: 60 },
      ],
    ]
    const result = sortCombinations(combos)
    expect(result).toEqual([
      { combo: [20, 30], gapScore: 0, sumIndices: 5, lowestIndex: 2 },
      { combo: [50, 60], gapScore: 0, sumIndices: 11, lowestIndex: 5 },
      { combo: [10, 40], gapScore: 2, sumIndices: 5, lowestIndex: 1 },
    ])
  })

  it("should sort combinations by sum indices when gap scores are equal and either both include the lowest index or neither does", () => {
    const combos: Combo[][] = [
      [
        { index: 1, amount: 10 },
        { index: 2, amount: 20 },
      ],
      [
        { index: 1, amount: 30 },
        { index: 2, amount: 40 },
      ],
      [
        { index: 3, amount: 50 },
        { index: 4, amount: 60 },
      ],
      [
        { index: 3, amount: 70 },
        { index: 4, amount: 80 },
      ],
    ]
    const result = sortCombinations(combos)
    expect(result).toEqual([
      { combo: [10, 20], gapScore: 0, sumIndices: 3, lowestIndex: 1 },
      { combo: [30, 40], gapScore: 0, sumIndices: 3, lowestIndex: 1 },
      { combo: [50, 60], gapScore: 0, sumIndices: 7, lowestIndex: 3 },
      { combo: [70, 80], gapScore: 0, sumIndices: 7, lowestIndex: 3 },
    ])
  })

  it("should sort combinations by their own lowest index when gap scores are equal and neither includes the overall lowest index", () => {
    const combos: Combo[][] = [
      [
        { index: 1, amount: 10 },
        { index: 2, amount: 20 },
      ],
      [
        { index: 1, amount: 30 },
        { index: 2, amount: 40 },
      ],
      [
        { index: 3, amount: 50 },
        { index: 4, amount: 60 },
      ],
      [
        { index: 3, amount: 70 },
        { index: 4, amount: 80 },
      ],
      [
        { index: 5, amount: 90 },
        { index: 6, amount: 100 },
      ],
    ]
    const result = sortCombinations(combos)
    expect(result).toEqual([
      { combo: [10, 20], gapScore: 0, sumIndices: 3, lowestIndex: 1 },
      { combo: [30, 40], gapScore: 0, sumIndices: 3, lowestIndex: 1 },
      { combo: [50, 60], gapScore: 0, sumIndices: 7, lowestIndex: 3 },
      { combo: [70, 80], gapScore: 0, sumIndices: 7, lowestIndex: 3 },
      { combo: [90, 100], gapScore: 0, sumIndices: 11, lowestIndex: 5 },
    ])
  })

  it("should handle a complex scenario with a mix of conditions", () => {
    const combos: Combo[][] = [
      [
        { index: 1, amount: 10 },
        { index: 2, amount: 20 },
      ],
      [
        { index: 1, amount: 30 },
        { index: 2, amount: 40 },
      ],
      [
        { index: 3, amount: 50 },
        { index: 4, amount: 60 },
      ],
      [
        { index: 3, amount: 70 },
        { index: 4, amount: 80 },
      ],
      [
        { index: 5, amount: 90 },
        { index: 6, amount: 100 },
      ],
      [
        { index: 5, amount: 110 },
        { index: 6, amount: 120 },
      ],
      [
        { index: 7, amount: 130 },
        { index: 8, amount: 140 },
      ],
    ]
    const result = sortCombinations(combos)
    expect(result).toEqual([
      { combo: [10, 20], gapScore: 0, sumIndices: 3, lowestIndex: 1 },
      { combo: [30, 40], gapScore: 0, sumIndices: 3, lowestIndex: 1 },
      { combo: [50, 60], gapScore: 0, sumIndices: 7, lowestIndex: 3 },
      { combo: [70, 80], gapScore: 0, sumIndices: 7, lowestIndex: 3 },
      { combo: [90, 100], gapScore: 0, sumIndices: 11, lowestIndex: 5 },
      { combo: [110, 120], gapScore: 0, sumIndices: 11, lowestIndex: 5 },
      { combo: [130, 140], gapScore: 0, sumIndices: 15, lowestIndex: 7 },
    ])
  })

  it("should strictly adhere to the Combo and WeightedCombo types", () => {
    const combos: Combo[][] = [
      [
        { index: 1, amount: 10 },
        { index: 2, amount: 20 },
      ],
      [
        { index: 1, amount: 30 },
        { index: 2, amount: 40 },
      ],
    ]
    const result: WeightedCombo[] = sortCombinations(combos)
    expect(result).toEqual([
      { combo: [10, 20], gapScore: 0, sumIndices: 3, lowestIndex: 1 },
      { combo: [30, 40], gapScore: 0, sumIndices: 3, lowestIndex: 1 },
    ])
  })

  it("should accurately sort with different gap scores but same lowestIndex", () => {
    const combos: Combo[][] = [
      [
        { index: 1, amount: 100 },
        { index: 3, amount: 200 }, // gapScore: 1, sumIndices: 4, lowestIndex: 1
      ],
      [
        { index: 1, amount: 10 },
        { index: 2, amount: 20 }, // gapScore: 0, sumIndices: 3, lowestIndex: 1
      ],
    ]
    const result = sortCombinations(combos)
    expect(result).toEqual([
      { combo: [10, 20], gapScore: 0, sumIndices: 3, lowestIndex: 1 },
      { combo: [100, 200], gapScore: 1, sumIndices: 4, lowestIndex: 1 },
    ])
  })

  it("should sort by lowestIndex when gap scores and sumIndices are equal", () => {
    const combos: Combo[][] = [
      [
        { index: 2, amount: 50 },
        { index: 4, amount: 150 }, // gapScore: 1, sumIndices: 6, lowestIndex: 2
      ],
      [
        { index: 3, amount: 60 },
        { index: 5, amount: 160 }, // gapScore: 1, sumIndices: 8, lowestIndex: 3
      ],
    ]
    const result = sortCombinations(combos)
    expect(result).toEqual([
      { combo: [50, 150], gapScore: 1, sumIndices: 6, lowestIndex: 2 },
      { combo: [60, 160], gapScore: 1, sumIndices: 8, lowestIndex: 3 },
    ])
  })

  it("should handle a large number of combinations efficiently", () => {
    // Generate a large dataset
    const combos: Combo[][] = new Array(100).fill(0).map((_, i) => [
      { index: i + 1, amount: (i + 1) * 10 },
      { index: i + 2, amount: (i + 2) * 20 },
    ])
    const result = sortCombinations(combos)
    // Verify some key properties rather than the entire output for brevity
    expect(result.length).toEqual(100)
    expect(result[0].combo).toEqual([10, 40])
    expect(result[99].combo).toEqual([1000, 2020])
  })

  it("should accurately calculate gapScore with non-sequential indices", () => {
    const combos: Combo[][] = [
      [
        { index: 1, amount: 100 },
        { index: 10, amount: 200 }, // Significant gap
      ],
    ]
    const result = sortCombinations(combos)
    expect(result).toEqual([
      { combo: [100, 200], gapScore: 8, sumIndices: 11, lowestIndex: 1 }, // 10 - 1 - 1 = 8
    ])
  })
})

describe("Extended Tests sortCombinations Function: For potential future modifications - The current input could not generate these conditions.", () => {
  it("should handle negative indices and amounts gracefully", () => {
    const combos: Combo[][] = [
      [
        { index: -2, amount: -20 },
        { index: -1, amount: -10 },
      ],
    ]
    const result = sortCombinations(combos)
    expect(result).toEqual([{ combo: [-20, -10], gapScore: 0, sumIndices: -3, lowestIndex: -2 }])
  })

  it("should treat identical combinations with varying order consistently", () => {
    const combos: Combo[][] = [
      [
        { index: 1, amount: 100 },
        { index: 3, amount: 300 },
      ],
      [
        { index: 3, amount: 300 },
        { index: 1, amount: 100 },
      ],
    ]
    const result = sortCombinations(combos)
    // Expect the sort to be stable and treat identical combos consistently, regardless of order
    expect(result[0].combo).toEqual([300, 100]) // Preserves order of first input
    expect(result[1].combo).toEqual([100, 300]) // Preserves order of second input
  })
})
