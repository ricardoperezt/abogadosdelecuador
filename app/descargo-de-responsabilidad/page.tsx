import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Footer from '@/components/sections/Footer'

export const metadata = {
  title: 'Descargo de Responsabilidad',
  description: 'Descargo de responsabilidad del Directorio de Abogados del Ecuador',
  alternates: {
    canonical: '/descargo-de-responsabilidad',
  },
  openGraph: {
    title: 'Descargo de Responsabilidad | Abogados del Ecuador',
    description: 'Descargo de responsabilidad del Directorio de Abogados del Ecuador',
    type: 'article',
  },
}

export default function DescargoDeResponsabilidad() {
  return (
    <main className="min-h-screen bg-[#0f1419]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-[#c9a227] hover:text-[#e8d5a3] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al inicio</span>
        </Link>

        {/* Content */}
        <article className="prose prose-invert max-w-none">
          <h1 className="text-4xl font-serif font-bold text-white mb-2">Descargo de Responsabilidad</h1>
          <p className="text-gray-400 text-sm mb-8">Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <div className="space-y-8 text-gray-300">
            <section>
              <p className="text-gray-300 leading-relaxed">
                El Directorio de Abogados del Ecuador es un sitio de carácter exclusivamente informativo.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. No Asesoría Legal</h2>
              <p className="text-gray-300 leading-relaxed">
                El contenido del sitio no constituye asesoría legal ni reemplaza la consulta directa con un profesional del derecho.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. No Garantía de Servicios</h2>
              <p className="text-gray-300 leading-relaxed">
                La inclusión de profesionales en el directorio no implica recomendación, respaldo ni garantía de sus servicios.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Responsabilidad Individual</h2>
              <p className="text-gray-300 leading-relaxed">
                Cada abogado es responsable de su práctica profesional, así como de la información proporcionada en su perfil.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Decisiones del Usuario</h2>
              <p className="text-gray-300 leading-relaxed">
                El usuario es el único responsable de las decisiones que tome con base en la información del sitio.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Exactitud de la Información</h2>
              <p className="text-gray-300 leading-relaxed">
                Aunque se procura mantener la información actualizada, no se garantiza su exactitud o integridad.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Enlaces Externos</h2>
              <p className="text-gray-300 leading-relaxed">
                El sitio puede contener enlaces a terceros, sobre los cuales no se tiene control ni responsabilidad.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">7. Limitación de Responsabilidad</h2>
              <p className="text-gray-300 leading-relaxed">
                El Directorio de Abogados del Ecuador no será responsable por daños directos o indirectos derivados del uso del sitio o de los servicios de los profesionales listados.
              </p>
            </section>
          </div>
        </article>
      </div>
      <Footer />
    </main>
  )
}
