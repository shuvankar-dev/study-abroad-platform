

import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';
import Footer from '../components/Footer';
import UserBubble from '../components/UserBubble';
import RegistrationModal from '../components/RegistrationModal';
import { useState, useEffect } from 'react';

// Premium testimonial carousel: 2-row layout (3x2 cards per slide), ultra-smooth movement
const TestimonialCarousel = () => {
  const testimonials = [
    { name: 'Richard Doe', role: 'Designer', text: 'Lorem ipsum dolor sit, amet Odio, incidunt. Ratione, ullam? Iusto id ut omnis repellat.' },
    { name: 'Gordon Doe', role: 'Developer', text: 'Lorem ipsum dolor sit, amet Odio, incidunt. Ratione, ullam? Iusto id ut omnis repellat.' },
    { name: 'John Doe', role: 'CEO & Founder', text: 'Lorem ipsum dolor sit, amet Odio, incidunt. Ratione, ullam? Iusto id ut omnis repellat.' },
    { name: 'John Doe', role: 'CEO & Founder', text: 'Lorem ipsum dolor sit, amet Odio, incidunt. Ratione, ullam? Iusto id ut omnis repellat.' },
    { name: 'Jane Doe', role: 'CTO', text: 'Lorem ipsum dolor sit, amet Odio, incidunt. Ratione, ullam? Iusto id ut omnis repellat.' },
    { name: 'John Smith', role: 'COO', text: 'Lorem ipsum dolor sit, amet Odio, incidunt. Ratione, ullam? Iusto id ut omnis repellat.' },
    // Second set for smooth looping
    { name: 'Jane Smith', role: 'Tech Lead', text: 'Lorem ipsum dolor sit, amet Odio, incidunt. Ratione, ullam? Iusto id ut omnis repellat.' },
    { name: 'Alice Johnson', role: 'Product Manager', text: 'Lorem ipsum dolor sit, amet Odio, incidunt. Ratione, ullam? Iusto id ut omnis repellat.' },
    { name: 'Bob Wilson', role: 'Marketing Lead', text: 'Lorem ipsum dolor sit, amet Odio, incidunt. Ratione, ullam? Iusto id ut omnis repellat.' },
    { name: 'Sarah Davis', role: 'UX Designer', text: 'Lorem ipsum dolor sit, amet Odio, incidunt. Ratione, ullam? Iusto id ut omnis repellat.' },
    { name: 'Mike Chen', role: 'Software Engineer', text: 'Lorem ipsum dolor sit, amet Odio, incidunt. Ratione, ullam? Iusto id ut omnis repellat.' },
    { name: 'Lisa Brown', role: 'Data Analyst', text: 'Lorem ipsum dolor sit, amet Odio, incidunt. Ratione, ullam? Iusto id ut omnis repellat.' }
  ];

  // 6 cards per slide (3x2 grid)
  const cardsPerSlide = 6;
  const slides: any[] = [];
  for (let i = 0; i < testimonials.length; i += cardsPerSlide) {
    slides.push(testimonials.slice(i, i + cardsPerSlide));
  }

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const goToSlide = (index: number) => setCurrentSlide(index);

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="overflow-hidden">
        <div
          className="flex"
          style={{
            transform: `translate3d(-${currentSlide * 100}%, 0, 0)`,
            transition: 'transform 1000ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            willChange: 'transform'
          }}
        >
          {slides.map((slideCards, slideIndex) => (
            <div key={slideIndex} className="w-full flex-shrink-0 px-4">
              {/* 2-row grid: 3 cards per row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Top row - first 3 cards */}
                {slideCards.slice(0, 3).map(
                  (
                    testimonial: { name: string; role: string; text: string },
                    cardIndex: number
                  ) => (
                  <div key={`top-${cardIndex}`} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="text-lg font-semibold text-gray-700">{testimonial.name.charAt(0)}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{testimonial.text}</p>
                  </div>
                ))}
              </div>
              
              {/* Bottom row - next 3 cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {slideCards.slice(3, 6).map(
                  (
                    testimonial: { name: string; role: string; text: string },
                    cardIndex: number
                  ) => (
                  <div key={`bottom-${cardIndex}`} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="text-lg font-semibold text-gray-700">{testimonial.name.charAt(0)}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{testimonial.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center mt-8 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-gray-900' : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

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

        {/* Testimonial Carousel (auto-rotating) */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-7xl mx-auto text-center">
            {/* Header */}
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Meet our happy clients</h2>
            <p className="text-gray-600 mb-8">All of our 1000+ clients are happy</p>
            <button 
              onClick={() => setIsRegOpen(true)}
              className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold mb-12 hover:bg-gray-800 transition-colors"
            >
              Get started for free
            </button>

            <div className="relative">
              {/* Carousel inner - implemented with local state below */}
              <TestimonialCarousel />
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

                  <div className="bg-white rounded-xl p-6 shadow">
                    <h4 className="text-lg font-bold text-gray-900 mb-3">Find Accommodation</h4>
                    <form onSubmit={(e) => { e.preventDefault(); alert('Thanks — request sent (demo)'); }} className="space-y-3">
                      <input name="name" placeholder="Full name" className="w-full px-3 py-2 rounded-md border border-gray-200" />
                      <input name="country" placeholder="Destination country" className="w-full px-3 py-2 rounded-md border border-gray-200" />
                      <input name="university" placeholder="University" className="w-full px-3 py-2 rounded-md border border-gray-200" />
                      <div className="grid grid-cols-2 gap-2">
                        <input name="budget" placeholder="Budget range" className="px-3 py-2 rounded-md border border-gray-200" />
                        <select name="type" className="px-3 py-2 rounded-md border border-gray-200">
                          <option>Shared</option>
                          <option>Private</option>
                          <option>Studio</option>
                        </select>
                      </div>
                      <input name="contact" placeholder="Phone or email" className="w-full px-3 py-2 rounded-md border border-gray-200" />
                      <div className="flex gap-3">
                        <button className="px-4 py-2 rounded-md bg-gradient-to-r from-primary to-accent text-white font-semibold">Find My Accommodation</button>
                        <button type="button" className="px-4 py-2 rounded-md border border-gray-200">Talk to Our Housing Expert</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <UserBubble onOpenRegistration={() => openRegistration('bubble')} />
      <RegistrationModal isOpen={isRegOpen} onClose={() => setIsRegOpen(false)} source={regSource} />

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
