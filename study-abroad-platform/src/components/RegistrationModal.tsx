import React, { useState } from 'react'
import { X, Loader } from 'lucide-react'
import GoogleSignInButton from './GoogleSignInButton'

interface RegistrationModalProps {
  isOpen: boolean
  onClose: () => void
  source?: 'hero' | 'bubble' | 'other'
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose, source = 'website' }) => {
  interface FormState {
    first_name: string
    last_name: string
    email: string
    contact_no: string
    last_qualification: string
    english_test_status: string
    google_id?: string
  }

  const [form, setForm] = useState<FormState>({
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
  const [isGoogleAuth, setIsGoogleAuth] = useState(false)

  if (!isOpen) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const e: { [k: string]: string } = {}
    // Only name and email are required now, but backend might still require contact_no
    if (!form.first_name.trim()) e.first_name = 'First name is required'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email is required'
    // For manual submission, require contact. For Google auth, "N/A" is acceptable
    if (!form.contact_no.trim() || (form.contact_no.trim() === 'N/A' && !isGoogleAuth)) {
      e.contact_no = 'Contact number is required'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleGoogleSuccess = async (userData: any) => {
    console.log('Google success data:', userData)
    
    // Fill form with Google data
    const googleFormData = {
      ...form,
      first_name: userData.name.split(' ')[0] || '',
      last_name: userData.name.split(' ').slice(1).join(' ') || '',
      email: userData.email || '',
      contact_no: 'N/A', // Provide default for Google auth since backend requires it
      google_id: userData.googleId
    }
    
    setForm(googleFormData)
    setIsGoogleAuth(true)
    
    // Auto-submit the form with Google data after a short delay
    setTimeout(() => {
      submitForm(googleFormData)
    }, 500)
  }

  const submitForm = async (formData = form) => {
    setLoading(true)

    const API_BASE = window.location.hostname === 'localhost'
      ? 'http://localhost/studyabroadplatform-api/api'
      : '/studyabroadplatform-api/api'

    try {
      // Ensure we have required fields (based on backend requirements)
      if (!formData.first_name.trim()) {
        setErrors({ submit: 'First name is required' })
        setLoading(false)
        return
      }
      if (!formData.email.trim()) {
        setErrors({ submit: 'Email is required' })
        setLoading(false)
        return
      }
      // Accept "N/A" for Google auth, otherwise require real contact number
      if (!formData.contact_no.trim() || (formData.contact_no.trim() === 'N/A' && !isGoogleAuth)) {
        setErrors({ submit: 'Contact number is required' })
        setLoading(false)
        return
      }

      const payload = new URLSearchParams()
      
      // Add all form data with proper field names
      payload.append('first_name', formData.first_name || '')
      payload.append('last_name', formData.last_name || '')
      payload.append('email', formData.email || '')
      payload.append('contact_no', formData.contact_no || '')
      payload.append('last_qualification', formData.last_qualification || 'Undergraduate')
      payload.append('english_test_status', formData.english_test_status || 'Not Applied')
      payload.append('source', source || 'website')
      payload.append('registration_type', isGoogleAuth ? 'google' : 'manual')
      
      if (formData.google_id) {
        payload.append('google_id', formData.google_id)
      }

      console.log('Submitting to:', `${API_BASE}/submit_lead.php`)
      console.log('Payload:', payload.toString())

      const res = await fetch(`${API_BASE}/submit_lead.php`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: payload.toString()
      })

      console.log('Response status:', res.status)
      
      if (!res.ok) {
        const errorText = await res.text()
        console.log('Error response:', errorText)
        throw new Error(`HTTP ${res.status}: ${res.statusText}`)
      }

      const responseText = await res.text()
      console.log('Response text:', responseText)
      
      let json
      try {
        json = JSON.parse(responseText)
      } catch (parseError) {
        console.error('Failed to parse JSON:', responseText)
        throw new Error('Invalid server response')
      }

      if (json.success) {
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false)
          onClose()
          setForm({ first_name: '', last_name: '', email: '', contact_no: '', last_qualification: 'Undergraduate', english_test_status: 'Not Applied' })
          setIsGoogleAuth(false)
        }, 1500)
      } else {
        setErrors({ submit: json.message || 'Submission failed' })
      }
    } catch (err) {
      console.error('Form submission error:', err)
      setErrors({ submit: `Network error: ${err instanceof Error ? err.message : 'Unknown error'}` })
    }

    setLoading(false)
  }

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!validate()) return
    await submitForm()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b">
          <div>
            <h3 className="text-lg font-semibold">Register to Get More Discount</h3>
            <p className="text-sm text-gray-500">Fill the form and our experts will contact you</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 p-2 rounded-full"><X /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Google Sign-In Button */}
          <div className="mb-4">
            <GoogleSignInButton 
              onSuccess={handleGoogleSuccess}
              onError={() => setErrors({ submit: 'Google sign-in failed. Please try again.' })}
            />
          </div>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-3 text-xs text-gray-500">OR</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-600">First name *</label>
              <input name="first_name" value={form.first_name} onChange={handleChange} className={`mt-1 w-full px-3 py-2 border rounded ${errors.first_name ? 'border-red-400' : 'border-gray-200'}`} />
              {errors.first_name && <div className="text-xs text-red-500 mt-1">{errors.first_name}</div>}
            </div>
            <div>
              <label className="text-xs text-gray-600">Last name</label>
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
              <label className="text-xs text-gray-600">Last Qualification (Optional)</label>
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
              <label className="text-xs text-gray-600">English proficiency test (Optional)</label>
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
