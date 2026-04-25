'use client'

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { ArrowLeft, CheckCircle2, Pencil, Plus, Trash2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useEffect, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { EstudioJuridico } from '@/lib/types'
import { supabaseServer } from '@/lib/supabase-server'
import { useRouter } from 'next/navigation'

interface EstudioFormData {
  nombre: string
  descripcion: string
  ubicacion: string
  telefono: string
  email: string
  web: string
  abogados: string
  especialidadesText: string
  imagen: string
  logo: string
  orden: string
  activo: boolean
}

const initialFormData: EstudioFormData = {
  nombre: '',
  descripcion: '',
  ubicacion: '',
  telefono: '',
  email: '',
  web: '',
  abogados: '0',
  especialidadesText: '',
  imagen: '',
  logo: '',
  orden: '0',
  activo: true
}

const parseEspecialidades = (value: string) =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

export default function EstudiosManagement() {
  const [estudios, setEstudios] = useState<EstudioJuridico[]>([])
  const [loading, setLoading] = useState(true)
  const [editingEstudio, setEditingEstudio] = useState<EstudioJuridico | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState<EstudioFormData>(initialFormData)
  const router = useRouter()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const { data, error } = await supabaseServer
        .from('estudios_juridicos')
        .select('*')
        .order('orden', { ascending: true })
        .order('nombre', { ascending: true })

      if (error) throw error
      setEstudios((data || []) as EstudioJuridico[])
    } catch (error) {
      console.error('Error loading estudios jurídicos:', error)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData(initialFormData)
    setEditingEstudio(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const estudioData = {
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      ubicacion: formData.ubicacion,
      telefono: formData.telefono,
      email: formData.email,
      web: formData.web,
      abogados: parseInt(formData.abogados) || 0,
      especialidades: parseEspecialidades(formData.especialidadesText),
      imagen: formData.imagen,
      logo: formData.logo,
      orden: parseInt(formData.orden) || 0,
      activo: formData.activo
    }

    try {
      if (editingEstudio) {
        const { error } = await supabaseServer
          .from('estudios_juridicos')
          .update(estudioData)
          .eq('id', editingEstudio.id)

        if (error) throw error
      } else {
        const { error } = await supabaseServer
          .from('estudios_juridicos')
          .insert(estudioData)

        if (error) throw error
      }

      setIsDialogOpen(false)
      resetForm()
      loadData()
    } catch (error) {
      console.error('Error saving estudio jurídico:', error)
    }
  }

  const handleEdit = (estudio: EstudioJuridico) => {
    setEditingEstudio(estudio)
    setFormData({
      nombre: estudio.nombre,
      descripcion: estudio.descripcion,
      ubicacion: estudio.ubicacion,
      telefono: estudio.telefono,
      email: estudio.email,
      web: estudio.web,
      abogados: String(estudio.abogados ?? 0),
      especialidadesText: (estudio.especialidades || []).join(', '),
      imagen: estudio.imagen,
      logo: estudio.logo,
      orden: String(estudio.orden ?? 0),
      activo: estudio.activo ?? true
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabaseServer
        .from('estudios_juridicos')
        .delete()
        .eq('id', id)

      if (error) throw error
      loadData()
    } catch (error) {
      console.error('Error deleting estudio jurídico:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1419] flex items-center justify-center">
        <div className="text-foreground">Cargando estudios jurídicos...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0f1419] p-4 sm:p-6">
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
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Gestión de Estudios Jurídicos</h1>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={resetForm}
              className="bg-[#c9a227] text-[#0f1419] hover:bg-[#e8d5a3] w-full sm:w-fit"
            >
              <Plus className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Nuevo Estudio</span>
              <span className="sm:hidden">Nuevo</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#1a1f2e] border-[#c9a227]/20 w-[95vw] sm:w-[90vw] md:w-[85vw] lg:w-[80vw] xl:!max-w-5xl max-h-[90vh] overflow-y-auto p-4 sm:p-6 rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-[#c9a227] text-xl sm:text-2xl font-serif">
                {editingEstudio ? 'Editar Estudio Jurídico' : 'Nuevo Estudio Jurídico'}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nombre" className="text-foreground mb-2 block text-sm font-medium">Nombre</Label>
                  <Input
                    id="nombre"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className="bg-[#0f1419] border-[#c9a227]/60 text-white focus:border-[#c9a227] transition-colors h-12"
                    placeholder="Nombre del estudio"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="logo" className="text-foreground mb-2 block text-sm font-medium">Logo</Label>
                  <Input
                    id="logo"
                    value={formData.logo}
                    onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                    className="bg-[#0f1419] border-[#c9a227]/60 text-white focus:border-[#c9a227] transition-colors h-12"
                    placeholder="Ej: PBP"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="descripcion" className="text-foreground mb-2 block text-sm font-medium">Descripción</Label>
                <Textarea
                  id="descripcion"
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  className="bg-[#0f1419] border-[#c9a227]/60 text-white focus:border-[#c9a227] transition-colors min-h-28"
                  placeholder="Descripción breve del estudio jurídico"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ubicacion" className="text-foreground mb-2 block text-sm font-medium">Ubicación</Label>
                  <Input
                    id="ubicacion"
                    value={formData.ubicacion}
                    onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value })}
                    className="bg-[#0f1419] border-[#c9a227]/60 text-white focus:border-[#c9a227] transition-colors h-12"
                    placeholder="Dirección completa"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="web" className="text-foreground mb-2 block text-sm font-medium">Web</Label>
                  <Input
                    id="web"
                    value={formData.web}
                    onChange={(e) => setFormData({ ...formData, web: e.target.value })}
                    className="bg-[#0f1419] border-[#c9a227]/60 text-white focus:border-[#c9a227] transition-colors h-12"
                    placeholder="https://..."
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="telefono" className="text-foreground mb-2 block text-sm font-medium">Teléfono</Label>
                  <Input
                    id="telefono"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    className="bg-[#0f1419] border-[#c9a227]/60 text-white focus:border-[#c9a227] transition-colors h-12"
                    placeholder="+593 ..."
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
                    placeholder="correo@ejemplo.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="abogados" className="text-foreground mb-2 block text-sm font-medium">Abogados</Label>
                  <Input
                    id="abogados"
                    type="number"
                    min="0"
                    value={formData.abogados}
                    onChange={(e) => setFormData({ ...formData, abogados: e.target.value })}
                    className="bg-[#0f1419] border-[#c9a227]/60 text-white focus:border-[#c9a227] transition-colors h-12"
                    placeholder="0"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="orden" className="text-foreground mb-2 block text-sm font-medium">Orden</Label>
                  <Input
                    id="orden"
                    type="number"
                    min="0"
                    value={formData.orden}
                    onChange={(e) => setFormData({ ...formData, orden: e.target.value })}
                    className="bg-[#0f1419] border-[#c9a227]/60 text-white focus:border-[#c9a227] transition-colors h-12"
                    placeholder="0"
                    required
                  />
                </div>

                <div className="flex items-center gap-3 rounded-lg border border-[#c9a227]/20 bg-[#0f1419] px-4 py-3 mt-6 md:mt-0">
                  <Checkbox
                    id="activo"
                    checked={formData.activo}
                    onCheckedChange={(checked) => setFormData({ ...formData, activo: Boolean(checked) })}
                  />
                  <Label htmlFor="activo" className="text-foreground cursor-pointer flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#c9a227]" />
                    Activo
                  </Label>
                </div>
              </div>

              <div>
                <Label htmlFor="imagen" className="text-foreground mb-2 block text-sm font-medium">Imagen</Label>
                <Input
                  id="imagen"
                  value={formData.imagen}
                  onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
                  className="bg-[#0f1419] border-[#c9a227]/60 text-white focus:border-[#c9a227] transition-colors h-12"
                  placeholder="URL de imagen"
                  required
                />
              </div>

              <div>
                <Label htmlFor="especialidades" className="text-foreground mb-2 block text-sm font-medium">Especialidades</Label>
                <Textarea
                  id="especialidades"
                  value={formData.especialidadesText}
                  onChange={(e) => setFormData({ ...formData, especialidadesText: e.target.value })}
                  className="bg-[#0f1419] border-[#c9a227]/60 text-white focus:border-[#c9a227] transition-colors min-h-24"
                  placeholder="Separadas por coma, por ejemplo: Económico, Administrativo, Penal"
                  required
                />
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
                  {editingEstudio ? 'Actualizar' : 'Crear'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-[#1a1f2e] border-[#c9a227]/20 py-6">
        <CardHeader>
          <CardTitle className="text-[#c9a227]">Lista de Estudios Jurídicos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-[#c9a227]/20">
                  <TableHead className="text-foreground">Nombre</TableHead>
                  <TableHead className="text-foreground">Ubicación</TableHead>
                  <TableHead className="text-foreground">Abogados</TableHead>
                  <TableHead className="text-foreground">Estado</TableHead>
                  <TableHead className="text-foreground text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {estudios.map((estudio) => (
                  <TableRow key={estudio.id} className="border-[#c9a227]/20">
                    <TableCell className="text-foreground font-medium">
                      <div className="space-y-2">
                        <div>{estudio.nombre}</div>
                        <div className="flex flex-wrap gap-1">
                          {(estudio.especialidades || []).slice(0, 2).map((esp, index) => (
                            <Badge key={index} className="bg-[#c9a227]/10 text-[#c9a227] border border-[#c9a227]/20 text-xs">
                              {esp}
                            </Badge>
                          ))}
                          {(estudio.especialidades || []).length > 2 && (
                            <Badge className="bg-[#8b7355]/10 text-[#e8d5a3] border border-[#8b7355]/20 text-xs">
                              +{(estudio.especialidades || []).length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-foreground">{estudio.ubicacion}</TableCell>
                    <TableCell className="text-foreground">{estudio.abogados}</TableCell>
                    <TableCell>
                      {estudio.activo ? (
                        <Badge className="bg-green-500/15 text-green-400 border border-green-500/30">Activo</Badge>
                      ) : (
                        <Badge className="bg-red-500/15 text-red-400 border border-red-500/30">Inactivo</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end space-x-2">
                        <Button
                          onClick={() => handleEdit(estudio)}
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
                              <AlertDialogTitle className="text-foreground">¿Eliminar Estudio Jurídico?</AlertDialogTitle>
                              <AlertDialogDescription className="text-gray-400">
                                Esta acción eliminará permanentemente el estudio jurídico. No se puede deshacer.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="border-[#c9a227]/50 text-[#c9a227] hover:bg-[#c9a227] hover:text-[#0f1419]">
                                Cancelar
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(estudio.id)}
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

          {estudios.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">No hay estudios jurídicos registrados</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
