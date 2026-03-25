"use client"

import { useState, useMemo, forwardRef, useImperativeHandle, useEffect } from "react"
import {
  Landmark,
  Briefcase,
  Baby,
  Gavel,
  TrendingUp,
  FileText,
  Building,
  Scale,
  Users,
  Shield,
  Heart,
  Banknote,
  Landmark as Bank,
  Home,
  Lightbulb,
  Zap,
  GraduationCap,
  BookOpen,
  MapPin,
  Phone,
  Mail,
  Building2,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

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
  { id: 37, nombre: "Maria Francisca Gallegos-Anda", edad: 43, grado: "Abogada de los Juzgados y Tribunales de la Republica", posgrados: ["Master en Derecho de Familia y Ninez"], especialidades: ["Ninez"], subespecialidades: ["Proteccion Integral", "Custodia de Menores"], firma: "Gallegos, Valarezo & Neira", ubicacion: "Quito, Pichincha", telefono: "+593 2 244 3866", email: "mgallegos@gvnabogados.com" },
  { id: 38, nombre: "Blanca Gomez de la Torre", edad: 48, grado: "Abogada de los Juzgados y Tribunales de la Republica", posgrados: ["Especialista en Derecho de Familia"], especialidades: ["Ninez", "Economico"], subespecialidades: ["Adopciones", "Pension Alimenticia"], firma: "Perez Bustamante & Ponce", ubicacion: "Quito, Pichincha", telefono: "+593 2 256 2680", email: "bgomez@pbpabogados.com" },
]

const especialidadesData = [
  {
    id: "societario",
    nombre: "Societario",
    icono: Building,
    descripcion: "Derecho societario, constitucion de empresas, fusiones, adquisiciones, gobierno corporativo y restructuraciones empresariales.",
    subcategorias: [
      { id: "constitucion", nombre: "Constitucion de Empresas", icono: FileText },
      { id: "fusiones", nombre: "Fusiones y Adquisiciones", icono: Users },
      { id: "gobierno-corporativo", nombre: "Gobierno Corporativo", icono: Shield },
      { id: "reestructuracion", nombre: "Reestructuracion Empresarial", icono: Scale },
    ],
  },
  {
    id: "administrativo",
    nombre: "Administrativo",
    icono: Landmark,
    descripcion: "Derecho publico, contratacion estatal, procesos administrativos y regulacion sectorial.",
    subcategorias: [
      { id: "public-law", nombre: "Public Law", icono: Scale },
      { id: "contratacion", nombre: "Contratacion Publica", icono: FileText },
      { id: "concesiones", nombre: "Concesiones", icono: Building },
      { id: "regulatorio", nombre: "Derecho Regulatorio", icono: Shield },
    ],
  },
  {
    id: "laboral",
    nombre: "Laboral",
    icono: Briefcase,
    descripcion: "Relaciones de trabajo, seguridad social, despidos, contratos laborales y beneficios sociales.",
    subcategorias: [
      { id: "relaciones", nombre: "Relaciones Laborales", icono: Users },
      { id: "seguridad-social", nombre: "Seguridad Social", icono: Shield },
      { id: "despidos", nombre: "Despidos", icono: FileText },
      { id: "beneficios", nombre: "Beneficios Sociales", icono: Banknote },
    ],
  },
  {
    id: "ninez",
    nombre: "Ninez",
    icono: Baby,
    descripcion: "Derecho de familia, custodia, pension alimenticia, adopciones y proteccion integral de ninas, ninos y adolescentes.",
    subcategorias: [
      { id: "custodia", nombre: "Custodia de Menores", icono: Users },
      { id: "pension", nombre: "Pension Alimenticia", icono: Banknote },
      { id: "adopciones", nombre: "Adopciones", icono: Heart },
      { id: "proteccion", nombre: "Proteccion Integral", icono: Shield },
    ],
  },
  {
    id: "penal",
    nombre: "Penal",
    icono: Gavel,
    descripcion: "Litigio, arbitraje, resolucion de disputas y defensa en procesos penales.",
    subcategorias: [
      { id: "dispute", nombre: "Dispute Resolution", icono: Scale },
      { id: "arbitraje", nombre: "Arbitraje Internacional", icono: Landmark },
      { id: "litigio", nombre: "Litigio Comercial", icono: FileText },
      { id: "delitos", nombre: "Delitos Economicos", icono: TrendingUp },
    ],
  },
  {
    id: "economico",
    nombre: "Economico",
    icono: TrendingUp,
    descripcion: "Derecho corporativo, bancario, tributario, inmobiliario, propiedad intelectual y energia.",
    subcategorias: [
      { id: "banking", nombre: "Banking & Finance", icono: Bank },
      { id: "corporate", nombre: "Corporate/Commercial", icono: Building },
      { id: "tax", nombre: "Tax", icono: Banknote },
      { id: "real-estate", nombre: "Real Estate", icono: Home },
      { id: "ip", nombre: "Intellectual Property", icono: Lightbulb },
      { id: "energy", nombre: "Energy & Natural Resources", icono: Zap },
    ],
  },
]

export interface EspecialidadesRef {
  abrirModal: (espNombre: string, subcat?: string) => void
}

interface EspecialidadesProps {
  subcategoriaInicial?: { especialidad: string; subcategoria: string } | null
}

const Especialidades = forwardRef<EspecialidadesRef, EspecialidadesProps>(
  function Especialidades({ subcategoriaInicial }, ref) {
    const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState<(typeof especialidadesData)[0] | null>(null)
    const [subcategoriaSeleccionada, setSubcategoriaSeleccionada] = useState<string | null>(null)

    useImperativeHandle(ref, () => ({
      abrirModal: (espNombre: string, subcat?: string) => {
        const esp = especialidadesData.find((e) => e.nombre === espNombre)
        if (esp) {
          setEspecialidadSeleccionada(esp)
          setSubcategoriaSeleccionada(subcat || null)
        }
      },
    }))

    useEffect(() => {
      if (subcategoriaInicial) {
        const esp = especialidadesData.find((e) => e.nombre === subcategoriaInicial.especialidad)
        if (esp) {
          setEspecialidadSeleccionada(esp)
          setSubcategoriaSeleccionada(subcategoriaInicial.subcategoria)
        }
      }
    }, [subcategoriaInicial])

    const abogadosPorEspecialidad = useMemo(() => {
      if (!especialidadSeleccionada) return []
      return abogados
        .filter((abogado) => abogado.especialidades.includes(especialidadSeleccionada.nombre))
        .sort((a, b) => a.nombre.localeCompare(b.nombre))
    }, [especialidadSeleccionada])

    const abogadosPorSubcategoria = useMemo(() => {
      if (!especialidadSeleccionada || !subcategoriaSeleccionada) return abogadosPorEspecialidad
      return abogadosPorEspecialidad.filter((abogado) => abogado.subespecialidades?.includes(subcategoriaSeleccionada))
    }, [abogadosPorEspecialidad, subcategoriaSeleccionada])

    const handleEspecialidadClick = (esp: (typeof especialidadesData)[0]) => {
      setEspecialidadSeleccionada(esp)
      setSubcategoriaSeleccionada(null)
    }

    return (
      <div className="py-24 bg-[#0a0d12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
              {"Especialidades "}<span className="text-gradient">Legales</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {"Explora las areas del derecho y sus subcategorias para encontrar el profesional adecuado."}
            </p>
            <p className="text-sm text-gray-500 mt-4 max-w-xl mx-auto">
              {"* El listado de profesionales es informativo. Cada abogado es responsable de su practica."}
            </p>
          </div>

          {/* Grid de Especialidades */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
            {especialidadesData.map((esp) => {
              const Icono = esp.icono
              return (
                <Card
                  key={esp.id}
                  onClick={() => handleEspecialidadClick(esp)}
                  className="bg-[#1a1f2e] border-[#c9a227]/20 hover:border-[#c9a227]/50 transition-all duration-300 hover:gold-glow cursor-pointer group"
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 rounded-full bg-[#c9a227]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#c9a227]/20 transition-colors">
                      <Icono className="w-7 h-7 text-[#c9a227]" />
                    </div>
                    <h3 className="text-foreground font-semibold text-lg mb-2">{esp.nombre}</h3>
                    <p className="text-gray-400 text-sm line-clamp-3">{esp.descripcion}</p>
                    <div className="mt-4 pt-4 border-t border-[#c9a227]/10">
                      <span className="text-[#c9a227] text-xs font-medium">{esp.subcategorias.length} subcategorias</span>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Dialog */}
          <Dialog
            open={!!especialidadSeleccionada}
            onOpenChange={() => {
              setEspecialidadSeleccionada(null)
              setSubcategoriaSeleccionada(null)
            }}
          >
            <DialogContent className="bg-[#1a1f2e] border-[#c9a227]/30 max-w-5xl max-h-[85vh] overflow-y-auto">
              {especialidadSeleccionada && (
                <>
                  <DialogHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#c9a227]/10 flex items-center justify-center">
                        <especialidadSeleccionada.icono className="w-6 h-6 text-[#c9a227]" />
                      </div>
                      <div>
                        <DialogTitle className="text-foreground text-2xl font-serif">{especialidadSeleccionada.nombre}</DialogTitle>
                        <p className="text-gray-400 text-sm mt-1">{especialidadSeleccionada.descripcion}</p>
                      </div>
                    </div>
                  </DialogHeader>

                  {/* Subcategorias */}
                  <div className="mt-6">
                    <h4 className="text-[#c9a227] font-semibold mb-4 text-sm uppercase tracking-wider">Subcategorias</h4>
                    <div className="flex flex-wrap gap-3 mb-6">
                      <button
                        onClick={() => setSubcategoriaSeleccionada(null)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          subcategoriaSeleccionada === null
                            ? "bg-[#c9a227] text-[#0f1419]"
                            : "bg-[#0f1419] text-gray-400 border border-[#c9a227]/30 hover:border-[#c9a227]"
                        }`}
                      >
                        Todos
                      </button>
                      {especialidadSeleccionada.subcategorias.map((sub) => {
                        const SubIcono = sub.icono
                        return (
                          <button
                            key={sub.id}
                            onClick={() => setSubcategoriaSeleccionada(sub.nombre)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                              subcategoriaSeleccionada === sub.nombre
                                ? "bg-[#c9a227] text-[#0f1419]"
                                : "bg-[#0f1419] text-gray-400 border border-[#c9a227]/30 hover:border-[#c9a227] hover:text-[#c9a227]"
                            }`}
                          >
                            <SubIcono className="w-4 h-4" />
                            {sub.nombre}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Abogados */}
                  <div className="mt-6">
                    <h4 className="text-[#c9a227] font-semibold mb-4 text-sm uppercase tracking-wider">
                      {"Profesionales "}
                      <span className="text-gray-500 normal-case ml-2">
                        ({abogadosPorSubcategoria.length} encontrados
                        {subcategoriaSeleccionada && ` en ${subcategoriaSeleccionada}`})
                      </span>
                    </h4>

                    {abogadosPorSubcategoria.length > 0 ? (
                      <div className="flex flex-col gap-4">
                        {abogadosPorSubcategoria.map((abogado) => (
                          <Card key={abogado.id} className="bg-[#0f1419] border-[#c9a227]/20">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h5 className="text-foreground font-semibold text-sm">Abg. {abogado.nombre}</h5>
                                  <div className="flex items-center gap-1 text-[#c9a227]/70 text-xs mt-1">
                                    <Building2 className="w-3 h-3" />
                                    <span>{abogado.firma}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-1 mb-2">
                                {abogado.especialidades.map((esp, idx) => (
                                  <Badge key={idx} className="bg-[#c9a227]/10 text-[#c9a227] border-none text-xs">
                                    {esp}
                                  </Badge>
                                ))}
                              </div>
                              {abogado.subespecialidades && (
                                <div className="flex flex-wrap gap-1 mb-2">
                                  {abogado.subespecialidades.map((sub, idx) => (
                                    <Badge key={idx} className="bg-[#8b7355]/20 text-[#e8d5a3] border-none text-xs">
                                      {sub}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                              <div className="flex flex-col gap-1 mb-3">
                                <div className="flex items-start gap-2 text-xs text-gray-400">
                                  <GraduationCap className="w-3 h-3 flex-shrink-0 mt-0.5" />
                                  <span className="line-clamp-1">{abogado.grado}</span>
                                </div>
                                {abogado.posgrados.length > 0 && (
                                  <div className="flex items-start gap-2 text-xs text-gray-400">
                                    <BookOpen className="w-3 h-3 flex-shrink-0 mt-0.5" />
                                    <span className="line-clamp-1">{abogado.posgrados.join(", ")}</span>
                                  </div>
                                )}
                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                  <MapPin className="w-3 h-3" />
                                  <span>{abogado.ubicacion}</span>
                                </div>
                              </div>
                              <div className="flex gap-2 pt-3 border-t border-[#c9a227]/10">
                                <a href={`tel:${abogado.telefono}`} className="flex-1">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full border-[#c9a227]/50 text-[#c9a227] hover:bg-[#c9a227]/10 text-xs"
                                  >
                                    <Phone className="w-3 h-3 mr-1" />
                                    Llamar
                                  </Button>
                                </a>
                                <a href={`mailto:${abogado.email}`} className="flex-1">
                                  <Button
                                    size="sm"
                                    className="flex-1 bg-gradient-to-r from-[#c9a227] to-[#8b7355] text-[#0f1419] font-semibold hover:opacity-90 text-xs"
                                  >
                                    <Mail className="w-3 h-3 mr-1" />
                                    Contactar
                                  </Button>
                                </a>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 bg-[#0f1419] rounded-lg">
                        <p className="text-gray-500">No hay profesionales registrados en esta subcategoria.</p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    )
  }
)

export default Especialidades
