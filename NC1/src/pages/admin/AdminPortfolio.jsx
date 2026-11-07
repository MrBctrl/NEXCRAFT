import { useEffect, useState } from 'react'
import {
  fetchAllPortfolioItems, createPortfolioItem, updatePortfolioItem,
  deletePortfolioItem, uploadPortfolioImage, PORTFOLIO_CATEGORIES,
} from '../../services/portfolioService.js'

// extraImages holds every shot AFTER the main one (index 0). On save,
// images = [imageUrl, ...extraImages].
const EMPTY = { title: '', category: PORTFOLIO_CATEGORIES[0], subcategory: '', description: '', imageUrl: '', extraImages: [], visible: true, sortOrder: 0 }

export default function AdminPortfolio() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(null) // null = closed, EMPTY = new, {...} = editing
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadingExtraIndex, setUploadingExtraIndex] = useState(null)
  const [uploadError, setUploadError] = useState('')

  const load = () => {
    setLoading(true)
    fetchAllPortfolioItems().then(({ data }) => {
      setItems(data)
      setLoading(false)
    })
  }

  useEffect(() => { load() }, [])

  const startNew = () => { setUploadError(''); setForm({ ...EMPTY, sortOrder: items.length }) }
  const startEdit = (item) => {
    setUploadError('')
    const allImages = Array.isArray(item.images) && item.images.length ? item.images : [item.image_url]
    setForm({
      id: item.id, title: item.title, category: item.category, subcategory: item.subcategory || '',
      description: item.description || '', imageUrl: allImages[0], extraImages: allImages.slice(1),
      visible: item.visible, sortOrder: item.sort_order,
    })
  }

  const onSave = async (e) => {
    e.preventDefault()
    if (!form.imageUrl) {
      setUploadError('Upload an image or paste a path/URL before saving.')
      return
    }
    setSaving(true)
    const payload = { ...form, images: [form.imageUrl, ...form.extraImages.filter(Boolean)] }
    const result = form.id
      ? await updatePortfolioItem(form.id, payload)
      : await createPortfolioItem(payload)
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
    const allImages = Array.isArray(item.images) && item.images.length ? item.images : [item.image_url]
    await updatePortfolioItem(item.id, {
      title: item.title, category: item.category, subcategory: item.subcategory,
      description: item.description, imageUrl: allImages[0], images: allImages,
      visible: !item.visible, sortOrder: item.sort_order,
    })
    load()
  }

  const onFilePicked = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadError('')
    setUploading(true)
    const { url, error } = await uploadPortfolioImage(file)
    setUploading(false)
    if (error) {
      setUploadError(error.includes('not-configured') ? 'Supabase isn\'t configured yet.' : `Upload failed: ${error}`)
      return
    }
    setForm((prev) => ({ ...prev, imageUrl: url }))
  }

  // Extra images: each has its own file-picker + URL fallback, same
  // pattern as the main image field above.
  const addExtraImage = () => setForm((prev) => ({ ...prev, extraImages: [...prev.extraImages, ''] }))
  const removeExtraImage = (i) => setForm((prev) => ({ ...prev, extraImages: prev.extraImages.filter((_, idx) => idx !== i) }))
  const setExtraImageUrl = (i, url) => setForm((prev) => ({ ...prev, extraImages: prev.extraImages.map((v, idx) => idx === i ? url : v) }))
  const onExtraFilePicked = async (i, e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadError('')
    setUploadingExtraIndex(i)
    const { url, error } = await uploadPortfolioImage(file)
    setUploadingExtraIndex(null)
    if (error) {
      setUploadError(error.includes('not-configured') ? 'Supabase isn\'t configured yet.' : `Upload failed: ${error}`)
      return
    }
    setExtraImageUrl(i, url)
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
            <label>Subcategory (groups the lightbox arrows — e.g. "fashion", "logo", "flyer". Leave blank to fall back to Category.)</label>
            <input value={form.subcategory} onChange={(e) => setForm({ ...form, subcategory: e.target.value })} placeholder="e.g. fashion" />
          </div>

          <div className="contact-form-field">
            <label>Description</label>
            <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>

          <div className="contact-form-field">
            <label>Main Image * (grid thumbnail)</label>
            <div className="admin-image-upload">
              {form.imageUrl && <img src={form.imageUrl} alt="" className="admin-image-preview" />}
              <div className="admin-image-upload-controls">
                <label className="btn-secondary admin-upload-btn">
                  {uploading ? 'Uploading…' : form.imageUrl ? 'Replace image' : 'Upload from device'}
                  <input type="file" accept="image/*" onChange={onFilePicked} disabled={uploading} hidden />
                </label>
                <input
                  className="admin-image-url-fallback"
                  placeholder="or paste an image path / URL"
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="contact-form-field">
            <label>Additional Images (extra shots shown when someone clicks through the lightbox)</label>
            <div className="admin-image-upload">
              {form.extraImages.map((url, i) => (
                <div key={i} className="admin-image-upload-controls">
                  {url && <img src={url} alt="" className="admin-image-preview" style={{ width: 60, height: 45 }} />}
                  <label className="btn-secondary admin-upload-btn">
                    {uploadingExtraIndex === i ? 'Uploading…' : url ? 'Replace' : 'Upload from device'}
                    <input type="file" accept="image/*" onChange={(e) => onExtraFilePicked(i, e)} disabled={uploadingExtraIndex === i} hidden />
                  </label>
                  <input
                    className="admin-image-url-fallback"
                    placeholder="or paste an image path / URL"
                    value={url}
                    onChange={(e) => setExtraImageUrl(i, e.target.value)}
                  />
                  <button type="button" className="admin-btn-text admin-btn-danger" onClick={() => removeExtraImage(i)}>Remove</button>
                </div>
              ))}
              <button type="button" className="btn-secondary admin-upload-btn" onClick={addExtraImage}>+ Add another image</button>
            </div>
            {uploadError && <p className="contact-form-error">{uploadError}</p>}
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
              <img src={(Array.isArray(item.images) && item.images[0]) || item.image_url} alt="" className="admin-item-thumb" />
              <div className="admin-item-info">
                <strong>{item.title}</strong>
                <span className="admin-item-meta">
                  {item.category}{item.subcategory ? ` · ${item.subcategory}` : ''}{!item.visible ? ' · hidden' : ''}
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