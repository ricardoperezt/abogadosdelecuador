import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Scale, Globe, GraduationCap, BookOpen, Building2, Award, Briefcase } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Dr. Efraín Pérez Camacho - Trayectoria Profesional | Abogados del Ecuador',
  description: 'Trayectoria profesional del Dr. Efraín Pérez Camacho, abogado ecuatoriano especializado en Derecho Público con amplia experiencia nacional e internacional.',
}

const experienciaSectorPublico = [
  'Corporación Nacional de Telecomunicaciones (CNT) - Abogado del gobierno ecuatoriano',
  'Ministerio de Defensa - Casación: Helicópteros Dhrub',
  'Petroecuador - Contratación pública CNO S.A. (Odebrecht)',
  'Tribunal Supremo Electoral (TSE) - Arbitraje: Consorcio e-Vote',
]

const experienciaSectorPrivado = [
  'Tributaria: Nicolás Febres-Cordero Ribadeneira vs. Servicio de Rentas Internas (SRI)',
  'Marcario y Familia: Kimberly-Clark',
]

const consultoriasInternacionales = [
  { nombre: 'Banco Mundial', descripcion: 'Consultorías en Derecho Público' },
  { nombre: 'Banco Interamericano de Desarrollo (BID)', descripcion: 'Asesoría jurídica especializada' },
  { nombre: 'Organización de Estados Americanos (OEA)', descripcion: 'Consultoría institucional' },
  { nombre: 'Universidad de Rhode Island', descripcion: 'Colaboración académica e investigación' },
  { nombre: 'Instituto Oceanográfico de Woods Hole', descripcion: 'Visiting Scholar e Investigador' },
  { nombre: 'GTZ (Cooperación Alemana)', descripcion: 'Asistencia técnica en materia jurídica' },
  { nombre: 'UICN (Unión Mundial para la Naturaleza)', descripcion: 'Vicepresidente para América Latina del Centro de Derecho Ambiental' },
]

const trayectoriaAcademica = {
  docencia: [
    'Universidad Católica de Guayaquil (Pregrado)',
    'Universidad Católica de Quito (Pregrado)',
    'Universidad San Francisco de Quito (Pregrado y Postgrado)',
    'Universidad Central del Ecuador (Postgrado)',
    'Instituto de Altos Estudios Nacionales - IAEN (Postgrado)',
  ],
  conferencias: [
    { lugar: 'Corte Suprema de Casación de Italia', tema: 'Informática Jurídica', anio: '1984' },
    { lugar: 'Universidad de Sevilla, La Rábida, España', tema: 'Derecho Ambiental', anio: '' },
    { lugar: 'Universidad de Salamanca, España', tema: 'Derecho Administrativo', anio: '2022' },
    { lugar: 'Universidad Austral, Buenos Aires, Argentina', tema: 'Derecho Administrativo', anio: '2022' },
    { lugar: 'Universidad de Sevilla, España', tema: 'Derecho Público', anio: '2023' },
  ],
  participacionInternacional: [
    'Caracas, Venezuela',
    'Cartagena, Colombia',
    'San José, Costa Rica',
    'Seattle y Orcas Islands, Washington, EE.UU.',
    'Charleston, Carolina del Sur, EE.UU.',
    'Montreal, Canadá',
    'Santiago de Chile',
    'Santa Cruz de la Sierra, Bolivia',
    'Buenos Aires, Argentina',
    'Urubamba, Perú',
    'Paraty, Brasil',
  ],
}

const produccionIntelectual = {
  areas: ['Derecho Administrativo', 'Derecho Ambiental', 'Derecho Procesal', 'Derecho Civil'],
  editoriales: [
    'CEP, Ecuador',
    'Editorial Temis, Bogotá, Colombia',
    'Editorial Aranzadi, España',
    'Editorial Tirant Le Blanch, España',
  ],
  citasRAE: [
    'Diccionario Panhispánico de Dudas',
    'Nueva Gramática de Lengua Española',
    'Diccionario del Español Jurídico (coeditado con Cumbre Judicial Iberoamericana y Consejo General del Poder Judicial de España)',
  ],
}

const participacionInstitucional = [
  {
    cargo: 'Representante Alterno al Congreso Nacional',
    institucion: 'Congreso Nacional del Ecuador',
    descripcion: 'Por la provincia de Pichincha, a comienzos del siglo XXI',
  },
  {
    cargo: 'Vicepresidente para América Latina',
    institucion: 'Centro de Derecho Ambiental - UICN',
    descripcion: 'Unión Mundial para la Naturaleza, década de los 90',
  },
  {
    cargo: 'Miembro',
    institucion: 'Instituto Internacional de Derecho Administrativo (IIDA)',
    descripcion: 'Organización internacional especializada en Derecho Administrativo',
  },
]

const formacion = [
  { titulo: 'Doctor en Jurisprudencia', institucion: 'Universidad Estatal de Guayaquil' },
  { titulo: 'Abogado', institucion: 'Universidad Estatal de Guayaquil' },
  { titulo: 'Estudios de Derecho', institucion: 'Universidad Católica de Guayaquil' },
  { titulo: 'Técnicas de la Información', institucion: 'Estrasburgo, Francia' },
]

export default function TrayectoriaPage() {
  return (
    <main className="min-h-screen bg-[#0f1419]">
      {/* Hero */}
      <section className="pt-32 pb-20 bg-[#0a0d12]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/#sobre-nosotros"
            className="inline-flex items-center gap-2 text-[#c9a227] hover:text-[#d4af37] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>

          <p className="text-[#c9a227] text-sm font-medium tracking-widest uppercase mb-4">
            Trayectoria Profesional
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-6">
            Dr. Efraín Pérez Camacho
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-3xl">
            Abogado ecuatoriano con amplia trayectoria en Derecho Público, reconocido por su participación 
            en litigios y asesorías de alto nivel para el Estado ecuatoriano, organismos internacionales 
            y el sector privado. Autor de obras jurídicas citadas por la Real Academia Española.
          </p>
        </div>
      </section>

      {/* Experiencia Profesional */}
      <section className="py-20 bg-[#0f1419]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-full bg-[#c9a227]/10 flex items-center justify-center">
              <Scale className="w-6 h-6 text-[#c9a227]" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-white">Experiencia Profesional Destacada</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Sector Público */}
            <div className="bg-[#1a1f2e] border border-[#c9a227]/20 rounded-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <Building2 className="w-5 h-5 text-[#c9a227]" />
                <h3 className="text-xl font-semibold text-white">Sector Público</h3>
              </div>
              <ul className="space-y-4">
                {experienciaSectorPublico.map((item, index) => (
                  <li key={index} className="text-gray-400 pl-4 border-l-2 border-[#c9a227]/30">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Sector Privado */}
            <div className="bg-[#1a1f2e] border border-[#c9a227]/20 rounded-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <Briefcase className="w-5 h-5 text-[#c9a227]" />
                <h3 className="text-xl font-semibold text-white">Sector Privado</h3>
              </div>
              <ul className="space-y-4">
                {experienciaSectorPrivado.map((item, index) => (
                  <li key={index} className="text-gray-400 pl-4 border-l-2 border-[#c9a227]/30">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Consultorías Internacionales */}
      <section className="py-20 bg-[#0a0d12]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-full bg-[#c9a227]/10 flex items-center justify-center">
              <Globe className="w-6 h-6 text-[#c9a227]" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-white">Consultorías Internacionales</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {consultoriasInternacionales.map((item, index) => (
              <div
                key={index}
                className="bg-[#1a1f2e] border border-[#c9a227]/20 rounded-lg p-6 hover:border-[#c9a227]/40 transition-colors"
              >
                <h3 className="text-white font-semibold mb-2">{item.nombre}</h3>
                <p className="text-gray-400 text-sm">{item.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trayectoria Académica */}
      <section className="py-20 bg-[#0f1419]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-full bg-[#c9a227]/10 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-[#c9a227]" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-white">Trayectoria Académica y Docente</h2>
          </div>

          {/* Docencia */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-white mb-6">Docencia Universitaria</h3>
            <div className="bg-[#1a1f2e] border border-[#c9a227]/20 rounded-lg p-8">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trayectoriaAcademica.docencia.map((item, index) => (
                  <li key={index} className="text-gray-400 flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#c9a227] mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Conferencias */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-white mb-6">Conferencias Internacionales Destacadas</h3>
            <div className="space-y-4">
              {trayectoriaAcademica.conferencias.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#1a1f2e] border border-[#c9a227]/20 rounded-lg p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                >
                  <div>
                    <p className="text-white font-medium">{item.lugar}</p>
                    <p className="text-gray-400 text-sm">{item.tema}</p>
                  </div>
                  {item.anio && (
                    <span className="text-[#c9a227] text-sm font-medium">{item.anio}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Participación Internacional */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6">Participación en Eventos Internacionales</h3>
            <div className="bg-[#1a1f2e] border border-[#c9a227]/20 rounded-lg p-8">
              <div className="flex flex-wrap gap-3">
                {trayectoriaAcademica.participacionInternacional.map((item, index) => (
                  <span
                    key={index}
                    className="bg-[#c9a227]/10 text-[#c9a227] px-4 py-2 rounded-full text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Producción Intelectual */}
      <section className="py-20 bg-[#0a0d12]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-full bg-[#c9a227]/10 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-[#c9a227]" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-white">Producción Intelectual</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Áreas y Editoriales */}
            <div className="space-y-8">
              <div className="bg-[#1a1f2e] border border-[#c9a227]/20 rounded-lg p-8">
                <h3 className="text-xl font-semibold text-white mb-4">Áreas de Especialización</h3>
                <div className="flex flex-wrap gap-3">
                  {produccionIntelectual.areas.map((area, index) => (
                    <span
                      key={index}
                      className="bg-[#c9a227]/10 text-[#c9a227] px-4 py-2 rounded-full text-sm font-medium"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-[#1a1f2e] border border-[#c9a227]/20 rounded-lg p-8">
                <h3 className="text-xl font-semibold text-white mb-4">Publicaciones en Editoriales</h3>
                <ul className="space-y-3">
                  {produccionIntelectual.editoriales.map((editorial, index) => (
                    <li key={index} className="text-gray-400 flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-[#c9a227] mt-2 flex-shrink-0" />
                      {editorial}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Citas RAE */}
            <div className="bg-[#1a1f2e] border border-[#c9a227]/20 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-white mb-4">
                Obras Citadas por la Real Academia Española
              </h3>
              <p className="text-gray-400 mb-6">
                Dos de sus obras han sido citadas en las bibliografías de prestigiosas publicaciones de la RAE:
              </p>
              <ul className="space-y-4">
                {produccionIntelectual.citasRAE.map((cita, index) => (
                  <li
                    key={index}
                    className="text-gray-300 pl-4 border-l-2 border-[#c9a227]"
                  >
                    {cita}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Participación Institucional */}
      <section className="py-20 bg-[#0f1419]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-full bg-[#c9a227]/10 flex items-center justify-center">
              <Award className="w-6 h-6 text-[#c9a227]" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-white">Participación Institucional</h2>
          </div>

          <div className="space-y-6">
            {participacionInstitucional.map((item, index) => (
              <div
                key={index}
                className="bg-[#1a1f2e] border border-[#c9a227]/20 rounded-lg p-8"
              >
                <p className="text-[#c9a227] text-sm font-medium mb-2">{item.cargo}</p>
                <h3 className="text-xl font-semibold text-white mb-2">{item.institucion}</h3>
                <p className="text-gray-400">{item.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formación */}
      <section className="py-20 bg-[#0a0d12]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-full bg-[#c9a227]/10 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-[#c9a227]" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-white">Formación Académica</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {formacion.map((item, index) => (
              <div
                key={index}
                className="bg-[#1a1f2e] border border-[#c9a227]/20 rounded-lg p-6"
              >
                <h3 className="text-white font-semibold mb-1">{item.titulo}</h3>
                <p className="text-gray-400 text-sm">{item.institucion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0f1419]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/#contacto"
            className="inline-flex items-center gap-2 bg-[#c9a227] text-[#0a0d12] px-8 py-4 rounded-lg font-semibold hover:bg-[#d4af37] transition-colors duration-300"
          >
            Contactar
          </Link>
        </div>
      </section>
    </main>
  )
}
