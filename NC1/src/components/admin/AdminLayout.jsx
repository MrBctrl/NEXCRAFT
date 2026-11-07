import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.js'

const NAV = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/messages', label: 'Messages' },
  { to: '/admin/portfolio', label: 'Portfolio' },
  { to: '/admin/web-projects', label: 'Web Projects' },
  { to: '/admin/uiux', label: 'UI / UX' },
]

export default function AdminLayout() {
  const { signOut } = useAuth()
  const navigate = useNavigate()

  const onSignOut = async () => {
    await signOut()
    navigate('/admin/login')
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">NEXCRAFT<span>.</span> <em>Admin</em></div>
        <nav className="admin-nav">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button className="admin-signout" onClick={onSignOut}>Sign Out</button>
        <a href="/" className="admin-back-link">← View live site</a>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  )
}
