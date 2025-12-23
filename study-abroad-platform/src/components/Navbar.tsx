import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { MenuIcon, XIcon } from 'lucide-react'
import RegistrationModal from './RegistrationModal'

import logo from '../assets/logo.png'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [destOpen, setDestOpen] = useState(false)
  const [mobileDestOpen, setMobileDestOpen] = useState(false)
  const [productOpen, setProductOpen] = useState(false)
  const [isRegOpen, setIsRegOpen] = useState(false)
  const navigate = useNavigate()

  const countries = [
    'Australia',
    'Canada',
    'France',
    'Germany',
    'Ireland',
    'Netherlands',
    'New Zealand',
    'United Kingdom',
    'United States'
  ]

  const goToCountry = (country: string) => {
    // navigate to search results with country param
    const params = new URLSearchParams()
    params.set('country', country)
    navigate(`/search-results?${params.toString()}`)
    // close menus
    setDestOpen(false)
    setIsOpen(false)
    setMobileDestOpen(false)
  }

  return (
  <nav className="bg-white shadow sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="relative flex items-center"
            onMouseEnter={() => setProductOpen(true)}
            onMouseLeave={() => setProductOpen(false)}
          >
            <a href="/" className="flex items-center group">
              <div className="flex items-center justify-center w-28 h-28 md:w-40 md:h-40 rounded-lg overflow-hidden group-hover:scale-105 transition-transform">
                <img src={logo} alt="StudyAbroad logo" className="w-full h-full object-contain bg-white/0" />
              </div>
            </a>
            {/* Dropdown icon for products */}
            <button
              className="ml-1 mt-2 text-orange-500 hover:text-orange-600 focus:outline-none flex items-center"
              onClick={() => setProductOpen((s) => !s)}
              aria-label="Show products dropdown"
            >
              <svg width="22" height="22" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 8l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            {/* Dropdown menu */}
            {productOpen && (
              <div className="absolute left-0 top-full mt-2 w-64 bg-white border border-gray-100 rounded-xl shadow-lg z-50 p-4">
                <div className="text-xs font-semibold text-gray-500 mb-3 pl-1">PRODUCTS</div>
                <div className="flex flex-col gap-3">
                  <a 
                    href="https://codescholaroverseas.com/consultants" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg">C</span>
                    <span className="font-medium text-gray-800">Codescholar Overseas</span>
                  </a>
                  <a 
                    href="https://codescholarwriters.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="w-8 h-8 rounded bg-green-100 flex items-center justify-center text-green-700 font-bold text-lg">C</span>
                    <span className="font-medium text-gray-800">Codescholar Writers</span>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative" onMouseEnter={() => setDestOpen(true)} onMouseLeave={() => setDestOpen(false)}>
              <button onClick={() => setDestOpen((s) => !s)} className="text-gray-700 hover:text-gray-900 px-3 py-2 text-base lg:text-lg font-medium transition-colors flex items-center gap-2">
                Destinations
                <svg className="w-3 h-3 text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" /></svg>
              </button>
              {destOpen && (
                <div className="absolute left-0 mt-2 w-44 bg-white border border-gray-100 rounded-lg shadow-lg z-50">
                  <div className="py-2">
                    {countries.map((c) => (
                      <button key={c} onClick={() => goToCountry(c)} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">{c}</button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button onClick={() => navigate('/search-results')} className="text-gray-700 hover:text-gray-900 px-3 py-2 text-base lg:text-lg font-medium transition-colors">
              Programs
            </button>
            <button onClick={() => navigate('/explore')} className="text-gray-700 hover:text-gray-900 px-3 py-2 text-base lg:text-lg font-medium transition-colors">
              Explore
            </button>
            <button onClick={() => navigate('/services')} className="text-gray-700 hover:text-gray-900 px-3 py-2 text-base lg:text-lg font-medium transition-colors">
              Services
            </button>
            <button onClick={() => navigate('/about')} className="text-gray-700 hover:text-gray-900 px-3 py-2 text-base lg:text-lg font-medium transition-colors">
              About
            </button>
            <button onClick={() => navigate('/consultants')} className="text-gray-700 hover:text-gray-900 px-3 py-2 text-base lg:text-lg font-medium transition-colors">
              Consultants
            </button>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => setIsRegOpen(true)}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary-700 hover:to-accent text-white px-6 py-2 rounded-lg text-base font-medium transition-all"
            >
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-gray-900 p-2"
            >
              {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
          {isOpen && (
          <div className="md:hidden bg-white rounded-lg mt-2 mb-4 border border-gray-100 shadow-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/" className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium" onClick={() => setIsOpen(false)}>
                Home
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium" onClick={() => setIsOpen(false)}>
                About
              </Link>
              <Link to="/services" className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium" onClick={() => setIsOpen(false)}>
                Services
              </Link>
              <Link to="/explore" className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium" onClick={() => setIsOpen(false)}>
                Explore
              </Link>
              <Link to="/consultants" className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium" onClick={() => setIsOpen(false)}>
                Consultants
              </Link>
              <div>
                <button onClick={() => setMobileDestOpen((s) => !s)} className="w-full text-left text-gray-700 hover:text-gray-900 px-3 py-2 text-base font-medium flex items-center justify-between">
                  Destinations
                  <span>{mobileDestOpen ? '−' : '+'}</span>
                </button>
                {mobileDestOpen && (
                  <div className="pl-4">
                    {countries.map(c => (
                      <button key={c} onClick={() => goToCountry(c)} className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">{c}</button>
                    ))}
                  </div>
                )}
              </div>
              <div className="px-3 py-2">
                <button 
                  onClick={() => {setIsRegOpen(true); setIsOpen(false)}}
                  className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <RegistrationModal isOpen={isRegOpen} onClose={() => setIsRegOpen(false)} source="other" />
    </nav>
  )
}

export default Navbar
