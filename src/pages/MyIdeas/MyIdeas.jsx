import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useIdeasByUser } from '../../hooks/useIdeas'
import Button from '../../components/common/Button/Button'
import IdeaList from '../../components/ideas/IdeaList/IdeaList'
import styles from './MyIdeas.module.css'

const MyIdeas = () => {
  const { user } = useAuth()
  const { data: ideas, isLoading, error } = useIdeasByUser(user?.id)

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1>My Ideas</h1>
          <p className={styles.subtitle}>Track and manage your submitted ideas</p>
        </div>
        <Link to="/submit-idea">
          <Button variant="primary">
            <span>💡</span>
            Submit New Idea
          </Button>
        </Link>
      </div>

      <IdeaList ideas={ideas} isLoading={isLoading} error={error} />
    </div>
  )
}

export default MyIdeas
