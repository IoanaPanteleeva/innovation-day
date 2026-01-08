import { useQuery } from 'react-query'
import { usersApi } from '../api/users'

// Query keys
export const QUERY_KEYS = {
  USERS: 'users',
  USER: 'user',
}

// Get all users
export const useUsers = (params = {}) => {
  return useQuery([QUERY_KEYS.USERS, params], () => usersApi.getAll(params), {
    staleTime: 60000, // 1 minute
  })
}

// Get single user by ID
export const useUser = (id) => {
  return useQuery(
    [QUERY_KEYS.USER, id],
    () => usersApi.getById(id),
    {
      enabled: !!id,
      staleTime: 60000,
    }
  )
}
