import { useEffect, useState } from 'react'
import { X, GraduationCap, MessageCircle, Star, ArrowRight } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function TopBanner() {
  const [visible, setVisible] = useState(false)
  const [showAnimation, setShowAnimation] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    setVisible(false)
    setShowAnimation(false)

    const timer = setTimeout(() => {
      setVisible(true)
      setShowAnimation(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [location.pathname])

  const dismiss = () => {
    setShowAnimation(false)
    setTimeout(() => setVisible(false), 300)
  }

  const handleRegistration = () => {
    dismiss()
    navigate('/student-roadmap?openForm=true')
  }

  const handleConsultation = () => {
    dismiss()
    navigate('/consultants?openForm=true')
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-2 py-4 sm:p-4 bg-black/50 backdrop-blur-sm">
      <div
        className={`w-full max-w-xs sm:max-w-2xl max-h-[75vh] overflow-y-auto bg-white text-gray-800 rounded-2xl shadow-2xl transform transition-all duration-500 ${
          showAnimation ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 p-[3px]">
          <div className="bg-white rounded-t-xl p-2 sm:p-6">
            <div className="flex items-start justify-between mb-2 sm:mb-4">
              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                <div className="p-1.5 sm:p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex-shrink-0">
                  <GraduationCap className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                    <h3 className="text-sm sm:text-xl font-bold text-gray-900 leading-tight">
                      🎉 Limited Time Offer!
                    </h3>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-[10px] sm:text-sm text-gray-600 leading-tight">
                    Join thousands of successful students worldwide
                  </p>
                </div>
              </div>
              <button
                onClick={dismiss}
                aria-label="Close banner"
                className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 ml-2"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Main content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6">
              <div className="order-2 lg:order-1">
                <div className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-[10px] sm:text-sm font-semibold mb-2 sm:mb-4">
                  🔥 10% OFF Application Assistance
                </div>
                <h2 className="text-base sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1.5 sm:mb-3 leading-tight">
                  Start Your Study Abroad Journey Today!
                </h2>
                <p className="text-[11px] sm:text-base text-gray-600 mb-2 sm:mb-4 leading-relaxed">
                  Get expert guidance for university applications, visa support, and end-to-end assistance.
                  <span className="text-blue-600 font-semibold"> Save 10% on our premium services!</span>
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-1 sm:gap-3 mb-3 sm:mb-6">
                  {[
                    ['✅ 35+ Countries', '920+ Universities'],
                    ['🎯 100% Visa Success', 'Expert Counselling'],
                    ['💰 Scholarship Help', 'Loan Assistance'],
                    ['🏠 Accommodation', 'Post-arrival Support'],
                  ].map(([left, right], idx) => (
                    <div key={idx} className="text-[10px] sm:text-sm">
                      <div className="text-blue-700 font-medium leading-tight">{left}</div>
                      <div className="text-gray-600 leading-tight">{right}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3 sm:space-y-4 order-1 lg:order-2">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-3 sm:p-6 rounded-xl border border-blue-100">
                  <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    Ready to Apply?
                  </h4>
                  <button
                    onClick={handleRegistration}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-1.5 sm:py-3 px-3 sm:px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group text-xs sm:text-base"
                  >
                    Start Registration Journey
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-1.5 sm:mt-2 text-center">
                    Complete your profile & get matched instantly
                  </p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-red-50 p-3 sm:p-6 rounded-xl border border-orange-100">
                  <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                    Need Expert Advice?
                  </h4>
                  <button
                    onClick={handleConsultation}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-1.5 sm:py-3 px-3 sm:px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group text-xs sm:text-base"
                  >
                    Get Free Consultation
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-1.5 sm:mt-2 text-center">
                    Talk to our certified counselors for free
                  </p>
                </div>

                {/* Trust indicators */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-4 pt-1 sm:pt-2 text-[10px] sm:text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    ✅ Trusted by 50,000+ students
                  </span>
                  <span className="flex items-center gap-1">
                    ⚡ Quick response in 24hrs
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
