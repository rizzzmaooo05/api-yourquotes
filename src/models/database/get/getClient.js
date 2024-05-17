import { createClient } from "@supabase/supabase-js";
import 'dotenv/config'

const getClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_KEY
  const client = createClient(supabaseUrl, supabaseKey)
  return client
}

export default getClient