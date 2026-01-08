import { useState } from 'react'
import { useUsers } from '../../../hooks/useUsers'
import Loader from '../../common/Loader/Loader'
import styles from './UserSelector.module.css'

const UserSelector = ({ selectedUsers, onChange, error }) => {
  const { data: users, isLoading } = useUsers()
  const [searchTerm, setSearchTerm] = useState('')

  // Filter out admin users - only show employees
  const employees = users?.filter((user) => user.role === 'employee') || []

  // Filter by search term
  const filteredEmployees = employees.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const toggleUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      onChange(selectedUsers.filter((id) => id !== userId))
    } else {
      onChange([...selectedUsers, userId])
    }
  }

  const selectAll = () => {
    onChange(filteredEmployees.map((user) => user.id))
  }

  const clearAll = () => {
    onChange([])
  }

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Loader size="sm" />
        <span>Loading employees...</span>
      </div>
    )
  }

  return (
    <div className={styles.selector}>
      <div className={styles.header}>
        <label className={styles.label}>
          Select Employees <span className={styles.required}>*</span>
        </label>
        <div className={styles.actions}>
          <button
            type="button"
            onClick={selectAll}
            className={styles.actionButton}
            disabled={filteredEmployees.length === 0}
          >
            Select All
          </button>
          <button
            type="button"
            onClick={clearAll}
            className={styles.actionButton}
            disabled={selectedUsers.length === 0}
          >
            Clear All
          </button>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search employees..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.search}
      />

      <div className={styles.list}>
        {filteredEmployees.length === 0 ? (
          <div className={styles.empty}>
            {searchTerm ? 'No employees found matching your search.' : 'No employees available.'}
          </div>
        ) : (
          filteredEmployees.map((user) => (
            <label key={user.id} className={styles.userItem}>
              <input
                type="checkbox"
                checked={selectedUsers.includes(user.id)}
                onChange={() => toggleUser(user.id)}
                className={styles.checkbox}
              />
              <div className={styles.userInfo}>
                <div className={styles.userName}>{user.name}</div>
                <div className={styles.userEmail}>{user.email}</div>
                {user.department && (
                  <div className={styles.userDepartment}>{user.department}</div>
                )}
              </div>
            </label>
          ))
        )}
      </div>

      {selectedUsers.length > 0 && (
        <div className={styles.selected}>
          <strong>{selectedUsers.length}</strong> employee{selectedUsers.length !== 1 ? 's' : ''} selected
        </div>
      )}

      {error && <span className={styles.error}>{error}</span>}
    </div>
  )
}

export default UserSelector
