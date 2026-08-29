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
    title: row.title,
    desc: row.description,
    img: row.image_url,
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
    description: item.description || null,
    image_url: item.imageUrl,
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
    description: item.description || null,
    image_url: item.imageUrl,
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
  const ext = file.name.split('.').pop() || 'jpg'
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
  const { error: uploadError } = await supabase.storage
    .from('portfolio-images')
    .upload(path, file, { cacheControl: '3600', upsert: false })
  if (uploadError) return { url: null, error: uploadError.message }
  const { data } = supabase.storage.from('portfolio-images').getPublicUrl(path)
  return { url: data.publicUrl, error: null }
}

export const PORTFOLIO_CATEGORIES = ['branding', 'print', 'mockup', 'apparel']
