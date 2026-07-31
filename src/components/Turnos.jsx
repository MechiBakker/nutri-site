import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { siteConfig } from '../siteConfig'

const estadoInicial = {
  nombre: '',
  telefono: '',
  modalidad: 'presencial',
  preferencia_horaria: '',
}

export default function Turnos() {
  const [form, setForm] = useState(estadoInicial)
  const [enviando, setEnviando] = useState(false)
  const [resultado, setResultado] = useState(null) // { ok: bool, msg: string }

  function actualizar(campo, valor) {
    setForm((f) => ({ ...f, [campo]: valor }))
  }

  async function enviarSolicitud(e) {
    e.preventDefault()
    setEnviando(true)
    setResultado(null)

    const { error } = await supabase.from('turnos').insert([
      {
        nombre: form.nombre,
        telefono: form.telefono,
        modalidad: form.modalidad,
        preferencia_horaria: form.preferencia_horaria,
      },
    ])

    setEnviando(false)

    if (error) {
      setResultado({
        ok: false,
        msg: 'No pudimos guardar tu solicitud. Probá escribir directamente por WhatsApp.',
      })
    } else {
      setResultado({
        ok: true,
        msg: 'Listo, recibimos tu solicitud. Te contactamos a la brevedad.',
      })
      setForm(estadoInicial)
    }
  }

  const linkWhatsapp = `https://wa.me/${siteConfig.whatsappNumero}?text=${encodeURIComponent(
    siteConfig.whatsappMensajeTurno
  )}`

  return (
    <section className="turnos" id="turnos">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Turnos</span>
          <h2>Reservá tu consulta</h2>
          <p>Atención presencial y online. Elegí la modalidad que te quede mejor.</p>
        </div>

        <div className="turnos-grid">
          <div className="modalidades">
            <div className="modalidad-card">
              <h3>Consulta presencial</h3>
              <p>{siteConfig.direccionConsultorio}</p>
            </div>
            <div className="modalidad-card">
              <h3>Consulta online</h3>
              <p>Por videollamada, desde donde estés.</p>
            </div>

            <a
              className="btn btn-primario wsp-btn"
              href={linkWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              Escribir por WhatsApp
            </a>
          </div>

          <form className="form-turno" onSubmit={enviarSolicitud}>
            <label htmlFor="nombre">Nombre y apellido</label>
            <input
              id="nombre"
              required
              value={form.nombre}
              onChange={(e) => actualizar('nombre', e.target.value)}
            />

            <label htmlFor="telefono">Teléfono</label>
            <input
              id="telefono"
              required
              value={form.telefono}
              onChange={(e) => actualizar('telefono', e.target.value)}
            />

            <label htmlFor="modalidad">Modalidad</label>
            <select
              id="modalidad"
              value={form.modalidad}
              onChange={(e) => actualizar('modalidad', e.target.value)}
            >
              <option value="presencial">Presencial</option>
              <option value="online">Online</option>
            </select>

            <label htmlFor="preferencia">Preferencia de día u horario</label>
            <input
              id="preferencia"
              placeholder="Ej: martes por la tarde"
              value={form.preferencia_horaria}
              onChange={(e) => actualizar('preferencia_horaria', e.target.value)}
            />

            <button className="btn btn-primario" type="submit" disabled={enviando}>
              {enviando ? 'Enviando…' : 'Solicitar turno'}
            </button>

            {resultado && (
              <p className={`form-msg ${resultado.ok ? 'ok' : 'error'}`}>
                {resultado.msg}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
