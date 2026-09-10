-- Migrates uiux_projects from a single media_url (text) to media_urls
-- (text array), so each project can hold multiple pictures — same idea
-- as the multi-shot carousels on the flagship world pages.
-- Safe to run once; running it again is harmless (checks before acting).

-- Add the new array column if it isn't there yet.
alter table uiux_projects add column if not exists media_urls text[] default '{}';

-- Carry over any existing single media_url values into the new array
-- column, so nothing already saved disappears.
update uiux_projects
set media_urls = array[media_url]
where media_url is not null
  and (media_urls is null or media_urls = '{}');

-- Drop the old column now that everything's migrated.
alter table uiux_projects drop column if exists media_url;