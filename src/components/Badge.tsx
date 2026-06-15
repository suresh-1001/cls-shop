const styles: Record<string, string> = {
  draft:    'bg-gray-100 text-gray-600',
  sent:     'bg-blue-50 text-blue-700',
  approved: 'bg-green-50 text-green-700',
  paid:     'bg-emerald-50 text-emerald-800',
  lead:     'bg-amber-50 text-amber-700',
  active:   'bg-green-50 text-green-700',
  past:     'bg-gray-100 text-gray-500',
}

export default function Badge({ status }: { status: string }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${styles[status] ?? 'bg-gray-100 text-gray-600'}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}
