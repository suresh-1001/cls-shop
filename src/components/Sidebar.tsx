'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Users, FileText, PlusCircle,
  Wrench, Package, Receipt
} from 'lucide-react'

const nav = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Customers', href: '/customers', icon: Users },
  { label: 'Estimates', href: '/estimates', icon: FileText },
  { label: 'New Estimate', href: '/new-estimate', icon: PlusCircle },
]

const coming = [
  { label: 'Jobs', icon: Wrench },
  { label: 'Inventory', icon: Package },
  { label: 'Invoices', icon: Receipt },
]

export default function Sidebar() {
  const path = usePathname()
  return (
    <aside className="w-48 min-h-screen bg-white border-r border-gray-100 flex flex-col">
      <div className="px-4 py-4 border-b border-gray-100">
        <div className="text-sm font-semibold text-gray-900">Clear Line Signs</div>
        <div className="text-xs text-gray-400 mt-0.5">Shop Management</div>
      </div>
      <nav className="p-2 flex-1">
        <div className="text-[10px] uppercase tracking-widest text-gray-400 px-2 py-2 mt-1">Main</div>
        {nav.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm mb-0.5 transition-colors ${
              path === href
                ? 'bg-gray-100 text-gray-900 font-medium'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
            }`}
          >
            <Icon size={15} />
            {label}
          </Link>
        ))}
        <div className="text-[10px] uppercase tracking-widest text-gray-400 px-2 py-2 mt-3">Coming soon</div>
        {coming.map(({ label, icon: Icon }) => (
          <div key={label} className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm text-gray-300 cursor-default mb-0.5">
            <Icon size={15} />
            {label}
          </div>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-100">
        <div className="text-xs text-gray-400">Phase 1 — Estimating</div>
      </div>
    </aside>
  )
}
