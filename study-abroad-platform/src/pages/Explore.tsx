import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const destinations = [
  {
    country: 'United States',
    flag: '🇺🇸',
    universities: '4,000+',
    avgCost: '$35,000/year',
    duration: '2-4 years',
    highlights: ['Ivy League Universities', 'Research Opportunities', 'Tech Innovation Hub'],
    image: 'usa-study.jpg',
    bgGradient: 'from-blue-500 to-red-500'
  },
  {
    country: 'United Kingdom',
    flag: '🇬🇧',
    universities: '165+',
    avgCost: '$25,000/year',
    duration: '1-3 years',
    highlights: ['Historic Universities', 'Short Duration', 'Global Recognition'],
    image: 'uk-study.jpg',
    bgGradient: 'from-red-600 to-blue-800'
  },
  {
    country: 'Canada',
    flag: '🇨🇦',
    universities: '96+',
    avgCost: '$20,000/year',
    duration: '2-4 years',
    highlights: ['Immigration Friendly', 'Quality Education', 'Multicultural'],
    image: 'canada-study.jpg',
    bgGradient: 'from-red-500 to-white'
  },
  {
    country: 'Australia',
    flag: '🇦🇺',
    universities: '43+',
    avgCost: '$30,000/year',
    duration: '2-4 years',
    highlights: ['Work Opportunities', 'High Quality of Life', 'Research Excellence'],
    image: 'australia-study.jpg',
    bgGradient: 'from-blue-600 to-green-500'
  },
  {
    country: 'Germany',
    flag: '🇩🇪',
    universities: '400+',
    avgCost: '$500/year',
    duration: '2-3 years',
    highlights: ['Low Cost Education', 'Engineering Excellence', 'No Tuition Fees'],
    image: 'germany-study.jpg',
    bgGradient: 'from-black to-red-600'
  },
  {
    country: 'Ireland',
    flag: '🇮🇪',
    universities: '20+',
    avgCost: '$15,000/year',
    duration: '1-2 years',
    highlights: ['English Speaking', 'EU Access', 'Tech Hub'],
    image: 'ireland-study.jpg',
    bgGradient: 'from-green-600 to-orange-500'
  },
  {
    country: 'France',
    flag: '🇫🇷',
    universities: '80+',
    avgCost: '$3,000/year',
    duration: '1-3 years',
    highlights: ['Cultural Heritage', 'Fashion & Arts', 'Research Excellence'],
    image: 'france-study.jpg',
    bgGradient: 'from-blue-600 to-red-600'
  },
  {
    country: 'Netherlands',
    flag: '🇳🇱',
    universities: '40+',
    avgCost: '$12,000/year',
    duration: '1-3 years',
    highlights: ['English Programs', 'Innovation Hub', 'High Quality of Life'],
    image: 'netherlands-study.jpg',
    bgGradient: 'from-orange-500 to-blue-600'
  },
  {
    country: 'New Zealand',
    flag: '🇳🇿',
    universities: '25+',
    avgCost: '$25,000/year',
    duration: '2-4 years',
    highlights: ['Natural Beauty', 'Safe Environment', 'Adventure Activities'],
    image: 'newzealand-study.jpg',
    bgGradient: 'from-green-500 to-blue-600'
  }
  
]

const programs = [
  {
    title: 'Engineering & Technology',
    icon: '⚙️',
    description: 'Cutting-edge programs in AI, Robotics, Software Engineering',
    universities: '2,500+',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Business & Management',
    icon: '💼',
    description: 'MBA, Finance, Marketing, and Entrepreneurship programs',
    universities: '3,200+',
    color: 'from-green-500 to-emerald-500'
  },
  {
    title: 'Medicine & Healthcare',
    icon: '🏥',
    description: 'Medical, Nursing, Pharmacy, and Health Sciences',
    universities: '1,800+',
    color: 'from-red-500 to-pink-500'
  },
  {
    title: 'Arts & Humanities',
    icon: '🎨',
    description: 'Fine Arts, Literature, Philosophy, and Cultural Studies',
    universities: '2,100+',
    color: 'from-purple-500 to-indigo-500'
  },
  {
    title: 'Science & Research',
    icon: '🔬',
    description: 'Biology, Chemistry, Physics, and Research programs',
    universities: '1,900+',
    color: 'from-orange-500 to-yellow-500'
  },
  {
    title: 'Computer Science',
    icon: '💻',
    description: 'Data Science, Cybersecurity, and Software Development',
    universities: '2,800+',
    color: 'from-teal-500 to-blue-500'
  }
]

const Explore = () => {
  const [selectedTab, setSelectedTab] = useState<'destinations' | 'programs'>('destinations')
  const navigate = useNavigate()

  const searchByCountry = (country: string) => {
    const params = new URLSearchParams()
    params.set('country', country)
    navigate(`/search-results?${params.toString()}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
            Explore Your Future
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Discover world-class universities, cutting-edge programs, and life-changing opportunities across the globe. 
            Your dream education awaits in over 35 countries.
          </p>
          
          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-full p-2 shadow-lg border border-gray-200">
              <button
                onClick={() => setSelectedTab('destinations')}
                className={`px-8 py-3 rounded-full font-semibold transition-all ${
                  selectedTab === 'destinations'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Destinations
              </button>
              <button
                onClick={() => setSelectedTab('programs')}
                className={`px-8 py-3 rounded-full font-semibold transition-all ${
                  selectedTab === 'programs'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Programs
              </button>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-indigo-200 rounded-full opacity-60 animate-pulse delay-1000"></div>
      </section>

  {/* Content Sections */}
  <section className="container mx-auto px-4 pb-20 mt-12">
        {selectedTab === 'destinations' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((dest, i) => (
              <div
                key={i}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
              >
                {/* Card Header: simplified — only show country name */}
                <div className="h-20 bg-white relative flex items-center px-6">
                  <h3 className="text-xl font-bold text-gray-900">{dest.country}</h3>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium text-gray-800">Universities:</span> {dest.universities}
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium text-gray-800">Avg. Cost:</span> {dest.avgCost}
                    </div>
                    <div className="text-sm text-gray-600 col-span-2">
                      <span className="font-medium text-gray-800">Duration:</span> {dest.duration}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Key Highlights:</h4>
                    <ul className="space-y-1">
                      {dest.highlights.map((highlight, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => searchByCountry(dest.country)}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Explore Programs
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedTab === 'programs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, i) => (
              <div
                key={i}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
              >
                {/* small neutral spacer instead of decorative colored band */}
                <div className="h-6 bg-white" />

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{program.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{program.description}</p>
                  
                  <div className="mb-4 text-sm text-gray-600">
                    <span className="font-medium text-gray-800">Universities:</span> {program.universities}
                  </div>

                  <button
                    onClick={() => navigate('/search-results')}
                    className={`w-full bg-gradient-to-r ${program.color} text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                  >
                    View Programs
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  )
}

export default Explore