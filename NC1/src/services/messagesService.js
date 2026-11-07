import { supabase, isSupabaseConfigured } from '../lib/supabaseClient.js'

export async function submitMessage(fields) {
  if (!isSupabaseConfigured) {
    return { error: 'Contact form isn\'t connected yet — please email or WhatsApp us directly using the links below.' }
  }
  const { error } = await supabase.from('messages').insert([{
    name: fields.name,
    email: fields.email,
    phone: fields.phone || null,
    whatsapp: fields.whatsapp || null,
    company: fields.company || null,
    project_type: fields.projectType || null,
    message: fields.message,
  }])
  return { error: error?.message || null }
}

export async function fetchMessages() {
  if (!isSupabaseConfigured) return { data: [], error: 'not-configured' }
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false })
  return { data: data || [], error: error?.message || null }
}

export async function updateMessageStatus(id, status) {
  if (!isSupabaseConfigured) return { error: 'not-configured' }
  const { error } = await supabase.from('messages').update({ status }).eq('id', id)
  return { error: error?.message || null }
}

export const MESSAGE_STATUSES = ['NEW', 'CONTACTED', 'IN PROGRESS', 'CLOSED', 'ARCHIVED']
