import { useState } from 'react'
import { useUpdateIdeaStatus, useAssignIdea } from '../../../hooks/useIdeas'
import { useUsers } from '../../../hooks/useUsers'
import Button from '../../common/Button/Button'
import { Textarea } from '../../common/Input/Input'
import Modal from '../../common/Modal/Modal'
import styles from './AdminReviewPanel.module.css'

const AdminReviewPanel = ({ idea, onSuccess }) => {
  const [showModal, setShowModal] = useState(false)
  const [selectedAction, setSelectedAction] = useState(null)
  const [reviewNotes, setReviewNotes] = useState('')
  const updateStatus = useUpdateIdeaStatus()
  const assignIdea = useAssignIdea()
  const { data: users = [] } = useUsers()

  // Filter only admin users
  const adminUsers = users.filter(user => user.role === 'admin')

  const handleActionClick = (action) => {
    setSelectedAction(action)
    setShowModal(true)
  }

  const handleAssignment = async (e) => {
    const assignedTo = e.target.value === '' ? null : e.target.value
    try {
      await assignIdea.mutateAsync({
        id: idea.id,
        assignedTo,
      })
      onSuccess?.()
    } catch (error) {
      console.error('Failed to assign idea:', error)
    }
  }

  const handleSubmit = async () => {
    if (!selectedAction) return

    try {
      await updateStatus.mutateAsync({
        id: idea.id,
        status: selectedAction.status,
        reviewNotes: reviewNotes.trim() || null,
      })
      setShowModal(false)
      setReviewNotes('')
      onSuccess?.()
    } catch (error) {
      console.error('Failed to update status:', error)
    }
  }

  const actions = [
    {
      status: 'approved',
      label: 'Approve',
      variant: 'primary',
      icon: '✓',
    },
    {
      status: 'declined',
      label: 'Decline',
      variant: 'danger',
      icon: '✕',
    },
    {
      status: 'under_review',
      label: 'Under Review',
      variant: 'secondary',
      icon: '👁',
    },
    {
      status: 'needs_info',
      label: 'Needs Info',
      variant: 'ghost',
      icon: '❓',
    },
  ]

  // Don't show panel if already approved or declined
  if (idea.status === 'approved' || idea.status === 'declined') {
    return null
  }

  return (
    <>
      <div className={styles.panel}>
        <h3 className={styles.title}>Admin Actions</h3>
        <p className={styles.subtitle}>Review and update the status of this idea</p>

        <div className={styles.assignmentSection}>
          <label htmlFor="assignee" className={styles.assignmentLabel}>
            Assign To:
          </label>
          <select
            id="assignee"
            value={idea.assignedTo || ''}
            onChange={handleAssignment}
            disabled={assignIdea.isLoading}
            className={styles.assignmentSelect}
          >
            <option value="">Unassigned</option>
            {adminUsers.map((admin) => (
              <option key={admin.id} value={admin.id}>
                {admin.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.actions}>
          {actions.map((action) => (
            <Button
              key={action.status}
              variant={action.variant}
              onClick={() => handleActionClick(action)}
              fullWidth
            >
              <span className={styles.icon}>{action.icon}</span>
              {action.label}
            </Button>
          ))}
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
          setReviewNotes('')
        }}
        title={`${selectedAction?.label} Idea`}
        size="md"
      >
        <div className={styles.modalContent}>
          <p className={styles.modalText}>
            You are about to change the status to <strong>{selectedAction?.label}</strong>.
            {selectedAction?.status === 'declined' && ' This action cannot be easily undone.'}
          </p>

          <Textarea
            label="Review Notes (Optional)"
            placeholder="Add notes about your decision..."
            value={reviewNotes}
            onChange={(e) => setReviewNotes(e.target.value)}
            rows={4}
            fullWidth
          />

          <div className={styles.modalActions}>
            <Button
              variant="ghost"
              onClick={() => {
                setShowModal(false)
                setReviewNotes('')
              }}
            >
              Cancel
            </Button>
            <Button
              variant={selectedAction?.variant || 'primary'}
              onClick={handleSubmit}
              disabled={updateStatus.isLoading}
            >
              {updateStatus.isLoading ? 'Updating...' : `Confirm ${selectedAction?.label}`}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default AdminReviewPanel
