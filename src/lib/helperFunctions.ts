/**
 * @license
 * tsdevau <https://tsdev.au/>
 * License: BSD-3-Clause
 * Licence Copywright: This software is licensed under the BSD-3-Clause License. See LICENCE file.
 *
 * Copyright (c) 2020-2024 tpsTech, TPS Contractors Pty Ltd and its affiliates.  All rights reserved.
 */

import { IsValidValue } from "../types"
/**
 * Checks if a value is valid.
 * @param value - The value to be checked. It can be a number, string, null, undefined, or an array of these types.
 * @returns A boolean indicating whether the value is valid or not.
 */
export function isValid(value: IsValidValue): boolean
export function isValid(value: IsValidValue[]): boolean
export function isValid(value: IsValidValue | IsValidValue[]): boolean {
  const isValidString = (val: IsValidValue): boolean =>
    typeof val !== "string" ? true : val === "" || !!val

  const isValidNumber = (val: IsValidValue): boolean =>
    typeof val !== "number" ? true : val === 0 || !!val

  const isValidBoolean = (val: IsValidValue): boolean =>
    typeof val !== "boolean" ? true : val || !val

  const notNull = (val: IsValidValue): boolean => val !== null

  const notUndefined = (val: IsValidValue): boolean => val !== undefined

  if (Array.isArray(value)) {
    return value.every((v) => isValid(v))
  }
  return (
    isValidString(value) &&
    isValidNumber(value) &&
    isValidBoolean(value) &&
    notNull(value) &&
    notUndefined(value)
  )
}
