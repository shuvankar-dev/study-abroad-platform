import React, { useState } from 'react'
import { SearchIcon, GlobeIcon, BookOpenIcon } from 'lucide-react'

interface SearchFiltersBarProps {
  onSearch: (filters: {
    course: string
    country: string
    courseLevel: string
  }) => void
  initialCourse?: string
  initialCountry?: string
  totalCourses: number
  currentResultsCount: number
}

const SearchFiltersBar: React.FC<SearchFiltersBarProps> = ({
  onSearch,
  initialCourse = '',
  initialCountry = '',
  totalCourses,
  currentResultsCount
}) => {
  const [course, setCourse] = useState(initialCourse)
  const [country, setCountry] = useState(initialCountry)
  const [courseLevel, setCourseLevel] = useState('')

  const countries = [
    { value: '', label: 'All Countries' },
    { value: 'United States', label: 'United States' },
    { value: 'United Kingdom', label: 'United Kingdom' },
    { value: 'Canada', label: 'Canada' },
    { value: 'Australia', label: 'Australia' },
    { value: 'Germany', label: 'Germany' },
    { value: 'France', label: 'France' }
  ]

  const courseLevels = [
    { value: '', label: 'All Levels' },
    { value: 'Undergraduate', label: 'Undergraduate' },
    { value: 'Graduate', label: 'Graduate' },
    { value: 'PhD', label: 'PhD' },
    { value: 'Professional', label: 'Professional' },
    { value: 'Certificate', label: 'Certificate' }
  ]

  const handleSearch = () => {
    onSearch({
      course: course.trim(),
      country,
      courseLevel
    })
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const clearAllFilters = () => {
    setCourse('')
    setCountry('')
    setCourseLevel('')
    onSearch({
      course: '',
      country: '',
      courseLevel: ''
    })
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
      {/* Results Summary */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Search & Filter Courses
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {currentResultsCount === totalCourses ? (
              <>Showing all <strong>{totalCourses}</strong> courses</>
            ) : (
              <>Showing <strong>{currentResultsCount}</strong> of <strong>{totalCourses}</strong> courses</>
            )}
          </p>
        </div>
        
        {(course || country || courseLevel) && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear All Filters
          </button>
        )}
      </div>

      {/* 3 Search Bars in One Line */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Course Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search courses (e.g., Computer Science, MBA)"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>

        {/* Country Dropdown */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <GlobeIcon className="h-5 w-5 text-gray-400" />
          </div>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm appearance-none bg-white"
          >
            {countries.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Course Level Dropdown */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <BookOpenIcon className="h-5 w-5 text-gray-400" />
          </div>
          <select
            value={courseLevel}
            onChange={(e) => setCourseLevel(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm appearance-none bg-white"
          >
            {courseLevels.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Search Button */}
      <div className="flex justify-center">
        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center"
        >
          <SearchIcon className="h-4 w-4 mr-2" />
          Search Courses
        </button>
      </div>

      {/* Active Filters Display */}
      {(course || country || courseLevel) && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Active Filters:</p>
          <div className="flex flex-wrap gap-2">
            {course && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Course: {course}
                <button
                  onClick={() => {
                    setCourse('')
                    onSearch({ course: '', country, courseLevel })
                  }}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            )}
            {country && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Country: {country}
                <button
                  onClick={() => {
                    setCountry('')
                    onSearch({ course, country: '', courseLevel })
                  }}
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  ×
                </button>
              </span>
            )}
            {courseLevel && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Level: {courseLevel}
                <button
                  onClick={() => {
                    setCourseLevel('')
                    onSearch({ course, country, courseLevel: '' })
                  }}
                  className="ml-2 text-purple-600 hover:text-purple-800"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchFiltersBar
