import Icon from '../../components/common/Icon.jsx'
import { notificationCategory } from '../../utils/constants/notificationConstants.js'
import { notificationDate } from '../../services/communications/notificationService.js'

export default function NotificationsDropdown({ notifications, notificationSettings, onOpen, onNavigate }) {
  const unread = notifications.filter(item => !item.read).length
  const enabled = notificationSettings.enabled && Object.values(notificationSettings.categories).some(Boolean)
  // Bring unread updates to the preview while keeping the inbox chronological.
  const preview = [...notifications].sort((a, b) => Number(a.read) - Number(b.read)).slice(0, 4)
  return <div id="notification-dropdown" aria-label="Notifications"
    className="header-dropdown tw:absolute tw:right-0 tw:top-[calc(100%+15px)] tw:w-[350px] tw:max-w-[calc(100vw-30px)] tw:bg-white tw:border tw:border-solid tw:border-border tw:rounded-[10px] tw:[box-shadow:0_12px_35px_#163d3920] tw:max-[768px]:right-[-45px]">
    <div className="tw:flex tw:items-center tw:justify-between tw:gap-[10px] tw:p-[17px] tw:border-0 tw:border-b tw:border-solid tw:border-border">
      <div><strong className="tw:block tw:text-[13px]">Notifications</strong><small className="tw:block tw:mt-[5px] tw:text-[11px] tw:text-[var(--text-muted)]">Your workspace updates</small></div>
      <span className="tw:rounded-full tw:bg-icon-bg tw:text-primary tw:text-[10px] tw:font-semibold tw:p-[5px_8px]">{unread} unread</span>
    </div>
    {preview.length ? <ul className="tw:list-none tw:p-0 tw:m-0 tw:max-h-[min(440px,55dvh)] tw:overflow-y-auto">
      {preview.map(item => {
        const category = notificationCategory(item.category)
        return <li key={item.id} className="tw:border-0 tw:border-b tw:border-solid tw:border-border tw:last:border-b-0">
          <button type="button" onClick={() => onOpen(item)} className={`tw:flex tw:items-start tw:gap-[10px] tw:p-[14px_17px] tw:w-full tw:border-0 tw:text-left tw:hover:bg-[#eaf7f2] ${item.read ? 'tw:bg-white' : 'tw:bg-[#f1faf7]'}`}>
            <span className={`tw:inline-flex tw:items-center tw:justify-center tw:shrink-0 tw:size-[32px] tw:rounded-[9px] ${category.tone}`}><Icon name={category.icon} size={17} /></span>
            <span className="tw:flex-1 tw:min-w-0">
              <strong className="tw:block tw:text-[11px] tw:font-semibold tw:text-text-primary tw:leading-[1.6] tw:line-clamp-2 tw:[overflow-wrap:anywhere]">{item.title}</strong>
              <span className="tw:block tw:mt-[4px] tw:text-[11px] tw:text-text-secondary tw:leading-[1.7] tw:line-clamp-2 tw:[overflow-wrap:anywhere]">{item.message}</span>
              <small className="tw:block tw:mt-[7px] tw:text-[10px] tw:text-[var(--text-muted)]">{notificationDate(item)} · {item.read ? 'Read' : 'Unread'}</small>
            </span>
          </button>
        </li>
      })}
    </ul> : <div className="tw:flex tw:flex-col tw:items-center tw:gap-[10px] tw:p-[28px_17px] tw:text-center">
      <Icon name="check-circle" size={30} className="tw:text-primary" />
      <strong className="tw:text-[13px]">{enabled ? 'You’re all caught up' : 'Notifications are turned off'}</strong>
      <p className="tw:text-[12px] tw:text-[var(--text-muted)]">{enabled ? 'New updates in your enabled categories will appear here.' : 'Enable notifications in General Settings to see updates.'}</p>
      {!enabled && <button type="button" className="tw:p-[7px] tw:border-0 tw:bg-transparent tw:text-primary tw:text-[12px] tw:font-semibold" onClick={() => onNavigate('notification-settings')}>Open notification settings</button>}
    </div>}
    <button type="button" onClick={() => onNavigate('notifications')} className="tw:flex tw:items-center tw:justify-center tw:gap-[9px] tw:p-[15px] tw:w-full tw:border-0 tw:border-t tw:border-solid tw:border-border tw:bg-transparent tw:text-primary tw:text-[12px] tw:font-semibold tw:hover:bg-icon-bg">
      View all notifications <Icon name="arrow" size={17} />
    </button>
  </div>
}
