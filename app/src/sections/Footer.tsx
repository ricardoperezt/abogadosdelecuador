import { Facebook, Twitter, Linkedin, Instagram, ArrowUp } from 'lucide-react'

const footerLinks = {
  navegacion: [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Manifiesto', href: '#manifiesto' },
    { label: 'Especialidades', href: '#especialidades' },
    { label: 'Directorio', href: '#directorio' },
    { label: 'Estudios', href: '#estudios' },
    { label: 'Sobre Nosotros', href: '#sobre-nosotros' },
  ],
  especialidades: [
    { label: 'Administrativo', href: '#especialidades' },
    { label: 'Laboral', href: '#especialidades' },
    { label: 'Niñes', href: '#especialidades' },
    { label: 'Penal', href: '#especialidades' },
    { label: 'Económico', href: '#especialidades' },
  ],
  legal: [
    { label: 'Términos de Uso', href: '#' },
    { label: 'Política de Privacidad', href: '#' },
    { label: 'Descargo de Responsabilidad', href: '#' },
  ],
}

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Instagram, href: '#', label: 'Instagram' },
]

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#0a0d12] border-t border-[#c9a227]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14">
                <img 
                  src="/logo-cicero.png" 
                  alt="Abogados del Ecuador" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-[#e8d5a3] font-serif text-xl font-semibold block">
                  Abogados del Ecuador
                </span>
              </div>
            </div>
            <p className="text-gray-400 mb-4 max-w-sm">
              Directorio informativo de profesionales del derecho en Ecuador. 
              Un espacio de encuentro entre abogados y ciudadanos.
            </p>
            <p className="text-gray-500 text-sm max-w-sm">
              * Este directorio es solo informativo. No garantizamos los servicios 
              de los profesionales listados.
            </p>
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => {
                const Icono = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-[#1a1f2e] border border-[#c9a227]/30 flex items-center justify-center text-[#c9a227] hover:bg-[#c9a227]/10 hover:border-[#c9a227] transition-all duration-200"
                  >
                    <Icono className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-4">Navegación</h4>
            <ul className="space-y-3">
              {footerLinks.navegacion.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#c9a227] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Specialties */}
          <div>
            <h4 className="text-white font-semibold mb-4">Especialidades</h4>
            <ul className="space-y-3">
              {footerLinks.especialidades.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#c9a227] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#c9a227] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[#c9a227]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} Abogados del Ecuador. Directorio informativo.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-[#c9a227] hover:text-[#e8d5a3] transition-colors duration-200"
          >
            <span className="text-sm">Volver arriba</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  )
}
