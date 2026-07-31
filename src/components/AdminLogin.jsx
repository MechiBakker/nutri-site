import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  async function ingresar(e) {
    e.preventDefault()
    setCargando(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    setCargando(false)
    if (error) setError('Email o contraseña incorrectos.')
  }

  return (
    <div className="admin-login">
      <form className="admin-login-card" onSubmit={ingresar}>
        <h1>Panel de administración</h1>
        <p className="admin-login-sub">Ingresá con tu cuenta para gestionar los recetarios.</p>

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primario" type="submit" disabled={cargando}>
          {cargando ? 'Ingresando…' : 'Ingresar'}
        </button>

        {error && <p className="form-msg error">{error}</p>}
      </form>
    </div>
  )
}
