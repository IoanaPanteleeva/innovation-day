import apiClient from './client'
import { ENDPOINTS } from './endpoints'

export const invitationsApi = {
  // Get all invitations
  getAll: async (params = {}) => {
    const { data } = await apiClient.get(ENDPOINTS.INVITATIONS, { params })
    return data
  },

  // Get invitations by topic
  getByTopic: async (topicId) => {
    const { data } = await apiClient.get(ENDPOINTS.INVITATIONS_BY_TOPIC(topicId))
    return data
  },

  // Create new invitation
  create: async (invitationData) => {
    const { data } = await apiClient.post(ENDPOINTS.INVITATIONS, {
      ...invitationData,
      status: 'sent',
    })
    return data
  },
}
