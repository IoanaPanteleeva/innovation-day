import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import Badge from '../../common/Badge/Badge'
import NotificationBell from '../../notifications/NotificationBell/NotificationBell'
import styles from './Header.module.css'

const Header = () => {
  const { user, logout, isAdmin } = useAuth()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className={styles.header}>
      <div className={styles.left}></div>

      <div className={styles.right}>
        <NotificationBell />

        <div className={styles.userMenu}>
          <button
            className={styles.userButton}
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className={styles.userInfo}>
              <span className={styles.userName}>{user?.name}</span>
              <Badge variant={isAdmin() ? 'primary' : 'info'} size="sm">
                {isAdmin() ? 'Admin' : 'Employee'}
              </Badge>
            </div>
            <div className={styles.avatar}>
              {user?.name.split(' ').map(n => n[0]).join('')}
            </div>
          </button>

          {showUserMenu && (
            <>
              <div
                className={styles.menuOverlay}
                onClick={() => setShowUserMenu(false)}
              />
              <div className={styles.dropdown}>
                <div className={styles.dropdownHeader}>
                  <p className={styles.dropdownName}>{user?.name}</p>
                  <p className={styles.dropdownEmail}>{user?.email}</p>
                </div>
                <div className={styles.dropdownDivider} />
                <button className={styles.dropdownItem} onClick={handleLogout}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
