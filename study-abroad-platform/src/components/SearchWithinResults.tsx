import React, { useState, useEffect } from 'react'
import { SearchIcon, XIcon } from 'lucide-react'

interface SearchWithinResultsProps {
  onSearch: (query: string) => void
  totalCourses: number
  currentResultsCount: number
  placeholder?: string
}

const SearchWithinResults: React.FC<SearchWithinResultsProps> = ({
  onSearch,
  totalCourses,
  currentResultsCount,
  placeholder = "Search within results..."
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isActive, setIsActive] = useState(false)

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    onSearch(value)
  }

  const clearSearch = () => {
    setSearchQuery('')
    onSearch('')
    setIsActive(false)
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-medium text-gray-900">
          Search within {totalCourses} courses
        </h3>
        {searchQuery && (
          <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded">
            {currentResultsCount} matches found
          </span>
        )}
      </div>
      
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-400" />
        </div>
        
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsActive(true)}
          placeholder={placeholder}
          className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
        
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600"
          >
            <XIcon className="h-5 w-5 text-gray-400" />
          </button>
        )}
      </div>
      
      {isActive && (
        <div className="mt-2 text-xs text-gray-500">
          💡 Search by course name, university, or program type across all {totalCourses} courses
        </div>
      )}
    </div>
  )
}

export default SearchWithinResults
