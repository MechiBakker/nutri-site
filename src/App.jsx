import { Routes, Route } from 'react-router-dom'
import Sitio from './pages/Sitio'
import Admin from './pages/Admin'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Sitio />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  )
}
