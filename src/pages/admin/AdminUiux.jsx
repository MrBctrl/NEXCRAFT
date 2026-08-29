import { useEffect, useState } from 'react'
import {
  fetchAllUiuxProjects, createUiuxProject, updateUiuxProject,
  deleteUiuxProject, uploadUiuxMedia,
} from '../../services/uiuxService.js'

const EMPTY = { title: '', description: '', mediaType: 'video', mediaUrl: '', tags: '', visible: true, sortOrder: 0 }

export default function AdminUiux() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(null)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')

  const load = () => {
    setLoading(true)
    fetchAllUiuxProjects().then(({ data }) => {
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
      mediaType: item.media_type || 'video', mediaUrl: item.media_url || '',
      tags: (item.tags || []).join(', '), visible: item.visible, sortOrder: item.sort_order,
    })
  }

  const onMediaTypeChange = (mediaType) => {
    // Switching type invalidates whatever was already picked/uploaded —
    // a video URL isn't a valid image and vice versa.
    setUploadError('')
    setForm((prev) => ({ ...prev, mediaType, mediaUrl: '' }))
  }

  const onFilePicked = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadError('')
    setUploading(true)
    const { url, error } = await uploadUiuxMedia(file, form.mediaType)
    setUploading(false)
    if (error) {
      setUploadError(
        error.includes('not-configured')
          ? 'Supabase isn\'t configured yet.'
          : `Upload failed: ${error}`
      )
      return
    }
    setForm((prev) => ({ ...prev, mediaUrl: url }))
  }

  const onSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    const payload = { ...form, tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean) }
    const result = form.id
      ? await updateUiuxProject(form.id, payload)
      : await createUiuxProject(payload)
    setSaving(false)
    if (!result.error) {
      setForm(null)
      load()
    }
  }

  const onDelete = async (id) => {
    if (!window.confirm('Delete this UI/UX project? This can\'t be undone.')) return
    await deleteUiuxProject(id)
    load()
  }

  const onToggleVisible = async (item) => {
    await updateUiuxProject(item.id, {
      title: item.title, description: item.description, mediaType: item.media_type,
      mediaUrl: item.media_url, tags: item.tags, visible: !item.visible, sortOrder: item.sort_order,
    })
    load()
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>UI / UX</h1>
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

          <div className="contact-form-field">
            <label>Media type</label>
            <div className="admin-media-type-toggle">
              <label className={`admin-media-type-option ${form.mediaType === 'image' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="mediaType"
                  checked={form.mediaType === 'image'}
                  onChange={() => onMediaTypeChange('image')}
                />
                Picture
              </label>
              <label className={`admin-media-type-option ${form.mediaType === 'video' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="mediaType"
                  checked={form.mediaType === 'video'}
                  onChange={() => onMediaTypeChange('video')}
                />
                Video
              </label>
            </div>
          </div>

          <div className="contact-form-field">
            <label>{form.mediaType === 'image' ? 'Picture' : 'Video'} (optional — leave empty for "Coming soon")</label>
            <div className="admin-image-upload">
              {form.mediaUrl && form.mediaType === 'image' && (
                <img src={form.mediaUrl} alt="" className="admin-image-preview" />
              )}
              {form.mediaUrl && form.mediaType === 'video' && (
                <video src={form.mediaUrl} className="admin-video-preview" controls muted />
              )}
              <div className="admin-image-upload-controls">
                <label className="btn-secondary admin-upload-btn">
                  {uploading ? 'Uploading…' : form.mediaUrl ? 'Replace' : 'Upload from device'}
                  <input
                    type="file"
                    accept={form.mediaType === 'image' ? 'image/*' : 'video/*'}
                    onChange={onFilePicked}
                    disabled={uploading}
                    hidden
                  />
                </label>
                <input
                  className="admin-image-url-fallback"
                  placeholder={`or paste a ${form.mediaType} path / URL`}
                  value={form.mediaUrl}
                  onChange={(e) => setForm({ ...form, mediaUrl: e.target.value })}
                />
              </div>
              {uploadError && <p className="contact-form-error">{uploadError}</p>}
            </div>
          </div>

          <div className="contact-form-row">
            <div className="contact-form-field">
              <label>Tags (comma-separated)</label>
              <input placeholder="Mobile UI, UX Design" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
            </div>
            <div className="contact-form-field">
              <label>Sort Order</label>
              <input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })} />
            </div>
          </div>
          <label className="admin-checkbox-field">
            <input type="checkbox" checked={form.visible} onChange={(e) => setForm({ ...form, visible: e.target.checked })} />
            Visible on site
          </label>

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
                <span className="admin-item-meta">
                  {item.media_type}{(item.tags || []).length > 0 ? ` · ${item.tags.join(', ')}` : ''}{!item.visible ? ' · hidden' : ''}
                </span>
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
