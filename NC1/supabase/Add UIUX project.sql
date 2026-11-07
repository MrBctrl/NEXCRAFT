-- Run this once. Creates the uiux_projects table (backing the "Mobile
-- UI / UX" section) with the same RLS pattern as portfolio_items and
-- web_projects, and seeds it with what's already showing on the live
-- site so nothing disappears when it switches from static to Supabase.
-- Reuses the existing "portfolio-images" and "project-videos" storage
-- buckets — no new bucket needed.

create table if not exists uiux_projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  media_type text not null default 'video' check (media_type in ('image','video')),
  media_url text,
  tags text[] default '{}',
  visible boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table uiux_projects enable row level security;

drop policy if exists "public can read visible uiux projects" on uiux_projects;
create policy "public can read visible uiux projects"
  on uiux_projects for select
  to anon
  using (visible = true);

drop policy if exists "authenticated full access uiux projects" on uiux_projects;
create policy "authenticated full access uiux projects"
  on uiux_projects for all
  to authenticated
  using (true)
  with check (true);

insert into uiux_projects (title, description, media_type, media_url, tags, sort_order) values
  ('Food Delivery App UI', 'Mobile UI design for a food delivery app with onboarding, menu browsing, cart, and order tracking screens.', 'video', null, array['Mobile UI','UX Design'], 1),
  ('Finance Dashboard App', 'Mobile UI for a personal finance app with dashboard, transaction history, spending charts, and budget management.', 'video', null, array['Mobile UI','Dashboard'], 2),
  ('Fashion Store App UI', 'Mobile shopping experience for a fashion brand — product discovery, wishlist, size selection, and checkout flow.', 'video', null, array['Mobile UI','E-Commerce'], 3),
  ('Creative Portfolio App', 'Mobile portfolio app UI for creatives — gallery view, project details, contact integration, and smooth navigation.', 'video', null, array['Mobile UI','Portfolio'], 4)
on conflict do nothing;