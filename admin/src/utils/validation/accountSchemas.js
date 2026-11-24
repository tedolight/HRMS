import { z } from 'zod'
import { text } from './schemaHelpers.js'
import { generalSettingsSchema } from './settingsSchemas.js'

export const accountEmailSchema = text(1, 120, 'Enter an email address of 120 characters or fewer.')
  .pipe(z.email({ error: 'Enter a valid email address.' }))

export const adminProfileSchema = z.object({
  fullName: text(2, 120, 'Enter your full name using 2–120 characters.'),
  contactEmail: accountEmailSchema,
  phoneNumber: generalSettingsSchema.shape.phoneNumber,
})

export const adminAccountSchema = z.object({
  id: text(1, 80, 'Account ID is required.'),
  role: text(1, 80, 'Account role is required.'),
  department: text(0, 120, 'Use a department name of 120 characters or fewer.'),
  profile: adminProfileSchema, loginEmail: accountEmailSchema,
  passwordChangedAt: z.iso.datetime().nullable(),
})

export const adminSessionSchema = z.object({
  account: adminAccountSchema,
  signedInAt: z.iso.datetime(),
})

export const accountSecuritySchema = z.object({
  email: accountEmailSchema,
  currentPassword: z.string().min(1, 'Enter your current password.'),
  newPassword: z.string().max(128, 'Use 128 characters or fewer.')
    .refine(value => !value || value.length >= 12, 'Use at least 12 characters.'),
  confirmPassword: z.string(),
}).superRefine((values, context) => {
  if (values.newPassword !== values.confirmPassword)
    context.addIssue({ code: 'custom', path: ['confirmPassword'], message: 'The new passwords do not match.' })
  if (values.newPassword && values.newPassword === values.currentPassword)
    context.addIssue({ code: 'custom', path: ['newPassword'], message: 'Choose a password different from your current password.' })
})
