import { z } from 'zod'
import { EMPLOYEE_STATUSES, EMPLOYMENT_TYPES, PORTAL_ROLES } from '../constants/constants.js'
import { dateField, text } from './schemaHelpers.js'

export const employeeSchema = z.object({
  id: z.string({ error: 'Use 1–30 letters, numbers, hyphens, or underscores.' }).trim()
    .regex(/^[a-zA-Z0-9_-]{1,30}$/, 'Use 1–30 letters, numbers, hyphens, or underscores.'),
  name: text(2, 100, 'Enter a full name of 2–100 characters.'),
  email: text(1, 120, 'Enter an email address or a login ID without spaces.')
    .refine(value => !/\s/.test(value) && (!value.includes('@') || /^[^@]+@[^@]+\.[^@]+$/.test(value)),
      'Enter an email address or a login ID without spaces.'),
  department: text(1, 200, 'Select a department.'),
  grade: text(1, 80, 'Select a civil job grade.'),
  hiredDate: dateField('Enter a valid hired date.'),
  status: z.enum([...EMPLOYEE_STATUSES, ''], { error: 'Select a supported employment status.' }).optional(),
})

export const employeeFormSchema = employeeSchema.extend({
  gender: z.enum(['Male', 'Female', 'Other'], { error: 'Select a gender.' }),
  birthDate: dateField('Enter a valid birth date that is not in the future.'),
  employmentType: z.enum(EMPLOYMENT_TYPES, { error: 'Select an employment type.' }),
  portalRole: z.enum(PORTAL_ROLES, { error: 'Select a portal role.' }),
})

// CSV imports and employee edits do not require an initial password.
export function getEmployeeSchema({ importMode = false, originalId = null } = {}) {
  if (importMode) return employeeSchema
  if (originalId) return employeeFormSchema
  return employeeFormSchema.extend({
    temporaryPassword: z.string({ error: 'Use at least 8 characters.' })
      .min(8, 'Use at least 8 characters.'),
  })
}

export const departmentSchema = z.object({
  name: text(2, 120, 'Enter a department name of 2–120 characters.'),
  code: z.string({ error: 'Use 2–12 letters, numbers, or hyphens.' }).trim()
    .regex(/^[a-zA-Z0-9-]{2,12}$/, 'Use 2–12 letters, numbers, or hyphens.'),
  description: text(0, 300, 'Keep the description within 300 characters.').optional(),
  status: z.enum(['Active', 'Inactive'], { error: 'Select Active or Inactive.' }),
})

const salaryMessage = 'Enter a salary from ETB 0.01 to 999,999,999.99, with no more than two decimal places.'
export const jobGradeSchema = z.object({
  name: z.preprocess(value => typeof value === 'string' ? value.trim().replace(/\s+/g, ' ') : value,
    text(2, 80, 'Enter a grade title of 2–80 characters.')),
  salary: z.union([z.string(), z.number()], { error: salaryMessage }).refine(value => {
    const input = String(value).trim()
    return /^\d+(\.\d{1,2})?$/.test(input) && Number.isFinite(Number(input)) &&
      Number(input) > 0 && Number(input) <= 999999999.99
  }, salaryMessage),
})
