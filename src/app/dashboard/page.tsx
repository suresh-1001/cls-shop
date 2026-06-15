import Link from 'next/link'
import Badge from '@/components/Badge'
import { TrendingUp, FileText, DollarSign, BarChart2 } from 'lucide-react'

const stats = [
  { label: 'Open estimates', value: '7', sub: '3 awaiting response', icon: FileText },
  { label: 'Pending revenue', value: '$14,820', sub: 'Approved, not invoiced', icon: TrendingUp },
  { label: 'Paid this month', value: '$8,340', sub: '4 jobs completed', icon: DollarSign },
  { label: 'Avg margin', value: '52%', sub: 'Target: 50%', icon: BarChart2 },
]

const recent = [
  { num: '#0024', customer: 'Mercy Hospital', desc: 'Lobby wayfinding — 18 panels', total: '$6,200', deposit: '$3,100', status: 'approved', date: 'Jun 12' },
  { num: '#0023', customer: 'Valley Auto Group', desc: 'Fleet graphics — 6 vehicles', total: '$4,800', deposit: '$2,400', status: 'sent', date: 'Jun 11' },
  { num: '#0022', customer: 'Eastside Brewing', desc: 'Outdoor monument sign', total: '$3,820', deposit: '$1,910', status: 'draft', date: 'Jun 10' },
  { num: '#0021', customer: 'Sun Pacific Realty', desc: '12 yard signs + riders', total: '$960', deposit: '$480', status: 'paid', date: 'Jun 8' },
  { num: '#0020', customer: 'TechSpace Cowork', desc: 'Interior branding package', total: '$5,400', deposit: '$2,700', status: 'sent', date: 'Jun 7' },
]

export default function Dashboard() {
  return (
    <div>
      <div className="bg-white border-b border-gray-100 px-6 py-3.5 flex items-center justify-between">
        <h1 className="text-[15px] font-semibold">Dashboard</h1>
        <Link href="/new-estimate" className="text-sm px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
          + New estimate
        </Link>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-4 gap-3 mb-6">
          {stats.map(({ label, value, sub, icon: Icon }) => (
            <div key={label} className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500">{label}</span>
                <Icon size={14} className="text-gray-400" />
              </div>
              <div className="text-2xl font-semibold text-gray-900">{value}</div>
              <div className="text-xs text-gray-400 mt-1">{sub}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-medium">Recent estimates</h2>
            <Link href="/estimates" className="text-xs text-green-700 hover:underline">View all</Link>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {['#', 'Customer', 'Description', 'Total', 'Deposit', 'Status', 'Updated'].map(h => (
                  <th key={h} className="text-left text-xs text-gray-400 font-medium px-5 py-2.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recent.map(row => (
                <tr key={row.num} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 text-gray-400 text-xs">{row.num}</td>
                  <td className="px-5 py-3 font-medium">{row.customer}</td>
                  <td className="px-5 py-3 text-gray-500">{row.desc}</td>
                  <td className="px-5 py-3 font-medium">{row.total}</td>
                  <td className="px-5 py-3 text-gray-500">{row.deposit}</td>
                  <td className="px-5 py-3"><Badge status={row.status} /></td>
                  <td className="px-5 py-3 text-gray-400 text-xs">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
