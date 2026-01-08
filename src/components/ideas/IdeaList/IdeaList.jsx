import IdeaCard from '../IdeaCard/IdeaCard'
import Loader from '../../common/Loader/Loader'
import styles from './IdeaList.module.css'

const IdeaList = ({ ideas, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className={styles.center}>
        <Loader size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.center}>
        <p className={styles.error}>Failed to load ideas. Please try again.</p>
      </div>
    )
  }

  if (!ideas || ideas.length === 0) {
    return (
      <div className={styles.center}>
        <p className={styles.empty}>No ideas yet. Be the first to submit one!</p>
      </div>
    )
  }

  return (
    <div className={styles.grid}>
      {ideas.map((idea) => (
        <IdeaCard key={idea.id} idea={idea} />
      ))}
    </div>
  )
}

export default IdeaList
