import { NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const supabase = getSupabase()
    const { data, error } = await supabase
      .from('estimates')
      .select('*, customer:customers(*), lines:estimate_lines(*)')
      .order('created_at', { ascending: false })
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
    const { lines, ...estimate } = body

    const { data: est, error: estErr } = await supabase
      .from('estimates')
      .insert(estimate)
      .select()
      .single()

    if (estErr) return NextResponse.json({ error: estErr.message }, { status: 500 })

    if (lines?.length) {
      const linesWithId = lines.map((l: object, i: number) => ({
        ...l,
        estimate_id: est.id,
        sort_order: i,
      }))
      const { error: linesErr } = await supabase.from('estimate_lines').insert(linesWithId)
      if (linesErr) return NextResponse.json({ error: linesErr.message }, { status: 500 })
    }

    return NextResponse.json(est, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 503 })
  }
}
