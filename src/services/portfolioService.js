import { supabase, isSupabaseConfigured } from '../lib/supabaseClient.js'
import { portfolioItems as staticPortfolioItems } from '../data/portfolio.js'

// Public homepage read. Falls back to the bundled static array if
// Supabase isn't set up yet — the site keeps working either way.
export async function fetchVisiblePortfolioItems() {
  if (!isSupabaseConfigured) {
    return staticPortfolioItems.map((p, i) => ({ ...p, id: p.id || String(i), sortOrder: i }))
  }
  const { data, error } = await supabase
    .from('portfolio_items')
    .select('*')
    .eq('visible', true)
    .order('sort_order', { ascending: true })
  if (error || !data || data.length === 0) {
    return staticPortfolioItems.map((p, i) => ({ ...p, id: p.id || String(i), sortOrder: i }))
  }
  return data.map((row) => ({
    id: row.id,
    filter: row.category,
    subcategory: row.subcategory || null,
    title: row.title,
    desc: row.description,
    // `images` is an optional JSON array column for multi-shot projects.
    // Rows that only have the original single image_url still work fine.
    images: Array.isArray(row.images) && row.images.length ? row.images : [row.image_url],
  }))
}

// Admin: all items regardless of visibility.
export async function fetchAllPortfolioItems() {
  if (!isSupabaseConfigured) return { data: [], error: 'not-configured' }
  const { data, error } = await supabase
    .from('portfolio_items')
    .select('*')
    .order('sort_order', { ascending: true })
  return { data: data || [], error: error?.message || null }
}

export async function createPortfolioItem(item) {
  if (!isSupabaseConfigured) return { error: 'not-configured' }
  const { error } = await supabase.from('portfolio_items').insert([{
    title: item.title,
    category: item.category,
    subcategory: item.subcategory || null,
    description: item.description || null,
    image_url: item.imageUrl,
    images: item.images && item.images.length ? item.images : [item.imageUrl],
    visible: item.visible ?? true,
    sort_order: item.sortOrder ?? 0,
  }])
  return { error: error?.message || null }
}

export async function updatePortfolioItem(id, item) {
  if (!isSupabaseConfigured) return { error: 'not-configured' }
  const { error } = await supabase.from('portfolio_items').update({
    title: item.title,
    category: item.category,
    subcategory: item.subcategory || null,
    description: item.description || null,
    image_url: item.imageUrl,
    images: item.images && item.images.length ? item.images : [item.imageUrl],
    visible: item.visible,
    sort_order: item.sortOrder,
  }).eq('id', id)
  return { error: error?.message || null }
}

export async function deletePortfolioItem(id) {
  if (!isSupabaseConfigured) return { error: 'not-configured' }
  const { error } = await supabase.from('portfolio_items').delete().eq('id', id)
  return { error: error?.message || null }
}

// Uploads a file (chosen from a PC or phone) into the "portfolio-images"
// Supabase Storage bucket and returns its public URL, which is what gets
// saved into portfolio_items.image_url.
export async function uploadPortfolioImage(file) {
  if (!isSupabaseConfigured) return { url: null, error: 'not-configured' }
  let toUpload = file
  try {
    // Loaded on demand, not bundled into the public site's initial
    // download — this library is only ever needed on the admin upload
    // form, so nobody browsing the live site should pay for it.
    const { default: imageCompression } = await import('browser-image-compression')
    toUpload = await imageCompression(file, {
      maxSizeMB: 0.6,
      maxWidthOrHeight: 1600,
      useWebWorker: true,
      fileType: file.type,
    })
  } catch {
    // If compression fails for any reason, fall back to uploading the
    // original file rather than blocking the admin from saving at all.
    toUpload = file
  }
  const ext = file.name.split('.').pop() || 'jpg'
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
  const { error: uploadError } = await supabase.storage
    .from('portfolio-images')
    .upload(path, toUpload, { cacheControl: '3600', upsert: false })
  if (uploadError) return { url: null, error: uploadError.message }
  const { data } = supabase.storage.from('portfolio-images').getPublicUrl(path)
  return { url: data.publicUrl, error: null }
}

export const PORTFOLIO_CATEGORIES = ['branding', 'print', 'mockup', 'apparel']