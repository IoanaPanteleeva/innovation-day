import { useQuery, useMutation, useQueryClient } from 'react-query'
import { commentsApi } from '../api/comments'
import { ideasApi } from '../api/ideas'
import { toast } from 'react-toastify'
import notificationService from '../services/notificationService'

// Query keys
export const QUERY_KEYS = {
  COMMENTS: 'comments',
  COMMENTS_BY_IDEA: 'comments-by-idea',
}

// Get comments by idea
export const useCommentsByIdea = (ideaId) => {
  return useQuery(
    [QUERY_KEYS.COMMENTS_BY_IDEA, ideaId],
    () => commentsApi.getByIdea(ideaId),
    {
      enabled: !!ideaId,
      staleTime: 30000,
    }
  )
}

// Create comment mutation
export const useCreateComment = () => {
  const queryClient = useQueryClient()

  return useMutation(commentsApi.create, {
    onSuccess: async (data) => {
      queryClient.invalidateQueries([QUERY_KEYS.COMMENTS_BY_IDEA, data.ideaId])
      toast.success('Comment added successfully!')

      // Trigger notification to idea author
      try {
        // Fetch the idea to get author info
        const idea = await ideasApi.getById(data.ideaId)

        // Only notify if the commenter is not the idea author
        if (idea.userId !== data.userId) {
          await notificationService.notifyOnComment({
            ideaAuthorId: idea.userId,
            commentAuthor: data.userName,
            ideaId: idea.id,
            ideaTitle: idea.title,
          })
          queryClient.invalidateQueries('unreadNotifications')
        }
      } catch (error) {
        console.error('Failed to send comment notification:', error)
      }
    },
    onError: (error) => {
      toast.error('Failed to add comment. Please try again.')
      console.error('Create comment error:', error)
    },
  })
}

// Delete comment mutation
export const useDeleteComment = () => {
  const queryClient = useQueryClient()

  return useMutation(commentsApi.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.COMMENTS_BY_IDEA)
      toast.success('Comment deleted successfully!')
    },
    onError: (error) => {
      toast.error('Failed to delete comment. Please try again.')
      console.error('Delete comment error:', error)
    },
  })
}
