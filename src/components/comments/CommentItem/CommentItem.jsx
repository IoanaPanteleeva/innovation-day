import { formatDistanceToNow } from 'date-fns'
import Badge from '../../common/Badge/Badge'
import styles from './CommentItem.module.css'

const CommentItem = ({ comment, user }) => {
  const isQuestion = comment.type === 'question'

  return (
    <div className={styles.comment}>
      <div className={styles.header}>
        <div className={styles.author}>
          <div className={styles.avatar}>
            {user?.name.split(' ').map(n => n[0]).join('') || '?'}
          </div>
          <div>
            <div className={styles.name}>{user?.name || 'Unknown User'}</div>
            <div className={styles.date}>
              {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
            </div>
          </div>
        </div>
        {isQuestion && <Badge variant="info" size="sm">Question</Badge>}
      </div>
      <p className={styles.content}>{comment.content}</p>
    </div>
  )
}

export default CommentItem
