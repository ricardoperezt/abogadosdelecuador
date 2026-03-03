import { Quote, Scale, BookOpen, Users, Lightbulb, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const principios = [
  {
    icono: Scale,
    titulo: 'Equidad',
    descripcion: 'Creemos en un acceso igualitario a la información jurídica, sin distinciones de origen, posición económica o ubicación geográfica.',
  },
  {
    icono: BookOpen,
    titulo: 'Transparencia',
    descripcion: 'La información debe fluir libremente. No ocultamos, no filtramos, no favorecemos. Cada profesional se presenta tal cual es.',
  },
  {
    icono: Users,
    titulo: 'Comunidad',
    descripcion: 'Somos un puente, no una barrera. Conectamos a quienes buscan con quienes ofrecen, construyendo una red de confianza mutua.',
  },
  {
    icono: Lightbulb,
    titulo: 'Conocimiento',
    descripcion: 'El derecho debe ser accesible. Promovemos la educación legal y el entendimiento de los procesos judiciales para todos.',
  },
]

export default function Manifiesto() {
  return (
    <div className="py-24 bg-[#0a0d12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Nuestro <span className="text-gradient">Manifiesto</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            La filosofía que guía cada decisión que tomamos.
          </p>
        </div>

        {/* Quote Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <Card className="bg-[#1a1f2e] border-[#c9a227]/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#c9a227] to-[#8b7355]" />
            <CardContent className="p-8 md:p-12">
              <Quote className="w-12 h-12 text-[#c9a227]/30 mb-6" />
              <blockquote className="text-xl md:text-2xl text-white font-serif italic leading-relaxed mb-6">
                "El derecho no es solo un conjunto de normas, es la expresión de la voluntad 
                de una sociedad organizada. Nuestra misión es hacer visible a quienes 
                dedican su vida a interpretarlo y defenderlo."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12">
                  <img 
                    src="/logo-cicero.png" 
                    alt="" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <p className="text-[#c9a227] font-semibold">Abogados del Ecuador</p>
                  <p className="text-gray-500 text-sm">Filosofía de servicio</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {principios.map((principio, index) => {
            const Icono = principio.icono
            return (
              <Card 
                key={index} 
                className="bg-[#1a1f2e] border-[#c9a227]/20 hover:border-[#c9a227]/40 transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-full bg-[#c9a227]/10 flex items-center justify-center flex-shrink-0">
                      <Icono className="w-7 h-7 text-[#c9a227]" />
                    </div>
                    <div>
                      <h3 className="text-white text-xl font-semibold mb-2">{principio.titulo}</h3>
                      <p className="text-gray-400 leading-relaxed">{principio.descripcion}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Commitment Section */}
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-serif font-semibold text-white mb-6">
            Nuestro Compromiso
          </h3>
          <div className="space-y-4 text-gray-400">
            <p>
              <strong className="text-[#c9a227]">Abogados del Ecuador</strong> nace de la convicción 
              de que el acceso a la justicia comienza con el acceso a la información. No somos una 
              empresa de servicios legales, somos un <strong className="text-white">espacio de encuentro</strong>.
            </p>
            <p>
              No garantizamos resultados porque no ejercemos el derecho. No recomendamos porque 
              cada caso es único. Lo que hacemos es <strong className="text-white">presentar las opciones</strong>
              {' '}para que cada persona tome su propia decisión informada.
            </p>
            <p>
              Creemos en la <strong className="text-white">profesionalidad</strong>, en la 
              <strong className="text-white"> ética</strong> y en el <strong className="text-white">deber</strong>
              {' '}de quienes ejercen esta noble profesión. Por eso verificamos, por eso exigimos, 
              por eso solo mostramos a quienes cumplen con los requisitos establecidos por la ley.
            </p>
            <p className="text-[#c9a227] italic mt-8">
              "La justicia sin conocimiento es impotente. El conocimiento sin acceso es inútil."
            </p>
          </div>
          
          {/* Botón Posición Política */}
          <div className="mt-10">
            <a href="/posicion-politica.html">
              <Button
                variant="outline"
                size="lg"
                className="border-[#c9a227]/50 text-[#c9a227] hover:bg-[#c9a227] hover:text-[#0f1419] hover:border-[#c9a227] px-8 transition-all duration-200"
              >
                Nuestra Posición Política
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
