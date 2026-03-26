import {
  Baby,
  Landmark as Bank,
  Banknote,
  BookOpen,
  Briefcase,
  Building,
  Building2,
  FileText,
  Gavel,
  GraduationCap,
  Heart,
  Home,
  Landmark,
  Lightbulb,
  Mail,
  MapPin,
  Phone,
  Scale,
  Shield,
  TrendingUp,
  Users,
  Zap
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

// Abogados de Chambers & Partners
const abogados = [
  // ECONÓMICO - Banking & Finance
  { id: 1, nombre: 'Bruno Pineda Cordero', edad: 48, grado: 'Abogado de los Juzgados y Tribunales de la República', posgrados: ['Máster en Derecho Financiero Internacional'], especialidades: ['Económico'], subespecialidades: ['Banking & Finance', 'Derecho Financiero'], firma: 'Pérez Bustamante & Ponce', ubicacion: 'Quito, Pichincha', telefono: '+593 2 256 2680', email: 'bpineda@pbpabogados.com' },
  { id: 2, nombre: 'Mario Alejandro Flor', edad: 52, grado: 'Abogado de los Juzgados y Tribunales de la República', posgrados: ['Doctor en Derecho Económico'], especialidades: ['Económico'], subespecialidades: ['Banking & Finance', 'Derecho Corporativo'], firma: 'CorralRosales', ubicacion: 'Quito, Pichincha', telefono: '+593 2 381 0950', email: 'maflor@corralrosales.com' },
  { id: 3, nombre: 'Diego Ramírez Mesec', edad: 45, grado: 'Abogado de los Juzgados y Tribunales de la República', posgrados: ['Máster en Derecho Bancario'], especialidades: ['Económico'], subespecialidades: ['Banking & Finance', 'Mercado de Capitales'], firma: 'Pérez Bustamante & Ponce', ubicacion: 'Quito, Pichincha', telefono: '+593 2 256 2680', email: 'dramirez@pbpabogados.com' },
  { id: 4, nombre: 'Jorge Alfonso Cevallos Carrera', edad: 50, grado: 'Abogado de los Juzgados y Tribunales de la República', posgrados: ['MBA en Finanzas', 'Máster en Derecho Financiero'], especialidades: ['Económico'], subespecialidades: ['Banking & Finance', 'Project Finance'], firma: 'Cevallos, Casals, Balseca & Bilbao', ubicacion: 'Quito, Pichincha', telefono: '+593 2 298 6456', email: 'jacevallos@ccbbabogados.com' },
  { id: 5, nombre: 'Boanerges Rodríguez Freire', edad: 55, grado: 'Abogado de los Juzgados y Tribunales de la República', posgrados: ['Doctor en Derecho Mercantil'], especialidades: ['Económico'], subespecialidades: ['Banking & Finance', 'Derecho Bursátil'], firma: 'Rodriguez Rodriguez Abogados', ubicacion: 'Guayaquil, Guayas', telefono: '+593 4 372 4990', email: 'brodriguez@robroabogados.com' },
  
  // ECONÓMICO - Corporate/Commercial
  { id: 6, nombre: 'Diego Pérez-Ordóñez', edad: 58, grado: 'Abogado de los Juzgados y Tribunales de la República', posgrados: ['Doctor en Derecho Corporativo', 'LLM Harvard'], especialidades: ['Económico', 'Penal'], subespecialidades: ['Corporate/Commercial', 'M&A', 'Dispute Resolution'], firma: 'Pérez Bustamante & Ponce', ubicacion: 'Quito, Pichincha', telefono: '+593 2 256 2680', email: 'dperez@pbpabogados.com' },
  { id: 7, nombre: 'Daniel Robalino-Orellana', edad: 48, grado: 'Abogado de los Juzgados y Tribunales de la República', posgrados: ['Máster en Derecho Comercial Internacional'], especialidades: ['Económico'], subespecialidades: ['Corporate/Commercial', 'Contratos Internacionales'], firma: 'ROBALINO', ubicacion: 'Quito, Pichincha', telefono: '+593 2 323 0011', email: 'drobalino@robalino.com' },
  { id: 9, nombre: 'Xavier Rosales', edad: 55, grado: 'Abogado de los Juzgados y Tribunales de la República', posgrados: ['Doctor en Derecho Económico', 'MBA'], especialidades: ['Económico'], subespecialidades: ['Corporate/Commercial', 'Joint Ventures'], firma: 'CorralRosales', ubicacion: 'Quito, Pichincha', telefono: '+593 2 381 0950', email: 'xrosales@corralrosales.com' },
  { id: 10, nombre: 'José Rafael Bustamante Crespo', edad: 62, grado: 'Abogado de los Juzgados y Tribunales de la República', posgrados: ['Doctor en Derecho Mercantil', 'Profesor Universitario'], especialidades: ['Económico'], subespecialidades: ['Corporate/Commercial', 'Reestructuración Empresarial'], firma: 'BUSTAMANTE FABARA', ubicacion: 'Guayaquil, Guayas', telefono: '+593 4 251 9900', email: 'jrbustamante@bfabogados.com' },
  { id: 11, nombre: 'Javier Robalino-Orellana', edad: 45, grado: 'Abogado de los Juzgados y Tribunales de la República', posgrados: ['Máster en Derecho Corporativo'], especialidades: ['Económico'], subespecialidades: ['Corporate/Commercial', 'Private Equity'], firma: 'ROBALINO', ubicacion: 'Quito, Pichincha', telefono: '+593 2 323 0011', email: 'jrobalino@robalino.com' },
  { id: 12, nombre: 'Juan Manuel Marchán', edad: 50, grado: 'Abogado de los Juzgados y Tribunales de la República', posgrados: ['Máster en Derecho Comercial'], especialidades: ['Económico'], subespecialidades: ['Corporate/Commercial', 'Due Diligence'], firma: 'Pérez Bustamante & Ponce', ubicacion: 'Quito, Pichincha', telefono: '+593 2 256 2680', email: 'jmarchan@pbpabogados.com' },
  { id: 13, nombre: 'Daniel Pino Arroba', edad: 47, grado: 'Abogado de los Juzgados y Tribunales de la República', posgrados: ['Doctor en Derecho Económico'], especialidades: ['Económico'], subespecialidades: ['Corporate/Commercial', 'Derecho de la Competencia'], firma: 'Pino Elizalde Abogados', ubicacion: 'Guayaquil, Guayas', telefono: '+593 4 230 0600', email: 'dpino@pinoelizalde.com' },
  
  // ECONÓMICO - Tax
  { id: 14, nombre: 'Diego Almeida-Guzmán', edad: 54, grado: 'Abogado de los Juzgados y Tribunales de la República', posgrados: ['Máster en Derecho Tributario', 'CPA'], especialidades: ['Económico'], subespecialidades: ['Tax', 'Planificación Fiscal'], firma: 'Almeida Guzmán & Asociados', ubicacion: 'Quito, Pichincha', telefono: '+593 2 254 4144', email: 'dalmeida@almeidaguzman.com' },
  { id: 15, nombre: 'Juan Gabriel Reyes-Varea', edad: 58, grado: 'Abogado de los Juzgados y Tribunales de la República', posgrados: ['Doctor en Derecho Tributario'], especialidades: ['Económico'], subespecialidades: ['Tax', 'Controversia Tributaria'], firma: 'LEXVALOR Abogados', ubicacion: 'Quito, Pichincha', telefono: '+593 2 382 7640', email: 'jreyes@lexvalor.com' },
  { id: 16, nombre: 'Carmen Simone', edad: 52, grado: 'Abogada de los Juzgados y Tribunales de la República', posgrados: ['Máster en Derecho Tributario Internacional'], especialidades: ['Económico'], subespecialidades: ['Tax', 'Precios de Transferencia'], firma: 'Pérez Bustamante & Ponce', ubicacion: 'Quito, Pichincha', telefono: '+593 2 256 2680', email: 'csimone@pbpabogados.com' },
  
  // ECONÓMICO - Real Estate
  { id: 17, nombre: 'Santiago Albán', edad: 49, grado: 'Abogado de los Juzgados y Tribunales de la República', posgrados: ['Máster en Derecho Inmobiliario'], especialidades: ['Económico'], subespecialidades: ['Real Estate', 'Desarrollo Inmobiliario'], firma: 'Gallegos, Valarezo & Neira', ubicacion: 'Quito, Pichincha', telefono: '+593 2 244 3866', email: 'salban@gvnabogados.com' },
  { id: 18, nombre: 'Juan Carlos Gallegos Happle', edad: 55, grado: 'Abogado de los Juzgados y Tribunales de la República', posgrados: ['Doctor en Derecho Civil'], especialidades: ['Económico'], subespecialidades: ['Real Estate', 'Derechos Reales'], firma: 'Gallegos, Valarezo & Neira', ubicacion: 'Quito, Pichincha', telefono: '+593 2 244 3866', email: 'jgallegos@gvnabogados.com' },
  
  // ECONÓMICO - Intellectual Property
  { id: 19, nombre: 'Francisco Pérez Gangotena', edad: 60, grado: 'Abogado de los Juzgados y Tribunales de la República', posgrados: ['Máster en Propiedad Intelectual'], especialidades: ['Económico'], subespecialidades: ['Intellectual Property', 'Marcas y Patentes'], firma: 'Falconi Puig Abogados', ubicacion: 'Quito, Pichincha', telefono: '+593 2 256 2680', email: 'fperez@falconipuig.com' },
  { id: 20, nombre: 'María Cecilia Romoleroux', edad: 52, grado: 'Abogada de los Juzgados y Tribunales de la República', posgrados: ['Máster en Derecho de la Propiedad Industrial'], especialidades: ['Económico'], subespecialidades: ['Intellectual Property', 'Derechos de Autor'], firma: 'Falconi Puig Abogados', ubicacion: 'Quito, Pichincha', telefono: '+593 2 256 2680', email: 'mromoleroux@falconipuig.com' },
  { id: 21, nombre: 'Francisco Gallegos', edad: 48, grado: 'Abogado de los Juzgados y Tribunales de la República', posgrados: ['Especialista en Propiedad Intelectual'], especialidades: ['Económico'], subespecialidades: ['Intellectual Property', 'Litigio de Marcas'], firma: 'Gallegos, Valarezo & Neira', ubicacion: 'Quito, Pichincha', telefono: '+593 2 244 3866', email: 'fgallegos@gvnabogados.com' },
  
  // ECONÓMICO - Energy & Natural Resources
  { id: 22, nombre: 'Hernán Pérez Loose', edad: 65, grado: 'Abogado de los Juzgados y Tribunales de la República', posgrados: ['Doctor en Derecho Minero y Petrolero'], especialidades: ['Económico', 'Administrativo'], subespecialidades: ['Energy & Natural Resources', 'Hidrocarburos'], firma: 'Pérez Bustamante & Ponce', ubicacion: 'Quito, Pichincha', telefono: '+593 2 256 2680', email: 'hploose@pbpabogados.com' },
  { id: 23, nombre: 'Rodrigo Jijón', edad: 55, grado: 'Abogado de los Juzgados y Tribunales de la República', posgrados: ['Máster en Derecho de la Energía'], especialidades: ['Económico', 'Administrativo'], subespecialidades: ['Energy & Natural Resources', 'Minería'], firma: 'BUSTAMANTE FABARA', ubicacion: 'Guayaquil, Guayas', telefono: '+593 4 251 9900', email: 'rjijon@bfabogados.com' },
  { id: 24, nombre: 'Edgar Ulloa-Balladares', edad: 58, grado: 'Abogado de los Juzgados y Tribunales de la República', posgrados: ['Máster en Derecho Ambiental y Energía'], especialidades: ['Económico', 'Administrativo'], subespecialidades: ['Energy & Natural Resources', 'Derecho Ambiental'], firma: 'CorralRosales', ubicacion: 'Quito, Pichincha', telefono: '+593 2 381 0950', email: 'eulloa@corralrosales.com' },
  
  // PENAL - Dispute Resolution
  { id: 25, nombre: 'Dunker Morales', edad: 50, grado: 'Abogado de los Juzgados y Tribunales de la República', posgrados: ['Doctor en Derecho Procesal'], especialidades: ['Penal', 'Económico'], subespecialidades: ['Dispute Resolution', 'Arbitraje Internacional'], firma: 'DMV Law', ubicacion: 'Quito, Pichincha', telefono: '+593 2 323 0029', email: 'dmorales@dmvlaw.com' },
  { id: 26, nombre: 'Alberto Brown', edad: 55, grado: 'Abogado de los Juzgados y Tribunales de la República', posgrados: ['Máster en Arbitraje Comercial'], especialidades: ['Penal', 'Económico'], subespecialidades: ['Dispute Resolution', 'Litigio Comercial'], firma: 'AVL Abogados', ubicacion: 'Quito, Pichincha', telefono: '+593 2 298 4811', email: 'abrown@avlabogados.com' },
  { id: 27, nombre: 'Daniel Castelo', edad: 48, grado: 'Abogado de los Juzgados y Tribunales de la República', posgrados: ['Máster en Derecho Procesal'], especialidades: ['Penal'], subespecialidades: ['Dispute Resolution', 'Litigio Civil'], firma: 'Pérez Bustamante & Ponce', ubicacion: 'Quito, Pichincha', telefono: '+593 2 256 2680', email: 'dcastelo@pbpabogados.com' },
  { id: 28, nombre: 'Mario Navarrete-Serrano', edad: 52, grado: 'Abogado de los Juzgados y Tribunales de la República', posgrados: ['Doctor en Derecho Penal'], especialidades: ['Penal'], subespecialidades: ['Dispute Resolution', 'Delitos Económicos'], firma: 'ROBALINO', ubicacion: 'Quito, Pichincha', telefono: '+593 2 323 0011', email: 'mnavarrete@robalino.com' },
  { id: 29, nombre: 'Eduardo Carmigniani', edad: 58, grado: 'Abogado de los Juzgados y Tribunales de la República', posgrados: ['Doctor en Derecho Procesal', 'Profesor Universitario'], especialidades: ['Penal', 'Económico'], subespecialidades: ['Dispute Resolution', 'Mediación'], firma: 'Eduardo Carmigniani Estrategias Legales', ubicacion: 'Quito, Pichincha', telefono: '+593 2 250 8040', email: 'ecarmigniani@carmigniani.com' },
  { id: 30, nombre: 'César Coronel Jones', edad: 62, grado: 'Abogado de los Juzgados y Tribunales de la República', posgrados: ['Máster en Arbitraje Internacional'], especialidades: ['Penal', 'Económico'], subespecialidades: ['Dispute Resolution', 'Arbitraje de Inversión'], firma: 'Coronel & Pérez', ubicacion: 'Quito, Pichincha', telefono: '+593 2 256 2680', email: 'ccoronel@coronelperez.com' },
  
  // ADMINISTRATIVO - Public Law
  { id: 31, nombre: 'Daniela Cevallos Casals', edad: 45, grado: 'Abogada de los Juzgados y Tribunales de la República', posgrados: ['Máster en Derecho Administrativo'], especialidades: ['Administrativo'], subespecialidades: ['Public Law', 'Contratación Pública'], firma: 'Cevallos, Casals, Balseca & Bilbao', ubicacion: 'Quito, Pichincha', telefono: '+593 2 298 6456', email: 'dcevallos@ccbbabogados.com' },
  { id: 32, nombre: 'Emilio Suarez', edad: 50, grado: 'Abogado de los Juzgados y Tribunales de la República', posgrados: ['Doctor en Derecho Constitucional'], especialidades: ['Administrativo'], subespecialidades: ['Public Law', 'Derecho Regulatorio'], firma: 'Falconi Puig Abogados', ubicacion: 'Quito, Pichincha', telefono: '+593 2 256 2680', email: 'esuarez@falconipuig.com' },
  { id: 33, nombre: 'Marco Morales Tobar', edad: 48, grado: 'Abogado de los Juzgados y Tribunales de la República', posgrados: ['Máster en Derecho Público'], especialidades: ['Administrativo', 'Económico'], subespecialidades: ['Public Law', 'Concesiones'], firma: 'Tobar ZVS', ubicacion: 'Quito, Pichincha', telefono: '+593 2 229 28115', email: 'mmorales@tobarzvs.com' },
  { id: 34, nombre: 'Paola Gachet', edad: 42, grado: 'Abogada de los Juzgados y Tribunales de la República', posgrados: ['Especialista en Derecho Administrativo'], especialidades: ['Administrativo', 'Económico'], subespecialidades: ['Public Law', 'Recursos Administrativos'], firma: 'Pérez Bustamante & Ponce', ubicacion: 'Quito, Pichincha', telefono: '+593 2 256 2680', email: 'pgachet@pbpabogados.com' },
  
  // LABORAL
  { id: 35, nombre: 'Juan Francisco Almeida Granja', edad: 48, grado: 'Abogado de los Juzgados y Tribunales de la República', posgrados: ['Máster en Derecho Laboral'], especialidades: ['Laboral'], subespecialidades: ['Relaciones Laborales', 'Seguridad Social'], firma: 'Almeida Guzmán & Asociados', ubicacion: 'Quito, Pichincha', telefono: '+593 2 254 4144', email: 'jalmeida@almeidaguzman.com' },
  { id: 36, nombre: 'Andrea Lara', edad: 45, grado: 'Abogada de los Juzgados y Tribunales de la República', posgrados: ['Máster en Derecho del Trabajo'], especialidades: ['Laboral'], subespecialidades: ['Despidos', 'Beneficios Sociales'], firma: 'LEXVALOR Abogados', ubicacion: 'Quito, Pichincha', telefono: '+593 2 382 7640', email: 'alara@lexvalor.com' },
  
  // NIÑES
  { id: 37, nombre: 'María Francisca Gallegos-Anda', edad: 43, grado: 'Abogada de los Juzgados y Tribunales de la República', posgrados: ['Máster en Derecho de Familia y Niñez'], especialidades: ['Niñez'], subespecialidades: ['Protección Integral', 'Custodia de Menores'], firma: 'Gallegos, Valarezo & Neira', ubicacion: 'Quito, Pichincha', telefono: '+593 2 244 3866', email: 'mgallegos@gvnabogados.com' },
  { id: 38, nombre: 'Blanca Gómez de la Torre', edad: 48, grado: 'Abogada de los Juzgados y Tribunales de la República', posgrados: ['Especialista en Derecho de Familia'], especialidades: ['Niñez', 'Económico'], subespecialidades: ['Adopciones', 'Pensión Alimenticia'], firma: 'Pérez Bustamante & Ponce', ubicacion: 'Quito, Pichincha', telefono: '+593 2 256 2680', email: 'bgomez@pbpabogados.com' },
]

// Especialidades con subcategorías basadas en Chambers
const especialidadesData = [
  {
    id: 'administrativo',
    nombre: 'Administrativo',
    icono: Landmark,
    descripcion: 'Derecho público, contratación estatal, procesos administrativos y regulación sectorial.',
    subcategorias: [
      { id: 'public-law', nombre: 'Public Law', icono: Scale },
      { id: 'contratacion', nombre: 'Contratación Pública', icono: FileText },
      { id: 'concesiones', nombre: 'Concesiones', icono: Building },
      { id: 'regulatorio', nombre: 'Derecho Regulatorio', icono: Shield },
    ]
  },
  {
    id: 'laboral',
    nombre: 'Laboral',
    icono: Briefcase,
    descripcion: 'Relaciones de trabajo, seguridad social, despidos, contratos laborales y beneficios sociales.',
    subcategorias: [
      { id: 'relaciones', nombre: 'Relaciones Laborales', icono: Users },
      { id: 'seguridad-social', nombre: 'Seguridad Social', icono: Shield },
      { id: 'despidos', nombre: 'Despidos', icono: FileText },
      { id: 'beneficios', nombre: 'Beneficios Sociales', icono: Banknote },
    ]
  },
  {
    id: 'niñez',
    nombre: 'Niñez',
    icono: Baby,
    descripcion: 'Derecho de familia, custodia, pensión alimenticia, adopciones y protección integral de niñas, niños y adolescentes.',
    subcategorias: [
      { id: 'custodia', nombre: 'Custodia de Menores', icono: Users },
      { id: 'pension', nombre: 'Pensión Alimenticia', icono: Banknote },
      { id: 'adopciones', nombre: 'Adopciones', icono: Heart },
      { id: 'proteccion', nombre: 'Protección Integral', icono: Shield },
    ]
  },
  {
    id: 'penal',
    nombre: 'Penal',
    icono: Gavel,
    descripcion: 'Litigio, arbitraje, resolución de disputas y defensa en procesos penales.',
    subcategorias: [
      { id: 'dispute', nombre: 'Dispute Resolution', icono: Scale },
      { id: 'arbitraje', nombre: 'Arbitraje Internacional', icono: Landmark },
      { id: 'litigio', nombre: 'Litigio Comercial', icono: FileText },
      { id: 'delitos', nombre: 'Delitos Económicos', icono: TrendingUp },
    ]
  },
  {
    id: 'economico',
    nombre: 'Económico',
    icono: TrendingUp,
    descripcion: 'Derecho corporativo, bancario, tributario, inmobiliario, propiedad intelectual y energía.',
    subcategorias: [
      { id: 'banking', nombre: 'Banking & Finance', icono: Bank },
      { id: 'corporate', nombre: 'Corporate/Commercial', icono: Building },
      { id: 'tax', nombre: 'Tax', icono: Banknote },
      { id: 'real-estate', nombre: 'Real Estate', icono: Home },
      { id: 'ip', nombre: 'Intellectual Property', icono: Lightbulb },
      { id: 'energy', nombre: 'Energy & Natural Resources', icono: Zap },
    ]
  },
]

// Interfaz para las props
interface EspecialidadesProps {
  subcategoriaInicial?: { especialidad: string; subcategoria: string } | null
}

// Interfaz para el ref expuesto
export interface EspecialidadesRef {
  abrirModal: (espNombre: string, subcat?: string) => void
}

const Especialidades = forwardRef<EspecialidadesRef, EspecialidadesProps>(
  function Especialidades({ subcategoriaInicial }, ref) {
    const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState<typeof especialidadesData[0] | null>(null)
    const [subcategoriaSeleccionada, setSubcategoriaSeleccionada] = useState<string | null>(null)

    // Exponer la función abrirModal al componente padre via ref
    useImperativeHandle(ref, () => ({
      abrirModal: (espNombre: string, subcat?: string) => {
        const esp = especialidadesData.find(e => e.nombre === espNombre)
        if (esp) {
          setEspecialidadSeleccionada(esp)
          setSubcategoriaSeleccionada(subcat || null)
        }
      }
    }))

    // Efecto para abrir el modal cuando se recibe subcategoriaInicial
    useEffect(() => {
      if (subcategoriaInicial) {
        const esp = especialidadesData.find(e => e.nombre === subcategoriaInicial.especialidad)
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
      return abogadosPorEspecialidad.filter((abogado) => 
        abogado.subespecialidades?.includes(subcategoriaSeleccionada)
      )
    }, [abogadosPorEspecialidad, subcategoriaSeleccionada])

    const handleEspecialidadClick = (esp: typeof especialidadesData[0]) => {
      setEspecialidadSeleccionada(esp)
      setSubcategoriaSeleccionada(null)
    }

    const handleSubcategoriaClick = (subcat: string) => {
      setSubcategoriaSeleccionada(subcat)
    }

    return (
      <div className="py-24 bg-[#0a0d12]">
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

          {/* Grid de Especialidades Principales */}
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
                    <h3 className="text-white font-semibold text-lg mb-2">{esp.nombre}</h3>
                    <p className="text-gray-400 text-sm line-clamp-3">{esp.descripcion}</p>
                    <div className="mt-4 pt-4 border-t border-[#c9a227]/10">
                      <span className="text-[#c9a227] text-xs font-medium">
                        {esp.subcategorias.length} subcategorías
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Dialog con subcategorías y abogados */}
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
                        <DialogTitle className="text-white text-2xl font-serif">
                          {especialidadSeleccionada.nombre}
                        </DialogTitle>
                        <p className="text-gray-400 text-sm mt-1">
                          {especialidadSeleccionada.descripcion}
                        </p>
                      </div>
                    </div>
                  </DialogHeader>

                  {/* Subcategorías */}
                  <div className="mt-6">
                    <h4 className="text-[#c9a227] font-semibold mb-4 text-sm uppercase tracking-wider">
                      Subcategorías
                    </h4>
                    <div className="flex flex-wrap gap-3 mb-6">
                      <button
                        onClick={() => setSubcategoriaSeleccionada(null)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          subcategoriaSeleccionada === null
                            ? 'bg-[#c9a227] text-[#0f1419]'
                            : 'bg-[#0f1419] text-gray-400 border border-[#c9a227]/30 hover:border-[#c9a227]'
                        }`}
                      >
                        Todos
                      </button>
                      {especialidadSeleccionada.subcategorias.map((sub) => {
                        const SubIcono = sub.icono
                        return (
                          <button
                            key={sub.id}
                            onClick={() => handleSubcategoriaClick(sub.nombre)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                              subcategoriaSeleccionada === sub.nombre
                                ? 'bg-[#c9a227] text-[#0f1419]'
                                : 'bg-[#0f1419] text-gray-400 border border-[#c9a227]/30 hover:border-[#c9a227] hover:text-[#c9a227]'
                            }`}
                          >
                            <SubIcono className="w-4 h-4" />
                            {sub.nombre}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Lista de abogados */}
                  <div className="mt-6">
                    <h4 className="text-[#c9a227] font-semibold mb-4 text-sm uppercase tracking-wider">
                      Profesionales 
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
                                  <h5 className="text-white font-semibold text-sm">Abg. {abogado.nombre}</h5>
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
                              
                              <div className="space-y-1 mb-3">
                                <div className="flex items-start gap-2 text-xs text-gray-400">
                                  <GraduationCap className="w-3 h-3 flex-shrink-0 mt-0.5" />
                                  <span className="line-clamp-1">{abogado.grado}</span>
                                </div>
                                {abogado.posgrados.length > 0 && (
                                  <div className="flex items-start gap-2 text-xs text-gray-400">
                                    <BookOpen className="w-3 h-3 flex-shrink-0 mt-0.5" />
                                    <span className="line-clamp-1">{abogado.posgrados.join(', ')}</span>
                                  </div>
                                )}
                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                  <MapPin className="w-3 h-3" />
                                  <span>{abogado.ubicacion}</span>
                                </div>
                              </div>

                              <div className="flex gap-2 pt-3 border-t border-[#c9a227]/10">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex-1 border-[#c9a227]/50 text-[#c9a227] hover:bg-[#c9a227]/10 text-xs"
                                  onClick={() => window.location.href = `tel:${abogado.telefono}`}
                                >
                                  <Phone className="w-3 h-3 mr-1" />
                                  Llamar
                                </Button>
                                <Button
                                  size="sm"
                                  className="flex-1 bg-gradient-to-r from-[#c9a227] to-[#8b7355] text-[#0f1419] font-semibold hover:opacity-90 text-xs"
                                  onClick={() => window.location.href = `mailto:${abogado.email}`}
                                >
                                  <Mail className="w-3 h-3 mr-1" />
                                  Contactar
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 bg-[#0f1419] rounded-lg">
                        <p className="text-gray-500">
                          No hay profesionales registrados en esta subcategoría.
                        </p>
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
