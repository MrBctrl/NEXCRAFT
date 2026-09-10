import { useEffect, useState } from 'react'
import {
  fetchAllUiuxProjects, createUiuxProject, updateUiuxProject,
  deleteUiuxProject, uploadUiuxMedia,
} from '../../services/uiuxService.js'

const EMPTY = { title: '', description: '', mediaType: 'video', mediaUrls: [], tags: '', visible: true, sortOrder: 0 }

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
      mediaType: item.media_type || 'video', mediaUrls: item.media_urls || [],
      tags: (item.tags || []).join(', '), visible: item.visible, sortOrder: item.sort_order,
    })
  }

  const onMediaTypeChange = (mediaType) => {
    // Switching type invalidates whatever was already picked/uploaded —
    // a video URL isn't a valid image and vice versa.
    setUploadError('')
    setForm((prev) => ({ ...prev, mediaType, mediaUrls: [] }))
  }

  const onFilesPicked = async (e) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return
    setUploadError('')

    if (form.mediaType === 'video') {
      const file = files[0]
      if (file.size > 20 * 1024 * 1024) {
        const proceed = window.confirm(
          `This video is ${(file.size / 1024 / 1024).toFixed(1)}MB — that'll load slowly for visitors.\n\n` +
          'Recommended: compress it first with "node scripts/compress-video.mjs", then upload the smaller file.\n\n' +
          'Upload it as-is anyway?'
        )
        if (!proceed) {
          e.target.value = ''
          return
        }
      }
      setUploading(true)
      const { url, error } = await uploadUiuxMedia(file, 'video')
      setUploading(false)
      if (error) {
        setUploadError(error.includes('not-configured') ? 'Supabase isn\'t configured yet.' : `Upload failed: ${error}`)
        return
      }
      setForm((prev) => ({ ...prev, mediaUrls: [url] }))
      e.target.value = ''
      return
    }

    // Image mode: upload every picked file, appending each result to
    // whatever's already there — same "add more shots" idea as the
    // Portfolio/flagship carousels use.
    setUploading(true)
    const uploaded = []
    for (const file of files) {
      const { url, error } = await uploadUiuxMedia(file, 'image')
      if (error) {
        setUploadError(error.includes('not-configured') ? 'Supabase isn\'t configured yet.' : `Upload failed: ${error}`)
        continue
      }
      uploaded.push(url)
    }
    setUploading(false)
    setForm((prev) => ({ ...prev, mediaUrls: [...prev.mediaUrls, ...uploaded] }))
    e.target.value = ''
  }

  const onRemoveMedia = (index) => {
    setForm((prev) => ({ ...prev, mediaUrls: prev.mediaUrls.filter((_, i) => i !== index) }))
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
      mediaUrls: item.media_urls, tags: item.tags, visible: !item.visible, sortOrder: item.sort_order,
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
                Picture(s)
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
            <label>
              {form.mediaType === 'image' ? 'Pictures' : 'Video'} (optional — leave empty for "Coming soon")
            </label>
            <div className="admin-image-upload">
              {form.mediaUrls.length > 0 && (
                <div className="admin-media-gallery">
                  {form.mediaUrls.map((url, i) => (
                    <div className="admin-media-gallery-item" key={url + i}>
                      {form.mediaType === 'image' ? (
                        <img src={url} alt="" className="admin-image-preview" />
                      ) : (
                        <video src={url} className="admin-video-preview" controls muted />
                      )}
                      <button type="button" className="admin-media-remove" onClick={() => onRemoveMedia(i)} aria-label="Remove">×</button>
                    </div>
                  ))}
                </div>
              )}
              <div className="admin-image-upload-controls">
                <label className="btn-secondary admin-upload-btn">
                  {uploading
                    ? 'Uploading…'
                    : form.mediaType === 'image'
                      ? (form.mediaUrls.length > 0 ? 'Add more pictures' : 'Upload from device')
                      : (form.mediaUrls.length > 0 ? 'Replace video' : 'Upload from device')}
                  <input
                    type="file"
                    accept={form.mediaType === 'image' ? 'image/*' : 'video/*'}
                    multiple={form.mediaType === 'image'}
                    onChange={onFilesPicked}
                    disabled={uploading}
                    hidden
                  />
                </label>
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
                  {item.media_type}
                  {(item.media_urls || []).length > 1 ? ` (${item.media_urls.length})` : ''}
                  {(item.tags || []).length > 0 ? ` · ${item.tags.join(', ')}` : ''}
                  {!item.visible ? ' · hidden' : ''}
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