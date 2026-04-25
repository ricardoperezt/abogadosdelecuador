import { supabase } from './supabase'
import { EstudioJuridico } from './types'

export async function getEstudiosJuridicos(): Promise<EstudioJuridico[]> {
  console.log('🔍 Obteniendo estudios jurídicos de Supabase...')
  console.log("📋 TABLA: 'estudios_juridicos' - Buscando todos los estudios activos")

  try {
    const { data, error } = await supabase
      .from('estudios_juridicos')
      .select('*')
      .eq('activo', true)
      .order('orden', { ascending: true })
      .order('nombre', { ascending: true })

    if (error) {
      console.error('❌ Error obteniendo estudios jurídicos:', error)
      return []
    }

    console.log('✅ Estudios jurídicos recibidos:', data?.length || 0)
    return (data || []) as EstudioJuridico[]
  } catch (error) {
    console.error('❌ Error general obteniendo estudios jurídicos:', error)
    return []
  }
}
