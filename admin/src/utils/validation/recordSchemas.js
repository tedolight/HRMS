import { z } from 'zod'
import { isValidDate } from './dates.js'

const id = z.union([z.string().min(1), z.number().int().nonnegative()])
const nonEmpty = z.string().refine(value => value.trim().length > 0, 'Required text is missing.')
const date = z.string().refine(isValidDate, 'Invalid date.')
const optionalText = z.string().optional()

// These schemas check saved records. Form schemas enforce editable-field rules.
// Loose objects preserve audit history and additional fields supplied by the backend.
export const employeeRecordsSchema = z.array(z.looseObject({
  id: nonEmpty, name: nonEmpty, email: nonEmpty, department: nonEmpty,
  grade: nonEmpty, basicSalary: z.number().finite().nonnegative(),
  hiredDate: date, status: nonEmpty,
}))
export const departmentRecordsSchema = z.array(z.looseObject({
  id, name: nonEmpty, code: nonEmpty, status: nonEmpty,
}))
export const gradeRecordsSchema = z.array(z.looseObject({
  id, name: nonEmpty, salary: z.number().finite().positive(),
}))
export const rewardRecordsSchema = z.array(z.looseObject({
  id, employeeId: nonEmpty, title: nonEmpty, category: nonEmpty, awardDate: date,
}))
export const recruitmentRecordsSchema = z.looseObject({
  jobs: z.array(z.looseObject({ id, title: nonEmpty, departmentId: id, deadline: date, status: nonEmpty })),
  applications: z.array(z.looseObject({ id, jobId: id, fullName: nonEmpty, status: nonEmpty })),
})
export const disciplineRecordsSchema = z.looseObject({
  records: z.array(z.looseObject({ id, employeeId: nonEmpty, incidentDate: date, violationType: nonEmpty, penaltyAction: nonEmpty })),
  history: z.array(z.looseObject({ id, action: nonEmpty, at: nonEmpty })),
})
export const careerRecordsSchema = z.array(z.looseObject({
  id, employeeId: nonEmpty, milestoneType: nonEmpty, effectiveDate: date, status: nonEmpty,
}))
export const announcementRecordsSchema = z.array(z.looseObject({
  id, title: nonEmpty, content: nonEmpty, targetAudience: nonEmpty, date,
}))
export const documentRecordsSchema = z.array(z.looseObject({
  id, title: nonEmpty, targetAudience: nonEmpty, source: nonEmpty, date,
}))
export const serviceRecordsSchema = z.array(z.looseObject({
  id, title: nonEmpty, type: nonEmpty, status: nonEmpty,
}))
export const reportRecordsSchema = z.array(z.looseObject({
  id, category: nonEmpty, title: nonEmpty, content: z.string(), date,
  submittedBy: optionalText, submittedRole: optionalText,
}))
export const attendanceRecordsSchema = z.array(z.looseObject({
  employeeId: nonEmpty, date, status: nonEmpty,
}))
export const attendanceHeadsSchema = z.array(z.looseObject({ employeeId: nonEmpty, department: nonEmpty }))
export const departmentChangesSchema = z.array(z.looseObject({
  id, title: nonEmpty, description: z.string(), time: nonEmpty, icon: nonEmpty,
}))
