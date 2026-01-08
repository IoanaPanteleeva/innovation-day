import { useQuery, useMutation, useQueryClient } from 'react-query'
import { invitationsApi } from '../api/invitations'
import { topicsApi } from '../api/topics'
import { usersApi } from '../api/users'
import { toast } from 'react-toastify'
import notificationService from '../services/notificationService'

// Query keys
export const QUERY_KEYS = {
  INVITATIONS: 'invitations',
  INVITATIONS_BY_TOPIC: 'invitations-by-topic',
}

// Get all invitations
export const useInvitations = (params = {}) => {
  return useQuery([QUERY_KEYS.INVITATIONS, params], () => invitationsApi.getAll(params), {
    staleTime: 30000,
  })
}

// Get invitations by topic
export const useInvitationsByTopic = (topicId) => {
  return useQuery(
    [QUERY_KEYS.INVITATIONS_BY_TOPIC, topicId],
    () => invitationsApi.getByTopic(topicId),
    {
      enabled: !!topicId,
      staleTime: 30000,
    }
  )
}

// Create invitation mutation
export const useCreateInvitation = () => {
  const queryClient = useQueryClient()

  return useMutation(invitationsApi.create, {
    onSuccess: async (data) => {
      queryClient.invalidateQueries(QUERY_KEYS.INVITATIONS)
      queryClient.invalidateQueries(QUERY_KEYS.INVITATIONS_BY_TOPIC)
      toast.success('Invitations sent successfully!')

      // Trigger notifications to invited users
      try {
        // Fetch topic details
        const topic = await topicsApi.getById(data.topicId)

        // Fetch inviter details
        const inviter = await usersApi.getById(data.invitedBy)

        // Send notification to each invited user
        const notificationPromises = data.invitedUsers.map((userId) =>
          notificationService.notifyOnInvitation({
            userId,
            topicTitle: topic.title,
            invitedBy: inviter.name,
          })
        )

        await Promise.all(notificationPromises)
        queryClient.invalidateQueries('unreadNotifications')
      } catch (error) {
        console.error('Failed to send invitation notifications:', error)
      }
    },
    onError: (error) => {
      toast.error('Failed to send invitations. Please try again.')
      console.error('Create invitation error:', error)
    },
  })
}
