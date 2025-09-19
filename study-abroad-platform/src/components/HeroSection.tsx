import React from 'react'
import { SearchIcon, MapPinIcon, BookOpenIcon } from 'lucide-react'

const HeroSection = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-100/30"></div>
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-indigo-100/30"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-blue-50/20 to-transparent"></div>
        </div>
      </div>

      <div className="container relative mx-auto px-4 py-20">
        <div className="flex flex-col items-center justify-center text-center min-h-[80vh]">
          {/* Main heading */}
          <div className="max-w-4xl space-y-6 mb-12">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900">
              Your Journey to{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Global Education
              </span>{' '}
              Starts Here
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Discover top universities worldwide, find your perfect course, and get expert guidance for your study abroad dreams.
            </p>
          </div>

          {/* Enhanced Search Form */}
          <div className="w-full max-w-4xl bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-xl">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">What do you want to study?</label>
                <div className="relative">
                  <BookOpenIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="e.g., Computer Science, MBA"
                    className="w-full rounded-lg border border-gray-300 bg-gray-50/50 py-3 pl-10 pr-4 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Where do you want to study?</label>
                <div className="relative">
                  <MapPinIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="e.g., United States, Canada"
                    className="w-full rounded-lg border border-gray-300 bg-gray-50/50 py-3 pl-10 pr-4 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>
              
              <div className="flex items-end">
                <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 py-3 text-lg font-semibold text-white rounded-lg shadow-lg transition-all flex items-center justify-center hover:shadow-xl">
                  <SearchIcon className="mr-2 h-5 w-5" />
                  Search Courses
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {[
              { number: '500+', label: 'Universities', icon: '🏫' },
              { number: '50+', label: 'Countries', icon: '🌍' },
              { number: '10K+', label: 'Students Helped', icon: '👨‍🎓' },
              { number: '95%', label: 'Success Rate', icon: '✅' }
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 mt-1 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
