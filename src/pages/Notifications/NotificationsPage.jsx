import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNotifications, useMarkAllAsRead } from '../../hooks/useNotifications'
import Card from '../../components/common/Card/Card'
import Button from '../../components/common/Button/Button'
import NotificationItem from '../../components/notifications/NotificationItem/NotificationItem'
import Loader from '../../components/common/Loader/Loader'
import styles from './NotificationsPage.module.css'

const NotificationsPage = () => {
  const { user } = useAuth()
  const [filter, setFilter] = useState('all') // 'all' or 'unread'
  const markAllAsRead = useMarkAllAsRead()

  const { data: allNotifications = [], isLoading } = useNotifications(user?.id)

  const filteredNotifications =
    filter === 'unread'
      ? allNotifications.filter((n) => !n.read)
      : allNotifications

  const unreadCount = allNotifications.filter((n) => !n.read).length

  const handleMarkAllAsRead = () => {
    markAllAsRead.mutate(user?.id)
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1>Notifications</h1>
          <p className={styles.subtitle}>
            Stay up to date with your ideas and invitations
          </p>
        </div>
      </div>

      <Card padding="none" className={styles.card}>
        <div className={styles.toolbar}>
          <div className={styles.filters}>
            <button
              className={`${styles.filterButton} ${filter === 'all' ? styles.active : ''}`}
              onClick={() => setFilter('all')}
            >
              All ({allNotifications.length})
            </button>
            <button
              className={`${styles.filterButton} ${filter === 'unread' ? styles.active : ''}`}
              onClick={() => setFilter('unread')}
            >
              Unread ({unreadCount})
            </button>
          </div>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllAsRead}
              disabled={markAllAsRead.isLoading}
            >
              Mark all as read
            </Button>
          )}
        </div>

        <div className={styles.list}>
          {isLoading ? (
            <div className={styles.loading}>
              <Loader />
              <span>Loading notifications...</span>
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className={styles.empty}>
              <span className={styles.emptyIcon}>
                {filter === 'unread' ? '✓' : '🔕'}
              </span>
              <h3>
                {filter === 'unread'
                  ? 'All caught up!'
                  : 'No notifications yet'}
              </h3>
              <p>
                {filter === 'unread'
                  ? 'You have no unread notifications'
                  : 'Notifications will appear here when you receive them'}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                showActions={true}
              />
            ))
          )}
        </div>
      </Card>
    </div>
  )
}

export default NotificationsPage
