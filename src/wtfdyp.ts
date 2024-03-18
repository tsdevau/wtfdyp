/**
 * @license
 * tsdevau <https://tsdev.au/>
 * License: BSD-3-Clause
 * Licence Copywright: This software is licensed under the BSD-3-Clause License. See LICENCE file.
 *
 * Copyright (c) 2020-2024 tpsTech, TPS Contractors Pty Ltd and its affiliates.  All rights reserved.
 */

import { getInvoiceCombinations } from "./getInvoiceCombinations"
import { sortCombinations } from "./sortCombinations"
import type { Combo, WeightedCombo } from "./types"

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
// const paymentAmount = request.paymentAmount
// Logic to read the table and extract invoice amounts
// Your algorithm to find the best combination
// Update the page DOM to check off the selected invoices
// })

// Test output of sorting algorithm
const invAmounts: number[] = [
  20.99, 80.1, 11.55, 57.6, 31.85, 278.5, 59.3, 14.8, 25, 112.16, 23, 58.4, 35, 246.32, 21.8, 56.63,
  25.8,
]
const paymentAmount: number = 379.39

// Get the valid combinations
const validCombos: Combo[][] = getInvoiceCombinations(invAmounts, paymentAmount)

// Sort the valid combinations
const rankedCombos: WeightedCombo[] = sortCombinations(validCombos)

// Log the sorted combinations
console.log(rankedCombos)
