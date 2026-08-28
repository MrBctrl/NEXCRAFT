import { supabase, isSupabaseConfigured } from '../lib/supabaseClient.js'
import { webProjects as staticWebProjects } from '../data/uiuxProjects.js'

export async function fetchVisibleWebProjects() {
  if (!isSupabaseConfigured) return staticWebProjects
  const { data, error } = await supabase
    .from('web_projects')
    .select('*')
    .eq('visible', true)
    .order('sort_order', { ascending: true })
  if (error || !data || data.length === 0) return staticWebProjects
  return data.map((row) => ({
    id: row.id,
    title: row.title,
    desc: row.description,
    url: row.url_label,
    video: row.video_url,
    tags: row.tags || [],
    github: row.github_url,
  }))
}

export async function fetchAllWebProjects() {
  if (!isSupabaseConfigured) return { data: [], error: 'not-configured' }
  const { data, error } = await supabase
    .from('web_projects')
    .select('*')
    .order('sort_order', { ascending: true })
  return { data: data || [], error: error?.message || null }
}

export async function createWebProject(item) {
  if (!isSupabaseConfigured) return { error: 'not-configured' }
  const { error } = await supabase.from('web_projects').insert([{
    title: item.title,
    description: item.description || null,
    url_label: item.urlLabel || null,
    video_url: item.videoUrl || null,
    tags: item.tags || [],
    github_url: item.githubUrl || null,
    visible: item.visible ?? true,
    sort_order: item.sortOrder ?? 0,
  }])
  return { error: error?.message || null }
}

export async function updateWebProject(id, item) {
  if (!isSupabaseConfigured) return { error: 'not-configured' }
  const { error } = await supabase.from('web_projects').update({
    title: item.title,
    description: item.description || null,
    url_label: item.urlLabel || null,
    video_url: item.videoUrl || null,
    tags: item.tags || [],
    github_url: item.githubUrl || null,
    visible: item.visible,
    sort_order: item.sortOrder,
  }).eq('id', id)
  return { error: error?.message || null }
}

export async function deleteWebProject(id) {
  if (!isSupabaseConfigured) return { error: 'not-configured' }
  const { error } = await supabase.from('web_projects').delete().eq('id', id)
  return { error: error?.message || null }
}
