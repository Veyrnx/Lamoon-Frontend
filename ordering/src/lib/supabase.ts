import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Fail early with a clear message if the local environment is not configured.
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Supabase is not configured. Copy .env.example to .env.local and add your project URL and publishable/anon key.",
  )
}

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
      })
    : null
