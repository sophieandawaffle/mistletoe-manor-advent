-- Make password_hash optional to support passwordless authentication
-- This allows existing users with passwords to continue working,
-- while new users can authenticate with just their order ID

alter table public.calendars 
  alter column password_hash drop not null;

