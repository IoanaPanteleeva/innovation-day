import { useTopics } from '../../../hooks/useTopics'
import Loader from '../../common/Loader/Loader'
import styles from './TopicSelector.module.css'

const TopicSelector = ({ value, onChange, error }) => {
  const { data: topics, isLoading } = useTopics()

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Loader size="sm" />
        <span>Loading topics...</span>
      </div>
    )
  }

  return (
    <div className={styles.selector}>
      <label htmlFor="topic" className={styles.label}>
        Select Topic <span className={styles.required}>*</span>
      </label>
      <select
        id="topic"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.select}
      >
        <option value="">Choose a topic</option>
        {topics?.map((topic) => (
          <option key={topic.id} value={topic.id}>
            {topic.title}
          </option>
        ))}
      </select>
      {error && <span className={styles.error}>{error}</span>}

      {value && topics && (
        <div className={styles.description}>
          <strong>Description:</strong>{' '}
          {topics.find((t) => t.id === value)?.description}
        </div>
      )}
    </div>
  )
}

export default TopicSelector
