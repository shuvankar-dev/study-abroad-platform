import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API_BASE = window.location.hostname === 'localhost'
  ? 'http://localhost/studyabroadplatform-api'
  : '/studyabroadplatform-api'

type AccommodationLead = {
  id: number
  full_name: string
  country: string
  university: string
  budget_range: string
  accommodation_type: string
  email: string
  additional_notes: string
  ip_address: string
  created_at: string
}

type Pagination = {
  current_page: number
  per_page: number
  total: number
  total_pages: number
}

export default function AdminAccommodationLeads() {
  const navigate = useNavigate()
  const [leads, setLeads] = useState<AccommodationLead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(30)
  const [search, setSearch] = useState('')
  const [pagination, setPagination] = useState<Pagination | null>(null)

  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null
  const user = typeof window !== 'undefined' ? localStorage.getItem('admin_user') : null

  useEffect(() => {
    if (!token) {
      navigate('/admin/login', { replace: true })
      return
    }
    fetchLeads()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit])

  const fetchLeads = async () => {
    setLoading(true)
    setError(null)
    try {
      const url = `${API_BASE}/api/accommodation_leads/list.php?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const text = await res.text()
      let data: any = null
      try { data = JSON.parse(text) } catch {
        throw new Error(`Invalid server response: ${text}`)
      }
      if (!res.ok || !data?.success) throw new Error(data?.message || `HTTP ${res.status}`)
      setLeads(data.data || [])
      setPagination(data.pagination || null)
    } catch (err: any) {
      setError(err.message || 'Failed to load accommodation leads')
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    navigate('/admin/login', { replace: true })
  }

  const getBudgetBadgeColor = (budget: string) => {
    if (!budget) return 'bg-gray-100 text-gray-800'
    if (budget.includes('under-500')) return 'bg-green-100 text-green-800'
    if (budget.includes('500-800')) return 'bg-blue-100 text-blue-800'
    if (budget.includes('800-1200')) return 'bg-yellow-100 text-yellow-800'
    if (budget.includes('1200-1500')) return 'bg-orange-100 text-orange-800'
    if (budget.includes('over-1500')) return 'bg-red-100 text-red-800'
    return 'bg-gray-100 text-gray-800'
  }

  const getTypeBadgeColor = (type: string) => {
    if (!type) return 'bg-gray-100 text-gray-800'
    if (type === 'shared') return 'bg-blue-100 text-blue-800'
    if (type === 'private') return 'bg-purple-100 text-purple-800'
    if (type === 'studio') return 'bg-green-100 text-green-800'
    if (type === 'on-campus') return 'bg-orange-100 text-orange-800'
    return 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin')}
              className="text-gray-600 hover:text-gray-900"
            >
              ← Back to Dashboard
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Accommodation Leads</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 hidden sm:block">
              {user ? JSON.parse(user).email : ''}
            </span>
            <button onClick={logout} className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Filters */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              placeholder="Search name, email, country, university..."
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
              onKeyDown={(e)=>{ if (e.key==='Enter') { setPage(1); fetchLeads() }}}
            />
            <select
              value={limit}
              onChange={(e)=>{ setLimit(parseInt(e.target.value)); setPage(1) }}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value={15}>15</option>
              <option value={30}>30</option>
              <option value={60}>60</option>
              <option value={100}>100</option>
            </select>
            <button
              onClick={()=>{ setPage(1); fetchLeads() }}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2"
            >
              Search
            </button>
          </div>
        </div>

        {/* List */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Country</th>
                  <th className="px-4 py-2 text-left">University</th>
                  <th className="px-4 py-2 text-left">Budget</th>
                  <th className="px-4 py-2 text-left">Type</th>
                  <th className="px-4 py-2 text-left">Notes</th>
                  <th className="px-4 py-2 text-left">IP</th>
                  <th className="px-4 py-2 text-left">Created</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td className="px-4 py-6 text-center" colSpan={9}>Loading...</td></tr>
                ) : error ? (
                  <tr><td className="px-4 py-6 text-center text-red-600" colSpan={9}>{error}</td></tr>
                ) : leads.length === 0 ? (
                  <tr><td className="px-4 py-6 text-center text-gray-500" colSpan={9}>No accommodation leads found</td></tr>
                ) : (
                  leads.map(lead => (
                    <tr key={lead.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2 font-medium">{lead.full_name}</td>
                      <td className="px-4 py-2">{lead.email}</td>
                      <td className="px-4 py-2">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {lead.country}
                        </span>
                      </td>
                      <td className="px-4 py-2">{lead.university || '-'}</td>
                      <td className="px-4 py-2">
                        {lead.budget_range ? (
                          <span className={`text-xs px-2 py-1 rounded ${getBudgetBadgeColor(lead.budget_range)}`}>
                            {lead.budget_range.replace('-', ' - ').replace('under-', '< $').replace('over-', '> $')}
                          </span>
                        ) : '-'}
                      </td>
                      <td className="px-4 py-2">
                        {lead.accommodation_type ? (
                          <span className={`text-xs px-2 py-1 rounded ${getTypeBadgeColor(lead.accommodation_type)}`}>
                            {lead.accommodation_type}
                          </span>
                        ) : '-'}
                      </td>
                      <td className="px-4 py-2 max-w-xs">
                        {lead.additional_notes ? (
                          <div className="truncate" title={lead.additional_notes}>
                            {lead.additional_notes}
                          </div>
                        ) : '-'}
                      </td>
                      <td className="px-4 py-2">
                        <span className="text-xs text-gray-600">
                          {lead.ip_address}
                        </span>
                      </td>
                      <td className="px-4 py-2">{new Date(lead.created_at).toLocaleString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination && pagination.total_pages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50">
              <div className="text-sm text-gray-600">
                Page {pagination.current_page} of {pagination.total_pages} • {pagination.total} leads
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={()=>setPage(p=>Math.max(1, p-1))}
                  disabled={page<=1}
                  className="px-3 py-1.5 border rounded-md disabled:opacity-50"
                >
                  Prev
                </button>
                <button
                  onClick={()=>setPage(p=> (pagination ? Math.min(pagination.total_pages, p+1) : p+1))}
                  disabled={pagination && page>=pagination.total_pages}
                  className="px-3 py-1.5 border rounded-md disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}