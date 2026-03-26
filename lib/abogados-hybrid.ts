import { getAbogadosConDetalles as getAbogadosSupabase, getEspecialidades as getEspecialidadesSupabase } from './abogados'

import { AbogadoConDetalles } from './types'

export async function getAbogadosConDetalles(): Promise<AbogadoConDetalles[]> {
  console.log("🟢 Usando datos de SUPABASE")
  try {
    const result = await getAbogadosSupabase()
    console.log("✅ Datos de Supabase recibidos:", result.length, "abogados")
    return result
  } catch (error) {
    console.error("❌ Error obteniendo datos de Supabase:", error)
    return []
  }
}

export async function getAbogadosPorEspecialidad(especialidadId: number): Promise<AbogadoConDetalles[]> {
  const allAbogados = await getAbogadosConDetalles()
  return allAbogados.filter(abogado => 
    abogado.especialidades.some(esp => esp.id === especialidadId)
  )
}

export async function getEspecialidades() {
  console.log(" Usando especialidades de SUPABASE")
  try {
    const result = await getEspecialidadesSupabase()
    console.log("✅ Especialidades de Supabase recibidas:", result.length, "especialidades")
    return result
  } catch (error) {
    console.error("❌ Error obteniendo especialidades de Supabase:", error)
    return []
  }
}
