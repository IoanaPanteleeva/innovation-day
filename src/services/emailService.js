/**
 * Email Service Mock
 * In production, this would integrate with a real email service like SendGrid, AWS SES, etc.
 * For now, it logs email notifications to the console.
 */

/**
 * Sends a notification email (mock implementation)
 */
const sendNotificationEmail = async ({ userId, type, message, ideaId }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('====== EMAIL NOTIFICATION ======')
      console.log(`To User ID: ${userId}`)
      console.log(`Type: ${type}`)
      console.log(`Message: ${message}`)
      if (ideaId) {
        console.log(`Related Idea: ${ideaId}`)
      }
      console.log(`Link: ${window.location.origin}/ideas/${ideaId || ''}`)
      console.log('================================')
      resolve({ success: true })
    }, 100) // Simulate network delay
  })
}

/**
 * Sends a welcome email to new users (mock)
 */
const sendWelcomeEmail = async ({ userId, userEmail, userName }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('====== WELCOME EMAIL ======')
      console.log(`To: ${userEmail}`)
      console.log(`User Name: ${userName}`)
      console.log(`User ID: ${userId}`)
      console.log('===========================')
      resolve({ success: true })
    }, 100)
  })
}

/**
 * Sends an invitation email (mock)
 */
const sendInvitationEmail = async ({ userEmail, topicTitle, invitedBy }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('====== INVITATION EMAIL ======')
      console.log(`To: ${userEmail}`)
      console.log(`Topic: ${topicTitle}`)
      console.log(`Invited By: ${invitedBy}`)
      console.log(`Message: You have been invited to submit ideas for "${topicTitle}"`)
      console.log('==============================')
      resolve({ success: true })
    }, 100)
  })
}

/**
 * Sends a reminder email for approaching deadlines (mock)
 */
const sendDeadlineReminderEmail = async ({ userEmail, topicTitle, deadline }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('====== DEADLINE REMINDER EMAIL ======')
      console.log(`To: ${userEmail}`)
      console.log(`Topic: ${topicTitle}`)
      console.log(`Deadline: ${deadline}`)
      console.log(`Message: The deadline for "${topicTitle}" is approaching`)
      console.log('=====================================')
      resolve({ success: true })
    }, 100)
  })
}

export default {
  sendNotificationEmail,
  sendWelcomeEmail,
  sendInvitationEmail,
  sendDeadlineReminderEmail,
}
