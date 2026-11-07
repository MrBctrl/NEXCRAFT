import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchMessages } from '../../services/messagesService.js'
import { fetchAllPortfolioItems } from '../../services/portfolioService.js'
import { fetchAllWebProjects } from '../../services/webProjectsService.js'
import { fetchAllUiuxProjects } from '../../services/uiuxService.js'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    Promise.all([
      fetchMessages(), fetchAllPortfolioItems(), fetchAllWebProjects(), fetchAllUiuxProjects(),
    ]).then(
      ([messages, portfolio, webProjects, uiux]) => {
        const newCount = (messages.data || []).filter((m) => m.status === 'NEW').length
        setStats({
          totalMessages: messages.data?.length || 0,
          newMessages: newCount,
          portfolioCount: portfolio.data?.length || 0,
          webProjectCount: webProjects.data?.length || 0,
          uiuxCount: uiux.data?.length || 0,
        })
      }
    )
  }, [])

  return (
    <div className="admin-page">
      <h1>Dashboard</h1>
      {!stats ? (
        <p>Loading…</p>
      ) : (
        <div className="admin-stat-grid">
          <Link to="/admin/messages" className="admin-stat-card">
            <div className="admin-stat-num">{stats.totalMessages}</div>
            <div className="admin-stat-label">Total Messages</div>
          </Link>
          <Link to="/admin/messages" className="admin-stat-card admin-stat-card-highlight">
            <div className="admin-stat-num">{stats.newMessages}</div>
            <div className="admin-stat-label">New / Unread</div>
          </Link>
          <Link to="/admin/portfolio" className="admin-stat-card">
            <div className="admin-stat-num">{stats.portfolioCount}</div>
            <div className="admin-stat-label">Portfolio Items</div>
          </Link>
          <Link to="/admin/web-projects" className="admin-stat-card">
            <div className="admin-stat-num">{stats.webProjectCount}</div>
            <div className="admin-stat-label">Web Projects</div>
          </Link>
          <Link to="/admin/uiux" className="admin-stat-card">
            <div className="admin-stat-num">{stats.uiuxCount}</div>
            <div className="admin-stat-label">UI / UX Projects</div>
          </Link>
        </div>
      )}
    </div>
  )
}
