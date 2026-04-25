"use client"

import { Card, CardContent } from '@/components/ui/card'
import { Globe, Mail, MapPin, Phone, Users } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { EstudioJuridico } from '@/lib/types'
import { getEstudiosJuridicos } from '@/lib/estudios'

export default function Estudios() {
  const [estudios, setEstudios] = useState<EstudioJuridico[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadEstudios = async () => {
      console.log('🚀 Estudios: iniciando carga desde Supabase...')
      try {
        const estudiosData = await getEstudiosJuridicos()
        console.log('📊 Estudios: datos recibidos:', estudiosData.length)
        setEstudios(estudiosData)
      } catch (error) {
        console.error('❌ Estudios: error cargando datos:', error)
      } finally {
        setLoading(false)
      }
    }

    loadEstudios()
  }, [])

  if (loading) {
    return (
      <div className="py-24 bg-[#0f1419]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
          <p>Cargando estudios jurídicos...</p>
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
        {estudios.length === 0 ? (
          <div className="rounded-2xl border border-[#c9a227]/20 bg-[#1a1f2e] p-8 text-center text-gray-400">
            No hay estudios jurídicos publicados todavía.
          </div>
        ) : (
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
        )}
      </div>
    </div>
  )
}
