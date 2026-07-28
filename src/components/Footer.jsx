import { siteConfig } from '../siteConfig'

export default function Footer() {
  return (
    <footer>
      <div className="container">
        © {new Date().getFullYear()} {siteConfig.nombre} · Todos los derechos reservados
      </div>
    </footer>
  )
}
