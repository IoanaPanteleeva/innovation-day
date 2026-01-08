import apiClient from './client'
import { ENDPOINTS } from './endpoints'

export const usersApi = {
  // Get all users
  getAll: async (params = {}) => {
    const { data } = await apiClient.get(ENDPOINTS.USERS, { params })
    return data
  },

  // Get user by ID
  getById: async (id) => {
    const { data } = await apiClient.get(ENDPOINTS.USER_BY_ID(id))
    return data
  },
}
