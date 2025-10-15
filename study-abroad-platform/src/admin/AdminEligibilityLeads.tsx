import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API_BASE = window.location.hostname === 'localhost'
  ? 'http://localhost/studyabroadplatform-api'
  : '/studyabroadplatform-api'

type EligibilityLead = {
  id: number
  test_status: string
  exam_type: string
  score_percentage: string
  email: string
  full_name: string
  phone: string
  country: string
  university_preference: string
  ip_address: string
  user_agent: string
  source: string
  created_at: string
}

type Pagination = {
  current_page: number
  per_page: number
  total: number
  total_pages: number
}

export default function AdminEligibilityLeads() {
  const navigate = useNavigate()
  const [leads, setLeads] = useState<EligibilityLead[]>([])
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
  }, [page, limit, token, navigate])

  const fetchLeads = async () => {
    setLoading(true)
    setError(null)
    try {
      const url = `${API_BASE}/api/eligibility_checks/list.php?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`
      const res = await fetch(url)
      
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`)
      }

      const text = await res.text()
      let data: any = null
      try { 
        data = JSON.parse(text) 
      } catch {
        throw new Error(`Invalid server response: ${text}`)
      }
      
      if (!data?.success) {
        throw new Error(data?.message || 'Failed to fetch leads')
      }
      
      setLeads(data.data || [])
      setPagination(data.pagination || null)
    } catch (err: any) {
      setError(err.message || 'Failed to load eligibility leads')
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    navigate('/admin/login', { replace: true })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/admin')}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to Dashboard
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Eligibility Check Leads</h1>
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
        {/* Search and Filters */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              placeholder="Search name, email, exam type, country..."
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { setPage(1); fetchLeads() }}}
            />
            <select
              value={limit}
              onChange={(e) => { setLimit(parseInt(e.target.value)); setPage(1) }}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value={15}>15</option>
              <option value={30}>30</option>
              <option value={60}>60</option>
              <option value={100}>100</option>
            </select>
            <button
              onClick={() => { setPage(1); fetchLeads() }}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2"
            >
              Search
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          {error && (
            <div className="p-4 text-sm text-red-600 bg-red-50 border-b border-red-200">
              {error}
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-900">Name</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-900">Email</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-900">Phone</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-900">Test Status</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-900">Exam Type</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-900">Score %</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-900">Country</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-900">University</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-900">Source</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-900">Date</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td className="px-4 py-6 text-center" colSpan={10}>Loading...</td></tr>
                ) : leads.length === 0 ? (
                  <tr><td className="px-4 py-6 text-center text-gray-500" colSpan={10}>No eligibility leads found</td></tr>
                ) : (
                  leads.map(lead => (
                    <tr key={lead.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{lead.full_name}</td>
                      <td className="px-4 py-3">{lead.email}</td>
                      <td className="px-4 py-3">{lead.phone}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          lead.test_status === 'completed' ? 'bg-green-100 text-green-800' :
                          lead.test_status === 'planned' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {lead.test_status}
                        </span>
                      </td>
                      <td className="px-4 py-3">{lead.exam_type}</td>
                      <td className="px-4 py-3">{lead.score_percentage}</td>
                      <td className="px-4 py-3">{lead.country}</td>
                      <td className="px-4 py-3">{lead.university_preference}</td>
                      <td className="px-4 py-3 text-xs">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {lead.source}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500">{formatDate(lead.created_at)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination && pagination.total_pages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t">
              <div className="text-sm text-gray-600">
                Page {pagination.current_page} of {pagination.total_pages} • {pagination.total} leads
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="px-3 py-1.5 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage(p => (pagination ? Math.min(pagination.total_pages, p + 1) : p + 1))}
                  disabled={pagination && page >= pagination.total_pages}
                  className="px-3 py-1.5 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
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