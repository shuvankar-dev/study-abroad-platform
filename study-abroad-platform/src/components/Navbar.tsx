import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MenuIcon, XIcon } from 'lucide-react'
import logo from '../assets/logo.png'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [destOpen, setDestOpen] = useState(false)
  const [mobileDestOpen, setMobileDestOpen] = useState(false)
  const navigate = useNavigate()

  const countries = [
    'Australia',
    'Canada',
    'Germany',
    'Ireland',
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
          <a href="/" className="flex items-center space-x-4 group">
            <div className="flex items-center justify-center w-28 h-28 md:w-40 md:h-40 rounded-lg overflow-hidden group-hover:scale-105 transition-transform">
              <img src={logo} alt="StudyAbroad logo" className="w-full h-full object-contain bg-white/0" />
            </div>
            {/* <div>
              <span className="text-2xl font-bold text-gray-900">
                Study abroad
              </span>
              <div className="text-xs text-blue-600 -mt-1">Platform</div>
            </div> */}
          </a>

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
            <button onClick={() => navigate('/')} className="text-gray-700 hover:text-gray-900 px-3 py-2 text-base lg:text-lg font-medium transition-colors">
              Products
            </button>
            <button onClick={() => navigate('/services')} className="text-gray-700 hover:text-gray-900 px-3 py-2 text-base lg:text-lg font-medium transition-colors">
              Services
            </button>
            <button onClick={() => navigate('/about')} className="text-gray-700 hover:text-gray-900 px-3 py-2 text-base lg:text-lg font-medium transition-colors">
              About
            </button>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="bg-gradient-to-r from-primary to-accent hover:from-primary-700 hover:to-accent text-white px-6 py-2 rounded-lg text-base font-medium transition-all">
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
              <a href="#" className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium">
                Destinations
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium">
                Programs
              </a>
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
              <a href="#" className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium">
                Services
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium">
                About
              </a>
              <div className="border-t border-gray-100 pt-3">
                <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-2 rounded-lg text-base font-medium mt-2">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
