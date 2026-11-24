import { z } from 'zod'
import { isValidDate } from './dates.js'

export function text(min, max, message) {
  return z.string({ error: message }).trim().min(min, message).max(max, message)
}

export function dateField(message) {
  return z.string({ error: message }).refine(value =>
    isValidDate(value) && value >= '1900-01-01' && value <= '2100-12-31', message)
}

// Accept numeric form inputs and numeric API values without silently coercing them.
export function wholeNumber(min, max, message) {
  return z.union([z.string(), z.number()], { error: message }).refine(value =>
    /^\d+$/.test(String(value)) && Number.isSafeInteger(Number(value)) &&
    Number(value) >= min && Number(value) <= max, message)
}

export function fieldErrors(schema, values) {
  const result = schema.safeParse(values)
  const errors = {}
  if (!result.success) {
    for (const issue of result.error.issues) {
      const field = issue.path[0] || 'form'
      if (!errors[field]) errors[field] = issue.message
    }
  }
  return errors
}

export function validateInput(schema, values) {
  const result = schema.safeParse(values)
  if (!result.success) {
    throw new Error(result.error.issues[0].message, { cause: result.error })
  }
}

// Validate without replacing records or dropping optional fields and File objects.
export function validateData(schema, value, label) {
  const result = schema.safeParse(value)
  if (!result.success) {
    const issue = result.error.issues[0]
    throw new Error(`${label}: ${issue.path.join('.') || 'data'} — ${issue.message}`, {
      cause: result.error,
    })
  }
  return value
}
