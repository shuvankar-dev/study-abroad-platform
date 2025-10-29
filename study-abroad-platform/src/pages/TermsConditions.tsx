import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Shield, Scale, Users, Globe, CheckCircle } from 'lucide-react'
import { useScrollToTop } from '../hooks/useScrollToTop'

const TermsConditions = () => {
  useScrollToTop()
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-indigo-200/30 rounded-full blur-xl"></div>
        
        <div className="relative container mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-8 shadow-xl">
            <Scale className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Terms & Conditions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Our comprehensive terms of service that govern your use of Codescholar Overseas services. 
            Updated to ensure transparency and protect your rights.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Last updated: October 2025
            </span>
            <span className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-500" />
              Effective globally
            </span>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">

            {/* Terms Content */}
            <div className="space-y-12">
              {/* Section 1 */}
              <div id="section-1" className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">1</div>
                  <h2 className="text-3xl font-bold text-gray-900">Acceptance of Terms</h2>
                </div>
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                  <p className="text-lg mb-6">
                    By accessing and using the services provided by Codescholar Overseas ("we," "our," or "us"), you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
                  </p>
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-6">
                    <p className="font-semibold text-blue-900 mb-2">Important Notice:</p>
                    <p className="text-blue-800">These terms constitute a legally binding agreement between you and Codescholar Overseas. If you do not agree with any part of these terms, please discontinue use of our services immediately.</p>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>You must be at least 18 years old or have parental consent to use our services</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>You agree to provide accurate and complete information during registration</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>You are responsible for maintaining the confidentiality of your account</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section 2 */}
              <div id="section-2" className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">2</div>
                  <h2 className="text-3xl font-bold text-gray-900">Services Description</h2>
                </div>
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                  <p className="text-lg mb-6">
                    Codescholar Overseas provides comprehensive study abroad consultation services, including but not limited to university selection, application assistance, visa guidance, and accommodation support.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                      <h4 className="font-bold text-blue-900 mb-3">Academic Services</h4>
                      <ul className="space-y-2 text-blue-800">
                        <li>• University selection assistance</li>
                        <li>• Application preparation</li>
                        <li>• Document verification</li>
                        <li>• Scholarship guidance</li>
                      </ul>
                    </div>
                    <div className="p-6 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl border border-green-100">
                      <h4 className="font-bold text-green-900 mb-3">Support Services</h4>
                      <ul className="space-y-2 text-green-800">
                        <li>• Visa application support</li>
                        <li>• Accommodation assistance</li>
                        <li>• Pre-departure briefing</li>
                        <li>• Post-arrival support</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
                    <p className="font-semibold text-amber-900 mb-2">Service Disclaimer:</p>
                    <p className="text-amber-800">While we strive to provide accurate information and guidance, final admission decisions rest with educational institutions. We cannot guarantee admission or visa approval.</p>
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div id="section-3" className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">3</div>
                  <h2 className="text-3xl font-bold text-gray-900">User Responsibilities</h2>
                </div>
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                  <p className="text-lg mb-6">
                    As a user of our services, you agree to fulfill certain responsibilities to ensure a smooth and effective consultation process.
                  </p>
                  <div className="space-y-6">
                    <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-3">
                        <Users className="w-5 h-5 text-blue-600" />
                        Information Accuracy
                      </h4>
                      <p className="text-gray-700 mb-4">You must provide truthful, accurate, and complete information throughout the consultation process.</p>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Academic transcripts and certificates must be genuine</li>
                        <li>• Personal information must be current and accurate</li>
                        <li>• Any changes in circumstances must be promptly reported</li>
                      </ul>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-3">
                        <Shield className="w-5 h-5 text-green-600" />
                        Communication & Cooperation
                      </h4>
                      <p className="text-gray-700 mb-4">Maintain professional communication and cooperate fully with our consultation process.</p>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Respond promptly to requests for information</li>
                        <li>• Attend scheduled meetings and appointments</li>
                        <li>• Follow guidance provided by our counselors</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 4 */}
              <div id="section-4" className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">4</div>
                  <h2 className="text-3xl font-bold text-gray-900">Payment Terms</h2>
                </div>
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                  <p className="text-lg mb-6">
                    Our payment terms are designed to be fair and transparent, ensuring you understand all costs associated with our services.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center p-6 bg-gradient-to-b from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                      <div className="text-3xl font-bold text-blue-600 mb-2">₹0</div>
                      <div className="text-blue-900 font-semibold mb-2">Initial Consultation</div>
                      <div className="text-blue-700 text-sm">Free assessment and guidance</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-b from-green-50 to-green-100 rounded-xl border border-green-200">
                      <div className="text-3xl font-bold text-green-600 mb-2">Flexible</div>
                      <div className="text-green-900 font-semibold mb-2">Service Packages</div>
                      <div className="text-green-700 text-sm">Customized pricing options</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-b from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                      <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
                      <div className="text-purple-900 font-semibold mb-2">Transparent</div>
                      <div className="text-purple-700 text-sm">No hidden charges</div>
                    </div>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                    <p className="font-semibold text-green-900 mb-2">Payment Protection:</p>
                    <p className="text-green-800">All payments are processed through secure channels. Refund policies apply as per our separate refund policy document.</p>
                  </div>
                </div>
              </div>

              {/* Contact Section */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-8 text-white text-center">
                <h2 className="text-3xl font-bold mb-4">Questions About Our Terms?</h2>
                <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                  Our legal team is here to help clarify any questions you may have about these terms and conditions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="mailto:legal@codescholaroverseas.com"
                    className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
                  >
                    Contact Legal Team
                  </a>
                  <Link 
                    to="/"
                    className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default TermsConditions