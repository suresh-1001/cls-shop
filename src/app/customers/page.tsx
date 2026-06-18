'use client'
import { useEffect, useState, FormEvent } from 'react'
import Badge from '@/components/Badge'
import { Plus, X, Loader2 } from 'lucide-react'

type Customer = {
  id: string
  name: string
  company: string | null
  email: string | null
  phone: string | null
  type: 'lead' | 'active' | 'past'
}

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'lead' | 'active' | 'past'>('all')
  const [showModal, setShowModal] = useState(false)
  const [saving, setSaving] = useState(false)

  async function load() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/customers')
      if (!res.ok) throw new Error((await res.json()).error || 'Failed to load')
      const data = await res.json()
      setCustomers(data)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const filtered = filter === 'all' ? customers : customers.filter(c => c.type === filter)
  const counts = {
    all: customers.length,
    lead: customers.filter(c => c.type === 'lead').length,
    active: customers.filter(c => c.type === 'active').length,
    past: customers.filter(c => c.type === 'past').length,
  }

  async function handleAdd(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    const form = new FormData(e.currentTarget)
    const body = {
      name: form.get('name'),
      company: form.get('company') || null,
      email: form.get('email') || null,
      phone: form.get('phone') || null,
      type: form.get('type'),
    }
    try {
      const res = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error((await res.json()).error || 'Failed to save')
      setShowModal(false)
      await load()
    } catch (e: any) {
      alert(e.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <div className="bg-white border-b border-gray-100 px-6 py-3.5 flex items-center justify-between">
        <h1 className="text-[15px] font-semibold">Customers</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg bg-green-700 text-white hover:bg-green-800 transition-colors"
        >
          <Plus size={14} /> Add customer
        </button>
      </div>

      <div className="p-6">
        <div className="flex gap-2 mb-4">
          {([
            { key: 'all', label: 'All' },
            { key: 'lead', label: 'Leads' },
            { key: 'active', label: 'Active' },
            { key: 'past', label: 'Past' },
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
              <Loader2 size={16} className="animate-spin" /> Loading customers…
            </div>
          ) : error ? (
            <div className="p-6 text-sm text-red-600">
              Couldn't load customers: {error}
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-10 text-center text-sm text-gray-400">
              No customers yet. Click "Add customer" to create your first one.
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {['Name', 'Company', 'Phone', 'Email', 'Status'].map(h => (
                    <th key={h} className="text-left text-xs text-gray-400 font-medium px-5 py-2.5">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(c => (
                  <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 font-medium">{c.name}</td>
                    <td className="px-5 py-3 text-gray-600">{c.company || '—'}</td>
                    <td className="px-5 py-3 text-gray-500">{c.phone || '—'}</td>
                    <td className="px-5 py-3 text-gray-500">{c.email || '—'}</td>
                    <td className="px-5 py-3"><Badge status={c.type} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold">Add customer</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAdd} className="space-y-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Name *</label>
                <input name="name" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-600" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Company</label>
                <input name="company" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-600" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Phone</label>
                  <input name="phone" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-600" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Email</label>
                  <input name="email" type="email" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-600" />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Status</label>
                <select name="type" defaultValue="lead" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-600">
                  <option value="lead">Lead</option>
                  <option value="active">Active</option>
                  <option value="past">Past</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={saving}
                className="w-full bg-green-700 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-green-800 transition-colors disabled:opacity-60 mt-2"
              >
                {saving ? 'Saving…' : 'Save customer'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
