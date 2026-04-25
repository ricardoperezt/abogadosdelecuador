-- Tabla para listar estudios jurídicos desde Supabase
create table if not exists public.estudios_juridicos (
  id bigserial primary key,
  nombre text not null,
  descripcion text not null,
  ubicacion text not null,
  telefono text not null,
  email text not null,
  web text not null,
  abogados integer not null default 0,
  especialidades text[] not null default '{}',
  imagen text not null,
  logo text not null,
  orden integer not null default 0,
  activo boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.estudios_juridicos enable row level security;

drop policy if exists "Public read active estudios juridicos" on public.estudios_juridicos;

create policy "Public read active estudios juridicos"
  on public.estudios_juridicos
  for select
  using (activo = true);

insert into public.estudios_juridicos (
  nombre,
  descripcion,
  ubicacion,
  telefono,
  email,
  web,
  abogados,
  especialidades,
  imagen,
  logo,
  orden,
  activo
)
select * from (
  values
    (
      'Pérez Bustamante & Ponce',
      'Firma líder en derecho corporativo, bancario y tributario. Reconocida internacionalmente por Chambers & Partners.',
      'Av. 12 de Octubre N24-563 y Cordero, Quito',
      '+593 2 256 2680',
      'info@pbpabogados.com',
      'https://www.pbpabogados.com',
      45,
      array['Económico', 'Administrativo', 'Penal']::text[],
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=400&fit=crop',
      'PBP',
      1,
      true
    ),
    (
      'CorralRosales',
      'Firma boutique especializada en derecho corporativo, energía y recursos naturales.',
      'Av. República del Salvador N34-107 y Suiza, Quito',
      '+593 2 381 0950',
      'info@corralrosales.com',
      'https://www.corralrosales.com',
      25,
      array['Económico', 'Administrativo']::text[],
      'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800&h=400&fit=crop',
      'CR',
      2,
      true
    ),
    (
      'BUSTAMANTE FABARA',
      'Firma líder en Guayaquil especializada en derecho corporativo, marítimo y energía.',
      'Av. Francisco de Orellana 234, Guayaquil',
      '+593 4 251 9900',
      'info@bfabogados.com',
      'https://www.bfabogados.com',
      35,
      array['Económico', 'Administrativo']::text[],
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop',
      'BF',
      3,
      true
    ),
    (
      'ROBALINO',
      'Firma especializada en derecho corporativo, M&A y resolución de disputas.',
      'Av. 6 de Diciembre N36-14 y Alpallana, Quito',
      '+593 2 323 0011',
      'info@robalino.com',
      'https://www.robalino.com',
      20,
      array['Económico', 'Penal']::text[],
      'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=400&fit=crop',
      'ROB',
      4,
      true
    ),
    (
      'Gallegos, Valarezo & Neira',
      'Firma especializada en derecho inmobiliario, propiedad intelectual y corporativo.',
      'Av. República N16-114 y Av. Eloy Alfaro, Quito',
      '+593 2 244 3866',
      'info@gvnabogados.com',
      'https://www.gvnabogados.com',
      18,
      array['Económico', 'Administrativo']::text[],
      'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop',
      'GVN',
      5,
      true
    ),
    (
      'Falconi Puig Abogados',
      'Firma especializada en derecho administrativo, regulatorio y propiedad intelectual.',
      'Av. 12 de Octubre N24-563, Quito',
      '+593 2 256 2680',
      'info@falconipuig.com',
      'https://www.falconipuig.com',
      15,
      array['Administrativo', 'Económico']::text[],
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=400&fit=crop',
      'FP',
      6,
      true
    )
) as data(nombre, descripcion, ubicacion, telefono, email, web, abogados, especialidades, imagen, logo, orden, activo)
where not exists (
  select 1 from public.estudios_juridicos e where e.nombre = data.nombre
);
