import { Link } from 'react-router-dom'
import Button from '../../components/common/Button/Button'
import styles from './NotFound.module.css'

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>Page not found</p>
      <Link to="/">
        <Button variant="primary">Go to Dashboard</Button>
      </Link>
    </div>
  )
}

export default NotFound
