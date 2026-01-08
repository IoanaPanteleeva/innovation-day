import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import { useUnreadNotifications } from '../../../hooks/useNotifications'
import NotificationDropdown from '../NotificationDropdown/NotificationDropdown'
import styles from './NotificationBell.module.css'

const NotificationBell = () => {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const { data: unreadNotifications = [] } = useUnreadNotifications(user?.id)
  const unreadCount = unreadNotifications.length

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={styles.container} ref={dropdownRef}>
      <button
        className={styles.bell}
        onClick={toggleDropdown}
        aria-label={`Notifications (${unreadCount} unread)`}
      >
        <span className={styles.icon}>🔔</span>
        {unreadCount > 0 && (
          <span className={styles.badge}>{unreadCount > 99 ? '99+' : unreadCount}</span>
        )}
      </button>

      {isOpen && <NotificationDropdown onClose={() => setIsOpen(false)} />}
    </div>
  )
}

export default NotificationBell
