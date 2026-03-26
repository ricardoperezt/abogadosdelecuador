import { MapPin, Phone, Mail, Users, Globe } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const estudios = [
  {
    id: 1,
    nombre: 'Pérez Bustamante & Ponce',
    descripcion: 'Firma líder en derecho corporativo, bancario y tributario. Reconocida internacionalmente por Chambers & Partners.',
    ubicacion: 'Av. 12 de Octubre N24-563 y Cordero, Quito',
    telefono: '+593 2 256 2680',
    email: 'info@pbpabogados.com',
    web: 'https://www.pbpabogados.com',
    abogados: 45,
    especialidades: ['Económico', 'Administrativo', 'Penal'],
    imagen: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=400&fit=crop',
    logo: 'PBP',
  },
  {
    id: 2,
    nombre: 'CorralRosales',
    descripcion: 'Firma boutique especializada en derecho corporativo, energía y recursos naturales.',
    ubicacion: 'Av. República del Salvador N34-107 y Suiza, Quito',
    telefono: '+593 2 381 0950',
    email: 'info@corralrosales.com',
    web: 'https://www.corralrosales.com',
    abogados: 25,
    especialidades: ['Económico', 'Administrativo'],
    imagen: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800&h=400&fit=crop',
    logo: 'CR',
  },
  {
    id: 3,
    nombre: 'BUSTAMANTE FABARA',
    descripcion: 'Firma líder en Guayaquil especializada en derecho corporativo, marítimo y energía.',
    ubicacion: 'Av. Francisco de Orellana 234, Guayaquil',
    telefono: '+593 4 251 9900',
    email: 'info@bfabogados.com',
    web: 'https://www.bfabogados.com',
    abogados: 35,
    especialidades: ['Económico', 'Administrativo'],
    imagen: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop',
    logo: 'BF',
  },
  {
    id: 4,
    nombre: 'ROBALINO',
    descripcion: 'Firma especializada en derecho corporativo, M&A y resolución de disputas.',
    ubicacion: 'Av. 6 de Diciembre N36-14 y Alpallana, Quito',
    telefono: '+593 2 323 0011',
    email: 'info@robalino.com',
    web: 'https://www.robalino.com',
    abogados: 20,
    especialidades: ['Económico', 'Penal'],
    imagen: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=400&fit=crop',
    logo: 'ROB',
  },
  {
    id: 5,
    nombre: 'Gallegos, Valarezo & Neira',
    descripcion: 'Firma especializada en derecho inmobiliario, propiedad intelectual y corporativo.',
    ubicacion: 'Av. República N16-114 y Av. Eloy Alfaro, Quito',
    telefono: '+593 2 244 3866',
    email: 'info@gvnabogados.com',
    web: 'https://www.gvnabogados.com',
    abogados: 18,
    especialidades: ['Económico', 'Administrativo'],
    imagen: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop',
    logo: 'GVN',
  },
  {
    id: 6,
    nombre: 'Falconi Puig Abogados',
    descripcion: 'Firma especializada en derecho administrativo, regulatorio y propiedad intelectual.',
    ubicacion: 'Av. 12 de Octubre N24-563, Quito',
    telefono: '+593 2 256 2680',
    email: 'info@falconipuig.com',
    web: 'https://www.falconipuig.com',
    abogados: 15,
    especialidades: ['Administrativo', 'Económico'],
    imagen: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=400&fit=crop',
    logo: 'FP',
  },
]

export default function Estudios() {
  return (
    <div className="py-24 bg-[#0f1419]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Estudios <span className="text-gradient">Jurídicos</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Listado de estudios jurídicos en Ecuador. Información de contacto y áreas de práctica.
          </p>
          <p className="text-sm text-gray-500 mt-4 max-w-xl mx-auto">
            * Este listado es informativo. La inclusión no implica recomendación ni garantía de servicios.
          </p>
        </div>

        {/* Studios Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {estudios.map((estudio) => (
            <Card key={estudio.id} className="bg-[#1a1f2e] border-[#c9a227]/20 hover:border-[#c9a227]/40 transition-all duration-300 overflow-hidden group">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={estudio.imagen}
                  alt={estudio.nombre}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f2e] to-transparent" />
                <div className="absolute bottom-4 left-6 right-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#c9a227] to-[#8b7355] flex items-center justify-center text-[#0f1419] font-bold text-lg">
                      {estudio.logo}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">{estudio.nombre}</h3>
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                {/* Description */}
                <p className="text-gray-400 text-sm mb-4">{estudio.descripcion}</p>

                {/* Specialties */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {estudio.especialidades.map((esp, index) => (
                    <Badge key={index} className="bg-[#c9a227]/10 text-[#c9a227] border border-[#c9a227]/30">
                      {esp}
                    </Badge>
                  ))}
                </div>

                {/* Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <MapPin className="w-4 h-4 text-[#c9a227]" />
                    <span>{estudio.ubicacion}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Users className="w-4 h-4 text-[#c9a227]" />
                    <span>{estudio.abogados} profesionales</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <a href={`tel:${estudio.telefono.replace(/\s/g, '')}`} className="flex-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-[#c9a227]/50 text-[#c9a227] hover:bg-[#c9a227]/10"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Llamar
                    </Button>
                  </a>
                  <a href={`mailto:${estudio.email}`} className="flex-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-[#c9a227]/50 text-[#c9a227] hover:bg-[#c9a227]/10"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </Button>
                  </a>
                  <a href={estudio.web} target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button
                      size="sm"
                      className="w-full bg-gradient-to-r from-[#c9a227] to-[#8b7355] text-[#0f1419] font-semibold hover:opacity-90"
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      Web
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
