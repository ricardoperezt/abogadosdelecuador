-- Create especialidades table
CREATE TABLE IF NOT EXISTS public.especialidades (
  id uuid not null default extensions.uuid_generate_v4 (),
  nombre character varying(255) not null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint especialidades_pkey primary key (id),
  constraint especialidades_nombre_key unique (nombre)
) TABLESPACE pg_default;

-- Enable RLS on especialidades table
ALTER TABLE public.especialidades ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Enable read access for all users" ON public.especialidades
    FOR SELECT USING (true);

-- Insert sample especialidades
INSERT INTO public.especialidades (nombre) VALUES 
('Administrativo'),
('Laboral'),
('Niñez'),
('Penal'),
('Económico');
