import { createClient } from "@supabase/supabase-js"

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL="https://etpuhhfknburxqfjvbbk.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0cHVoaGZrbmJ1cnhxZmp2YmJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4MzAwNjAsImV4cCI6MjA4NDQwNjA2MH0.APiNQpvi6crXGAeHdZrut5Tv8dy-BOEhI2pK-Z72Rg0"
)
