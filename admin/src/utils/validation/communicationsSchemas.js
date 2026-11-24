import { z } from 'zod'
import { COMMUNICATION_AUDIENCES } from '../../services/communications/audiences.js'
import { text } from './schemaHelpers.js'

export const SERVICE_TYPES = [
  { value: "SERVICE", label: "Public service" },
  { value: "TRAINING", label: "Training program" },
];

const audiences = COMMUNICATION_AUDIENCES.map(item => item.value)
export const announcementSchema = z.object({
  title: text(1, 150, 'Enter an announcement title of 1–150 characters.'),
  targetAudience: z.enum(audiences, { error: 'Select a target audience.' }),
  content: text(1, 5000, 'Enter an announcement body of 1–5,000 characters.'),
})

export const documentSchema = z.object({
  title: text(1, 150, 'Enter a document title of 1–150 characters.'),
  targetAudience: z.enum(audiences, { error: 'Select Public, Employees, or Both.' }),
  source: z.enum(['FILE', 'URL'], { error: 'Choose an upload or a URL.' }),
})

export const serviceSchema = z.object({
  title: text(1, 150, 'Enter a service name of 1–150 characters.'),
  type: z.enum(SERVICE_TYPES.map(item => item.value), { error: 'Choose a service type.' }),
  status: z.enum(['DRAFT', 'PUBLISHED'], { error: 'Choose Draft or Published.' }),
  description: text(0, 2000, 'Use 2,000 characters or fewer.').optional(),
  requirements: text(0, 1000, 'Use 1,000 characters or fewer.').optional(),
  howToAccess: text(0, 1000, 'Use 1,000 characters or fewer.').optional(),
  location: text(0, 200, 'Use 200 characters or fewer.').optional(),
  fees: text(0, 200, 'Use 200 characters or fewer.').optional(),
})

export function getServiceSchema(type) {
  return type === 'TRAINING'
    ? serviceSchema.extend({ schedule: text(0, 200, 'Use 200 characters or fewer.').optional() })
    : serviceSchema
}
