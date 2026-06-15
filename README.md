# CLS Shop — Clear Line Signs Management System

Phase 1: Estimating + Customer Management

## Stack
- **Next.js 15** (App Router)
- **Tailwind CSS v4**
- **Supabase** (Postgres + Auth)
- **Vercel** (hosting + API routes)

## Quick Start

### 1. Clone and install
```bash
git clone https://github.com/YOUR_USERNAME/cls-shop.git
cd cls-shop
npm install
```

### 2. Set up Supabase
1. Create a project at [supabase.com](https://supabase.com)
2. Go to SQL Editor → paste and run `supabase-schema.sql`
3. Copy your project URL and anon key from Project Settings → API

### 3. Configure environment
```bash
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials
```

### 4. Run locally
```bash
npm run dev
# http://localhost:3000
```

### 5. Deploy to Vercel
```bash
# Push to GitHub, then import at vercel.com
# Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
# in Vercel project settings → Environment Variables
```

## Roadmap
- **Phase 1** ✅ Estimating + customers
- **Phase 2** — Jobs / production board + proof status
- **Phase 3** — Inventory + material costs
- **Phase 4** — Invoicing + Stripe/Wave integration
