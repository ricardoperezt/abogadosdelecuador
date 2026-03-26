/// <reference path="./types/react.d.ts" />

import {
  AlertCircle,
  BookOpen,
  Building2,
  Calendar,
  ChevronRight,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Search
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useMemo, useRef, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

// Especialidades permitidas
const ESPECIALIDADES = ['Todas', 'Administrativo', 'Laboral', 'Niñez', 'Penal', 'Económico'] as const

// Abogados de Chambers & Partners - Ecuador
const abogados = [
  // ECONÓMICO - Banking & Finance
  {
    id: 1,
    nombre: 'Bruno Pineda Cordero',
    edad: 48,
    grado: 'Abogado de los Juzgados y Tribunales de la República',
    posgrados: ['Máster en Derecho Financiero Internacional'],
    especialidades: ['Económico'],
    subespecialidades: ['Banking & Finance', 'Derecho Financiero'],
    firma: 'Pérez Bustamante & Ponce',
    ubicacion: 'Quito, Pichincha',
    telefono: '+593 2 256 2680',
    email: 'bpineda@pbpabogados.com',
  },
  {
    id: 2,
    nombre: 'Mario Alejandro Flor',
    edad: 52,
    grado: 'Abogado de los Juzgados y Tribunales de la República',
    posgrados: ['Doctor en Derecho Económico'],
    especialidades: ['Económico'],
    subespecialidades: ['Banking & Finance', 'Derecho Corporativo'],
    firma: 'CorralRosales',
    ubicacion: 'Quito, Pichincha',
    telefono: '+593 2 381 0950',
    email: 'maflor@corralrosales.com',
  },
  {
    id: 3,
    nombre: 'Diego Ramírez Mesec',
    edad: 45,
    grado: 'Abogado de los Juzgados y Tribunales de la República',
    posgrados: ['Máster en Derecho Bancario'],
    especialidades: ['Económico'],
    subespecialidades: ['Banking & Finance', 'Mercado de Capitales'],
    firma: 'Pérez Bustamante & Ponce',
    ubicacion: 'Quito, Pichincha',
    telefono: '+593 2 256 2680',
    email: 'dramirez@pbpabogados.com',
  },
  {
    id: 4,
    nombre: 'Jorge Alfonso Cevallos Carrera',
    edad: 50,
    grado: 'Abogado de los Juzgados y Tribunales de la República',
    posgrados: ['MBA en Finanzas', 'Máster en Derecho Financiero'],
    especialidades: ['Económico'],
    subespecialidades: ['Banking & Finance', 'Project Finance'],
    firma: 'Cevallos, Casals, Balseca & Bilbao',
    ubicacion: 'Quito, Pichincha',
    telefono: '+593 2 298 6456',
    email: 'jacevallos@ccbbabogados.com',
  },
  {
    id: 5,
    nombre: 'Boanerges Rodríguez Freire',
    edad: 55,
    grado: 'Abogado de los Juzgados y Tribunales de la República',
    posgrados: ['Doctor en Derecho Mercantil'],
    especialidades: ['Económico'],
    subespecialidades: ['Banking & Finance', 'Derecho Bursátil'],
    firma: 'Rodriguez Rodriguez Abogados',
    ubicacion: 'Guayaquil, Guayas',
    telefono: '+593 4 372 4990',
    email: 'brodriguez@robroabogados.com',
  },
  
  // ECONÓMICO - Corporate/Commercial
  {
    id: 6,
    nombre: 'Diego Pérez-Ordóñez',
    edad: 58,
    grado: 'Abogado de los Juzgados y Tribunales de la República',
    posgrados: ['Doctor en Derecho Corporativo', 'LLM Harvard'],
    especialidades: ['Económico', 'Penal'],
    subespecialidades: ['Corporate/Commercial', 'M&A', 'Dispute Resolution'],
    firma: 'Pérez Bustamante & Ponce',
    ubicacion: 'Quito, Pichincha',
    telefono: '+593 2 256 2680',
    email: 'dperez@pbpabogados.com',
  },
  {
    id: 7,
    nombre: 'Daniel Robalino-Orellana',
    edad: 48,
    grado: 'Abogado de los Juzgados y Tribunales de la República',
    posgrados: ['Máster en Derecho Comercial Internacional'],
    especialidades: ['Económico'],
    subespecialidades: ['Corporate/Commercial', 'Contratos Internacionales'],
    firma: 'ROBALINO',
    ubicacion: 'Quito, Pichincha',
    telefono: '+593 2 323 0011',
    email: 'drobalino@robalino.com',
  },
  {
    id: 9,
    nombre: 'Xavier Rosales',
    edad: 55,
    grado: 'Abogado de los Juzgados y Tribunales de la República',
    posgrados: ['Doctor en Derecho Económico', 'MBA'],
    especialidades: ['Económico'],
    subespecialidades: ['Corporate/Commercial', 'Joint Ventures'],
    firma: 'CorralRosales',
    ubicacion: 'Quito, Pichincha',
    telefono: '+593 2 381 0950',
    email: 'xrosales@corralrosales.com',
  },
  {
    id: 10,
    nombre: 'José Rafael Bustamante Crespo',
    edad: 62,
    grado: 'Abogado de los Juzgados y Tribunales de la República',
    posgrados: ['Doctor en Derecho Mercantil', 'Profesor Universitario'],
    especialidades: ['Económico'],
    subespecialidades: ['Corporate/Commercial', 'Reestructuración Empresarial'],
    firma: 'BUSTAMANTE FABARA',
    ubicacion: 'Guayaquil, Guayas',
    telefono: '+593 4 251 9900',
    email: 'jrbustamante@bfabogados.com',
  },
  {
    id: 11,
    nombre: 'Javier Robalino-Orellana',
    edad: 45,
    grado: 'Abogado de los Juzgados y Tribunales de la República',
    posgrados: ['Máster en Derecho Corporativo'],
    especialidades: ['Económico'],
    subespecialidades: ['Corporate/Commercial', 'Private Equity'],
    firma: 'ROBALINO',
    ubicacion: 'Quito, Pichincha',
    telefono: '+593 2 323 0011',
    email: 'jrobalino@robalino.com',
  },
  {
    id: 12,
    nombre: 'Juan Manuel Marchán',
    edad: 50,
    grado: 'Abogado de los Juzgados y Tribunales de la República',
    posgrados: ['Máster en Derecho Comercial'],
    especialidades: ['Económico'],
    subespecialidades: ['Corporate/Commercial', 'Due Diligence'],
    firma: 'Pérez Bustamante & Ponce',
    ubicacion: 'Quito, Pichincha',
    telefono: '+593 2 256 2680',
    email: 'jmarchan@pbpabogados.com',
  },
  {
    id: 13,
    nombre: 'Daniel Pino Arroba',
    edad: 47,
    grado: 'Abogado de los Juzgados y Tribunales de la República',
    posgrados: ['Doctor en Derecho Económico'],
    especialidades: ['Económico'],
    subespecialidades: ['Corporate/Commercial', 'Derecho de la Competencia'],
    firma: 'Pino Elizalde Abogados',
    ubicacion: 'Guayaquil, Guayas',
    telefono: '+593 4 230 0600',
    email: 'dpino@pinoelizalde.com',
  },
  
  // ECONÓMICO - Tax
  {
    id: 14,
    nombre: 'Diego Almeida-Guzmán',
    edad: 54,
    grado: 'Abogado de los Juzgados y Tribunales de la República',
    posgrados: ['Máster en Derecho Tributario', 'CPA'],
    especialidades: ['Económico'],
    subespecialidades: ['Tax', 'Planificación Fiscal'],
    firma: 'Almeida Guzmán & Asociados',
    ubicacion: 'Quito, Pichincha',
    telefono: '+593 2 254 4144',
    email: 'dalmeida@almeidaguzman.com',
  },
  {
    id: 15,
    nombre: 'Juan Gabriel Reyes-Varea',
    edad: 58,
    grado: 'Abogado de los Juzgados y Tribunales de la República',
    posgrados: ['Doctor en Derecho Tributario'],
    especialidades: ['Económico'],
    subespecialidades: ['Tax', 'Controversia Tributaria'],
    firma: 'LEXVALOR Abogados',
    ubicacion: 'Quito, Pichincha',
    telefono: '+593 2 382 7640',
    email: 'jreyes@lexvalor.com',
  },
  {
    id: 16,
    nombre: 'Carmen Simone',
    edad: 52,
    grado: 'Abogada de los Juzgados y Tribunales de la República',
    posgrados: ['Máster en Derecho Tributario Internacional'],
    especialidades: ['Económico'],
    subespecialidades: ['Tax', 'Precios de Transferencia'],
    firma: 'Pérez Bustamante & Ponce',
    ubicacion: 'Quito, Pichincha',
    telefono: '+593 2 256 2680',
    email: 'csimone@pbpabogados.com',
  },
  
  // ECONÓMICO - Real Estate
  {
    id: 17,
    nombre: 'Santiago Albán',
    edad: 49,
    grado: 'Abogado de los Juzgados y Tribunales de la República',
    posgrados: ['Máster en Derecho Inmobiliario'],
    especialidades: ['Económico'],
    subespecialidades: ['Real Estate', 'Desarrollo Inmobiliario'],
    firma: 'Gallegos, Valarezo & Neira',
    ubicacion: 'Quito, Pichincha',
    telefono: '+593 2 244 3866',
    email: 'salban@gvnabogados.com',
  },
  {
    id: 18,
    nombre: 'Juan Carlos Gallegos Happle',
    edad: 55,
    grado: 'Abogado de los Juzgados y Tribunales de la República',
    posgrados: ['Doctor en Derecho Civil'],
    especialidades: ['Económico'],
    subespecialidades: ['Real Estate', 'Derechos Reales'],
    firma: 'Gallegos, Valarezo & Neira',
    ubicacion: 'Quito, Pichincha',
    telefono: '+593 2 244 3866',
    email: 'jgallegos@gvnabogados.com',
  },
  
  // ECONÓMICO - Intellectual Property
  {
    id: 19,
    nombre: 'Francisco Pérez Gangotena',
    edad: 60,
    grado: 'Abogado de los Juzgados y Tribunales de la República',
    posgrados: ['Máster en Propiedad Intelectual'],
    especialidades: ['Económico'],
    subespecialidades: ['Intellectual Property', 'Marcas y Patentes'],
    firma: 'Falconi Puig Abogados',
    ubicacion: 'Quito, Pichincha',
    telefono: '+593 2 256 2680',
    email: 'fperez@falconipuig.com',
  },
  {
    id: 20,
    nombre: 'María Cecilia Romoleroux',
    edad: 52,
    grado: 'Abogada de los Juzgados y Tribunales de la República',
    posgrados: ['Máster en Derecho de la Propiedad Industrial'],
    especialidades: ['Económico'],
    subespecialidades: ['Intellectual Property', 'Derechos de Autor'],
    firma: 'Falconi Puig Abogados',
    ubicacion: 'Quito, Pichincha',
    telefono: '+593 2 256 2680',
    email: 'mromoleroux@falconipuig.com',
  },
  {
    id: 21,
    nombre: 'Francisco Gallegos',
    edad: 48,
    grado: 'Abogado de los Juzgados y Tribunales de la República',
    posgrados: ['Especialista en Propiedad Intelectual'],
    especialidades: ['Económico'],
    subespecialidades: ['Intellectual Property', 'Litigio de Marcas'],
    firma: 'Gallegos, Valarezo & Neira',
    ubicacion: 'Quito, Pichincha',
    telefono: '+593 2 244 3866',
    email: 'fgallegos@gvnabogados.com',
  },
  
  // ECONÓMICO - Energy & Natural Resources
  {
    id: 22,
    nombre: 'Hernán Pérez Loose',
    edad: 65,
    grado: 'Abogado de los Juzgados y Tribunales de la República',
    posgrados: ['Doctor en Derecho Minero y Petrolero'],
    especialidades: ['Económico', 'Administrativo'],
    subespecialidades: ['Energy & Natural Resources', 'Hidrocarburos'],
    firma: 'Pérez Bustamante & Ponce',
    ubicacion: 'Quito, Pichincha',
    telefono: '+593 2 256 2680',
    email: 'hploose@pbpabogados.com',
  },
  {
    id: 23,
    nombre: 'Rodrigo Jijón',
    edad: 55,
    grado: 'Abogado de los Juzgados y Tribunales de la República',
    posgrados: ['Máster en Derecho de la Energía'],
    especialidades: ['Económico', 'Administrativo'],
    subespecialidades: ['Energy & Natural Resources', 'Minería'],
    firma: 'BUSTAMANTE FABARA',
    ubicacion: 'Guayaquil, Guayas',
    telefono: '+593 4 251 9900',
    email: 'rjijon@bfabogados.com',
  },
  {
    id: 24,
    nombre: 'Edgar Ulloa-Balladares',
    edad: 58,
    grado: 'Abogado de los Juzgados y Tribunales de la República',
    posgrados: ['Máster en Derecho Ambiental y Energía'],
    especialidades: ['Económico', 'Administrativo'],
    subespecialidades: ['Energy & Natural Resources', 'Derecho Ambiental'],
    firma: 'CorralRosales',
    ubicacion: 'Quito, Pichincha',
    telefono: '+593 2 381 0950',
    email: 'eulloa@corralrosales.com',
  },
  
  // PENAL - Dispute Resolution
  {
    id: 25,
    nombre: 'Dunker Morales',
    edad: 50,
    grado: 'Abogado de los Juzgados y Tribunales de la República',
    posgrados: ['Doctor en Derecho Procesal'],
    especialidades: ['Penal', 'Económico'],
    subespecialidades: ['Dispute Resolution', 'Arbitraje Internacional'],
    firma: 'DMV Law',
    ubicacion: 'Quito, Pichincha',
    telefono: '+593 2 323 0029',
    email: 'dmorales@dmvlaw.com',
  },
  {
    id: 26,
    nombre: 'Alberto Brown',
    edad: 55,
    grado: 'Abogado de los Juzgados y Tribunales de la República',
    posgrados: ['Máster en Arbitraje Comercial'],
    especialidades: ['Penal', 'Económico'],
    subespecialidades: ['Dispute Resolution', 'Litigio Comercial'],
    firma: 'AVL Abogados',
    ubicacion: 'Quito, Pichincha',
    telefono: '+593 2 298 4811',
    email: 'abrown@avlabogados.com',
  },
  {
    id: 27,
    nombre: 'Daniel Castelo',
    edad: 48,
    grado: 'Abogado de los Juzgados y Tribunales de la República',
    posgrados: ['Máster en Derecho Procesal'],
    especialidades: ['Penal'],
    subespecialidades: ['Dispute Resolution', 'Litigio Civil'],
    firma: 'Pérez Bustamante & Ponce',
    ubicacion: 'Quito, Pichincha',
    telefono: '+593 2 256 2680',
    email: 'dcastelo@pbpabogados.com',
  },
  {
    id: 28,
    nombre: 'Mario Navarrete-Serrano',
    edad: 52,
    grado: 'Abogado de los Juzgados y Tribunales de la República',
    posgrados: ['Doctor en Derecho Penal'],
    especialidades: ['Penal'],
    subespecialidades: ['Dispute Resolution', 'Delitos Económicos'],
    firma: 'ROBALINO',
    ubicacion: 'Quito, Pichincha',
    telefono: '+593 2 323 0011',
    email: 'mnavarrete@robalino.com',
  },
  {
    id: 29,
    nombre: 'Eduardo Carmigniani',
    edad: 58,
    grado: 'Abogado de los Juzgados y Tribunales de la República',
    posgrados: ['Doctor en Derecho Procesal', 'Profesor Universitario'],
    especialidades: ['Penal', 'Económico'],
    subespecialidades: ['Dispute Resolution', 'Mediación'],
    firma: 'Eduardo Carmigniani Estrategias Legales',
    ubicacion: 'Quito, Pichincha',
    telefono: '+593 2 250 8040',
    email: 'ecarmigniani@carmigniani.com',
  },
  {
    id: 30,
    nombre: 'César Coronel Jones',
    edad: 62,
    grado: 'Abogado de los Juzgados y Tribunales de la República',
    posgrados: ['Máster en Arbitraje Internacional'],
    especialidades: ['Penal', 'Económico'],
    subespecialidades: ['Dispute Resolution', 'Arbitraje de Inversión'],
    firma: 'Coronel & Pérez',
    ubicacion: 'Quito, Pichincha',
    telefono: '+593 2 256 2680',
    email: 'ccoronel@coronelperez.com',
  },
  
  // ADMINISTRATIVO - Public Law
  {
    id: 31,
    nombre: 'Daniela Cevallos Casals',
    edad: 45,
    grado: 'Abogada de los Juzgados y Tribunales de la República',
    posgrados: ['Máster en Derecho Administrativo'],
    especialidades: ['Administrativo'],
    subespecialidades: ['Public Law', 'Contratación Pública'],
    firma: 'Cevallos, Casals, Balseca & Bilbao',
    ubicacion: 'Quito, Pichincha',
    telefono: '+593 2 298 6456',
    email: 'dcevallos@ccbbabogados.com',
  },
  {
    id: 32,
    nombre: 'Emilio Suarez',
    edad: 50,
    grado: 'Abogado de los Juzgados y Tribunales de la República',
    posgrados: ['Doctor en Derecho Constitucional'],
    especialidades: ['Administrativo'],
    subespecialidades: ['Public Law', 'Derecho Regulatorio'],
    firma: 'Falconi Puig Abogados',
    ubicacion: 'Quito, Pichincha',
    telefono: '+593 2 256 2680',
    email: 'esuarez@falconipuig.com',
  },
  {
    id: 33,
    nombre: 'Marco Morales Tobar',
    edad: 48,
    grado: 'Abogado de los Juzgados y Tribunales de la República',
    posgrados: ['Máster en Derecho Público'],
    especialidades: ['Administrativo', 'Económico'],
    subespecialidades: ['Public Law', 'Concesiones'],
    firma: 'Tobar ZVS',
    ubicacion: 'Quito, Pichincha',
    telefono: '+593 2 229 28115',
    email: 'mmorales@tobarzvs.com',
  },
  {
    id: 34,
    nombre: 'Paola Gachet',
    edad: 42,
    grado: 'Abogada de los Juzgados y Tribunales de la República',
    posgrados: ['Especialista en Derecho Administrativo'],
    especialidades: ['Administrativo', 'Económico'],
    subespecialidades: ['Public Law', 'Recursos Administrativos'],
    firma: 'Pérez Bustamante & Ponce',
    ubicacion: 'Quito, Pichincha',
    telefono: '+593 2 256 2680',
    email: 'pgachet@pbpabogados.com',
  },
  
  // LABORAL
  {
    id: 35,
    nombre: 'Juan Francisco Almeida Granja',
    edad: 48,
    grado: 'Abogado de los Juzgados y Tribunales de la República',
    posgrados: ['Máster en Derecho Laboral'],
    especialidades: ['Laboral'],
    subespecialidades: ['Relaciones Laborales', 'Seguridad Social'],
    firma: 'Almeida Guzmán & Asociados',
    ubicacion: 'Quito, Pichincha',
    telefono: '+593 2 254 4144',
    email: 'jalmeida@almeidaguzman.com',
  },
  {
    id: 36,
    nombre: 'Andrea Lara',
    edad: 45,
    grado: 'Abogada de los Juzgados y Tribunales de la República',
    posgrados: ['Máster en Derecho del Trabajo'],
    especialidades: ['Laboral'],
    subespecialidades: ['Despidos', 'Beneficios Sociales'],
    firma: 'LEXVALOR Abogados',
    ubicacion: 'Quito, Pichincha',
    telefono: '+593 2 382 7640',
    email: 'alara@lexvalor.com',
  },
  
  // NIÑES - No hay muchos en Chambers, agrego algunos generales
  {
    id: 37,
    nombre: 'María Francisca Gallegos-Anda',
    edad: 43,
    grado: 'Abogada de los Juzgados y Tribunales de la República',
    posgrados: ['Máster en Derecho de Familia y Niñez'],
    especialidades: ['Niñez'],
    subespecialidades: ['Protección Integral', 'Custodia de Menores'],
    firma: 'Gallegos, Valarezo & Neira',
    ubicacion: 'Quito, Pichincha',
    telefono: '+593 2 244 3866',
    email: 'mgallegos@gvnabogados.com',
  },
  {
    id: 38,
    nombre: 'Blanca Gómez de la Torre',
    edad: 48,
    grado: 'Abogada de los Juzgados y Tribunales de la República',
    posgrados: ['Especialista en Derecho de Familia'],
    especialidades: ['Niñez', 'Económico'],
    subespecialidades: ['Adopciones', 'Pensión Alimenticia'],
    firma: 'Pérez Bustamante & Ponce',
    ubicacion: 'Quito, Pichincha',
    telefono: '+593 2 256 2680',
    email: 'bgomez@pbpabogados.com',
  },
]

// Ordenar alfabéticamente
const abogadosOrdenados = [...abogados].sort((a, b) => a.nombre.localeCompare(b.nombre))

// Componente de tarjeta de abogado sin foto
function AbogadoCard({ abogado }: { abogado: typeof abogados[0] }) {
  return (
    <Card className="bg-[#1a1f2e] border-[#c9a227]/20 hover:border-[#c9a227]/50 transition-all duration-300">
      <CardContent className="p-5">
        {/* Header - Nombre y Firma */}
        <div className="mb-4">
          <h3 className="text-white font-semibold text-lg leading-tight mb-1">Abg. {abogado.nombre}</h3>
          <div className="flex items-center gap-1 text-[#c9a227]/70 text-xs">
            <Building2 className="w-3 h-3" />
            <span>{abogado.firma}</span>
          </div>
        </div>

        {/* Especialidades */}
        <div className="flex flex-wrap gap-1 mb-3">
          {abogado.especialidades.map((esp, idx) => (
            <Badge key={idx} className="bg-[#c9a227]/20 text-[#c9a227] border-none text-xs">
              {esp}
            </Badge>
          ))}
        </div>

        {/* Subespecialidades */}
        {abogado.subespecialidades && (
          <div className="flex flex-wrap gap-1 mb-3">
            {abogado.subespecialidades.map((sub, idx) => (
              <Badge key={idx} className="bg-[#8b7355]/20 text-[#e8d5a3] border-none text-xs">
                {sub}
              </Badge>
            ))}
          </div>
        )}

        {/* Info */}
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Calendar className="w-4 h-4 text-[#c9a227]" />
            <span>{abogado.edad} años</span>
          </div>
          <div className="flex items-start gap-2 text-gray-400 text-sm">
            <GraduationCap className="w-4 h-4 text-[#c9a227] flex-shrink-0 mt-0.5" />
            <span className="line-clamp-2">{abogado.grado}</span>
          </div>
          {abogado.posgrados.length > 0 && (
            <div className="flex items-start gap-2 text-gray-400 text-sm">
              <BookOpen className="w-4 h-4 text-[#c9a227] flex-shrink-0 mt-0.5" />
              <span className="line-clamp-2">{abogado.posgrados.join(', ')}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <MapPin className="w-4 h-4 text-[#c9a227]" />
            <span>{abogado.ubicacion}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-3 border-t border-[#c9a227]/10">
          <a 
            href={`tel:${abogado.telefono.replace(/\s/g, '')}`}
            className="flex-1"
          >
            <Button
              variant="outline"
              size="sm"
              className="w-full border-[#c9a227]/50 text-[#c9a227] hover:bg-[#c9a227] hover:text-[#0f1419] hover:border-[#c9a227] text-xs transition-all duration-200"
            >
              <Phone className="w-3 h-3 mr-1" />
              Llamar
            </Button>
          </a>
          <a 
            href={`mailto:${abogado.email}`}
            className="flex-1"
          >
            <Button
              size="sm"
              className="w-full bg-gradient-to-r from-[#c9a227] to-[#8b7355] text-[#0f1419] font-semibold hover:from-[#e8d5a3] hover:to-[#c9a227] text-xs transition-all duration-200"
            >
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
  const [busqueda, setBusqueda] = useState('')
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState<string>('Todas')
  const [showMoreDialog, setShowMoreDialog] = useState(false)
  const [moreAbogados, setMoreAbogados] = useState<typeof abogados>([])
  const [moreTitle, setMoreTitle] = useState('')
  const resultadosRef = useRef<HTMLDivElement>(null)

  const abogadosFiltrados = useMemo(() => {
    return abogadosOrdenados.filter((abogado) => {
      const coincideBusqueda = abogado.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                              abogado.ubicacion.toLowerCase().includes(busqueda.toLowerCase()) ||
                              abogado.firma.toLowerCase().includes(busqueda.toLowerCase())
      const coincideEspecialidad = especialidadSeleccionada === 'Todas' || 
                                  abogado.especialidades.includes(especialidadSeleccionada)
      return coincideBusqueda && coincideEspecialidad
    })
  }, [busqueda, especialidadSeleccionada])

  const handleCategoriaClick = (esp: string) => {
    setEspecialidadSeleccionada(esp)
    // Scroll suave a los resultados manteniendo el menú visible
    setTimeout(() => {
      if (resultadosRef.current) {
        const yOffset = -100 // Espacio para el menú fijo
        const y = resultadosRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset
        window.scrollTo({ top: y, behavior: 'smooth' })
      }
    }, 100)
  }

  // Separar en primeros 6 y el resto
  const primerosSeis = abogadosFiltrados.slice(0, 6)
  const restoAbogados = abogadosFiltrados.slice(6)

  const handleVerMas = () => {
    setMoreAbogados(restoAbogados)
    setMoreTitle(especialidadSeleccionada === 'Todas' 
      ? `Todos los profesionales (${restoAbogados.length} más)` 
      : `Más profesionales en ${especialidadSeleccionada} (${restoAbogados.length})`)
    setShowMoreDialog(true)
  }

  return (
    <div className="py-24 bg-[#0f1419]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Directorio de <span className="text-gradient">Abogados</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Listado de profesionales del derecho ordenado alfabéticamente.
          </p>
          <p className="text-sm text-gray-500 mt-4 max-w-xl mx-auto">
            * Este directorio es de carácter informativo. La inclusión en esta lista 
            no implica recomendación ni garantía de servicios profesionales.
          </p>
        </div>

        {/* Search & Filter Section */}
        <div className="max-w-4xl mx-auto mb-12">
          {/* Search Input */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <Input
              type="text"
              placeholder="Buscar por nombre, firma o ciudad..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="pl-12 bg-[#1a1f2e] border-[#c9a227]/30 text-white placeholder:text-gray-500 focus:border-[#c9a227] h-14 text-lg"
            />
          </div>

          {/* Category Buttons - Simple Style */}
          <div className="flex flex-wrap justify-center gap-3">
            {ESPECIALIDADES.map((esp) => (
              <button
                key={esp}
                onClick={() => handleCategoriaClick(esp)}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  especialidadSeleccionada === esp
                    ? 'bg-[#c9a227] text-[#0f1419]'
                    : 'bg-[#1a1f2e] text-gray-400 border border-[#c9a227]/30 hover:border-[#c9a227] hover:text-[#c9a227]'
                }`}
              >
                {esp}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div ref={resultadosRef} className="mb-8 text-center">
          <p className="text-gray-400">
            Mostrando <span className="text-[#c9a227] font-semibold">{abogadosFiltrados.length}</span> profesional{abogadosFiltrados.length !== 1 ? 'es' : ''}
            {especialidadSeleccionada !== 'Todas' && (
              <span> en <span className="text-[#c9a227]">{especialidadSeleccionada}</span></span>
            )}
          </p>
        </div>

        {/* First 6 Lawyers Grid */}
        {primerosSeis.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {primerosSeis.map((abogado) => (
              <AbogadoCard key={abogado.id} abogado={abogado} />
            ))}
          </div>
        )}

        {/* Ver Mas Button */}
        {restoAbogados.length > 0 && (
          <div className="flex justify-center mb-12">
            <Button
              onClick={handleVerMas}
              variant="outline"
              size="lg"
              className="border-[#c9a227]/50 text-[#c9a227] hover:bg-[#c9a227] hover:text-[#0f1419] hover:border-[#c9a227] px-8 transition-all duration-200"
            >
              Ver {restoAbogados.length} profesionales más
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        )}

        {abogadosFiltrados.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No se encontraron profesionales con los criterios seleccionados.</p>
          </div>
        )}

        {/* Dialog with vertical scroll - single column like Especialidades */}
        <Dialog open={showMoreDialog} onOpenChange={setShowMoreDialog}>
          <DialogContent className="bg-[#1a1f2e] border-[#c9a227]/30 max-w-3xl w-[95vw] max-h-[85vh] overflow-y-auto p-6">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-white text-2xl font-serif">
                {moreTitle}
              </DialogTitle>
            </DialogHeader>
            
            {/* Single column layout like Especialidades */}
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
