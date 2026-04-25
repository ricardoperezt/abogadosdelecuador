import { supabase } from './supabase'

export interface Especialidad {
  id: number
  nombre: string
}

export interface Subespecialidad {
  id: number
  nombre: string
  especialidad_id: number
}

export interface EspecialidadConSubespecialidades extends Especialidad {
  subespecialidades: Subespecialidad[]
}

export async function getEspecialidadesConSubespecialidades(): Promise<EspecialidadConSubespecialidades[]> {
  try {
    const { data: especialidades, error: especialidadesError } = await supabase
      .from('especialidades')
      .select(`
        id,
        nombre,
        subespecialidades (
          id,
          nombre,
          especialidad_id
        )
      `)
      .order('nombre')

    if (especialidadesError) throw especialidadesError

    const transformedData = (especialidades || []).map((esp: any) => ({
      id: esp.id,
      nombre: esp.nombre,
      subespecialidades: esp.subespecialidades || []
    }))

    return transformedData
  } catch (error) {
    console.error('Error fetching especialidades:', error)
    return []
  }
}

export async function getEspecialidades(): Promise<Especialidad[]> {
  const especialidadesConSubs = await getEspecialidadesConSubespecialidades()
  return especialidadesConSubs.map(({ subespecialidades, ...esp }) => esp)
}
