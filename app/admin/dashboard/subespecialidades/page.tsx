'use client'

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { ArrowLeft, Pencil, Plus, Trash2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { supabaseServer } from '@/lib/supabase-server'
import { useRouter } from 'next/navigation'

interface Subespecialidad {
  id: string
  nombre: string
  especialidad_id: string
  especialidades?: {
    id: string
    nombre: string
  }
}

interface Especialidad {
  id: string
  nombre: string
}

export default function SubespecialidadesManagement() {
  const [subespecialidades, setSubespecialidades] = useState<Subespecialidad[]>([])
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([])
  const [loading, setLoading] = useState(true)
  const [editingSubespecialidad, setEditingSubespecialidad] = useState<Subespecialidad | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({ nombre: '', especialidad_id: '' })
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      // Get subespecialidades with their especialidades
      const { data: subespecialidadesData, error: subError } = await supabaseServer
        .from('subespecialidades')
        .select(`
          *,
          especialidades (id, nombre)
        `)
        .order('especialidades(nombre), nombre')

      if (subError) throw subError
      
      // Get especialidades for dropdown
      const { data: especialidadesData, error: espError } = await supabaseServer
        .from('especialidades')
        .select('*')
        .order('nombre')

      if (espError) throw espError

      setSubespecialidades(subespecialidadesData || [])
      setEspecialidades(especialidadesData || [])
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({ nombre: '', especialidad_id: '' })
    setEditingSubespecialidad(null)
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    if (!formData.especialidad_id) {
      setError('Por favor, seleccione una especialidad.')
      return
    }
    
    try {
      if (editingSubespecialidad) {
        const { error } = await supabaseServer
          .from('subespecialidades')
          .update({ nombre: formData.nombre, especialidad_id: formData.especialidad_id })
          .eq('id', editingSubespecialidad.id)

        if (error) throw error
      } else {
        const { error } = await supabaseServer
          .from('subespecialidades')
          .insert({ nombre: formData.nombre, especialidad_id: formData.especialidad_id })

        if (error) throw error
      }

      setIsDialogOpen(false)
      resetForm()
      loadData()
    } catch (error: any) {
      console.error('Error saving subespecialidad:', error)
      
      // Manejar error de duplicado específicamente
      if (error.code === '23505' && error.message.includes('subespecialidades_nombre_key')) {
        setError('Esta subespecialidad ya existe. Por favor, ingrese un nombre diferente.')
      } else {
        setError('Error al guardar la subespecialidad. Por favor, inténtelo de nuevo.')
      }
    }
  }

  // Group subespecialidades by especialidad
  const groupedSubespecialidades = subespecialidades.reduce((acc, sub) => {
    const especialidadName = sub.especialidades?.nombre || 'Sin especialidad'
    if (!acc[especialidadName]) {
      acc[especialidadName] = []
    }
    acc[especialidadName].push(sub)
    return acc
  }, {} as Record<string, Subespecialidad[]>)

  const handleEdit = (subespecialidad: Subespecialidad) => {
    setEditingSubespecialidad(subespecialidad)
    setFormData({ 
      nombre: subespecialidad.nombre, 
      especialidad_id: subespecialidad.especialidad_id 
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      // Check if there are any lawyers using this subespecialidad
      const { data: abogadosSubespecialidades, error: checkError } = await supabaseServer
        .from('abogados_subespecialidades')
        .select('*')
        .eq('subespecialidad_id', id)
        .limit(1)

      if (checkError) throw checkError

      if (abogadosSubespecialidades && abogadosSubespecialidades.length > 0) {
        alert('No se puede eliminar esta subespecialidad porque está siendo utilizada por abogados.')
        return
      }

      const { error } = await supabaseServer
        .from('subespecialidades')
        .delete()
        .eq('id', id)

      if (error) throw error
      loadData()
    } catch (error) {
      console.error('Error deleting subespecialidad:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1419] flex items-center justify-center">
        <div className="text-foreground">Cargando subespecialidades...</div>
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
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Gestión de Subespecialidades</h1>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={resetForm}
              className="bg-[#c9a227] text-[#0f1419] hover:bg-[#e8d5a3] w-full sm:w-fit"
            >
              <Plus className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Nueva Subespecialidad</span>
              <span className="sm:hidden">Nueva</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#1a1f2e] border-[#c9a227]/20 w-[95vw] sm:w-auto max-w-md">
            <DialogHeader>
              <DialogTitle className="text-[#c9a227] text-xl sm:text-2xl font-serif">
                {editingSubespecialidad ? 'Editar Subespecialidad' : 'Nueva Subespecialidad'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="especialidad" className="text-foreground text-sm font-medium mb-2 block">Especialidad</Label>
                <select
                  id="especialidad"
                  value={formData.especialidad_id || ''}
                  onChange={(e) => {
                    setFormData({ ...formData, especialidad_id: e.target.value })
                    setError(null)
                  }}
                  className={`w-full bg-[#0f1419] border-[#c9a227]/20 focus:border-[#c9a227] transition-colors h-12 px-3 rounded-md text-white ${
                    error ? 'border-red-500 focus:border-red-500' : ''
                  }`}
                  required
                >
                  <option value="">Seleccione una especialidad</option>
                  {especialidades.map((esp) => (
                    <option key={esp.id} value={esp.id}>
                      {esp.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="nombre" className="text-foreground text-sm font-medium mb-2 block">Nombre</Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => {
                    setFormData({ ...formData, nombre: e.target.value })
                    setError(null) // Limpiar error al escribir
                  }}
                  className={`bg-[#0f1419] border-[#c9a227]/20 focus:border-[#c9a227] transition-colors h-12 ${
                    error ? 'border-red-500 focus:border-red-500' : ''
                  }`}
                  placeholder="Ej: Derecho Corporativo"
                  required
                />
                {error && (
                  <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {error}
                  </p>
                )}
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
                  {editingSubespecialidad ? 'Actualizar' : 'Crear'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <Card className="bg-[#1a1f2e] border-[#c9a227]/20 py-6">
        <CardHeader>
          <CardTitle className="text-[#c9a227]">Lista de Subespecialidades</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Mobile Grouped Card View */}
          <div className="md:hidden space-y-6">
            {Object.entries(groupedSubespecialidades).map(([especialidadName, subs]) => (
              <div key={especialidadName} className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-4 bg-[#c9a227] rounded-full"></div>
                  <h3 className="text-[#c9a227] font-semibold text-sm uppercase tracking-wide">
                    {especialidadName}
                  </h3>
                  <span className="text-gray-500 text-xs">({subs.length})</span>
                </div>
                
                <div className="space-y-2 pl-3">
                  {subs.map((subespecialidad) => (
                    <Card key={subespecialidad.id} className="bg-[#0f1419] border border-[#c9a227]/20">
                      <CardContent className="p-3">
                        <div className="flex justify-between items-center">
                          <h4 className="text-white font-medium text-sm">{subespecialidad.nombre}</h4>
                          <div className="flex space-x-2">
                            <Button
                              onClick={() => handleEdit(subespecialidad)}
                              variant="outline"
                              size="sm"
                              className="border-[#c9a227]/50 text-[#c9a227] hover:bg-[#c9a227] hover:text-[#0f1419] h-8 w-8 p-0"
                            >
                              <Pencil className="w-3 h-3" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-red-500/50 text-red-500 hover:bg-red-500 hover:text-[#0f1419] h-8 w-8 p-0"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent className="bg-[#1a1f2e] border-[#c9a227]/20">
                                <AlertDialogHeader>
                                  <AlertDialogTitle className="text-foreground">¿Eliminar Subespecialidad?</AlertDialogTitle>
                                  <AlertDialogDescription className="text-gray-400">
                                    Esta acción eliminará permanentemente la subespecialidad. No se puede deshacer.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel className="border-[#c9a227]/50 text-[#c9a227] hover:bg-[#c9a227] hover:text-[#0f1419]">
                                    Cancelar
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(subespecialidad.id)}
                                    className="bg-red-500 text-white hover:bg-red-600"
                                  >
                                    Eliminar
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Grouped Table View */}
          <div className="hidden md:block space-y-6">
            {Object.entries(groupedSubespecialidades).map(([especialidadName, subs]) => (
              <div key={especialidadName} className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-5 bg-[#c9a227] rounded-full"></div>
                  <h3 className="text-[#c9a227] font-semibold text-lg">{especialidadName}</h3>
                  <span className="text-gray-500 text-sm">({subs.length} subespecialidades)</span>
                </div>
                
                <div className="bg-[#0f1419] rounded-lg border border-[#c9a227]/20 overflow-hidden">
                  <Table>
                    <TableBody>
                      {subs.map((subespecialidad) => (
                        <TableRow key={subespecialidad.id} className="border-[#c9a227]/20">
                          <TableCell className="text-foreground font-medium pl-6">{subespecialidad.nombre}</TableCell>
                          <TableCell className="pr-6">
                            <div className="flex justify-end space-x-2">
                              <Button
                                onClick={() => handleEdit(subespecialidad)}
                                variant="outline"
                                size="sm"
                                className="border-[#c9a227]/50 text-[#c9a227] hover:bg-[#c9a227] hover:text-[#0f1419]"
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-red-500/50 text-red-500 hover:bg-red-500 hover:text-[#0f1419]"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="bg-[#1a1f2e] border-[#c9a227]/20">
                                  <AlertDialogHeader>
                                    <AlertDialogTitle className="text-foreground">¿Eliminar Subespecialidad?</AlertDialogTitle>
                                    <AlertDialogDescription className="text-gray-400">
                                      Esta acción eliminará permanentemente la subespecialidad. No se puede deshacer.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel className="border-[#c9a227]/50 text-[#c9a227] hover:bg-[#c9a227] hover:text-[#0f1419]">
                                      Cancelar
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDelete(subespecialidad.id)}
                                      className="bg-red-500 text-white hover:bg-red-600"
                                    >
                                      Eliminar
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
