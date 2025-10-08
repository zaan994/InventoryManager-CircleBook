import React from 'react';
import { Search, Filter, X, SlidersHorizontal, Tag, DollarSign, Package } from 'lucide-react';

const SearchBar = ({ searchTerm, onSearchChange, filters, onFiltersChange, onClearFilters }) => {
  const [showFilters, setShowFilters] = React.useState(false);

  const categories = ['all', 'Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Other'];

  const hasActiveFilters = filters.category && filters.category !== 'all' || filters.minPrice || filters.maxPrice;

  return (
    <div className="mb-8 space-y-4">
      {/* Search Bar */}
      <div className="flex gap-4">
        <div className="flex-1 relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 transition-colors duration-300 group-focus-within:text-blue-500" />
            <input
              type="text"
              placeholder="Search products by name, description, or tags..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 bg-white/80 backdrop-blur-sm transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-medium placeholder-gray-400 hover:border-gray-300 text-gray-900"
            />
          </div>
        </div>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`group relative flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 hover:shadow-lg ${
            showFilters || hasActiveFilters
              ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg'
              : 'bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 hover:bg-gray-50/80'
          }`}
        >
          <SlidersHorizontal className={`h-5 w-5 transition-transform duration-300 ${
            showFilters ? 'rotate-90' : ''
          }`} />
          Filters
          {(showFilters || hasActiveFilters) && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
              <div className="w-3 h-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full"></div>
            </div>
          )}
        </button>
      </div>

      {/* Active Filters Badges */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 animate-slide-up">
          {filters.category && filters.category !== 'all' && (
            <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-xl text-sm font-medium border border-blue-200/50">
              <Package className="h-3 w-3" />
              Category: {filters.category}
              <button
                onClick={() => onFiltersChange('category', 'all')}
                className="ml-1 hover:text-blue-900 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          {filters.minPrice && (
            <div className="flex items-center gap-2 px-3 py-2 bg-green-50 text-green-700 rounded-xl text-sm font-medium border border-green-200/50">
              <DollarSign className="h-3 w-3" />
              Min: ${filters.minPrice}
              <button
                onClick={() => onFiltersChange('minPrice', '')}
                className="ml-1 hover:text-green-900 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          {filters.maxPrice && (
            <div className="flex items-center gap-2 px-3 py-2 bg-purple-50 text-purple-700 rounded-xl text-sm font-medium border border-purple-200/50">
              <DollarSign className="h-3 w-3" />
              Max: ${filters.maxPrice}
              <button
                onClick={() => onFiltersChange('maxPrice', '')}
                className="ml-1 hover:text-purple-900 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-6 animate-slide-up">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600">
                <Filter className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Filter Products
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  Narrow down your search results
                </p>
              </div>
            </div>
            <button
              onClick={onClearFilters}
              className="group flex items-center gap-2 px-4 py-2 text-gray-500 hover:text-gray-700 font-medium transition-all duration-300 hover:bg-gray-100/80 rounded-xl"
            >
              <X className="h-4 w-4 transition-transform group-hover:scale-110" />
              Clear all
            </button>
          </div>
          
          {/* Filters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Category Filter */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                <Package className="h-4 w-4 text-blue-600" />
                Category
              </label>
              <div className="relative">
                <select
                  value={filters.category || 'all'}
                  onChange={(e) => onFiltersChange('category', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white/80 backdrop-blur-sm transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-medium appearance-none cursor-pointer hover:border-gray-300"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <div className="w-2 h-2 border-r-2 border-b-2 border-gray-400 transform rotate-45"></div>
                </div>
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                Minimum Price
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={filters.minPrice || ''}
                  onChange={(e) => onFiltersChange('minPrice', e.target.value)}
                  placeholder="0.00"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white/80 backdrop-blur-sm transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 font-medium placeholder-gray-400 hover:border-gray-300"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  $
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-purple-600" />
                Maximum Price
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={filters.maxPrice || ''}
                  onChange={(e) => onFiltersChange('maxPrice', e.target.value)}
                  placeholder="1000.00"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white/80 backdrop-blur-sm transition-all duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 font-medium placeholder-gray-400 hover:border-gray-300"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  $
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-200/50">
            <div className="text-sm text-gray-500">
              {hasActiveFilters ? 'Active filters applied' : 'No filters active'}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowFilters(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
              >
                Close
              </button>
              <button
                onClick={onClearFilters}
                className="px-6 py-2 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Search Tips */}
      {!showFilters && (
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Search className="h-3 w-3" />
            <span>Search by product name, description, or tags</span>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-3 w-3" />
            <span>Use filters to narrow down results</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;