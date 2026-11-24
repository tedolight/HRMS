const buttonBase = 'tw:inline-flex tw:items-center tw:justify-center tw:gap-[9px] tw:rounded-[7px] tw:border tw:border-solid tw:font-semibold tw:leading-[1.4] tw:[transition:background_0.15s,box-shadow_0.15s]'
const buttonSizes = {
  default: 'tw:min-h-[42px] tw:px-[17px] tw:py-[10px] tw:text-[13px]',
  payslip: 'tw:min-h-[33px] tw:px-[10px] tw:py-[6px] tw:text-[11px]',
  'leave-manage': 'tw:min-h-[34px] tw:px-[9px] tw:py-[6px] tw:text-[11px]',
}

const buttonVariants = {
  primary: 'tw:border-transparent tw:text-white tw:bg-primary tw:[box-shadow:0_3px_8px_#087f6d10] tw:hover:bg-primary-hover',
  secondary: 'tw:bg-white tw:border-[#d6e4e8] tw:text-text-secondary tw:hover:bg-[var(--search-bg)]',
  danger: 'tw:border-transparent tw:text-white tw:bg-[#c73f5b] tw:hover:bg-[#ac2d49]',
  'danger-outline': 'tw:bg-white tw:border-[#f0cbd4] tw:text-[#be3e58] tw:hover:bg-[#fff2f5]',
  discipline: 'tw:text-white tw:bg-[#df0015] tw:border-[#df0015] tw:hover:bg-[#bd0012] tw:hover:border-[#bd0012]',
  reject: 'tw:text-[#b52f3f] tw:border-[#f3c6cd] tw:bg-[#fff3f5] tw:hover:bg-[#ffe1e7]',
}

const iconBase = 'tw:items-center tw:justify-center tw:p-2 tw:bg-transparent'
const iconVariants = {
  default: 'tw:inline-flex tw:[border:none] tw:rounded-lg tw:text-text-secondary tw:hover:bg-[#edf6f5] tw:hover:text-primary',
  edit: 'tw:inline-flex tw:border tw:border-solid tw:border-border tw:rounded-[9px] tw:text-text-secondary tw:hover:bg-[#edf6f5] tw:hover:text-primary',
  delete: 'tw:inline-flex tw:[border:none] tw:rounded-lg tw:text-text-secondary tw:hover:bg-[#fff0f3] tw:hover:text-[#b42344]',
  'muted-delete': 'tw:inline-flex tw:[border:none] tw:rounded-lg tw:text-[var(--text-muted)] tw:hover:bg-[#fff0f3] tw:hover:text-[#b42344]',
  menu: 'tw:hidden tw:max-[1024px]:inline-flex tw:max-[1024px]:shrink-0 tw:[border:none] tw:rounded-lg tw:text-text-secondary tw:hover:bg-[#edf6f5] tw:hover:text-primary',
  sidebar: 'tw:inline-flex tw:[border:none] tw:rounded-lg tw:text-[#9bbdb7] tw:hover:bg-[#ffffff12] tw:hover:text-primary',
}

// Marker classes support contextual Tailwind selectors in existing page layouts.
export default function Button({ as: Tag = 'button', variant = 'primary', size = 'default', className = '', ...props }) {
  return <Tag {...props} className={`button button-${variant}  ${buttonBase}  ${buttonSizes[size]}  ${buttonVariants[variant]}  ${className}`} />
}

export function IconButton({ variant = 'default', notification = false, className = '', ...props }) {
  return <button {...props} className={`icon-button ${iconBase}  ${variant === "sidebar" ? "tw:w-8 tw:h-9 tw:ml-auto" : "tw:size-10"}  ${iconVariants[variant]}  ${notification ? "tw:relative" : ""}  ${className}`} />
}

export function TextButton({ className = '', ...props }) {
  return <button {...props} className={`text-button tw:inline-flex tw:items-center tw:justify-center tw:gap-[9px] tw:min-h-9 tw:py-1 tw:pr-0 tw:pl-2
          tw:[border:0] tw:bg-none tw:bg-transparent tw:text-primary tw:text-[12px] tw:font-semibold
          tw:whitespace-nowrap tw:hover:text-primary-hover tw:hover:underline tw:max-[768px]:text-[11px]
          tw:max-[768px]:gap-[5px] ${className}`} />
}
