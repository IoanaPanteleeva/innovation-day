import { formatDistanceToNow } from 'date-fns'
import IdeaStatusBadge from '../IdeaStatusBadge/IdeaStatusBadge'
import styles from './IdeaDetail.module.css'

const IdeaDetail = ({ idea, author }) => {
  return (
    <div className={styles.detail}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>{idea.title}</h1>
          <div className={styles.meta}>
            <span className={styles.author}>
              By {author?.name || 'Unknown User'}
            </span>
            <span className={styles.separator}>•</span>
            <span className={styles.date}>
              {formatDistanceToNow(new Date(idea.createdAt), { addSuffix: true })}
            </span>
          </div>
        </div>
        <IdeaStatusBadge status={idea.status} size="lg" />
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Description</h3>
        <p className={styles.text}>{idea.description}</p>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Benefits</h3>
        <p className={styles.text}>{idea.benefits}</p>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Implementation</h3>
        <p className={styles.text}>{idea.implementation}</p>
      </div>

      {idea.reviewNotes && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Review Notes</h3>
          <div className={styles.reviewNotes}>
            <p className={styles.text}>{idea.reviewNotes}</p>
            {idea.reviewedAt && (
              <p className={styles.reviewDate}>
                Reviewed {formatDistanceToNow(new Date(idea.reviewedAt), { addSuffix: true })}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default IdeaDetail
