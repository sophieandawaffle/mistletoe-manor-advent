-- Add unlock_all column to existing user_progress table (if migration 004 already ran)
-- This migration is safe to run even if the column already exists

alter table public.user_progress 
  add column if not exists unlock_all boolean not null default false;

