"use client"

/// <reference path="../types/react.d.ts" />

import { useState, useRef, useCallback, useEffect } from "react"
import Navigation from "@/components/sections/Navigation"
import Hero from "@/components/sections/Hero"
import Manifiesto from "@/components/sections/Manifiesto"
import Especialidades, { type EspecialidadesRef } from "@/components/sections/Especialidades"
import DirectorioSupabase from "@/components/sections/DirectorioSupabase"
import Estudios from "@/components/sections/Estudios"
import SobreNosotros from "@/components/sections/SobreNosotros"
import Contacto from "@/components/sections/Contacto"
import Footer from "@/components/sections/Footer"

export default function Home() {
  const [activeSection, setActiveSection] = useState("inicio")
  const [subcategoriaInicial, setSubcategoriaInicial] = useState<{
    especialidad: string
    subcategoria: string
  } | undefined>(undefined)

  const especialidadesRef = useRef<EspecialidadesRef>(null)

  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const setSectionRef = useCallback((id: string) => (el: HTMLDivElement | null) => {
    sectionRefs.current[id] = el
  }, [])

  const scrollToSection = useCallback((sectionId: string) => {
    const element = sectionRefs.current[sectionId]
    if (element) {
      const yOffset = -80
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }, [])

  const handleNavigate = useCallback(
    (sectionId: string) => {
      setActiveSection(sectionId)
      scrollToSection(sectionId)
    },
    [scrollToSection]
  )

  const handleSubcategoriaClick = useCallback(
    (especialidad: string, subcategoria: string) => {
      setActiveSection("especialidades")
      scrollToSection("especialidades")
      setTimeout(() => {
        if (especialidadesRef.current) {
          especialidadesRef.current.abrirModal(especialidad, subcategoria)
        } else {
          setSubcategoriaInicial({ especialidad, subcategoria })
        }
      }, 500)
    },
    [scrollToSection]
  )

  // Intersection Observer for active section tracking
  useEffect(() => {
    const observers: IntersectionObserver[] = []
    const sections = ["inicio", "manifiesto", "especialidades", "directorio", "estudios", "sobre-nosotros", "contacto"]

    sections.forEach((id) => {
      const element = sectionRefs.current[id]
      if (element) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveSection(id)
            }
          },
          { threshold: 0.3 }
        )
        observer.observe(element)
        observers.push(observer)
      }
    })

    return () => {
      observers.forEach((obs) => obs.disconnect())
    }
  }, [])

  return (
    <main className="min-h-screen bg-[#0f1419]">
      <Navigation activeSection={activeSection} onNavigate={handleNavigate} onSubcategoriaClick={handleSubcategoriaClick} />

      <div ref={setSectionRef("inicio")}>
        <Hero onNavigate={handleNavigate} />
      </div>

      <div ref={setSectionRef("manifiesto")}>
        <Manifiesto />
      </div>

      <div ref={setSectionRef("especialidades")}>
        <Especialidades ref={especialidadesRef} subcategoriaInicial={subcategoriaInicial} />
      </div>

      <div ref={setSectionRef("directorio")}>
        <DirectorioSupabase />
      </div>

      <div ref={setSectionRef("estudios")}>
        <Estudios />
      </div>

      <div ref={setSectionRef("sobre-nosotros")}>
        <SobreNosotros />
      </div>

      <div ref={setSectionRef("contacto")}>
        <Contacto />
      </div>

      <Footer />
    </main>
  )
}
