import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Footer from '@/components/sections/Footer'

export const metadata = {
  title: 'Política de Privacidad - Abogados del Ecuador',
  description: 'Política de privacidad del Directorio de Abogados del Ecuador',
}

export default function PoliticaDePrivacidad() {
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
          <h1 className="text-4xl font-serif font-bold text-white mb-2">Política de Privacidad</h1>
          <p className="text-gray-400 text-sm mb-8">Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <div className="space-y-8 text-gray-300">
            <section>
              <p className="text-gray-300 leading-relaxed">
                El Directorio de Abogados del Ecuador respeta la privacidad de sus usuarios.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Información Recopilada</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>Podemos recopilar:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Información proporcionada voluntariamente por los usuarios</li>
                  <li>Datos de navegación (cookies, IP, etc.)</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Uso de la Información</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>La información se utiliza para:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Mejorar el funcionamiento del sitio</li>
                  <li>Facilitar el contacto entre usuarios y profesionales</li>
                  <li>Optimizar la experiencia del usuario</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Datos de los Profesionales</h2>
              <p className="text-gray-300 leading-relaxed">
                La información de los abogados es proporcionada por ellos mismos o por fuentes públicas, y es publicada con fines informativos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Compartición de Datos</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  No vendemos ni comercializamos datos personales.
                </p>
                <p>
                  Podemos compartir información solo cuando sea requerido por ley.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Cookies</h2>
              <p className="text-gray-300 leading-relaxed">
                Este sitio puede utilizar cookies para mejorar la experiencia del usuario.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Seguridad</h2>
              <p className="text-gray-300 leading-relaxed">
                Implementamos medidas razonables para proteger la información, sin garantizar seguridad absoluta.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">7. Derechos del Usuario</h2>
              <p className="text-gray-300 leading-relaxed">
                El usuario puede solicitar la actualización o eliminación de su información, cuando aplique.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">8. Cambios</h2>
              <p className="text-gray-300 leading-relaxed">
                Nos reservamos el derecho de modificar esta política en cualquier momento.
              </p>
            </section>
          </div>
        </article>
      </div>
      <Footer />
    </main>
  )
}
