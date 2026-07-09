import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'
import { slugify } from '@/lib/slug'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://abogadosdelecuador.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date()

  const staticRoutes = [
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${BASE_URL}/trayectoria`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/terminos-de-uso`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/politica-de-privacidad`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/descargo-de-responsabilidad`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]

  const { data: abogados } = await supabase
    .from('abogados')
    .select('id, nombre')
    .order('nombre')

  const abogadoRoutes = (abogados || []).map((abogado) => ({
    url: `${BASE_URL}/abogados/${slugify(abogado.nombre)}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...abogadoRoutes]
}
