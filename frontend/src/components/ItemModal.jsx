import React from 'react';
import { X, Package, Tag, DollarSign, Hash, Calendar, Box, AlertCircle, CheckCircle, TrendingUp, Image } from 'lucide-react';

const ItemModal = ({ item, isOpen, onClose }) => {
  if (!isOpen || !item) return null;

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

  const getStatusInfo = (quantity) => {
    if (quantity === 0) {
      return {
        text: 'Out of Stock',
        color: 'from-red-500 to-rose-600',
        bgColor: 'bg-red-50 border-red-200',
        textColor: 'text-red-700',
        icon: AlertCircle
      };
    } else if (quantity < 10) {
      return {
        text: 'Low Stock',
        color: 'from-amber-500 to-orange-600',
        bgColor: 'bg-amber-50 border-amber-200',
        textColor: 'text-amber-700',
        icon: TrendingUp
      };
    } else {
      return {
        text: 'In Stock',
        color: 'from-green-500 to-emerald-600',
        bgColor: 'bg-green-50 border-green-200',
        textColor: 'text-green-700',
        icon: CheckCircle
      };
    }
  };

  const statusInfo = getStatusInfo(item.quantity);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 max-w-2xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-95 hover:scale-100">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-gray-50 to-gray-100/50 border-b border-gray-200/50 p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${getCategoryColor(item.category)} rounded-2xl blur opacity-20`}></div>
                <div className={`relative bg-gradient-to-r ${getCategoryColor(item.category)} p-3 rounded-2xl shadow-lg`}>
                  <Package className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent truncate">
                  {item.name}
                </h2>
                <p className="text-gray-600 text-sm mt-1 truncate">
                  Product Details & Information
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="group p-2 hover:bg-white/50 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg ml-4"
            >
              <X className="h-5 w-5 text-gray-500 group-hover:text-gray-700 transition-colors" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8 max-h-[calc(90vh-140px)] overflow-y-auto">
          {/* Status & Category Badges */}
          <div className="flex flex-wrap gap-3">
            <div className={`px-4 py-2 rounded-xl text-white font-semibold bg-gradient-to-r ${getCategoryColor(item.category)} shadow-lg`}>
              {item.category}
            </div>
            <div className={`px-4 py-2 rounded-xl font-semibold border-2 ${statusInfo.bgColor} ${statusInfo.textColor} backdrop-blur-sm`}>
              <div className="flex items-center gap-2">
                <statusInfo.icon className="h-4 w-4" />
                {statusInfo.text}
              </div>
            </div>
          </div>

          {/* Image Preview (if available) */}
          {item.image && (
            <div className="relative rounded-2xl overflow-hidden border-2 border-gray-200/50 bg-gray-100/50">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white/90">
                <Image className="h-4 w-4" />
                <span className="text-sm font-medium">Product Image</span>
              </div>
            </div>
          )}

          {/* Description */}
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-5 border border-gray-200/50">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Box className="h-5 w-5 text-blue-600" />
              Product Description
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">{item.description}</p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Price Card */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200/50 rounded-2xl p-5 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-xl bg-blue-100/50">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-blue-600 font-semibold">PRICE</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    Rs.{item.price}
                  </p>
                </div>
              </div>
              <div className="text-xs text-blue-500 font-medium">
                Current selling price
              </div>
            </div>

            {/* Quantity Card */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 border border-gray-200/50 rounded-2xl p-5 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-xl bg-gray-100/50">
                  <Hash className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold">QUANTITY</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {item.quantity}
                  </p>
                </div>
              </div>
              <div className="text-xs text-gray-500 font-medium">
                Units in inventory
              </div>
            </div>
          </div>

          {/* Stock Progress Bar */}
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-5 border border-gray-200/50">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-800">Stock Level</h4>
              <span className={`text-sm font-medium ${statusInfo.textColor}`}>
                {statusInfo.text}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full transition-all duration-1000 ease-out bg-gradient-to-r ${statusInfo.color}`}
                style={{ 
                  width: `${Math.min((item.quantity / 50) * 100, 100)}%` 
                }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>0</span>
              <span>25</span>
              <span>50+</span>
            </div>
          </div>

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-5 border border-gray-200/50">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Tag className="h-5 w-5 text-purple-600" />
                Product Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-2 bg-purple-50 text-purple-700 rounded-xl text-sm font-medium border border-purple-200/50 backdrop-blur-sm hover:bg-purple-100 transition-colors duration-200"
                  >
                    <Tag className="h-3 w-3" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Timestamps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200/50">
            <div className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-xl border border-gray-200/50">
              <Calendar className="h-4 w-4 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500 font-medium">Created</p>
                <p className="text-sm text-gray-700 font-semibold">
                  {new Date(item.createdAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-xl border border-gray-200/50">
              <Calendar className="h-4 w-4 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500 font-medium">Last Updated</p>
                <p className="text-sm text-gray-700 font-semibold">
                  {new Date(item.updatedAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100/50 border-t border-gray-200/50 p-2">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Package className="h-4 w-4" />
              <span>Product ID: {item._id}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;