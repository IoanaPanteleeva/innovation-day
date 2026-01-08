import { useQuery, useMutation, useQueryClient } from 'react-query'
import notificationsApi from '../api/notifications'
import { toast } from 'react-toastify'

export const QUERY_KEYS = {
  NOTIFICATIONS: 'notifications',
  UNREAD_NOTIFICATIONS: 'unreadNotifications',
}

// Get all notifications for a user
export const useNotifications = (userId, options = {}) => {
  return useQuery(
    [QUERY_KEYS.NOTIFICATIONS, userId],
    () => notificationsApi.getByUserId(userId, { _sort: 'createdAt', _order: 'desc' }),
    {
      enabled: !!userId,
      ...options,
    }
  )
}

// Get unread notifications for a user
export const useUnreadNotifications = (userId, options = {}) => {
  return useQuery(
    [QUERY_KEYS.UNREAD_NOTIFICATIONS, userId],
    () => notificationsApi.getUnread(userId),
    {
      enabled: !!userId,
      refetchInterval: 30000, // Poll every 30 seconds
      ...options,
    }
  )
}

// Mark notification as read
export const useMarkAsRead = () => {
  const queryClient = useQueryClient()

  return useMutation(notificationsApi.markAsRead, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.NOTIFICATIONS)
      queryClient.invalidateQueries(QUERY_KEYS.UNREAD_NOTIFICATIONS)
    },
  })
}

// Mark all notifications as read
export const useMarkAllAsRead = () => {
  const queryClient = useQueryClient()

  return useMutation(notificationsApi.markAllAsRead, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.NOTIFICATIONS)
      queryClient.invalidateQueries(QUERY_KEYS.UNREAD_NOTIFICATIONS)
      toast.success('All notifications marked as read')
    },
  })
}

// Create a notification
export const useCreateNotification = () => {
  const queryClient = useQueryClient()

  return useMutation(notificationsApi.create, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.NOTIFICATIONS)
      queryClient.invalidateQueries(QUERY_KEYS.UNREAD_NOTIFICATIONS)
    },
  })
}

// Delete a notification
export const useDeleteNotification = () => {
  const queryClient = useQueryClient()

  return useMutation(notificationsApi.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.NOTIFICATIONS)
      queryClient.invalidateQueries(QUERY_KEYS.UNREAD_NOTIFICATIONS)
      toast.success('Notification deleted')
    },
  })
}
