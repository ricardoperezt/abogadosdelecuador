import { AbogadoConDetalles } from './types'
import { supabase } from './supabase'

export async function getAbogadosConDetalles(): Promise<AbogadoConDetalles[]> {
  // Obtener abogados con especialidades
  const { data: abogados, error: abogadosError } = await supabase
    .from('abogados')
    .select(`
      *,
      abogados_especialidades (
        especialidades (*)
      ),
      abogados_subespecialidades (
        subespecialidades (*)
      ),
      abogados_posgrados (
        posgrados (*)
      )
    `)

  if (abogadosError) throw abogadosError

  // Transformar los datos al formato esperado
  return (abogados || []).map((abogado: any) => ({
    id: abogado.id,
    nombre: abogado.nombre,
    edad: abogado.edad,
    grado: abogado.grado,
    firma: abogado.firma,
    ubicacion: abogado.ubicacion,
    telefono: abogado.telefono,
    email: abogado.email,
    especialidades: abogado.abogados_especialidades?.map((ae: any) => ae.especialidades).filter(Boolean) || [],
    subespecialidades: abogado.abogados_subespecialidades?.map((as: any) => as.subespecialidades).filter(Boolean) || [],
    posgrados: abogado.abogados_posgrados?.map((ap: any) => ap.posgrados).filter(Boolean) || []
  }))
}

export async function getAbogadosPorEspecialidad(especialidadId: number): Promise<AbogadoConDetalles[]> {
  const { data, error } = await supabase
    .from('abogados_especialidades')
    .select(`
      abogados (*)
    `)
    .eq('especialidad_id', especialidadId)

  if (error) throw error
  return data?.map((item: any) => item.abogados) || []
}

export async function getEspecialidades() {
  const { data, error } = await supabase
    .from('especialidades')
    .select('*')
    .order('nombre')

  if (error) throw error
  return data
}
