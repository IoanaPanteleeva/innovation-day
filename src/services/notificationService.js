import notificationsApi from '../api/notifications'
import emailService from './emailService'

/**
 * Creates a notification and optionally sends an email
 */
const createNotification = async ({ userId, type, message, ideaId, emailSent = false }) => {
  try {
    // Create the notification
    const notification = await notificationsApi.create({
      userId,
      type,
      message,
      ideaId,
      emailSent,
    })

    // Send email notification if enabled
    if (import.meta.env.VITE_ENABLE_EMAIL_NOTIFICATIONS === 'true') {
      await emailService.sendNotificationEmail({
        userId,
        type,
        message,
        ideaId,
      })

      // Update notification to mark email as sent
      await notificationsApi.markAsRead(notification.id)
    }

    return notification
  } catch (error) {
    console.error('Failed to create notification:', error)
    throw error
  }
}

/**
 * Notify idea author when their idea receives a comment
 */
export const notifyOnComment = async ({ ideaAuthorId, commentAuthor, ideaId, ideaTitle }) => {
  return createNotification({
    userId: ideaAuthorId,
    type: 'comment',
    message: `${commentAuthor} commented on your idea "${ideaTitle}"`,
    ideaId,
  })
}

/**
 * Notify idea author when their idea's status changes
 */
export const notifyOnStatusChange = async ({ ideaAuthorId, ideaId, ideaTitle, newStatus }) => {
  const statusMessages = {
    approved: `Your idea "${ideaTitle}" has been approved!`,
    declined: `Your idea "${ideaTitle}" has been declined`,
    under_review: `Your idea "${ideaTitle}" is now under review`,
    needs_info: `Your idea "${ideaTitle}" needs more information`,
  }

  return createNotification({
    userId: ideaAuthorId,
    type: 'status_change',
    message: statusMessages[newStatus] || `Your idea "${ideaTitle}" status has changed`,
    ideaId,
  })
}

/**
 * Notify users when they are invited to submit ideas for a topic
 */
export const notifyOnInvitation = async ({ userId, topicTitle, invitedBy }) => {
  return createNotification({
    userId,
    type: 'invitation',
    message: `${invitedBy} invited you to submit ideas for "${topicTitle}"`,
  })
}

/**
 * Notify admin when an employee responds to their question
 */
export const notifyOnQuestionResponse = async ({ adminId, employeeName, ideaId, ideaTitle }) => {
  return createNotification({
    userId: adminId,
    type: 'question',
    message: `${employeeName} responded to your question on "${ideaTitle}"`,
    ideaId,
  })
}

/**
 * Notify users about approaching deadlines
 */
export const notifyOnDeadline = async ({ userId, topicTitle, deadline }) => {
  return createNotification({
    userId,
    type: 'deadline_reminder',
    message: `Reminder: The deadline for "${topicTitle}" is approaching (${deadline})`,
  })
}

export default {
  createNotification,
  notifyOnComment,
  notifyOnStatusChange,
  notifyOnInvitation,
  notifyOnQuestionResponse,
  notifyOnDeadline,
}
