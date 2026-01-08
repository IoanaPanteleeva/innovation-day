import { Link } from 'react-router-dom'
import { useIdeas, useIdeasByStatus } from '../../hooks/useIdeas'
import Card from '../../components/common/Card/Card'
import Button from '../../components/common/Button/Button'
import IdeaList from '../../components/ideas/IdeaList/IdeaList'
import styles from './AdminDashboard.module.css'

const AdminDashboard = () => {
  const { data: allIdeas } = useIdeas()
  const { data: pendingIdeas, isLoading, error } = useIdeasByStatus('pending')

  // Calculate stats
  const stats = {
    total: allIdeas?.length || 0,
    pending: allIdeas?.filter((i) => i.status === 'pending').length || 0,
    underReview: allIdeas?.filter((i) => i.status === 'under_review').length || 0,
    approved: allIdeas?.filter((i) => i.status === 'approved').length || 0,
    declined: allIdeas?.filter((i) => i.status === 'declined').length || 0,
    needsInfo: allIdeas?.filter((i) => i.status === 'needs_info').length || 0,
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <div>
          <h1>Admin Dashboard</h1>
          <p className={styles.subtitle}>Manage and review submitted ideas</p>
        </div>
        <Link to="/admin/review">
          <Button variant="primary">
            <span>✅</span>
            Review Ideas
          </Button>
        </Link>
      </div>

      <div className={styles.grid}>
        <Card padding="lg">
          <h3>Total Ideas</h3>
          <p className={styles.stat}>{stats.total}</p>
        </Card>
        <Card padding="lg" className={styles.pendingCard}>
          <h3>Pending</h3>
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
        <Card padding="lg">
          <h3>Declined</h3>
          <p className={styles.stat}>{stats.declined}</p>
        </Card>
        <Card padding="lg">
          <h3>Needs Info</h3>
          <p className={styles.stat}>{stats.needsInfo}</p>
        </Card>
      </div>

      <div className={styles.section}>
        <h2>Pending Ideas</h2>
        <p className={styles.sectionSubtitle}>
          Ideas waiting for review. Click on any idea to review and approve or decline.
        </p>
        <IdeaList ideas={pendingIdeas} isLoading={isLoading} error={error} />
      </div>
    </div>
  )
}

export default AdminDashboard
