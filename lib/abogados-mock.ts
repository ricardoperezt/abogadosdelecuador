import { AbogadoConDetalles } from './types'

// Datos mock para pruebas sin Supabase
const mockAbogados: AbogadoConDetalles[] = [
  {
    id: 1,
    nombre: "Alberto Brown",
    edad: 55,
    grado: "Abogado de los Juzgados y Tribunales de la República",
    firma: "AVL Abogados",
    ubicacion: "Quito, Pichincha",
    telefono: "+593 2 298 4811",
    email: "abrown@avlabogados.com",
    especialidades: [
      { id: 1, nombre: "Penal" },
      { id: 2, nombre: "Económico" }
    ],
    subespecialidades: [
      { id: 1, nombre: "Dispute Resolution", especialidad_id: 1 },
      { id: 2, nombre: "Litigio Comercial", especialidad_id: 1 }
    ],
    posgrados: [
      { id: 1, nombre: "Máster en Arbitraje Comercial" }
    ]
  },
  {
    id: 2,
    nombre: "Andrea Lara",
    edad: 45,
    grado: "Abogada de los Juzgados y Tribunales de la República",
    firma: "LEXVALOR Abogados",
    ubicacion: "Quito, Pichincha",
    telefono: "+593 2 382 7640",
    email: "alara@lexvalor.com",
    especialidades: [
      { id: 3, nombre: "Laboral" }
    ],
    subespecialidades: [
      { id: 3, nombre: "Despidos", especialidad_id: 3 },
      { id: 4, nombre: "Beneficios Sociales", especialidad_id: 3 }
    ],
    posgrados: [
      { id: 2, nombre: "Máster en Derecho del Trabajo" }
    ]
  },
  {
    id: 3,
    nombre: "Blanca Gómez de la Torre",
    edad: 48,
    grado: "Abogada de los Juzgados y Tribunales de la República",
    firma: "Pérez Bustamante & Ponce",
    ubicacion: "Quito, Pichincha",
    telefono: "+593 2 256 2680",
    email: "bgomez@pbpabogados.com",
    especialidades: [
      { id: 4, nombre: "Niñez" },
      { id: 2, nombre: "Económico" }
    ],
    subespecialidades: [
      { id: 5, nombre: "Adopciones", especialidad_id: 4 },
      { id: 6, nombre: "Pensión Alimenticia", especialidad_id: 4 }
    ],
    posgrados: [
      { id: 3, nombre: "Especialista en Derecho de Familia" }
    ]
  }
]

export async function getAbogadosConDetalles(): Promise<AbogadoConDetalles[]> {
  // Simular delay de red pero sin consumo real
  await new Promise(resolve => setTimeout(resolve, 100))
  return mockAbogados
}

export async function getAbogadosPorEspecialidad(especialidadId: number): Promise<AbogadoConDetalles[]> {
  await new Promise(resolve => setTimeout(resolve, 50))
  return mockAbogados.filter(abogado => 
    abogado.especialidades.some(esp => esp.id === especialidadId)
  )
}

export async function getEspecialidades() {
  await new Promise(resolve => setTimeout(resolve, 50))
  return [
    { id: 1, nombre: "Penal" },
    { id: 2, nombre: "Económico" },
    { id: 3, nombre: "Laboral" },
    { id: 4, nombre: "Niñez" },
    { id: 5, nombre: "Administrativo" }
  ]
}
