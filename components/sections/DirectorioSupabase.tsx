"use client"

/// <reference path="../../types/react.d.ts" />

import { AbogadoConDetalles, Especialidad } from "@/lib/types"
import { BookOpen, Building2, Calendar, ChevronRight, GraduationCap, Mail, MapPin, Phone, Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { getAbogadosConDetalles, getEspecialidades } from "@/lib/abogados-hybrid"
import { useEffect, useMemo, useRef, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function AbogadoCard({ abogado }: { abogado: AbogadoConDetalles; key?: string | number }) {
  return (
    <Card className="bg-[#1a1f2e] border-[#c9a227]/20 hover:border-[#c9a227]/50 transition-all duration-300">
      <CardContent className="p-5">
        <div className="mb-4">
          <h3 className="text-foreground font-semibold text-lg leading-tight mb-1">Abg. {abogado.nombre}</h3>
          <div className="flex items-center gap-1 text-[#c9a227]/70 text-xs">
            <Building2 className="w-3 h-3" />
            <span>{abogado.firma}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {abogado.especialidades.map((esp, idx) => (
            <Badge key={idx} className="bg-[#c9a227]/20 text-[#c9a227] border-none text-xs">{esp.nombre}</Badge>
          ))}
        </div>
        {abogado.subespecialidades && abogado.subespecialidades.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {abogado.subespecialidades.map((sub, idx) => (
              <Badge key={idx} className="bg-[#8b7355]/20 text-[#e8d5a3] border-none text-xs">{sub.nombre}</Badge>
            ))}
          </div>
        )}
        <div className="flex flex-col gap-1.5 mb-4">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Calendar className="w-4 h-4 text-[#c9a227]" />
            <span>{abogado.edad} años</span>
          </div>
          <div className="flex items-start gap-2 text-gray-400 text-sm">
            <GraduationCap className="w-4 h-4 text-[#c9a227] flex-shrink-0 mt-0.5" />
            <span className="line-clamp-2">{abogado.grado}</span>
          </div>
          {abogado.posgrados && abogado.posgrados.length > 0 && (
            <div className="flex items-start gap-2 text-gray-400 text-sm">
              <BookOpen className="w-4 h-4 text-[#c9a227] flex-shrink-0 mt-0.5" />
              <span className="line-clamp-2">{abogado.posgrados.map(p => p.nombre).join(", ")}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <MapPin className="w-4 h-4 text-[#c9a227]" />
            <span>{abogado.ubicacion}</span>
          </div>
        </div>
        <div className="flex gap-2 pt-3 border-t border-[#c9a227]/10">
          <a href={`tel:${abogado.telefono.replace(/\s/g, "")}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full border-[#c9a227]/50 text-[#c9a227] hover:bg-[#c9a227] hover:text-[#0f1419] hover:border-[#c9a227] text-xs transition-all duration-200">
              <Phone className="w-3 h-3 mr-1" />
              Llamar
            </Button>
          </a>
          <a href={`mailto:${abogado.email}`} className="flex-1">
            <Button size="sm" className="w-full bg-gradient-to-r from-[#c9a227] to-[#8b7355] text-[#0f1419] font-semibold hover:from-[#e8d5a3] hover:to-[#c9a227] text-xs transition-all duration-200">
              <Mail className="w-3 h-3 mr-1" />
              Contactar
            </Button>
          </a>
        </div>
      </CardContent>
    </Card>
  )
}

export default function DirectorioSupabase() {
  const [abogados, setAbogados] = useState<AbogadoConDetalles[]>([])
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([])
  const [loading, setLoading] = useState(true)
  const [busqueda, setBusqueda] = useState("")
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState<string>("Todas")
  const [showMoreDialog, setShowMoreDialog] = useState(false)
  const [moreAbogados, setMoreAbogados] = useState<AbogadoConDetalles[]>([])
  const [moreTitle, setMoreTitle] = useState("")
  const resultadosRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadData = async () => {
      console.log("🚀 DirectorioSupabase: Iniciando carga de datos...")
      try {
        const [abogadosData, especialidadesData] = await Promise.all([
          getAbogadosConDetalles(),
          getEspecialidades()
        ])
        console.log("📊 DirectorioSupabase: Datos recibidos - abogados:", abogadosData.length, "especialidades:", especialidadesData.length)
        setAbogados(abogadosData)
        setEspecialidades(especialidadesData)
      } catch (error) {
        console.error("❌ DirectorioSupabase: Error cargando datos:", error)
      } finally {
        console.log("✅ DirectorioSupabase: Carga finalizada, setLoading(false)")
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const abogadosOrdenados = useMemo(() => {
    return [...abogados].sort((a, b) => a.nombre.localeCompare(b.nombre))
  }, [abogados])

  const abogadosFiltrados = useMemo(() => {
    const filtrados = abogadosOrdenados.filter((abogado) => {
      const coincideBusqueda =
        abogado.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        abogado.ubicacion.toLowerCase().includes(busqueda.toLowerCase()) ||
        abogado.firma.toLowerCase().includes(busqueda.toLowerCase())
      const coincideEspecialidad = especialidadSeleccionada === "Todas" || 
        abogado.especialidades.some(esp => esp.nombre === especialidadSeleccionada)
      return coincideBusqueda && coincideEspecialidad
    })
    return filtrados
  }, [abogadosOrdenados, busqueda, especialidadSeleccionada])

  const handleCategoriaClick = (esp: string) => {
    setEspecialidadSeleccionada(esp)
    setTimeout(() => {
      if (resultadosRef.current) {
        const yOffset = -100
        const y = resultadosRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset
        window.scrollTo({ top: y, behavior: "smooth" })
      }
    }, 100)
  }

  const primerosSeis = abogadosFiltrados.slice(0, 6)
  const restoAbogados = abogadosFiltrados.slice(6)

  const handleVerMas = () => {
    setMoreAbogados(restoAbogados)
    setMoreTitle(
      especialidadSeleccionada === "Todas"
        ? `Todos los profesionales (${restoAbogados.length} más)`
        : `Más profesionales en ${especialidadSeleccionada} (${restoAbogados.length})`
    )
    setShowMoreDialog(true)
  }

  if (loading) {
    return (
      <div className="py-24 bg-[#0f1419]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">Cargando directorio...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="py-24 bg-[#0f1419]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            {"Directorio de "}<span className="text-gradient">Abogados</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {"Listado de profesionales del derecho ordenado alfabéticamente."}
          </p>
          <p className="text-sm text-gray-500 mt-4 max-w-xl mx-auto">
            {"* Este directorio es de carácter informativo. La inclusión en esta lista no implica recomendación ni garantía de servicios profesionales."}
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <Input
              type="text"
              placeholder="Buscar por nombre, firma o ciudad..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="pl-12 bg-[#1a1f2e] border-[#c9a227]/30 text-foreground placeholder:text-gray-500 focus:border-[#c9a227] h-14 text-lg"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <button
              key="Todas"
              onClick={() => handleCategoriaClick("Todas")}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                especialidadSeleccionada === "Todas"
                  ? "bg-[#c9a227] text-[#0f1419]"
                  : "bg-[#1a1f2e] text-gray-400 border border-[#c9a227]/30 hover:border-[#c9a227] hover:text-[#c9a227]"
              }`}
            >
              Todas
            </button>
            {especialidades.map((esp) => (
              <button
                key={esp.id}
                onClick={() => handleCategoriaClick(esp.nombre)}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  especialidadSeleccionada === esp.nombre
                    ? "bg-[#c9a227] text-[#0f1419]"
                    : "bg-[#1a1f2e] text-gray-400 border border-[#c9a227]/30 hover:border-[#c9a227] hover:text-[#c9a227]"
                }`}
              >
                {esp.nombre}
              </button>
            ))}
          </div>
        </div>

        <div ref={resultadosRef} className="mb-8 text-center">
          <p className="text-gray-400">
            {"Mostrando "}
            <span className="text-[#c9a227] font-semibold">{abogadosFiltrados.length}</span>
            {" profesional"}{abogadosFiltrados.length !== 1 ? "es" : ""}
            {especialidadSeleccionada !== "Todas" && (
              <span>{" en "}<span className="text-[#c9a227]">{especialidadSeleccionada}</span></span>
            )}
          </p>
        </div>

        {primerosSeis.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {primerosSeis.map((abogado) => (
              <AbogadoCard key={abogado.id} abogado={abogado} />
            ))}
          </div>
        )}

        {restoAbogados.length > 0 && (
          <div className="flex justify-center mb-12">
            <Button
              onClick={handleVerMas}
              variant="outline"
              size="lg"
              className="border-[#c9a227]/50 text-[#c9a227] hover:bg-[#c9a227] hover:text-[#0f1419] hover:border-[#c9a227] px-8 transition-all duration-200"
            >
              {"Ver "}{restoAbogados.length}{" profesionales más"}
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        )}

        {abogadosFiltrados.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No se encontraron profesionales con los criterios seleccionados.</p>
          </div>
        )}

        <Dialog open={showMoreDialog} onOpenChange={setShowMoreDialog}>
          <DialogContent className="bg-[#1a1f2e] border-[#c9a227]/30 max-w-3xl w-[95vw] max-h-[85vh] overflow-y-auto p-6">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-foreground text-2xl font-serif">{moreTitle}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              {moreAbogados.map((abogado) => (
                <AbogadoCard key={abogado.id} abogado={abogado} />
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
