import type { ReactNode } from 'react'   // type-only import
import { Routes, Route, Navigate } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'

import HomePage from './pages/HomePage'
import SearchResults from './pages/SearchResults'
import About from './pages/About'
import Explore from './pages/Explore'
import Services from './pages/Services'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Legal from './pages/Legal'
import AdminLogin from './admin/AdminLogin'
import AdminRegister from './admin/AdminRegister'
import AdminLeads from './admin/AdminLeads'
import AdminDashboard from './admin/AdminDashboard'
import AdminEligibilityLeads from './admin/AdminEligibilityLeads'
import AdminRegistrationLeads from './admin/AdminRegistrationLeads'
import AdminAccommodationLeads from './admin/AdminAccommodationLeads'

function AdminRoute({ children }: { children: ReactNode }) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null
  return token ? <>{children}</> : <Navigate to="/admin/login" replace />
}

export default function App() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

  if (!clientId) {
    console.error('VITE_GOOGLE_CLIENT_ID is not defined in environment variables')
  }

  return (
    <GoogleOAuthProvider clientId={clientId || ''}>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/search-results" element={<SearchResults />} />
    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    <Route path="/legal" element={<Legal />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route
            path="/admin/leads"
            element={
              <AdminRoute>
                <AdminLeads />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/registration-leads"
            element={
              <AdminRoute>
                <AdminRegistrationLeads />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/accommodation-leads"
            element={
              <AdminRoute>
                <AdminAccommodationLeads />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/eligibility-leads"
            element={
              <AdminRoute>
                <AdminEligibilityLeads />
              </AdminRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </GoogleOAuthProvider>
  )
}
