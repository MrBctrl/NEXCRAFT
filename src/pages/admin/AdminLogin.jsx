import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.js'
import { isSupabaseConfigured } from '../../lib/supabaseClient.js'

export default function AdminLogin() {
  const { isAuthenticated, signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (isAuthenticated) return <Navigate to="/admin" replace />

  const onSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    const { error: signInError } = await signIn(email, password)
    setSubmitting(false)
    if (signInError) {
      setError(signInError.message)
      return
    }
    navigate('/admin')
  }

  return (
    <div className="admin-login-page">
      <form className="admin-login-card" onSubmit={onSubmit}>
        <div className="admin-brand">NEXCRAFT<span>.</span> <em>Admin</em></div>

        {!isSupabaseConfigured && (
          <p className="contact-form-error">
            Supabase isn't configured yet — see the README setup steps.
          </p>
        )}

        <div className="contact-form-field">
          <label htmlFor="admin-email">Email</label>
          <input id="admin-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="contact-form-field">
          <label htmlFor="admin-password">Password</label>
          <input id="admin-password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        {error && <p className="contact-form-error">{error}</p>}

        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? 'Signing in…' : 'Sign In'}
        </button>
        <a href="/" className="admin-back-link">← Back to site</a>
      </form>
    </div>
  )
}
