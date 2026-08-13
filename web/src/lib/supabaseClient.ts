import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bupghhgcaisuaiertboo.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1cGdoaGdjYWlzdWFpZXJ0Ym9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY1NDA0MzAsImV4cCI6MjEwMjExNjQzMH0.dTECigbZv-pNU0AiNmZaIWEz_1ogV8idSk7qqvn3g6c'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase
