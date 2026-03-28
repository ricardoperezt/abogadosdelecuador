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

interface Posgrado {
  id: string
  nombre: string
}

export default function PosgradosManagement() {
  const [posgrados, setPosgrados] = useState<Posgrado[]>([])
  const [loading, setLoading] = useState(true)
  const [editingPosgrado, setEditingPosgrado] = useState<Posgrado | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({ nombre: '' })
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const { data, error } = await supabaseServer
        .from('posgrados')
        .select('*')
        .order('nombre')

      if (error) throw error
      setPosgrados(data || [])
    } catch (error) {
      console.error('Error loading posgrados:', error)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({ nombre: '' })
    setEditingPosgrado(null)
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    try {
      if (editingPosgrado) {
        const { error } = await supabaseServer
          .from('posgrados')
          .update({ nombre: formData.nombre })
          .eq('id', editingPosgrado.id)

        if (error) throw error
      } else {
        const { error } = await supabaseServer
          .from('posgrados')
          .insert({ nombre: formData.nombre })

        if (error) throw error
      }

      setIsDialogOpen(false)
      resetForm()
      loadData()
    } catch (error: any) {
      console.error('Error saving posgrado:', error)
      
      // Manejar error de duplicado específicamente
      if (error.code === '23505' && error.message.includes('posgrados_nombre_key')) {
        setError('Este posgrado ya existe. Por favor, ingrese un nombre diferente.')
      } else {
        setError('Error al guardar el posgrado. Por favor, inténtelo de nuevo.')
      }
    }
  }

  const handleEdit = (posgrado: Posgrado) => {
    setEditingPosgrado(posgrado)
    setFormData({ nombre: posgrado.nombre })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      // Check if there are any lawyers using this posgrado
      const { data: abogadosPosgrados, error: checkError } = await supabaseServer
        .from('abogados_posgrados')
        .select('*')
        .eq('posgrado_id', id)
        .limit(1)

      if (checkError) throw checkError

      if (abogadosPosgrados && abogadosPosgrados.length > 0) {
        alert('No se puede eliminar este posgrado porque está siendo utilizado por abogados.')
        return
      }

      const { error } = await supabaseServer
        .from('posgrados')
        .delete()
        .eq('id', id)

      if (error) throw error
      loadData()
    } catch (error) {
      console.error('Error deleting posgrado:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1419] flex items-center justify-center">
        <div className="text-foreground">Cargando posgrados...</div>
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
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Gestión de Posgrados</h1>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={resetForm}
              className="bg-[#c9a227] text-[#0f1419] hover:bg-[#e8d5a3] w-full sm:w-fit"
            >
              <Plus className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Nuevo Posgrado</span>
              <span className="sm:hidden">Nuevo</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#1a1f2e] border-[#c9a227]/20 w-[95vw] sm:w-auto max-w-md">
            <DialogHeader>
              <DialogTitle className="text-[#c9a227] text-xl sm:text-2xl font-serif">
                {editingPosgrado ? 'Editar Posgrado' : 'Nuevo Posgrado'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="nombre" className="text-foreground text-sm font-medium mb-2 block">Nombre</Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => {
                    setFormData({ nombre: e.target.value })
                    setError(null) // Limpiar error al escribir
                  }}
                  className={`bg-[#0f1419] border-[#c9a227]/20 focus:border-[#c9a227] transition-colors h-12 ${
                    error ? 'border-red-500 focus:border-red-500' : ''
                  }`}
                  placeholder="Ej: Maestría en Derecho Penal"
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
                  {editingPosgrado ? 'Actualizar' : 'Crear'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <Card className="bg-[#1a1f2e] border-[#c9a227]/20 py-6">
        <CardHeader>
          <CardTitle className="text-[#c9a227]">Lista de Posgrados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-[#c9a227]/20">
                  <TableHead className="text-foreground">Nombre</TableHead>
                  <TableHead className="text-foreground text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posgrados.map((posgrado) => (
                  <TableRow key={posgrado.id} className="border-[#c9a227]/20">
                    <TableCell className="text-foreground font-medium">{posgrado.nombre}</TableCell>
                    <TableCell>
                      <div className="flex justify-end space-x-2">
                        <Button
                          onClick={() => handleEdit(posgrado)}
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
                              <AlertDialogTitle className="text-foreground">¿Eliminar Posgrado?</AlertDialogTitle>
                              <AlertDialogDescription className="text-gray-400">
                                Esta acción eliminará permanentemente el posgrado. No se puede deshacer.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="border-[#c9a227]/50 text-[#c9a227] hover:bg-[#c9a227] hover:text-[#0f1419]">
                                Cancelar
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(posgrado.id)}
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
