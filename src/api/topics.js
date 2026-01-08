import apiClient from './client'
import { ENDPOINTS } from './endpoints'

export const topicsApi = {
  // Get all topics
  getAll: async (params = {}) => {
    const { data } = await apiClient.get(ENDPOINTS.TOPICS, { params })
    return data
  },

  // Get topic by ID
  getById: async (id) => {
    const { data } = await apiClient.get(ENDPOINTS.TOPIC_BY_ID(id))
    return data
  },

  // Create new topic
  create: async (topicData) => {
    const { data } = await apiClient.post(ENDPOINTS.TOPICS, {
      ...topicData,
      status: 'active',
    })
    return data
  },

  // Update topic
  update: async (id, topicData) => {
    const { data } = await apiClient.patch(ENDPOINTS.TOPIC_BY_ID(id), topicData)
    return data
  },

  // Delete topic
  delete: async (id) => {
    const { data } = await apiClient.delete(ENDPOINTS.TOPIC_BY_ID(id))
    return data
  },
}
