import { createClient, SupabaseClient } from '@supabase/supabase-js'

export type Customer = {
  id: string
  name: string
  company: string | null
  email: string | null
  phone: string | null
  type: 'lead' | 'active' | 'past'
  created_at: string
}

export type Estimate = {
  id: string
  estimate_number: string
  customer_id: string
  customer?: Customer
  description: string
  status: 'draft' | 'sent' | 'approved' | 'paid'
  tax_rate: number
  deposit_pct: number
  notes: string | null
  valid_until: string | null
  created_at: string
  updated_at: string
  lines?: EstimateLine[]
}

export type EstimateLine = {
  id: string
  estimate_id: string
  description: string
  quantity: number
  unit_cost: number
  markup: number
  line_total: number
  sort_order: number
}

let _client: SupabaseClient | null = null

export function getSupabase(): SupabaseClient {
  if (_client) return _client
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) {
    throw new Error('Supabase env vars not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel.')
  }
  _client = createClient(url, key)
  return _client
}

// Keep named export for backwards compat — lazy getter
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return (getSupabase() as any)[prop]
  }
})
