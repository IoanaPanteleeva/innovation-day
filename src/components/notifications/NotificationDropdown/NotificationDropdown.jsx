import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { useNotifications, useMarkAllAsRead } from '../../../hooks/useNotifications'
import NotificationItem from '../NotificationItem/NotificationItem'
import Button from '../../common/Button/Button'
import Loader from '../../common/Loader/Loader'
import styles from './NotificationDropdown.module.css'

const NotificationDropdown = ({ onClose }) => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const markAllAsRead = useMarkAllAsRead()

  const { data: notifications = [], isLoading } = useNotifications(user?.id, {
    select: (data) => data.slice(0, 5), // Show only the 5 most recent
  })

  const handleViewAll = () => {
    navigate('/notifications')
    onClose()
  }

  const handleMarkAllAsRead = () => {
    markAllAsRead.mutate(user?.id)
  }

  const hasUnread = notifications.some((n) => !n.read)

  return (
    <div className={styles.dropdown}>
      <div className={styles.header}>
        <h3 className={styles.title}>Notifications</h3>
        {hasUnread && (
          <button
            onClick={handleMarkAllAsRead}
            className={styles.markAllButton}
            disabled={markAllAsRead.isLoading}
          >
            Mark all as read
          </button>
        )}
      </div>

      <div className={styles.list}>
        {isLoading ? (
          <div className={styles.loading}>
            <Loader size="sm" />
            <span>Loading notifications...</span>
          </div>
        ) : notifications.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>🔕</span>
            <p>No notifications yet</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              showActions={false}
            />
          ))
        )}
      </div>

      <div className={styles.footer}>
        <Button variant="ghost" onClick={handleViewAll} fullWidth>
          View All Notifications
        </Button>
      </div>
    </div>
  )
}

export default NotificationDropdown
