import type { Metadata } from 'next'
import { ArrowLeft, BookOpen, Building2, Calendar, GraduationCap, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { slugify } from '@/lib/slug'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface Props {
  params: Promise<{ slug: string }>
}

async function getAbogadoBySlug(slug: string) {
  const { data: abogados, error } = await supabase
    .from('abogados')
    .select(`
      *,
      abogados_especialidades (
        especialidades (id, nombre, color)
      ),
      abogados_subespecialidades (
        subespecialidades (id, nombre)
      ),
      abogados_posgrados (
        posgrados (id, nombre)
      )
    `)
    .order('nombre')

  if (error || !abogados) return null

  return abogados.find((a: any) => slugify(a.nombre) === slug) || null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const abogado: any = await getAbogadoBySlug(slug)

  if (!abogado) {
    return { title: 'Abogado no encontrado' }
  }

  const especialidades = abogado.abogados_especialidades?.map((ae: any) => ae.especialidades).filter(Boolean) || []
  const prefijo = abogado.prefijo || ''
  const nombreCompleto = prefijo ? `${prefijo} ${abogado.nombre}` : abogado.nombre
  const title = nombreCompleto
  const description = `${abogado.grado} con firma en ${abogado.firma}. Ubicación: ${abogado.ubicacion}.`
  const keywords = [
    nombreCompleto,
    abogado.nombre,
    `abogado ${abogado.ubicacion}`,
    abogado.firma,
    ...especialidades.map((e: any) => `derecho ${e.nombre.toLowerCase()}`),
    'abogado Ecuador',
    'directorio de abogados'
  ]

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `/abogados/${slug}`,
    },
    openGraph: {
      title: `${nombreCompleto} | Abogados del Ecuador`,
      description,
      type: 'profile',
      locale: 'es_EC',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
      },
    },
  }
}

export default async function AbogadoPage({ params }: Props) {
  const { slug } = await params
  const abogado: any = await getAbogadoBySlug(slug)

  if (!abogado) {
    return (
      <div className="min-h-screen bg-[#0f1419] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-serif text-foreground mb-4">Abogado no encontrado</h1>
          <p className="text-gray-400 mb-8">El perfil que buscas no existe o ha sido removido.</p>
          <a href="/#directorio">
            <Button className="bg-[#c9a227] text-[#0f1419] hover:bg-[#e8d5a3]">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al directorio
            </Button>
          </a>
        </div>
      </div>
    )
  }

  const especialidades = abogado.abogados_especialidades?.map((ae: any) => ae.especialidades).filter(Boolean) || []
  const subespecialidades = abogado.abogados_subespecialidades?.map((as: any) => as.subespecialidades).filter(Boolean) || []
  const posgrados = abogado.abogados_posgrados?.map((ap: any) => ap.posgrados).filter(Boolean) || []

  const prefijo = abogado.prefijo || ''
  const nombreCompleto = prefijo ? `${prefijo} ${abogado.nombre}` : abogado.nombre

  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://abogadosdelecuador.com'

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: nombreCompleto,
    jobTitle: 'Abogado',
    description: `${abogado.grado} con firma en ${abogado.firma}. Ubicación: ${abogado.ubicacion}.`,
    url: `${BASE_URL}/abogados/${slug}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: abogado.ubicacion,
      addressCountry: 'EC',
    },
    telephone: abogado.telefono,
    email: abogado.email,
    worksFor: {
      '@type': 'LegalService',
      name: abogado.firma,
    },
    knowsAbout: especialidades.map((e: any) => e.nombre),
    alumniOf: posgrados.map((p: any) => ({ '@type': 'EducationalOrganization', name: p.nombre })),
    ...(abogado.linkedin ? { sameAs: [abogado.linkedin] } : {}),
  }

  return (
    <div className="min-h-screen bg-[#0f1419]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back button */}
        <a href="/#directorio">
          <Button variant="outline" className="border-[#c9a227]/50 text-[#c9a227] hover:bg-[#c9a227] hover:text-[#0f1419] mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al directorio
          </Button>
        </a>

        {/* Profile header */}
        <Card className="bg-[#1a1f2e] border-[#c9a227]/20 mb-6">
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-2">
                  {nombreCompleto}
                </h1>
                <div className="flex items-center gap-2 text-[#c9a227]/80 text-sm mb-4">
                  <Building2 className="w-4 h-4" />
                  <span>{abogado.firma}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {especialidades.map((esp: any) => (
                  <Badge key={esp.id} className="bg-[#c9a227]/20 text-[#c9a227] border-none text-sm px-3 py-1">
                    {esp.nombre}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-10 h-10 rounded-full bg-[#c9a227]/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-[#c9a227]" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Edad</p>
                  <p className="text-foreground">{abogado.edad} años</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-10 h-10 rounded-full bg-[#c9a227]/10 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-5 h-5 text-[#c9a227]" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Grado académico</p>
                  <p className="text-foreground">{abogado.grado}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-10 h-10 rounded-full bg-[#c9a227]/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#c9a227]" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Ubicación</p>
                  <p className="text-foreground">{abogado.ubicacion}</p>
                </div>
              </div>

              {abogado.linkedin && (
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-10 h-10 rounded-full bg-[#c9a227]/10 flex items-center justify-center flex-shrink-0">
                    <Linkedin className="w-5 h-5 text-[#c9a227]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-gray-500 text-xs">LinkedIn</p>
                    <a
                      href={abogado.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 truncate block"
                    >
                      Ver perfil
                    </a>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Subespecialidades */}
        {subespecialidades.length > 0 && (
          <Card className="bg-[#1a1f2e] border-[#c9a227]/20 mb-6">
            <CardContent className="p-6">
              <h2 className="text-xl font-serif text-foreground mb-4">Subespecialidades</h2>
              <div className="flex flex-wrap gap-2">
                {subespecialidades.map((sub: any) => (
                  <Badge key={sub.id} className="bg-[#8b7355]/20 text-[#e8d5a3] border border-[#8b7355]/30 text-sm px-3 py-1">
                    {sub.nombre}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Posgrados */}
        {posgrados.length > 0 && (
          <Card className="bg-[#1a1f2e] border-[#c9a227]/20 mb-6">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-[#c9a227]" />
                <h2 className="text-xl font-serif text-foreground">Posgrados</h2>
              </div>
              <ul className="space-y-2">
                {posgrados.map((pos: any) => (
                  <li key={pos.id} className="flex items-center gap-2 text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#c9a227]" />
                    {pos.nombre}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Contact */}
        <Card className="bg-[#1a1f2e] border-[#c9a227]/20 mb-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-serif text-foreground mb-4">Contacto</h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={`tel:${abogado.telefono.replace(/\s/g, '')}`} className="flex-1">
                <Button variant="outline" className="w-full border-[#c9a227]/50 text-[#c9a227] hover:bg-[#c9a227] hover:text-[#0f1419] h-12">
                  <Phone className="w-4 h-4 mr-2" />
                  {abogado.telefono}
                </Button>
              </a>
              <a href={`mailto:${abogado.email}`} className="flex-1">
                <Button className="w-full bg-gradient-to-r from-[#c9a227] to-[#8b7355] text-[#0f1419] font-semibold hover:from-[#e8d5a3] hover:to-[#c9a227] h-12">
                  <Mail className="w-4 h-4 mr-2" />
                  {abogado.email}
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <p className="text-sm text-gray-500 text-center mt-8">
          * Este directorio es de carácter informativo. La inclusión en esta lista no implica recomendación ni garantía de servicios profesionales.
        </p>
      </div>
    </div>
  )
}
