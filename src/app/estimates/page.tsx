'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Badge from '@/components/Badge'
import { Loader2, Plus } from 'lucide-react'

type EstimateLine = { line_total: number; quantity: number; unit_cost: number }
type Estimate = {
  id: string
  estimate_number: string
  description: string
  status: 'draft' | 'sent' | 'approved' | 'paid'
  customer?: { name: string; company: string | null } | null
  lines?: EstimateLine[]
}

export default function Estimates() {
  const [estimates, setEstimates] = useState<Estimate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'draft' | 'sent' | 'approved' | 'paid'>('all')

  useEffect(() => {
    fetch('/api/estimates')
      .then(async res => {
        if (!res.ok) throw new Error((await res.json()).error || 'Failed to load')
        return res.json()
      })
      .then(data => setEstimates(Array.isArray(data) ? data : []))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const fmt = (n: number) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

  const filtered = filter === 'all' ? estimates : estimates.filter(e => e.status === filter)
  const counts = {
    all: estimates.length,
    draft: estimates.filter(e => e.status === 'draft').length,
    sent: estimates.filter(e => e.status === 'sent').length,
    approved: estimates.filter(e => e.status === 'approved').length,
    paid: estimates.filter(e => e.status === 'paid').length,
  }

  return (
    <div>
      <div className="bg-white border-b border-gray-100 px-6 py-3.5 flex items-center justify-between">
        <h1 className="text-[15px] font-semibold">Estimates</h1>
        <Link href="/new-estimate" className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg bg-green-700 text-white hover:bg-green-800 transition-colors">
          <Plus size={14} /> New estimate
        </Link>
      </div>
      <div className="p-6">
        <div className="flex gap-2 mb-4">
          {([
            { key: 'all', label: 'All' },
            { key: 'draft', label: 'Draft' },
            { key: 'sent', label: 'Sent' },
            { key: 'approved', label: 'Approved' },
            { key: 'paid', label: 'Paid' },
          ] as const).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                filter === key ? 'bg-green-700 text-white border-green-700' : 'border-gray-200 text-gray-500 hover:bg-gray-50'
              }`}
            >
              {label} ({counts[key]})
            </button>
          ))}
        </div>
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-16 text-gray-400 gap-2">
              <Loader2 size={16} className="animate-spin" /> Loading estimates…
            </div>
          ) : error ? (
            <div className="p-6 text-sm text-red-600">Couldn't load estimates: {error}</div>
          ) : filtered.length === 0 ? (
            <div className="p-10 text-center text-sm text-gray-400">
              No estimates yet. Click "New estimate" to create your first one.
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {['#', 'Customer', 'Description', 'Total', 'Status'].map(h => (
                    <th key={h} className="text-left text-xs text-gray-400 font-medium px-5 py-2.5">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(e => {
                  const total = (e.lines || []).reduce((sum, l) => sum + Number(l.line_total || 0), 0)
                  return (
                    <tr key={e.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3 text-gray-400 text-xs">{e.estimate_number}</td>
                      <td className="px-5 py-3 font-medium">{e.customer?.company || e.customer?.name || '—'}</td>
                      <td className="px-5 py-3 text-gray-500">{e.description || '—'}</td>
                      <td className="px-5 py-3 font-semibold">{fmt(total)}</td>
                      <td className="px-5 py-3"><Badge status={e.status} /></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
