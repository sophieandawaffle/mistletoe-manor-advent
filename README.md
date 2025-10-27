# Advent calendar web app

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/sophieaitchison13-gmailcoms-projects/v0-svg-hero-advent-calendar-web-app)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/EfHbSSujbIb)

## Overview

This repository will stay in sync with your deployed chats on [v0.app](https://v0.app).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.app](https://v0.app).

## Deployment

Your project is live at:

**[https://vercel.com/sophieaitchison13-gmailcoms-projects/v0-svg-hero-advent-calendar-web-app](https://vercel.com/sophieaitchison13-gmailcoms-projects/v0-svg-hero-advent-calendar-web-app)**

## Build your app

Continue building your app on:

**[https://v0.app/chat/projects/EfHbSSujbIb](https://v0.app/chat/projects/EfHbSSujbIb)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

## Supabase Integration Setup

This app uses Supabase for password-protected calendar access. Follow these steps to set up the database:

### 1. Run the Database Migration

The database schema is defined in `scripts/001-create-calendars-table.sql`. This creates:
- A `calendars` table to store order IDs and password hashes
- Row Level Security (RLS) policies for secure access

To run the migration, execute the SQL script in your Supabase project.

### 2. Environment Variables

The following environment variables are automatically configured through the Supabase integration:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key for admin operations

You also need to set:
- `WEBHOOK_SECRET` - Secret for validating webhook requests from Etsy
- `PASSWORD_SECRET` - Secret for password hashing (optional, uses crypto by default)

### 3. Webhook Setup

To automatically create calendar entries when orders are placed:

1. Set up a webhook endpoint at `/api/webhook/etsy-order`
2. Configure your e-commerce platform to send POST requests with:
   \`\`\`json
   {
     "orderId": "ORDER-123",
     "calendarId": "murder-mistletoe-manor",
     "password": "customer-password"
   }
   \`\`\`
3. Include the webhook signature in the `x-webhook-signature` header

**In your Make.com HTTP module:**

1. **URL:** `https://your-domain.com/api/webhook/etsy-order`
2. **Method:** POST
3. **Headers:**
   - Name: `Authorization`
   - Value: `Bearer YOUR_WEBHOOK_SECRET_HERE`
   - Name: `Content-Type`
   - Value: `application/json`
4. **Body (JSON):**
   \`\`\`json
   {
     "orderId": "{{etsyOrderId}}",
     "calendarId": "murder-at-mistletoe-manor",
     "password": "{{generatedPassword}}"
   }
   \`\`\`

Replace `YOUR_WEBHOOK_SECRET_HERE` with the same value you set in your `WEBHOOK_SECRET` environment variable.

### 4. Testing

Authentication is required to access the calendar. Users must enter their order ID and password to gain access.

### Security Notes

- Passwords are hashed using SHA-256 before storage
- Authentication uses HTTP-only cookies for session management
- Row Level Security (RLS) protects the database from unauthorized access
- The service role key should only be used in secure server-side contexts
