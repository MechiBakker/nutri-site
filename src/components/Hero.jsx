import { siteConfig } from '../siteConfig'

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="container">
        <div className="hero-texto">
          <span className="eyebrow">Nutrición basada en evidencia</span>
          <h1>{siteConfig.nombre}</h1>
          <p style={{ color: '#6f7f5f', marginTop: 6, fontWeight: 500 }}>
            {siteConfig.titulo}
          </p>
          <p className="bio">{siteConfig.bio}</p>
          <div className="hero-cta">
            <a className="btn btn-primario" href="#turnos">Pedir un turno</a>
            <a className="btn btn-secundario" href="#tienda">Ver recetarios</a>
          </div>
        </div>

        <div className="hero-foto-wrap">
          <div className="hero-foto-blob">
            <img className="foto" src={siteConfig.fotoUrl} alt={siteConfig.nombre} />
          </div>
        </div>
      </div>
    </section>
  )
}
