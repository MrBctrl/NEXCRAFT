import { useEffect, useState } from 'react'
import {
  fetchAllWebProjects, createWebProject, updateWebProject, deleteWebProject,
  uploadProjectVideo,
} from '../../services/webProjectsService.js'

const EMPTY = { title: '', description: '', urlLabel: '', videoUrl: '', tags: '', githubUrl: '', visible: true, sortOrder: 0 }

export default function AdminWebProjects() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(null)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')

  const load = () => {
    setLoading(true)
    fetchAllWebProjects().then(({ data }) => {
      setItems(data)
      setLoading(false)
    })
  }

  useEffect(() => { load() }, [])

  const startNew = () => { setUploadError(''); setForm({ ...EMPTY, sortOrder: items.length }) }
  const startEdit = (item) => {
    setUploadError('')
    setForm({
      id: item.id, title: item.title, description: item.description || '',
      urlLabel: item.url_label || '', videoUrl: item.video_url || '',
      tags: (item.tags || []).join(', '), githubUrl: item.github_url || '',
      visible: item.visible, sortOrder: item.sort_order,
    })
  }

  const onFilePicked = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadError('')
    setUploading(true)
    const { url, error } = await uploadProjectVideo(file)
    setUploading(false)
    if (error) {
      setUploadError(
        error.includes('not-configured')
          ? 'Supabase isn\'t configured yet.'
          : `Upload failed: ${error}`
      )
      return
    }
    setForm((prev) => ({ ...prev, videoUrl: url }))
  }

  const onSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    const payload = { ...form, tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean) }
    const result = form.id
      ? await updateWebProject(form.id, payload)
      : await createWebProject(payload)
    setSaving(false)
    if (!result.error) {
      setForm(null)
      load()
    }
  }

  const onDelete = async (id) => {
    if (!window.confirm('Delete this web project? This can\'t be undone.')) return
    await deleteWebProject(id)
    load()
  }

  const onToggleVisible = async (item) => {
    await updateWebProject(item.id, {
      title: item.title, description: item.description, urlLabel: item.url_label,
      videoUrl: item.video_url, tags: item.tags, githubUrl: item.github_url,
      visible: !item.visible, sortOrder: item.sort_order,
    })
    load()
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Web Projects</h1>
        {!form && <button className="btn-primary" onClick={startNew}>+ Add New</button>}
      </div>

      {form && (
        <form className="admin-form" onSubmit={onSave}>
          <div className="contact-form-field">
            <label>Title *</label>
            <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div className="contact-form-field">
            <label>Description</label>
            <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="contact-form-row">
            <div className="contact-form-field">
              <label>URL label</label>
              <input placeholder="yourusername.github.io/project" value={form.urlLabel} onChange={(e) => setForm({ ...form, urlLabel: e.target.value })} />
            </div>
            <div className="contact-form-field">
              <label>GitHub URL</label>
              <input value={form.githubUrl} onChange={(e) => setForm({ ...form, githubUrl: e.target.value })} />
            </div>
          </div>
          <div className="contact-form-field">
            <label>Video (optional)</label>
            <div className="admin-image-upload">
              {form.videoUrl && (
                <video src={form.videoUrl} className="admin-video-preview" controls muted />
              )}
              <div className="admin-image-upload-controls">
                <label className="btn-secondary admin-upload-btn">
                  {uploading ? 'Uploading…' : form.videoUrl ? 'Replace video' : 'Upload from device'}
                  <input
                    type="file"
                    accept="video/*"
                    onChange={onFilePicked}
                    disabled={uploading}
                    hidden
                  />
                </label>
                <input
                  className="admin-image-url-fallback"
                  placeholder="or paste a video path / URL"
                  value={form.videoUrl}
                  onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                />
              </div>
              {uploadError && <p className="contact-form-error">{uploadError}</p>}
            </div>
          </div>
          <div className="contact-form-field">
            <label>Tags (comma-separated)</label>
            <input placeholder="PHP, MySQL, XAMPP" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
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
              <div className="admin-item-info">
                <strong>{item.title}</strong>
                <span className="admin-item-meta">{(item.tags || []).join(', ')}{!item.visible ? ' · hidden' : ''}</span>
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
