import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  const { data, error } = await supabase
    .from('estimates')
    .select('*, customer:customers(*), lines:estimate_lines(*)')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: Request) {
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
}
