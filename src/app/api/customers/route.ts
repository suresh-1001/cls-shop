import { NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const supabase = getSupabase()
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('name')
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 503 })
  }
}

export async function POST(req: Request) {
  try {
    const supabase = getSupabase()
    const body = await req.json()
    const { data, error } = await supabase
      .from('customers')
      .insert(body)
      .select()
      .single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 503 })
  }
}
