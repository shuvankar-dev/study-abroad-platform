import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE = window.location.hostname === 'localhost'
  ? 'http://localhost/studyabroadplatform-api'
  : '/studyabroadplatform-api'

type Lead = {
  id: number
  name: string
  email: string
  phone: string
  country: string
  course_id: number
  course_title: string
  university_name: string
  message?: string
  lead_source: string
  status: 'new'|'contacted'|'qualified'|'converted'|'closed'
  priority: 'low'|'medium'|'high'
  created_at: string
}

type LeadCounts = {
  registration: number
  accommodation: number
  eligibility: number
  learnMore: number
  total: number
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [leadCounts, setLeadCounts] = useState<LeadCounts>({
    registration: 0,
    accommodation: 0,
    eligibility: 0,
    learnMore: 0,
    total: 0
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
        total: 0
      }

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
        } else {
          console.warn('Registration leads API not available')
        }
      } catch (regError) {
        console.warn('Failed to fetch registration leads count:', regError)
      }

      // Fetch other leads from main leads table (Learn More, Accommodation, Eligibility)
      try {
        const url = `${API_BASE}/api/leads/list.php?limit=1000`
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (res.ok) {
          const text = await res.text()
          try {
            const data = JSON.parse(text)
            if (data?.success && data?.data) {
              const leads: Lead[] = data.data || []
              counts.total += leads.length

              // Count leads by source (these are from the main leads table)
              leads.forEach(lead => {
                const source = lead.lead_source?.toLowerCase() || ''
                if (source.includes('accommodation') || source.includes('accom')) {
                  counts.accommodation++
                } else if (source.includes('eligibility') || source.includes('eligible')) {
                  counts.eligibility++
                } else {
                  // All other leads from main table are "Learn More" leads
                  counts.learnMore++
                }
              })
            }
          } catch (parseError) {
            console.warn('Failed to parse main leads:', parseError)
          }
        } else {
          console.warn('Main leads API returned error:', res.status)
        }
      } catch (leadsError) {
        console.warn('Failed to fetch main leads:', leadsError)
      }

      setLeadCounts(counts)
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
        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div 
            onClick={() => navigate('/admin/registration-leads')}
            className="bg-white rounded-lg shadow p-5 flex flex-col items-center cursor-pointer hover:shadow-lg transition-shadow"
          >
            <span className="text-lg font-semibold mb-2">Registration Leads</span>
            <span className="text-3xl font-bold text-blue-600">{leadCounts.registration}</span>
            <span className="text-xs text-gray-500 mt-1">Click to view details</span>
          </div>
          <div className="bg-white rounded-lg shadow p-5 flex flex-col items-center cursor-pointer hover:shadow-lg transition-shadow">
            <span className="text-lg font-semibold mb-2">Accommodation Inquiry Leads</span>
            <span className="text-3xl font-bold text-green-600">{leadCounts.accommodation}</span>
          </div>
          <div className="bg-white rounded-lg shadow p-5 flex flex-col items-center cursor-pointer hover:shadow-lg transition-shadow">
            <span className="text-lg font-semibold mb-2">Check Eligibility Inquiry Leads</span>
            <span className="text-3xl font-bold text-yellow-600">{leadCounts.eligibility}</span>
          </div>
          <div className="bg-white rounded-lg shadow p-5 flex flex-col items-center cursor-pointer hover:shadow-lg transition-shadow w-full">
            <span className="text-lg font-semibold mb-2">Learn More Leads</span>
            <span className="text-3xl font-bold text-purple-600">{leadCounts.learnMore}</span>
            <button 
              onClick={() => navigate('/admin/leads')}
              className="mt-3 text-blue-600 hover:underline text-sm"
            >
              View all leads →
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
