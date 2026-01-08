import apiClient from './client'
import { ENDPOINTS } from './endpoints'

export const ideasApi = {
  // Get all ideas
  getAll: async (params = {}) => {
    const { data } = await apiClient.get(ENDPOINTS.IDEAS, { params })
    return data
  },

  // Get idea by ID
  getById: async (id) => {
    const { data } = await apiClient.get(ENDPOINTS.IDEA_BY_ID(id))
    return data
  },

  // Get ideas by user
  getByUser: async (userId) => {
    const { data } = await apiClient.get(ENDPOINTS.IDEAS_BY_USER(userId))
    return data
  },

  // Get ideas by topic
  getByTopic: async (topicId) => {
    const { data } = await apiClient.get(ENDPOINTS.IDEAS_BY_TOPIC(topicId))
    return data
  },

  // Get ideas by status
  getByStatus: async (status) => {
    const { data } = await apiClient.get(ENDPOINTS.IDEAS_BY_STATUS(status))
    return data
  },

  // Create new idea
  create: async (ideaData) => {
    const { data } = await apiClient.post(ENDPOINTS.IDEAS, {
      ...ideaData,
      status: 'pending',
      attachments: [],
      reviewedBy: null,
      reviewedAt: null,
      reviewNotes: null,
    })
    return data
  },

  // Update idea
  update: async (id, ideaData) => {
    const { data } = await apiClient.patch(ENDPOINTS.IDEA_BY_ID(id), ideaData)
    return data
  },

  // Update idea status (for admin)
  updateStatus: async (id, status, reviewNotes) => {
    const { data } = await apiClient.patch(ENDPOINTS.IDEA_BY_ID(id), {
      status,
      reviewNotes,
      reviewedAt: new Date().toISOString(),
    })
    return data
  },

  // Assign idea to admin (for admin)
  assignIdea: async (id, assignedTo) => {
    const { data } = await apiClient.patch(ENDPOINTS.IDEA_BY_ID(id), {
      assignedTo,
    })
    return data
  },

  // Delete idea
  delete: async (id) => {
    const { data } = await apiClient.delete(ENDPOINTS.IDEA_BY_ID(id))
    return data
  },
}
