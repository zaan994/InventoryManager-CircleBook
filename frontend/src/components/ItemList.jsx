import React, { useState, useEffect } from "react";
import { Package, Search, Filter, RefreshCw } from "lucide-react";
import ItemCard from "./ItemCard";
import Pagination from "./Pagination";

const ItemList = ({ items, loading, onEdit, onDelete, onView }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // 2 rows × 4 items per row

  // Calculate total pages
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // Get current items for the page
  const getCurrentItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  };

  // Reset to page 1 when items change
  useEffect(() => {
    setCurrentPage(1);
  }, [items]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Loading Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl w-48 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded-lg w-64 animate-pulse"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded-xl w-32 animate-pulse"></div>
        </div>

        {/* Loading Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg border border-white/20 p-4 animate-pulse"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 mr-4">
                  <div className="h-5 bg-gray-200 rounded-lg mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded-lg w-3/4"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded-full w-16"></div>
              </div>

              {/* Description */}
              <div className="space-y-1 mb-3">
                <div className="h-3 bg-gray-200 rounded-lg"></div>
                <div className="h-3 bg-gray-200 rounded-lg w-5/6"></div>
              </div>

              {/* Tags */}
              <div className="flex gap-1 mb-3">
                <div className="h-5 bg-gray-200 rounded-md w-12"></div>
                <div className="h-5 bg-gray-200 rounded-md w-14"></div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="h-12 bg-gray-200 rounded-lg"></div>
                <div className="h-12 bg-gray-200 rounded-lg"></div>
              </div>

              {/* Status */}
              <div className="h-10 bg-gray-200 rounded-lg mb-3"></div>

              {/* Buttons */}
              <div className="flex gap-2">
                <div className="h-8 bg-gray-200 rounded-lg flex-1"></div>
                <div className="h-8 bg-gray-200 rounded-lg flex-1"></div>
                <div className="h-8 bg-gray-200 rounded-lg w-8"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Loading Footer */}
        <div className="flex items-center justify-center pt-6 border-t border-gray-200/50">
          <div className="flex items-center gap-3 text-gray-500">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span className="text-sm font-medium">
              Loading your inventory...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        {/* Animated Icon Container */}
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-2xl opacity-20 animate-pulse"></div>
          <div className="relative bg-gradient-to-br from-gray-100 to-gray-200/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-white/50">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-30 animate-pulse"></div>
              <Package className="relative h-20 w-20 text-gray-400 mx-auto" />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="max-w-md mx-auto">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3">
            No Products Found
          </h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            We couldn't find any items matching your search criteria. Try
            adjusting your filters or search terms to discover more products.
          </p>

          {/* Suggestions */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50/50 border border-blue-200/50 rounded-2xl p-4 mb-6">
            <div className="flex items-center gap-3 mb-2">
              <Search className="h-5 w-5 text-blue-600" />
              <h4 className="font-semibold text-blue-900">Quick Tips</h4>
            </div>
            <ul className="text-sm text-blue-700 space-y-1 text-left">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                Check your search terms for typos
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                Try broadening your category filters
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                Clear all filters to see all items
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  const currentItems = getCurrentItems();

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Products Inventory
          </h2>
          <p className="text-gray-600 mt-1">
            Showing{" "}
            <span className="font-semibold text-gray-800">
              {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, items.length)}
            </span>{" "}
            of <span className="font-semibold text-gray-800">{items.length}</span>{" "}
            product{items.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Results Badge */}
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-xl font-semibold shadow-lg">
            Page {currentPage} of {totalPages}
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {currentItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onEdit={onEdit}
            onDelete={onDelete}
            onView={onView}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center pt-6 border-t border-gray-200/50">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Results Footer */}
      <div className="flex items-center justify-center text-gray-500">
        <div className="flex items-center gap-2 text-sm">
          <Package className="h-4 w-4" />
          <span className="font-medium">
            {items.length} product{items.length !== 1 ? 's' : ''} total
          </span>
        </div>
      </div>
    </div>
  );
};

export default ItemList;