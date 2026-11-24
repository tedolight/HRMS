import { z } from 'zod'
import { dateField, text } from './schemaHelpers.js'

export const JOB_STATUSES = ["OPEN", "CLOSED"];

export const jobSchema = z.object({
  title: text(1, 100, 'Enter a job title of 1–100 characters.'),
  deadline: dateField('Enter a valid application deadline.'),
  status: z.enum(JOB_STATUSES, { error: 'Select Open or Closed.' }),
  description: text(1, 5000, 'Enter a job description of 1–5,000 characters.'),
})

export const jobFormSchema = jobSchema.extend({
  departmentId: text(1, 100, 'Select an active department.'),
})
