import { NOTIFICATION_CATEGORIES } from './notificationConstants.js'

export const INITIAL_NOTIFICATION_SETTINGS = {
  enabled: true,
  categories: Object.fromEntries(NOTIFICATION_CATEGORIES.map(item => [item.value, true])),
}

export const NOTIFICATION_DESCRIPTIONS = {
  ANNOUNCEMENT: 'Department notices and messages published to the workspace.',
  LEAVE: 'Employee leave requests waiting for HR approval.',
  RECRUITMENT: 'Candidate applications waiting for review.',
  CAREER: 'Career changes that need review before they can be applied.',
}

export const INITIAL_GENERAL_SETTINGS = {
  companyName: 'Hadiya Science',
  workEmail: 'hr@example.com',
  phoneNumber: '',
  website: '',
  officeAddress: '',
  logo: null,
  dateFormat: 'MMM_D_YYYY',
  timeFormat: '24h',
}

export const DATE_DISPLAY_FORMATS = [
  { value: 'MMM_D_YYYY', label: 'Nov 18, 2026' },
  { value: 'DD_MM_YYYY', label: '18/11/2026 (DD/MM/YYYY)' },
  { value: 'MM_DD_YYYY', label: '11/18/2026 (MM/DD/YYYY)' },
  { value: 'YYYY_MM_DD', label: '2026-11-18 (YYYY-MM-DD)' },
]

export const TIME_DISPLAY_FORMATS = [
  { value: '24h', label: '24-hour (13:30)' },
  { value: '12h', label: '12-hour (1:30 PM)' },
]

export const MAX_COMPANY_LOGO_BYTES = 2 * 1024 * 1024
export const COMPANY_LOGO_ACCEPT = 'image/png,image/jpeg,.png,.jpg,.jpeg'

export const REGIONAL_INFORMATION = [
  { label: 'Country', value: 'Ethiopia', icon: 'globe' },
  { label: 'Time zone', value: 'East Africa Time (UTC+03:00)', icon: 'clock' },
  { label: 'Currency', value: 'ETB — Ethiopian Birr', icon: 'wallet' },
]
