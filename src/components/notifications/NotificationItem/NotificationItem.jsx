import { formatDistanceToNow } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { useMarkAsRead, useDeleteNotification } from '../../../hooks/useNotifications'
import styles from './NotificationItem.module.css'

const NotificationItem = ({ notification, showActions = true }) => {
  const navigate = useNavigate()
  const markAsRead = useMarkAsRead()
  const deleteNotification = useDeleteNotification()

  const getIcon = (type) => {
    const icons = {
      comment: '💬',
      status_change: '🔄',
      invitation: '📨',
      deadline_reminder: '⏰',
      question: '❓',
    }
    return icons[type] || '🔔'
  }

  const handleClick = () => {
    // Mark as read if unread
    if (!notification.read) {
      markAsRead.mutate(notification.id)
    }

    // Navigate to the related idea if ideaId exists
    if (notification.ideaId) {
      navigate(`/ideas/${notification.ideaId}`)
    }
  }

  const handleMarkAsRead = (e) => {
    e.stopPropagation()
    markAsRead.mutate(notification.id)
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    deleteNotification.mutate(notification.id)
  }

  return (
    <div
      className={`${styles.notification} ${!notification.read ? styles.unread : ''}`}
      onClick={handleClick}
    >
      <div className={styles.icon}>{getIcon(notification.type)}</div>
      <div className={styles.content}>
        <p className={styles.message}>{notification.message}</p>
        <span className={styles.time}>
          {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
        </span>
      </div>
      {showActions && (
        <div className={styles.actions}>
          {!notification.read && (
            <button
              onClick={handleMarkAsRead}
              className={styles.actionButton}
              title="Mark as read"
              disabled={markAsRead.isLoading}
            >
              ✓
            </button>
          )}
          <button
            onClick={handleDelete}
            className={styles.actionButton}
            title="Delete"
            disabled={deleteNotification.isLoading}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  )
}

export default NotificationItem
