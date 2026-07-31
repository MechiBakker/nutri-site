import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const vacio = {
  id: null,
  nombre: '',
  descripcion: '',
  precio: '',
  imagen_url: '',
  link_pago: '',
  activo: true,
}

export default function AdminDashboard() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [form, setForm] = useState(vacio)
  const [guardando, setGuardando] = useState(false)
  const [mensaje, setMensaje] = useState(null)

  async function cargar() {
    setCargando(true)
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .order('creado_en', { ascending: true })

    if (!error) setProductos(data)
    setCargando(false)
  }

  useEffect(() => { cargar() }, [])

  function actualizar(campo, valor) {
    setForm((f) => ({ ...f, [campo]: valor }))
  }

  function editar(producto) {
    setForm(producto)
    setMensaje(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function cancelarEdicion() {
    setForm(vacio)
    setMensaje(null)
  }

  async function guardar(e) {
    e.preventDefault()
    setGuardando(true)
    setMensaje(null)

    const payload = {
      nombre: form.nombre,
      descripcion: form.descripcion,
      precio: Number(form.precio),
      imagen_url: form.imagen_url || null,
      link_pago: form.link_pago,
      activo: form.activo,
    }

    const query = form.id
      ? supabase.from('productos').update(payload).eq('id', form.id)
      : supabase.from('productos').insert([payload])

    const { error } = await query
    setGuardando(false)

    if (error) {
      setMensaje({ ok: false, texto: 'Error al guardar: ' + error.message })
    } else {
      setMensaje({ ok: true, texto: form.id ? 'Recetario actualizado.' : 'Recetario creado.' })
      setForm(vacio)
      cargar()
    }
  }

  async function eliminar(id) {
    if (!confirm('¿Eliminar este recetario? Esta acción no se puede deshacer.')) return
    const { error } = await supabase.from('productos').delete().eq('id', id)
    if (!error) cargar()
  }

  async function cerrarSesion() {
    await supabase.auth.signOut()
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Recetarios</h1>
        <button className="btn btn-secundario" onClick={cerrarSesion}>Cerrar sesión</button>
      </div>

      <form className="admin-form" onSubmit={guardar}>
        <h2>{form.id ? 'Editar recetario' : 'Nuevo recetario'}</h2>

        <div className="admin-form-grid">
          <div>
            <label htmlFor="nombre">Nombre</label>
            <input id="nombre" required value={form.nombre}
              onChange={(e) => actualizar('nombre', e.target.value)} />
          </div>

          <div>
            <label htmlFor="precio">Precio (ARS)</label>
            <input id="precio" type="number" min="0" required value={form.precio}
              onChange={(e) => actualizar('precio', e.target.value)} />
          </div>

          <div className="admin-form-full">
            <label htmlFor="descripcion">Descripción</label>
            <input id="descripcion" value={form.descripcion}
              onChange={(e) => actualizar('descripcion', e.target.value)} />
          </div>

          <div>
            <label htmlFor="imagen_url">URL de la imagen</label>
            <input id="imagen_url" value={form.imagen_url}
              onChange={(e) => actualizar('imagen_url', e.target.value)}
              placeholder="https://..." />
          </div>

          <div>
            <label htmlFor="link_pago">Link de pago (Mercado Pago)</label>
            <input id="link_pago" required value={form.link_pago}
              onChange={(e) => actualizar('link_pago', e.target.value)}
              placeholder="https://mpago.la/..." />
          </div>

          <div className="admin-checkbox">
            <label htmlFor="activo">
              <input id="activo" type="checkbox" checked={form.activo}
                onChange={(e) => actualizar('activo', e.target.checked)} />
              {' '}Visible en la tienda
            </label>
          </div>
        </div>

        <div className="admin-form-actions">
          <button className="btn btn-primario" type="submit" disabled={guardando}>
            {guardando ? 'Guardando…' : form.id ? 'Guardar cambios' : 'Crear recetario'}
          </button>
          {form.id && (
            <button type="button" className="btn btn-secundario" onClick={cancelarEdicion}>
              Cancelar
            </button>
          )}
        </div>

        {mensaje && (
          <p className={`form-msg ${mensaje.ok ? 'ok-oscuro' : 'error'}`}>{mensaje.texto}</p>
        )}
      </form>

      <h2 className="admin-lista-titulo">Recetarios cargados</h2>

      {cargando ? (
        <p>Cargando…</p>
      ) : productos.length === 0 ? (
        <p>Todavía no cargaste ningún recetario.</p>
      ) : (
        <div className="admin-lista">
          {productos.map((p) => (
            <div className="admin-item" key={p.id}>
              <div>
                <strong>{p.nombre}</strong>
                <span className={`admin-badge ${p.activo ? 'on' : 'off'}`}>
                  {p.activo ? 'Visible' : 'Oculto'}
                </span>
                <p className="admin-item-desc">{p.descripcion}</p>
              </div>
              <div className="admin-item-actions">
                <button className="btn-link" onClick={() => editar(p)}>Editar</button>
                <button className="btn-link danger" onClick={() => eliminar(p.id)}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
