import { z } from 'zod'
import { text } from './schemaHelpers.js'

export const loginSchema = z.object({
  email: text(1, 120, 'Enter a valid email address.').pipe(z.email({ error: 'Enter a valid email address.' })),
  password: z.string({ error: 'Enter your password.' }).min(1, 'Enter your password.'),
})
