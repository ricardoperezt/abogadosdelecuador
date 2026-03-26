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

// Cache para especialidades
let cachedEspecialidades: EspecialidadConSubespecialidades[] | null = null
let cacheTimestamp = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutos

export async function getEspecialidadesConSubespecialidades(): Promise<EspecialidadConSubespecialidades[]> {
  const now = Date.now()
  if (cachedEspecialidades && (now - cacheTimestamp) < CACHE_DURATION) {
    return cachedEspecialidades
  }

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
      .limit(10) // Limitar para reducir carga

    if (especialidadesError) throw especialidadesError

    const transformedData = (especialidades || []).map((esp: any) => ({
      id: esp.id,
      nombre: esp.nombre,
      subespecialidades: esp.subespecialidades || []
    }))

    cachedEspecialidades = transformedData
    cacheTimestamp = now

    return transformedData
  } catch (error) {
    console.error('Error fetching especialidades:', error)
    return cachedEspecialidades || []
  }
}

export async function getEspecialidades(): Promise<Especialidad[]> {
  const especialidadesConSubs = await getEspecialidadesConSubespecialidades()
  return especialidadesConSubs.map(({ subespecialidades, ...esp }) => esp)
}
