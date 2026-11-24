import Button from './Button.jsx'
import Modal, { ModalActions } from './Modal.jsx'
import Icon from './Icon.jsx'

export default function ConfirmationModal({
  title,
  children,
  onConfirm,
  onCancel,
  confirmLabel = 'Confirm',
  destructive = false,
}) {
  return (
    <Modal title={title} onClose={onCancel}>
      <div className="tw:text-text-secondary tw:text-[14px] tw:leading-[1.8]">{children}</div>
      <ModalActions >
        <Button variant="secondary"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="button"
          variant={destructive ? 'danger' : 'primary'}
          onClick={onConfirm}
        >
          {destructive && <Icon name="trash" size={17} />}
          {confirmLabel}
        </Button>
      </ModalActions>
    </Modal>
  )
}
