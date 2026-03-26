import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY

console.log("🔍 Configuración Supabase:")
console.log("URL:", supabaseUrl ? "✅ Configurada" : "❌ No configurada")
console.log("Key:", supabaseKey ? "✅ Configurada" : "❌ No configurada")

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Faltan variables de entorno de Supabase")
}

export const supabase = createClient(supabaseUrl!, supabaseKey!)
