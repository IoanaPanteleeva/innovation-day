import { useQuery, useMutation, useQueryClient } from 'react-query'
import { ideasApi } from '../api/ideas'
import { toast } from 'react-toastify'
import notificationService from '../services/notificationService'

// Query keys
export const QUERY_KEYS = {
  IDEAS: 'ideas',
  IDEA: 'idea',
  IDEAS_BY_USER: 'ideas-by-user',
  IDEAS_BY_TOPIC: 'ideas-by-topic',
  IDEAS_BY_STATUS: 'ideas-by-status',
}

// Get all ideas
export const useIdeas = (params = {}) => {
  return useQuery([QUERY_KEYS.IDEAS, params], () => ideasApi.getAll(params), {
    staleTime: 30000, // 30 seconds
  })
}

// Get single idea by ID
export const useIdea = (id) => {
  return useQuery(
    [QUERY_KEYS.IDEA, id],
    () => ideasApi.getById(id),
    {
      enabled: !!id,
      staleTime: 30000,
    }
  )
}

// Get ideas by user
export const useIdeasByUser = (userId) => {
  return useQuery(
    [QUERY_KEYS.IDEAS_BY_USER, userId],
    () => ideasApi.getByUser(userId),
    {
      enabled: !!userId,
      staleTime: 30000,
    }
  )
}

// Get ideas by topic
export const useIdeasByTopic = (topicId) => {
  return useQuery(
    [QUERY_KEYS.IDEAS_BY_TOPIC, topicId],
    () => ideasApi.getByTopic(topicId),
    {
      enabled: !!topicId,
      staleTime: 30000,
    }
  )
}

// Get ideas by status
export const useIdeasByStatus = (status) => {
  return useQuery(
    [QUERY_KEYS.IDEAS_BY_STATUS, status],
    () => ideasApi.getByStatus(status),
    {
      enabled: !!status,
      staleTime: 30000,
    }
  )
}

// Create idea mutation
export const useCreateIdea = () => {
  const queryClient = useQueryClient()

  return useMutation(ideasApi.create, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(QUERY_KEYS.IDEAS)
      queryClient.invalidateQueries(QUERY_KEYS.IDEAS_BY_USER)
      toast.success('Idea submitted successfully!')
    },
    onError: (error) => {
      toast.error('Failed to submit idea. Please try again.')
      console.error('Create idea error:', error)
    },
  })
}

// Update idea mutation
export const useUpdateIdea = () => {
  const queryClient = useQueryClient()

  return useMutation(
    ({ id, data }) => ideasApi.update(id, data),
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(QUERY_KEYS.IDEAS)
        queryClient.invalidateQueries([QUERY_KEYS.IDEA, variables.id])
        queryClient.invalidateQueries(QUERY_KEYS.IDEAS_BY_USER)
        toast.success('Idea updated successfully!')
      },
      onError: (error) => {
        toast.error('Failed to update idea. Please try again.')
        console.error('Update idea error:', error)
      },
    }
  )
}

// Update idea status mutation (for admin)
export const useUpdateIdeaStatus = () => {
  const queryClient = useQueryClient()

  return useMutation(
    ({ id, status, reviewNotes }) => ideasApi.updateStatus(id, status, reviewNotes),
    {
      onSuccess: async (data, variables) => {
        queryClient.invalidateQueries(QUERY_KEYS.IDEAS)
        queryClient.invalidateQueries([QUERY_KEYS.IDEA, variables.id])
        queryClient.invalidateQueries(QUERY_KEYS.IDEAS_BY_STATUS)

        const statusMessages = {
          approved: 'Idea approved!',
          declined: 'Idea declined.',
          under_review: 'Idea moved to under review.',
          needs_info: 'Idea marked as needs more information.',
        }

        toast.success(statusMessages[variables.status] || 'Idea status updated!')

        // Trigger notification to idea author
        try {
          await notificationService.notifyOnStatusChange({
            ideaAuthorId: data.userId,
            ideaId: data.id,
            ideaTitle: data.title,
            newStatus: variables.status,
          })
          queryClient.invalidateQueries('unreadNotifications')
        } catch (error) {
          console.error('Failed to send status change notification:', error)
        }
      },
      onError: (error) => {
        toast.error('Failed to update idea status. Please try again.')
        console.error('Update idea status error:', error)
      },
    }
  )
}

// Assign idea mutation (for admin)
export const useAssignIdea = () => {
  const queryClient = useQueryClient()

  return useMutation(
    ({ id, assignedTo }) => ideasApi.assignIdea(id, assignedTo),
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(QUERY_KEYS.IDEAS)
        queryClient.invalidateQueries([QUERY_KEYS.IDEA, variables.id])
        toast.success('Idea assigned successfully!')
      },
      onError: (error) => {
        toast.error('Failed to assign idea. Please try again.')
        console.error('Assign idea error:', error)
      },
    }
  )
}

// Delete idea mutation
export const useDeleteIdea = () => {
  const queryClient = useQueryClient()

  return useMutation(ideasApi.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.IDEAS)
      queryClient.invalidateQueries(QUERY_KEYS.IDEAS_BY_USER)
      toast.success('Idea deleted successfully!')
    },
    onError: (error) => {
      toast.error('Failed to delete idea. Please try again.')
      console.error('Delete idea error:', error)
    },
  })
}
