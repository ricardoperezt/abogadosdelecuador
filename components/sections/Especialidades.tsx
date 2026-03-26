/// <reference path="../../types/react.d.ts" />

import {
  Baby,
  Briefcase,
  Gavel,
  Landmark,
  TrendingUp
} from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { getEspecialidadesConSubespecialidades, type EspecialidadConSubespecialidades } from '@/lib/especialidades-hybrid'

// Mapeo de iconos para especialidades
const iconMap: Record<string, any> = {
  'Administrativo': Landmark,
  'Laboral': Briefcase,
  'Niñez': Baby,
  'Penal': Gavel,
  'Económico': TrendingUp
}


export interface EspecialidadesRef {
  scrollToSubcategoria: (especialidad: string, subcategoria: string) => void
  abrirModal: (especialidad: string, subcategoria: string) => void
}

interface EspecialidadesProps {
  subcategoriaInicial?: {
    especialidad: string
    subcategoria: string
  }
}

const Especialidades = forwardRef<EspecialidadesRef, EspecialidadesProps>(
  ({ subcategoriaInicial }, ref) => {
    const [especialidades, setEspecialidades] = useState<EspecialidadConSubespecialidades[]>([])
    const [loading, setLoading] = useState(true)

    // Cargar datos desde Supabase
    useEffect(() => {
      const loadData = async () => {
        try {
          const data = await getEspecialidadesConSubespecialidades()
          setEspecialidades(data)
        } catch (error) {
          console.error('Error cargando especialidades:', error)
        } finally {
          setLoading(false)
        }
      }
      loadData()
    }, [])

    const scrollToSubcategoria = (especialidad: string, subcategoria: string) => {
      const element = document.getElementById(`${especialidad}-${subcategoria}`)
      if (element) {
        const yOffset = -100
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
        window.scrollTo({ top: y, behavior: 'smooth' })
      }
    }

    useImperativeHandle(ref, () => ({
      scrollToSubcategoria,
      abrirModal: (especialidad: string, subcategoria: string) => {
        setTimeout(() => {
          scrollToSubcategoria(especialidad, subcategoria)
        }, 500)
      }
    }))

    if (loading) {
      return (
        <div className="py-24 bg-[#0f1419]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-400">Cargando especialidades...</p>
          </div>
        </div>
      )
    }

    return (
      <div className="py-24 bg-[#0f1419]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              Especialidades <span className="text-gradient">Legales</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Explora las áreas del derecho y sus subcategorías para encontrar el profesional adecuado.
            </p>
            <p className="text-sm text-gray-500 mt-4 max-w-xl mx-auto">
              * El listado de profesionales es informativo. Cada abogado es responsable de su práctica.
            </p>
          </div>

          {/* Especialidades Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
            {especialidades.map((esp) => {
              const Icon = iconMap[esp.nombre] || TrendingUp

              return (
                <div
                  key={esp.id}
                  className="text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm bg-[#1a1f2e] border-[#c9a227]/20 hover:border-[#c9a227]/50 transition-all duration-300 hover:gold-glow cursor-pointer group"
                >
                  <div className="p-6 text-center">
                    <div className="w-14 h-14 rounded-full bg-[#c9a227]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#c9a227]/20 transition-colors">
                      <Icon className="w-7 h-7 text-[#c9a227]" />
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">{esp.nombre}</h3>
                    <p className="text-gray-400 text-sm line-clamp-3">
                      {esp.nombre === 'Administrativo' && 'Derecho público, contratación estatal, procesos administrativos y regulación sectorial.'}
                      {esp.nombre === 'Laboral' && 'Relaciones de trabajo, seguridad social, despidos, contratos laborales y beneficios sociales.'}
                      {esp.nombre === 'Niñez' && 'Derecho de familia, custodia, pensión alimenticia, adopciones y protección integral de niñas, niños y adolescentes.'}
                      {esp.nombre === 'Penal' && 'Litigio, arbitraje, resolución de disputas y defensa en procesos penales.'}
                      {esp.nombre === 'Económico' && 'Derecho corporativo, bancario, tributario, inmobiliario, propiedad intelectual y energía.'}
                    </p>
                    <div className="mt-4 pt-4 border-t border-[#c9a227]/10">
                      <span className="text-[#c9a227] text-xs font-medium">
                        {esp.subespecialidades.length} subcategoría{esp.subespecialidades.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
)

Especialidades.displayName = 'Especialidades'

export default Especialidades
