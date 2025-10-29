import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Shield, Lock, Server, Key, Eye, Users, Globe, AlertTriangle, CheckCircle, FileText } from 'lucide-react'
import { useScrollToTop } from '../hooks/useScrollToTop'

export default function DataProtection() {
  useScrollToTop()
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10"></div>
        <div className="absolute top-10 right-10 w-32 h-32 bg-purple-200/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-indigo-200/30 rounded-full blur-xl"></div>
        
        <div className="relative container mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl mb-8 shadow-xl">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Data Protection
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Enterprise-grade security protocols and international compliance standards ensure your sensitive 
            educational and personal data remains protected at every step of your journey.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              ISO 27001 Certified
            </span>
            <span className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-blue-500" />
              End-to-End Encryption
            </span>
            <span className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-purple-500" />
              Global Compliance
            </span>
          </div>
        </div>
      </section>

      {/* Security Layers */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Multi-Layer Security Architecture</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-gradient-to-b from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-6">
                  <Server className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-4">Infrastructure Security</h3>
                <p className="text-blue-700">AWS-powered secure cloud infrastructure with 99.9% uptime and redundant backups across multiple regions.</p>
              </div>
              <div className="text-center p-8 bg-gradient-to-b from-green-50 to-green-100 rounded-2xl border border-green-200">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-2xl mb-6">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-green-900 mb-4">Data Encryption</h3>
                <p className="text-green-700">AES-256 encryption for data at rest and TLS 1.3 for data in transit, ensuring maximum protection.</p>
              </div>
              <div className="text-center p-8 bg-gradient-to-b from-purple-50 to-purple-100 rounded-2xl border border-purple-200">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-2xl mb-6">
                  <Key className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-purple-900 mb-4">Access Control</h3>
                <p className="text-purple-700">Role-based access control with multi-factor authentication and regular security audits.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Standards */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* International Compliance */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">International Compliance</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
                    <h4 className="font-bold text-blue-900 mb-3">GDPR (Europe)</h4>
                    <ul className="space-y-2 text-blue-800">
                      <li>• Right to access personal data</li>
                      <li>• Right to rectification and erasure</li>
                      <li>• Data portability rights</li>
                      <li>• Consent management systems</li>
                    </ul>
                  </div>
                  <div className="p-6 bg-green-50 rounded-xl border border-green-100">
                    <h4 className="font-bold text-green-900 mb-3">CCPA (California)</h4>
                    <ul className="space-y-2 text-green-800">
                      <li>• Consumer privacy rights</li>
                      <li>• Data sale opt-out mechanisms</li>
                      <li>• Transparent data practices</li>
                      <li>• Non-discrimination policies</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="p-6 bg-purple-50 rounded-xl border border-purple-100">
                    <h4 className="font-bold text-purple-900 mb-3">PIPEDA (Canada)</h4>
                    <ul className="space-y-2 text-purple-800">
                      <li>• Personal information protection</li>
                      <li>• Privacy impact assessments</li>
                      <li>• Breach notification protocols</li>
                      <li>• Cross-border data transfers</li>
                    </ul>
                  </div>
                  <div className="p-6 bg-orange-50 rounded-xl border border-orange-100">
                    <h4 className="font-bold text-orange-900 mb-3">Privacy Act (Australia)</h4>
                    <ul className="space-y-2 text-orange-800">
                      <li>• Australian Privacy Principles</li>
                      <li>• Notifiable data breach scheme</li>
                      <li>• Cross-border disclosure rules</li>
                      <li>• Individual rights framework</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Handling Practices */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Data Handling Practices</h2>
              </div>
              
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 bg-gradient-to-b from-blue-50 to-blue-100 rounded-xl">
                    <h4 className="font-bold text-blue-900 mb-3">Collection</h4>
                    <p className="text-blue-800 text-sm">Only collect data necessary for educational services with explicit consent and clear purpose.</p>
                  </div>
                  <div className="p-6 bg-gradient-to-b from-green-50 to-green-100 rounded-xl">
                    <h4 className="font-bold text-green-900 mb-3">Processing</h4>
                    <p className="text-green-800 text-sm">Process data according to stated purposes with appropriate security measures and access controls.</p>
                  </div>
                  <div className="p-6 bg-gradient-to-b from-purple-50 to-purple-100 rounded-xl">
                    <h4 className="font-bold text-purple-900 mb-3">Storage</h4>
                    <p className="text-purple-800 text-sm">Secure storage with retention policies and automatic deletion after service completion.</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-8 text-white">
                  <h4 className="text-xl font-bold mb-4">Data Retention Policy</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold mb-2">Active Clients</h5>
                      <p className="text-gray-300 text-sm">Data retained throughout service period and 2 years post-completion for support purposes.</p>
                    </div>
                    <div>
                      <h5 className="font-semibold mb-2">Inactive Clients</h5>
                      <p className="text-gray-300 text-sm">Automatic deletion after 7 years unless legally required to retain or client requests earlier deletion.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Monitoring */}
            <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl shadow-xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-6 text-center">24/7 Security Monitoring</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <AlertTriangle className="w-8 h-8 mx-auto mb-2" />
                  <div className="font-semibold mb-2">Threat Detection</div>
                  <div className="text-red-100 text-sm">Real-time monitoring for suspicious activities</div>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <Eye className="w-8 h-8 mx-auto mb-2" />
                  <div className="font-semibold mb-2">Activity Logging</div>
                  <div className="text-red-100 text-sm">Comprehensive audit trails for all data access</div>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <Shield className="w-8 h-8 mx-auto mb-2" />
                  <div className="font-semibold mb-2">Incident Response</div>
                  <div className="text-red-100 text-sm">Immediate response protocols for security events</div>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <Users className="w-8 h-8 mx-auto mb-2" />
                  <div className="font-semibold mb-2">User Notification</div>
                  <div className="text-red-100 text-sm">Prompt alerts for any data-related incidents</div>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Data Protection Officer</h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Our dedicated Data Protection Officer is available to address any questions about our data handling practices, 
                security measures, or to assist with data subject requests.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:dpo@codescholaroverseas.com"
                  className="bg-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
                >
                  Contact DPO
                </a>
                <a 
                  href="/privacy-policy"
                  className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Privacy Policy
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