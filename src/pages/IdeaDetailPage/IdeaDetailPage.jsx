import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useIdea } from '../../hooks/useIdeas'
import Card from '../../components/common/Card/Card'
import Button from '../../components/common/Button/Button'
import Loader from '../../components/common/Loader/Loader'
import IdeaDetail from '../../components/ideas/IdeaDetail/IdeaDetail'
import AdminReviewPanel from '../../components/ideas/AdminReviewPanel/AdminReviewPanel'
import CommentList from '../../components/comments/CommentList/CommentList'
import CommentForm from '../../components/comments/CommentForm/CommentForm'
import styles from './IdeaDetailPage.module.css'

// Mock user lookup
const mockUsers = {
  user_1: { id: 'user_1', name: 'John Admin', role: 'admin' },
  user_2: { id: 'user_2', name: 'Jane Employee', role: 'employee' },
  user_3: { id: 'user_3', name: 'Bob Smith', role: 'employee' },
}

const IdeaDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAdmin } = useAuth()
  const { data: idea, isLoading, error } = useIdea(id)

  if (isLoading) {
    return (
      <div className={styles.center}>
        <Loader size="lg" />
      </div>
    )
  }

  if (error || !idea) {
    return (
      <div className={styles.center}>
        <Card padding="lg">
          <h2>Idea Not Found</h2>
          <p className={styles.errorText}>
            The idea you're looking for doesn't exist or has been removed.
          </p>
          <Button variant="primary" onClick={() => navigate('/')}>
            Go to Dashboard
          </Button>
        </Card>
      </div>
    )
  }

  const author = mockUsers[idea.userId]

  return (
    <div className={styles.page}>
      <Button variant="ghost" onClick={() => navigate(-1)} className={styles.backButton}>
        ← Back
      </Button>

      <Card padding="lg" className={styles.card}>
        <IdeaDetail idea={idea} author={author} />
      </Card>

      {isAdmin() && (
        <Card padding="lg" className={styles.card}>
          <AdminReviewPanel idea={idea} />
        </Card>
      )}

      <Card padding="lg" className={styles.card}>
        <h2 className={styles.sectionTitle}>Comments</h2>
        <CommentList ideaId={idea.id} />
        <div className={styles.divider} />
        <CommentForm ideaId={idea.id} />
      </Card>
    </div>
  )
}

export default IdeaDetailPage
