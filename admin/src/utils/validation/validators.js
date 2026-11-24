import { todayInNairobi } from './dates.js';
export { todayInNairobi, isValidDate } from './dates.js';
import { fieldErrors } from './schemaHelpers.js';
import { getEmployeeSchema, departmentSchema, jobGradeSchema } from './workforceSchemas.js';
import {
  DEPARTMENTS,
  JOB_GRADES,
} from "../constants/constants.js";

// Validate employee form fields before submission.
export function validateEmployee(
  values, employees = [], originalId = null,
  { importMode = false, departments = DEPARTMENTS, grades = JOB_GRADES } = {},
) {
  const schema = getEmployeeSchema({ importMode, originalId });
  return validateEmployeeRules(values, employees, originalId,
    { importMode, departments, grades }, fieldErrors(schema, values));
}

// Context-dependent checks shared by the employee form and CSV validation.
export function validateEmployeeRules(
  values, employees = [], originalId = null,
  { importMode = false, departments = DEPARTMENTS, grades = JOB_GRADES } = {},
  errors = {},
) {
  if (!values || typeof values !== 'object') return errors;
  const id = typeof values.id === 'string' ? values.id.trim() : '';
  const login = typeof values.email === 'string' ? values.email.trim() : '';
  const others = employees.filter(employee => employee.id !== originalId);
  if (!errors.id && others.some(employee => employee.id.toLowerCase() === id.toLowerCase()))
    errors.id = 'This employee ID is already in use.';
  if (!errors.email && others.some(employee => employee.email?.toLowerCase() === login.toLowerCase()))
    errors.email = 'This email or login ID is already in use.';
  if (!departments.includes(values.department)) errors.department = 'Select a department.';
  if (!grades.some(grade => grade.name === values.grade)) errors.grade = 'Select a civil job grade.';
  if (!importMode && !errors.birthDate) {
    if (values.birthDate > todayInNairobi())
      errors.birthDate = 'Enter a valid birth date that is not in the future.';
    else if (!errors.hiredDate && values.hiredDate < values.birthDate)
      errors.hiredDate = 'Hired date cannot be before birth date.';
  }
  return errors;
}

export function validateDepartment(values, departments, employees) {
  return validateDepartmentRules(values, departments, employees, fieldErrors(departmentSchema, values));
}

export function validateDepartmentRules(values, departments, employees, errors = {}) {
  if (!values || typeof values !== 'object') return errors;
  const name = typeof values.name === 'string' ? values.name.trim() : '';
  const code = typeof values.code === 'string' ? values.code.trim() : '';
  const others = departments.filter(department => department.id !== values.id);
  if (!errors.name && others.some(department => department.name.toLowerCase() === name.toLowerCase()))
    errors.name = 'A department with this name already exists.';
  if (!errors.code && others.some(department => department.code.toLowerCase() === code.toLowerCase()))
    errors.code = 'This department code is already in use.';
  const original = departments.find(department => department.id === values.id);
  if (values.headId && !employees.some(employee => employee.id === values.headId && employee.department === original?.name))
    errors.headId = 'Choose an employee assigned to this department.';
  return errors;
}

export function validateJobGrade(values, grades) {
  return validateJobGradeRules(values, grades, fieldErrors(jobGradeSchema, { ...values }));
}

export function validateJobGradeRules(values, grades, errors = {}) {
  if (!values || typeof values !== 'object') return errors;
  const name = typeof values?.name === 'string' ? values.name.trim().replace(/\s+/g, ' ') : '';
  if (!errors.name && grades.some(grade => grade.id !== values.id && grade.name.toLowerCase() === name.toLowerCase()))
    errors.name = 'A grade with this title already exists.';
  return errors;
}
