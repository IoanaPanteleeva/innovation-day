import classNames from 'classnames'
import styles from './Card.module.css'

const Card = ({
  children,
  variant = 'default',
  padding = 'md',
  hover = false,
  onClick,
  className,
  ...props
}) => {
  const cardClass = classNames(
    styles.card,
    styles[variant],
    styles[`padding-${padding}`],
    {
      [styles.hover]: hover,
      [styles.clickable]: onClick,
    },
    className
  )

  return (
    <div className={cardClass} onClick={onClick} {...props}>
      {children}
    </div>
  )
}

export default Card
