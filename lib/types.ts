export interface Abogado {
  id: number
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
