import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import Button from '../../components/common/Button/Button'
import Card from '../../components/common/Card/Card'
import Input from '../../components/common/Input/Input'
import styles from './Login.module.css'

const Login = () => {
  const [nickname, setNickname] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = (role) => {
    if (!nickname.trim()) {
      setError('Please enter your nickname')
      return
    }

    login(nickname, role)
    navigate('/')
  }

  return (
    <div className={styles.login}>
      <Card padding="lg" className={styles.card}>
        <h1 className={styles.title}>Welcome to IdeaFlow</h1>
        <p className={styles.subtitle}>
          Enter your nickname and select your role to continue
        </p>

        <div className={styles.form}>
          <Input
            label="Nickname"
            placeholder="Enter your nickname"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value)
              setError('')
            }}
            error={error}
            fullWidth
            required
          />

          <div className={styles.buttonGroup}>
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => handleLogin('admin')}
            >
              <span className={styles.icon}>👤</span>
              Login as Admin
            </Button>

            <Button
              variant="secondary"
              size="lg"
              fullWidth
              onClick={() => handleLogin('employee')}
            >
              <span className={styles.icon}>👨‍💼</span>
              Login as Employee
            </Button>
          </div>
        </div>

        <p className={styles.footer}>
          <strong>Note:</strong> This is a mock login for development.
        </p>
      </Card>
    </div>
  )
}

export default Login
