'use client'
import { useState, useCallback } from 'react'
import { Trash2, Plus, Save, FileText, Mail, Sparkles } from 'lucide-react'

const MATERIALS = [
  { label: '3M Vinyl — 48" roll (per ft)', cost: 14 },
  { label: 'Cast vinyl — 54" roll (per ft)', cost: 22 },
  { label: 'Coroplast 4×8 sheet', cost: 85 },
  { label: 'Aluminum composite 4×8', cost: 180 },
  { label: 'Acrylic sheet ¼" 4×8', cost: 320 },
  { label: 'Banner material (per sq ft)', cost: 4.5 },
  { label: 'Labor (custom rate)', cost: 95 },
]

const CUSTOMERS = [
  'Mercy Hospital — Sandra Mejia',
  'Valley Auto Group — Derek Walsh',
  'Eastside Brewing Co. — Kira Patel',
  'Sun Pacific Realty — James Ortiz',
  'TechSpace Cowork — Priya Nair',
]

type Line = {
  id: number
  description: string
  qty: number
  unitCost: number
  markup: number
}

const defaultLines: Line[] = [
  { id: 1, description: 'Design / setup fee', qty: 1, unitCost: 120, markup: 1.75 },
  { id: 2, description: 'Installation labor (est. 4 hrs)', qty: 4, unitCost: 95, markup: 1.5 },
]

let nextId = 3

export default function NewEstimate() {
  const [lines, setLines] = useState<Line[]>(defaultLines)
  const [status, setStatus] = useState('draft')
  const [saved, setSaved] = useState(false)

  const updateLine = useCallback((id: number, field: keyof Line, value: string | number) => {
    setLines(prev => prev.map(l => l.id === id ? { ...l, [field]: value } : l))
  }, [])

  const addLine = () => {
    setLines(prev => [...prev, { id: nextId++, description: '', qty: 1, unitCost: 0, markup: 1.5 }])
  }

  const removeLine = (id: number) => {
    setLines(prev => prev.filter(l => l.id !== id))
  }

  const lineTotal = (l: Line) => l.qty * l.unitCost * l.markup
  const subtotal = lines.reduce((sum, l) => sum + lineTotal(l), 0)
  const tax = subtotal * 0.0925
  const total = subtotal + tax
  const deposit = total * 0.5
  const cost = lines.reduce((sum, l) => sum + l.qty * l.unitCost, 0)
  const margin = cost > 0 ? Math.round(((subtotal - cost) / subtotal) * 100) : 0

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const fmt = (n: number) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

  return (
    <div>
      <div className="bg-white border-b border-gray-100 px-6 py-3.5 flex items-center justify-between">
        <h1 className="text-[15px] font-semibold">New Estimate</h1>
        <span className="text-xs text-gray-400">#0025 — Draft</span>
      </div>

      <div className="p-6 grid grid-cols-[1fr_320px] gap-5">
        {/* LEFT COLUMN */}
        <div className="space-y-5">
          {/* Customer */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h2 className="text-sm font-medium mb-3">Customer</h2>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Customer</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-600">
                  <option>Select or add new…</option>
                  {CUSTOMERS.map(c => <option key={c}>{c}</option>)}
                  <option>+ Add new customer</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Job description</label>
                <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-600" placeholder="e.g. Exterior channel letters" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Valid until</label>
                <input type="date" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-600" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Status</label>
                <select value={status} onChange={e => setStatus(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-600">
                  <option value="draft">Draft</option>
                  <option value="sent">Sent to customer</option>
                  <option value="approved">Approved</option>
                  <option value="paid">Paid / closed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Line Items */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h2 className="text-sm font-medium mb-3">Line items</h2>
            <div className="grid grid-cols-[2fr_60px_90px_100px_90px_36px] gap-2 mb-1.5 px-1">
              {['Item / material', 'Qty', 'Unit cost', 'Markup', 'Total', ''].map(h => (
                <span key={h} className="text-xs text-gray-400">{h}</span>
              ))}
            </div>

            <div className="space-y-2">
              {lines.map(line => (
                <div key={line.id} className="grid grid-cols-[2fr_60px_90px_100px_90px_36px] gap-2 items-center">
                  <input
                    value={line.description}
                    onChange={e => updateLine(line.id, 'description', e.target.value)}
                    placeholder="Description"
                    list="materials"
                    className="border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-green-600"
                  />
                  <input
                    type="number"
                    value={line.qty}
                    onChange={e => updateLine(line.id, 'qty', parseFloat(e.target.value) || 0)}
                    className="border border-gray-200 rounded-lg px-2 py-1.5 text-xs text-center focus:outline-none focus:ring-1 focus:ring-green-600"
                  />
                  <input
                    type="number"
                    value={line.unitCost || ''}
                    onChange={e => updateLine(line.id, 'unitCost', parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                    className="border border-gray-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-green-600"
                  />
                  <select
                    value={line.markup}
                    onChange={e => updateLine(line.id, 'markup', parseFloat(e.target.value))}
                    className="border border-gray-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-green-600"
                  >
                    <option value={1}>No markup</option>
                    <option value={1.25}>25%</option>
                    <option value={1.5}>50%</option>
                    <option value={1.75}>75%</option>
                    <option value={2}>100%</option>
                  </select>
                  <div className="border border-gray-100 bg-gray-50 rounded-lg px-2 py-1.5 text-xs text-right font-medium">
                    {fmt(lineTotal(line))}
                  </div>
                  <button onClick={() => removeLine(line.id)} className="flex items-center justify-center w-8 h-8 rounded-lg border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors">
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>

            <datalist id="materials">
              {MATERIALS.map(m => <option key={m.label} value={m.label} />)}
            </datalist>

            <button onClick={addLine} className="mt-3 flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 border border-dashed border-gray-200 rounded-lg px-3 py-2 w-full justify-center hover:bg-gray-50 transition-colors">
              <Plus size={13} /> Add line item
            </button>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h2 className="text-sm font-medium mb-3">Customer-facing notes</h2>
            <textarea
              rows={3}
              placeholder="Appears on the estimate PDF…"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-600 resize-none"
            />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-4">
          {/* Totals */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h2 className="text-sm font-medium mb-3">Totals</h2>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
              <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
              <div className="flex justify-between text-gray-600"><span>Tax (9.25%)</span><span>{fmt(tax)}</span></div>
              <div className="flex justify-between font-semibold text-gray-900 pt-2 border-t border-gray-200 mt-2">
                <span>Total</span><span>{fmt(total)}</span>
              </div>
              <div className="flex justify-between text-green-700 font-medium pt-1">
                <span>Deposit (50%)</span><span>{fmt(deposit)}</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-500 mb-1">Estimated margin</div>
              <div className={`text-2xl font-semibold ${margin >= 45 ? 'text-green-700' : margin >= 30 ? 'text-amber-600' : 'text-red-600'}`}>
                {margin}%
              </div>
              <div className="text-xs text-gray-400 mt-0.5">Cost: {fmt(cost)} → Sell: {fmt(subtotal)}</div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <button
              onClick={handleSave}
              className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${saved ? 'bg-green-700 text-white' : 'bg-green-700 text-white hover:bg-green-800'}`}
            >
              <Save size={15} />
              {saved ? 'Saved!' : 'Save estimate'}
            </button>
            <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm border border-gray-200 hover:bg-gray-50 transition-colors">
              <FileText size={15} className="text-gray-500" /> Generate PDF
            </button>
            <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm border border-gray-200 hover:bg-gray-50 transition-colors">
              <Mail size={15} className="text-gray-500" /> Send to customer
            </button>
            <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm border border-dashed border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
              <Sparkles size={15} /> AI pricing check
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
