import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabaseConfigurado = Boolean(supabaseUrl && supabaseAnonKey)

if (!supabaseConfigurado) {
  console.warn(
    'Faltan las variables VITE_SUPABASE_URL y/o VITE_SUPABASE_ANON_KEY. ' +
    'La tienda va a mostrar productos de ejemplo y el formulario de turnos no va a guardar datos ' +
    'hasta que las configures (ver .env.example o Vercel → Settings → Environment Variables).'
  )
}

// Si faltan las variables, usamos valores "placeholder" válidos para que
// createClient no rompa toda la app: cada llamada real va a fallar de forma
// controlada (y ya está manejada en Tienda.jsx / Turnos.jsx) en lugar de
// tirar abajo el render de React entero.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
)