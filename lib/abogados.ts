import { AbogadoConDetalles } from './types'
import { supabase } from './supabase'

export async function getAbogadosConDetalles(): Promise<AbogadoConDetalles[]> {
  console.log("🔍 Obteniendo abogados de Supabase...")
  console.log("📋 TABLA: 'abogados' - Buscando todos los abogados activos")
  
  try {
    // Consulta con relaciones - misma que usa el dashboard
    const { data: abogados, error: abogadosError } = await supabase
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
      .eq('activo', true)
      .order('nombre')

    if (abogadosError) {
      console.error("❌ Error obteniendo abogados:", abogadosError)
      throw abogadosError
    }
    console.log("📊 Datos recibidos (activos):", abogados?.length || 0, "abogados")

    // Transformar los datos al formato esperado con relaciones
    const result = (abogados || []).map((abogado: any) => {
      const especialidades = abogado.abogados_especialidades?.map((ae: any) => ae.especialidades).filter(Boolean) || []
      const subespecialidades = abogado.abogados_subespecialidades?.map((as: any) => as.subespecialidades).filter(Boolean) || []
      const posgrados = abogado.abogados_posgrados?.map((ap: any) => ap.posgrados).filter(Boolean) || []
      return {
        id: abogado.id,
        nombre: abogado.nombre,
        edad: abogado.edad,
        grado: abogado.grado,
        firma: abogado.firma,
        ubicacion: abogado.ubicacion,
        telefono: abogado.telefono,
        email: abogado.email,
        especialidades,
        subespecialidades,
        posgrados
      }
    })

    console.log("✅ Datos transformados:", result.length, "abogados")
    return result

  } catch (error) {
    console.error("❌ Error general obteniendo abogados:", error)
    return []
  }
}

export async function getAbogadosPorEspecialidad(especialidadId: number): Promise<AbogadoConDetalles[]> {
  console.log("📋 TABLA: 'abogados_especialidades' - Buscando abogados por especialidad ID:", especialidadId)
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
  console.log("🔍 Obteniendo especialidades de Supabase...")
  console.log("📋 TABLA: 'especialidades' - Buscando todas las especialidades")
  
  try {
    const { data, error } = await supabase
      .from('especialidades')
      .select('*')
      .order('nombre')

    if (error) {
      console.error("❌ Error obteniendo especialidades:", error)
      console.log("📡 Retornando array vacío de especialidades")
      return []
    }

    console.log("✅ Especialidades recibidas:", data?.length || 0)
    return data || []
  } catch (error) {
    console.error("❌ Error general obteniendo especialidades:", error)
    return []
  }
}
