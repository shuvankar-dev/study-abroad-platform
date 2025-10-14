import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API_BASE = window.location.hostname === 'localhost'
  ? 'http://localhost/studyabroadplatform-api'
  : '/studyabroadplatform-api'

type RegistrationLead = {
  id: number
  first_name: string
  last_name: string
  email: string
  contact_no: string
  last_qualification: string
  english_test_status: string
  source: string
  ip_address: string
  user_agent: string
  created_at: string
}

type Pagination = {
  current_page: number
  per_page: number
  total: number
  total_pages: number
}

export default function AdminRegistrationLeads() {
  const navigate = useNavigate()
  const [leads, setLeads] = useState<RegistrationLead[]>([])
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
      const url = `${API_BASE}/api/registration_leads/list.php?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`
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
      setError(err.message || 'Failed to load registration leads')
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    navigate('/admin/login', { replace: true })
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
            <h1 className="text-xl font-semibold text-gray-900">Registration Leads</h1>
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
              placeholder="Search name, email..."
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
                  <th className="px-4 py-2 text-left">Phone</th>
                  <th className="px-4 py-2 text-left">Qualification</th>
                  <th className="px-4 py-2 text-left">English Test</th>
                  <th className="px-4 py-2 text-left">Source</th>
                  <th className="px-4 py-2 text-left">IP Address</th>
                  <th className="px-4 py-2 text-left">Created</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td className="px-4 py-6 text-center" colSpan={8}>Loading...</td></tr>
                ) : error ? (
                  <tr><td className="px-4 py-6 text-center text-red-600" colSpan={8}>{error}</td></tr>
                ) : leads.length === 0 ? (
                  <tr><td className="px-4 py-6 text-center text-gray-500" colSpan={8}>No registration leads found</td></tr>
                ) : (
                  leads.map(lead => (
                    <tr key={lead.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2">{lead.first_name} {lead.last_name}</td>
                      <td className="px-4 py-2">{lead.email}</td>
                      <td className="px-4 py-2">{lead.contact_no}</td>
                      <td className="px-4 py-2">{lead.last_qualification}</td>
                      <td className="px-4 py-2">{lead.english_test_status}</td>
                      <td className="px-4 py-2">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {lead.source}
                        </span>
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