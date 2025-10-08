import React, { useState } from 'react'
import { X, Loader } from 'lucide-react'

interface RegistrationModalProps {
  isOpen: boolean
  onClose: () => void
  source?: 'hero' | 'bubble' | 'other'
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose, source = 'website' }) => {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    contact_no: '',
    last_qualification: 'Undergraduate',
    english_test_status: 'Not Applied'
  })
  const [errors, setErrors] = useState<{ [k: string]: string }>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  if (!isOpen) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const e: { [k: string]: string } = {}
    if (!form.first_name.trim()) e.first_name = 'First name is required'
    if (!form.last_name.trim()) e.last_name = 'Last name is required'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email is required'
    if (!form.contact_no.trim()) e.contact_no = 'Contact number is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!validate()) return
    setLoading(true)

    const API_BASE = window.location.hostname === 'localhost'
      ? 'http://localhost/studyabroadplatform-api/api'
      : '/studyabroadplatform-api/api'

    try {
      // Use URL-encoded form data to avoid CORS preflight (application/json triggers OPTIONS)
      const payload = new URLSearchParams()
      Object.entries({ ...form, source }).forEach(([k, v]) => payload.append(k, String(v)))

      console.log('Submitting to:', `${API_BASE}/submit_lead.php`)
      console.log('Payload:', payload.toString())

      const res = await fetch(`${API_BASE}/submit_lead.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: payload.toString()
      })

      console.log('Response status:', res.status)
      console.log('Response ok:', res.ok)

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`)
      }

      const json = await res.json()
      console.log('Response JSON:', json)
      if (json.success) {
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false)
          onClose()
          setForm({ first_name: '', last_name: '', email: '', contact_no: '', last_qualification: 'Undergraduate', english_test_status: 'Not Applied' })
        }, 1200)
      } else {
        setErrors({ submit: json.message || 'Submission failed' })
      }
    } catch (err) {
      console.error('Form submission error:', err)
      setErrors({ submit: `Network error: ${err instanceof Error ? err.message : 'Unknown error'}` })
    }

    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-auto">
        <div className="flex items-center justify-between p-5 border-b">
          <div>
            <h3 className="text-lg font-semibold">Register to Get More Discount</h3>
            <p className="text-sm text-gray-500">Fill the form and our experts will contact you</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 p-2 rounded-full"><X /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-600">First name *</label>
              <input name="first_name" value={form.first_name} onChange={handleChange} className={`mt-1 w-full px-3 py-2 border rounded ${errors.first_name ? 'border-red-400' : 'border-gray-200'}`} />
              {errors.first_name && <div className="text-xs text-red-500 mt-1">{errors.first_name}</div>}
            </div>
            <div>
              <label className="text-xs text-gray-600">Last name *</label>
              <input name="last_name" value={form.last_name} onChange={handleChange} className={`mt-1 w-full px-3 py-2 border rounded ${errors.last_name ? 'border-red-400' : 'border-gray-200'}`} />
              {errors.last_name && <div className="text-xs text-red-500 mt-1">{errors.last_name}</div>}
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-600">Email *</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} className={`mt-1 w-full px-3 py-2 border rounded ${errors.email ? 'border-red-400' : 'border-gray-200'}`} />
            {errors.email && <div className="text-xs text-red-500 mt-1">{errors.email}</div>}
          </div>

          <div>
            <label className="text-xs text-gray-600">Contact No *</label>
            <input name="contact_no" value={form.contact_no} onChange={handleChange} className={`mt-1 w-full px-3 py-2 border rounded ${errors.contact_no ? 'border-red-400' : 'border-gray-200'}`} />
            {errors.contact_no && <div className="text-xs text-red-500 mt-1">{errors.contact_no}</div>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-600">Last Qualification</label>
              <select name="last_qualification" value={form.last_qualification} onChange={handleChange} className="mt-1 w-full px-3 py-2 border rounded border-gray-200">
                <option>10th</option>
                <option>12th</option>
                <option>Diploma</option>
                <option>Undergraduate</option>
                <option>Graduate</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-600">English proficiency test</label>
              <select name="english_test_status" value={form.english_test_status} onChange={handleChange} className="mt-1 w-full px-3 py-2 border rounded border-gray-200">
                <option>Not Applied</option>
                <option>Applied</option>
                <option>Completed</option>
              </select>
            </div>
          </div>

          {errors.submit && <div className="text-sm text-red-600">{errors.submit}</div>}

          <div className="flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 py-2 border rounded">Cancel</button>
            <button type="submit" disabled={loading} className="flex-1 py-2 bg-primary text-white rounded disabled:opacity-60 inline-flex items-center justify-center">
              {loading ? <><Loader className="animate-spin mr-2" />Submitting...</> : 'Register Now'}
            </button>
          </div>

          {success && <div className="text-sm text-green-600 text-center">Thanks — we will contact you shortly.</div>}
        </form>
      </div>
    </div>
  )
}

export default RegistrationModal
