import apiClient from './client'
import { ENDPOINTS } from './endpoints'

export const commentsApi = {
  // Get comments by idea
  getByIdea: async (ideaId) => {
    const { data } = await apiClient.get(ENDPOINTS.COMMENTS_BY_IDEA(ideaId))
    return data
  },

  // Create new comment
  create: async (commentData) => {
    const { data } = await apiClient.post(ENDPOINTS.COMMENTS, commentData)
    return data
  },

  // Update comment
  update: async (id, commentData) => {
    const { data } = await apiClient.patch(`${ENDPOINTS.COMMENTS}/${id}`, commentData)
    return data
  },

  // Delete comment
  delete: async (id) => {
    const { data } = await apiClient.delete(`${ENDPOINTS.COMMENTS}/${id}`)
    return data
  },
}
