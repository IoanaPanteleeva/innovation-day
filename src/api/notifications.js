import client from './client'
import { ENDPOINTS } from './endpoints'

export const notificationsApi = {
  // Get all notifications for a user
  getByUserId: async (userId, params = {}) => {
    const { data } = await client.get(ENDPOINTS.NOTIFICATIONS, {
      params: { userId, ...params },
    })
    return data
  },

  // Get unread notifications for a user
  getUnread: async (userId) => {
    const { data } = await client.get(ENDPOINTS.NOTIFICATIONS, {
      params: { userId, read: false, _sort: 'createdAt', _order: 'desc' },
    })
    return data
  },

  // Mark notification as read
  markAsRead: async (id) => {
    const { data } = await client.patch(`${ENDPOINTS.NOTIFICATIONS}/${id}`, {
      read: true,
    })
    return data
  },

  // Mark all notifications as read for a user
  markAllAsRead: async (userId) => {
    // Get all unread notifications
    const unread = await notificationsApi.getUnread(userId)

    // Mark each as read
    const promises = unread.map((notification) =>
      client.patch(`${ENDPOINTS.NOTIFICATIONS}/${notification.id}`, {
        read: true,
      })
    )

    await Promise.all(promises)
    return { success: true }
  },

  // Create a new notification
  create: async (notification) => {
    const { data } = await client.post(ENDPOINTS.NOTIFICATIONS, {
      ...notification,
      read: false,
      createdAt: new Date().toISOString(),
    })
    return data
  },

  // Delete a notification
  delete: async (id) => {
    await client.delete(`${ENDPOINTS.NOTIFICATIONS}/${id}`)
    return { id }
  },
}

export default notificationsApi
