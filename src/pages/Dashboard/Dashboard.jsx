import { Link } from 'react-router-dom'
import { useIdeas } from '../../hooks/useIdeas'
import Card from '../../components/common/Card/Card'
import Button from '../../components/common/Button/Button'
import IdeaList from '../../components/ideas/IdeaList/IdeaList'
import styles from './Dashboard.module.css'

const Dashboard = () => {
  const { data: ideas, isLoading, error } = useIdeas()

  // Calculate stats
  const stats = {
    total: ideas?.length || 0,
    pending: ideas?.filter((i) => i.status === 'pending').length || 0,
    approved: ideas?.filter((i) => i.status === 'approved').length || 0,
    underReview: ideas?.filter((i) => i.status === 'under_review').length || 0,
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <div>
          <h1>Dashboard</h1>
          <p className={styles.subtitle}>Welcome to the Idea Management System</p>
        </div>
        <Link to="/submit-idea">
          <Button variant="primary">
            <span>💡</span>
            Submit New Idea
          </Button>
        </Link>
      </div>

      <div className={styles.grid}>
        <Card padding="lg">
          <h3>Total Ideas</h3>
          <p className={styles.stat}>{stats.total}</p>
        </Card>
        <Card padding="lg">
          <h3>Pending Review</h3>
          <p className={styles.stat}>{stats.pending}</p>
        </Card>
        <Card padding="lg">
          <h3>Under Review</h3>
          <p className={styles.stat}>{stats.underReview}</p>
        </Card>
        <Card padding="lg">
          <h3>Approved</h3>
          <p className={styles.stat}>{stats.approved}</p>
        </Card>
      </div>

      <div className={styles.section}>
        <h2>All Ideas</h2>
        <IdeaList ideas={ideas} isLoading={isLoading} error={error} />
      </div>
    </div>
  )
}

export default Dashboard
