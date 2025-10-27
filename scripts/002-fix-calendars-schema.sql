-- Fix calendars table to support multiple orders per calendar
-- Change primary key from id (calendar) to order_id (unique per customer)

-- First, drop the existing table and recreate with correct schema
drop table if exists public.calendars;

-- Create calendars table with order_id as primary key
create table if not exists public.calendars (
  order_id text primary key,
  calendar_id text not null,
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
