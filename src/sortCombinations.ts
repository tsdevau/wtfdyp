/**
 * @license
 * tsdevau <https://tsdev.au/>
 * License: BSD-3-Clause
 * Licence Copywright: This software is licensed under the BSD-3-Clause License. See LICENCE file.
 *
 * Copyright (c) 2020-2024 tpsTech, TPS Contractors Pty Ltd and its affiliates.  All rights reserved.
 */

import type { Combo, WeightedCombo } from "./types"

export function sortCombinations(combos: Combo[][]) {
  let rankedCombos: WeightedCombo[] = []

  combos.forEach((combo) => {
    // Set the gap score for each combo
    // Set the sum of indices for each combo
    const [gapScore, sumIndices] = combo.reduce(
      (a, c, i) => {
        if (i === 0) return [0, c.index]
        return [a[0] + c.index - combo[i - 1].index - 1, a[1] + c.index]
      },
      [0, 0],
    )

    // Set the lowest index for each combo
    const lowestIndex = Math.min(...combo.map((c) => c.index))

    // Push the combo to the rankedCombos array
    rankedCombos.push({
      combo: combo.map((c) => c.amount),
      gapScore,
      sumIndices,
      lowestIndex,
    })
  })

  // Find the lowest indexed invoice across all combos
  const lowestIndex = Math.min(...rankedCombos.map((combo) => combo.lowestIndex))

  if (rankedCombos.length <= 1) {
    return rankedCombos
  }
  // Sort rankedCombos per weighted criteria
  rankedCombos.sort((a, b) => {
    // Primary sort: Prefer lowest gap score
    if (a.gapScore !== b.gapScore) {
      return a.gapScore - b.gapScore
    }

    if (a.lowestIndex === lowestIndex || b.lowestIndex === lowestIndex) {
      // Secondary sort: prefer the inclusion of the overall lowestIndex
      if (a.lowestIndex !== b.lowestIndex) {
        return +(b.lowestIndex === lowestIndex) - +(a.lowestIndex === lowestIndex)
      }
      // Tertiary sort: If both include the lowestIndex Prefer lowest sumIndices
      return a.sumIndices - b.sumIndices
    } else if (a.lowestIndex === b.lowestIndex) {
      // Fallback sort: Neither includes the overall lowestIndex and their lowestIndex values are the same, so prefer and return the lowest sumIndices
      return a.sumIndices - b.sumIndices
    }
    // Catchall sort: Neither includes the overall lowestIndex and their lowestIndex values are different, so prefer and return lowest start index
    return a.lowestIndex - b.lowestIndex
  })
  return rankedCombos
}
