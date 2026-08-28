import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// If these are missing, the app still builds and runs — every service
// function below fails gracefully (falls back to bundled static data for
// reads, shows a clear "not configured" error for writes) rather than
// crashing the whole site. See README for setup steps.
export const isSupabaseConfigured = Boolean(url && anonKey)

export const supabase = isSupabaseConfigured
  ? createClient(url, anonKey)
  : null
