import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.js'
import { isSupabaseConfigured } from '../../lib/supabaseClient.js'

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()

  if (!isSupabaseConfigured) {
    return (
      <div className="admin-setup-notice">
        <h2>Admin isn't connected yet</h2>
        <p>
          Supabase isn't configured for this deployment. Set{' '}
          <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code>{' '}
          in your environment variables, then run the schema in{' '}
          <code>supabase/schema.sql</code> and create an admin user in the
          Supabase dashboard. See the README for the full walkthrough.
        </p>
      </div>
    )
  }

  if (loading) return <div className="admin-loading">Loading…</div>
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />

  return children
}
