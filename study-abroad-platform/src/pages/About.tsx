import Navbar from '../components/Navbar'
// About images are expected to live in src/assets/AboutSection as S1..S10 (png/jpg)
import Footer from '../components/Footer'

const features = [
  { title: 'End-to-End Study Abroad Consultancy', desc: 'From application to arrival, we guide students at every step.' },
  { title: 'Global Reach', desc: 'Access 100,000+ courses across 920+ universities in 35+ countries, including Ivy League and top-ranked institutions.' },
  { title: 'Financial Guidance', desc: 'Education loan assistance from both private and government banks, blocked accounts, forex accounts.' },
  { title: 'Complete Application Support', desc: 'Expert help with SOPs, LORs, and document preparation.' },
  { title: 'Test Preparation Assistance', desc: 'Guidance for IELTS, GRE, GMAT, and other English proficiency exams.' },
  { title: 'Visa & Pre-Departure Support', desc: 'Smooth visa process, travel guidance, SIM, and blocked account assistance.' },
  { title: 'Accommodation & Settlement Help', desc: 'Find safe and affordable options abroad.' },
  { title: 'Post-Admission Academic Support', desc: 'Coursework help through consultancy to ease your academic transition in western pattern by PhD experts.' },
  { title: 'Personalised Counselling', desc: 'One-to-one expert mentoring to align your goals with the right study destination.' },
  { title: 'Trusted Expertise', desc: 'Powered by years of academic excellence and genuine care for student success.' }
]

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navbar />

      <main className="container mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">About Codescholar Overseas</h1>
          <p className="text-lg text-gray-700">We help students move from ambition to acceptance — full-service guidance across counselling, applications, finance, test prep, visas and post-arrival support.</p>
        </div>

        <div className="space-y-12">
          {features.map((f, i) => {
            // resolve image path using Vite-friendly URL construction
            const imgUrl = (() => {
              try {
                return new URL(`../assets/AboutSection/S${i + 1}.png`, import.meta.url).href
              } catch (e) {
                try {
                  return new URL(`../assets/AboutSection/S${i + 1}.jpg`, import.meta.url).href
                } catch (e) {
                  return ''
                }
              }
            })()

            return (
              <section key={i} className="grid md:grid-cols-2 gap-4 items-center">
                {/* image container - alternates sides on md+ screens */}
                <div className={`${i % 2 === 0 ? 'md:order-first' : 'md:order-last'} flex justify-center`}>
                  {imgUrl ? (
                    // alternate circle vs rectangle shape for variety
                    i % 2 === 0 ? (
                      <img src={imgUrl} alt={f.title} className="w-56 h-56 rounded-full object-cover shadow-lg border-4 border-white" />
                    ) : (
                      <img src={imgUrl} alt={f.title} className="w-72 h-48 rounded-2xl object-cover shadow-lg border border-gray-100" />
                    )
                  ) : (
                    i % 2 === 0 ? (
                      <div className="w-56 h-56 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center shadow-lg border-4 border-white">
                        <div className="text-sm text-gray-500">Image</div>
                      </div>
                    ) : (
                      <div className="w-72 h-48 rounded-2xl bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center shadow-lg border border-gray-100">
                        <div className="text-sm text-gray-500">Image</div>
                      </div>
                    )
                  )}
                </div>

                <div className={`${i % 2 === 0 ? 'md:order-last' : 'md:order-first'}`}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{f.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{f.desc}</p>

                  {/* editable image slot hint for maintainers */}
                  <div className="mt-4 text-sm text-gray-500">Bring the story to life — swap these placeholders with your own photos to showcase campuses, mentors, and student success.</div>
                </div>
              </section>
            )
          })}
        </div>

        {/* decorative shapes */}
        <div aria-hidden className="pointer-events-none">
          <div className="hidden md:block absolute right-8 top-40 w-40 h-40 rounded-full bg-blue-50 opacity-60 transform rotate-45" />
          <div className="hidden md:block absolute left-6 bottom-40 w-24 h-24 rounded-xl bg-indigo-50 opacity-60" />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default About
