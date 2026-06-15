import Badge from '@/components/Badge'

const customers = [
  { name: 'Sandra Mejia', company: 'Mercy Hospital', phone: '(408) 555-0181', email: 'smejia@mercyhosp.org', type: 'active', estimates: 3 },
  { name: 'Derek Walsh', company: 'Valley Auto Group', phone: '(408) 555-0294', email: 'd.walsh@valleyauto.com', type: 'active', estimates: 5 },
  { name: 'Kira Patel', company: 'Eastside Brewing Co.', phone: '(408) 555-0317', email: 'kira@eastsidebrew.com', type: 'lead', estimates: 1 },
  { name: 'James Ortiz', company: 'Sun Pacific Realty', phone: '(408) 555-0443', email: 'james@sunpacific.com', type: 'active', estimates: 8 },
  { name: 'Priya Nair', company: 'TechSpace Cowork', phone: '(408) 555-0561', email: 'priya@techspacesjc.com', type: 'lead', estimates: 1 },
  { name: 'Tom Gallo', company: "Gallo's Italian Kitchen", phone: '(408) 555-0672', email: 'tom@gallos.com', type: 'past', estimates: 2 },
]

export default function Customers() {
  return (
    <div>
      <div className="bg-white border-b border-gray-100 px-6 py-3.5 flex items-center justify-between">
        <h1 className="text-[15px] font-semibold">Customers</h1>
        <button className="text-sm px-3 py-1.5 rounded-lg bg-green-700 text-white hover:bg-green-800 transition-colors">
          + Add customer
        </button>
      </div>
      <div className="p-6">
        <div className="flex gap-2 mb-4">
          {['All (12)', 'Leads (3)', 'Active (7)', 'Past (2)'].map((f, i) => (
            <button key={f} className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${i === 0 ? 'bg-green-700 text-white border-green-700' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
              {f}
            </button>
          ))}
        </div>
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {['Name', 'Company', 'Phone', 'Email', 'Status', 'Estimates'].map(h => (
                  <th key={h} className="text-left text-xs text-gray-400 font-medium px-5 py-2.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {customers.map(c => (
                <tr key={c.email} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 font-medium">{c.name}</td>
                  <td className="px-5 py-3 text-gray-600">{c.company}</td>
                  <td className="px-5 py-3 text-gray-500">{c.phone}</td>
                  <td className="px-5 py-3 text-gray-500">{c.email}</td>
                  <td className="px-5 py-3"><Badge status={c.type} /></td>
                  <td className="px-5 py-3 text-gray-500">{c.estimates}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
