import type { ReactNode } from 'react'   // type-only import
import { Routes, Route, Navigate } from 'react-router-dom'

import HomePage from './pages/HomePage'
import SearchResults from './pages/SearchResults'
import About from './pages/About'
import Explore from './pages/Explore'
import AdminLogin from './admin/AdminLogin'
import AdminRegister from './admin/AdminRegister'
import AdminLeads from './admin/AdminLeads'

function AdminRoute({ children }: { children: ReactNode }) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null
  return token ? <>{children}</> : <Navigate to="/admin/login" replace />
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin" element={<Navigate to="/admin/leads" replace />} />
        <Route
          path="/admin/leads"
          element={
            <AdminRoute>
              <AdminLeads />
            </AdminRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}
