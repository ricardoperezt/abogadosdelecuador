import { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://abogadosdelecuador.com'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Abogados del Ecuador - Directorio de Profesionales del Derecho',
    short_name: 'Abogados del Ecuador',
    description:
      'Directorio informativo de profesionales del derecho en Ecuador. Un espacio de encuentro entre personas que buscan asesoría legal y abogados.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f1419',
    theme_color: '#0f1419',
    icons: [
      {
        src: '/logo-cicero.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  }
}
