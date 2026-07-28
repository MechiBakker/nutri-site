-- Ejecutar este script en Supabase: Project → SQL Editor → New query

-- Tabla de recetarios / productos de la tienda
create table if not exists productos (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  descripcion text,
  precio numeric not null,
  imagen_url text,
  link_pago text not null, -- link de pago de Mercado Pago (Checkout Pro)
  activo boolean not null default true,
  creado_en timestamptz not null default now()
);

-- Tabla de solicitudes de turno
create table if not exists turnos (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  telefono text not null,
  modalidad text not null check (modalidad in ('presencial', 'online')),
  preferencia_horaria text,
  creado_en timestamptz not null default now()
);

-- Habilitar Row Level Security
alter table productos enable row level security;
alter table turnos enable row level security;

-- Cualquiera puede LEER productos activos (para mostrarlos en la web)
create policy "Lectura publica de productos activos"
  on productos for select
  using (activo = true);

-- Cualquiera puede INSERTAR una solicitud de turno (formulario público)
create policy "Insertar turnos desde la web"
  on turnos for insert
  with check (true);

-- Nadie externo puede leer los turnos (solo vos, desde el panel de Supabase
-- con tu usuario, o con la service_role key desde un backend).
-- No se crea policy de "select" para turnos: por defecto queda bloqueada.
