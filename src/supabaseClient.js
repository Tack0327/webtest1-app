import { createClient } from '@supabase/supabase-js'

// Supabaseの接続情報は.envから読み込む（.envはGit管理対象外）
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
