'use client'

import { usePathname } from 'next/navigation'
import { ArrowUp, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'

const footerLinks = {
  navegacion: [
    { label: 'Inicio', anchor: '#inicio' },
    { label: 'Manifiesto', anchor: '#manifiesto' },
    { label: 'Especialidades', anchor: '#especialidades' },
    { label: 'Directorio', anchor: '#directorio' },
    { label: 'Estudios', anchor: '#estudios' },
    { label: 'Sobre Nosotros', anchor: '#sobre-nosotros' },
    { label: 'Contacto', anchor: '#contacto' },
  ],
  especialidades: [
    { label: 'Administrativo', anchor: '#especialidades' },
    { label: 'Laboral', anchor: '#especialidades' },
    { label: 'Niñez', anchor: '#especialidades' },
    { label: 'Penal', anchor: '#especialidades' },
    { label: 'Económico', anchor: '#especialidades' },
  ],
  legal: [
    { label: 'Términos de Uso', href: '/terminos-de-uso' },
    { label: 'Política de Privacidad', href: '/politica-de-privacidad' },
    { label: 'Descargo de Responsabilidad', href: '/descargo-de-responsabilidad' },
  ],
}

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Instagram, href: '#', label: 'Instagram' },
]

export default function Footer() {
  const pathname = usePathname()
  const isHomepage = pathname === '/'

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const getHrefForNavigation = (anchor: string): string => {
    if (isHomepage) {
      return anchor
    } else {
      return `/${anchor}`
    }
  }

  const scrollToSection = (e: React.MouseEvent, anchor: string) => {
    if (!isHomepage) {
      // Si no estamos en homepage, permitir que el navegador haga la navegación normal
      return
    }
    e.preventDefault()
    const element = document.querySelector(anchor)
    if (element) {
      const yOffset = -80
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
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
            {/* Redes Sociales - Comentado temporalmente */}
            {/* <div className="flex gap-3 mt-6">
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
            </div> */}
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-4">Navegación</h4>
            <ul className="space-y-3">
              {footerLinks.navegacion.map((link) => (
                <li key={link.label}>
                  <a
                    href={getHrefForNavigation(link.anchor)}
                    onClick={(e) => scrollToSection(e, link.anchor)}
                    className="text-gray-400 hover:text-[#c9a227] transition-colors duration-200 cursor-pointer"
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
                    href={getHrefForNavigation(link.anchor)}
                    onClick={(e) => scrollToSection(e, link.anchor)}
                    className="text-gray-400 hover:text-[#c9a227] transition-colors duration-200 cursor-pointer"
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
