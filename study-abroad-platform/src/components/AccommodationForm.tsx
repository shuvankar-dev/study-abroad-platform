import { useState } from 'react'

const API_BASE = window.location.hostname === 'localhost'
  ? 'http://localhost/studyabroadplatform-api'
  : '/studyabroadplatform-api'

type AccommodationFormData = {
  full_name: string
  country: string
  university: string
  budget_range: string
  accommodation_type: string
  email: string
  additional_notes: string
}

export default function AccommodationForm() {
  const [formData, setFormData] = useState<AccommodationFormData>({
    full_name: '',
    country: '',
    university: '',
    budget_range: '',
    accommodation_type: '',
    email: '',
    additional_notes: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch(`${API_BASE}/api/accommodation_leads/submit.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data.success) {
        setShowSuccess(true)
        // Reset form after 3 seconds
        setTimeout(() => {
          setFormData({
            full_name: '',
            country: '',
            university: '',
            budget_range: '',
            accommodation_type: '',
            email: '',
            additional_notes: ''
          })
          setShowSuccess(false)
        }, 3000)
      } else {
        setError(data.message || 'Failed to submit request')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (showSuccess) {
    return (
      <div className="bg-white rounded-lg p-8 max-w-md mx-auto">
        <div className="text-center">
          {/* Success Animation */}
          <div className="w-16 h-16 mx-auto mb-4 relative">
            <div className="absolute inset-0 bg-green-100 rounded-full animate-ping"></div>
            <div className="relative bg-green-500 rounded-full w-16 h-16 flex items-center justify-center">
              <svg className="w-8 h-8 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Request Submitted!</h3>
          <p className="text-gray-600 mb-4">
            Thank you for your accommodation request. We will provide information soon and get back to you within 24 hours.
          </p>
          
          {/* Loading dots animation */}
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Find Accommodation</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <input
            type="text"
            name="university"
            placeholder="University"
            value={formData.university}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <select
            name="budget_range"
            value={formData.budget_range}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Budget range</option>
            <option value="under-500">Under $500/month</option>
            <option value="500-800">$500-800/month</option>
            <option value="800-1200">$800-1200/month</option>
            <option value="1200-1500">$1200-1500/month</option>
            <option value="over-1500">Over $1500/month</option>
          </select>
        </div>

        <div>
          <select
            name="accommodation_type"
            value={formData.accommodation_type}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Accommodation Type</option>
            <option value="shared">Shared</option>
            <option value="private">Private</option>
            <option value="studio">Studio</option>
            <option value="on-campus">On-Campus</option>
          </select>
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <textarea
            name="additional_notes"
            placeholder="Additional notes or specific requirements..."
            value={formData.additional_notes}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          />
        </div>

        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-gradient-to-r from-purple-600 to-orange-500 text-white py-2 px-4 rounded-md hover:from-purple-700 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              'Find My Accommodation'
            )}
          </button>
          
          <a
            href="https://wa.me/918777841275?text=Hello%2C%20I%20am%20interested%20in%20student%20accommodation.%20Can%20you%20help%20me%20find%20options%3F"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-2 border border-green-500 text-green-700 rounded-md hover:bg-green-50 transition-colors text-center flex items-center justify-center"
            style={{ textDecoration: 'none' }}
          >
            Talk to Our Housing Expert
          </a>
        </div>
      </form>
    </div>
  )
}