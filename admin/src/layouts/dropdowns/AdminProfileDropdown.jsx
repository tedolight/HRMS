import Icon from '../../components/common/Icon.jsx'

export default function AdminProfileDropdown({ onNavigate, account }) {
  return (
    <div
      className="header-dropdown tw:absolute tw:right-0 tw:top-[calc(100%+15px)] tw:bg-white tw:border tw:border-solid
        tw:border-border tw:[box-shadow:0_12px_35px_#163d3920] tw:p-2 tw:rounded-[10px] tw:w-[266px]"
      id="profile-dropdown"
      aria-label="Profile options"
    >
      <div className="dropdown-title tw:py-3 tw:px-[10px] tw:[border-bottom:1px_solid_var(--divider)] tw:mb-[5px]">
        <strong className="tw:block tw:text-[13px] tw:[overflow-wrap:anywhere]">{account.profile.fullName}</strong>
        <small className="tw:block tw:text-[11px] tw:text-[var(--text-muted)] tw:mt-1 tw:[overflow-wrap:anywhere]">{account.loginEmail}</small>
      </div>
      <button className="tw:flex tw:items-center tw:gap-[10px] tw:min-h-[42px] tw:[border:0] tw:[background:none] tw:w-full tw:p-[10px]
          tw:rounded-md tw:text-text-secondary tw:text-[12px] tw:text-left tw:hover:bg-[#f0f8f5]
          tw:hover:text-primary" onClick={() => onNavigate('profile')}>
        <Icon name="users" size={18} />
        My Account
      </button>
      <button className="tw:flex tw:items-center tw:gap-[10px] tw:min-h-[42px] tw:[border:0] tw:[background:none] tw:w-full tw:p-[10px]
          tw:rounded-md tw:text-text-secondary tw:text-[12px] tw:text-left tw:hover:bg-[#f0f8f5]
          tw:hover:text-primary" onClick={() => onNavigate('logout')}>
        <Icon name="logout" size={18} />
        Log out
      </button>
    </div>
  )
}
