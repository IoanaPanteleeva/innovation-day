import { Link } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import { useUsers } from '../../../hooks/useUsers'
import IdeaStatusBadge from '../IdeaStatusBadge/IdeaStatusBadge'
import styles from './IdeaListItem.module.css'

const IdeaListItem = ({ idea }) => {
  const { data: users = [] } = useUsers()
  const assignee = users.find(user => user.id === idea.assignedTo)
  const author = users.find(user => user.id === idea.userId)

  return (
    <Link to={`/ideas/${idea.id}`} className={styles.link}>
      <div className={styles.listItem}>
        <div className={styles.main}>
          <div className={styles.titleSection}>
            <h3 className={styles.title}>{idea.title}</h3>
            <IdeaStatusBadge status={idea.status} size="sm" />
          </div>
          <p className={styles.description}>
            {idea.description.length > 200
              ? `${idea.description.substring(0, 200)}...`
              : idea.description}
          </p>
        </div>

        <div className={styles.meta}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Author:</span>
            <span className={styles.metaValue}>{author?.name || 'Unknown'}</span>
          </div>
          {assignee && (
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Assigned:</span>
              <span className={styles.metaValue}>
                <span className={styles.assigneeIcon}>👤</span>
                {assignee.name}
              </span>
            </div>
          )}
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Created:</span>
            <span className={styles.metaValue}>
              {formatDistanceToNow(new Date(idea.createdAt), { addSuffix: true })}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default IdeaListItem
