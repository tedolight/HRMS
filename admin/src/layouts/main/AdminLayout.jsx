import { useEffect, useState } from 'react'
import Header from '../navigation/Header.jsx'
import Sidebar from '../navigation/Sidebar.jsx'
import Modal from '../../components/common/Modal.jsx'

export default function AdminLayout({
  children,
  search,
  onSearch,
  onNavigate,
  notifications,
  notificationSettings,
  account,
  onOpenNotification,
  activePage = 'dashboard',
}) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)')
    function closeOnDesktop(event) {
      if (event.matches) setDrawerOpen(false)
    }
    desktop.addEventListener('change', closeOnDesktop)
    function focusSearch(event) {
      if (
        event.key === '/' &&
        !['INPUT', 'TEXTAREA', 'SELECT'].includes(
          document.activeElement?.tagName,
        ) &&
        !document.querySelector('dialog[open]')
      ) {
        event.preventDefault()
        document.querySelector('.search-box input')?.focus()
      }
    }
    document.addEventListener('keydown', focusSearch)
    return () => {
      desktop.removeEventListener('change', closeOnDesktop)
      document.removeEventListener('keydown', focusSearch)
    }
  }, [])

  function navigate(action) {
    setDrawerOpen(false)
    onNavigate(action)
  }

  return (
    <div className="app-shell">
      <a href="#main-content" className="skip-link tw:shared-base:[position:fixed] tw:shared-base:top-[8px] tw:shared-base:left-[8px] tw:shared-base:z-[100]
          tw:shared-base:p-[12px] tw:shared-base:[background:white]
          tw:shared-base:[border:2px_solid_var(--primary)] tw:shared-base:rounded-[6px]
          tw:shared-base:[transform:translateY(-180%)] tw:[:where(&):focus]:[transform:translateY(0)]">
        Skip to main content
      </a>
      <Sidebar onNavigate={navigate} activePage={activePage} account={account} />
      <div className="workspace tw:ml-[var(--sidebar-width)] tw:min-w-0 tw:max-[1024px]:ml-0">
        <Header
          search={search}
          onSearch={onSearch}
          onMenu={() => setDrawerOpen(true)}
          onNavigate={navigate}
          notifications={notifications}
          notificationSettings={notificationSettings}
          onOpenNotification={onOpenNotification}
          activePage={activePage}
          account={account}
        />
        <main id="main-content" className={`main-content tw:max-w-[1660px] tw:p-[28px_30px_0] tw:mx-[auto] tw:focus:outline-none
          tw:min-[1024px]:max-[1280px]:p-[24px_22px_0] tw:max-[1024px]:p-[25px_22px_0]
          tw:max-[768px]:p-[22px_18px_0] tw:max-[480px]:px-[15px] `} tabIndex={-1}>
          {children}
        </main>
      </div>
      {drawerOpen && (
        <Modal
          title="Your workspace"
          onClose={() => setDrawerOpen(false)}
          drawer
        >
          <Sidebar mobile onNavigate={navigate} activePage={activePage} account={account} />
        </Modal>
      )}
    </div>
  )
}
