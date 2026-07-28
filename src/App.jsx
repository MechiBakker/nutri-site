import Hero from './components/Hero'
import Tienda from './components/Tienda'
import Turnos from './components/Turnos'
import Footer from './components/Footer'
import Divisor from './components/Divisor'

export default function App() {
  return (
    <>
      <Hero />
      <Divisor fondo="#ffffff" />
      <Tienda />
      <Divisor fondo="#3f4a37" />
      <Turnos />
      <Footer />
    </>
  )
}
