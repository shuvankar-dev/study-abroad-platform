import React, { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { BookOpenIcon, MapPinIcon, ClockIcon, DollarSignIcon, ArrowLeftIcon, AlertCircleIcon, RefreshCwIcon, DatabaseIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import Navbar from '../components/Navbar'

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
    course_level: string
  }
}

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState<Pagination | null>(null)
  
  // Search parameters - CHANGED: Default to 30 courses per page
  const courseQuery = searchParams.get('course') || ''
  const countryQuery = searchParams.get('country') || ''
  const currentPage = parseInt(searchParams.get('page') || '1')
  const limitPerPage = parseInt(searchParams.get('limit') || '30') // CHANGED: Default to 30 courses

  useEffect(() => {
    fetchCourses()
  }, [courseQuery, countryQuery, currentPage, limitPerPage])

  const fetchCourses = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Map country names to country IDs
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
      
      // Use the smart search API
      const response = await fetch(`http://localhost/studyabroadplatform-api/api/search_smart.php?${params}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data: ApiResponse = await response.json()
      
      if (data.success) {
        setCourses(data.data || [])
        setPagination(data.pagination)
      } else {
        setError('No courses found matching your criteria')
        setCourses([])
        setPagination(null)
      }
      
    } catch (error) {
      console.error('Error fetching courses:', error)
      setError('Failed to connect to the API. Make sure your PHP server is running.')
      setCourses([])
      setPagination(null)
    }
    setLoading(false)
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
    newParams.set('page', '1') // Reset to first page when changing limit
    setSearchParams(newParams)
  }

  const formatCurrency = (amount: string, currency: string) => {
    if (!amount || amount === '0') return 'Contact University'
    
    const currencySymbols: { [key: string]: string } = {
      'USD': '$',
      'GBP': '£',
      'EUR': '€',
      'CAD': 'C$',
      'AUD': 'A$',
      'CHF': 'CHF'
    }
    
    const symbol = currencySymbols[currency] || currency
    return `${symbol}${parseFloat(amount).toLocaleString()}`
  }

  // UPDATED: Pagination component with better page navigation
  const PaginationControls = () => {
    if (!pagination || pagination.total_pages <= 1) return null

    // Generate page numbers to show
    const generatePageNumbers = () => {
      const current = pagination.current_page
      const total = pagination.total_pages
      const pages = []

      if (total <= 7) {
        // Show all pages if 7 or fewer
        for (let i = 1; i <= total; i++) {
          pages.push(i)
        }
      } else {
        // Show first, last, current, and nearby pages
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
        {/* Results info and per-page selector */}
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

        {/* Page navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!pagination.has_previous_page}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeftIcon className="h-4 w-4 mr-1" />
            Previous
          </button>

          {/* Page numbers */}
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
  }

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
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Search Results
          </h1>
          <p className="text-gray-600">
            Showing courses for <span className="font-semibold">"{courseQuery}"</span> in <span className="font-semibold">{countryQuery}</span>
          </p>
          
          {/* Enhanced API Status */}
          {pagination && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              {/* <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-800">
                    <strong>Search completed successfully!</strong>
                  </p>
                  <p className="text-sm text-blue-700 mt-1">
                    Found {pagination.total_courses} course{pagination.total_courses !== 1 ? 's' : ''} 
                    {pagination.total_courses > limitPerPage && ` (showing ${limitPerPage} per page)`}
                  </p>
                </div>
                {pagination.total_courses > 20 && (
                  <div className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                    ✨ Showing {limitPerPage} courses per page!
                  </div>
                )}
              </div> */}
            </div>
          )}
        </div>

        {/* Results */}
        {loading ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center py-8">
              <RefreshCwIcon className="animate-spin h-8 w-8 text-blue-600 mr-3" />
              <span className="text-lg text-gray-600">Searching courses...</span>
            </div>
            {/* UPDATED: Show 30 loading placeholders instead of 6 */}
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
        ) : courses.length > 0 ? (
          <div className="space-y-6">
            {/* Results summary */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">
                  {pagination && (
                    <>
                      Showing <strong>{pagination.showing_from}-{pagination.showing_to}</strong> of <strong>{pagination.total_courses}</strong> courses
                    </>
                  )}
                </p>
              </div>
            </div>
            
            {/* Course grid - OPTIMIZED: Better responsive layout */}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {courses.map((course) => (
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
                  
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors font-medium text-sm mt-auto">
                    Learn More
                  </button>
                </div>
              ))}
            </div>

            {/* Pagination controls */}
            <PaginationControls />
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
