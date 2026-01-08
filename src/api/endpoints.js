export const ENDPOINTS = {
  // Users
  USERS: '/users',
  USER_BY_ID: (id) => `/users/${id}`,

  // Topics
  TOPICS: '/topics',
  TOPIC_BY_ID: (id) => `/topics/${id}`,

  // Ideas
  IDEAS: '/ideas',
  IDEA_BY_ID: (id) => `/ideas/${id}`,
  IDEAS_BY_USER: (userId) => `/ideas?userId=${userId}`,
  IDEAS_BY_TOPIC: (topicId) => `/ideas?topicId=${topicId}`,
  IDEAS_BY_STATUS: (status) => `/ideas?status=${status}`,

  // Comments
  COMMENTS: '/comments',
  COMMENTS_BY_IDEA: (ideaId) => `/comments?ideaId=${ideaId}`,

  // Notifications
  NOTIFICATIONS: '/notifications',
  NOTIFICATIONS_BY_USER: (userId) => `/notifications?userId=${userId}`,
  NOTIFICATIONS_UNREAD: (userId) => `/notifications?userId=${userId}&read=false`,

  // Invitations
  INVITATIONS: '/invitations',
  INVITATIONS_BY_TOPIC: (topicId) => `/invitations?topicId=${topicId}`,
}
