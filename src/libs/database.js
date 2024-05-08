import { createClient } from '@supabase/supabase-js'


const database = () => {
  const supabaseURL = 'https://gvudqzgsrwzynhwavnbo.supabase.co'
  const supabaseKey = 'yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2dWRxemdzcnd6eW5od2F2bmJvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNTA0MTE4NSwiZXhwIjoyMDMwNjE3MTg1fQ.W9EGXfaSloSUm_UHrqW0yV2Ly-SeHkT1UEORB68Uf-M'
  const supabaseClient = createClient(supabaseURL, supabaseKey)

  return supabaseClient
}

export default database