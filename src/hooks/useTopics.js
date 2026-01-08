import { useQuery } from 'react-query'
import { topicsApi } from '../api/topics'

// Query keys
export const QUERY_KEYS = {
  TOPICS: 'topics',
  TOPIC: 'topic',
}

// Get all topics
export const useTopics = (params = {}) => {
  return useQuery([QUERY_KEYS.TOPICS, params], () => topicsApi.getAll(params), {
    staleTime: 60000, // 1 minute
  })
}

// Get single topic by ID
export const useTopic = (id) => {
  return useQuery(
    [QUERY_KEYS.TOPIC, id],
    () => topicsApi.getById(id),
    {
      enabled: !!id,
      staleTime: 60000,
    }
  )
}
