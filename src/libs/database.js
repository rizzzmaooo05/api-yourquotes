import { createClient } from '@supabase/supabase-js'


const database = () => {
  const supabaseURL = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_KEY
  const supabaseClient = createClient(supabaseURL, supabaseKey)

  return supabaseClient
}

export default database