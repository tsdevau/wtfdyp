/**
 * @license
 * tsdevau <https://tsdev.au/>
 * License: BSD-3-Clause
 * Licence Copywright: This software is licensed under the BSD-3-Clause License. See LICENCE file.
 *
 * Copyright (c) 2020-2024 tpsTech, TPS Contractors Pty Ltd and its affiliates.  All rights reserved.
 */

const submitButton = document.getElementById("submit") as HTMLButtonElement
const paymentAmountInput = document.getElementById("paymentAmount") as HTMLInputElement
if (!submitButton || !paymentAmountInput === null) {
  throw new Error("Element not found")
}
submitButton.addEventListener("click", () => {
  const paymentAmount = paymentAmountInput?.value
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs[0]?.id) {
      throw new Error("Tab not found")
    }
    chrome.tabs.sendMessage(tabs[0].id, { paymentAmount: paymentAmount })
  })
})
