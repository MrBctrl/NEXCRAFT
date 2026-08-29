-- NEXCRAFT admin + contact schema
-- Run this once in Supabase: Dashboard -> SQL Editor -> New Query -> paste -> Run

-- ============================================================
-- MESSAGES (contact form submissions)
-- Fields match protocol section 18 exactly.
-- ============================================================
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  whatsapp text,
  company text,
  project_type text,
  message text not null,
  status text not null default 'NEW' check (status in ('NEW','CONTACTED','IN PROGRESS','CLOSED','ARCHIVED')),
  created_at timestamptz not null default now()
);

alter table messages enable row level security;

-- Anyone (including logged-out visitors) can submit a message.
create policy "public can insert messages"
  on messages for insert
  to anon
  with check (true);

-- Only logged-in admins can read or update messages — protects visitor
-- contact details from being publicly queryable.
create policy "authenticated can read messages"
  on messages for select
  to authenticated
  using (true);

create policy "authenticated can update messages"
  on messages for update
  to authenticated
  using (true);


-- ============================================================
-- PORTFOLIO ITEMS (graphic design work — the homepage "Work" grid)
-- ============================================================
create table if not exists portfolio_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,           -- 'branding' | 'print' | 'mockup' | 'apparel'
  description text,
  image_url text not null,
  visible boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table portfolio_items enable row level security;

-- Public can see only visible items — this is what the live homepage reads.
create policy "public can read visible portfolio items"
  on portfolio_items for select
  to anon
  using (visible = true);

-- Admins can see everything (including hidden drafts) and manage it.
create policy "authenticated full access portfolio items"
  on portfolio_items for all
  to authenticated
  using (true)
  with check (true);


-- ============================================================
-- WEB PROJECTS (the "Others" supporting web work under Selected Work)
-- ============================================================
create table if not exists web_projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  url_label text,                   -- e.g. "yourusername.github.io/library-system"
  video_url text,
  tags text[] default '{}',
  github_url text,
  visible boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table web_projects enable row level security;

create policy "public can read visible web projects"
  on web_projects for select
  to anon
  using (visible = true);

create policy "authenticated full access web projects"
  on web_projects for all
  to authenticated
  using (true)
  with check (true);


-- ============================================================
-- SEED DATA — the portfolio items and web projects that already exist
-- on the live site as static data, so nothing disappears once the
-- frontend switches from static files to Supabase.
-- ============================================================
insert into portfolio_items (title, category, description, image_url, sort_order) values
  ('Fashion Collection Poster', 'print', 'Editorial Design', '/images/Fashion.png', 1),
  ('Beluxe Hairhub', 'branding', 'Logo & Brand Identity', '/images/Beluxe.jpg', 2),
  ('D''lip Therapy', 'print', 'Product Advertisement', '/images/Dlip 2.jpg', 3),
  ('Cafe Mockup', 'mockup', 'Packaging & Mockup', '/images/Brand mockup.png', 4),
  ('Cherryfield Schools Banner', 'print', 'Print Design', '/images/School Banner.jpg', 5),
  ('Cherryfield Hiring Flyer', 'branding', 'Print Design', '/images/school-hiring.png', 6),
  ('Velvet Nails Studio', 'print', 'Social Media Design', '/images/Velvet Nails.jpg', 7),
  ('Swaggy Xclusive', 'apparel', 'Apparel Design', '/images/Swaggy Fashion 2.jpg', 8),
  ('Marvelous Baptist Church', 'print', 'Event Print Design', '/images/churcu-flyer.jpg', 9),
  ('Valentine''s Design', 'print', 'Social Media Design', '/images/valentine.jpg', 10)
on conflict do nothing;

insert into web_projects (title, description, url_label, video_url, tags, github_url, sort_order) values
  ('Library Management System', 'Full web-based library system with book cataloguing, issuing/returning, admin dashboard, user registration and messaging. Built with PHP & MySQL.', 'yourusername.github.io/library-system', '/videos/Library-system.mp4', array['PHP','MySQL','XAMPP'], 'https://github.com/yourusername/library-management-system', 1),
  ('Student Portal', 'A complete student management portal with login, course management, results, and admin controls. Built for university environments.', 'yourusername.github.io/student-portal', null, array['PHP','MySQL','HTML/CSS'], 'https://github.com/yourusername/student-portal', 2),
  ('Restaurant Landing Page', 'A modern, responsive restaurant landing page featuring menu display, booking form, gallery section, and smooth animations throughout.', 'yourusername.github.io/restaurant', '/videos/Restaurant.mp4', array['HTML','CSS','JavaScript'], 'https://github.com/yourusername/restaurant-landing', 3),
  ('E-Commerce Store UI', 'A modern e-commerce product page UI with cart functionality, product filters, and smooth checkout flow. Fully responsive across all devices.', 'yourusername.github.io/ecommerce-ui', null, array['HTML','CSS','JavaScript'], 'https://github.com/yourusername/ecommerce-ui', 4)
on conflict do nothing;


-- ============================================================
-- PORTFOLIO IMAGE UPLOADS — lets the admin "Add New" form upload a
-- picture straight from a PC/phone instead of typing a path or URL.
-- Files land in this bucket and their public URL is what gets saved
-- into portfolio_items.image_url.
-- ============================================================
insert into storage.buckets (id, name, public)
values ('portfolio-images', 'portfolio-images', true)
on conflict (id) do nothing;

-- Anyone can view images (needed so the public homepage can display them).
create policy "public can view portfolio images"
  on storage.objects for select
  to public
  using (bucket_id = 'portfolio-images');

-- Only logged-in admins can upload, replace, or remove images.
create policy "authenticated can upload portfolio images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'portfolio-images');

create policy "authenticated can update portfolio images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'portfolio-images');

create policy "authenticated can delete portfolio images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'portfolio-images');
