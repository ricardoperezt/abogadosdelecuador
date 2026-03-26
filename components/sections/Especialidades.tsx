/// <reference path="../../types/react.d.ts" />

import {
  Baby,
  Briefcase,
  Gavel,
  Landmark,
  TrendingUp,
  Users,
  Banknote,
  Heart,
  Shield,
  Phone,
  Mail,
  Calendar,
  GraduationCap,
  BookOpen,
  MapPin,
  Building2,
  X
} from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { getEspecialidadesConSubespecialidades, type EspecialidadConSubespecialidades } from '@/lib/especialidades-hybrid'
import { getAbogadosConDetalles } from '@/lib/abogados-hybrid'
import { AbogadoConDetalles } from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

// Mapeo de iconos para especialidades
const iconMap: Record<string, any> = {
  'Administrativo': Landmark,
  'Laboral': Briefcase,
  'Niñez': Baby,
  'Penal': Gavel,
  'Económico': TrendingUp
}

// Mapeo de iconos para subespecialidades
const subespecialidadIconMap: Record<string, any> = {
  'Custodia de Menores': Users,
  'Pensión Alimenticia': Banknote,
  'Adopciones': Heart,
  'Protección Integral': Shield,
  'Relaciones Laborales': Briefcase,
  'Seguridad Social': Shield,
  'Despidos': Users,
  'Beneficios Sociales': Banknote,
  'Banking & Finance': TrendingUp,
  'Derecho Financiero': Banknote,
  'Corporate/Commercial': Building2,
  'Tax': Banknote,
  'Real Estate': Building2,
  'Intellectual Property': BookOpen,
  'Energy & Natural Resources': Landmark,
  'Dispute Resolution': Gavel,
  'Public Law': Landmark,
  'Contratación Pública': Building2,
  'Concesiones': Building2,
  'Derecho Regulatorio': Landmark,
  'Recursos Administrativos': Shield,
  'default': Briefcase
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
    const [abogados, setAbogados] = useState<AbogadoConDetalles[]>([])
    const [loading, setLoading] = useState(true)
    const [showDialog, setShowDialog] = useState(false)
    const [selectedEspecialidad, setSelectedEspecialidad] = useState<EspecialidadConSubespecialidades | null>(null)
    const [selectedSubcategoria, setSelectedSubcategoria] = useState<string>('Todos')
    const [filteredAbogados, setFilteredAbogados] = useState<AbogadoConDetalles[]>([])

    // Cargar datos usando la misma lógica que DirectorioSupabase
    useEffect(() => {
      loadData()
    }, [])

    const loadData = async () => {
      try {
        console.log("🚀 Especialidades: Iniciando carga de datos...")
        
        // Usar la misma función que DirectorioSupabase
        const [abogadosData, especialidadesData] = await Promise.all([
          getAbogadosConDetalles(),
          getEspecialidadesConSubespecialidades()
        ])
        
        console.log("📊 Especialidades: Datos recibidos - abogados:", abogadosData.length, "especialidades:", especialidadesData.length)
        setAbogados(abogadosData)
        setEspecialidades(especialidadesData)
        
        // Debug: Mostrar todos los abogados y sus especialidades al cargar
        console.log('📋 Todos los abogados cargados:')
        abogadosData.forEach(abogado => {
          console.log(`  - ${abogado.nombre}:`, abogado.especialidades.map(e => e.nombre))
          console.log(`    Raw especialidades:`, abogado.especialidades)
          console.log(`    Length:`, abogado.especialidades.length)
        })
        
        // Debug específico para Alberto Brown
        const albertoBrown = abogadosData.find(abogado => abogado.nombre.includes('Alberto Brown'))
        if (albertoBrown) {
          console.log('🔍 Alberto Brown encontrado:')
          console.log('  Nombre:', albertoBrown.nombre)
          console.log('  Especialidades:', albertoBrown.especialidades)
          console.log('  Especialidades length:', albertoBrown.especialidades.length)
          console.log('  Subespecialidades:', albertoBrown.subespecialidades)
          console.log('  Posgrados:', albertoBrown.posgrados)
        } else {
          console.log('❌ Alberto Brown NO encontrado en los datos')
        }
        
        // Debug: Mostrar abogados con especialidad Niñez
        const abogadosNinez = abogadosData.filter(abogado => 
          abogado.especialidades.some(esp => 
            esp.nombre.toLowerCase().includes('ninez') || 
            esp.nombre.toLowerCase().includes('niñez')
          )
        )
        console.log('👶 Abogados con especialidad Niñez:', abogadosNinez.length)
        abogadosNinez.forEach(abogado => {
          console.log(`  - ${abogado.nombre}:`, abogado.especialidades.map(e => e.nombre))
        })
        
        // Debug: Mostrar abogados con especialidad Administrativo
        const abogadosAdmin = abogadosData.filter(abogado => 
          abogado.especialidades.some(esp => 
            esp.nombre.toLowerCase().includes('administrativo')
          )
        )
        console.log('🏢 Abogados con especialidad Administrativo:', abogadosAdmin.length)
        abogadosAdmin.forEach(abogado => {
          console.log(`  - ${abogado.nombre}:`, abogado.especialidades.map(e => e.nombre))
        })
        
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }

    // Filtrar abogados cuando cambia la especialidad o subcategoría seleccionada
    useEffect(() => {
      if (selectedEspecialidad) {
        console.log('🔍 Filtrando abogados para especialidad:', selectedEspecialidad.nombre)
        console.log('📊 Total abogados disponibles:', abogados.length)
        
        let filtrados = abogados.filter(abogado => {
          const tieneEspecialidad = abogado.especialidades.some(esp => 
            esp.nombre.toLowerCase() === selectedEspecialidad.nombre.toLowerCase()
          )
          console.log(`👤 ${abogado.nombre} - Tiene especialidad ${selectedEspecialidad.nombre}:`, tieneEspecialidad)
          console.log(`   Especialidades:`, abogado.especialidades.map(e => e.nombre))
          return tieneEspecialidad
        })

        console.log('✅ Abogados filtrados por especialidad:', filtrados.length)

        if (selectedSubcategoria !== 'Todos') {
          const antesSubfiltro = filtrados.length
          filtrados = filtrados.filter(abogado =>
            abogado.subespecialidades?.some(sub => 
              sub.nombre.toLowerCase() === selectedSubcategoria.toLowerCase()
            )
          )
          console.log(`🔍 Filtrado por subcategoría ${selectedSubcategoria}:`, antesSubfiltro, '->', filtrados.length)
        }

        console.log('🎯 Resultado final:', filtrados.length, 'abogados')
        setFilteredAbogados(filtrados)
      }
    }, [selectedEspecialidad, selectedSubcategoria, abogados])

    const handleEspecialidadClick = (especialidad: EspecialidadConSubespecialidades) => {
      console.log('🖱️ Click en especialidad:', especialidad.nombre)
      console.log('🔍 Exact name:', `"${especialidad.nombre}"`)
      setSelectedEspecialidad(especialidad)
      setSelectedSubcategoria('Todos')
      setShowDialog(true)
    }

    const handleSubcategoriaClick = (subcategoria: string) => {
      setSelectedSubcategoria(subcategoria)
    }

    // Componente AbogadoCard
    const AbogadoCard = ({ abogado }: { abogado: AbogadoConDetalles }) => {
      console.log('🃏 Renderizando AbogadoCard para:', abogado.nombre)
      console.log('  Especialidades:', abogado.especialidades)
      console.log('  Subespecialidades:', abogado.subespecialidades)
      
      return (
        <Card className="bg-[#0f1419] border-[#c9a227]/20">
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h5 className="text-white font-semibold text-sm">Abg. {abogado.nombre}</h5>
                <div className="flex items-center gap-1 text-[#c9a227]/70 text-xs mt-1">
                  <Building2 className="w-3 h-3" />
                  <span>{abogado.firma}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1 mb-2">
              {abogado.especialidades && abogado.especialidades.length > 0 ? (
                abogado.especialidades.map((esp, idx) => (
                  <Badge key={idx} className="bg-[#c9a227]/10 text-[#c9a227] border-none text-xs">
                    {esp.nombre}
                  </Badge>
                ))
              ) : (
                <span className="text-gray-500 text-xs">Sin especialidades</span>
              )}
            </div>
            
            {abogado.subespecialidades && abogado.subespecialidades.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {abogado.subespecialidades.map((sub, idx) => (
                  <Badge key={idx} className="bg-[#8b7355]/20 text-[#e8d5a3] border-none text-xs">
                    {sub.nombre}
                  </Badge>
                ))}
              </div>
            )}

            <div className="space-y-1 mb-3">
              <div className="flex items-start gap-2 text-xs text-gray-400">
                <Calendar className="w-3 h-3 flex-shrink-0 mt-0.5" />
                <span>{abogado.edad} años</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-gray-400">
                <GraduationCap className="w-3 h-3 flex-shrink-0 mt-0.5" />
                <span className="line-clamp-1">{abogado.grado}</span>
              </div>
              {abogado.posgrados && abogado.posgrados.length > 0 && (
                <div className="flex items-start gap-2 text-xs text-gray-400">
                  <BookOpen className="w-3 h-3 flex-shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{abogado.posgrados.map(p => p.nombre).join(', ')}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <MapPin className="w-3 h-3" />
                <span>{abogado.ubicacion}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-3 border-t border-[#c9a227]/10">
              <a href={`tel:${abogado.telefono.replace(/\s/g, '')}`} className="flex-1">
                <Button variant="outline" size="sm" className="w-full border-[#c9a227]/50 text-[#c9a227] hover:bg-[#c9a227]/10 text-xs">
                  <Phone className="w-3 h-3 mr-1" />
                  Llamar
                </Button>
              </a>
              <a href={`mailto:${abogado.email}`} className="flex-1">
                <Button size="sm" className="w-full bg-gradient-to-r from-[#c9a227] to-[#8b7355] text-[#0f1419] font-semibold hover:opacity-90 text-xs">
                  <Mail className="w-3 h-3 mr-1" />
                  Contactar
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      )
    }

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

          {/* Loading State - Show skeleton cards */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="text-card-foreground flex flex-col gap-6 rounded-xl border shadow-sm bg-[#1a1f2e] border-[#c9a227]/20 animate-pulse"
                >
                  <div className="p-6 text-center">
                    <div className="w-14 h-14 rounded-full bg-[#c9a227]/20 flex items-center justify-center mx-auto mb-4">
                    </div>
                    <div className="h-6 bg-[#c9a227]/20 rounded mb-2"></div>
                    <div className="h-3 bg-gray-600 rounded mb-1"></div>
                    <div className="h-3 bg-gray-600 rounded mb-1"></div>
                    <div className="h-3 bg-gray-600 rounded w-3/4 mx-auto"></div>
                    <div className="mt-4 pt-4 border-t border-[#c9a227]/10">
                      <div className="h-3 bg-[#c9a227]/20 rounded w-20 mx-auto"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Especialidades Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
              {especialidades.map((esp) => {
                const Icon = iconMap[esp.nombre] || TrendingUp

                return (
                  <div
                    key={esp.id}
                    onClick={() => handleEspecialidadClick(esp)}
                    className="text-card-foreground flex flex-col gap-6 rounded-xl border shadow-sm bg-[#1a1f2e] border-[#c9a227]/20 hover:border-[#c9a227]/50 transition-all duration-300 hover:gold-glow cursor-pointer group"
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
          )}

          {/* Dialog */}
          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogContent className="bg-[#1a1f2e] border-[#c9a227]/30 !w-[48vw] !max-w-none max-h-[85vh] overflow-y-auto p-6 rounded-2xl">
              <DialogHeader className="mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#c9a227]/10 flex items-center justify-center">
                    {selectedEspecialidad && (() => {
                      const Icon = iconMap[selectedEspecialidad.nombre] || TrendingUp
                      return <Icon className="w-6 h-6 text-[#c9a227]" />
                    })()}
                  </div>
                  <div>
                    <DialogTitle className="font-semibold text-white text-2xl font-serif">
                      {selectedEspecialidad?.nombre}
                    </DialogTitle>
                    <p className="text-gray-400 text-sm mt-1">
                      {selectedEspecialidad?.nombre === 'Administrativo' && 'Derecho público, contratación estatal, procesos administrativos y regulación sectorial.'}
                      {selectedEspecialidad?.nombre === 'Laboral' && 'Relaciones de trabajo, seguridad social, despidos, contratos laborales y beneficios sociales.'}
                      {selectedEspecialidad?.nombre === 'Niñez' && 'Derecho de familia, custodia, pensión alimenticia, adopciones y protección integral de niñas, niños y adolescentes.'}
                      {selectedEspecialidad?.nombre === 'Penal' && 'Litigio, arbitraje, resolución de disputas y defensa en procesos penales.'}
                      {selectedEspecialidad?.nombre === 'Económico' && 'Derecho corporativo, bancario, tributario, inmobiliario, propiedad intelectual y energía.'}
                    </p>
                  </div>
                </div>
              </DialogHeader>

              <div className="mt-6">
                <h4 className="text-[#c9a227] font-semibold mb-4 text-sm uppercase tracking-wider">Subcategorías</h4>
                <div className="flex flex-wrap gap-3 mb-6">
                  <button
                    onClick={() => handleSubcategoriaClick('Todos')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedSubcategoria === 'Todos'
                        ? 'bg-[#c9a227] text-[#0f1419]'
                        : 'bg-[#0f1419] text-gray-400 border border-[#c9a227]/30 hover:border-[#c9a227] hover:text-[#c9a227]'
                    }`}
                  >
                    Todos
                  </button>
                  {selectedEspecialidad?.subespecialidades.map((sub) => {
                    const Icon = subespecialidadIconMap[sub.nombre] || subespecialidadIconMap.default
                    return (
                      <button
                        key={sub.id}
                        onClick={() => handleSubcategoriaClick(sub.nombre)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          selectedSubcategoria === sub.nombre
                            ? 'bg-[#c9a227] text-[#0f1419]'
                            : 'bg-[#0f1419] text-gray-400 border border-[#c9a227]/30 hover:border-[#c9a227] hover:text-[#c9a227]'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {sub.nombre}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-[#c9a227] font-semibold mb-4 text-sm uppercase tracking-wider">
                  Profesionales<span className="text-gray-500 normal-case ml-2">({filteredAbogados.length} encontrados)</span>
                </h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-h-96 overflow-y-auto px-1 scrollbar-hide">
                  {filteredAbogados.length > 0 ? (
                    filteredAbogados.map((abogado) => (
                      <Card key={abogado.id} className="bg-[#0f1419] border border-[#c9a227]/30 hover:border-[#c9a227]/60 transition-all duration-200 py-0 shadow-md">
                      <CardContent className="p-5">
                        {/* Header */}
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <h5 className="text-white font-semibold text-base mb-1 leading-tight">Abg. {abogado.nombre}</h5>
                            <div className="flex items-center gap-1 text-[#c9a227]/70 text-xs">
                              <Building2 className="w-3 h-3" />
                              <span>{abogado.firma}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Specialties */}
                        <div className="space-y-2 mb-3">
                          {abogado.especialidades.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {abogado.especialidades.map((esp, idx) => (
                                <Badge key={idx} className="bg-[#c9a227]/10 text-[#c9a227] border-none text-xs px-2 py-1">
                                  {esp.nombre}
                                </Badge>
                              ))}
                            </div>
                          )}
                          
                          {abogado.subespecialidades && abogado.subespecialidades.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {abogado.subespecialidades.map((sub, idx) => (
                                <Badge key={idx} className="bg-[#8b7355]/20 text-[#e8d5a3] border-none text-xs px-2 py-1">
                                  {sub.nombre}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        {/* Info */}
                        <div className="space-y-2 mb-3">
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <Calendar className="w-3 h-3 flex-shrink-0" />
                            <span>{abogado.edad} años</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <GraduationCap className="w-3 h-3 flex-shrink-0" />
                            <span className="line-clamp-1">{abogado.grado}</span>
                          </div>
                          {abogado.posgrados && abogado.posgrados.length > 0 && (
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                              <BookOpen className="w-3 h-3 flex-shrink-0" />
                              <span className="line-clamp-1">{abogado.posgrados.map(p => p.nombre).join(', ')}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <MapPin className="w-3 h-3 flex-shrink-0" />
                            <span>{abogado.ubicacion}</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 pt-3 border-t border-[#c9a227]/10">
                          <a href={`tel:${abogado.telefono.replace(/\s/g, '')}`} className="flex-1">
                            <Button variant="outline" size="sm" className="w-full border-[#c9a227]/50 text-[#c9a227] hover:bg-[#c9a227]/10 text-xs h-8">
                              <Phone className="w-3 h-3 mr-1" />
                              Llamar
                            </Button>
                          </a>
                          <a href={`mailto:${abogado.email}`} className="flex-1">
                            <Button size="sm" className="w-full bg-gradient-to-r from-[#c9a227] to-[#8b7355] text-[#0f1419] font-semibold hover:opacity-90 text-xs h-8">
                              <Mail className="w-3 h-3 mr-1" />
                              Contactar
                            </Button>
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                    ))
                ) : (
                  <div className="col-span-1 lg:col-span-2 text-center py-8 text-gray-400">
                    <p>No se encontraron profesionales con los criterios seleccionados.</p>
                  </div>
                )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    )
  }
)

Especialidades.displayName = 'Especialidades'

export default Especialidades
