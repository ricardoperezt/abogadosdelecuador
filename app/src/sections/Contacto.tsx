import { useState } from 'react'
import { Mail, Clock, Send, CheckCircle, Info, UserPlus } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const especialidades = [
  'Administrativo',
  'Laboral',
  'Niñes',
  'Penal',
  'Económico',
]

export default function Contacto() {
  const [enviado, setEnviado] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    especialidad: '',
    mensaje: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Enviar a info@abogadosdelecuador.com
    const subject = `Consulta de ${formData.nombre} - ${formData.especialidad || 'General'}`
    const body = `Nombre: ${formData.nombre}%0D%0AEmail: ${formData.email}%0D%0ATeléfono: ${formData.telefono || 'No proporcionado'}%0D%0AEspecialidad: ${formData.especialidad || 'No especificada'}%0D%0A%0D%0AMensaje:%0D%0A${formData.mensaje}`
    window.location.href = `mailto:info@abogadosdelecuador.com?subject=${encodeURIComponent(subject)}&body=${body}`
    
    setEnviado(true)
    setTimeout(() => {
      setEnviado(false)
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        especialidad: '',
        mensaje: '',
      })
    }, 3000)
  }

  return (
    <div id="contacto" className="py-24 bg-[#0f1419]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Contacto
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            ¿Tienes preguntas sobre nuestro directorio? Escríbenos y te responderemos a la brevedad.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-[#1a1f2e] border-[#c9a227]/20">
            <CardContent className="p-8">
              {enviado ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-[#c9a227]/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-[#c9a227]" />
                  </div>
                  <h3 className="text-white text-xl font-semibold mb-2">¡Mensaje Enviado!</h3>
                  <p className="text-gray-400">
                    Te responderemos lo antes posible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="nombre" className="text-gray-300">
                        Nombre completo
                      </Label>
                      <Input
                        id="nombre"
                        placeholder="Tu nombre"
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        className="bg-[#0f1419] border-[#c9a227]/30 text-white placeholder:text-gray-500 focus:border-[#c9a227]"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-300">
                        Correo electrónico
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-[#0f1419] border-[#c9a227]/30 text-white placeholder:text-gray-500 focus:border-[#c9a227]"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="telefono" className="text-gray-300">
                        Teléfono
                      </Label>
                      <Input
                        id="telefono"
                        type="tel"
                        placeholder="+593 9XXXXXXXX"
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                        className="bg-[#0f1419] border-[#c9a227]/30 text-white placeholder:text-gray-500 focus:border-[#c9a227]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="especialidad" className="text-gray-300">
                        Especialidad de interés
                      </Label>
                      <Select
                        value={formData.especialidad}
                        onValueChange={(value) => setFormData({ ...formData, especialidad: value })}
                      >
                        <SelectTrigger className="bg-[#0f1419] border-[#c9a227]/30 text-white focus:border-[#c9a227]">
                          <SelectValue placeholder="Selecciona una especialidad" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1a1f2e] border-[#c9a227]/30">
                          {especialidades.map((esp) => (
                            <SelectItem
                              key={esp}
                              value={esp}
                              className="text-white hover:bg-[#c9a227]/10 focus:bg-[#c9a227]/10"
                            >
                              {esp}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mensaje" className="text-gray-300">
                      Mensaje
                    </Label>
                    <Textarea
                      id="mensaje"
                      placeholder="Escribe tu mensaje..."
                      value={formData.mensaje}
                      onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                      className="bg-[#0f1419] border-[#c9a227]/30 text-white placeholder:text-gray-500 focus:border-[#c9a227] min-h-[120px]"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-[#c9a227] to-[#8b7355] text-[#0f1419] font-semibold hover:opacity-90 transition-opacity"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Mensaje
                  </Button>

                  <p className="text-gray-500 text-xs text-center">
                    Al enviar, aceptas nuestra política de privacidad. 
                    Este formulario es solo para consultas sobre el directorio.
                  </p>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-white text-2xl font-serif font-semibold mb-6">
                Información de Contacto
              </h3>
              <p className="text-gray-400 mb-8">
                Contáctanos para consultas sobre el directorio o si deseas formar parte de nuestra red de profesionales.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#c9a227]/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#c9a227]" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Correo electrónico</h4>
                  <a 
                    href="mailto:info@abogadosdelecuador.com" 
                    className="text-[#c9a227] hover:text-[#e8d5a3] transition-colors"
                  >
                    info@abogadosdelecuador.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#c9a227]/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#c9a227]" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Horario de atención</h4>
                  <p className="text-gray-400">
                    Lunes a Viernes: 8:00 - 18:00
                  </p>
                </div>
              </div>
            </div>

            {/* Botón para ser parte del directorio */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a 
                    href="mailto:directorio@abogadosdelecuador.com?subject=Solicitud para formar parte del directorio"
                    className="block w-full"
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full border-[#c9a227]/50 text-[#c9a227] hover:bg-[#c9a227] hover:text-[#0f1419] py-6 px-4 h-auto whitespace-normal text-center"
                    >
                      <UserPlus className="w-5 h-5 mr-2 flex-shrink-0" />
                      <span className="leading-tight">Quiero más información de cómo ser parte del directorio</span>
                      <Info className="w-4 h-4 ml-2 opacity-70 flex-shrink-0" />
                    </Button>
                  </a>
                </TooltipTrigger>
                <TooltipContent 
                  side="bottom" 
                  className="bg-[#1a1f2e] border-[#c9a227]/30 text-white max-w-xs p-4"
                >
                  <p className="text-sm">
                    Si eres abogado o estudio jurídico y deseas aparecer en nuestro directorio, 
                    haz clic aquí para solicitar información sobre los requisitos y el proceso de inscripción. 
                    Verificamos tu inclusión en el CENECI y Consejo de la Judicatura.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Disclaimer */}
            <div className="bg-[#1a1f2e] border border-[#c9a227]/20 rounded-lg p-6">
              <p className="text-gray-500 text-sm">
                * Este es un directorio informativo. No prestamos servicios legales 
                ni garantizamos los servicios de los profesionales listados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
