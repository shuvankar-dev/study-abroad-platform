// ============================================================================
// SearchResults Component - With WhatsApp Integration (CORRECTED)
// ============================================================================

import React, { useState, useEffect } from 'react'
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import { BookOpenIcon, MapPinIcon, ClockIcon, DollarSignIcon, ArrowLeftIcon, AlertCircleIcon, RefreshCwIcon, DatabaseIcon, ChevronLeftIcon, ChevronRightIcon, SearchIcon, GlobeIcon } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa' // WhatsApp icon
import Navbar from '../components/Navbar'

// ============================================================================
// TypeScript Interfaces
// ============================================================================

interface Course {
  id: number
  title: string
  university_name: string
  country_name: string
  duration: string
  tuition_fee: string
  currency: string
  description: string
  course_level: string
  field_of_study: string
  university_city: string
  ielts_requirement: number
  scholarship_available: boolean
  university_website?: string
}

interface Pagination {
  current_page: number
  per_page: number
  total_courses: number
  total_pages: number
  has_next_page: boolean
  has_previous_page: boolean
  showing_from: number
  showing_to: number
}

interface ApiResponse {
  success: boolean
  data: Course[]
  pagination: Pagination
  filters_applied: {
    field_of_study: string
    country_id: string
  }
}

// ============================================================================
// Main SearchResults Component
// ============================================================================

const SearchResults = () => {
  // -------------------------------------------------------------------------
  // Router Hooks
  // -------------------------------------------------------------------------
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  // -------------------------------------------------------------------------
  // State Management
  // -------------------------------------------------------------------------
  
  // Core course data
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState<Pagination | null>(null)
  
  // Enhanced search functionality
  const [allCourses, setAllCourses] = useState<Course[]>([])
  const [withinPageSearch, setWithinPageSearch] = useState('')
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
  const [isSearchingWithin, setIsSearchingWithin] = useState(false)
  
  // Local search state for the inline search bars
  const [localCourse, setLocalCourse] = useState('')
  const [localCountry, setLocalCountry] = useState('')
  
  // -------------------------------------------------------------------------
  // URL Parameters
  // -------------------------------------------------------------------------
  const courseQuery = searchParams.get('course') || ''
  const countryQuery = searchParams.get('country') || ''
  const currentPage = parseInt(searchParams.get('page') || '1')
  const limitPerPage = parseInt(searchParams.get('limit') || '30')

  // -------------------------------------------------------------------------
  // Effects
  // -------------------------------------------------------------------------

  useEffect(() => {
    setLocalCourse(courseQuery)
    setLocalCountry(countryQuery)
  }, [courseQuery, countryQuery])

  useEffect(() => {
    fetchCourses()
  }, [courseQuery, countryQuery, currentPage, limitPerPage])

  useEffect(() => {
    if (!withinPageSearch) {
      setFilteredCourses(courses)
      setIsSearchingWithin(false)
    } else {
      const searchResults = allCourses.filter(course =>
        course.title.toLowerCase().includes(withinPageSearch.toLowerCase()) ||
        course.university_name.toLowerCase().includes(withinPageSearch.toLowerCase()) ||
        course.description.toLowerCase().includes(withinPageSearch.toLowerCase()) ||
        course.field_of_study.toLowerCase().includes(withinPageSearch.toLowerCase()) ||
        course.course_level.toLowerCase().includes(withinPageSearch.toLowerCase())
      )
      setFilteredCourses(searchResults)
      setIsSearchingWithin(true)
    }
  }, [courses, allCourses, withinPageSearch])

  // -------------------------------------------------------------------------
  // Data Arrays
  // -------------------------------------------------------------------------

  const countries = [
    { value: '', label: 'All Countries' },
    { value: 'United States', label: 'United States 🇺🇸' },
    { value: 'United Kingdom', label: 'United Kingdom 🇬🇧' },
    { value: 'Canada', label: 'Canada 🇨🇦' },
    { value: 'Australia', label: 'Australia 🇦🇺' },
    { value: 'Germany', label: 'Germany 🇩🇪' },
    { value: 'France', label: 'France 🇫🇷' },
    { value: 'Netherlands', label: 'Netherlands 🇳🇱' },
    { value: 'Switzerland', label: 'Switzerland 🇨🇭' }
  ]

  // -------------------------------------------------------------------------
  // API Functions
  // -------------------------------------------------------------------------

  const fetchCourses = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const countryMap: { [key: string]: string } = {
        'United States': '6',
        'United Kingdom': '5', 
        'Canada': '2',
        'Australia': '1',
        'Germany': '3',
        'France': '4',
        'Netherlands': '7',
        'Switzerland': '8'
      }
      
      const countryId = countryMap[countryQuery] || ''
    
      const params = new URLSearchParams({
        field_of_study: courseQuery,
        country_id: countryId,
        page: currentPage.toString(),
        limit: limitPerPage.toString()
      })
      
      const allParams = new URLSearchParams({
        field_of_study: courseQuery,
        country_id: countryId,
        page: '1',
        limit: '1000'
      })
      
      const [currentResponse, allResponse] = await Promise.all([
        fetch(`http://localhost/studyabroadplatform-api/api/search_smart.php?${params}`),
        fetch(`http://localhost/studyabroadplatform-api/api/search_smart.php?${allParams}`)
      ])
      
      if (!currentResponse.ok || !allResponse.ok) {
        throw new Error(`HTTP error! status: ${currentResponse.status}`)
      }
      
      const [currentData, allData] = await Promise.all([
        currentResponse.json(),
        allResponse.json()
      ])
      
      if (currentData.success && allData.success) {
        setCourses(currentData.data || [])
        setAllCourses(allData.data || [])
        setFilteredCourses(currentData.data || [])
        setPagination(currentData.pagination)
      } else {
        setError('No courses found matching your criteria')
        setCourses([])
        setAllCourses([])
        setFilteredCourses([])
        setPagination(null)
      }
      
    } catch (error) {
      console.error('Error fetching courses:', error)
      setError('Failed to connect to the API. Make sure your PHP server is running.')
      setCourses([])
      setAllCourses([])
      setFilteredCourses([])
      setPagination(null)
    }
    setLoading(false)
  }

  // -------------------------------------------------------------------------
  // Event Handlers
  // -------------------------------------------------------------------------

  const handleSearch = () => {
    const newParams = new URLSearchParams()
    
    if (localCourse.trim()) newParams.set('course', localCourse.trim())
    if (localCountry) newParams.set('country', localCountry)
    newParams.set('page', '1')
    newParams.set('limit', limitPerPage.toString())
    
    navigate(`/search-results?${newParams.toString()}`)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const clearAllFilters = () => {
    setLocalCourse('')
    setLocalCountry('')
    navigate('/search-results')
  }

  const handleWithinPageSearch = (query: string) => {
    setWithinPageSearch(query)
  }

  const handleRetry = () => {
    fetchCourses()
  }

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams)
    newParams.set('page', newPage.toString())
    setSearchParams(newParams)
  }

  const handleLimitChange = (newLimit: number) => {
    const newParams = new URLSearchParams(searchParams)
    newParams.set('limit', newLimit.toString())
    newParams.set('page', '1')
    setSearchParams(newParams)
  }

  // -------------------------------------------------------------------------
  // Utility Functions
  // -------------------------------------------------------------------------

  const formatCurrency = (amount: string, currency: string) => {
    if (!amount || amount === '0') return 'Contact University'
    
    const currencySymbols: { [key: string]: string } = {
      'USD': '$', 'GBP': '£', 'EUR': '€', 'CAD': 'C$', 'AUD': 'A$', 'CHF': 'CHF'
    }
    
    const symbol = currencySymbols[currency] || currency
    return `${symbol}${parseFloat(amount).toLocaleString()}`
  }

  // -------------------------------------------------------------------------
  // WhatsApp Configuration & Event Handlers (MOVED TO CORRECT LOCATION)
  // -------------------------------------------------------------------------

  /**
   * WhatsApp Business Configuration
   */
  const whatsappConfig = {
    businessNumber: '918274806946', // WhatsApp Business number
    messageTemplate: (course: Course) => `Hi! I want more information about this course:

          Course: ${course.title}
          University: ${course.university_name}
          Location: ${course.university_city ? `${course.university_city}, ` : ''}${course.country_name}
          Duration: ${course.duration || 'Not specified'}
          Level: ${course.course_level}

          Please provide me with more details about:
          • Tuition fees
          • Admission requirements
          • Application process  
          • Scholarship opportunities
          • Campus facilities

          Thank you!`
        }

  /**
   * Handle Learn More button click
   */
  const handleLearnMore = (course: Course) => {
    console.log('Learn More clicked for:', course.title)
    
    if (course.university_website) {
      window.open(course.university_website, '_blank')
    } else {
      // Fallback: search for university
      window.open(`https://www.google.com/search?q=${encodeURIComponent(course.university_name + ' ' + course.country_name)}`, '_blank')
    }
  }

  /**
   * Handle Get More Info button click - Opens WhatsApp Business Chat
   */
  const handleGetMoreInfo = (course: Course) => {
    // Generate auto message with course details
    const message = whatsappConfig.messageTemplate(course)
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message)
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappConfig.businessNumber}?text=${encodedMessage}`
    
    // Open WhatsApp in new tab/window
    window.open(whatsappUrl, '_blank')
    
    console.log('WhatsApp opened for:', course.title, 'at', course.university_name)
  }

  // -------------------------------------------------------------------------
  // Components (CORRECTED STRUCTURE)
  // -------------------------------------------------------------------------

  const PaginationControls = () => {
    if (!pagination || pagination.total_pages <= 1) return null

    const generatePageNumbers = () => {
      const current = pagination.current_page
      const total = pagination.total_pages
      const pages = []

      if (total <= 7) {
        for (let i = 1; i <= total; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        if (current > 3) pages.push('...')
        for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
          pages.push(i)
        }
        if (current < total - 2) pages.push('...')
        if (total > 1) pages.push(total)
      }
      
      return pages
    }

    return (
      <div className="bg-white px-6 py-4 rounded-lg border border-gray-200 mt-6">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
          <div className="text-sm text-gray-700 mb-2 sm:mb-0">
            Showing <span className="font-medium">{pagination.showing_from}</span> to{' '}
            <span className="font-medium">{pagination.showing_to}</span> of{' '}
            <span className="font-medium">{pagination.total_courses}</span> courses
          </div>
          
          <select 
            value={limitPerPage} 
            onChange={(e) => handleLimitChange(parseInt(e.target.value))}
            className="text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="15">15 per page</option>
            <option value="30">30 per page</option>
            <option value="60">60 per page</option>
            <option value="100">100 per page</option>
            <option value="200">200 per page</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!pagination.has_previous_page}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeftIcon className="h-4 w-4 mr-1" />
            Previous
          </button>

          <div className="flex items-center space-x-1">
            {generatePageNumbers().map((page, index) => (
              <React.Fragment key={index}>
                {page === '...' ? (
                  <span className="px-3 py-2 text-sm text-gray-500">...</span>
                ) : (
                  <button
                    onClick={() => handlePageChange(page as number)}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      page === currentPage
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!pagination.has_next_page}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRightIcon className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>
    )
  } // PROPERLY CLOSED PaginationControls

  // -------------------------------------------------------------------------
  // Main Render
  // -------------------------------------------------------------------------

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4 transition-colors font-medium"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Search
          </Link>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Search Results
          </h1>
          
          <p className="text-gray-600">
            {courseQuery || countryQuery ? (
              <>
                Showing courses for{' '}
                {courseQuery && <span className="font-semibold">"{courseQuery}"</span>}
                {courseQuery && countryQuery && ' in '}
                {countryQuery && <span className="font-semibold">{countryQuery}</span>}
              </>
            ) : (
              'Browse all available courses'
            )}
          </p>
        </div>

        {/* Search Interface */}
        {!loading && !error && (
          <div className="space-y-6 mb-6">
            
            {/* Main Search & Filter Section */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    🔍 Search & Filter Courses
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {isSearchingWithin 
                      ? <>Showing <strong>{filteredCourses.length}</strong> matches</>
                      : <>Showing <strong>{pagination?.showing_from || 0}-{pagination?.showing_to || 0}</strong> of <strong>{pagination?.total_courses || 0}</strong> courses</>
                    }
                  </p>
                </div>
                
                {(localCourse || localCountry) && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium px-3 py-1 rounded-md border border-blue-200 hover:bg-blue-50 transition-colors"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>

              {/* 2 Search Bars + Button */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                
                {/* Course Search Bar */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={localCourse}
                    onChange={(e) => setLocalCourse(e.target.value)}
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
                    value={localCountry}
                    onChange={(e) => setLocalCountry(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm appearance-none bg-white"
                  >
                    {countries.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Search Button */}
                <button
                  onClick={handleSearch}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center"
                >
                  <SearchIcon className="h-4 w-4 mr-2" />
                  Search Courses
                </button>
              </div>

              {/* Active Filters Display */}
              {(courseQuery || countryQuery) && (
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-3 font-medium">Active Filters:</p>
                  <div className="flex flex-wrap gap-2">
                    {courseQuery && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Course: {courseQuery}
                      </span>
                    )}
                    {countryQuery && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Country: {countryQuery}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Search Within Results Section */}
            {pagination && allCourses.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-md font-medium text-gray-900">
                    Search within {pagination.total_courses} courses
                  </h4>
                  {withinPageSearch && (
                    <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {filteredCourses.length} matches found
                    </span>
                  )}
                </div>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  
                  <input
                    type="text"
                    value={withinPageSearch}
                    onChange={(e) => handleWithinPageSearch(e.target.value)}
                    placeholder={`Search within ${pagination.total_courses} courses...`}
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                  
                  {withinPageSearch && (
                    <button
                      onClick={() => handleWithinPageSearch('')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600"
                    >
                      <span className="text-gray-400 text-lg">×</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Results Display Section */}
        
        {loading ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center py-8">
              <RefreshCwIcon className="animate-spin h-8 w-8 text-blue-600 mr-3" />
              <span className="text-lg text-gray-600">Searching courses...</span>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({length: 30}, (_, i) => (
                <div key={i} className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4 w-3/4"></div>
                  <div className="h-20 bg-gray-200 rounded mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        ) : error ? (
          <div className="text-center py-12">
            <AlertCircleIcon className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">Search Error</h3>
            <p className="text-gray-500 mb-4">{error}</p>
            <button 
              onClick={handleRetry}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors inline-flex items-center"
            >
              <RefreshCwIcon className="h-4 w-4 mr-2" />
              Try Again
            </button>
          </div>

        ) : filteredCourses.length > 0 ? (
          <div className="space-y-6">
            {/* Results summary */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">
                  {isSearchingWithin ? (
                    <>
                      Showing <strong>{filteredCourses.length}</strong> matches for "{withinPageSearch}"
                      <span className="text-sm text-gray-500 ml-2">
                        (out of {pagination?.total_courses} total courses)
                      </span>
                    </>
                  ) : pagination ? (
                    <>
                      Showing <strong>{pagination.showing_from}-{pagination.showing_to}</strong> of <strong>{pagination.total_courses}</strong> courses
                    </>
                  ) : null}
                </p>
              </div>
            </div>
            
            {/* Course Grid with FUNCTIONAL WHATSAPP BUTTONS */}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-shadow p-6 h-full flex flex-col">
                  
                  <div className="mb-4 flex-grow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
                      {course.title}
                    </h3>
                    <p className="text-blue-600 font-medium text-sm mb-1">{course.university_name}</p>
                    {course.university_city && (
                      <p className="text-sm text-gray-500">{course.university_city}, {course.country_name}</p>
                    )}
                  </div>
                  
                  {course.description && (
                    <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                      {course.description}
                    </p>
                  )}
                  
                  <div className="space-y-2 mb-4 flex-shrink-0">
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPinIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{course.country_name}</span>
                    </div>
                    {course.duration && (
                      <div className="flex items-center text-sm text-gray-500">
                        <ClockIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>{course.duration}</span>
                      </div>
                    )}
                    {course.tuition_fee && (
                      <div className="flex items-center text-sm text-gray-500">
                        <DollarSignIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="font-medium">{formatCurrency(course.tuition_fee, course.currency)}</span>
                      </div>
                    )}
                    {course.course_level && (
                      <div className="flex items-center text-sm text-gray-500">
                        <BookOpenIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>{course.course_level}</span>
                      </div>
                    )}
                    {course.ielts_requirement && course.ielts_requirement > 0 && (
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="text-xs mr-2">📝</span>
                        <span>IELTS: {course.ielts_requirement}</span>
                      </div>
                    )}
                    {course.scholarship_available && (
                      <div className="flex items-center text-sm text-green-600">
                        <span className="text-xs mr-2">🎓</span>
                        <span>Scholarships Available</span>
                      </div>
                    )}
                  </div>
                  
                  {/* ✅ FUNCTIONAL BUTTONS WITH WHATSAPP INTEGRATION */}
                  <div className="flex gap-2 mt-auto">
                    <button 
                      onClick={() => handleLearnMore(course)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors font-medium text-sm inline-flex items-center justify-center"
                      title="Learn more about this course"
                    >
                      <BookOpenIcon className="h-4 w-4 mr-1" />
                      Learn More
                    </button>
                    <button 
                      onClick={() => handleGetMoreInfo(course)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors font-medium text-sm inline-flex items-center justify-center shadow-sm hover:shadow-md"
                      title="Get more info via WhatsApp"
                    >
                      <FaWhatsapp className="h-4 w-4 mr-1" />
                      Get More Info
                    </button>
                  </div>

                </div>
              ))}
            </div>

            {!isSearchingWithin && <PaginationControls />}
            
            {isSearchingWithin && filteredCourses.length === 0 && (
              <div className="text-center py-8 bg-white rounded-lg border border-gray-200">
                <DatabaseIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No matches found
                </h3>
                <p className="text-gray-500 mb-4">
                  No courses match "{withinPageSearch}". 
                </p>
                <p className="text-sm text-gray-400">
                  Try searching for different keywords like university names, course types, or program levels.
                </p>
              </div>
            )}
          </div>

        ) : (
          <div className="text-center py-12">
            <DatabaseIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No courses found
            </h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search criteria or try a different field of study.
            </p>
            
            <div className="mt-6">
              <Link 
                to="/" 
                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors font-medium"
              >
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Try Another Search
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchResults
