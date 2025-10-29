import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Shield, Lock, Eye, Database, Users, Globe, CheckCircle} from 'lucide-react'
import { useScrollToTop } from '../hooks/useScrollToTop'

export default function PrivacyPolicy() {
  useScrollToTop()
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-blue-600/10"></div>
        <div className="absolute top-10 right-10 w-32 h-32 bg-green-200/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-blue-200/30 rounded-full blur-xl"></div>
        
        <div className="relative container mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl mb-8 shadow-xl">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Your privacy is paramount to us. Learn how we collect, use, and protect your personal information 
            with industry-leading security measures and transparent practices.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              GDPR Compliant
            </span>
            <span className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-blue-500" />
              256-bit Encryption
            </span>
            <span className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-purple-500" />
              Global Standards
            </span>
          </div>
        </div>
      </section>

      {/* Privacy Highlights */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Privacy Commitments</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-gradient-to-b from-green-50 to-green-100 rounded-2xl border border-green-200">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-2xl mb-6">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-green-900 mb-4">Secure Storage</h3>
                <p className="text-green-700">Your data is encrypted and stored in secure, certified data centers with multiple layers of protection.</p>
              </div>
              <div className="text-center p-8 bg-gradient-to-b from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-6">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-4">Transparent Usage</h3>
                <p className="text-blue-700">We clearly explain how your information is used and never share it without your explicit consent.</p>
              </div>
              <div className="text-center p-8 bg-gradient-to-b from-purple-50 to-purple-100 rounded-2xl border border-purple-200">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-2xl mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-purple-900 mb-4">Your Control</h3>
                <p className="text-purple-700">You have full control over your data with easy options to update, export, or delete your information.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Information We Collect */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Information We Collect</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
                    <h4 className="font-bold text-blue-900 mb-3">Personal Information</h4>
                    <ul className="space-y-2 text-blue-800">
                      <li>• Full name and contact details</li>
                      <li>• Educational background</li>
                      <li>• Passport and visa information</li>
                      <li>• Financial information (when applicable)</li>
                    </ul>
                  </div>
                  <div className="p-6 bg-green-50 rounded-xl border border-green-100">
                    <h4 className="font-bold text-green-900 mb-3">Technical Information</h4>
                    <ul className="space-y-2 text-green-800">
                      <li>• IP address and browser type</li>
                      <li>• Device and operating system</li>
                      <li>• Website usage patterns</li>
                      <li>• Cookies and tracking data</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="p-6 bg-purple-50 rounded-xl border border-purple-100">
                    <h4 className="font-bold text-purple-900 mb-3">Communication Data</h4>
                    <ul className="space-y-2 text-purple-800">
                      <li>• Email correspondence</li>
                      <li>• Chat and call recordings</li>
                      <li>• Feedback and reviews</li>
                      <li>• Support ticket information</li>
                    </ul>
                  </div>
                  <div className="p-6 bg-orange-50 rounded-xl border border-orange-100">
                    <h4 className="font-bold text-orange-900 mb-3">Service Usage</h4>
                    <ul className="space-y-2 text-orange-800">
                      <li>• Application preferences</li>
                      <li>• University selections</li>
                      <li>• Service interactions</li>
                      <li>• Progress tracking data</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Your Rights */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-6 text-center">Your Privacy Rights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <div className="text-2xl font-bold mb-2">Access</div>
                  <div className="text-indigo-100 text-sm">Request a copy of your personal data</div>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <div className="text-2xl font-bold mb-2">Update</div>
                  <div className="text-indigo-100 text-sm">Correct inaccurate information</div>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <div className="text-2xl font-bold mb-2">Delete</div>
                  <div className="text-indigo-100 text-sm">Request deletion of your data</div>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <div className="text-2xl font-bold mb-2">Export</div>
                  <div className="text-indigo-100 text-sm">Download your data in portable format</div>
                </div>
              </div>
              <div className="text-center mt-8">
                <a 
                  href="mailto:privacy@codescholaroverseas.com"
                  className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition-colors inline-block"
                >
                  Exercise Your Rights
                </a>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Privacy Questions?</h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Our dedicated privacy team is here to address any concerns or questions about how we handle your personal information.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:privacy@codescholaroverseas.com"
                  className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
                >
                  Contact Privacy Team
                </a>
                <Link 
                  to="/"
                  className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:border-gray-400 hover:text-gray-900 transition-colors"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
