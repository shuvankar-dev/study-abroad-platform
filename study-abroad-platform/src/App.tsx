import type { ReactNode } from 'react'   // type-only import
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import TopBanner from './components/TopBanner'

import HomePage from './pages/HomePage'
import SearchResults from './pages/SearchResults'
import About from './pages/About'
import Explore from './pages/Explore'
import Services from './pages/Services'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsConditions from './pages/TermsConditions'
import RefundPolicy from './pages/RefundPolicy'
import DataProtection from './pages/DataProtection'
import Legal from './pages/Legal'
import ConsultantsPage from './pages/ConsultantsPage'
import CityLandingPage from './pages/CityLandingPage'
import AdminLogin from './admin/AdminLogin'
import AdminLeads from './admin/AdminLeads'
import AdminDashboard from './admin/AdminDashboard'
import AdminEligibilityLeads from './admin/AdminEligibilityLeads'
import AdminRegistrationLeads from './admin/AdminRegistrationLeads'
import AdminAccommodationLeads from './admin/AdminAccommodationLeads'
import AdminAuthors from './admin/AdminAuthors'
import AdminBlog from './admin/AdminBlog'
import AdminJourneyLeads from './admin/AdminJourneyLeads'
import BlogPage from './pages/BlogPage'
import BlogDetail from './pages/BlogDetail'
import AuthorDetail from './pages/AuthorDetail';
import StudentRoadmap from './pages/StudentRoadmap'
import ConsultationSuccess from './pages/ConsultationSuccess'
import EdupartnerLogin from './pages/edupartner/login'
import EdupartnerSignup from './pages/edupartner/Signup'
import EdupartnerDashboard from './pages/edupartner/Dashboard'
import EdupartnerProfileEdit from './pages/edupartner/profile_edit'

function AdminRoute({ children }: { children: ReactNode }) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null
  return token ? <>{children}</> : <Navigate to="/admin/login" replace />
}

function AppContent() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')
  const isHomePage = location.pathname === '/'

  return (
    <div className="min-h-screen bg-gray-50">
      {!isAdminRoute && isHomePage && <TopBanner />}
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/data-protection" element={<DataProtection />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/consultants" element={<ConsultantsPage />} />
          <Route path="/consultants/:citySlug" element={<CityLandingPage />} />
          <Route path="/consultation-success" element={<ConsultationSuccess />} />
          <Route path="/admin/login" element={<AdminLogin />} />
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
          <Route
            path="/admin/authors"
            element={
              <AdminRoute>
                <AdminAuthors />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/blog"
            element={
              <AdminRoute>
                <AdminBlog />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/journey-leads"
            element={
              <AdminRoute>
                <AdminJourneyLeads />
              </AdminRoute>
            }
          />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetail />} /> 
          <Route path="/author/:name" element={<AuthorDetail />} />
          <Route path="/best-study-abroad-platform" element={<StudentRoadmap />} />
          
          {/* Edupartner Routes */}
          <Route path="/edupartner" element={<EdupartnerLogin />} />
          <Route path="/edupartner/login" element={<EdupartnerLogin />} />
          <Route path="/edupartner/signup" element={<EdupartnerSignup />} />
          <Route path="/edupartner/dashboard" element={<EdupartnerDashboard />} />
          <Route path="/edupartner/profile-edit" element={<EdupartnerProfileEdit />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </div>
  )
}

export default function App() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

  if (!clientId) {
    console.error('VITE_GOOGLE_CLIENT_ID is not defined in environment variables')
  }

  return (
    <GoogleOAuthProvider clientId={clientId || ''}>
      <AppContent />
    </GoogleOAuthProvider>
  )
}
