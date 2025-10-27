-- Create calendars table to store order IDs and passwords
create table if not exists public.calendars (
  id text primary key,
  order_id text not null unique,
  password_hash text not null,
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.calendars enable row level security;

-- Allow anyone to read calendars (needed for password verification)
create policy "calendars_select_all"
  on public.calendars for select
  using (true);

-- Only allow inserts from service role (via webhook)
create policy "calendars_insert_service"
  on public.calendars for insert
  with check (false);
