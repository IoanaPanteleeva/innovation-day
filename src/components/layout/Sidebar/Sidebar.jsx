import { NavLink } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import styles from './Sidebar.module.css'

const Sidebar = () => {
  const { isAdmin } = useAuth()

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/submit-idea', label: 'Submit Idea', icon: '💡' },
    { path: '/my-ideas', label: 'My Ideas', icon: '📝' },
    { path: '/notifications', label: 'Notifications', icon: '🔔' },
  ]

  const adminNavItems = [
    { path: '/admin', label: 'Dashboard', icon: '📊' },
  ]

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 17L12 22L22 17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 12L12 17L22 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className={styles.logoText}>IDEAFLOW</span>
      </div>

      <nav className={styles.nav}>
        <div className={styles.navSection}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
              }
              end={item.path === '/'}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navLabel}>{item.label}</span>
            </NavLink>
          ))}
        </div>

        {isAdmin() && (
          <div className={styles.navSection}>
            <div className={styles.sectionTitle}>Admin</div>
            {adminNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
                }
              >
                <span className={styles.navIcon}>{item.icon}</span>
                <span className={styles.navLabel}>{item.label}</span>
              </NavLink>
            ))}
          </div>
        )}
      </nav>
    </aside>
  )
}

export default Sidebar
