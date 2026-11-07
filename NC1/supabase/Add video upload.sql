-- Run this once. Adds the storage bucket + policies needed for the
-- "Upload from device" button in the Web Projects admin form (videos).
-- Safe to re-run.

insert into storage.buckets (id, name, public, file_size_limit)
values ('project-videos', 'project-videos', true, 104857600) -- 100MB cap
on conflict (id) do update set file_size_limit = 104857600;

drop policy if exists "public can view project videos" on storage.objects;
create policy "public can view project videos"
  on storage.objects for select
  to public
  using (bucket_id = 'project-videos');

drop policy if exists "authenticated can upload project videos" on storage.objects;
create policy "authenticated can upload project videos"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'project-videos');

drop policy if exists "authenticated can update project videos" on storage.objects;
create policy "authenticated can update project videos"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'project-videos');

drop policy if exists "authenticated can delete project videos" on storage.objects;
create policy "authenticated can delete project videos"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'project-videos');