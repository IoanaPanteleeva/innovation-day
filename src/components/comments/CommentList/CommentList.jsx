import { useCommentsByIdea } from '../../../hooks/useComments'
import CommentItem from '../CommentItem/CommentItem'
import Loader from '../../common/Loader/Loader'
import styles from './CommentList.module.css'

// Mock user lookup - in real app, fetch from API
const mockUsers = {
  user_1: { id: 'user_1', name: 'John Admin', role: 'admin' },
  user_2: { id: 'user_2', name: 'Jane Employee', role: 'employee' },
  user_3: { id: 'user_3', name: 'Bob Smith', role: 'employee' },
}

const CommentList = ({ ideaId }) => {
  const { data: comments, isLoading, error } = useCommentsByIdea(ideaId)

  if (isLoading) {
    return (
      <div className={styles.center}>
        <Loader />
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.center}>
        <p className={styles.error}>Failed to load comments</p>
      </div>
    )
  }

  if (!comments || comments.length === 0) {
    return (
      <div className={styles.center}>
        <p className={styles.empty}>No comments yet. Be the first to comment!</p>
      </div>
    )
  }

  return (
    <div className={styles.list}>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          user={mockUsers[comment.userId]}
        />
      ))}
    </div>
  )
}

export default CommentList
