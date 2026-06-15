-- CLS Shop Management — Phase 1 Schema
-- Run this in Supabase > SQL Editor

-- Customers
create table if not exists customers (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  company     text,
  email       text,
  phone       text,
  type        text not null default 'lead' check (type in ('lead', 'active', 'past')),
  notes       text,
  created_at  timestamptz default now()
);

-- Estimates
create table if not exists estimates (
  id               uuid primary key default gen_random_uuid(),
  estimate_number  text not null default 'DRAFT',
  customer_id      uuid references customers(id) on delete set null,
  description      text not null default '',
  status           text not null default 'draft' check (status in ('draft', 'sent', 'approved', 'paid')),
  tax_rate         numeric not null default 0.0925,
  deposit_pct      numeric not null default 0.50,
  notes            text,
  valid_until      date,
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);

-- Auto-number estimates
create sequence if not exists estimate_seq start 1000;

create or replace function set_estimate_number()
returns trigger language plpgsql as $$
begin
  new.estimate_number := '#' || nextval('estimate_seq')::text;
  return new;
end;
$$;

drop trigger if exists before_insert_estimate on estimates;
create trigger before_insert_estimate
  before insert on estimates
  for each row execute function set_estimate_number();

-- Estimate lines
create table if not exists estimate_lines (
  id           uuid primary key default gen_random_uuid(),
  estimate_id  uuid references estimates(id) on delete cascade,
  description  text not null,
  quantity     numeric not null default 1,
  unit_cost    numeric not null default 0,
  markup       numeric not null default 1.5,
  line_total   numeric generated always as (quantity * unit_cost * markup) stored,
  sort_order   integer not null default 0
);

-- Updated_at trigger
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

create trigger estimates_updated_at
  before update on estimates
  for each row execute function update_updated_at();

-- Row Level Security (enable after setting up auth)
-- alter table customers enable row level security;
-- alter table estimates enable row level security;
-- alter table estimate_lines enable row level security;
