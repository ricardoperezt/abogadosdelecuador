export interface Abogado {
  id: string // UUID
  nombre: string
  edad: number
  grado: string
  firma: string
  ubicacion: string
  telefono: string
  email: string
}

export interface Especialidad {
  id: number
  nombre: string
}

export interface EstudioJuridico {
  id: number
  nombre: string
  descripcion: string
  ubicacion: string
  telefono: string
  email: string
  web: string
  abogados: number
  especialidades: string[]
  imagen: string
  logo: string
  orden?: number
  activo?: boolean
}

export interface Subespecialidad {
  id: number
  nombre: string
  especialidad_id: number
}

export interface Posgrado {
  id: number
  nombre: string
}

export interface AbogadoConDetalles extends Abogado {
  especialidades: Especialidad[]
  subespecialidades: Subespecialidad[]
  posgrados: Posgrado[]
}
