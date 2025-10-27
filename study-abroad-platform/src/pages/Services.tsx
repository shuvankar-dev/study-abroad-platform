import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import RegistrationModal from '../components/RegistrationModal'
import { useState } from 'react'

const services = [
  { title: 'Visa Guidance', desc: 'Complete support with visa documentation, application and tracking.' },
  { title: 'Admission Guidance', desc: 'Shortlisting universities, application review and timeline management.' },
  { title: 'Test Preparation', desc: 'IELTS, TOEFL, GRE, GMAT coaching and mock tests.' },
  { title: 'Financial Assistance', desc: 'Loan & scholarship guidance, blocked accounts and budgeting.' },
  { title: 'Accommodation & Settlement', desc: 'Verified housing, booking help and local orientation.' },
  { title: 'Post-Admission Support', desc: 'Academic mentoring and onboarding support after admission.' },
  { title: 'Career Counselling', desc: 'Career roadmap, internships and placement assistance.' },
]

export default function Services() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navbar />

      <main className="container mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Services we provide</h1>
          <p className="text-lg text-gray-700">End-to-end support across admissions, visas, finances and settling in — tailored for international students.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={i} className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
              <div className="text-xl font-semibold text-blue-700 mb-2">{s.title}</div>
              <div className="text-gray-600 mb-4">{s.desc}</div>
              <div className="flex gap-2">
                <button onClick={() => setIsOpen(true)} className="px-3 py-2 rounded bg-gradient-to-r from-primary to-accent text-white text-sm">Book Consult</button>
                <button className="px-3 py-2 rounded border border-gray-200 text-sm text-gray-700">Learn more</button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <RegistrationModal isOpen={isOpen} onClose={() => setIsOpen(false)} source={'other'} />
      <Footer />
    </div>
  )
}
