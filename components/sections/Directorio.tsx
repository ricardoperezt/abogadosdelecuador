"use client"

import { useState, useMemo, useRef } from "react"
import { MapPin, Phone, Mail, GraduationCap, Calendar, BookOpen, Search, ChevronRight, Building2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const ESPECIALIDADES = ["Todas", "Administrativo", "Laboral", "Nines", "Penal", "Economico"] as const

const abogados = [
  { id: 1, nombre: "Bruno Pineda Cordero", edad: 48, grado: "Abogado de los Juzgados y Tribunales de la Republica", posgrados: ["Master en Derecho Financiero Internacional"], especialidades: ["Economico"], subespecialidades: ["Banking & Finance", "Derecho Financiero"], firma: "Perez Bustamante & Ponce", ubicacion: "Quito, Pichincha", telefono: "+593 2 256 2680", email: "bpineda@pbpabogados.com" },
  { id: 2, nombre: "Mario Alejandro Flor", edad: 52, grado: "Abogado de los Juzgados y Tribunales de la Republica", posgrados: ["Doctor en Derecho Economico"], especialidades: ["Economico"], subespecialidades: ["Banking & Finance", "Derecho Corporativo"], firma: "CorralRosales", ubicacion: "Quito, Pichincha", telefono: "+593 2 381 0950", email: "maflor@corralrosales.com" },
  { id: 3, nombre: "Diego Ramirez Mesec", edad: 45, grado: "Abogado de los Juzgados y Tribunales de la Republica", posgrados: ["Master en Derecho Bancario"], especialidades: ["Economico"], subespecialidades: ["Banking & Finance", "Mercado de Capitales"], firma: "Perez Bustamante & Ponce", ubicacion: "Quito, Pichincha", telefono: "+593 2 256 2680", email: "dramirez@pbpabogados.com" },
  { id: 4, nombre: "Jorge Alfonso Cevallos Carrera", edad: 50, grado: "Abogado de los Juzgados y Tribunales de la Republica", posgrados: ["MBA en Finanzas", "Master en Derecho Financiero"], especialidades: ["Economico"], subespecialidades: ["Banking & Finance", "Project Finance"], firma: "Cevallos, Casals, Balseca & Bilbao", ubicacion: "Quito, Pichincha", telefono: "+593 2 298 6456", email: "jacevallos@ccbbabogados.com" },
  { id: 5, nombre: "Boanerges Rodriguez Freire", edad: 55, grado: "Abogado de los Juzgados y Tribunales de la Republica", posgrados: ["Doctor en Derecho Mercantil"], especialidades: ["Economico"], subespecialidades: ["Banking & Finance", "Derecho Bursatil"], firma: "Rodriguez Rodriguez Abogados", ubicacion: "Guayaquil, Guayas", telefono: "+593 4 372 4990", email: "brodriguez@robroabogados.com" },
  { id: 6, nombre: "Diego Perez-Ordonez", edad: 58, grado: "Abogado de los Juzgados y Tribunales de la Republica", posgrados: ["Doctor en Derecho Corporativo", "LLM Harvard"], especialidades: ["Economico", "Penal"], subespecialidades: ["Corporate/Commercial", "M&A", "Dispute Resolution"], firma: "Perez Bustamante & Ponce", ubicacion: "Quito, Pichincha", telefono: "+593 2 256 2680", email: "dperez@pbpabogados.com" },
  { id: 7, nombre: "Daniel Robalino-Orellana", edad: 48, grado: "Abogado de los Juzgados y Tribunales de la Republica", posgrados: ["Master en Derecho Comercial Internacional"], especialidades: ["Economico"], subespecialidades: ["Corporate/Commercial", "Contratos Internacionales"], firma: "ROBALINO", ubicacion: "Quito, Pichincha", telefono: "+593 2 323 0011", email: "drobalino@robalino.com" },
  { id: 9, nombre: "Xavier Rosales", edad: 55, grado: "Abogado de los Juzgados y Tribunales de la Republica", posgrados: ["Doctor en Derecho Economico", "MBA"], especialidades: ["Economico"], subespecialidades: ["Corporate/Commercial", "Joint Ventures"], firma: "CorralRosales", ubicacion: "Quito, Pichincha", telefono: "+593 2 381 0950", email: "xrosales@corralrosales.com" },
  { id: 10, nombre: "Jose Rafael Bustamante Crespo", edad: 62, grado: "Abogado de los Juzgados y Tribunales de la Republica", posgrados: ["Doctor en Derecho Mercantil", "Profesor Universitario"], especialidades: ["Economico"], subespecialidades: ["Corporate/Commercial", "Reestructuracion Empresarial"], firma: "BUSTAMANTE FABARA", ubicacion: "Guayaquil, Guayas", telefono: "+593 4 251 9900", email: "jrbustamante@bfabogados.com" },
  { id: 11, nombre: "Javier Robalino-Orellana", edad: 45, grado: "Abogado de los Juzgados y Tribunales de la Republica", posgrados: ["Master en Derecho Corporativo"], especialidades: ["Economico"], subespecialidades: ["Corporate/Commercial", "Private Equity"], firma: "ROBALINO", ubicacion: "Quito, Pichincha", telefono: "+593 2 323 0011", email: "jrobalino@robalino.com" },
  { id: 12, nombre: "Juan Manuel Marchan", edad: 50, grado: "Abogado de los Juzgados y Tribunales de la Republica", posgrados: ["Master en Derecho Comercial"], especialidades: ["Economico"], subespecialidades: ["Corporate/Commercial", "Due Diligence"], firma: "Perez Bustamante & Ponce", ubicacion: "Quito, Pichincha", telefono: "+593 2 256 2680", email: "jmarchan@pbpabogados.com" },
  { id: 13, nombre: "Daniel Pino Arroba", edad: 47, grado: "Abogado de los Juzgados y Tribunales de la Republica", posgrados: ["Doctor en Derecho Economico"], especialidades: ["Economico"], subespecialidades: ["Corporate/Commercial", "Derecho de la Competencia"], firma: "Pino Elizalde Abogados", ubicacion: "Guayaquil, Guayas", telefono: "+593 4 230 0600", email: "dpino@pinoelizalde.com" },
  { id: 14, nombre: "Diego Almeida-Guzman", edad: 54, grado: "Abogado de los Juzgados y Tribunales de la Republica", posgrados: ["Master en Derecho Tributario", "CPA"], especialidades: ["Economico"], subespecialidades: ["Tax", "Planificacion Fiscal"], firma: "Almeida Guzman & Asociados", ubicacion: "Quito, Pichincha", telefono: "+593 2 254 4144", email: "dalmeida@almeidaguzman.com" },
  { id: 15, nombre: "Juan Gabriel Reyes-Varea", edad: 58, grado: "Abogado de los Juzgados y Tribunales de la Republica", posgrados: ["Doctor en Derecho Tributario"], especialidades: ["Economico"], subespecialidades: ["Tax", "Controversia Tributaria"], firma: "LEXVALOR Abogados", ubicacion: "Quito, Pichincha", telefono: "+593 2 382 7640", email: "jreyes@lexvalor.com" },
  { id: 16, nombre: "Carmen Simone", edad: 52, grado: "Abogada de los Juzgados y Tribunales de la Republica", posgrados: ["Master en Derecho Tributario Internacional"], especialidades: ["Economico"], subespecialidades: ["Tax", "Precios de Transferencia"], firma: "Perez Bustamante & Ponce", ubicacion: "Quito, Pichincha", telefono: "+593 2 256 2680", email: "csimone@pbpabogados.com" },
  { id: 17, nombre: "Santiago Alban", edad: 49, grado: "Abogado de los Juzgados y Tribunales de la Republica", posgrados: ["Master en Derecho Inmobiliario"], especialidades: ["Economico"], subespecialidades: ["Real Estate", "Desarrollo Inmobiliario"], firma: "Gallegos, Valarezo & Neira", ubicacion: "Quito, Pichincha", telefono: "+593 2 244 3866", email: "salban@gvnabogados.com" },
  { id: 18, nombre: "Juan Carlos Gallegos Happle", edad: 55, grado: "Abogado de los Juzgados y Tribunales de la Republica", posgrados: ["Doctor en Derecho Civil"], especialidades: ["Economico"], subespecialidades: ["Real Estate", "Derechos Reales"], firma: "Gallegos, Valarezo & Neira", ubicacion: "Quito, Pichincha", telefono: "+593 2 244 3866", email: "jgallegos@gvnabogados.com" },
  { id: 19, nombre: "Francisco Perez Gangotena", edad: 60, grado: "Abogado de los Juzgados y Tribunales de la Republica", posgrados: ["Master en Propiedad Intelectual"], especialidades: ["Economico"], subespecialidades: ["Intellectual Property", "Marcas y Patentes"], firma: "Falconi Puig Abogados", ubicacion: "Quito, Pichincha", telefono: "+593 2 256 2680", email: "fperez@falconipuig.com" },
  { id: 20, nombre: "Maria Cecilia Romoleroux", edad: 52, grado: "Abogada de los Juzgados y Tribunales de la Republica", posgrados: ["Master en Derecho de la Propiedad Industrial"], especialidades: ["Economico"], subespecialidades: ["Intellectual Property", "Derechos de Autor"], firma: "Falconi Puig Abogados", ubicacion: "Quito, Pichincha", telefono: "+593 2 256 2680", email: "mromoleroux@falconipuig.com" },
  { id: 21, nombre: "Francisco Gallegos", edad: 48, grado: "Abogado de los Juzgados y Tribunales de la Republica", posgrados: ["Especialista en Propiedad Intelectual"], especialidades: ["Economico"], subespecialidades: ["Intellectual Property", "Litigio de Marcas"], firma: "Gallegos, Valarezo & Neira", ubicacion: "Quito, Pichincha", telefono: "+593 2 244 3866", email: "fgallegos@gvnabogados.com" },
  { id: 22, nombre: "Hernan Perez Loose", edad: 65, grado: "Abogado de los Juzgados y Tribunales de la Republica", posgrados: ["Doctor en Derecho Minero y Petrolero"], especialidades: ["Economico", "Administrativo"], subespecialidades: ["Energy & Natural Resources", "Hidrocarburos"], firma: "Perez Bustamante & Ponce", ubicacion: "Quito, Pichincha", telefono: "+593 2 256 2680", email: "hploose@pbpabogados.com" },
  { id: 23, nombre: "Rodrigo Jijon", edad: 55, grado: "Abogado de los Juzgados y Tribunales de la Republica", posgrados: ["Master en Derecho de la Energia"], especialidades: ["Economico", "Administrativo"], subespecialidades: ["Energy & Natural Resources", "Mineria"], firma: "BUSTAMANTE FABARA", ubicacion: "Guayaquil, Guayas", telefono: "+593 4 251 9900", email: "rjijon@bfabogados.com" },
  { id: 24, nombre: "Edgar Ulloa-Balladares", edad: 58, grado: "Abogado de los Juzgados y Tribunales de la Republica", posgrados: ["Master en Derecho Ambiental y Energia"], especialidades: ["Economico", "Administrativo"], subespecialidades: ["Energy & Natural Resources", "Derecho Ambiental"], firma: "CorralRosales", ubicacion: "Quito, Pichincha", telefono: "+593 2 381 0950", email: "eulloa@corralrosales.com" },
  { id: 25, nombre: "Dunker Morales", edad: 50, grado: "Abogado de los Juzgados y Tribunales de la Republica", posgrados: ["Doctor en Derecho Procesal"], especialidades: ["Penal", "Economico"], subespecialidades: ["Dispute Resolution", "Arbitraje Internacional"], firma: "DMV Law", ubicacion: "Quito, Pichincha", telefono: "+593 2 323 0029", email: "dmorales@dmvlaw.com" },
  { id: 26, nombre: "Alberto Brown", edad: 55, grado: "Abogado de los Juzgados y Tribunales de la Republica", posgrados: ["Master en Arbitraje Comercial"], especialidades: ["Penal", "Economico"], subespecialidades: ["Dispute Resolution", "Litigio Comercial"], firma: "AVL Abogados", ubicacion: "Quito, Pichincha", telefono: "+593 2 298 4811", email: "abrown@avlabogados.com" },
  { id: 27, nombre: "Daniel Castelo", edad: 48, grado: "Abogado de los Juzgados y Tribunales de la Republica", posgrados: ["Master en Derecho Procesal"], especialidades: ["Penal"], subespecialidades: ["Dispute Resolution", "Litigio Civil"], firma: "Perez Bustamante & Ponce", ubicacion: "Quito, Pichincha", telefono: "+593 2 256 2680", email: "dcastelo@pbpabogados.com" },
  { id: 28, nombre: "Mario Navarrete-Serrano", edad: 52, grado: "Abogado de los Juzgados y Tribunales de la Republica", posgrados: ["Doctor en Derecho Penal"], especialidades: ["Penal"], subespecialidades: ["Dispute Resolution", "Delitos Economicos"], firma: "ROBALINO", ubicacion: "Quito, Pichincha", telefono: "+593 2 323 0011", email: "mnavarrete@robalino.com" },
  { id: 29, nombre: "Eduardo Carmigniani", edad: 58, grado: "Abogado de los Juzgados y Tribunales de la Republica", posgrados: ["Doctor en Derecho Procesal", "Profesor Universitario"], especialidades: ["Penal", "Economico"], subespecialidades: ["Dispute Resolution", "Mediacion"], firma: "Eduardo Carmigniani Estrategias Legales", ubicacion: "Quito, Pichincha", telefono: "+593 2 250 8040", email: "ecarmigniani@carmigniani.com" },
  { id: 30, nombre: "Cesar Coronel Jones", edad: 62, grado: "Abogado de los Juzgados y Tribunales de la Republica", posgrados: ["Master en Arbitraje Internacional"], especialidades: ["Penal", "Economico"], subespecialidades: ["Dispute Resolution", "Arbitraje de Inversion"], firma: "Coronel & Perez", ubicacion: "Quito, Pichincha", telefono: "+593 2 256 2680", email: "ccoronel@coronelperez.com" },
  { id: 31, nombre: "Daniela Cevallos Casals", edad: 45, grado: "Abogada de los Juzgados y Tribunales de la Republica", posgrados: ["Master en Derecho Administrativo"], especialidades: ["Administrativo"], subespecialidades: ["Public Law", "Contratacion Publica"], firma: "Cevallos, Casals, Balseca & Bilbao", ubicacion: "Quito, Pichincha", telefono: "+593 2 298 6456", email: "dcevallos@ccbbabogados.com" },
  { id: 32, nombre: "Emilio Suarez", edad: 50, grado: "Abogado de los Juzgados y Tribunales de la Republica", posgrados: ["Doctor en Derecho Constitucional"], especialidades: ["Administrativo"], subespecialidades: ["Public Law", "Derecho Regulatorio"], firma: "Falconi Puig Abogados", ubicacion: "Quito, Pichincha", telefono: "+593 2 256 2680", email: "esuarez@falconipuig.com" },
  { id: 33, nombre: "Marco Morales Tobar", edad: 48, grado: "Abogado de los Juzgados y Tribunales de la Republica", posgrados: ["Master en Derecho Publico"], especialidades: ["Administrativo", "Economico"], subespecialidades: ["Public Law", "Concesiones"], firma: "Tobar ZVS", ubicacion: "Quito, Pichincha", telefono: "+593 2 229 28115", email: "mmorales@tobarzvs.com" },
  { id: 34, nombre: "Paola Gachet", edad: 42, grado: "Abogada de los Juzgados y Tribunales de la Republica", posgrados: ["Especialista en Derecho Administrativo"], especialidades: ["Administrativo", "Economico"], subespecialidades: ["Public Law", "Recursos Administrativos"], firma: "Perez Bustamante & Ponce", ubicacion: "Quito, Pichincha", telefono: "+593 2 256 2680", email: "pgachet@pbpabogados.com" },
  { id: 35, nombre: "Juan Francisco Almeida Granja", edad: 48, grado: "Abogado de los Juzgados y Tribunales de la Republica", posgrados: ["Master en Derecho Laboral"], especialidades: ["Laboral"], subespecialidades: ["Relaciones Laborales", "Seguridad Social"], firma: "Almeida Guzman & Asociados", ubicacion: "Quito, Pichincha", telefono: "+593 2 254 4144", email: "jalmeida@almeidaguzman.com" },
  { id: 36, nombre: "Andrea Lara", edad: 45, grado: "Abogada de los Juzgados y Tribunales de la Republica", posgrados: ["Master en Derecho del Trabajo"], especialidades: ["Laboral"], subespecialidades: ["Despidos", "Beneficios Sociales"], firma: "LEXVALOR Abogados", ubicacion: "Quito, Pichincha", telefono: "+593 2 382 7640", email: "alara@lexvalor.com" },
  { id: 37, nombre: "Maria Francisca Gallegos-Anda", edad: 43, grado: "Abogada de los Juzgados y Tribunales de la Republica", posgrados: ["Master en Derecho de Familia y Ninez"], especialidades: ["Nines"], subespecialidades: ["Proteccion Integral", "Custodia de Menores"], firma: "Gallegos, Valarezo & Neira", ubicacion: "Quito, Pichincha", telefono: "+593 2 244 3866", email: "mgallegos@gvnabogados.com" },
  { id: 38, nombre: "Blanca Gomez de la Torre", edad: 48, grado: "Abogada de los Juzgados y Tribunales de la Republica", posgrados: ["Especialista en Derecho de Familia"], especialidades: ["Nines", "Economico"], subespecialidades: ["Adopciones", "Pension Alimenticia"], firma: "Perez Bustamante & Ponce", ubicacion: "Quito, Pichincha", telefono: "+593 2 256 2680", email: "bgomez@pbpabogados.com" },
]

const abogadosOrdenados = [...abogados].sort((a, b) => a.nombre.localeCompare(b.nombre))

function AbogadoCard({ abogado }: { abogado: (typeof abogados)[0] }) {
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
            <Badge key={idx} className="bg-[#c9a227]/20 text-[#c9a227] border-none text-xs">{esp}</Badge>
          ))}
        </div>
        {abogado.subespecialidades && (
          <div className="flex flex-wrap gap-1 mb-3">
            {abogado.subespecialidades.map((sub, idx) => (
              <Badge key={idx} className="bg-[#8b7355]/20 text-[#e8d5a3] border-none text-xs">{sub}</Badge>
            ))}
          </div>
        )}
        <div className="flex flex-col gap-1.5 mb-4">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Calendar className="w-4 h-4 text-[#c9a227]" />
            <span>{abogado.edad} anos</span>
          </div>
          <div className="flex items-start gap-2 text-gray-400 text-sm">
            <GraduationCap className="w-4 h-4 text-[#c9a227] flex-shrink-0 mt-0.5" />
            <span className="line-clamp-2">{abogado.grado}</span>
          </div>
          {abogado.posgrados.length > 0 && (
            <div className="flex items-start gap-2 text-gray-400 text-sm">
              <BookOpen className="w-4 h-4 text-[#c9a227] flex-shrink-0 mt-0.5" />
              <span className="line-clamp-2">{abogado.posgrados.join(", ")}</span>
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

export default function Directorio() {
  const [busqueda, setBusqueda] = useState("")
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState<string>("Todas")
  const [showMoreDialog, setShowMoreDialog] = useState(false)
  const [moreAbogados, setMoreAbogados] = useState<typeof abogados>([])
  const [moreTitle, setMoreTitle] = useState("")
  const resultadosRef = useRef<HTMLDivElement>(null)

  const abogadosFiltrados = useMemo(() => {
    return abogadosOrdenados.filter((abogado) => {
      const coincideBusqueda =
        abogado.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        abogado.ubicacion.toLowerCase().includes(busqueda.toLowerCase()) ||
        abogado.firma.toLowerCase().includes(busqueda.toLowerCase())
      const coincideEspecialidad = especialidadSeleccionada === "Todas" || abogado.especialidades.includes(especialidadSeleccionada)
      return coincideBusqueda && coincideEspecialidad
    })
  }, [busqueda, especialidadSeleccionada])

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
        ? `Todos los profesionales (${restoAbogados.length} mas)`
        : `Mas profesionales en ${especialidadSeleccionada} (${restoAbogados.length})`
    )
    setShowMoreDialog(true)
  }

  return (
    <div className="py-24 bg-[#0f1419]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            {"Directorio de "}<span className="text-gradient">Abogados</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {"Listado de profesionales del derecho ordenado alfabeticamente."}
          </p>
          <p className="text-sm text-gray-500 mt-4 max-w-xl mx-auto">
            {"* Este directorio es de caracter informativo. La inclusion en esta lista no implica recomendacion ni garantia de servicios profesionales."}
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
            {ESPECIALIDADES.map((esp) => (
              <button
                key={esp}
                onClick={() => handleCategoriaClick(esp)}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  especialidadSeleccionada === esp
                    ? "bg-[#c9a227] text-[#0f1419]"
                    : "bg-[#1a1f2e] text-gray-400 border border-[#c9a227]/30 hover:border-[#c9a227] hover:text-[#c9a227]"
                }`}
              >
                {esp}
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
              {"Ver "}{restoAbogados.length}{" profesionales mas"}
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
