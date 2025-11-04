import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE = window.location.hostname === 'localhost'
  ? 'http://localhost/studyabroadplatform-api'
  : '/studyabroadplatform-api'

// type Lead = {
//   id: number
//   name: string
//   email: string
//   phone: string
//   country: string
//   course_id: number
//   course_title: string
//   university_name: string
//   message?: string
//   lead_source: string
//   status: 'new'|'contacted'|'qualified'|'converted'|'closed'
//   priority: 'low'|'medium'|'high'
//   created_at: string
// }

type LeadCounts = {
  registration: number
  accommodation: number
  eligibility: number
  learnMore: number
  authors: number
  blog: number
  total: number
}

type NewLeadCounts = {
  registration: number
  accommodation: number
  eligibility: number
  learnMore: number
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [leadCounts, setLeadCounts] = useState<LeadCounts>({
    registration: 0,
    accommodation: 0,
    eligibility: 0,
    learnMore: 0,
    authors: 0,
    blog: 0,
    total: 0
  })
  const [newLeadCounts, setNewLeadCounts] = useState<NewLeadCounts>({
    registration: 0,
    accommodation: 0,
    eligibility: 0,
    learnMore: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null
  const user = typeof window !== 'undefined' ? localStorage.getItem('admin_user') : null

  useEffect(() => {
    if (!token) {
      navigate('/admin/login', { replace: true })
      return
    }
    fetchLeadCounts()
    
    // Set up auto-refresh every 30 seconds for real-time updates
    const interval = setInterval(() => {
      fetchLeadCounts()
    }, 30000)
    
    return () => clearInterval(interval)
  }, [token, navigate])

  const fetchLeadCounts = async () => {
    setLoading(true)
    setError(null)
    try {
      const counts: LeadCounts = {
        registration: 0,
        accommodation: 0,
        eligibility: 0,
        learnMore: 0,
        authors: 0,
        blog: 0,
        total: 0
      }

      // Get previous counts from localStorage to calculate new leads
      const previousCounts = JSON.parse(localStorage.getItem('admin_previous_counts') || '{"registration":0,"accommodation":0,"eligibility":0,"learnMore":0}')

      // Fetch registration leads count from registrationleads table
      try {
        const regUrl = `${API_BASE}/api/registration_leads/count.php`
        const regRes = await fetch(regUrl, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (regRes.ok) {
          const regData = await regRes.json()
          if (regData?.success) {
            counts.registration = regData.count || 0
            counts.total += counts.registration
          }
        }
      } catch (regError) {
        console.warn('Failed to fetch registration leads count:', regError)
      }

      // Fetch accommodation leads count from accommodation_leads table
      try {
        const accomUrl = `${API_BASE}/api/accommodation_leads/count.php`
        const accomRes = await fetch(accomUrl, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (accomRes.ok) {
          const accomData = await accomRes.json()
          if (accomData?.success) {
            counts.accommodation = accomData.count || 0
            counts.total += counts.accommodation
          }
        } else {
          console.warn('Accommodation leads API not available')
        }
      } catch (accomError) {
        console.warn('Failed to fetch accommodation leads count:', accomError)
      }

      // Fetch eligibility checks count from eligibility_checks table
      try {
        const eligibilityUrl = `${API_BASE}/api/eligibility_checks/count.php`
        const eligibilityRes = await fetch(eligibilityUrl, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (eligibilityRes.ok) {
          const eligibilityData = await eligibilityRes.json()
          if (eligibilityData?.success) {
            counts.eligibility = eligibilityData.count || 0
            counts.total += counts.eligibility
          }
        } else {
          console.warn('Eligibility checks API not available')
        }
      } catch (eligibilityError) {
        console.warn('Failed to fetch eligibility checks count:', eligibilityError)
      }

      // Fetch other leads from main leads table (Learn More only)
      try {
        // Use the new count endpoint instead of list
        const url = `${API_BASE}/api/leads/count.php`
        console.log('Fetching Learn More leads count from:', url)
        const res = await fetch(url)
        
        console.log('Learn More leads response status:', res.status)
        if (res.ok) {
          const text = await res.text()
          console.log('Learn More leads response text:', text)
          try {
            const data = JSON.parse(text)
            console.log('Learn More leads parsed data:', data)
            if (data?.success && typeof data?.count === 'number') {
              counts.learnMore = data.count
              console.log('Learn More count set to:', counts.learnMore)
            }
          } catch (parseError) {
            console.error('Failed to parse leads count:', parseError)
          }
        } else {
          const errorText = await res.text()
          console.error('Leads count API returned error:', res.status, errorText)
        }
      } catch (leadsError) {
        console.error('Failed to fetch leads count:', leadsError)
      }

      // Fetch authors count
      try {
        const authorsUrl = `${API_BASE}/api/authors/count.php`
        const authorsRes = await fetch(authorsUrl)
        if (authorsRes.ok) {
          const authorsData = await authorsRes.json()
          if (authorsData?.success) {
            counts.authors = authorsData.count || 0
          }
        } else {
          console.warn('Authors API not available')
        }
      } catch (authorsError) {
        console.warn('Failed to fetch authors count:', authorsError)
      }

      // Fetch blog count
      try {
        const blogUrl = `${API_BASE}/api/blog/count.php`
        const blogRes = await fetch(blogUrl)
        if (blogRes.ok) {
          const blogData = await blogRes.json()
          if (blogData?.success) {
            counts.blog = blogData.count || 0
          }
        } else {
          console.warn('Blog API not available')
        }
      } catch (blogError) {
        console.warn('Failed to fetch blog count:', blogError)
      }

      setLeadCounts(counts)
      
      // Calculate new leads by comparing with previous counts
      const newCounts: NewLeadCounts = {
        registration: Math.max(0, counts.registration - previousCounts.registration),
        accommodation: Math.max(0, counts.accommodation - previousCounts.accommodation),
        eligibility: Math.max(0, counts.eligibility - previousCounts.eligibility),
        learnMore: Math.max(0, counts.learnMore - previousCounts.learnMore)
      }
      setNewLeadCounts(newCounts)
      
      // Store current counts for next comparison (only if this is not the first load)
      if (localStorage.getItem('admin_previous_counts')) {
        localStorage.setItem('admin_previous_counts', JSON.stringify({
          registration: counts.registration,
          accommodation: counts.accommodation,
          eligibility: counts.eligibility,
          learnMore: counts.learnMore
        }))
      } else {
        // First time loading, set current counts as baseline
        localStorage.setItem('admin_previous_counts', JSON.stringify({
          registration: counts.registration,
          accommodation: counts.accommodation,
          eligibility: counts.eligibility,
          learnMore: counts.learnMore
        }))
        // No new leads on first load
        setNewLeadCounts({
          registration: 0,
          accommodation: 0,
          eligibility: 0,
          learnMore: 0
        })
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load lead counts')
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    navigate('/admin/login', { replace: true })
  }

  const handleBoxClick = (leadType: keyof NewLeadCounts, route: string) => {
    // Mark this lead type as viewed (reset new count for this type)
    setNewLeadCounts(prev => ({
      ...prev,
      [leadType]: 0
    }))
    
    // Navigate to the lead page
    navigate(route)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-semibold">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
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
        {/* Welcome Message */}
        <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-lg">👋</span>
              </div>
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Welcome back, {user ? JSON.parse(user).name || 'Admin' : 'Admin'}!
              </h2>
              <p className="text-gray-600 mt-1">
                Here's an overview of your leads and system activity. Use the cards below to navigate to different sections.
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3">
            {error}
          </div>
        )}

  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-6">
          <div 
            onClick={() => handleBoxClick('registration', '/admin/registration-leads')}
            className="bg-white rounded-lg shadow p-5 flex flex-col items-center cursor-pointer hover:shadow-lg transition-shadow relative"
          >
            {newLeadCounts.registration > 0 && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-pulse">
                {newLeadCounts.registration}
              </div>
            )}
            <span className="text-lg font-semibold mb-2">Registration Leads</span>
            <span className="text-3xl font-bold text-blue-600">{leadCounts.registration}</span>
            <span className="text-xs text-gray-500 mt-1">Click to view details</span>
          </div>
          <div 
            onClick={() => handleBoxClick('accommodation', '/admin/accommodation-leads')}
            className="bg-white rounded-lg shadow p-5 flex flex-col items-center cursor-pointer hover:shadow-lg transition-shadow relative"
          >
            {newLeadCounts.accommodation > 0 && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-pulse">
                {newLeadCounts.accommodation}
              </div>
            )}
            <span className="text-lg font-semibold mb-2">Accommodation Inquiry Leads</span>
            <span className="text-3xl font-bold text-green-600">{leadCounts.accommodation}</span>
            <span className="text-xs text-gray-500 mt-1">Click to view details</span>
          </div>
          <div 
            onClick={() => handleBoxClick('eligibility', '/admin/eligibility-leads')}
            className="bg-white rounded-lg shadow p-5 flex flex-col items-center cursor-pointer hover:shadow-lg transition-shadow relative"
          >
            {newLeadCounts.eligibility > 0 && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-pulse">
                {newLeadCounts.eligibility}
              </div>
            )}
            <span className="text-lg font-semibold mb-2">Check Eligibility Inquiry Leads</span>
            <span className="text-3xl font-bold text-yellow-600">{leadCounts.eligibility}</span>
            <span className="text-xs text-gray-500 mt-1">Click to view details</span>
          </div>
          <div 
            onClick={() => handleBoxClick('learnMore', '/admin/leads')}
            className="bg-white rounded-lg shadow p-5 flex flex-col items-center cursor-pointer hover:shadow-lg transition-shadow relative"
          >
            {newLeadCounts.learnMore > 0 && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-pulse">
                {newLeadCounts.learnMore}
              </div>
            )}
            <span className="text-lg font-semibold mb-2">Learn More Leads</span>
            <span className="text-3xl font-bold text-purple-600">{leadCounts.learnMore}</span>
            <span className="text-xs text-gray-500 mt-1">Click to view details</span>
          </div>
          <div 
            onClick={() => navigate('/admin/authors')}
            className="bg-white rounded-lg shadow p-5 flex flex-col items-center cursor-pointer hover:shadow-lg transition-shadow"
          >
            <span className="text-lg font-semibold mb-2">Authors</span>
            <span className="text-3xl font-bold text-indigo-600">{leadCounts.authors}</span>
            <span className="text-xs text-gray-500 mt-1">Click to manage authors</span>
          </div>
          <div 
            onClick={() => navigate('/admin/blog')}
            className="bg-white rounded-lg shadow p-5 flex flex-col items-center cursor-pointer hover:shadow-lg transition-shadow"
          >
            <span className="text-lg font-semibold mb-2">Blog</span>
            <span className="text-3xl font-bold text-indigo-600">{leadCounts.blog}</span>
            <span className="text-xs text-gray-500 mt-1">Click to manage blog posts</span>
          </div>
        </div>
      </main>
    </div>
  );
}
