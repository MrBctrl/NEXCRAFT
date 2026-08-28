import { useEffect, useState } from 'react'
import {
  fetchAllPortfolioItems, createPortfolioItem, updatePortfolioItem,
  deletePortfolioItem, PORTFOLIO_CATEGORIES,
} from '../../services/portfolioService.js'

const EMPTY = { title: '', category: PORTFOLIO_CATEGORIES[0], description: '', imageUrl: '', visible: true, sortOrder: 0 }

export default function AdminPortfolio() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(null) // null = closed, EMPTY = new, {...} = editing
  const [saving, setSaving] = useState(false)

  const load = () => {
    setLoading(true)
    fetchAllPortfolioItems().then(({ data }) => {
      setItems(data)
      setLoading(false)
    })
  }

  useEffect(() => { load() }, [])

  const startNew = () => setForm({ ...EMPTY, sortOrder: items.length })
  const startEdit = (item) => setForm({
    id: item.id, title: item.title, category: item.category, description: item.description || '',
    imageUrl: item.image_url, visible: item.visible, sortOrder: item.sort_order,
  })

  const onSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    const result = form.id
      ? await updatePortfolioItem(form.id, form)
      : await createPortfolioItem(form)
    setSaving(false)
    if (!result.error) {
      setForm(null)
      load()
    }
  }

  const onDelete = async (id) => {
    if (!window.confirm('Delete this portfolio item? This can\'t be undone.')) return
    await deletePortfolioItem(id)
    load()
  }

  const onToggleVisible = async (item) => {
    await updatePortfolioItem(item.id, {
      title: item.title, category: item.category, description: item.description,
      imageUrl: item.image_url, visible: !item.visible, sortOrder: item.sort_order,
    })
    load()
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Portfolio</h1>
        {!form && <button className="btn-primary" onClick={startNew}>+ Add New</button>}
      </div>

      {form && (
        <form className="admin-form" onSubmit={onSave}>
          <div className="contact-form-row">
            <div className="contact-form-field">
              <label>Title *</label>
              <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="contact-form-field">
              <label>Category *</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {PORTFOLIO_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="contact-form-field">
            <label>Description</label>
            <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="contact-form-field">
            <label>Image path or URL *</label>
            <input required placeholder="/images/example.jpg" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
          </div>
          <div className="contact-form-row">
            <div className="contact-form-field">
              <label>Sort Order</label>
              <input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })} />
            </div>
            <label className="admin-checkbox-field">
              <input type="checkbox" checked={form.visible} onChange={(e) => setForm({ ...form, visible: e.target.checked })} />
              Visible on site
            </label>
          </div>
          <div className="admin-form-actions">
            <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
            <button type="button" className="btn-secondary" onClick={() => setForm(null)}>Cancel</button>
          </div>
        </form>
      )}

      {loading ? <p>Loading…</p> : (
        <div className="admin-item-list">
          {items.map((item) => (
            <div key={item.id} className={`admin-item-row ${!item.visible ? 'admin-item-hidden' : ''}`}>
              <img src={item.image_url} alt="" className="admin-item-thumb" />
              <div className="admin-item-info">
                <strong>{item.title}</strong>
                <span className="admin-item-meta">{item.category}{!item.visible ? ' · hidden' : ''}</span>
              </div>
              <div className="admin-item-actions">
                <button className="admin-btn-text" onClick={() => onToggleVisible(item)}>{item.visible ? 'Hide' : 'Show'}</button>
                <button className="admin-btn-text" onClick={() => startEdit(item)}>Edit</button>
                <button className="admin-btn-text admin-btn-danger" onClick={() => onDelete(item.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
