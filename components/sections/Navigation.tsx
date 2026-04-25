import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { getEspecialidadesConSubespecialidades, type EspecialidadConSubespecialidades } from '@/lib/especialidades'

interface NavigationProps {
  activeSection: string
  onNavigate: (sectionId: string) => void
  onSubcategoriaClick: (especialidad: string, subcategoria: string) => void
}

const menuItems = [
  { id: 'inicio', label: 'Inicio', hasSubmenu: false },
  { id: 'especialidades', label: 'Especialidades', hasSubmenu: true },
  { id: 'directorio', label: 'Directorio', hasSubmenu: false },
  { id: 'estudios', label: 'Estudios', hasSubmenu: false },
  { id: 'manifiesto', label: 'Manifiesto', hasSubmenu: false },
  { id: 'sobre-nosotros', label: 'Sobre Nosotros', hasSubmenu: false },
]

export default function Navigation({ activeSection, onNavigate, onSubcategoriaClick }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null)
  const [activeSubmenuIndex, setActiveSubmenuIndex] = useState<number | null>(null)
  const [especialidadesMenu, setEspecialidadesMenu] = useState<EspecialidadConSubespecialidades[]>([])
  const [loadingEspecialidades, setLoadingEspecialidades] = useState(true)
  const menuRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const mobileButtonRef = useRef<HTMLButtonElement>(null)
  const submenuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const ignoreNextClickOutside = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const loadEspecialidades = async () => {
      try {
        const especialidades = await getEspecialidadesConSubespecialidades()
        setEspecialidadesMenu(especialidades)
      } catch (error) {
        console.error('❌ Navigation: error cargando especialidades:', error)
      } finally {
        setLoadingEspecialidades(false)
      }
    }

    loadEspecialidades()
  }, [])

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenSubmenu(null)
        setActiveSubmenuIndex(null)
      }
      // Ignorar si el clic fue en el botón de menú móvil
      if (mobileButtonRef.current && mobileButtonRef.current.contains(event.target as Node)) {
        return
      }
      if (ignoreNextClickOutside.current) {
        ignoreNextClickOutside.current = false
        return
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false)
        setOpenMobileSubmenu(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [])

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId)
    setIsMobileMenuOpen(false)
    setOpenSubmenu(null)
    setOpenMobileSubmenu(null)
    setActiveSubmenuIndex(null)
  }

  const handleSpecialidadesDesktopClick = () => {
    onNavigate('especialidades')
    setOpenSubmenu('especialidades')
    setActiveSubmenuIndex((current) => current ?? (especialidadesMenu.length > 0 ? 0 : null))
  }

  const handleSpecialidadesMobileClick = () => {
    onNavigate('especialidades')
    setOpenMobileSubmenu('especialidades')
  }

  const handleSubmenuItemClick = (especialidadLabel: string, subcategoria: string) => {
    onSubcategoriaClick(especialidadLabel, subcategoria)
    setOpenSubmenu(null)
    setOpenMobileSubmenu(null)
    setActiveSubmenuIndex(null)
    setIsMobileMenuOpen(false)
  }

  const handleMouseEnterMenu = (itemId: string) => {
    if (submenuTimeoutRef.current) {
      clearTimeout(submenuTimeoutRef.current)
      submenuTimeoutRef.current = null
    }
    setOpenSubmenu(itemId)
  }

  const handleMouseLeaveMenu = () => {
    submenuTimeoutRef.current = setTimeout(() => {
      setOpenSubmenu(null)
      setActiveSubmenuIndex(null)
    }, 150)
  }

  const handleMouseEnterSubmenuItem = (index: number) => {
    if (submenuTimeoutRef.current) {
      clearTimeout(submenuTimeoutRef.current)
      submenuTimeoutRef.current = null
    }
    setActiveSubmenuIndex(index)
  }

  const handleMouseLeaveSubmenuContainer = () => {
    submenuTimeoutRef.current = setTimeout(() => {
      setOpenSubmenu(null)
      setActiveSubmenuIndex(null)
    }, 200)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0f1419]/95 backdrop-blur-md border-b border-[#c9a227]/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => handleNavClick('inicio')}
          >
            <div className="w-14 h-14 md:w-16 md:h-16">
              <img 
                src="/logo-cicero.png" 
                alt="Abogados del Ecuador" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <span className="text-[#e8d5a3] font-serif text-lg font-semibold">
                Abogados del Ecuador
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1" ref={menuRef}>
            {menuItems.map((item) => (
              <div 
                key={item.id} 
                className="relative"
                onMouseEnter={() => item.hasSubmenu && handleMouseEnterMenu(item.id)}
                onMouseLeave={handleMouseLeaveMenu}
              >
                {item.hasSubmenu ? (
                  <>
                    <button
                      onClick={() => handleSpecialidadesDesktopClick()}
                      className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-all duration-200 rounded-md ${
                        activeSection === item.id
                          ? 'text-[#c9a227] bg-[#c9a227]/10'
                          : 'text-gray-300 hover:text-[#c9a227] hover:bg-[#c9a227]/5'
                      }`}
                    >
                      {item.label}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openSubmenu === item.id ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {/* Submenu Cascade - Con scroll interno */}
                    {openSubmenu === item.id && (
                      <div 
                        className="absolute top-full left-0 pt-2 z-50"
                        onMouseEnter={() => {
                          if (submenuTimeoutRef.current) {
                            clearTimeout(submenuTimeoutRef.current)
                            submenuTimeoutRef.current = null
                          }
                        }}
                        onMouseLeave={handleMouseLeaveSubmenuContainer}
                      >
                        <div className="flex">
                          {/* Menu principal de especialidades */}
                          <div className="bg-[#1a1f2e] border border-[#c9a227]/30 rounded-lg shadow-xl shadow-black/50 overflow-hidden min-w-[260px] max-h-[70vh] overflow-y-auto">
                            {loadingEspecialidades ? (
                              <div className="px-4 py-3 text-sm text-gray-400">
                                Cargando especialidades...
                              </div>
                            ) : especialidadesMenu.length === 0 ? (
                              <div className="px-4 py-3 text-sm text-gray-400">
                                No hay especialidades disponibles.
                              </div>
                            ) : especialidadesMenu.map((submenu, idx) => (
                              <div 
                                key={idx} 
                                className="relative"
                                onMouseEnter={() => handleMouseEnterSubmenuItem(idx)}
                              >
                                <div 
                                  className={`px-4 py-3 text-sm border-b border-[#c9a227]/10 last:border-b-0 cursor-pointer transition-colors flex items-center justify-between ${
                                    activeSubmenuIndex === idx 
                                      ? 'bg-[#c9a227]/20 text-[#c9a227]' 
                                      : 'text-[#c9a227] hover:bg-[#c9a227]/10'
                                  }`}
                                >
                                  <span className="font-semibold">{submenu.nombre}</span>
                                  <ChevronRight className="w-4 h-4" />
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          {/* Sub-submenu (cascade) - aparece al lado */}
                          {activeSubmenuIndex !== null && especialidadesMenu[activeSubmenuIndex] && (
                            <div 
                              className="ml-2 bg-[#0f1419] border border-[#c9a227]/30 rounded-lg shadow-xl shadow-black/50 overflow-hidden min-w-[240px] max-h-[70vh] overflow-y-auto"
                              onMouseEnter={() => {
                                if (submenuTimeoutRef.current) {
                                  clearTimeout(submenuTimeoutRef.current)
                                  submenuTimeoutRef.current = null
                                }
                              }}
                              onMouseLeave={handleMouseLeaveSubmenuContainer}
                            >
                              <div className="px-4 py-3 bg-[#c9a227]/10 border-b border-[#c9a227]/30">
                                <span className="text-[#c9a227] font-semibold text-sm">
                                  {especialidadesMenu[activeSubmenuIndex].nombre}
                                </span>
                              </div>
                              {especialidadesMenu[activeSubmenuIndex].subespecialidades.length > 0 ? (
                                especialidadesMenu[activeSubmenuIndex].subespecialidades.map((subItem, subIdx) => (
                                <button
                                  key={subIdx}
                                  onClick={() => handleSubmenuItemClick(especialidadesMenu[activeSubmenuIndex].nombre, subItem.nombre)}
                                  className="block w-full text-left px-4 py-3 text-sm text-gray-300 hover:text-[#c9a227] hover:bg-[#c9a227]/10 transition-colors border-b border-[#c9a227]/5 last:border-b-0"
                                >
                                  {subItem.nombre}
                                </button>
                                ))
                              ) : (
                                <div className="px-4 py-3 text-sm text-gray-400">
                                  No hay subespecialidades disponibles.
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`px-3 py-2 text-sm font-medium transition-all duration-200 rounded-md ${
                      activeSection === item.id
                        ? 'text-[#c9a227] bg-[#c9a227]/10'
                        : 'text-gray-300 hover:text-[#c9a227] hover:bg-[#c9a227]/5'
                    }`}
                  >
                    {item.label}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button
              onClick={() => handleNavClick('contacto')}
              className="bg-gradient-to-r from-[#c9a227] to-[#8b7355] text-[#0f1419] font-semibold hover:opacity-90 transition-opacity"
            >
              Contacto
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            ref={mobileButtonRef}
            onClick={() => {
              ignoreNextClickOutside.current = true
              setIsMobileMenuOpen(prev => !prev)
            }}
            className="lg:hidden p-2 text-[#c9a227] hover:bg-[#c9a227]/10 rounded-md transition-colors z-50 relative"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Menu */}
      <div
        ref={mobileMenuRef}
        className={`lg:hidden fixed inset-0 top-20 bg-[#0f1419]/95 backdrop-blur-md border-t border-[#c9a227]/20 transition-all duration-300 z-40 ${
          isMobileMenuOpen 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible pointer-events-none'
        }`}
        style={{ height: 'calc(100vh - 5rem)' }}
      >
        <div className="h-full overflow-y-auto">
          <div className="px-4 py-4 space-y-2 pb-24">
          {menuItems.map((item) => (
            <div key={item.id}>
              {item.hasSubmenu ? (
                <div className="space-y-2">
                  <button
                    onClick={() => handleSpecialidadesMobileClick()}
                    className={`flex items-center justify-between w-full text-left px-4 py-3 text-sm font-medium transition-all duration-200 rounded-md ${
                      activeSection === item.id
                        ? 'text-[#c9a227] bg-[#c9a227]/10'
                        : 'text-gray-300 hover:text-[#c9a227] hover:bg-[#c9a227]/5'
                    }`}
                  >
                    {item.label}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openMobileSubmenu === item.id ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Mobile Submenu */}
                  {openMobileSubmenu === item.id && (
                    <div className="pl-4 space-y-2 border-l-2 border-[#c9a227]/30 ml-4">
                      {loadingEspecialidades ? (
                        <div className="px-3 py-2 text-sm text-gray-400">Cargando especialidades...</div>
                      ) : especialidadesMenu.length === 0 ? (
                        <div className="px-3 py-2 text-sm text-gray-400">No hay especialidades disponibles.</div>
                      ) : especialidadesMenu.map((submenu, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="px-3 py-2 text-[#c9a227] font-semibold text-xs uppercase tracking-wider flex items-center gap-2">
                            <ChevronRight className="w-3 h-3" />
                            {submenu.nombre}
                          </div>
                          <div className="pl-4 space-y-1">
                            {submenu.subespecialidades.length > 0 ? submenu.subespecialidades.map((subItem, subIdx) => (
                              <button
                                key={subIdx}
                                onClick={() => handleSubmenuItemClick(submenu.nombre, subItem.nombre)}
                                className="block w-full text-left px-3 py-2.5 text-sm text-gray-400 hover:text-[#c9a227] hover:bg-[#c9a227]/10 transition-colors rounded-md"
                                type="button"
                              >
                                {subItem.nombre}
                              </button>
                            )) : (
                              <div className="px-3 py-2 text-sm text-gray-500">Sin subespecialidades</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left px-4 py-3 text-sm font-medium transition-all duration-200 rounded-md ${
                    activeSection === item.id
                      ? 'text-[#c9a227] bg-[#c9a227]/10'
                      : 'text-gray-300 hover:text-[#c9a227] hover:bg-[#c9a227]/5'
                  }`}
                  type="button"
                >
                  {item.label}
                </button>
              )}
            </div>
          ))}
          <Button
            onClick={() => handleNavClick('contacto')}
            className="w-full mt-4 bg-gradient-to-r from-[#c9a227] to-[#8b7355] text-[#0f1419] font-semibold hover:opacity-90 transition-opacity"
          >
            Contacto
          </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
