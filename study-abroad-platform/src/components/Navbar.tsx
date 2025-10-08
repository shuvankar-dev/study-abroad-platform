import { useState } from 'react'
import { MenuIcon, XIcon } from 'lucide-react'
import logo from '../assets/logo.png'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
  <nav className="bg-white shadow sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-4 group">
            <div className="flex items-center justify-center w-28 h-28 md:w-34 md:h-34 rounded-lg overflow-hidden group-hover:scale-105 transition-transform">
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
            <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
              Destinations
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
              Programs
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
              Services
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
              About
            </a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-700 hover:text-gray-900 px-4 py-2 text-sm font-medium transition-colors">
              Sign In
            </button>
            <button className="bg-gradient-to-r from-primary to-accent hover:from-primary-700 hover:to-accent text-white px-6 py-2 rounded-lg text-sm font-medium transition-all">
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
              <a href="#" className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium">
                Services
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium">
                About
              </a>
              <div className="border-t border-gray-100 pt-3">
                <button className="w-full text-left text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium">
                  Sign In
                </button>
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
