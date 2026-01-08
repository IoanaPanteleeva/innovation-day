import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useIdeas } from '../../hooks/useIdeas'
import Card from '../../components/common/Card/Card'
import IdeaList from '../../components/ideas/IdeaList/IdeaList'
import IdeaListItem from '../../components/ideas/IdeaListItem/IdeaListItem'
import Loader from '../../components/common/Loader/Loader'
import styles from './ReviewIdeas.module.css'

const ReviewIdeas = () => {
  const { user } = useAuth()
  const { data: allIdeas, isLoading, error } = useIdeas()
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState(() => {
    // Get saved view preference from localStorage
    return localStorage.getItem('ideasViewMode') || 'grid'
  })

  // Save view preference to localStorage
  useEffect(() => {
    localStorage.setItem('ideasViewMode', viewMode)
  }, [viewMode])

  const filteredIdeas = allIdeas?.filter((idea) => {
    // First filter by assignment
    if (filterStatus === 'assigned_to_me') {
      if (idea.assignedTo !== user?.id) return false
    }

    // Then filter by status
    if (filterStatus !== 'all' && filterStatus !== 'assigned_to_me') {
      if (idea.status !== filterStatus) return false
    }

    // Finally filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      const matchesTitle = idea.title.toLowerCase().includes(query)
      const matchesDescription = idea.description.toLowerCase().includes(query)
      return matchesTitle || matchesDescription
    }

    return true
  })

  const statusFilters = [
    { value: 'all', label: 'All Ideas', count: allIdeas?.length || 0 },
    { value: 'assigned_to_me', label: 'Assigned to Me', count: allIdeas?.filter((i) => i.assignedTo === user?.id).length || 0 },
    { value: 'pending', label: 'Pending', count: allIdeas?.filter((i) => i.status === 'pending').length || 0 },
    { value: 'under_review', label: 'Under Review', count: allIdeas?.filter((i) => i.status === 'under_review').length || 0 },
    { value: 'needs_info', label: 'Needs Info', count: allIdeas?.filter((i) => i.status === 'needs_info').length || 0 },
    { value: 'approved', label: 'Approved', count: allIdeas?.filter((i) => i.status === 'approved').length || 0 },
    { value: 'declined', label: 'Declined', count: allIdeas?.filter((i) => i.status === 'declined').length || 0 },
  ]

  return (
    <div className={styles.page}>
      <h1>Dashboard</h1>
      <p className={styles.subtitle}>
        Review and manage all submitted ideas. Click on any idea to see details and take action.
      </p>

      <Card padding="lg" className={styles.filtersCard}>
        <div className={styles.filters}>
          {statusFilters.map((filter) => (
            <button
              key={filter.value}
              className={`${styles.filterButton} ${
                filterStatus === filter.value ? styles.active : ''
              }`}
              onClick={() => setFilterStatus(filter.value)}
            >
              <span className={styles.filterLabel}>{filter.label}</span>
              <span className={styles.filterCount}>{filter.count}</span>
            </button>
          ))}
        </div>
      </Card>

      <div className={styles.results}>
        <div className={styles.resultsHeader}>
          <h2 className={styles.resultsTitle}>
            {filterStatus === 'all' ? 'All Ideas' : statusFilters.find(f => f.value === filterStatus)?.label}
            <span className={styles.resultsCount}>({filteredIdeas?.length || 0})</span>
          </h2>
          <div className={styles.viewToggle}>
            <button
              className={`${styles.viewButton} ${viewMode === 'grid' ? styles.activeView : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid view"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </button>
            <button
              className={`${styles.viewButton} ${viewMode === 'list' ? styles.activeView : ''}`}
              onClick={() => setViewMode('list')}
              title="List view"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search ideas by title or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className={styles.clearButton}
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {viewMode === 'grid' ? (
          <IdeaList ideas={filteredIdeas} isLoading={isLoading} error={error} />
        ) : (
          <div className={styles.listView}>
            {isLoading ? (
              <div className={styles.loading}>
                <Loader />
              </div>
            ) : error ? (
              <div className={styles.error}>
                <p>Failed to load ideas. Please try again.</p>
              </div>
            ) : filteredIdeas?.length === 0 ? (
              <div className={styles.empty}>
                <p>No ideas found.</p>
              </div>
            ) : (
              filteredIdeas?.map((idea) => (
                <IdeaListItem key={idea.id} idea={idea} />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ReviewIdeas
