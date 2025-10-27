// ============================================================================
// SearchResults Component - With WhatsApp Integration + Lead Modal hook
// ============================================================================

import React, { useState, useEffect } from 'react'
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import {
  BookOpenIcon,
  MapPinIcon,
  ClockIcon,
  DollarSignIcon,
  ArrowLeftIcon,
  AlertCircleIcon,
  RefreshCwIcon,
  DatabaseIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
  GlobeIcon
} from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import Navbar from '../components/Navbar'
import LeadRegistrationModal from '../components/LeadRegistrationModal'

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
  // Router
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  // Data state
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState<Pagination | null>(null)

  // Client-side search within results
  const [allCourses, setAllCourses] = useState<Course[]>([])
  const [withinPageSearch, setWithinPageSearch] = useState('')
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
  const [isSearchingWithin, setIsSearchingWithin] = useState(false)

  // Inline search controls
  const [localCourse, setLocalCourse] = useState('')
  const [localCountry, setLocalCountry] = useState('')

  // Lead modal controls
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [leadSuccess, setLeadSuccess] = useState(false)

  // URL params
  const courseQuery = searchParams.get('course') || ''
  const countryQuery = searchParams.get('country') || ''
  const currentPage = parseInt(searchParams.get('page') || '1')
  const limitPerPage = parseInt(searchParams.get('limit') || '30')

  // Effects
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
      const q = withinPageSearch.toLowerCase()
      const searchResults = allCourses.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.university_name.toLowerCase().includes(q) ||
        (c.description || '').toLowerCase().includes(q) ||
        c.field_of_study.toLowerCase().includes(q) ||
        c.course_level.toLowerCase().includes(q)
      )
      setFilteredCourses(searchResults)
      setIsSearchingWithin(true)
    }
  }, [courses, allCourses, withinPageSearch])

  // Options
  const countries = [
    { value: '', label: 'All Countries' },
    { value: 'United States', label: 'United States 🇺🇸' },
    { value: 'United Kingdom', label: 'United Kingdom 🇬🇧' },
    { value: 'Canada', label: 'Canada 🇨🇦' },
    { value: 'Australia', label: 'Australia 🇦🇺' },
    { value: 'Germany', label: 'Germany 🇩🇪' },
    { value: 'Ireland', label: 'Ireland 🇮🇪' },
    { value: 'France', label: 'France 🇫🇷' },
    { value: 'Netherlands', label: 'Netherlands 🇳🇱' },
    { value: 'New Zealand', label: 'New Zealand 🇳🇿' }
  ]

  // API
  const fetchCourses = async () => {
    setLoading(true)
    setError(null)

    try {
      const countryMap: { [k: string]: string } = {
        'United States': '6',
        'United Kingdom': '5',
        'Canada': '2',
        'Australia': '1',
        'Germany': '3',
        'France': '8',
        'Ireland': '4',
        'Netherlands': '9',
        'New Zealand': '7'
      }
      const countryId = countryMap[countryQuery] || ''

      const params = new URLSearchParams({
        field_of_study: courseQuery,
        country_id: countryId,
        page: String(currentPage),
        limit: String(limitPerPage)
      })

      const allParams = new URLSearchParams({
        field_of_study: courseQuery,
        country_id: countryId,
        page: '1',
        limit: '1000'
      })

      // API base URL - Updated for your Hostinger setup  
      const API_BASE_URL = window.location.hostname === 'localhost' 
        ? 'http://localhost/studyabroadplatform-api/api' 
        : '/studyabroadplatform-api/api'

      console.log('Current hostname:', window.location.hostname)
      console.log('API Base URL:', API_BASE_URL)

      const [currentResponse, allResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/search_smart.php?${params}`),
        fetch(`${API_BASE_URL}/search_smart.php?${allParams}`)
      ])

      console.log('API URL called:', `${API_BASE_URL}/search_smart.php?${params}`)
      console.log('Response status:', currentResponse.status)

      if (!currentResponse.ok || !allResponse.ok) {
        throw new Error(`HTTP error! status: ${currentResponse.status}`)
      }

      const [currentData, allData]: [ApiResponse, ApiResponse] = await Promise.all([
        currentResponse.json(),
        allResponse.json()
      ])

      console.log('API Response received:', currentData)
      console.log('Response structure:', {
        success: currentData.success,
        dataLength: currentData.data?.length,
        pagination: currentData.pagination
      })

      if (currentData.success && allData.success) {
        setCourses(currentData.data || [])
        setAllCourses(allData.data || [])
        setFilteredCourses(currentData.data || [])
        setPagination(currentData.pagination)
        
        // If no results found with exact search, try fallback searches for common program keywords
        if ((!currentData.data || currentData.data.length === 0) && courseQuery) {
          console.log('No results found, trying fallback searches...')
          await tryFallbackSearch(courseQuery, countryId)
        }
      } else {
        setError('No courses found matching your criteria')
        setCourses([])
        setAllCourses([])
        setFilteredCourses([])
        setPagination(null)
      }
    } catch (err) {
      console.error('Error fetching courses:', err)
      setError('Failed to connect to the API. Make sure your PHP server is running.')
      setCourses([])
      setAllCourses([])
      setFilteredCourses([])
      setPagination(null)
    }
    setLoading(false)
  }

  // Fallback search function to try alternative search terms
  const tryFallbackSearch = async (originalQuery: string, countryId: string) => {
    const fallbackTerms: { [key: string]: string[] } = {
      'Business & Management': ['Business', 'Management', 'MBA', 'Commerce'],
      'Engineering & Technology': ['Engineering', 'Technology', 'Computer', 'Mechanical'],
      'Computer Science & IT': ['Computer', 'IT', 'Software', 'Technology'],
      'Medicine & Healthcare': ['Medicine', 'Medical', 'Health', 'MBBS'],
      'Science & Research': ['Science', 'Research', 'Biology', 'Chemistry'],
      'Arts & Humanities': ['Arts', 'Humanities', 'Literature', 'History'],
      'Law & Legal Studies': ['Law', 'Legal', 'LLB', 'LLM']
    }

    const searchTerms = fallbackTerms[originalQuery] || [originalQuery.split(' ')[0], originalQuery.split('&')[0].trim()]
    
    for (const term of searchTerms) {
      try {
        const params = new URLSearchParams({
          field_of_study: term.trim(),
          country_id: countryId,
          page: '1',
          limit: String(limitPerPage)
        })

        const API_BASE_URL = window.location.hostname === 'localhost' 
          ? 'http://localhost/studyabroadplatform-api/api' 
          : '/studyabroadplatform-api/api'

        const response = await fetch(`${API_BASE_URL}/search_smart.php?${params}`)
        if (response.ok) {
          const data: ApiResponse = await response.json()
          if (data.success && data.data && data.data.length > 0) {
            console.log(`Fallback search successful with term: ${term}`)
            setCourses(data.data)
            setFilteredCourses(data.data)
            setPagination(data.pagination)
            setError(null)
            return // Success, stop trying other terms
          }
        }
      } catch (err) {
        console.log(`Fallback search failed for term: ${term}`)
      }
    }
  }

  // Events
  const handleSearch = () => {
    const newParams = new URLSearchParams()
    if (localCourse.trim()) newParams.set('course', localCourse.trim())
    if (localCountry) newParams.set('country', localCountry)
    newParams.set('page', '1')
    newParams.set('limit', String(limitPerPage))
    navigate(`/search-results?${newParams.toString()}`)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch()
  }

  const clearAllFilters = () => {
    setLocalCourse('')
    setLocalCountry('')
    navigate('/search-results')
  }

  const handleWithinPageSearch = (q: string) => setWithinPageSearch(q)
  const handleRetry = () => fetchCourses()

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams)
    newParams.set('page', String(newPage))
    setSearchParams(newParams)
  }

  const handleLimitChange = (newLimit: number) => {
    const newParams = new URLSearchParams(searchParams)
    newParams.set('limit', String(newLimit))
    newParams.set('page', '1')
    setSearchParams(newParams)
  }

  // Utils
  const formatCurrency = (amount: string, currency: string) => {
    if (!amount || amount === '0') return 'Contact University'
    const currencySymbols: { [k: string]: string } = {
      USD: '$',
      GBP: '£',
      EUR: '€',
      CAD: 'C$',
      AUD: 'A$',
      CHF: 'CHF'
    }
    const symbol = currencySymbols[currency] || currency
    return `${symbol}${parseFloat(amount).toLocaleString()}`
  }

  // WhatsApp
  const whatsappConfig = {
    businessNumber: '918777841275', //  country code + number, no + or spaces
    messageTemplate: (course: Course) =>
      `Hi! I want more information about this course:\n\n` +
      `🎓 Course: ${course.title}\n` +
      `🏛️ University: ${course.university_name}\n` +
      `📍 Location: ${course.university_city ? `${course.university_city}, ` : ''}${course.country_name}\n` +
      `⏱️ Duration: ${course.duration || 'Not specified'}\n` +
      `📚 Level: ${course.course_level}\n\n` +
      `Please provide details about:\n• Tuition fees\n• Admission requirements\n• Application process\n• Scholarship opportunities\n• Campus facilities\n\n` +
      `Thank you!`
  }

  const handleGetMoreInfo = (course: Course) => {
    const message = whatsappConfig.messageTemplate(course)
    const encoded = encodeURIComponent(message)
    const url = `https://wa.me/${whatsappConfig.businessNumber}?text=${encoded}`
    window.open(url, '_blank')
  }

  // Lead Modal flow for Learn More
  const handleLearnMore = (course: Course) => {
    setSelectedCourse(course)
    setIsLeadModalOpen(true)
  }

  const handleLeadSuccess = (_leadData: any) => {
    setLeadSuccess(true)
    setTimeout(() => setLeadSuccess(false), 5000)
  }

  // Components
  const PaginationControls = () => {
    if (!pagination || pagination.total_pages <= 1) return null

    const generatePageNumbers = () => {
      const current = pagination.current_page
      const total = pagination.total_pages
      const pages: (number | '...')[] = []

      if (total <= 7) {
        for (let i = 1; i <= total; i++) pages.push(i)
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
            {generatePageNumbers().map((page, idx) => (
              <React.Fragment key={idx}>
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
  }

  // Render
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4 transition-colors font-medium"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Search
          </Link>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Results</h1>

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
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Search & Filter Courses</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {isSearchingWithin ? (
                      <>
                        Showing <strong>{filteredCourses.length}</strong> matches
                      </>
                    ) : (
                      <>
                        Showing <strong>{pagination?.showing_from || 0}-{pagination?.showing_to || 0}</strong> of{' '}
                        <strong>{pagination?.total_courses || 0}</strong> courses
                      </>
                    )}
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

              {/* Inline controls */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
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

                <button
                  onClick={handleSearch}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center"
                >
                  <SearchIcon className="h-4 w-4 mr-2" />
                  Search Courses
                </button>
              </div>

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

            {/* Search within results */}
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

        {/* Results */}
        {loading ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center py-8">
              <RefreshCwIcon className="animate-spin h-8 w-8 text-blue-600 mr-3" />
              <span className="text-lg text-gray-600">Searching courses...</span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 30 }, (_, i) => (
                <div key={i} className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded mb-2" />
                  <div className="h-3 bg-gray-200 rounded mb-4 w-3/4" />
                  <div className="h-20 bg-gray-200 rounded mb-4" />
                  <div className="flex justify-between">
                    <div className="h-3 bg-gray-200 rounded w-1/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/4" />
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
                      Showing <strong>{pagination.showing_from}-{pagination.showing_to}</strong> of{' '}
                      <strong>{pagination.total_courses}</strong> courses
                    </>
                  ) : null}
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-shadow p-6 h-full flex flex-col"
                >
                  <div className="mb-4 flex-grow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
                      {course.title}
                    </h3>
                    <p className="text-blue-600 font-medium text-sm mb-1">{course.university_name}</p>
                    {course.university_city && (
                      <p className="text-sm text-gray-500">
                        {course.university_city}, {course.country_name}
                      </p>
                    )}
                  </div>

                  {course.description && (
                    <p className="text-gray-600 mb-4 line-clamp-2 text-sm">{course.description}</p>
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

                  {/* Actions */}
                  <div className="flex gap-2 mt-auto">
                    <button
                      onClick={() => handleLearnMore(course)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors font-medium text-sm inline-flex items-center justify-center"
                      title="Learn more (register to proceed)"
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
                <h3 className="text-lg font-medium text-gray-900 mb-2">No matches found</h3>
                <p className="text-gray-500 mb-4">No courses match "{withinPageSearch}".</p>
                <p className="text-sm text-gray-400">
                  Try different keywords like university names, course types, or program levels.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <DatabaseIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search criteria or try a different field of study.</p>

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

      {/* Lead Registration Modal */}
      {selectedCourse && (
        <LeadRegistrationModal
          isOpen={isLeadModalOpen}
          onClose={() => setIsLeadModalOpen(false)}
          course={selectedCourse}
          onSuccess={handleLeadSuccess}
        />
      )}

      {/* Success Toast */}
      {leadSuccess && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg">
          ✅ Registration successful! We will contact soon.
        </div>
      )}
    </div>
  )
}

export default SearchResults
