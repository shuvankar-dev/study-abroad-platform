import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import TopBanner from '../components/TopBanner';
import StatsSection from '../components/StatsSection';
import Footer from '../components/Footer';
import UserBubble from '../components/UserBubble';
import EligibilityChecker from '../components/EligibilityChecker'
import AccommodationForm from '../components/AccommodationForm'
import RegistrationModal from '../components/RegistrationModal';
import ChatBubbleAssistant from '../components/ChatBubbleAssistant';
import { useState, useEffect } from 'react';

// Resolve accommodation images added by the user (Vite-friendly)
const accom1 = new URL('../assets/Accomodation/S1.png', import.meta.url).href;
const accom2 = new URL('../assets/Accomodation/S2.png', import.meta.url).href;
const accom3 = new URL('../assets/Accomodation/S3.png', import.meta.url).href;

const HomePage = () => {
  const [isRegOpen, setIsRegOpen] = useState(false)
  const [regSource, setRegSource] = useState<'hero'|'bubble'|'other'>('hero')
  const [ready, setReady] = useState(false) 
  const [activeFaq, setActiveFaq] = useState<number | null>(0)

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
  <TopBanner />
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

        {/* Testimonials Section */}
        <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex flex-col items-center">
              <div className="text-center">
                <p className="text-lg font-medium text-gray-600">Hundreds of students trust Codescholar Overseas</p>
                <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl">Our happy clients say about us</h2>
              </div>

              <div className="mt-8 text-center md:mt-16">
                <a href="#" className="pb-2 text-base font-bold leading-7 text-gray-900 border-b-2 border-gray-900 hover:border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2 hover:text-gray-600">Check all reviews</a>
              </div>

              <div className="relative mt-10 md:mt-24">
                <div className="absolute -inset-x-1 inset-y-16 md:-inset-x-2 md:-inset-y-6">
                  <div className="w-full h-full max-w-5xl mx-auto rounded-3xl opacity-30 blur-lg filter" style={{background: 'linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)'}}></div>
                </div>
                <div className="relative grid max-w-lg grid-cols-1 gap-6 mx-auto md:max-w-none lg:gap-10 md:grid-cols-3">
                  {/* Testimonial 1 */}
                  <div className="flex flex-col overflow-hidden shadow-xl">
                    <div className="flex flex-col justify-between flex-1 p-6 bg-white lg:py-8 lg:px-7">
                      <div className="flex-1">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-5 h-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                          ))}
                        </div>
                        <blockquote className="flex-1 mt-8">
                          <p className="text-lg leading-relaxed text-gray-900">“Codescholar Overseas made my study abroad dream come true. The team was supportive at every step!”</p>
                        </blockquote>
                      </div>
                      <div className="flex items-center mt-8">
                        <img className="flex-shrink-0 object-cover rounded-full w-11 h-11" src={new URL('../assets/Testimonial/S1.png', import.meta.url).href} alt="Student 1" />
                        <div className="ml-4">
                          <p className="text-base font-bold text-gray-900">Priya Sharma</p>
                          <p className="mt-0.5 text-sm text-gray-600">Masters in Germany</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Testimonial 2 */}
                  <div className="flex flex-col overflow-hidden shadow-xl">
                    <div className="flex flex-col justify-between flex-1 p-6 bg-white lg:py-8 lg:px-7">
                      <div className="flex-1">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-5 h-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                          ))}
                        </div>
                        <blockquote className="flex-1 mt-8">
                          <p className="text-lg leading-relaxed text-gray-900">“The guidance for my visa and accommodation was excellent. Highly recommend their services!”</p>
                        </blockquote>
                      </div>
                      <div className="flex items-center mt-8">
                        <img className="flex-shrink-0 object-cover rounded-full w-11 h-11" src={new URL('../assets/Testimonial/S2.png', import.meta.url).href} alt="Student 2" />
                        <div className="ml-4">
                          <p className="text-base font-bold text-gray-900">Rahul Verma</p>
                          <p className="mt-0.5 text-sm text-gray-600">Bachelors in Canada</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Testimonial 3 */}
                  <div className="flex flex-col overflow-hidden shadow-xl">
                    <div className="flex flex-col justify-between flex-1 p-6 bg-white lg:py-8 lg:px-7">
                      <div className="flex-1">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-5 h-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                          ))}
                        </div>
                        <blockquote className="flex-1 mt-8">
                          <p className="text-lg leading-relaxed text-gray-900">“Thanks to Codescholar Overseas, I got admission to my dream university. The process was smooth and stress-free.”</p>
                        </blockquote>
                      </div>
                      <div className="flex items-center mt-8">
                        <img className="flex-shrink-0 object-cover rounded-full w-11 h-11" src={new URL('../assets/Testimonial/S3.png', import.meta.url).href} alt="Student 3" />
                        <div className="ml-4">
                          <p className="text-base font-bold text-gray-900">Sneha Das</p>
                          <p className="mt-0.5 text-sm text-gray-600">MBA in UK</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Accommodation Section (moved from Explore) */}
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-7xl mx-auto rounded-2xl overflow-hidden shadow-lg">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="bg-gradient-to-br from-primary/90 to-accent/90 p-10 md:p-16 text-white">
                <div className="max-w-lg">
                  <div className="inline-block bg-white/10 rounded-full px-3 py-1 text-sm font-semibold mb-4">Student Accommodation</div>
                  <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Your Home Away from Home</h2>
                  <p className="text-white/90 mb-6">Finding safe, comfortable and affordable housing abroad shouldn't be stressful. We partner with verified housing providers and global platforms to match you with options near campus — with clear pricing and reliable support.</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {[
                      ['Verified Listings', 'Partnered with trusted housing providers.'],
                      ['Global Coverage', 'Options across 35+ countries.'],
                      ['Flexible Options', 'Shared, private, studios, on-campus.'],
                      ['Budget Friendly', 'Plans for every pocket.']
                    ].map((it, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <div>
                          <div className="font-semibold">{it[0]}</div>
                          <div className="text-sm text-white/80">{it[1]}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-lg font-bold mb-3">How it works</h3>
                  <div className="space-y-3">
                    {[
                      'Share your preferences (city, university, budget).',
                      'Get curated, verified options from our partners.',
                      'Choose & book with help on documents and payments.',
                      'Settle in with local support and 24/7 help.'
                    ].map((s, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center font-semibold">{i+1}</div>
                        <div className="text-white/90">{s}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <div className="text-white/90">In collaboration with platforms like <span className="font-semibold">AmberStudent</span>, <span className="font-semibold">Casita</span> and more.</div>
                  </div>

                  <div className="mt-8 bg-white/10 p-4 rounded-lg">
                    <div className="text-white/90 italic">“CodeScholar made my accommodation search stress-free — I found a great studio near campus quickly.”</div>
                    <div className="mt-3 text-sm text-white/80">— Ananya, MSc, UK</div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 md:p-10">

              
                {/* Right column header: consultation call-to-action */}
                <div className="mb-6">
                  <div className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold mb-2">Need Help?</div>
                  <h3 className="text-2xl font-bold text-gray-900">Get Accommodation Consultation</h3>
                  <p className="text-sm text-gray-600 mt-1">Talk to our housing experts to find verified, budget-friendly options near your campus.</p>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div className="relative">
                      <div className="h-44 rounded-lg bg-gray-100 overflow-hidden shadow-md">
                      <img src={accom1} alt="accom" className="w-full h-full object-cover" onError={(e)=>{ (e.target as HTMLImageElement).style.display='none' }} />
                      <div className="absolute inset-0 flex items-end p-4">
                        <div className="bg-white/80 text-sm rounded-md px-3 py-1">Verified</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-24 rounded-lg bg-gray-100 overflow-hidden shadow-sm">
                      <img src={accom2} alt="accom" className="w-full h-full object-cover" onError={(e)=>{ (e.target as HTMLImageElement).style.display='none' }} />
                    </div>
                    <div className="h-24 rounded-lg bg-gray-100 overflow-hidden shadow-sm">
                      <img src={accom3} alt="accom" className="w-full h-full object-cover" onError={(e)=>{ (e.target as HTMLImageElement).style.display='none' }} />
                    </div>
                  </div>

                  <AccommodationForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <UserBubble onOpenRegistration={() => openRegistration('bubble')} />
      <ChatBubbleAssistant />
      <RegistrationModal isOpen={isRegOpen} onClose={() => setIsRegOpen(false)} source={regSource} />

      {/* English Proficiency Test Section */}
        <section className="container mx-auto px-4 py-12">
          <EligibilityChecker />
        </section>

         {/* FAQ Section - premium styled accordion */}
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-7xl mx-auto bg-gradient-to-br from-white to-blue-50 rounded-2xl p-8 shadow-lg">
            <div className="grid md:grid-cols-1 gap-8 items-start">
              <div className="px-4">
                <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold mb-4">Frequently Asked</div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Frequently Asked Questions</h2>
                <p className="text-gray-700 max-w-xl">Answers to common queries about applications, visas, accommodation and post-arrival support. Still have a question? Use the button to talk to an expert.</p>
                
                <div className="p-2">
                {/* Accordion */}
                {[
                  { q: 'How do I start an application through CodeScholar?', a: 'Begin with a free counselling session where we assess your profile, goals and preferred destinations. We then build a personalised application plan including timelines, document checklist and university shortlist.' },
                  { q: 'What visa support do you provide?', a: 'We assist with visa document preparation, application filing, interview coaching and follow-up until the visa decision. We also provide pre-departure briefings on rules and local regulations.' },
                  { q: 'Can you help me find accommodation before I arrive?', a: 'Yes — we partner with verified housing providers to offer shortlists based on your university, budget and preferences. You can book with support for contracts and payments.' },
                  { q: 'Do you provide test preparation?', a: 'We offer guidance for IELTS, TOEFL, GRE, GMAT and other tests including coaching partners and study plans tailored to your target score.' },
                  { q: 'What are the fees and refund policies?', a: 'Our service fees vary by case and are discussed during counselling. Refund terms are shared in the service agreement; we aim for clarity and fair terms.' },
                  { q: 'How do you ensure the quality of partner accommodation?', a: 'We verify partners through on-ground checks, traveler reviews, and contract transparency. Listings marked "Verified" have passed our checks and offer support channels.' }
                ].map((item, i) => (
                  <div key={i} className="mb-3 border border-gray-100 rounded-xl overflow-hidden bg-white shadow-sm">
                    <button
                      aria-expanded={activeFaq === i}
                      onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left"
                    >
                      <span className="text-gray-800 font-semibold">{item.q}</span>
                      <svg className={`w-5 h-5 text-gray-500 transform transition-transform ${activeFaq === i ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    <div className={`px-5 pb-4 transition-max-h duration-300 ease-in-out ${activeFaq === i ? 'max-h-96' : 'max-h-0'} overflow-hidden text-gray-700`}> 
                      <div className="pt-1">{item.a}</div>
                    </div>
                  </div>
                ))}
              </div>
              </div>

              
            </div>
          </div>
        </section>
      <Footer />
    </div>
  );
};

export default HomePage;
