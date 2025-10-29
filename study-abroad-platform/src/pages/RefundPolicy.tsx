import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { CreditCard, DollarSign, Clock, AlertCircle, CheckCircle, RefreshCw, FileText, Calculator } from 'lucide-react'
import { useScrollToTop } from '../hooks/useScrollToTop'

export default function RefundPolicy() {
  useScrollToTop()
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="absolute top-10 right-10 w-32 h-32 bg-blue-200/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-purple-200/30 rounded-full blur-xl"></div>
        
        <div className="relative container mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-8 shadow-xl">
            <RefreshCw className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Refund Policy
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            We stand behind our services with clear, fair refund policies designed to protect your investment 
            and ensure your satisfaction with our educational consulting services.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Fair & Transparent
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" />
              Quick Processing
            </span>
            <span className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-purple-500" />
              Secure Transactions
            </span>
          </div>
        </div>
      </section>

      {/* Refund Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Refund Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-gradient-to-b from-green-50 to-green-100 rounded-2xl border border-green-200">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-2xl mb-6">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-green-900 mb-4">Full Refund</h3>
                <p className="text-green-700 mb-4">100% refund available within the first 7 days if no work has begun on your application.</p>
                <div className="bg-green-200 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">7 Days</div>
              </div>
              <div className="text-center p-8 bg-gradient-to-b from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-6">
                  <Calculator className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-4">Partial Refund</h3>
                <p className="text-blue-700 mb-4">Prorated refund based on services completed if cancellation occurs mid-process.</p>
                <div className="bg-blue-200 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">Case by Case</div>
              </div>
              <div className="text-center p-8 bg-gradient-to-b from-orange-50 to-orange-100 rounded-2xl border border-orange-200">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-600 rounded-2xl mb-6">
                  <AlertCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-orange-900 mb-4">No Refund</h3>
                <p className="text-orange-700 mb-4">After university applications are submitted or visa interviews are conducted.</p>
                <div className="bg-orange-200 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold">Final Stage</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service-Specific Policies */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* University Application Services */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">University Application Services</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
                    <h4 className="font-bold text-blue-900 mb-3">Before Application Submission</h4>
                    <ul className="space-y-2 text-blue-800">
                      <li>• 100% refund if cancelled within 7 days</li>
                      <li>• 75% refund if cancelled within 14 days</li>
                      <li>• 50% refund if documents are prepared</li>
                      <li>• 25% refund if application is ready to submit</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="p-6 bg-red-50 rounded-xl border border-red-100">
                    <h4 className="font-bold text-red-900 mb-3">After Application Submission</h4>
                    <ul className="space-y-2 text-red-800">
                      <li>• No refund for application fees paid to universities</li>
                      <li>• Service fees are non-refundable</li>
                      <li>• Additional universities can be added</li>
                      <li>• Transfer to future intake possible</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Visa Services */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Visa Assistance Services</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                    <h4 className="font-bold text-green-900 mb-2">Document Preparation Phase</h4>
                    <p className="text-green-800 text-sm">75% refund available if no visa appointment is booked</p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                    <h4 className="font-bold text-yellow-900 mb-2">Interview Preparation</h4>
                    <p className="text-yellow-800 text-sm">50% refund available before mock interview sessions</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                    <h4 className="font-bold text-orange-900 mb-2">Post-Interview</h4>
                    <p className="text-orange-800 text-sm">No refund after visa interview is conducted</p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                    <h4 className="font-bold text-red-900 mb-2">Visa Rejection</h4>
                    <p className="text-red-800 text-sm">No refund for rejected visas - reapplication assistance included</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Refund Process */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-6 text-center">How to Request a Refund</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <div className="text-3xl font-bold mb-2">1</div>
                  <div className="font-semibold mb-2">Contact Us</div>
                  <div className="text-purple-100 text-sm">Send refund request via email or phone</div>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <div className="text-3xl font-bold mb-2">2</div>
                  <div className="font-semibold mb-2">Review</div>
                  <div className="text-purple-100 text-sm">We assess your case within 2 business days</div>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <div className="text-3xl font-bold mb-2">3</div>
                  <div className="font-semibold mb-2">Approval</div>
                  <div className="text-purple-100 text-sm">Refund amount confirmed and processed</div>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <div className="text-3xl font-bold mb-2">4</div>
                  <div className="font-semibold mb-2">Payment</div>
                  <div className="text-purple-100 text-sm">Refund credited within 5-7 business days</div>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Need a Refund?</h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Our customer service team is ready to help you with your refund request. We aim to process all requests fairly and promptly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:refunds@codescholaroverseas.com"
                  className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                  Request Refund
                </a>
                <a 
                  href="tel:+91-9876543210"
                  className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
                >
                  Call Us Now
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