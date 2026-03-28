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

interface Especialidad {
  id: string
  nombre: string
}

export default function EspecialidadesManagement() {
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([])
  const [loading, setLoading] = useState(true)
  const [editingEspecialidad, setEditingEspecialidad] = useState<Especialidad | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({ nombre: '' })
  const router = useRouter()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const { data, error } = await supabaseServer
        .from('especialidades')
        .select('*')
        .order('nombre')

      if (error) throw error
      setEspecialidades(data || [])
    } catch (error) {
      console.error('Error loading especialidades:', error)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({ nombre: '' })
    setEditingEspecialidad(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingEspecialidad) {
        const { error } = await supabaseServer
          .from('especialidades')
          .update({ nombre: formData.nombre })
          .eq('id', editingEspecialidad.id)

        if (error) throw error
      } else {
        const { error } = await supabaseServer
          .from('especialidades')
          .insert({ nombre: formData.nombre })

        if (error) throw error
      }

      setIsDialogOpen(false)
      resetForm()
      loadData()
    } catch (error) {
      console.error('Error saving especialidad:', error)
    }
  }

  const handleEdit = (especialidad: Especialidad) => {
    setEditingEspecialidad(especialidad)
    setFormData({ nombre: especialidad.nombre })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      // Check if there are any lawyers using this specialty
      const { data: abogadosEspecialidades, error: checkError } = await supabaseServer
        .from('abogados_especialidades')
        .select('*')
        .eq('especialidad_id', id)
        .limit(1)

      if (checkError) throw checkError

      if (abogadosEspecialidades && abogadosEspecialidades.length > 0) {
        alert('No se puede eliminar esta especialidad porque está siendo utilizada por abogados.')
        return
      }

      const { error } = await supabaseServer
        .from('especialidades')
        .delete()
        .eq('id', id)

      if (error) throw error
      loadData()
    } catch (error) {
      console.error('Error deleting especialidad:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1419] flex items-center justify-center">
        <div className="text-foreground">Cargando especialidades...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0f1419] p-4 sm:p-6">
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
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Gestión de Especialidades</h1>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={resetForm}
              className="bg-[#c9a227] text-[#0f1419] hover:bg-[#e8d5a3] w-full sm:w-fit"
            >
              <Plus className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Nueva Especialidad</span>
              <span className="sm:hidden">Nueva</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#1a1f2e] border-[#c9a227]/20 w-[95vw] sm:w-auto max-w-md mx-4">
            <DialogHeader>
              <DialogTitle className="text-[#c9a227] text-lg sm:text-xl">
                {editingEspecialidad ? 'Editar Especialidad' : 'Nueva Especialidad'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="nombre" className="text-foreground text-sm sm:text-base">Nombre</Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ nombre: e.target.value })}
                  className="bg-[#0f1419] border-[#c9a227]/20 mt-2 h-12 sm:h-auto"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 pt-4 gap-2 sm:gap-0">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="border-[#c9a227]/50 text-[#c9a227] hover:bg-[#c9a227] hover:text-[#0f1419] w-full sm:w-auto order-2 sm:order-1"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-[#c9a227] text-[#0f1419] hover:bg-[#e8d5a3] w-full sm:w-auto order-1 sm:order-2"
                >
                  {editingEspecialidad ? 'Actualizar' : 'Crear'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <Card className="bg-[#1a1f2e] border-[#c9a227]/20 py-6">
        <CardHeader>
          <CardTitle className="text-[#c9a227]">Lista de Especialidades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-[#c9a227]/20">
                  <TableHead className="text-foreground">Nombre</TableHead>
                  <TableHead className="text-foreground">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {especialidades.map((especialidad) => (
                  <TableRow key={especialidad.id} className="border-[#c9a227]/20">
                    <TableCell className="text-foreground font-medium">{especialidad.nombre}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => handleEdit(especialidad)}
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
                              <AlertDialogTitle className="text-foreground">¿Eliminar Especialidad?</AlertDialogTitle>
                              <AlertDialogDescription className="text-gray-400">
                                Esta acción eliminará permanentemente la especialidad. No se puede deshacer.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="border-[#c9a227]/50 text-[#c9a227] hover:bg-[#c9a227] hover:text-[#0f1419]">
                                Cancelar
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(especialidad.id)}
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
        </CardContent>
      </Card>
    </div>
  )
}
