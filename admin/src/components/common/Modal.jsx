import { IconButton } from './Button.jsx'
import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import Icon from './Icon.jsx'

const modalWidths = {
  default: 'tw:w-[min(760px,calc(100vw-32px))] tw:max-[480px]:w-[calc(100vw-20px)]',
  small: 'tw:w-[min(580px,calc(100vw-32px))]',
  medium: 'tw:w-[min(680px,calc(100vw-32px))]',
  service: 'tw:w-[min(700px,calc(100vw-32px))]',
}
const drawerFrame = 'tw:w-[min(760px,calc(100vw-32px))] tw:max-[1024px]:fixed tw:max-[1024px]:[inset:0_auto_0_0] tw:max-[1024px]:m-0 tw:max-[1024px]:w-[285px] tw:max-[1024px]:h-dvh tw:max-[1024px]:max-h-none tw:max-[1024px]:[border:0] tw:max-[1024px]:rounded-none tw:max-[1024px]:bg-[var(--sidebar-bg)] tw:max-[1024px]:text-white tw:max-[480px]:w-[min(285px,calc(100vw-35px))]'

export function ModalActions({ className = '', ...props }) {
  return <div {...props} className={`modal-actions tw:flex tw:gap-[10px] tw:items-center tw:justify-end tw:pt-[22px] tw:mt-5
          tw:[border-top:1px_solid_var(--divider)] tw:max-[480px]:flex-wrap ${className}`} />
}

export function DialogIntro({ className = '', ...props }) {
  return <p {...props} className={`dialog-intro tw:text-[13px] tw:text-text-secondary tw:leading-[1.8] tw:mb-[18px] ${className}`} />
}

export default function Modal({
  title,
  subtitle,
  children,
  onClose,
  drawer = false,
  size = 'default',
  className = '',
}) {
  const dialogRef = useRef(null)
  const closeRef = useRef(onClose)
  const titleId = useId()

  useEffect(() => {
    closeRef.current = onClose
  }, [onClose])
  useEffect(() => {
    const dialog = dialogRef.current
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.showModal()
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected)
        previousFocus.focus()
    }
  }, [])

  return createPortal(
    <dialog
      ref={dialogRef}
      className={`modal tw:border tw:border-solid tw:border-border tw:rounded-[15px] tw:p-0 tw:max-w-none
        tw:max-h-[calc(100dvh-56px)] tw:text-text-primary tw:bg-white tw:[box-shadow:0_20px_90px_#052e2b30]
        tw:overflow-auto tw:backdrop:bg-[#082d3670] tw:backdrop:backdrop-blur-[3px] ${drawer ? `navigation-drawer ${drawerFrame}` : `${modalWidths[size]} tw:max-[480px]:max-h-[calc(100dvh-28px)] `}  ${className}`}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault()
        closeRef.current()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) closeRef.current()
      }}
    >
      <div className={`modal-inner tw:p-[25px] ${drawer ? "tw:max-[1024px]:p-0 tw:max-[1024px]:min-h-full tw:max-[1024px]:flex tw:max-[1024px]:flex-col" : "tw:max-[768px]:p-5 tw:max-[480px]:p-[18px]"}`}>
        <div className={`modal-heading tw:flex tw:items-start tw:justify-between tw:gap-[14px] tw:pb-5 tw:mb-[22px]
          tw:[border-bottom:1px_solid_var(--divider)] ${drawer ? "tw:max-[1024px]:m-0 tw:max-[1024px]:[padding:12px_15px_3px] tw:max-[1024px]:[border:0] tw:max-[1024px]:items-center" : ""}`}>
          <div>
            <h2 id={titleId} className={`tw:text-[21px] ${drawer ? "tw:max-[1024px]:text-[11px] tw:max-[1024px]:font-normal tw:max-[1024px]:text-[#a2c4bc]" : "tw:max-[768px]:text-[19px] tw:max-[480px]:text-[18px]"}`}>{title}</h2>
            {subtitle && <p className="tw:text-[12px] tw:text-[var(--text-muted)] tw:mt-[7px]">{subtitle}</p>}
          </div>
          <IconButton
            className={`tw:[margin:-5px_-7px_0_0] ${drawer ? "tw:max-[1024px]:m-0 tw:max-[1024px]:text-white tw:max-[1024px]:hover:text-white tw:max-[1024px]:hover:bg-[#ffffff15]" : ""} tw:shrink-0 `}
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <Icon name="close" />
          </IconButton>
        </div>
        {children}
      </div>
    </dialog>,
    document.body,
  )
}
