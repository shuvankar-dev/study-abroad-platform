
import React, { useState, useRef, useEffect } from 'react';
import { SearchIcon, MapPinIcon, BookOpenIcon, ChevronDownIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import s1 from '../assets/Herosection/s1.png';
import s2 from '../assets/Herosection/s2.png';
import s3 from '../assets/Herosection/s3.png';
import s4 from '../assets/Herosection/s4.png';
import s5 from '../assets/Herosection/s5.png';
import s6 from '../assets/Herosection/s6.png';

interface HeroSectionProps {
  onOpenRegistration?: () => void
}

const HeroSection: React.FC<HeroSectionProps> = ({ onOpenRegistration }) => {
  const [course, setCourse] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const countries = [
    { name: 'Australia', flag: '🇦🇺', code: 'AU' },
    { name: 'Canada', flag: '🇨🇦', code: 'CA' },
    { name: 'Germany', flag: '🇩🇪', code: 'DE' },
    { name: 'United Kingdom', flag: '🇬🇧', code: 'UK' },
    { name: 'United States', flag: '🇺🇸', code: 'US' }
  ]

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCountryDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (course && selectedCountry) {
      navigate(`/search-results?course=${encodeURIComponent(course)}&country=${encodeURIComponent(selectedCountry)}`)
    }
  }

  return (
  <section className="relative min-h-[80vh] bg-gradient-to-br from-primary-50 via-white to-primary-100 flex items-center py-8 md:py-16">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-100/30"></div>
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-indigo-100/30"></div>
      </div>

      <div className="container relative mx-auto px-4 py-8 z-10">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-0">
          {/* Left: Heading, description, CTA, search */}
          <div className="w-full md:w-1/2 text-left md:pr-8 space-y-8 flex flex-col justify-center">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Study Abroad, <br />
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Shape Your Tomorrow</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 max-w-xl">
                Connect with world-class universities, discover your dream course, and experience a life-changing journey. Your global adventure starts here—let’s make it extraordinary!
              </p>
              <div className="bg-gradient-to-r from-primary-100 to-white rounded-xl px-5 py-3 shadow flex items-center gap-3 border border-primary-100">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span className="text-base md:text-lg font-semibold text-primary-700">Fast-track your dreams with premium guidance & exclusive scholarships!</span>
              </div>
            </div>
            <button onClick={() => onOpenRegistration && onOpenRegistration()} className="bg-gradient-to-r from-primary to-accent hover:from-primary-700 hover:to-accent text-white font-semibold px-8 py-3 rounded-lg shadow-xl transition mb-4 mt-2 w-fit">Register Now</button>
          </div>
          {/* Right: Diamond images */}
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <div className="grid grid-cols-3 gap-4 md:gap-6">
              {[
                { src: s1, alt: 'Student 1', pos: 'col-start-2 row-start-1' },
                { src: s2, alt: 'Student 2', pos: 'col-start-1 row-start-2' },
                { src: s3, alt: 'Student 3', pos: 'col-start-2 row-start-2' },
                { src: s4, alt: 'Student 4', pos: 'col-start-3 row-start-2' },
                { src: s5, alt: 'Student 5', pos: 'col-start-2 row-start-3' },
                { src: s6, alt: 'Student 6', pos: 'col-start-3 row-start-3' },
              ].map((img, idx) => (
                <div
                  key={img.alt}
                   className={`w-32 h-32 md:w-44 md:h-44 bg-white shadow-xl rounded-2xl flex items-center justify-center transform rotate-45 overflow-hidden ${img.pos}`}
                  style={{ zIndex: 10 - idx }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover -rotate-45 scale-[1.25] -m-4"
                    style={{ minWidth: '120%', minHeight: '120%' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Search Section - Full Width Below Hero */}
        <div className="w-full max-w-6xl mx-auto mt-12">
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 lg:p-6 shadow-2xl">
            <div className="mb-4 lg:mb-6 text-center">
              <span className="block text-xl lg:text-2xl xl:text-3xl font-bold text-blue-700 tracking-tight">
                Join <span className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">thousands</span> of students finding their path
              </span>
            </div>
            <form onSubmit={handleSearch}>
              <div className="grid gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-blue-700">What do you want to study?</label>
                  <div className="relative">
                    <BookOpenIcon className="absolute left-3 top-3 h-5 w-5 text-blue-500" />
                    <input 
                      type="text" 
                      placeholder="e.g., Computer Science, MBA"
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                      className="w-full rounded-lg border border-blue-100 bg-white py-3 pl-10 pr-4 text-gray-900 placeholder-blue-300 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 transition text-sm lg:text-base"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2" ref={dropdownRef}>
                  <label className="text-sm font-semibold text-blue-700">Where do you want to study?</label>
                  <div className="relative">
                    <MapPinIcon className="absolute left-3 top-3 h-5 w-5 text-blue-500 z-10" />
                    <button
                      type="button"
                      onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                      className="w-full rounded-lg border border-blue-100 bg-white py-3 pl-10 pr-10 text-left text-gray-900 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 transition text-sm lg:text-base"
                    >
                      {selectedCountry || "Select a country"}
                    </button>
                    <ChevronDownIcon 
                      className={`absolute right-3 top-3 h-5 w-5 text-blue-400 transition-transform duration-200 ${
                        isCountryDropdownOpen ? 'rotate-180' : ''
                      }`} 
                    />
                    {isCountryDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-blue-100 rounded-lg shadow-2xl max-h-60 overflow-y-auto z-[9999]">
                        <div className="p-2">
                          <div className="text-xs font-semibold text-blue-600 px-3 py-2 border-b border-blue-50">
                            Search by Destination Country
                          </div>
                          {countries.map((country) => (
                            <button
                              key={country.code}
                              type="button"
                              onClick={() => {
                                setSelectedCountry(country.name)
                                setIsCountryDropdownOpen(false)
                              }}
                              className="flex items-center space-x-3 w-full px-3 py-3 text-left hover:bg-blue-50 rounded-md transition-colors duration-150"
                            >
                              <span className="text-xl">{country.flag}</span>
                              <span className="text-gray-900 font-medium text-sm lg:text-base">{country.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-end sm:col-span-2 lg:col-span-1">
                  <button
                    type="submit"
                    disabled={!course || !selectedCountry}
                    className="w-full bg-gray-600 hover:bg-gray-700 focus:ring-2 focus:ring-gray-300 py-3 text-base lg:text-lg font-bold text-white rounded-lg shadow-md transition-all flex items-center justify-center hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <SearchIcon className="mr-2 h-5 w-5" />
                    Search Courses
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
};
export default HeroSection;