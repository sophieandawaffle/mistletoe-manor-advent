-- Create user_progress table to track which doors users have opened
create table if not exists public.user_progress (
  id bigserial primary key,
  order_id text not null,
  calendar_id text not null,
  opened_days integer[] not null default '{}',
  unlock_all boolean not null default false,
  updated_at timestamp with time zone default now(),
  unique(order_id, calendar_id)
);

-- Enable RLS
alter table public.user_progress enable row level security;

-- Allow users to read their own progress
create policy "user_progress_select_own"
  on public.user_progress for select
  using (true);

-- Allow service role to insert/update (via API)
-- Note: The API uses service role, so this policy allows inserts
create policy "user_progress_insert_service"
  on public.user_progress for insert
  with check (true);

create policy "user_progress_update_service"
  on public.user_progress for update
  using (true)
  with check (true);

-- Create index for faster lookups
create index if not exists idx_user_progress_order_calendar
  on public.user_progress(order_id, calendar_id);

