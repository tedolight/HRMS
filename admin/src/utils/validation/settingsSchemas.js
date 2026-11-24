import { z } from 'zod'
import { text } from './schemaHelpers.js'
import { MAX_COMPANY_LOGO_BYTES, DATE_DISPLAY_FORMATS, TIME_DISPLAY_FORMATS } from '../constants/settingsConstants.js'
import { NOTIFICATION_CATEGORIES } from '../constants/notificationConstants.js'

export const notificationSettingsSchema = z.object({
  enabled: z.boolean({ error: 'Choose whether to show in-app notifications.' }),
  categories: z.object(Object.fromEntries(NOTIFICATION_CATEGORIES.map(item =>
    [item.value, z.boolean({ error: `Choose whether to show ${item.label.toLowerCase()}.` })]))),
})

export function normalizeWebsiteUrl(value) {
  const input = value.trim()
  if (!input || /\s/.test(input)) return ''
  try {
    const url = new URL(/^https?:\/\//i.test(input) ? input : `https://${input}`)
    return ['https:', 'http:'].includes(url.protocol) &&
      !url.username && !url.password && url.hostname.includes('.')
      ? url.href : ''
  } catch {
    return ''
  }
}

export const companyLogoSchema = z.custom(value => value === null ||
  (typeof File !== 'undefined' && value instanceof File), {
  error: 'Choose a PNG or JPG image.',
}).superRefine((file, context) => {
  if (!file) return
  let message = ''
  if (!['image/png', 'image/jpeg'].includes(file.type)) message = 'Choose a PNG or JPG image.'
  else if (!file.size) message = 'This image is empty. Choose another image.'
  else if (file.size > MAX_COMPANY_LOGO_BYTES) message = 'Choose an image no larger than 2 MB.'
  if (message) context.addIssue({ code: 'custom', message })
})

export const generalSettingsSchema = z.object({
  companyName: text(1, 120, 'Enter a company name of 1–120 characters.'),
  workEmail: z.string().trim().max(254, 'Use an email address of 254 characters or fewer.')
    .pipe(z.email({ error: 'Enter a valid work email address.' })),
  phoneNumber: text(0, 40, 'Use a phone number of 40 characters or fewer.')
    .refine(value => !value || (/^\+?[\d\s().-]+$/.test(value) &&
      value.replace(/\D/g, '').length >= 7 && value.replace(/\D/g, '').length <= 15),
    'Enter a phone number with 7–15 digits, using +, spaces, brackets or hyphens if needed.'),
  website: text(0, 2048, 'Use a website address of 2,048 characters or fewer.')
    .refine(value => !value || !!normalizeWebsiteUrl(value), 'Enter a valid website, such as www.example.com.'),
  officeAddress: text(0, 500, 'Use an office address of 500 characters or fewer.'),
  logo: companyLogoSchema,
  dateFormat: z.enum(DATE_DISPLAY_FORMATS.map(item => item.value), { error: 'Choose a date display format.' }),
  timeFormat: z.enum(TIME_DISPLAY_FORMATS.map(item => item.value), { error: 'Choose a time display format.' }),
})
