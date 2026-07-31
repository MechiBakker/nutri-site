import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import AdminLogin from '../components/AdminLogin'
import AdminDashboard from '../components/AdminDashboard'

export default function Admin() {
  const [sesion, setSesion] = useState(undefined) // undefined = todavía cargando

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSesion(data.session))

    const { data: listener } = supabase.auth.onAuthStateChange((_evento, nuevaSesion) => {
      setSesion(nuevaSesion)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  if (sesion === undefined) {
    return (
      <div className="admin-shell">
        <p>Cargando…</p>
      </div>
    )
  }

  return (
    <div className="admin-shell">
      {sesion ? <AdminDashboard /> : <AdminLogin />}
    </div>
  )
}
