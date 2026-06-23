create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  ui_language text not null default 'en',
  created_at timestamptz not null default now()
);

create table if not exists public.assignments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plan_id text not null,
  week_number integer not null,
  topic jsonb not null,
  references_list jsonb not null,
  status text not null default 'active',
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.verse_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  reference text not null,
  language text not null,
  collection text,
  verse_text text,
  progress jsonb not null default '{"level": 0, "accuracy": 0, "attempts": 0}'::jsonb,
  trouble jsonb not null default '{}'::jsonb,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, reference, language)
);

create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  anonymous_id text not null,
  session_id text not null,
  event_name text not null,
  event_properties jsonb not null default '{}'::jsonb,
  app_version text,
  path text,
  device_type text,
  created_at timestamptz not null default now()
);

create index if not exists analytics_events_created_at_idx
on public.analytics_events (created_at desc);

create index if not exists analytics_events_user_id_created_at_idx
on public.analytics_events (user_id, created_at desc);

create index if not exists analytics_events_anonymous_id_created_at_idx
on public.analytics_events (anonymous_id, created_at desc);

create index if not exists analytics_events_event_name_created_at_idx
on public.analytics_events (event_name, created_at desc);

alter table public.profiles enable row level security;
alter table public.assignments enable row level security;
alter table public.verse_progress enable row level security;
alter table public.analytics_events enable row level security;

create policy "profiles self access"
on public.profiles
for all
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "assignments self access"
on public.assignments
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "verse_progress self access"
on public.verse_progress
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "analytics insert events"
on public.analytics_events
for insert
with check (user_id is null or auth.uid() = user_id);

create policy "analytics self read"
on public.analytics_events
for select
using (auth.uid() = user_id);
