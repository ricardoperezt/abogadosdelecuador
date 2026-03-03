import { useState, useEffect, useRef } from 'react'
import './App.css'
import Navigation from './sections/Navigation'
import Hero from './sections/Hero'
import Manifiesto from './sections/Manifiesto'
import Directorio from './sections/Directorio'
import Especialidades from './sections/Especialidades'
import Estudios from './sections/Estudios'
import SobreNosotros from './sections/SobreNosotros'
import Contacto from './sections/Contacto'
import Footer from './sections/Footer'

export interface SubcategoriaSeleccionada {
  especialidad: string
  subcategoria: string
}

function App() {
  const [activeSection, setActiveSection] = useState('inicio')
  const [subcategoriaSeleccionada, setSubcategoriaSeleccionada] = useState<SubcategoriaSeleccionada | null>(null)
  const especialidadesRef = useRef<{ abrirModal: (esp: string, sub?: string) => void } | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'manifiesto', 'especialidades', 'directorio', 'estudios', 'sobre-nosotros']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleSubcategoriaClick = (especialidad: string, subcategoria: string) => {
    setSubcategoriaSeleccionada({ especialidad, subcategoria })
    scrollToSection('especialidades')
    // Dar tiempo para que el scroll termine antes de abrir el modal
    setTimeout(() => {
      if (especialidadesRef.current) {
        especialidadesRef.current.abrirModal(especialidad, subcategoria)
      }
    }, 500)
  }

  return (
    <div className="min-h-screen bg-[#0f1419]">
      <Navigation 
        activeSection={activeSection} 
        onNavigate={scrollToSection}
        onSubcategoriaClick={handleSubcategoriaClick}
      />
      <main>
        <section id="inicio">
          <Hero onNavigate={scrollToSection} />
        </section>
        <section id="manifiesto">
          <Manifiesto />
        </section>
        <section id="especialidades">
          <Especialidades 
            ref={especialidadesRef}
            subcategoriaInicial={subcategoriaSeleccionada}
          />
        </section>
        <section id="directorio">
          <Directorio />
        </section>
        <section id="estudios">
          <Estudios />
        </section>
        <section id="sobre-nosotros">
          <SobreNosotros />
        </section>
        <Contacto />
      </main>
      <Footer />
    </div>
  )
}

export default App
