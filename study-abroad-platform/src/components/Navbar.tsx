import React, { useState } from 'react'
import { GlobeIcon, MenuIcon, XIcon } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-gray-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-3 group">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg group-hover:scale-105 transition-transform">
              <GlobeIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold text-white">
                StudyAbroad
              </span>
              <div className="text-xs text-blue-400 -mt-1">Platform</div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
              Destinations
            </a>
            <a href="#" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
              Programs
            </a>
            <a href="#" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
              Services
            </a>
            <a href="#" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
              About
            </a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-300 hover:text-white px-4 py-2 text-sm font-medium transition-colors">
              Sign In
            </button>
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all">
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-gray-800 rounded-lg mt-2 mb-4">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#" className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium">
                Destinations
              </a>
              <a href="#" className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium">
                Programs
              </a>
              <a href="#" className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium">
                Services
              </a>
              <a href="#" className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium">
                About
              </a>
              <div className="border-t border-gray-700 pt-3">
                <button className="w-full text-left text-gray-300 hover:text-white block px-3 py-2 text-base font-medium">
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
