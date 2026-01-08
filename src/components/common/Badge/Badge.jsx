import classNames from 'classnames'
import styles from './Badge.module.css'

const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className,
  ...props
}) => {
  const badgeClass = classNames(
    styles.badge,
    styles[variant],
    styles[size],
    className
  )

  return (
    <span className={badgeClass} {...props}>
      {children}
    </span>
  )
}

export default Badge
