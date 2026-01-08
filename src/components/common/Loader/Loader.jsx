import classNames from 'classnames'
import styles from './Loader.module.css'

const Loader = ({
  size = 'md',
  variant = 'primary',
  fullScreen = false,
  className,
}) => {
  if (fullScreen) {
    return (
      <div className={styles.fullScreen}>
        <div className={classNames(styles.spinner, styles[variant], styles[size])} />
      </div>
    )
  }

  return (
    <div className={classNames(styles.spinner, styles[variant], styles[size], className)} />
  )
}

export default Loader
