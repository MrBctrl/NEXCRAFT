import { useEffect, useState } from 'react'
import { fetchMessages, updateMessageStatus, MESSAGE_STATUSES } from '../../services/messagesService.js'

export default function AdminMessages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState(null)

  const load = () => {
    setLoading(true)
    fetchMessages().then(({ data }) => {
      setMessages(data)
      setLoading(false)
    })
  }

  useEffect(() => { load() }, [])

  const onStatusChange = async (id, status) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)))
    await updateMessageStatus(id, status)
  }

  return (
    <div className="admin-page">
      <h1>Messages</h1>
      {loading ? (
        <p>Loading…</p>
      ) : messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        <div className="admin-message-list">
          {messages.map((m) => (
            <div key={m.id} className="admin-message-card">
              <div
                className="admin-message-summary"
                onClick={() => setExpandedId(expandedId === m.id ? null : m.id)}
              >
                <div>
                  <strong>{m.name}</strong> — {m.email}
                  <div className="admin-message-meta">
                    {new Date(m.created_at).toLocaleString()}
                    {m.project_type ? ` · ${m.project_type}` : ''}
                  </div>
                </div>
                <select
                  value={m.status}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => onStatusChange(m.id, e.target.value)}
                  className={`admin-status-select admin-status-${m.status.replace(/\s+/g, '-').toLowerCase()}`}
                >
                  {MESSAGE_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {expandedId === m.id && (
                <div className="admin-message-detail">
                  {m.phone && <p><strong>Phone:</strong> {m.phone}</p>}
                  {m.whatsapp && <p><strong>WhatsApp:</strong> {m.whatsapp}</p>}
                  {m.company && <p><strong>Company:</strong> {m.company}</p>}
                  <p className="admin-message-body">{m.message}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
