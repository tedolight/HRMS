import { useAdminStore } from '../../store/index.js'

export default function formatDate(value, options = {}, preferences = useAdminStore.getState().generalSettings) {
  if (!value) return "—";
  const date = new Date(`${value}T12:00:00Z`);
  if (Number.isNaN(date.getTime())) return "—";
  const numeric = preferences.dateFormat !== 'MMM_D_YYYY';
  const dateOptions = {
    timeZone: "Africa/Nairobi",
    month: numeric ? "2-digit" : "short",
    day: numeric ? "2-digit" : "numeric",
    year: "numeric",
    ...options,
  };
  const formatter = new Intl.DateTimeFormat(preferences.dateFormat === 'DD_MM_YYYY' ? 'en-GB' : 'en-US', dateOptions);
  // Keep explicit month titles and partial dates used by headings/statistics.
  if (preferences.dateFormat === 'YYYY_MM_DD' && ['numeric', '2-digit'].includes(dateOptions.month)) {
    const parts = formatter.formatToParts(date);
    const part = type => parts.find(item => item.type === type)?.value;
    const formatted = ['year', 'month', 'day'].map(part).filter(Boolean).join('-');
    return part('weekday') ? `${part('weekday')}, ${formatted}` : formatted;
  }
  return formatter.format(date);
}
