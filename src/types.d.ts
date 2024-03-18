export interface Invoice {
  date: string
  amount: number
  invRef: string
  posRef: string
}

export interface Combo {
  amount: number
  index: number
}

export interface WeightedCombo {
  combo: number[]
  gapScore: number
  sumIndices: number
  lowestIndex: number
}

export type IsValidValue = number | string | boolean | null | undefined
