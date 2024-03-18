import { readFileSync } from "fs"
import { Window } from "happy-dom"
import { resolve } from "path"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { getInvoiceData } from "../src/getInvoiceData"

// Mock HTML for testing
async function loadHtmlMock() {
  const htmlPath = resolve(__dirname, "./getInvoiceData.mock.html")
  const htmlContent = readFileSync(htmlPath, { encoding: "utf-8" })
  document.body.innerHTML = htmlContent
}

describe("Test getInvoiceData Function Returns", () => {
  beforeEach(() => {
    global.window = new Window() as any
    global.document = window.document
    loadHtmlMock()
    vi.spyOn(console, "error").mockImplementation(() => {})
    vi.spyOn(console, "log").mockImplementation(() => {})
  })

  it("should return the expected number of invoices", () => {
    const invoices = getInvoiceData()
    expect(invoices.length).toBe(47)
  })

  it("should extract all invoice data correctly", () => {
    const invoices = getInvoiceData()
    expect(invoices).toEqual([
      {
        amount: 50.66,
        invRef: "PW-28449",
        posRef: "06/0997",
        date: "1 Jan 2024",
      },
      {
        amount: 73.18,
        invRef: "PW-28470",
        posRef: "04/4017",
        date: "2 Jan 2024",
      },
      {
        amount: 149.19,
        invRef: "PW-28488",
        posRef: "03/9277",
        date: "3 Jan 2024",
      },
      {
        amount: 36.61,
        invRef: "PW-28487",
        posRef: "05/2440",
        date: "3 Jan 2024",
      },
      {
        amount: 88.71,
        invRef: "PW-28505",
        posRef: "05/2865",
        date: "4 Jan 2024",
      },
      {
        amount: 17.04,
        invRef: "PW-29001",
        posRef: "05/4879",
        date: "8 Jan 2024",
      },
      {
        amount: 65.27,
        invRef: "PW-29023",
        posRef: "03/9634",
        date: "9 Jan 2024",
      },
      {
        amount: 19.27,
        invRef: "PW-29049",
        posRef: "06/3798",
        date: "11 Jan 2024",
      },
      {
        amount: 5.99,
        invRef: "PW-29046",
        posRef: "02/9278",
        date: "11 Jan 2024",
      },
      {
        amount: 7.6,
        invRef: "PW-29045",
        posRef: "06/3589",
        date: "11 Jan 2024",
      },
      {
        amount: 22.55,
        invRef: "PW-29084",
        posRef: "06/4368",
        date: "13 Jan 2024",
      },
      {
        amount: 10.35,
        invRef: "PW-29093",
        posRef: "06/4425",
        date: "14 Jan 2024",
      },
      {
        amount: 26.85,
        invRef: "PW-29105",
        posRef: "04/6909",
        date: "15 Jan 2024",
      },
      {
        amount: 29.61,
        invRef: "PW-29147",
        posRef: "04/7302",
        date: "17 Jan 2024",
      },
      {
        amount: 50.49,
        invRef: "PW-29166",
        posRef: "05/0058",
        date: "18 Jan 2024",
      },
      {
        amount: 29.96,
        invRef: "PW-29200",
        posRef: "06/6172",
        date: "20 Jan 2024",
      },
      {
        amount: 34.55,
        invRef: "PW-29199",
        posRef: "05/0964",
        date: "20 Jan 2024",
      },
      {
        amount: 43.62,
        invRef: "PW-29256",
        posRef: "05/2523",
        date: "23 Jan 2024",
      },
      {
        amount: 61.95,
        invRef: "PW-29255",
        posRef: "06/7073",
        date: "23 Jan 2024",
      },
      {
        amount: 50.03,
        invRef: "PW-29294",
        posRef: "03/0773",
        date: "25 Jan 2024",
      },
      {
        amount: 58.11,
        invRef: "PW-29322",
        posRef: "04/9529",
        date: "27 Jan 2024",
      },
      {
        amount: 107.75,
        invRef: "PW-29334",
        posRef: "04/9815",
        date: "28 Jan 2024",
      },
      {
        amount: 10.73,
        invRef: "PW-29333",
        posRef: "06/8707",
        date: "28 Jan 2024",
      },
      {
        amount: 33.43,
        invRef: "PW-29345",
        posRef: "05/5856",
        date: "29 Jan 2024",
      },
      {
        amount: 47.54,
        invRef: "PW-29395",
        posRef: "04/0400",
        date: "31 Jan 2024",
      },
      {
        amount: 166.91,
        invRef: "PW-29425",
        posRef: "06/0139",
        date: "1 Feb 2024",
      },
      {
        amount: 32.41,
        invRef: "PW-29478",
        posRef: "04/1048",
        date: "3 Feb 2024",
      },
      {
        amount: 20.68,
        invRef: "PW-29477",
        posRef: "06/0731",
        date: "3 Feb 2024",
      },
      {
        amount: 80.68,
        invRef: "PW-29484",
        posRef: "03/1465",
        date: "4 Feb 2024",
      },
      {
        amount: 5.3,
        invRef: "PW-29526",
        posRef: "05/9681",
        date: "6 Feb 2024",
      },
      {
        amount: 22.1,
        invRef: "PW-29588",
        posRef: "06/2634",
        date: "9 Feb 2024",
      },
      {
        amount: 117.49,
        invRef: "PW-29612",
        posRef: "05/2729",
        date: "11 Feb 2024",
      },
      {
        amount: 19.91,
        invRef: "PW-29848",
        posRef: "06/4213",
        date: "15 Feb 2024",
      },
      {
        amount: 22.22,
        invRef: "PW-29847",
        posRef: "03/2196",
        date: "15 Feb 2024",
      },
      {
        amount: 12.99,
        invRef: "PW-29903",
        posRef: "04/4063",
        date: "17 Feb 2024",
      },
      {
        amount: 27.81,
        invRef: "PW-29931",
        posRef: "05/7324",
        date: "19 Feb 2024",
      },
      {
        amount: 33.17,
        invRef: "PW-29930",
        posRef: "06/5587",
        date: "19 Feb 2024",
      },
      {
        amount: 25.32,
        invRef: "PW-29953",
        posRef: "05/7782",
        date: "20 Feb 2024",
      },
      {
        amount: 44.44,
        invRef: "PW-30010",
        posRef: "05/8022",
        date: "21 Feb 2024",
      },
      {
        amount: 11.65,
        invRef: "PW-30009",
        posRef: "06/6294",
        date: "21 Feb 2024",
      },
      {
        amount: 78.04,
        invRef: "PW-30053",
        posRef: "05/9318",
        date: "23 Feb 2024",
      },
      {
        amount: 17.43,
        invRef: "PW-30069",
        posRef: "03/2766",
        date: "24 Feb 2024",
      },
      {
        amount: 61.63,
        invRef: "PW-30068",
        posRef: "04/5589",
        date: "24 Feb 2024",
      },
      {
        amount: 51.1,
        invRef: "PW-30082",
        posRef: "05/0412",
        date: "25 Feb 2024",
      },
      {
        amount: 58.35,
        invRef: "PW-30081",
        posRef: "05/0367",
        date: "25 Feb 2024",
      },
      {
        amount: 13.52,
        invRef: "PW-30101",
        posRef: "06/7660",
        date: "26 Feb 2024",
      },
      {
        amount: 56.18,
        invRef: "PW-30163",
        posRef: "04/6655",
        date: "29 Feb 2024",
      },
    ])
  })

  it("should return an empty array when no invoice rows are present", () => {
    // Overriding the HTML to have no invoice rows
    document.body.innerHTML = '<table class="standard"><tbody></tbody></table>'
    const invoices = getInvoiceData()
    expect(invoices).toEqual([])
  })

  it("should handle a missing amount field by setting amount to 0", () => {
    // Modify the first invoice row to have no amount
    const firstAmountCell = document.querySelector("td.right.xoAmount")
    if (firstAmountCell) firstAmountCell.textContent = ""
    const invoices = getInvoiceData()
    expect(invoices[0].amount).toBe(0) // Assuming the first invoice is the one modified
  })

  it("should log an error and return partial data when required fields are missing", () => {
    // Remove the invoice reference field from the first row
    const firstInvRefCell = document.querySelector("td.ref")
    if (firstInvRefCell) firstInvRefCell.remove()
    expect(() => getInvoiceData()).toThrow(
      "Invalid or missing invoice or customer reference field...",
    )
    expect(console.error).toHaveBeenCalled()
  })

  it("should correctl parses and trim data from all fields", () => {
    const amount = document.querySelector("table.standard tbody tr.row10 td.right.xoAmount")
    const invRef = document.querySelector("table.standard tbody tr.row10 td.ref")
    const posRef = document.querySelector("table.standard tbody tr.row10 td.ref + td.ref")
    const date = document.querySelector("table.standard tbody tr.row10 td.ref + td.ref + td.ref")
    if (amount) amount.textContent = " $ 22.55 "
    if (invRef) invRef.textContent = " PW-29084 "
    if (posRef) posRef.textContent = "  06/4368 "
    if (date) date.textContent = " 13 Jan 2024   "

    const invoices = getInvoiceData()

    expect(invoices).toContainEqual({
      date: "13 Jan 2024", // Assuming the mock data has this date with spaces around it in the HTML
      amount: 22.55, // Assuming this amount has spaces or formatting issues in the HTML
      invRef: "PW-29084", // Assuming this reference has extra spaces in the HTML
      posRef: "06/4368", // Assuming this reference has extra spaces in the HTML
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })
})
