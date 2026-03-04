import { Target, Eye, Heart, Shield, Users, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const valores = [
  {
    icono: Shield,
    titulo: "Integridad",
    descripcion: "Actuamos con honestidad y etica en cada interaccion, manteniendo los mas altos estandares profesionales.",
  },
  {
    icono: Users,
    titulo: "Compromiso",
    descripcion: "Nos dedicamos a entender las necesidades de nuestros usuarios y abogados para crear conexiones significativas.",
  },
  {
    icono: Heart,
    titulo: "Empatia",
    descripcion: "Entendemos que detras de cada caso legal hay una persona, por eso brindamos un servicio humano y cercano.",
  },
]

const diferenciadores = [
  "Verificacion rigurosa de credenciales de todos los abogados",
  "Sistema de calificaciones transparente y confiable",
  "Verificamos su inclusion en el CENECI y Consejo de la Judicatura",
]

export default function SobreNosotros() {
  return (
    <div className="py-24 bg-[#0a0d12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            {"Sobre "}<span className="text-gradient">Abogados del Ecuador</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            {"Somos un directorio que facilita el encuentro entre personas que buscan asesoria legal y profesionales del derecho en Ecuador."}
          </p>
          <p className="text-sm text-gray-500 mt-4 max-w-xl mx-auto">
            {"* Este es un directorio informativo. No somos responsables por los servicios prestados por los profesionales listados."}
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <Card className="bg-[#1a1f2e] border-[#c9a227]/20">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-[#c9a227]/10 flex items-center justify-center">
                  <Target className="w-7 h-7 text-[#c9a227]" />
                </div>
                <h3 className="text-foreground text-2xl font-serif font-semibold">{"Nuestra Mision"}</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                {"Facilitar el acceso a informacion sobre profesionales del derecho en Ecuador, creando un espacio de encuentro entre quienes necesitan asesoria legal y quienes la pueden proporcionar. No garantizamos servicios, solo informacion."}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#1a1f2e] border-[#c9a227]/20">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-[#c9a227]/10 flex items-center justify-center">
                  <Eye className="w-7 h-7 text-[#c9a227]" />
                </div>
                <h3 className="text-foreground text-2xl font-serif font-semibold">{"Nuestra Vision"}</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                {"Ser el directorio de referencia para encontrar informacion sobre profesionales del derecho en Ecuador, contribuyendo a una relacion mas transparente entre abogados y ciudadanos."}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h3 className="text-foreground text-2xl font-serif font-semibold text-center mb-10">Nuestros Valores</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {valores.map((valor, index) => {
              const Icono = valor.icono
              return (
                <Card key={index} className="bg-[#1a1f2e] border-[#c9a227]/20 hover:border-[#c9a227]/40 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 rounded-full bg-[#c9a227]/10 flex items-center justify-center mx-auto mb-4">
                      <Icono className="w-7 h-7 text-[#c9a227]" />
                    </div>
                    <h4 className="text-foreground font-semibold text-lg mb-2">{valor.titulo}</h4>
                    <p className="text-gray-400 text-sm">{valor.descripcion}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Differentiators */}
        <div className="max-w-2xl mx-auto">
          <h3 className="text-foreground text-2xl font-serif font-semibold text-center mb-8">
            {"Por que usar nuestro directorio?"}
          </h3>
          <div className="bg-[#1a1f2e] border border-[#c9a227]/20 rounded-lg p-8">
            <div className="flex flex-col gap-4">
              {diferenciadores.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#c9a227] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-6 pt-4 border-t border-[#c9a227]/10">
              {"* La verificacion de credenciales no garantiza la calidad de los servicios prestados. Cada profesional es responsable de su practica."}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
