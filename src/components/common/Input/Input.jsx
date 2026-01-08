import classNames from 'classnames'
import styles from './Input.module.css'

const Input = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  fullWidth = false,
  className,
  ...props
}) => {
  const inputClass = classNames(
    styles.input,
    {
      [styles.error]: error,
      [styles.disabled]: disabled,
      [styles.fullWidth]: fullWidth,
    },
    className
  )

  return (
    <div className={styles.wrapper}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <input
        type={type}
        className={inputClass}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        {...props}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  )
}

export const Textarea = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  fullWidth = false,
  rows = 4,
  className,
  ...props
}) => {
  const textareaClass = classNames(
    styles.textarea,
    {
      [styles.error]: error,
      [styles.disabled]: disabled,
      [styles.fullWidth]: fullWidth,
    },
    className
  )

  return (
    <div className={styles.wrapper}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <textarea
        className={textareaClass}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        rows={rows}
        {...props}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  )
}

export default Input
