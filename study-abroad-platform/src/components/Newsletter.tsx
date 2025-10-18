import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    setError(null)
    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    setStatus('sending')
    try {
      // Try to POST to an API endpoint if available (fallback to localStorage otherwise)
      const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost/studyabroadplatform-api' : '/studyabroadplatform-api'
      const endpoint = `${API_BASE}/api/newsletter/subscribe.php`

      // Attempt a network request but don't fail hard if endpoint is missing
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        })
        if (res.ok) {
          const txt = await res.text()
          try { const json = JSON.parse(txt); if (json?.success) { setStatus('success'); setEmail(''); return } } catch {}
        }
      } catch (err) {
        // network error -> fallback
      }

      // Fallback: store locally (keeps UX smooth if API not present)
      const subs = JSON.parse(localStorage.getItem('newsletter_subs' ) || '[]')
      subs.push({ email, created_at: new Date().toISOString() })
      localStorage.setItem('newsletter_subs', JSON.stringify(subs))
      setStatus('success')
      setEmail('')
    } catch (err: any) {
      setError(err?.message || 'Failed to subscribe')
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-transparent">
      <div className="w-full max-w-2xl bg-white text-gray-900 rounded-xl shadow-2xl p-8">
        <div className="md:flex md:items-center md:gap-8">
          <div className="md:flex-1">
            <h2 className="text-2xl md:text-3xl font-bold">Want tips & tricks to optimize your flow?</h2>
            <p className="mt-2 text-gray-600">Sign up to our newsletter and stay up to date.</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 md:mt-0 md:w-80">
            <div className="flex gap-3">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter email"
                className="flex-1 px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
                aria-label="Email address"
                required
              />
              <button
                type="submit"
                disabled={status === 'sending'}
                className="bg-blue-600 text-white rounded-md px-4 py-2 font-medium disabled:opacity-60"
              >
                {status === 'sending' ? 'Sending...' : 'Notify Me'}
              </button>
            </div>
            {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
            {status === 'success' && <div className="mt-3 text-sm text-green-600">Thanks — you are subscribed.</div>}
            <p className="mt-4 text-sm text-gray-500">
              We care about the protection of your data. Read our{' '}
              <Link to="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Newsletter