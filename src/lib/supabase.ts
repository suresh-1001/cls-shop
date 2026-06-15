import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

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
