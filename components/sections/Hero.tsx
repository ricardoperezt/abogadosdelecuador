import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HeroProps {
  onNavigate: (sectionId: string) => void
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[#0f1419]">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#c9a227]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#8b7355]/10 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(201, 162, 39, 0.3) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(201, 162, 39, 0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-56 h-56 md:w-72 md:h-72 drop-shadow-[0_0_50px_rgba(201,162,39,0.4)]">
              <img 
                src="/logo-cicero.png" 
                alt="Abogados del Ecuador" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
            Directorio de{' '}
            <span className="text-gradient">Abogados</span>
            <br />
            del Ecuador
          </h1>

          {/* Subtitle - Sin garantías */}
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Un espacio de encuentro entre personas que buscan asesoría legal y profesionales 
            del derecho en Ecuador. Este directorio es solo informativo.
          </p>

          {/* Disclaimer */}
          <p className="text-sm text-gray-500 max-w-xl mx-auto mb-10">
            * El listado de profesionales no constituye recomendación ni garantía de servicios. 
            Cada abogado es responsable de su práctica profesional.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => onNavigate('manifiesto')}
              size="lg"
              variant="outline"
              className="border-[#c9a227]/50 text-[#c9a227] hover:bg-[#c9a227]/10 px-8 py-6 text-lg"
            >
              Leer Manifiesto
            </Button>
            <Button
              onClick={() => onNavigate('directorio')}
              size="lg"
              className="bg-gradient-to-r from-[#c9a227] to-[#8b7355] text-[#0f1419] font-semibold px-8 py-6 text-lg hover:opacity-90 transition-all duration-300 hover:scale-105"
            >
              Explorar Directorio
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0f1419] to-transparent" />
    </div>
  )
}
