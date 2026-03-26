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

// Forzar uso de mock para evitar problemas de build
const USE_MOCK = true

// Datos mock para especialidades
const mockEspecialidades: EspecialidadConSubespecialidades[] = [
  {
    id: 1,
    nombre: "Administrativo",
    subespecialidades: [
      { id: 1, nombre: "Public Law", especialidad_id: 1 },
      { id: 2, nombre: "Contratación Pública", especialidad_id: 1 },
      { id: 3, nombre: "Derecho Regulatorio", especialidad_id: 1 },
      { id: 4, nombre: "Concesiones", especialidad_id: 1 }
    ]
  },
  {
    id: 2,
    nombre: "Laboral",
    subespecialidades: [
      { id: 5, nombre: "Relaciones Laborales", especialidad_id: 2 },
      { id: 6, nombre: "Seguridad Social", especialidad_id: 2 },
      { id: 7, nombre: "Despidos", especialidad_id: 2 },
      { id: 8, nombre: "Beneficios Sociales", especialidad_id: 2 }
    ]
  },
  {
    id: 3,
    nombre: "Niñez",
    subespecialidades: [
      { id: 9, nombre: "Protección Integral", especialidad_id: 3 },
      { id: 10, nombre: "Custodia de Menores", especialidad_id: 3 },
      { id: 11, nombre: "Adopciones", especialidad_id: 3 },
      { id: 12, nombre: "Pensión Alimenticia", especialidad_id: 3 }
    ]
  },
  {
    id: 4,
    nombre: "Penal",
    subespecialidades: [
      { id: 13, nombre: "Dispute Resolution", especialidad_id: 4 },
      { id: 14, nombre: "Arbitraje Internacional", especialidad_id: 4 },
      { id: 15, nombre: "Litigio Comercial", especialidad_id: 4 },
      { id: 16, nombre: "Delitos Económicos", especialidad_id: 4 }
    ]
  },
  {
    id: 5,
    nombre: "Económico",
    subespecialidades: [
      { id: 17, nombre: "Banking & Finance", especialidad_id: 5 },
      { id: 18, nombre: "Corporate/Commercial", especialidad_id: 5 },
      { id: 19, nombre: "Tax", especialidad_id: 5 },
      { id: 20, nombre: "Real Estate", especialidad_id: 5 },
      { id: 21, nombre: "Intellectual Property", especialidad_id: 5 },
      { id: 22, nombre: "Energy & Natural Resources", especialidad_id: 5 }
    ]
  }
]

export async function getEspecialidadesConSubespecialidades(): Promise<EspecialidadConSubespecialidades[]> {
  // Simular delay de red pero sin consumo real
  await new Promise(resolve => setTimeout(resolve, 100))
  return mockEspecialidades
}

export async function getEspecialidades(): Promise<Especialidad[]> {
  const especialidadesConSubs = await getEspecialidadesConSubespecialidades()
  return especialidadesConSubs.map(({ subespecialidades, ...esp }) => esp)
}
