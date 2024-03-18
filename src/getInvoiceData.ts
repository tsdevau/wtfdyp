/**
 * @license
 * tsdevau <https://tsdev.au/>
 * License: BSD-3-Clause
 * Licence Copywright: This software is licensed under the BSD-3-Clause License. See LICENCE file.
 *
 * Copyright (c) 2020-2024 tpsTech, TPS Contractors Pty Ltd and its affiliates.  All rights reserved.
 */

import { isValid } from "./lib/helperFunctions"
import type { Invoice } from "./types"

export function getInvoiceData() {
  const invoiceRows = document.querySelectorAll("table.standard tbody tr[id^='row']")

  const invoices: Invoice[] = Array.from(invoiceRows).map((row) => {
    // Extracting the invoice balance owed amount
    const amountField = row.querySelector("td.right.xoAmount")
    if (!amountField) {
      console.error("Invalid invoice amount cell:", amountField)
      throw new Error("Invalid or missing invoice amount field...")
    }
    const amount = !isNaN(
      +(amountField?.textContent?.trim() ?? "").replace("$", "").replace(",", ""),
    )
      ? +(amountField?.textContent?.trim() ?? "").replace("$", "").replace(",", "")
      : 0

    // Extracting the Xero invoice number
    const invRefField = row.querySelector("td.ref")
    if (!invRefField) {
      console.error("Invalid invoice reference cell:", invRefField)
      throw new Error("Invalid or missing invoice or customer reference field...")
    }
    const invRef = invRefField ? invRefField?.textContent?.trim() : ""

    // Extracting the POS reference number (terminalID/sequenceNumber)
    const posRefField = row.querySelector("td.ref + td.ref")
    if (!posRefField) {
      console.error("Invalid POS reference cell:", posRefField)
      throw new Error("Invalid or missing invoice or customer reference field...")
    }
    const posRef = posRefField ? posRefField?.textContent?.trim() : ""

    // Extracting the invoice date
    const dateField = posRefField.nextElementSibling?.nextElementSibling?.nextElementSibling
      ? posRefField.nextElementSibling.nextElementSibling.nextElementSibling
      : null
    if (!dateField) {
      console.error("Invalid invoice date cell:", dateField)
      throw new Error("Invalid or missing invoice date field...")
    }
    const date = dateField ? dateField?.textContent?.trim() : ""

    if (!isValid([amount, invRef, posRef, date])) {
      console.error("Invalid invoice data:", { amount, invRef, posRef, date })
      return { amount, invRef: invRef ?? "", posRef: posRef ?? "", date: date ?? "" }
    }
    console.log("Invoice data:\n", { amount, invRef, posRef, date })
    // isValid function determines validity of the values, but TS can't infer that, so the cast to string is necessary to satisfy the type checker
    return { amount, invRef: invRef as string, posRef: posRef as string, date: date as string }
  })

  return invoices
}
