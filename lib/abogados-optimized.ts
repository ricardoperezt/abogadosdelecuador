import { AbogadoConDetalles } from './types'
import { supabase } from './supabase'

// Cache simple para evitar múltiples peticiones
let cachedAbogados: AbogadoConDetalles[] | null = null
let cacheTimestamp = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutos

export async function getAbogadosConDetalles(): Promise<AbogadoConDetalles[]> {
  // Verificar cache
  const now = Date.now()
  if (cachedAbogados && (now - cacheTimestamp) < CACHE_DURATION) {
    return cachedAbogados
  }

  try {
    // Obtener abogados con especialidades de forma optimizada
    const { data: abogados, error: abogadosError } = await supabase
      .from('abogados')
      .select(`
        id,
        nombre,
        edad,
        grado,
        firma,
        ubicacion,
        telefono,
        email,
        abogados_especialidades (
          especialidades (id, nombre)
        ),
        abogados_subespecialidades (
          subespecialidades (id, nombre)
        ),
        abogados_posgrados (
          posgrados (id, nombre)
        )
      `)
      .order('nombre')
      .limit(50) // Limitar para reducir carga

    if (abogadosError) throw abogadosError

    // Transformar y cachear datos
    const transformedData = (abogados || []).map((abogado: any) => ({
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

    // Actualizar cache
    cachedAbogados = transformedData
    cacheTimestamp = now

    return transformedData
  } catch (error) {
    console.error('Error fetching abogados:', error)
    // Retornar cache si existe, aunque esté expirado
    return cachedAbogados || []
  }
}

export async function getAbogadosPorEspecialidad(especialidadId: number): Promise<AbogadoConDetalles[]> {
  const allAbogados = await getAbogadosConDetalles()
  return allAbogados.filter(abogado => 
    abogado.especialidades.some(esp => esp.id === especialidadId)
  )
}

let cachedEspecialidades: any[] | null = null
let especialidadesCacheTimestamp = 0

export async function getEspecialidades() {
  const now = Date.now()
  if (cachedEspecialidades && (now - especialidadesCacheTimestamp) < CACHE_DURATION) {
    return cachedEspecialidades
  }

  try {
    const { data, error } = await supabase
      .from('especialidades')
      .select('id, nombre')
      .order('nombre')

    if (error) throw error
    
    cachedEspecialidades = data || []
    especialidadesCacheTimestamp = now
    return cachedEspecialidades
  } catch (error) {
    console.error('Error fetching especialidades:', error)
    return cachedEspecialidades || []
  }
}
