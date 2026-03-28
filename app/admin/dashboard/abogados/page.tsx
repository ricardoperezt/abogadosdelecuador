'use client'

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { ArrowLeft, Pencil, Plus, Trash2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useEffect, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { getEspecialidades } from '@/lib/abogados-optimized'
import { supabaseServer } from '@/lib/supabase-server'
import { useRouter } from 'next/navigation'

interface Abogado {
  id: string
  nombre: string
  edad: number
  grado: string
  firma: string
  ubicacion: string
  telefono: string
  email: string
  especialidades: Array<{ id: string, nombre: string }>
  subespecialidades: Array<{ id: string, nombre: string }>
  posgrados: Array<{ id: string, nombre: string }>
}

interface Especialidad {
  id: string
  nombre: string
}

export default function AbogadosManagement() {
  const [abogados, setAbogados] = useState<Abogado[]>([])
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([])
  const [subespecialidades, setSubespecialidades] = useState<Especialidad[]>([])
  const [posgrados, setPosgrados] = useState<Especialidad[]>([])
  const [loading, setLoading] = useState(true)
  const [editingAbogado, setEditingAbogado] = useState<Abogado | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const router = useRouter()

  const [formData, setFormData] = useState({
    nombre: '',
    edad: '',
    grado: '',
    firma: '',
    ubicacion: '',
    telefono: '',
    email: '',
    especialidades: [] as string[],
    subespecialidades: [] as string[],
    posgrados: [] as string[]
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      // Get all data with relationships
      const { data: abogadosRes, error: complexError } = await supabaseServer
        .from('abogados')
        .select(`
          *,
          abogados_especialidades (
            especialidades (id, nombre, color)
          ),
          abogados_subespecialidades (
            subespecialidades (id, nombre)
          ),
          abogados_posgrados (
            posgrados (id, nombre)
          )
        `)
        .order('nombre')

      if (complexError) {
        console.error('Error loading abogados:', complexError)
        return
      }

      // Also get the individual tables for dropdowns
      const [especialidadesRes, subespecialidadesRes, posgradosRes] = await Promise.all([
        supabaseServer.from('especialidades').select('*').order('nombre'),
        supabaseServer.from('subespecialidades').select('*').order('nombre'),
        supabaseServer.from('posgrados').select('*').order('nombre')
      ])

      if (abogadosRes) {
        const transformedAbogados = abogadosRes.map((abogado: any) => {
          const especialidades = abogado.abogados_especialidades?.map((ae: any) => ae.especialidades).filter(Boolean) || []
          const subespecialidades = abogado.abogados_subespecialidades?.map((as: any) => as.subespecialidades).filter(Boolean) || []
          const posgrados = abogado.abogados_posgrados?.map((ap: any) => ap.posgrados).filter(Boolean) || []
          
          return {
            ...abogado,
            especialidades,
            subespecialidades,
            posgrados
          }
        })
        setAbogados(transformedAbogados)
      }

      if (especialidadesRes.data) setEspecialidades(especialidadesRes.data)
      if (subespecialidadesRes.data) setSubespecialidades(subespecialidadesRes.data)
      if (posgradosRes.data) setPosgrados(posgradosRes.data)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      nombre: '',
      edad: '',
      grado: '',
      firma: '',
      ubicacion: '',
      telefono: '',
      email: '',
      especialidades: [],
      subespecialidades: [],
      posgrados: []
    })
    setEditingAbogado(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const abogadoData = {
        nombre: formData.nombre,
        edad: parseInt(formData.edad),
        grado: formData.grado,
        firma: formData.firma,
        ubicacion: formData.ubicacion,
        telefono: formData.telefono,
        email: formData.email
      }

      let abogadoId: string

      if (editingAbogado) {
        const { data, error } = await supabaseServer
          .from('abogados')
          .update(abogadoData)
          .eq('id', editingAbogado.id)
          .select()
          .single()

        if (error) throw error
        abogadoId = editingAbogado.id

        // Delete existing relationships
        await Promise.all([
          supabaseServer.from('abogados_especialidades').delete().eq('abogado_id', abogadoId),
          supabaseServer.from('abogados_subespecialidades').delete().eq('abogado_id', abogadoId),
          supabaseServer.from('abogados_posgrados').delete().eq('abogado_id', abogadoId)
        ])
      } else {
        const { data, error } = await supabaseServer
          .from('abogados')
          .insert(abogadoData)
          .select()
          .single()

        if (error) throw error
        abogadoId = data.id
      }

      // Insert new relationships
      const relationships = [
        ...formData.especialidades.map(espId => ({ abogado_id: abogadoId, especialidad_id: espId })),
        ...formData.subespecialidades.map(subId => ({ abogado_id: abogadoId, subespecialidad_id: subId })),
        ...formData.posgrados.map(posId => ({ abogado_id: abogadoId, posgrado_id: posId }))
      ]

      if (relationships.length > 0) {
        const especialidadRelations = formData.especialidades.map(espId => ({ abogado_id: abogadoId, especialidad_id: espId }))
        const subespecialidadRelations = formData.subespecialidades.map(subId => ({ abogado_id: abogadoId, subespecialidad_id: subId }))
        const posgradoRelations = formData.posgrados.map(posId => ({ abogado_id: abogadoId, posgrado_id: posId }))

        await Promise.all([
          especialidadRelations.length > 0 && supabaseServer.from('abogados_especialidades').insert(especialidadRelations),
          subespecialidadRelations.length > 0 && supabaseServer.from('abogados_subespecialidades').insert(subespecialidadRelations),
          posgradoRelations.length > 0 && supabaseServer.from('abogados_posgrados').insert(posgradoRelations)
        ])
      }

      setIsDialogOpen(false)
      resetForm()
      loadData()
    } catch (error) {
      console.error('Error saving abogado:', error)
    }
  }

  const handleEdit = (abogado: Abogado) => {
    setEditingAbogado(abogado)
    setFormData({
      nombre: abogado.nombre,
      edad: abogado.edad.toString(),
      grado: abogado.grado,
      firma: abogado.firma,
      ubicacion: abogado.ubicacion,
      telefono: abogado.telefono,
      email: abogado.email,
      especialidades: abogado.especialidades.map(e => e.id),
      subespecialidades: abogado.subespecialidades.map(s => s.id),
      posgrados: abogado.posgrados.map(p => p.id)
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      await Promise.all([
        supabaseServer.from('abogados_especialidades').delete().eq('abogado_id', id),
        supabaseServer.from('abogados_subespecialidades').delete().eq('abogado_id', id),
        supabaseServer.from('abogados_posgrados').delete().eq('abogado_id', id),
        supabaseServer.from('abogados').delete().eq('id', id)
      ])
      loadData()
    } catch (error) {
      console.error('Error deleting abogado:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1419] flex items-center justify-center">
        <div className="text-foreground">Cargando abogados...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0f1419] p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-8">
        <div className="flex flex-col gap-4">
          <Button 
            onClick={() => router.push('/admin/dashboard')}
            variant="outline"
            className="border-[#c9a227]/50 text-[#c9a227] hover:bg-[#c9a227] hover:text-[#0f1419] w-fit"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Gestión de Abogados</h1>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={resetForm}
              className="bg-[#c9a227] text-[#0f1419] hover:bg-[#e8d5a3] w-full sm:w-fit"
            >
              <Plus className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Nuevo Abogado</span>
              <span className="sm:hidden">Nuevo</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#1a1f2e] border-[#c9a227]/20 w-[95vw] sm:w-[90vw] md:w-[85vw] lg:w-[80vw] xl:!max-w-6xl max-h-[90vh] overflow-y-auto p-4 sm:p-6 rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-[#c9a227] text-xl sm:text-2xl font-serif">
                {editingAbogado ? 'Editar Abogado' : 'Nuevo Abogado'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Sección: Información Personal */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#c9a227] border-b border-[#c9a227]/30 pb-2">
                  Información Personal
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nombre" className="text-foreground mb-2 block text-sm font-medium">Nombre</Label>
                    <Input
                      id="nombre"
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      className="bg-[#0f1419] border-[#c9a227]/60 text-white focus:border-[#c9a227] transition-colors h-12"
                      placeholder="Nombre completo"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="edad" className="text-foreground mb-2 block text-sm font-medium">Edad</Label>
                    <Input
                      id="edad"
                      type="number"
                      value={formData.edad}
                      onChange={(e) => setFormData({ ...formData, edad: e.target.value })}
                      className="bg-[#0f1419] border-[#c9a227]/60 text-white focus:border-[#c9a227] transition-colors h-12"
                      placeholder="Ej: 35"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="grado" className="text-foreground mb-2 block text-sm font-medium">Grado</Label>
                    <Input
                      id="grado"
                      value={formData.grado}
                      onChange={(e) => setFormData({ ...formData, grado: e.target.value })}
                      className="bg-[#0f1419] border-[#c9a227]/60 text-white focus:border-[#c9a227] transition-colors h-12"
                      placeholder="Ej: Abogado de los Juzgados"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="firma" className="text-foreground mb-2 block text-sm font-medium">Firma</Label>
                    <Input
                      id="firma"
                      value={formData.firma}
                      onChange={(e) => setFormData({ ...formData, firma: e.target.value })}
                      className="bg-[#0f1419] border-[#c9a227]/60 text-white focus:border-[#c9a227] transition-colors h-12"
                      placeholder="Nombre de la firma"
                    />
                  </div>
                </div>
              </div>

              {/* Sección: Contacto y Ubicación */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#c9a227] border-b border-[#c9a227]/30 pb-2">
                  Contacto y Ubicación
                </h3>
                <div>
                  <Label htmlFor="ubicacion" className="text-foreground mb-2 block text-sm font-medium">Ubicación</Label>
                  <Input
                    id="ubicacion"
                    value={formData.ubicacion}
                    onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value })}
                    className="bg-[#0f1419] border-[#c9a227]/60 text-white focus:border-[#c9a227] transition-colors h-12"
                    placeholder="Ciudad, Provincia"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="telefono" className="text-foreground mb-2 block text-sm font-medium">Teléfono</Label>
                    <Input
                      id="telefono"
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      className="bg-[#0f1419] border-[#c9a227]/60 text-white focus:border-[#c9a227] transition-colors h-12"
                      placeholder="+593 2 123 4567"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-foreground mb-2 block text-sm font-medium">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-[#0f1419] border-[#c9a227]/60 text-white focus:border-[#c9a227] transition-colors h-12"
                      placeholder="email@ejemplo.com"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Sección: Áreas de Especialización */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#c9a227] border-b border-[#c9a227]/30 pb-2">
                  Áreas de Especialización
                </h3>
                
                <div className="grid grid-cols-1 gap-8">
                  <div>
                    <Label className="text-foreground mb-4 block text-sm font-medium">Especialidades</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 h-full bg-[#0f1419] p-4 sm:p-5 rounded-lg border border-[#c9a227]/60 overflow-y-auto">
                      {especialidades.map((esp) => (
                        <div key={esp.id} className="flex items-center space-x-3">
                          <Checkbox
                            id={`esp-${esp.id}`}
                            checked={formData.especialidades.includes(esp.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFormData({ ...formData, especialidades: [...formData.especialidades, esp.id] })
                              } else {
                                setFormData({ ...formData, especialidades: formData.especialidades.filter(id => id !== esp.id) })
                              }
                            }}
                          />
                          <Label htmlFor={`esp-${esp.id}`} className="text-sm text-foreground cursor-pointer leading-relaxed capitalize">{esp.nombre}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-foreground mb-4 block text-sm font-medium">Subespecialidades</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-2 h-full bg-[#0f1419] p-4 sm:p-5 rounded-lg border border-[#c9a227]/60 overflow-y-auto">
                      {subespecialidades.map((sub) => (
                        <div key={sub.id} className="flex items-center space-x-3">
                          <Checkbox
                            id={`sub-${sub.id}`}
                            checked={formData.subespecialidades.includes(sub.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFormData({ ...formData, subespecialidades: [...formData.subespecialidades, sub.id] })
                              } else {
                                setFormData({ ...formData, subespecialidades: formData.subespecialidades.filter(id => id !== sub.id) })
                              }
                            }}
                          />
                          <Label htmlFor={`sub-${sub.id}`} className="text-sm text-foreground cursor-pointer leading-relaxed capitalize">{sub.nombre}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-foreground mb-4 block text-sm font-medium">Posgrados</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-2 h-full bg-[#0f1419] p-4 sm:p-5 rounded-lg border border-[#c9a227]/60 overflow-y-auto">
                      {posgrados.map((pos) => (
                        <div key={pos.id} className="flex items-center space-x-3">
                          <Checkbox
                            id={`pos-${pos.id}`}
                            checked={formData.posgrados.includes(pos.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFormData({ ...formData, posgrados: [...formData.posgrados, pos.id] })
                              } else {
                                setFormData({ ...formData, posgrados: formData.posgrados.filter(id => id !== pos.id) })
                              }
                            }}
                          />
                          <Label htmlFor={`pos-${pos.id}`} className="text-sm text-foreground cursor-pointer leading-relaxed capitalize">{pos.nombre}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="border-[#c9a227]/50 text-[#c9a227] hover:bg-[#c9a227] hover:text-[#0f1419] h-12 order-2 sm:order-1"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-[#c9a227] text-[#0f1419] hover:bg-[#e8d5a3] h-12 font-semibold order-1 sm:order-2"
                >
                  {editingAbogado ? 'Actualizar' : 'Crear'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <Card className="bg-[#1a1f2e] border-[#c9a227]/20 py-6">
        <CardHeader>
          <CardTitle className="text-[#c9a227]">Lista de Abogados</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Grid Card View - All Screen Sizes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {abogados.map((abogado) => (
              <Card key={abogado.id} className="bg-[#0f1419] border border-[#c9a227]/30 hover:border-[#c9a227]/50 transition-colors flex flex-col">
                <CardContent className="p-4 flex-1 flex flex-col">
                  {/* Header */}
                  <div className="mb-3">
                    <h4 className="text-white font-semibold text-sm sm:text-base truncate">{abogado.nombre}</h4>
                    <p className="text-gray-400 text-xs sm:text-sm mt-1 truncate">
                      {abogado.edad} años
                    </p>
                    <p className="text-gray-400 text-xs sm:text-sm truncate">
                      {abogado.grado}
                    </p>
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-2 text-xs sm:text-sm flex-1">
                    {/* Firma */}
                    {abogado.firma && (
                      <div>
                        <p className="text-gray-500 text-xs mb-1">Firma</p>
                        <p className="text-white truncate">{abogado.firma}</p>
                      </div>
                    )}
                    
                    {/* Ubicación */}
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Ubicación</p>
                      <p className="text-white truncate">{abogado.ubicacion}</p>
                    </div>
                    
                    {/* Contacto */}
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Contacto</p>
                      <p className="text-white truncate">{abogado.telefono}</p>
                      <p className="text-[#c9a227] truncate">{abogado.email}</p>
                    </div>
                    
                    {/* Especialidades */}
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Especialidades</p>
                      <div className="flex flex-wrap gap-1">
                        {abogado.especialidades.length > 0 ? (
                          abogado.especialidades.slice(0, 2).map((esp) => (
                            <Badge key={esp.id} variant="secondary" className="bg-[#c9a227]/20 text-[#c9a227] text-xs px-1 py-0">
                              {esp.nombre}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-gray-500 text-xs">Sin especialidades</span>
                        )}
                        {abogado.especialidades.length > 2 && (
                          <span className="text-gray-400 text-xs">+{abogado.especialidades.length - 2}</span>
                        )}
                      </div>
                    </div>
                    
                    {/* Subespecialidades */}
                    {abogado.subespecialidades.length > 0 && (
                      <div>
                        <p className="text-gray-500 text-xs mb-1">Subespecialidades</p>
                        <div className="flex flex-wrap gap-1">
                          {abogado.subespecialidades.slice(0, 2).map((sub) => (
                            <Badge key={sub.id} variant="secondary" className="bg-blue-500/20 text-blue-400 text-xs px-1 py-0">
                              {sub.nombre}
                            </Badge>
                          ))}
                          {abogado.subespecialidades.length > 2 && (
                            <span className="text-gray-400 text-xs">+{abogado.subespecialidades.length - 2}</span>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Posgrados */}
                    {abogado.posgrados.length > 0 && (
                      <div>
                        <p className="text-gray-500 text-xs mb-1">Posgrados</p>
                        <div className="flex flex-wrap gap-1">
                          {abogado.posgrados.slice(0, 1).map((pos) => (
                            <Badge key={pos.id} variant="secondary" className="bg-green-500/20 text-green-400 text-xs px-1 py-0">
                              {pos.nombre}
                            </Badge>
                          ))}
                          {abogado.posgrados.length > 1 && (
                            <span className="text-gray-400 text-xs">+{abogado.posgrados.length - 1}</span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Footer - Action Buttons */}
                  <div className="flex space-x-2 mt-4 pt-3 border-t border-[#c9a227]/20">
                    <Button
                      onClick={() => handleEdit(abogado)}
                      variant="outline"
                      size="sm"
                      className="flex-1 border-[#c9a227]/50 text-[#c9a227] hover:bg-[#c9a227] hover:text-[#0f1419] h-8"
                    >
                      <Pencil className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      <span className="text-xs sm:text-sm">Editar</span>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 border-red-500/50 text-red-500 hover:bg-red-500 hover:text-[#0f1419] h-8"
                        >
                          <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                          <span className="text-xs sm:text-sm">Eliminar</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-[#1a1f2e] border-[#c9a227]/20">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-foreground">¿Eliminar Abogado?</AlertDialogTitle>
                          <AlertDialogDescription className="text-gray-400">
                            Esta acción eliminará permanentemente al abogado y todas sus relaciones. No se puede deshacer.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="border-[#c9a227]/50 text-[#c9a227] hover:bg-[#c9a227] hover:text-[#0f1419]">
                            Cancelar
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(abogado.id)}
                            className="bg-red-500 text-white hover:bg-red-600"
                          >
                            Eliminar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Empty State */}
          {abogados.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">No hay abogados registrados</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
