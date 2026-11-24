import { IconButton } from '../../components/common/Button.jsx'
import { useEffect, useRef, useState } from 'react'
import Icon from '../../components/common/Icon.jsx'
import AdminProfileDropdown from '../dropdowns/AdminProfileDropdown.jsx'
import NotificationsDropdown from '../dropdowns/NotificationsDropdown.jsx'
import { ATTENDANCE_PAGES } from '../../utils/constants/constants.js'

export default function Header({
  search,
  onSearch,
  onMenu,
  onNavigate,
  notifications,
  notificationSettings,
  account,
  onOpenNotification,
  activePage = 'dashboard',
}) {
  const [menu, setMenu] = useState(null)
  const menuRef = useRef(null)
  const profileRef = useRef(null)
  const notificationRef = useRef(null)
  const attendanceActive = ATTENDANCE_PAGES.some((item) => item.id === activePage)
  const unreadCount = notifications.filter(item => !item.read).length
  const attendanceTableId = {
    attendance: 'attendance-table',
    'check-in-logs': 'check-in-logs-table',
    'late-arrivals': 'late-arrivals-table',
  }[activePage]

  useEffect(() => {
    if (!menu) return undefined
    function dismiss(event) {
      if (!menuRef.current?.contains(event.target)) setMenu(null)
    }
    function onKey(event) {
      if (event.key === 'Escape') {
        setMenu(null)
        const trigger = menu === 'profile' ? profileRef : notificationRef
        trigger.current?.focus()
      }
    }
    document.addEventListener('pointerdown', dismiss)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', dismiss)
      document.removeEventListener('keydown', onKey)
    }
  }, [menu])

  function navigate(action) {
    setMenu(null)
    onNavigate(action)
  }

  return (
    <header className="header tw:h-[var(--header-height)] tw:flex tw:items-center tw:justify-between tw:gap-5 tw:py-0 tw:px-[30px]
          tw:[border-bottom:1px_solid_var(--border)] tw:bg-white tw:sticky tw:top-0 tw:z-20
          tw:max-[1280px]:px-[22px] tw:max-[1024px]:gap-3 tw:max-[768px]:px-[15px] tw:max-[768px]:gap-2">
      <IconButton variant="menu"
        type="button"
        onClick={onMenu}
        aria-label="Open navigation"
      >
        <Icon name="menu" />
      </IconButton>
      {['attendance-settings', 'leave-settings', 'settings', 'profile'].includes(activePage) ? (
        <div className="attendance-header-title tw:flex tw:items-center tw:flex-1 tw:gap-[9px] tw:text-text-secondary tw:text-[13px]
          tw:font-semibold"><Icon name={activePage === 'profile' ? 'users' : activePage === 'settings' ? 'settings' : 'shield'} size={19} /> {activePage === 'profile' ? 'My Account' : activePage === 'settings' ? 'General Settings' : activePage === 'leave-settings' ? 'Leave Settings' : 'Attendance Settings'}</div>
      ) : <div className="search-box tw:flex tw:items-center tw:w-[min(48%,532px)] tw:h-[41px] tw:rounded-[24px] tw:bg-[var(--search-bg)]
          tw:[padding:4px_14px_4px_5px] tw:border tw:border-solid tw:border-[#eff4f8] tw:gap-[10px]
          tw:focus-within:border-[#a3d2c8] tw:focus-within:[box-shadow:0_0_0_3px_#dff2ed80] tw:max-[1024px]:mr-auto
          tw:max-[1024px]:w-[min(50%,532px)] tw:max-[768px]:w-full tw:max-[768px]:max-w-none
          tw:max-[768px]:gap-[5px] tw:max-[768px]:pr-2">
        <span className="search-icon tw:inline-flex tw:items-center tw:justify-center tw:bg-white tw:text-[#7091a3] tw:rounded-[50%]
          tw:size-[31px] tw:shrink-0 tw:max-[768px]:size-[27px]">
          <Icon name="search" size={19} />
        </span>
        <input className="tw:bg-transparent tw:[border:0] tw:[outline:none] tw:min-w-0 tw:w-full tw:text-[11px] tw:text-text-primary
          tw:placeholder:text-[#6d889e]"
          type="search"
          value={search}
          onChange={(event) => onSearch(event.target.value)}
          placeholder={
            activePage === 'notifications' ? 'Search notification titles, messages or names…'
              : activePage === 'services' ? 'Search services, training, or locations…'
              : activePage === 'documents' ? 'Search documents by title, file name, or audience…'
              : activePage === 'reports' ? 'Search reports by name, ID, category, or content…'
              : activePage === 'announcements' ? 'Search announcements by title, message, or audience…'
              : activePage === 'recruitment' ? 'Search job postings by title or department…'
              : activePage === 'applicants' ? 'Search candidates by name, national ID, or position…'
              : activePage === 'career' ? 'Search career milestones by employee, type, or grade…'
              : activePage === 'discipline' ? 'Search discipline by employee, violation, or sanction…'
              : activePage === 'rewards' ? 'Search recognitions by employee, award, or category…'
              : activePage === 'payroll-deductions' ? 'Search other deductions…'
              : activePage === 'payroll-reports' ? 'Search payroll reports or employees…'
              : activePage === 'payroll' ? 'Search payroll by employee name, ID, or department…'
              : activePage === 'leave'
              ? 'Search leave by name, serial number, or department…'
              : attendanceActive
              ? 'Search attendance by name, ID, or department…'
              : activePage === 'grades'
              ? 'Search job grades by title or ID…'
              : activePage === 'departments'
                ? 'Search departments by name, code, or head…'
                : 'Search employees, departments, or IDs…'
          }
          aria-label={
            activePage === 'notifications' ? 'Search notifications'
              : activePage === 'services' ? 'Search services'
              : activePage === 'documents' ? 'Search documents'
              : activePage === 'reports' ? 'Search reports'
              : activePage === 'announcements' ? 'Search announcements'
              : activePage === 'recruitment' ? 'Search job postings'
              : activePage === 'applicants' ? 'Search candidate applications'
              : activePage === 'career' ? 'Search career milestones'
              : activePage === 'discipline' ? 'Search disciplinary records'
              : activePage === 'rewards' ? 'Search staff recognitions'
              : activePage === 'leave'
              ? 'Search leave by name, serial number, or department'
              : attendanceActive
              ? 'Search attendance by name, ID, or department'
              : activePage === 'grades'
              ? 'Search job grades by title or ID'
              : activePage === 'departments'
                ? 'Search departments by name, code, or head'
                : 'Search employees, departments, or IDs'
          }
          aria-controls={
            activePage === 'notifications' ? 'notification-list'
              : activePage === 'services' ? 'services-table'
              : activePage === 'documents' ? 'documents-table'
              : activePage === 'reports' ? 'system-reports-table'
              : activePage === 'announcements' ? 'announcements-table'
              : activePage === 'recruitment' ? 'job-postings-table'
              : activePage === 'applicants' ? 'applications-table'
              : activePage === 'career' ? 'career-table'
              : activePage === 'discipline' ? 'discipline-table'
              : activePage === 'rewards' ? 'rewards-table'
              : activePage === 'leave'
              ? 'leave-requests-table'
              : attendanceActive
              ? attendanceTableId
              : activePage === 'grades'
              ? 'grade-table'
              : activePage === 'departments'
                ? 'department-table'
                : activePage === 'employees'
                  ? 'employee-directory-table'
                  : activePage === 'dashboard'
                    ? 'personnel-roster'
                    : undefined
          }
        />
        <kbd className="tw:py-px tw:px-[5px] tw:text-[#7891a2] tw:bg-[#fff9] tw:border tw:border-solid tw:border-[#e0e9f0] tw:rounded-[4px]
          tw:text-[10px] tw:max-[768px]:hidden">/</kbd>
      </div>}
      <div className="header-controls tw:flex tw:items-center tw:gap-4 tw:shrink-0 tw:min-[1024px]:max-[1280px]:gap-[9px]
          tw:max-[768px]:gap-[6px]" ref={menuRef}>
        <div className="dropdown-anchor tw:relative">
          <IconButton notification
            type="button"
            ref={notificationRef}
            aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ''}`}
            aria-expanded={menu === 'notifications'}
            aria-controls="notification-dropdown"
            onClick={() =>
              setMenu(menu === 'notifications' ? null : 'notifications')
            }
          >
            <Icon name="bell" size={22} />
            {unreadCount > 0 && <span aria-hidden="true" className="tw:absolute tw:right-0 tw:top-0 tw:bg-[#ef5272] tw:min-w-[17px] tw:h-[17px] tw:px-[3px] tw:flex tw:items-center tw:justify-center tw:rounded-full tw:text-[9px] tw:font-semibold tw:text-white tw:border tw:border-solid tw:border-white">{unreadCount > 99 ? '99+' : unreadCount}</span>}
          </IconButton>
          {menu === 'notifications' && (
            <NotificationsDropdown
              notifications={notifications}
              notificationSettings={notificationSettings}
              onOpen={notification => { setMenu(null); notificationRef.current?.focus(); onOpenNotification(notification) }}
              onNavigate={navigate}
            />
          )}
        </div>
        <span className="header-divider tw:w-px tw:h-7 tw:bg-[var(--divider)] tw:max-[768px]:hidden" />
        <div className="dropdown-anchor tw:relative">
          <button
            type="button"
            ref={profileRef}
            className="profile-button tw:flex tw:items-center tw:gap-[10px] tw:py-1 tw:px-0 tw:[background:none] tw:[border:0]
          tw:rounded-md tw:max-[768px]:gap-[3px]"
            aria-label={`Open ${account.profile.fullName}'s account options`}
            aria-expanded={menu === 'profile'}
            aria-controls="profile-dropdown"
            onClick={() => setMenu(menu === 'profile' ? null : 'profile')}
          >
            <span className="avatar tw:inline-flex tw:shrink-0 tw:items-center tw:justify-center tw:rounded-[50%] tw:font-semibold
          tw:size-[39px] tw:text-[#206c62] tw:[background:linear-gradient(140deg,#e3f4ee,#c9e7e0)]
          tw:[border:3px_solid_white] tw:text-[16px] tw:max-[768px]:size-[35px] tw:shared-base:inline-flex
          tw:shared-base:shrink-0 tw:shared-base:items-center tw:shared-base:justify-center tw:shared-base:w-[39px]
          tw:shared-base:h-[39px] tw:shared-base:rounded-[50%] tw:shared-base:[color:#206c62]
          tw:shared-base:[background:linear-gradient(140deg,_#e3f4ee,_#c9e7e0)]
          tw:shared-base:[border:3px_solid_white] tw:shared-base:text-[16px] tw:shared-base:font-semibold">{account.profile.fullName.charAt(0).toUpperCase()}</span>
            <span className="profile-text tw:text-left tw:[margin:0_13px_0_0] tw:min-[1024px]:max-[1280px]:mr-1 tw:max-[768px]:hidden">
              <strong className="tw:block tw:max-w-[160px] tw:truncate tw:font-semibold tw:text-[11px]">{account.profile.fullName}</strong>
              <small className="tw:block tw:text-[11px] tw:mt-1 tw:text-text-secondary">{account.role}</small>
            </span>
            <Icon className="tw:text-[var(--text-muted)] tw:max-[768px]:hidden" name="chevron-down" size={16} />
          </button>
          {menu === 'profile' && <AdminProfileDropdown onNavigate={navigate} account={account} />}
        </div>
      </div>
    </header>
  )
}
