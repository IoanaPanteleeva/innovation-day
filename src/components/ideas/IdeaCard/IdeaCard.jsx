import { Link } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import { useUsers } from '../../../hooks/useUsers'
import Card from '../../common/Card/Card'
import IdeaStatusBadge from '../IdeaStatusBadge/IdeaStatusBadge'
import styles from './IdeaCard.module.css'

const IdeaCard = ({ idea }) => {
  const { data: users = [] } = useUsers()
  const assignee = users.find(user => user.id === idea.assignedTo)

  return (
    <Link to={`/ideas/${idea.id}`} className={styles.link}>
      <Card className={styles.card} hover>
        <div className={styles.header}>
          <h3 className={styles.title}>{idea.title}</h3>
          <IdeaStatusBadge status={idea.status} size="sm" />
        </div>

        <p className={styles.description}>
          {idea.description.length > 150
            ? `${idea.description.substring(0, 150)}...`
            : idea.description}
        </p>

        <div className={styles.footer}>
          <span className={styles.date}>
            {formatDistanceToNow(new Date(idea.createdAt), { addSuffix: true })}
          </span>
          {assignee && (
            <span className={styles.assignee}>
              <span className={styles.assigneeIcon}>👤</span>
              {assignee.name}
            </span>
          )}
        </div>
      </Card>
    </Link>
  )
}

export default IdeaCard
