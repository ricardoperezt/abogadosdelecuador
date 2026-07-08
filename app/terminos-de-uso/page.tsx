import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Footer from '@/components/sections/Footer'

export const metadata = {
  title: 'Términos de Uso',
  description: 'Términos y condiciones de uso del Directorio de Abogados del Ecuador',
  alternates: {
    canonical: '/terminos-de-uso',
  },
  openGraph: {
    title: 'Términos de Uso | Abogados del Ecuador',
    description: 'Términos y condiciones de uso del Directorio de Abogados del Ecuador',
    type: 'article',
  },
}

export default function TerminosDeUso() {
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
          <h1 className="text-4xl font-serif font-bold text-white mb-2">Términos de Uso</h1>
          <p className="text-gray-400 text-sm mb-8">Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <div className="space-y-8 text-gray-300">
            <section>
              <p className="text-gray-300 leading-relaxed">
                Bienvenido a Directorio de Abogados del Ecuador. Al acceder y utilizar este sitio web, usted acepta los presentes términos y condiciones de uso.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Naturaleza del Sitio</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Este sitio web es un directorio informativo que tiene como finalidad facilitar el contacto entre personas que buscan asesoría legal y profesionales del derecho en Ecuador.
                </p>
                <p>
                  El contenido publicado es de carácter exclusivamente informativo.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Ausencia de Relación Profesional</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  El uso de este sitio web no establece relación abogado-cliente entre el usuario y los administradores del sitio.
                </p>
                <p>
                  Cualquier relación profesional se genera exclusivamente entre el usuario y el abogado seleccionado.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. No Recomendación ni Garantía</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  La inclusión de abogados en el directorio no constituye recomendación, garantía ni aval de sus servicios.
                </p>
                <p>
                  El Directorio de Abogados del Ecuador no verifica ni garantiza la calidad, idoneidad, experiencia o resultados de los profesionales listados.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Responsabilidad de los Profesionales</h2>
              <p className="text-gray-300 leading-relaxed">
                Cada abogado es responsable de su práctica profesional, así como de la información que proporciona para su perfil.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Uso Adecuado</h2>
              <p className="text-gray-300 leading-relaxed">
                El usuario se compromete a utilizar el sitio de manera lícita, respetuosa y conforme a la normativa vigente.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Limitación de Responsabilidad</h2>
              <p className="text-gray-300 leading-relaxed">
                El Directorio de Abogados del Ecuador no será responsable por decisiones tomadas por los usuarios con base en la información del sitio, ni por servicios prestados por los profesionales listados.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">7. Modificaciones</h2>
              <p className="text-gray-300 leading-relaxed">
                Nos reservamos el derecho de modificar estos términos en cualquier momento.
              </p>
            </section>
          </div>
        </article>
      </div>
      <Footer />
    </main>
  )
}
