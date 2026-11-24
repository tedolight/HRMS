import { IconButton } from '../../components/common/Button.jsx'
import { Fragment, useId, useState } from 'react'
import Icon from '../../components/common/Icon.jsx'
import { NAVIGATION, ATTENDANCE_PAGES, PAYROLL_PAGES, RECRUITMENT_PAGES } from '../../utils/constants/constants.js'

// Shared classes keep the five navigation groups easy to compare and debug.
const navBase = 'nav-item tw:flex tw:items-center tw:gap-4 tw:min-h-[46px] tw:py-3 tw:px-4 tw:text-[13px] tw:rounded-lg tw:[transition:background_0.15s] tw:min-[1280px]:max-[1440px]:gap-[13px] tw:min-[1280px]:max-[1440px]:px-[13px] tw:min-[1280px]:max-[1440px]:text-[12px] tw:min-[1024px]:max-[1280px]:gap-3 tw:min-[1024px]:max-[1280px]:px-3 tw:min-[1024px]:max-[1280px]:text-[12px]'
function navItemClass(active, toggle = false) {
  return navBase + (toggle ? ' employee-nav-toggle tw:w-full tw:[border:0] tw:text-left tw:[&[aria-expanded=false]_.employee-nav-chevron]:[transform:rotate(-90deg)]' : '') + (active
    ? ' active tw:text-white tw:[background:linear-gradient(100deg,#207469,#19594f)] tw:[box-shadow:inset_0_1px_0_#ffffff08,0_3px_12px_#042c2910] tw:font-semibold tw:[&_svg]:text-[#e1f9f2] tw:[&_svg]:fill-[#daf5ef22]'
    : ' tw:[background:transparent] tw:hover:bg-[#ffffff0a] tw:[&>svg]:text-[#bfd5d4]')
}
function subnavLinkClass(selected) {
  return 'tw:flex tw:items-center tw:gap-[13px] tw:min-h-[34px] tw:rounded-md tw:[padding:8px_15px_8px_34px] tw:text-[11px]' + (selected
    ? ' selected tw:bg-[#166358] tw:text-white tw:font-semibold'
    : ' tw:text-[#d6e8e4] tw:hover:bg-[#ffffff0a]')
}
const landscapeShape = 'tw:[clip-path:polygon(0_70%,14%_57%,24%_64%,43%_43%,52%_48%,72%_26%,100%_57%,100%_100%,0_100%)]'

export default function Sidebar({
  onNavigate,
  mobile = false,
  activePage = 'dashboard',
  account,
}) {
  const employeesActive = [
    'employees',
    'employee',
    'add-employee',
    'edit-employee',
  ].includes(activePage)
  const attendanceActive = ATTENDANCE_PAGES.some((item) => item.id === activePage)
  const leaveActive = ['leave', 'leave-settings'].includes(activePage)
  const payrollActive = PAYROLL_PAGES.some((item) => item.id === activePage)
  const recruitmentActive = RECRUITMENT_PAGES.some((item) => item.id === activePage)
  const activeSection = payrollActive ? 'payroll' : leaveActive ? 'leave' : attendanceActive ? 'attendance' : employeesActive ? 'employees' : activePage
  const submenuId = useId()
  const attendanceSubmenuId = useId()
  const leaveSubmenuId = useId()
  const payrollSubmenuId = useId()
  const recruitmentSubmenuId = useId()
  const [employeeMenu, setEmployeeMenu] = useState({
    page: activePage,
    open: employeesActive,
  })
  // Open the group on employee routes unless it was toggled on this page.
  const employeesOpen =
    employeeMenu.page === activePage ? employeeMenu.open : employeesActive
  const [attendanceMenu, setAttendanceMenu] = useState({ page: activePage, open: attendanceActive })
  const attendanceOpen = attendanceMenu.page === activePage ? attendanceMenu.open : attendanceActive
  const [leaveMenu, setLeaveMenu] = useState({ page: activePage, open: leaveActive })
  const leaveOpen = leaveMenu.page === activePage ? leaveMenu.open : leaveActive
  const [payrollMenu, setPayrollMenu] = useState({ page: activePage, open: payrollActive })
  const payrollOpen = payrollMenu.page === activePage ? payrollMenu.open : payrollActive
  const [recruitmentMenu, setRecruitmentMenu] = useState({ page: activePage, open: recruitmentActive })
  const recruitmentOpen = recruitmentMenu.page === activePage ? recruitmentMenu.open : recruitmentActive
  return (
    <aside
      className={`sidebar tw:fixed tw:[inset:0_auto_0_0] tw:w-[var(--sidebar-width)] tw:z-30 tw:flex tw:flex-col
        tw:[background:linear-gradient(160deg,#0b3432_0%,#0c3534_55%,var(--sidebar-bottom)_100%)]
        tw:text-[var(--sidebar-text)] tw:overflow-y-auto tw:[scrollbar-width:thin]
        tw:[scrollbar-color:#31635c_transparent] ${mobile ? "sidebar-mobile tw:max-[1024px]:relative tw:max-[1024px]:w-full tw:max-[1024px]:overflow-visible tw:max-[1024px]:flex-1" : "tw:max-[1024px]:hidden"}`}
      aria-label={`${account.role} navigation`}
    >
      <a
        className={`brand tw:flex tw:items-center tw:gap-[13px] tw:[padding:25px_25px_28px] tw:shrink-0
          tw:min-[1024px]:max-[1440px]:px-5 ${mobile ? "tw:max-[1024px]:pt-[10px]" : ""}`}
        href="#dashboard"
        onClick={(event) => {
          event.preventDefault()
          onNavigate('dashboard')
        }}
        aria-label="HRMS dashboard"
      >
        <svg
          className="brand-mark"
          width="35"
          height="39"
          viewBox="0 0 35 39"
          aria-hidden="true"
        >
          <path
            fill="#10ba91"
            d="M15 3h13a6 6 0 0 1 6 6v22a6 6 0 0 1-10 4L11 22V9a6 6 0 0 1 4-6"
          />
          <path fill="#079d7a" d="m16 12 12 13-11 11a6 6 0 0 1-9-4V20z" />
          <path
            fill="#19c59b"
            d="M7 20h3l8 8-8 8H7a6 6 0 0 1-6-6v-4a6 6 0 0 1 6-6"
          />
        </svg>
        <span>
          <strong className="tw:block tw:text-[24px] tw:font-[650] tw:tracking-[0.4px] tw:text-[#f4ffff] tw:leading-[1.2]">HRMS</strong>
          <small className="tw:text-[9px] tw:whitespace-nowrap tw:block tw:text-[#c7dbdc] tw:mt-[3px] tw:tracking-[0.1px]
          tw:min-[1024px]:max-[1440px]:text-[8px]">People · Process · Progress</small>
        </span>
      </a>
      <div className="sidebar-label tw:text-[#749d99] tw:text-[9px] tw:tracking-[1.6px] tw:font-semibold tw:[padding:7px_31px_13px]">WORKSPACE</div>
      <nav className="sidebar-nav tw:py-0 tw:px-4 tw:flex tw:flex-col tw:gap-[5px] tw:min-[1280px]:max-[1440px]:px-[13px]">
        {NAVIGATION.map((item) => (
          <Fragment key={item.id}>
            {item.id === 'employees' ? (
              <button
                type="button"
                className={navItemClass(employeesActive, true)}
                aria-expanded={employeesOpen}
                aria-controls={submenuId}
                onClick={() =>
                  setEmployeeMenu({ page: activePage, open: !employeesOpen })
                }
              >
                <Icon name={item.icon} />
                <span>{item.label}</span>
                <Icon
                  name="chevron-down"
                  className="employee-nav-chevron tw:ml-auto tw:[transition:transform_0.15s]"
                  size={15}
                />
              </button>
            ) : item.id === 'attendance' ? (
              <button type="button"
                className={navItemClass(attendanceActive, true)}
                aria-expanded={attendanceOpen} aria-controls={attendanceSubmenuId}
                onClick={() => setAttendanceMenu({ page: activePage, open: !attendanceOpen })}>
                <Icon name={item.icon} />
                <span>{item.label}</span>
                <Icon name="chevron-down" className="employee-nav-chevron tw:ml-auto tw:[transition:transform_0.15s]" size={15} />
              </button>
            ) : item.id === 'leave' ? (
              <button
                type="button"
                className={navItemClass(leaveActive, true)}
                aria-expanded={leaveOpen}
                aria-controls={leaveSubmenuId}
                onClick={() => setLeaveMenu({ page: activePage, open: !leaveOpen })}
              >
                <Icon name={item.icon} />
                <span>{item.label}</span>
                <Icon name="chevron-down" className="employee-nav-chevron tw:ml-auto tw:[transition:transform_0.15s]" size={15} />
              </button>
            ) : item.id === 'recruitment' ? (
              <button type="button" className={navItemClass(recruitmentActive, true)}
                aria-expanded={recruitmentOpen} aria-controls={recruitmentSubmenuId}
                onClick={() => setRecruitmentMenu({ page: activePage, open: !recruitmentOpen })}>
                <Icon name={item.icon} /><span>{item.label}</span><Icon name="chevron-down" className="employee-nav-chevron tw:ml-auto tw:[transition:transform_0.15s]" size={15} />
              </button>
            ) : item.id === 'payroll' ? (
              <button type="button" className={navItemClass(payrollActive, true)}
                aria-expanded={payrollOpen} aria-controls={payrollSubmenuId} onClick={() => setPayrollMenu({ page: activePage, open: !payrollOpen })}>
                <Icon name={item.icon} /><span>{item.label}</span><Icon name="chevron-down" className="employee-nav-chevron tw:ml-auto tw:[transition:transform_0.15s]" size={15} />
              </button>
            ) : (
              <a
                className={navItemClass(item.id === activeSection, false)}
                href={`#${item.id}`}
                aria-current={item.id === activeSection ? 'page' : undefined}
                onClick={(event) => {
                  event.preventDefault()
                  onNavigate(item.id)
                }}
              >
                <Icon name={item.icon} />
                <span>{item.label}</span>
                {item.id === activeSection && (
                  <span className="nav-active-dot tw:size-[5px] tw:rounded-[50%] tw:ml-auto tw:bg-[#63ceb2]" />
                )}
              </a>
            )}
            {item.id === 'recruitment' && <div className="employee-subnav tw:grid tw:gap-[3px] tw:[margin:4px_0_8px] tw:[&[hidden]]:hidden" id={recruitmentSubmenuId} hidden={!recruitmentOpen}>
              {RECRUITMENT_PAGES.map((page) => <a key={page.id} href={page.href} className={subnavLinkClass(activePage === page.id)}
                aria-current={activePage === page.id ? 'page' : undefined}
                onClick={(event) => { event.preventDefault(); onNavigate(page.id) }}><span className="tw:size-1 tw:rounded-[50%] tw:bg-current tw:shrink-0" />{page.label}</a>)}
            </div>}
            {item.id === 'payroll' && <div className="employee-subnav tw:grid tw:gap-[3px] tw:[margin:4px_0_8px] tw:[&[hidden]]:hidden" id={payrollSubmenuId} hidden={!payrollOpen}>
              {PAYROLL_PAGES.map((page) => <a key={page.id} href={page.href} className={subnavLinkClass(activePage === page.id)}
                aria-current={activePage === page.id ? 'page' : undefined} onClick={(event) => { event.preventDefault(); onNavigate(page.id) }}><span className="tw:size-1 tw:rounded-[50%] tw:bg-current tw:shrink-0" />{page.label}</a>)}
            </div>}
            {item.id === 'attendance' && (
              <div className="employee-subnav tw:grid tw:gap-[3px] tw:[margin:4px_0_8px] tw:[&[hidden]]:hidden" id={attendanceSubmenuId} hidden={!attendanceOpen}>
                {ATTENDANCE_PAGES.map((page) => (
                  <a key={page.id} href={page.href}
                    className={subnavLinkClass(activePage === page.id)}
                    aria-current={activePage === page.id ? 'page' : undefined}
                    onClick={(event) => { event.preventDefault(); onNavigate(page.id) }}>
                    <span className="tw:size-1 tw:rounded-[50%] tw:bg-current tw:shrink-0" />{page.label}
                  </a>
                ))}
              </div>
            )}
            {item.id === 'leave' && <div className="employee-subnav tw:grid tw:gap-[3px] tw:[margin:4px_0_8px] tw:[&[hidden]]:hidden" id={leaveSubmenuId} hidden={!leaveOpen}>
              {[['leave', 'Requests', '#/leave'], ['leave-settings', 'Settings & Entitlements', '#/leave/settings']].map(([page, label, href]) =>
                <a key={page} href={href} className={subnavLinkClass(activePage === page)} aria-current={activePage === page ? 'page' : undefined}
                  onClick={(event) => { event.preventDefault(); onNavigate(page) }}><span className="tw:size-1 tw:rounded-[50%] tw:bg-current tw:shrink-0" />{label}</a>,
              )}
            </div>}
            {item.id === 'employees' && (
              <div
                className="employee-subnav tw:grid tw:gap-[3px] tw:[margin:4px_0_8px] tw:[&[hidden]]:hidden"
                id={submenuId}
                hidden={!employeesOpen}
              >
                {[
                  ['employees', 'Employee Directory'],
                  ['add-employee', 'Add Employee'],
                ].map(([page, label]) => (
                  <a
                    key={page}
                    href={
                      page === 'employees' ? '#/employees' : '#/employees/new'
                    }
                    className={subnavLinkClass(activePage === page)}
                    aria-current={activePage === page ? 'page' : undefined}
                    onClick={(event) => {
                      event.preventDefault()
                      onNavigate(page)
                    }}
                  >
                    <span className="tw:size-1 tw:rounded-[50%] tw:bg-current tw:shrink-0" />
                    {label}
                  </a>
                ))}
              </div>
            )}
          </Fragment>
        ))}
      </nav>
      <div className={`sidebar-bottom tw:relative tw:mt-auto tw:pt-[145px] tw:min-h-[310px] ${mobile ? "tw:max-[1024px]:pt-[35px] tw:max-[1024px]:min-h-[100px]" : ""} tw:shrink-0 `}>
        <div className={`sidebar-landscape tw:absolute tw:[inset:17px_0_70px] tw:overflow-hidden tw:opacity-[0.45] tw:pointer-events-none ${mobile ? "tw:max-[1024px]:hidden" : ""}`} aria-hidden="true">
          <span className={`tw:absolute tw:inset-0 tw:bg-[#164d48] ${landscapeShape}`} />
          <span className="tw:absolute tw:inset-0 tw:bg-[#0e403d] tw:[transform:translateY(27px)]
          tw:[clip-path:polygon(0_65%,22%_40%,40%_63%,54%_47%,72%_57%,85%_40%,100%_50%,100%_100%,0_100%)]" />
          <span className={`tw:absolute tw:inset-0 tw:bg-[#082f2e] tw:[transform:translateY(58px)] ${landscapeShape}`} />
        </div>
        <div className={`sidebar-slogan tw:relative tw:text-[#a0bdbb] tw:text-[13px] tw:leading-[1.5] tw:[padding:0_32px_26px] ${mobile ? "tw:max-[1024px]:hidden" : ""}`}>
          Great teams
          <br />
          build great things
          <span className="tw:block tw:w-7 tw:h-[2px] tw:bg-[#21af90] tw:mt-[15px]" />
        </div>
        <div className={`sidebar-profile tw:relative tw:flex tw:items-center tw:py-[17px] tw:px-5 tw:gap-[10px]
          tw:[border-top:1px_solid_#ffffff0d] tw:bg-[#062a291f] ${mobile ? "tw:max-[1024px]:mt-[10px]" : ""}`}>
          <span className="avatar sidebar-avatar tw:inline-flex tw:shrink-0 tw:items-center tw:justify-center tw:rounded-[50%]
          tw:font-semibold tw:size-[34px] tw:text-[#b6ebda] tw:[background:#1d5c53] tw:border tw:border-solid
          tw:border-[#3c78694d] tw:text-[13px] tw:shared-base:inline-flex tw:shared-base:shrink-0
          tw:shared-base:items-center tw:shared-base:justify-center tw:shared-base:w-[39px] tw:shared-base:h-[39px]
          tw:shared-base:rounded-[50%] tw:shared-base:[color:#206c62]
          tw:shared-base:[background:linear-gradient(140deg,_#e3f4ee,_#c9e7e0)]
          tw:shared-base:[border:3px_solid_white] tw:shared-base:text-[16px] tw:shared-base:font-semibold">{account.profile.fullName.charAt(0).toUpperCase()}</span>
          <button type="button" onClick={() => onNavigate('profile')} aria-current={activePage === 'profile' ? 'page' : undefined}
            className="tw:min-w-0 tw:bg-transparent tw:border-0 tw:p-0 tw:text-left tw:rounded-md" aria-label="Open my account">
            <strong className="tw:block tw:text-[#e2eeec] tw:text-[11px] tw:font-semibold">{account.role}</strong>
            <span className="tw:block tw:truncate tw:text-[10px] tw:mt-1 tw:text-[#91b0ad]">{account.profile.fullName}</span>
          </button>
          <IconButton variant="sidebar"
            aria-label="Log out"
            onClick={() => onNavigate('logout')}
          >
            <Icon name="logout" size={18} />
          </IconButton>
        </div>
      </div>
    </aside>
  )
}
