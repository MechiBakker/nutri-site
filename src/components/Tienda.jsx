import { useEffect, useRef, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

// Productos de ejemplo: se muestran solo si todavía no cargaste
// productos reales en la tabla "productos" de Supabase.
const PRODUCTOS_DEMO = [
  {
    id: 'demo-1',
    nombre: 'Recetario de desayunos saludables',
    descripcion: '30 recetas rápidas, ricas en fibra y proteína, para arrancar el día.',
    precio: 4500,
    imagen_url: null,
    link_pago: '#',
  },
  {
    id: 'demo-2',
    nombre: 'Recetario plant-based',
    descripcion: '40 recetas 100% vegetales, con opciones sin gluten.',
    precio: 5200,
    imagen_url: null,
    link_pago: '#',
  },
  {
    id: 'demo-3',
    nombre: 'Recetario de meriendas para chicos',
    descripcion: 'Ideas prácticas y nutritivas para la vianda escolar.',
    precio: 3800,
    imagen_url: null,
    link_pago: '#',
  },
]

export default function Tienda() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [esDemo, setEsDemo] = useState(false)
  const carruselRef = useRef(null)

  function desplazar(direccion) {
    const el = carruselRef.current
    if (!el) return
    const primeraCard = el.querySelector('.producto-card')
    const ancho = primeraCard ? primeraCard.offsetWidth + 26 : 300
    el.scrollBy({ left: direccion * ancho, behavior: 'smooth' })
  }

  useEffect(() => {
    let activo = true

    async function cargarProductos() {
      const { data, error } = await supabase
        .from('productos')
        .select('*')
        .eq('activo', true)
        .order('creado_en', { ascending: true })

      if (!activo) return

      if (error || !data || data.length === 0) {
        setProductos(PRODUCTOS_DEMO)
        setEsDemo(true)
      } else {
        setProductos(data)
        setEsDemo(false)
      }
      setCargando(false)
    }

    cargarProductos()
    return () => { activo = false }
  }, [])

  return (
    <section className="tienda" id="tienda">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Recetarios digitales</span>
          <h2>Llevate una guía para cocinar mejor</h2>
          <p>
            Recetarios en PDF, listos para descargar apenas se acredita el pago
            en Mercado Pago.
          </p>
        </div>

        {esDemo && !cargando && (
          <p className="estado-tienda" style={{ marginBottom: 24 }}>
            Mostrando recetarios de ejemplo. Cargá los tuyos en la tabla{' '}
            <code>productos</code> de Supabase para reemplazarlos.
          </p>
        )}

        {cargando ? (
          <p className="estado-tienda">Cargando recetarios…</p>
        ) : (
          <div className="carrusel-wrap">
            <button
              className="carrusel-flecha izq"
              onClick={() => desplazar(-1)}
              aria-label="Recetario anterior"
            >
              ‹
            </button>

            <div className="productos-carrusel" ref={carruselRef}>
              {productos.map((p) => (
                <ProductoCard key={p.id} producto={p} />
              ))}
            </div>

            <button
              className="carrusel-flecha der"
              onClick={() => desplazar(1)}
              aria-label="Siguiente recetario"
            >
              ›
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

function ProductoCard({ producto }) {
  const precioFormateado = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(producto.precio)

  return (
    <div className="producto-card">
      <div className="producto-imagen">
        {producto.imagen_url ? (
          <img src={producto.imagen_url} alt={producto.nombre} />
        ) : null}
      </div>
      <h3>{producto.nombre}</h3>
      <p className="desc">{producto.descripcion}</p>
      <div className="producto-footer">
        <span className="producto-precio">{precioFormateado}</span>
        <a
          className="btn-comprar"
          href={producto.link_pago}
          target="_blank"
          rel="noopener noreferrer"
        >
          Comprar
        </a>
      </div>
    </div>
  )
}
