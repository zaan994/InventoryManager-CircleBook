import React, { useState } from 'react';
import { Edit, Trash2, Eye, Tag, Package, TrendingUp, AlertCircle } from 'lucide-react';
import ConfirmationModal from './ConfirmationModal'; // Adjust the path as needed

const ItemCard = ({ item, onEdit, onDelete, onView }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const getCategoryColor = (category) => {
    const colors = {
      'Electronics': 'from-blue-500 to-blue-600',
      'Clothing': 'from-purple-500 to-purple-600',
      'Books': 'from-green-500 to-emerald-600',
      'Home & Garden': 'from-amber-500 to-orange-600',
      'Sports': 'from-red-500 to-rose-600',
      'Other': 'from-gray-500 to-gray-600'
    };
    return colors[category] || colors.Other;
  };

  const getStatusColor = (quantity) => {
    if (quantity === 0) return 'bg-red-100 text-red-800 border-red-200';
    if (quantity < 10) return 'bg-amber-100 text-amber-800 border-amber-200';
    return 'bg-green-100 text-green-800 border-green-200';
  };

  const getStatusIcon = (quantity) => {
    if (quantity === 0) return <AlertCircle className="h-3 w-3" />;
    if (quantity < 10) return <TrendingUp className="h-3 w-3" />;
    return <Package className="h-3 w-3" />;
  };

  const getStatusText = (quantity) => {
    if (quantity === 0) return 'Out of Stock';
    if (quantity < 10) return 'Low Stock';
    return 'In Stock';
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete(item._id);
    setIsDeleteModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <div className="group relative bg-white/80 backdrop-blur-lg rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full">
        {/* Background Gradient Effect */}
        <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(item.category)} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
        
        {/* Category Badge */}
        <div className="absolute top-3 right-3">
          <div className={`px-2 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getCategoryColor(item.category)} shadow-md`}>
            {item.category}
          </div>
        </div>

        {/* Content */}
        <div className="relative p-4">
          {/* Header */}
          <div className="mb-3 pr-14">
            <h3 className="text-lg font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-gray-800 transition-colors duration-200">
              {item.name}
            </h3>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-3 line-clamp-2 leading-relaxed text-xs">
            {item.description}
          </p>

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {item.tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-gray-100/80 text-gray-700 text-xs font-medium backdrop-blur-sm border border-white/50"
                >
                  <Tag className="h-2.5 w-2.5" />
                  {tag}
                </span>
              ))}
              {item.tags.length > 2 && (
                <span className="text-xs text-gray-500 font-medium bg-white/50 px-2 py-1 rounded-md border border-white/50">
                  +{item.tags.length - 2} more
                </span>
              )}
            </div>
          )}

          {/* Stats Section */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {/* Price */}
            <div className="text-center p-2 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200/50">
              <div className="text-xs text-blue-600 font-semibold mb-1">PRICE</div>
              <div className="text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Rs.{item.price}
              </div>
            </div>

            {/* Quantity */}
            <div className="text-center p-2 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100/50 border border-gray-200/50">
              <div className="text-xs text-gray-600 font-semibold mb-1">QUANTITY</div>
              <div className="text-lg font-bold text-gray-800">
                {item.quantity}
              </div>
              <div className="text-xs text-gray-500">units</div>
            </div>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center justify-between mb-4 p-2 rounded-lg bg-white/50 border border-white/50 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <div className={`p-1 rounded-md ${getStatusColor(item.quantity).split(' ')[0]} ${getStatusColor(item.quantity).split(' ')[1]}`}>
                {getStatusIcon(item.quantity)}
              </div>
              <span className={`text-xs font-semibold ${getStatusColor(item.quantity).split(' ')[1]}`}>
                {getStatusText(item.quantity)}
              </span>
            </div>
            {item.quantity > 0 && (
              <div className="w-16 bg-gray-200 rounded-full h-1.5">
                <div 
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    item.quantity === 0 ? 'bg-red-500' : 
                    item.quantity < 10 ? 'bg-amber-500' : 'bg-green-500'
                  }`}
                  style={{ 
                    width: `${Math.min((item.quantity / 50) * 100, 100)}%` 
                  }}
                ></div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => onView(item._id)}
              className="flex-1 group/btn flex items-center justify-center gap-1 px-2 py-2 rounded-lg bg-gray-100/80 hover:bg-gray-200/80 text-gray-700 hover:text-gray-900 font-semibold transition-all duration-300 hover:shadow-md border border-white/50 backdrop-blur-sm text-xs"
            >
              <Eye className="h-3.5 w-3.5 transition-transform group-hover/btn:scale-110" />
              View
            </button>
            <button
              onClick={() => onEdit(item._id)}
              className="flex-1 group/btn flex items-center justify-center gap-1 px-2 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold transition-all duration-300 hover:shadow-md shadow-sm text-xs"
            >
              <Edit className="h-3.5 w-3.5 transition-transform group-hover/btn:scale-110" />
              Edit
            </button>
            <button
              onClick={handleDeleteClick}
              className="px-2 py-2 group/btn rounded-lg bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-semibold transition-all duration-300 hover:shadow-md shadow-sm flex items-center justify-center text-xs"
            >
              <Trash2 className="h-3.5 w-3.5 transition-transform group-hover/btn:scale-110" />
            </button>
          </div>
        </div>

        {/* Hover Border Effect */}
        <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${getCategoryColor(item.category)} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}>
          <div className="absolute inset-[1px] rounded-xl bg-white/80 backdrop-blur-lg"></div>
        </div>

        {/* Corner Accents */}
        <div className={`absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 ${getCategoryColor(item.category).replace('from-', 'border-').replace(' to-', '-500 border-l-')} rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
        <div className={`absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 ${getCategoryColor(item.category).replace('from-', 'border-').replace(' to-', '-500 border-r-')} rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
        <div className={`absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 ${getCategoryColor(item.category).replace('from-', 'border-').replace(' to-', '-500 border-l-')} rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
        <div className={`absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 ${getCategoryColor(item.category).replace('from-', 'border-').replace(' to-', '-500 border-r-')} rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title={`Delete "${item.name}"?`}
        message={`Are you sure you want to delete "${item.name}"? This action cannot be undone and all item data will be permanently lost.`}
        confirmText="Delete Item"
        cancelText="Cancel"
        type="danger"
      />
    </>
  );
};

export default ItemCard;