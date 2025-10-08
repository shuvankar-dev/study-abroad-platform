

import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';
import Footer from '../components/Footer';
import UserBubble from '../components/UserBubble';
import RegistrationModal from '../components/RegistrationModal';
import { useState, useEffect } from 'react';

const HomePage = () => {
  const [isRegOpen, setIsRegOpen] = useState(false)
  const [regSource, setRegSource] = useState<'hero'|'bubble'|'other'>('hero')
  const [ready, setReady] = useState(false)

  const openRegistration = (source: 'hero'|'bubble'|'other' = 'hero') => {
    setRegSource(source)
    setIsRegOpen(true)
  }

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navbar />
      <main className="flex-1">
    <HeroSection onOpenRegistration={() => openRegistration('hero')} />
    <StatsSection />
        {/* Main content section */}
        <section className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-gray-900">
                Why Codescholar Overseas?
              </h2>

              <p className="text-lg text-gray-700 mb-6 max-w-2xl">
                We help students move from ambition to acceptance — end-to-end. Below are the key ways we add value for every applicant.
              </p>

              {/* Feature grid with subtle mount animation */}
              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 ${ready ? 'reveal-ready' : ''}`}>
                {[
                  { title: 'End-to-End Consultancy', desc: 'From application to arrival, we guide students at every step.' },
                  { title: 'Global Reach', desc: 'Access 100,000+ courses across 920+ universities in 35+ countries, including top-ranked institutions.' },
                  { title: 'Financial Guidance', desc: 'Education loan assistance, blocked accounts, forex & government/private bank support.' },
                  { title: 'Complete Application Support', desc: 'Expert help with SOPs, LORs and document preparation.' },
                  { title: 'Test Preparation Assistance', desc: 'IELTS, GRE, GMAT and other English proficiency exam guidance.' },
                  { title: 'Visa & Pre-Departure Support', desc: 'Visa processing, travel guidance and SIM/blocked account help.' },
                  { title: 'Accommodation & Settlement Help', desc: 'Safe, affordable housing and local orientation.' },
                  { title: 'Post-Admission Academic Support', desc: 'Coursework help and academic mentoring by PhD experts.' },
                  { title: 'Personalised Counselling', desc: 'One-to-one expert mentoring to match your goals and destination.' },
                  { title: 'Trusted Expertise', desc: 'Years of academic experience and a proven track record of student success.' }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    style={{ transitionDelay: `${idx * 80}ms` }}
                    className={`transform transition-all duration-500 opacity-0 translate-y-4 bg-white rounded-lg p-4 border border-gray-100 shadow-sm hover:shadow-lg`}>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-semibold">
                        ✓
                      </div>
                      <div>
                        <div className="text-sm text-blue-700 font-semibold mb-1">{item.title} —</div>
                        <div className="text-sm text-gray-800 leading-tight">{item.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* small script to trigger reveal animation after mount */}
              <style>{`
                .reveal-ready > div { opacity: 1; transform: translateY(0); }
              `}</style>
              <script dangerouslySetInnerHTML={{ __html: "" }} />
              {/* We'll toggle a class on mount via a tiny effect below */}
            </div>
            <div className="flex justify-center">
              <div className="w-80 h-80 rounded-3xl shadow-2xl bg-gradient-to-br from-blue-100 via-white to-indigo-100 overflow-hidden flex items-center justify-center border-4 border-white">
                <img src="/whyUs.png" alt="Study Abroad" className="w-full h-full object-cover scale-105 transition-transform duration-500 hover:scale-110" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <UserBubble onOpenRegistration={() => openRegistration('bubble')} />
      <RegistrationModal isOpen={isRegOpen} onClose={() => setIsRegOpen(false)} source={regSource} />
      <Footer />
    </div>
  );
};

export default HomePage;
