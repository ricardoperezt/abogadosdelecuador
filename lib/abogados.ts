import { AbogadoConDetalles } from './types'
import { supabaseServer } from './supabase-server'

export async function getAbogadosConDetalles(): Promise<AbogadoConDetalles[]> {
  console.log("🔍 Obteniendo abogados de Supabase...")
  console.log("📋 TABLA: 'abogados' - Buscando todos los abogados activos")
  
  try {
    // Primero veamos TODOS los registros para debug
    console.log("🔍 DEBUG: Buscando TODOS los registros sin filtro activo...")
    const { data: todosAbogados, error: debugError } = await supabaseServer
      .from('abogados')
      .select('*')

    if (debugError) {
      console.error("❌ Error en debug:", debugError)
    } else {
      console.log("🔍 DEBUG: Total registros en tabla:", todosAbogados?.length || 0)
      console.log("🔍 DEBUG: Registros encontrados:", todosAbogados)
    }

    // Ahora la consulta con filtro activo
    const { data: abogados, error: abogadosError } = await supabaseServer
      .from('abogados')
      .select('*')
      .eq('activo', true)

    if (abogadosError) {
      console.error("❌ Error obteniendo abogados:", abogadosError)
      throw abogadosError
    }

    console.log("📊 Datos recibidos (activos):", abogados?.length || 0, "abogados")
    console.log("🔍 DEBUG: Datos crudos:", abogados)

    // Transformar los datos al formato esperado (sin relaciones por ahora)
    const result = (abogados || []).map((abogado: any) => {
      console.log("🔍 DEBUG: Procesando abogado:", abogado.nombre, abogado.id)
      return {
        id: abogado.id,
        nombre: abogado.nombre,
        edad: abogado.edad,
        grado: abogado.grado,
        firma: abogado.firma,
        ubicacion: abogado.ubicacion,
        telefono: abogado.telefono,
        email: abogado.email,
        especialidades: [], // Vacío por ahora
        subespecialidades: [], // Vacío por ahora
        posgrados: [] // Vacío por ahora
      }
    })

    console.log("✅ Datos transformados:", result.length, "abogados")
    console.log("🔍 DEBUG: Resultado final:", result)
    return result

  } catch (error) {
    console.error("❌ Error general obteniendo abogados:", error)
    return []
  }
}

export async function getAbogadosPorEspecialidad(especialidadId: number): Promise<AbogadoConDetalles[]> {
  console.log("📋 TABLA: 'abogados_especialidades' - Buscando abogados por especialidad ID:", especialidadId)
  const { data, error } = await supabaseServer
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
    const { data, error } = await supabaseServer
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
