import { supabase } from './supabase'

export async function getTables() {
  const { data, error } = await supabase
    .rpc('get_tables')
  
  if (error) throw error
  return data
}

export async function getTableSchema(tableName: string) {
  const { data, error } = await supabase
    .from(tableName)
    .select('*')
    .limit(0)
  
  if (error) throw error
  return data
}

// Función para obtener información del schema
export async function getSchemaInfo() {
  const queries = [
    // Tablas
    supabase
      .from('information_schema.tables')
      .select('table_schema, table_name, table_type')
      .neq('table_schema', 'information_schema')
      .neq('table_schema', 'pg_catalog'),
    
    // Columnas
    supabase
      .from('information_schema.columns')
      .select('table_schema, table_name, column_name, data_type, is_nullable')
      .neq('table_schema', 'information_schema')
      .neq('table_schema', 'pg_catalog')
  ]

  const [tablesResult, columnsResult] = await Promise.all(queries)
  
  return {
    tables: tablesResult.data,
    columns: columnsResult.data,
    errors: {
      tables: tablesResult.error,
      columns: columnsResult.error
    }
  }
}
