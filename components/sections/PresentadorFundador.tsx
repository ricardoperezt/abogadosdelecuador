import Link from 'next/link'
import { Scale, Globe, GraduationCap, BookOpen, ArrowRight } from 'lucide-react'

const highlights = [
  {
    icono: Scale,
    titulo: 'Litigante de Alto Nivel',
    descripcion: 'Asesor y abogado en casos del Estado ecuatoriano: CNT, Ministerio de Defensa, Petroecuador y TSE.',
  },
  {
    icono: Globe,
    titulo: 'Consultor Internacional',
    descripcion: 'Consultorías para Banco Mundial, BID, OEA, GTZ y UICN en temas de Derecho Público.',
  },
  {
    icono: GraduationCap,
    titulo: 'Académico y Conferencista',
    descripcion: 'Profesor universitario en Ecuador y conferencista en Italia, España, Argentina y EE.UU.',
  },
  {
    icono: BookOpen,
    titulo: 'Autor Reconocido',
    descripcion: 'Obras citadas por la Real Academia Española en el Diccionario Panhispánico y del Español Jurídico.',
  },
]

export default function PresentadorFundador() {
  return (
    <section className="py-24 bg-[#0f1419]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#c9a227] text-sm font-medium tracking-widest uppercase mb-4">
            Fundador
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            Dr. Efraín Pérez Camacho
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Abogado ecuatoriano con amplia trayectoria en Derecho Público, reconocido por su participación 
            en litigios y asesorías de alto nivel para el Estado ecuatoriano, organismos internacionales 
            y el sector privado.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {highlights.map((item, index) => {
            const Icono = item.icono
            return (
              <div
                key={index}
                className="bg-[#1a1f2e] border border-[#c9a227]/20 rounded-lg p-6 hover:border-[#c9a227]/40 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-[#c9a227]/10 flex items-center justify-center mb-4">
                  <Icono className="w-6 h-6 text-[#c9a227]" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{item.titulo}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.descripcion}</p>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/trayectoria"
            className="inline-flex items-center gap-2 bg-[#c9a227] text-[#0a0d12] px-8 py-4 rounded-lg font-semibold hover:bg-[#d4af37] transition-colors duration-300"
          >
            Ver trayectoria completa
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
