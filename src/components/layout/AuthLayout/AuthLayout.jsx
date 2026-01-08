import { Outlet } from 'react-router-dom'
import styles from './AuthLayout.module.css'

const AuthLayout = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.logoSection}>
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
          <span className={styles.logoText}>IdeaFlow</span>
        </div>
        <p className={styles.tagline}>Idea Management System</p>
      </div>

      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout
