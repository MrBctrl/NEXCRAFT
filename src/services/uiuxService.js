import { supabase, isSupabaseConfigured } from '../lib/supabaseClient.js'
import { mobileProjects as staticMobileProjects } from '../data/uiuxProjects.js'

export async function fetchVisibleUiuxProjects() {
  if (!isSupabaseConfigured) {
    return staticMobileProjects.map((p) => ({
      id: p.id, title: p.title, desc: p.desc, tags: p.tags,
      mediaType: 'video', mediaUrl: p.video,
    }))
  }
  const { data, error } = await supabase
    .from('uiux_projects')
    .select('*')
    .eq('visible', true)
    .order('sort_order', { ascending: true })
  if (error || !data || data.length === 0) {
    return staticMobileProjects.map((p) => ({
      id: p.id, title: p.title, desc: p.desc, tags: p.tags,
      mediaType: 'video', mediaUrl: p.video,
    }))
  }
  return data.map((row) => ({
    id: row.id,
    title: row.title,
    desc: row.description,
    tags: row.tags || [],
    mediaType: row.media_type,
    mediaUrl: row.media_url,
  }))
}

export async function fetchAllUiuxProjects() {
  if (!isSupabaseConfigured) return { data: [], error: 'not-configured' }
  const { data, error } = await supabase
    .from('uiux_projects')
    .select('*')
    .order('sort_order', { ascending: true })
  return { data: data || [], error: error?.message || null }
}

export async function createUiuxProject(item) {
  if (!isSupabaseConfigured) return { error: 'not-configured' }
  const { error } = await supabase.from('uiux_projects').insert([{
    title: item.title,
    description: item.description || null,
    media_type: item.mediaType,
    media_url: item.mediaUrl || null,
    tags: item.tags || [],
    visible: item.visible ?? true,
    sort_order: item.sortOrder ?? 0,
  }])
  return { error: error?.message || null }
}

export async function updateUiuxProject(id, item) {
  if (!isSupabaseConfigured) return { error: 'not-configured' }
  const { error } = await supabase.from('uiux_projects').update({
    title: item.title,
    description: item.description || null,
    media_type: item.mediaType,
    media_url: item.mediaUrl || null,
    tags: item.tags || [],
    visible: item.visible,
    sort_order: item.sortOrder,
  }).eq('id', id)
  return { error: error?.message || null }
}

export async function deleteUiuxProject(id) {
  if (!isSupabaseConfigured) return { error: 'not-configured' }
  const { error } = await supabase.from('uiux_projects').delete().eq('id', id)
  return { error: error?.message || null }
}

// Uploads either an image or a video, routing to whichever existing
// storage bucket already handles that file type — no new bucket needed.
export async function uploadUiuxMedia(file, mediaType) {
  if (!isSupabaseConfigured) return { url: null, error: 'not-configured' }
  const bucket = mediaType === 'image' ? 'portfolio-images' : 'project-videos'
  let toUpload = file
  if (mediaType === 'image') {
    try {
      const { default: imageCompression } = await import('browser-image-compression')
      toUpload = await imageCompression(file, {
        maxSizeMB: 0.6,
        maxWidthOrHeight: 1600,
        useWebWorker: true,
        fileType: file.type,
      })
    } catch {
      toUpload = file
    }
  }
  const ext = file.name.split('.').pop() || (mediaType === 'image' ? 'jpg' : 'mp4')
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(path, toUpload, { cacheControl: '3600', upsert: false })
  if (uploadError) return { url: null, error: uploadError.message }
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return { url: data.publicUrl, error: null }
}
