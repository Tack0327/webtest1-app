import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import './AuthForm.css'

export default function SignupPage() {
  const { session, signUp } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (session) {
    return <Navigate to="/properties" replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setSubmitting(true)

    const { error: signUpError } = await signUp(email, password)

    setSubmitting(false)

    if (signUpError) {
      setError('会員登録に失敗しました。入力内容を確認してください。')
      return
    }

    // Supabaseの設定によっては確認メールが送信されるため、その場合はログイン画面へ案内する
    setMessage('登録が完了しました。確認メールをご確認のうえログインしてください。')
    setTimeout(() => navigate('/login'), 2000)
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>会員登録</h1>
        <form onSubmit={handleSubmit}>
          <label>
            メールアドレス
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            パスワード
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />
          </label>
          {error && <p className="error-message">{error}</p>}
          {message && <p>{message}</p>}
          <button type="submit" disabled={submitting}>
            {submitting ? '登録中...' : '会員登録'}
          </button>
        </form>
        <p className="switch-link">
          既にアカウントをお持ちの方は<Link to="/login">ログイン</Link>
        </p>
      </div>
    </div>
  )
}
