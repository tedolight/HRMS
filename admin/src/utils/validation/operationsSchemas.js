import { z } from 'zod'
import { MAX_LEAVE_BALANCE } from '../constants/constants.js'
import { isValidDate } from './dates.js'
import { text, wholeNumber } from './schemaHelpers.js'

export const attendanceSettingsSchema = z.object({
  startTime: z.string({ error: 'Enter a valid start time.' }).regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Enter a valid start time.'),
  endTime: z.string({ error: 'Enter a valid end time.' }).regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Enter a valid end time.'),
  gracePeriod: wholeNumber(0, 1439, 'Enter a whole number of minutes from 0 to 1439.'),
  allowedIps: z.string({ error: 'Enter valid IPv4 or IPv6 addresses.' }),
})

export const leaveSettingsSchema = z.object({
  defaultEntitlement: wholeNumber(1, MAX_LEAVE_BALANCE, `Annual entitlement must be a whole number from 1 to ${MAX_LEAVE_BALANCE}.`),
  maxBalance: wholeNumber(1, MAX_LEAVE_BALANCE, `Balance cap must be a whole number from 1 to ${MAX_LEAVE_BALANCE}.`),
  noticeDays: wholeNumber(0, 365, 'Notice period must be a whole number from 0 to 365.'),
  dayCounting: z.enum(['calendar', 'weekdays'], { error: 'Choose calendar days or Monday–Friday.' }),
  requireRejectionReason: z.boolean({ error: 'Choose whether a rejection reason is required.' }),
})

export const leaveRequestSchema = z.object({
  startDate: z.string().refine(isValidDate, 'Choose a valid leave window containing at least one chargeable day.'),
  endDate: z.string().refine(isValidDate, 'Choose a valid leave window containing at least one chargeable day.'),
  reason: text(1, 1000, 'Enter a leave reason of 1–1,000 characters.'),
})

export const leaveRequestFormSchema = leaveRequestSchema.extend({
  employeeId: text(1, 100, 'Choose an employee from the roster.'),
})

export function getLeaveDecisionSchema(required) {
  return z.object({
    note: text(required ? 1 : 0, 1000, required
      ? 'Enter a reason of 1–1,000 characters for this action.'
      : 'Keep the reason to 1,000 characters or fewer.'),
  })
}

export function getLeaveEntitlementSchema(used, maxBalance) {
  return getLeaveDecisionSchema(true).extend({
    accrued: wholeNumber(used, used + Number(maxBalance),
      `Accrued days must leave a remaining balance between 0 and ${maxBalance}. Used leave is ${used} days.`),
  })
}

export const payrollMonthSchema = z.string({ error: 'Choose a valid payroll month.' })
  .regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Choose a valid payroll month.')
  .refine(value => isValidDate(`${value}-01`), 'Choose a valid payroll month.')

export const deductionSchema = z.object({
  name: text(1, 80, 'Enter a deduction name of 1–80 characters.'),
  description: text(1, 300, 'Enter a description of 1–300 characters.'),
  appliesTo: z.enum(['all', 'selected'], { error: 'Choose which employees this deduction applies to.' }),
  employeeIds: z.array(z.string(), { error: 'Select valid employees for this deduction.' }),
  active: z.boolean({ error: 'Choose whether to apply this deduction.' }),
})

export function getDeductionFormSchema(allowAutomatic = false) {
  return deductionSchema.extend({
    kind: z.enum(allowAutomatic ? ['fixed', 'percent', 'automatic'] : ['fixed', 'percent'],
      { error: 'Choose an amount or percentage.' }),
    value: z.union([z.string(), z.number(), z.null()]),
  }).superRefine((values, context) => {
    if (values.kind !== 'automatic') {
      if (!/^\d+(\.\d{1,2})?$/.test(String(values.value)))
        context.addIssue({ code: 'custom', path: ['value'], message: 'Enter a positive amount or percentage with up to two decimal places.' })
      else if (!Number(values.value) || (values.kind === 'percent' && Number(values.value) > 100))
        context.addIssue({ code: 'custom', path: ['value'], message: 'The deduction must be positive; percentages cannot exceed 100%.' })
    }
    if (values.appliesTo === 'selected' && !values.employeeIds.length)
      context.addIssue({ code: 'custom', path: ['employeeIds'], message: 'Select at least one available employee.' })
  })
}

// Financial reconciliation and leave-year checks stay in their domain services.
export const leaveResponseSchema = z.looseObject({
  requests: z.array(z.looseObject({ id: z.string(), employeeId: z.string() })),
  balances: z.array(z.looseObject({ employeeId: z.string(), accrued: z.number(), used: z.number() })),
  settings: leaveSettingsSchema,
})

export const payrollResponseSchema = z.looseObject({
  runs: z.array(z.looseObject({ id: z.string(), month: payrollMonthSchema, rows: z.array(z.looseObject({ employeeId: z.string() })) })),
  deductions: z.array(z.looseObject({ id: z.string(), month: payrollMonthSchema })),
  monthlyPolicies: z.array(z.looseObject({ month: payrollMonthSchema, policy: z.object({}).passthrough() })),
  policy: z.object({}).passthrough(),
})
