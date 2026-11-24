export const NOTIFICATION_CATEGORIES = [
  { value: 'ANNOUNCEMENT', label: 'Announcements', icon: 'megaphone', tone: 'tw:bg-[#fff3d3] tw:text-[#ad7615]' },
  { value: 'LEAVE', label: 'Leave requests', icon: 'calendar', tone: 'tw:bg-[#eae8fb] tw:text-[#7562b5]' },
  { value: 'RECRUITMENT', label: 'Recruitment', icon: 'briefcase', tone: 'tw:bg-[#e3f5f0] tw:text-[#0b8972]' },
  { value: 'CAREER', label: 'Career reviews', icon: 'trend', tone: 'tw:bg-[#fff0f3] tw:text-[#b33450]' },
]

export const NOTIFICATION_STATUSES = [
  { value: '', label: 'All notifications' },
  { value: 'UNREAD', label: 'Unread' },
  { value: 'READ', label: 'Read' },
]

export function notificationCategory(value) {
  return NOTIFICATION_CATEGORIES.find(item => item.value === value)
}
