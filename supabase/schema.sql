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

alter table public.profiles enable row level security;
alter table public.assignments enable row level security;
alter table public.verse_progress enable row level security;

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
