import { useState } from 'react'

const API_BASE = window.location.hostname === 'localhost'
  ? 'http://localhost/studyabroadplatform-api'
  : '/studyabroadplatform-api'

type EligibilityFormData = {
  test_status: string
  exam_type: string
  score_percentage: string
  email: string
  full_name: string
  phone: string
  country: string
  university_preference: string
}

type EligibilityResult = {
  status: string
  message: string
}

export default function EligibilityChecker() {
  const [formData, setFormData] = useState<EligibilityFormData>({
    test_status: '',
    exam_type: '',
    score_percentage: '',
    email: '',
    full_name: '',
    phone: '',
    country: '',
    university_preference: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [eligibilityResult, setEligibilityResult] = useState<EligibilityResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showContactForm, setShowContactForm] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleInitialCheck = async () => {
    if (!formData.test_status || !formData.exam_type) {
      setError('Please select test status and exam type')
      return
    }

    if (formData.test_status === 'completed' && !formData.score_percentage) {
      setError('Please enter your score/percentage')
      return
    }

    setError(null)
    setShowContactForm(true)
  }

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch(`${API_BASE}/api/eligibility_checks/submit.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data.success) {
        setEligibilityResult(data.eligibility)
        setShowSuccess(true)
        // Reset form after 5 seconds
        setTimeout(() => {
          setFormData({
            test_status: '',
            exam_type: '',
            score_percentage: '',
            email: '',
            full_name: '',
            phone: '',
            country: '',
            university_preference: ''
          })
          setShowSuccess(false)
          setShowContactForm(false)
          setEligibilityResult(null)
        }, 5000)
      } else {
        setError(data.message || 'Failed to submit eligibility check')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (showSuccess && eligibilityResult) {
    return (
      <div className="bg-white rounded-lg p-8 max-w-md mx-auto">
        <div className="text-center">
          {/* Success Animation */}
          <div className="w-20 h-20 mx-auto mb-6 relative">
            <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping"></div>
            <div className="relative bg-gradient-to-r from-purple-600 to-orange-500 rounded-full w-20 h-20 flex items-center justify-center">
              <svg className="w-10 h-10 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Eligibility Checked!</h3>
          
          {/* Status Badge */}
          <div className="mb-4">
            <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
              eligibilityResult.status === 'eligible' 
                ? 'bg-green-100 text-green-800' 
                : eligibilityResult.status === 'partially_eligible'
                ? 'bg-yellow-100 text-yellow-800'
                : eligibilityResult.status === 'needs_improvement'
                ? 'bg-orange-100 text-orange-800'
                : 'bg-blue-100 text-blue-800'
            }`}>
              {eligibilityResult.status === 'eligible' ? '✓ Eligible' :
               eligibilityResult.status === 'partially_eligible' ? '~ Partially Eligible' :
               eligibilityResult.status === 'needs_improvement' ? '⚠ Needs Improvement' :
               '📋 Under Review'}
            </span>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-gray-700 text-sm leading-relaxed">
              {eligibilityResult.message}
            </p>
          </div>
          
          <div className="text-lg font-semibold text-gray-900 mb-4">
            🎯 We Will Contact You Soon!
          </div>
          
          {/* Contact animation */}
          <div className="flex justify-center items-center space-x-3 mb-4">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-orange-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span className="text-sm text-gray-600">Processing your profile...</span>
          </div>
          
          <p className="text-xs text-gray-500">
            Our experts are reviewing your eligibility and will contact you within 24 hours with personalized university recommendations.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg p-6 max-w-2xl mx-auto">
      <div className="mb-4">
        <span className="text-sm font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
          English Proficiency Test
        </span>
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-3">Check Your Eligibility</h3>
      <p className="text-gray-600 mb-6">
        Let us know your English test status and results to see if you meet the requirements for your dream university.
      </p>

      {!showContactForm ? (
        // Initial Check Form
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Test Status</label>
              <select
                name="test_status"
                value={formData.test_status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="">Select status</option>
                <option value="not_taken">Not taken yet</option>
                <option value="planning">Planning to take</option>
                <option value="completed">Completed</option>
                <option value="scheduled">Scheduled</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Which Exam?</label>
              <select
                name="exam_type"
                value={formData.exam_type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="">Select exam</option>
                <option value="IELTS">IELTS</option>
                <option value="TOEFL">TOEFL</option>
                <option value="PTE">PTE</option>
                <option value="Duolingo">Duolingo</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {formData.test_status === 'completed' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Percentage / Score</label>
              <input
                type="text"
                name="score_percentage"
                placeholder="e.g. 7.5 Band / 95 / 60%"
                value={formData.score_percentage}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          )}

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}

          <button
            onClick={handleInitialCheck}
            className="w-full bg-gradient-to-r from-purple-600 to-orange-500 text-white py-3 px-6 rounded-md hover:from-purple-700 hover:to-orange-600 transition-all duration-200 font-medium"
          >
            Check Eligibility
          </button>
        </div>
      ) : (
        // Contact Details Form
        <form onSubmit={handleFinalSubmit} className="space-y-4">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-purple-700">
              Great! Now let us know how to contact you with your personalized eligibility results and university recommendations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="full_name"
                placeholder="Full Name"
                value={formData.full_name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div>
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>

          <div>
            <input
              type="text"
              name="university_preference"
              placeholder="Preferred University or Country (Optional)"
              value={formData.university_preference}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setShowContactForm(false)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-purple-600 to-orange-500 text-white py-2 px-6 rounded-md hover:from-purple-700 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Checking Eligibility...
                </span>
              ) : (
                'Get My Eligibility Results'
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}