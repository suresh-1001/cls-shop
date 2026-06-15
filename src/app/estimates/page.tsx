import Link from 'next/link'
import Badge from '@/components/Badge'

const estimates = [
  { num: '#0024', customer: 'Mercy Hospital', desc: 'Lobby wayfinding', materials: '$1,840', labor: '$1,200', total: '$6,200', status: 'approved' },
  { num: '#0023', customer: 'Valley Auto Group', desc: 'Fleet graphics ×6', materials: '$1,200', labor: '$960', total: '$4,800', status: 'sent' },
  { num: '#0022', customer: 'Eastside Brewing', desc: 'Monument sign', materials: '$940', labor: '$780', total: '$3,820', status: 'draft' },
  { num: '#0021', customer: 'Sun Pacific Realty', desc: 'Yard signs + riders', materials: '$280', labor: '$160', total: '$960', status: 'paid' },
  { num: '#0020', customer: 'TechSpace Cowork', desc: 'Interior branding pkg', materials: '$1,600', labor: '$1,400', total: '$5,400', status: 'sent' },
]

export default function Estimates() {
  return (
    <div>
      <div className="bg-white border-b border-gray-100 px-6 py-3.5 flex items-center justify-between">
        <h1 className="text-[15px] font-semibold">Estimates</h1>
        <Link href="/new-estimate" className="text-sm px-3 py-1.5 rounded-lg bg-green-700 text-white hover:bg-green-800 transition-colors">
          + New estimate
        </Link>
      </div>
      <div className="p-6">
        <div className="flex gap-2 mb-4">
          {['All (14)', 'Draft (4)', 'Sent (5)', 'Approved (3)', 'Paid (2)'].map((f, i) => (
            <button key={f} className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${i === 0 ? 'bg-green-700 text-white border-green-700' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
              {f}
            </button>
          ))}
        </div>
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {['#', 'Customer', 'Description', 'Materials', 'Labor', 'Total', 'Status', ''].map(h => (
                  <th key={h} className="text-left text-xs text-gray-400 font-medium px-5 py-2.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {estimates.map(e => (
                <tr key={e.num} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 text-gray-400 text-xs">{e.num}</td>
                  <td className="px-5 py-3 font-medium">{e.customer}</td>
                  <td className="px-5 py-3 text-gray-500">{e.desc}</td>
                  <td className="px-5 py-3 text-gray-500">{e.materials}</td>
                  <td className="px-5 py-3 text-gray-500">{e.labor}</td>
                  <td className="px-5 py-3 font-semibold">{e.total}</td>
                  <td className="px-5 py-3"><Badge status={e.status} /></td>
                  <td className="px-5 py-3"><Link href="/new-estimate" className="text-xs text-green-700 hover:underline">Open</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
