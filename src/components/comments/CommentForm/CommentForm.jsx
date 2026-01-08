import { useState } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import { useCreateComment } from '../../../hooks/useComments'
import { Textarea } from '../../common/Input/Input'
import Button from '../../common/Button/Button'
import styles from './CommentForm.module.css'

const CommentForm = ({ ideaId, onSuccess }) => {
  const { user, isAdmin } = useAuth()
  const [content, setContent] = useState('')
  const [type, setType] = useState('comment')
  const createComment = useCreateComment()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!content.trim()) return

    try {
      await createComment.mutateAsync({
        ideaId,
        userId: user.id,
        content: content.trim(),
        type,
      })
      setContent('')
      onSuccess?.()
    } catch (error) {
      console.error('Failed to add comment:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Textarea
        placeholder={isAdmin() ? "Add a comment or ask a question..." : "Add a comment..."}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        fullWidth
        required
      />

      <div className={styles.actions}>
        {isAdmin() && (
          <div className={styles.typeSelector}>
            <label className={styles.radio}>
              <input
                type="radio"
                value="comment"
                checked={type === 'comment'}
                onChange={(e) => setType(e.target.value)}
              />
              <span>Comment</span>
            </label>
            <label className={styles.radio}>
              <input
                type="radio"
                value="question"
                checked={type === 'question'}
                onChange={(e) => setType(e.target.value)}
              />
              <span>Question</span>
            </label>
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          disabled={createComment.isLoading || !content.trim()}
        >
          {createComment.isLoading ? 'Adding...' : 'Add Comment'}
        </Button>
      </div>
    </form>
  )
}

export default CommentForm
