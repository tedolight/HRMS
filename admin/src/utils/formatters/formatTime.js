import { useAdminStore } from '../../store/index.js'
import formatDate from './formatDate.js'

const TIME_ZONE = 'Africa/Addis_Ababa'

export default function formatTime(value, options = {}, preferences = useAdminStore.getState().generalSettings) {
  if (!value) return '—'
  // Time-only settings already represent local East Africa Time.
  const localTime = typeof value === 'string' && /^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(value)
  const date = new Date(localTime ? `2000-01-01T${value}+03:00` : value)
  if (Number.isNaN(date.getTime())) return '—'
  const twelveHour = preferences.timeFormat === '12h'
  return new Intl.DateTimeFormat(twelveHour ? 'en-US' : 'en-GB', {
    timeZone: TIME_ZONE,
    hour: twelveHour ? 'numeric' : '2-digit',
    minute: '2-digit',
    ...options,
    hourCycle: twelveHour ? 'h12' : 'h23',
  }).format(date)
}

export function formatTimestamp(value, dateOptions = {}, preferences = useAdminStore.getState().generalSettings) {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: TIME_ZONE, year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(date)
  const localDate = ['year', 'month', 'day']
    .map(type => parts.find(part => part.type === type).value).join('-')
  return `${formatDate(localDate, dateOptions, preferences)} · ${formatTime(date, {}, preferences)}`
}
