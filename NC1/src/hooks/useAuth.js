import { useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient.js'

export function useAuth() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false)
      return
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  const signIn = async (email, password) => {
    if (!isSupabaseConfigured) return { error: { message: 'Supabase is not configured yet.' } }
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error }
  }

  const signOut = async () => {
    if (!isSupabaseConfigured) return
    await supabase.auth.signOut()
  }

  return { session, loading, isAuthenticated: !!session, signIn, signOut }
}
