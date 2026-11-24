import { z } from 'zod'
import { dateField, text } from './schemaHelpers.js'

export const MILESTONE_TYPES = [
  { value: "PROMOTION", label: "Promotion" },
  { value: "STEP_INCREMENT", label: "Step Increment" },
  { value: "GRADE_CHANGE", label: "Grade Change" },
  { value: "AWARD_MILESTONE", label: "Award Milestone" },
];

export const SANCTIONS = [
  { value: "WARNING", label: "Warning" },
  { value: "FINE", label: "Fine" },
  { value: "SUSPENSION", label: "Suspension" },
  { value: "TERMINATION", label: "Termination" },
];

export const AWARD_CATEGORIES = [
  { value: "EXCELLENCE", label: "Excellence" },
  { value: "INNOVATION", label: "Innovation" },
  { value: "LONG_SERVICE", label: "Long Service" },
  { value: "PUNCTUALITY", label: "Punctuality" },
];

export const rewardSchema = z.object({
  title: text(1, 150, 'Enter an award title of 1–150 characters.'),
  category: z.enum(AWARD_CATEGORIES.map(item => item.value), { error: 'Select an award category.' }),
  awardDate: dateField('Enter a valid award date between 1900 and 2100.'),
  description: z.string({ error: 'Keep the description within 5,000 characters.' })
    .max(5000, 'Keep the description within 5,000 characters.').optional(),
})

export const disciplinaryActionSchema = z.object({
  incidentDate: dateField('Enter a valid incident date on or before today.'),
  violationType: text(1, 100, 'Enter a violation type of 1–100 characters.'),
  penaltyAction: z.enum(SANCTIONS.map(item => item.value), { error: 'Select a sanction or penalty action.' }),
  description: z.string({ error: 'Keep the explanation within 5,000 characters.' })
    .max(5000, 'Keep the explanation within 5,000 characters.').optional(),
})

export const careerMilestoneSchema = z.object({
  milestoneType: z.enum(MILESTONE_TYPES.map(item => item.value), { error: 'Select a milestone type.' }),
  effectiveDate: dateField('Enter a valid effective date between 1900 and 2100.'),
  description: text(1, 5000, 'Enter a justification of 1–5,000 characters.'),
})

const employeeId = text(1, 100, 'Select an employee from the current staff list.')
export const rewardFormSchema = rewardSchema.extend({ employeeId })
export const disciplinaryActionFormSchema = disciplinaryActionSchema.extend({ employeeId })
export const careerMilestoneFormSchema = careerMilestoneSchema.extend({ employeeId })
