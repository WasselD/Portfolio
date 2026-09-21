-- =====================================================================
--  Portfolio admin: database setup
--  Run once: Supabase dashboard -> SQL Editor -> New query -> paste -> Run
--
--  Result: anyone can READ projects and certificates (the public site).
--  Only the ONE account below can create, edit or delete them.
--  The rules live in the database, so they hold even if someone finds /admin.
-- =====================================================================

-- 1) The only account allowed to write. CHANGE THIS to the email you will log in with.
create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select lower(coalesce(auth.jwt() ->> 'email', '')) = lower('wasselforbusiness@gmail.com');
$$;

-- 2) Tables
create table if not exists public.projects (
  id           text primary key default gen_random_uuid()::text,
  title        text not null,
  description  text not null default '',
  category     text not null default '',
  technologies text[] not null default '{}',
  features     text[] not null default '{}',
  github       text,
  demo         text,
  image        text,
  date         text not null default '',
  frame        boolean not null default true,
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now()
);
-- (older installs: this adds the column the first time you re-run the file)
alter table public.projects add column if not exists frame boolean not null default true;

create table if not exists public.certifications (
  id             text primary key default gen_random_uuid()::text,
  name           text not null,
  organization   text not null default '',
  issue_date     text not null default '',
  credential_id  text not null default '',
  credential_url text,
  status         text not null default 'Active',
  description    text not null default '',
  sort_order     integer not null default 0,
  created_at     timestamptz not null default now()
);

-- 3) Row-level security: public read, admin-only write
alter table public.projects       enable row level security;
alter table public.certifications enable row level security;

drop policy if exists "public read projects"        on public.projects;
drop policy if exists "admin write projects"        on public.projects;
drop policy if exists "public read certifications"  on public.certifications;
drop policy if exists "admin write certifications"  on public.certifications;

create policy "public read projects"
  on public.projects for select to anon, authenticated using (true);
create policy "admin write projects"
  on public.projects for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "public read certifications"
  on public.certifications for select to anon, authenticated using (true);
create policy "admin write certifications"
  on public.certifications for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- 4) Image storage: public bucket, admin-only uploads
insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do nothing;

drop policy if exists "public read portfolio files"   on storage.objects;
drop policy if exists "admin insert portfolio files"  on storage.objects;
drop policy if exists "admin update portfolio files"  on storage.objects;
drop policy if exists "admin delete portfolio files"  on storage.objects;

create policy "public read portfolio files"
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'portfolio');
create policy "admin insert portfolio files"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'portfolio' and public.is_admin());
create policy "admin update portfolio files"
  on storage.objects for update to authenticated
  using (bucket_id = 'portfolio' and public.is_admin());
create policy "admin delete portfolio files"
  on storage.objects for delete to authenticated
  using (bucket_id = 'portfolio' and public.is_admin());
