import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { useCreateInvitation } from '../../../hooks/useInvitations'
import TopicSelector from '../TopicSelector/TopicSelector'
import UserSelector from '../UserSelector/UserSelector'
import Button from '../../common/Button/Button'
import styles from './InvitationForm.module.css'

const InvitationForm = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const createInvitation = useCreateInvitation()

  const [selectedTopic, setSelectedTopic] = useState('')
  const [selectedUsers, setSelectedUsers] = useState([])
  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}

    if (!selectedTopic) {
      newErrors.topic = 'Please select a topic'
    }

    if (selectedUsers.length === 0) {
      newErrors.users = 'Please select at least one employee'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validate()) return

    try {
      await createInvitation.mutateAsync({
        topicId: selectedTopic,
        invitedBy: user.id,
        invitedUsers: selectedUsers,
      })

      // Reset form
      setSelectedTopic('')
      setSelectedUsers([])
      setErrors({})
    } catch (error) {
      console.error('Failed to send invitations:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <TopicSelector
        value={selectedTopic}
        onChange={(value) => {
          setSelectedTopic(value)
          setErrors({ ...errors, topic: '' })
        }}
        error={errors.topic}
      />

      <UserSelector
        selectedUsers={selectedUsers}
        onChange={(users) => {
          setSelectedUsers(users)
          setErrors({ ...errors, users: '' })
        }}
        error={errors.users}
      />

      <div className={styles.actions}>
        <Button type="button" variant="ghost" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={createInvitation.isLoading}
        >
          {createInvitation.isLoading ? 'Sending...' : 'Send Invitations'}
        </Button>
      </div>
    </form>
  )
}

export default InvitationForm
