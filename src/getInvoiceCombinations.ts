/**
 * @license
 * tsdevau <https://tsdev.au/>
 * License: BSD-3-Clause
 * Licence Copywright: This software is licensed under the BSD-3-Clause License. See LICENCE file.
 *
 * Copyright (c) 2020-2024 tpsTech, TPS Contractors Pty Ltd and its affiliates.  All rights reserved.
 */

import type { Combo } from "./types"

let validCombos: Combo[][] = []

function getValidCombos(invAmounts: number[], paymentAmount: number) {
  const combos: Combo[] = invAmounts.map((amount, index) => ({ amount, index }))

  function generateCombinations(startIndex: number, CurCombo: Combo[], curTotal: number) {
    if (curTotal > paymentAmount) return
    if (curTotal.toFixed(2) === paymentAmount.toFixed(2)) {
      validCombos.push(CurCombo)
      return
    }

    for (let i = startIndex; i < combos.length; i++) {
      const nextCombo = [...CurCombo, combos[i]]
      const nextTotal = curTotal + combos[i].amount
      generateCombinations(i + 1, nextCombo, nextTotal)
    }
  }

  generateCombinations(0, [], 0)
  return validCombos
}

export function getInvoiceCombinations(invAmounts: number[], paymentAmount: number) {
  validCombos = []
  if (paymentAmount <= 0 || isNaN(paymentAmount)) {
    console.error("Invalid payment amount...")
    return validCombos
  }
  validCombos = getValidCombos(invAmounts, paymentAmount)

  if (validCombos.length > 0) {
    console.log(
      `${validCombos.length} match${validCombos.length === 1 ? "" : "es"} found...\n`,
      validCombos,
    )
  } else {
    console.log("There are no possible invoice combinations to match the payment amount...")
  }
  return validCombos
}
