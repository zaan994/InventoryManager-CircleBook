import React, { useState, useEffect } from 'react';
import { Save, X, Package, DollarSign, Hash, Tag, Image, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';

const ItemForm = ({ item, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Other',
    price: '',
    quantity: '',
    tags: '',
    image: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const categories = ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Other'];

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        description: item.description,
        category: item.category,
        price: item.price.toString(),
        quantity: item.quantity.toString(),
        tags: item.tags ? item.tags.join(', ') : '',
        image: item.image || ''
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.price || parseFloat(formData.price) < 0) {
      newErrors.price = 'Valid price is required';
    }

    if (!formData.quantity || parseInt(formData.quantity) < 0) {
      newErrors.quantity = 'Valid quantity is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const submitData = {
      ...formData,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    onSubmit(submitData);
  };

  const getFieldStatus = (fieldName) => {
    if (!touched[fieldName]) return 'default';
    if (errors[fieldName]) return 'error';
    if (formData[fieldName]) return 'success';
    return 'default';
  };

  const getStatusIcon = (fieldName) => {
    const status = getFieldStatus(fieldName);
    switch (status) {
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'success':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  const getInputClass = (fieldName) => {
    const baseClass = "w-full px-4 py-3 rounded-xl border-2 bg-white/80 backdrop-blur-sm transition-all duration-300 focus:ring-2 focus:ring-offset-1 font-medium";
    const status = getFieldStatus(fieldName);
    
    switch (status) {
      case 'error':
        return `${baseClass} border-red-300 focus:border-red-500 focus:ring-red-500/20 text-red-900 placeholder-red-400`;
      case 'success':
        return `${baseClass} border-green-300 focus:border-green-500 focus:ring-green-500/20 text-green-900 placeholder-green-400`;
      default:
        return `${baseClass} border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 text-gray-900 placeholder-gray-400 hover:border-gray-300`;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="md:col-span-2">
          <label className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Package className="h-4 w-4 text-blue-600" />
            Item Name *
          </label>
          <div className="relative">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClass('name')}
              placeholder="Enter a descriptive item name"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {getStatusIcon('name')}
            </div>
          </div>
          {errors.name && (
            <p className="mt-2 flex items-center gap-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
              <AlertCircle className="h-4 w-4" />
              {errors.name}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Tag className="h-4 w-4 text-purple-600" />
            Category *
          </label>
          <div className="relative">
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white/80 backdrop-blur-sm transition-all duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 font-medium appearance-none cursor-pointer hover:border-gray-300"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <div className="w-2 h-2 border-r-2 border-b-2 border-gray-400 transform rotate-45"></div>
            </div>
          </div>
        </div>

        {/* Price */}
        <div>
          <label className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-green-600" />
            Price (Rs.) *
          </label>
          <div className="relative">
            <input
              type="number"
              step="0.01"
              name="price"
              value={formData.price}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClass('price')}
              placeholder="0.00"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {getStatusIcon('price')}
            </div>
          </div>
          {errors.price && (
            <p className="mt-2 flex items-center gap-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
              <AlertCircle className="h-4 w-4" />
              {errors.price}
            </p>
          )}
        </div>

        {/* Quantity */}
        <div>
          <label className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Hash className="h-4 w-4 text-amber-600" />
            Quantity *
          </label>
          <div className="relative">
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClass('quantity')}
              placeholder="0"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {getStatusIcon('quantity')}
            </div>
          </div>
          {errors.quantity && (
            <p className="mt-2 flex items-center gap-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
              <AlertCircle className="h-4 w-4" />
              {errors.quantity}
            </p>
          )}
        </div>

        {/* Tags */}
        <div>
          <label className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Tag className="h-4 w-4 text-blue-600" />
            Tags
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white/80 backdrop-blur-sm transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-medium placeholder-gray-400 hover:border-gray-300"
            placeholder="electronics, gadget, tech"
          />
          <p className="mt-2 text-sm text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
            Separate tags with commas for better organization
          </p>
        </div>

        {/* Image URL */}
        <div>
          <label className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Image className="h-4 w-4 text-purple-600" />
            Image URL
          </label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white/80 backdrop-blur-sm transition-all duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 font-medium placeholder-gray-400 hover:border-gray-300"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <FileText className="h-4 w-4 text-green-600" />
            Description *
          </label>
          <div className="relative">
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              onBlur={handleBlur}
              rows={5}
              className={getInputClass('description')}
              placeholder="Describe the item in detail including features, specifications, and any important information..."
            />
            <div className="absolute right-3 top-3">
              {getStatusIcon('description')}
            </div>
          </div>
          {errors.description && (
            <p className="mt-2 flex items-center gap-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
              <AlertCircle className="h-4 w-4" />
              {errors.description}
            </p>
          )}
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex gap-4 justify-end pt-8 border-t border-gray-200/50">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="group flex items-center gap-3 px-8 py-3.5 rounded-xl font-semibold text-gray-700 hover:text-gray-900 bg-gray-100/80 hover:bg-gray-200/80 backdrop-blur-sm border border-gray-300/50 transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <X className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="group flex items-center gap-3 px-8 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 backdrop-blur-sm border border-blue-500/20 transition-all duration-300 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          {loading ? (
            <>
              <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-5 w-5 transition-transform group-hover:scale-110" />
              {item ? 'Update Product' : 'Create Product'}
            </>
          )}
        </button>
      </div>

      {/* Form Status Indicator */}
      <div className="bg-blue-50/50 border border-blue-200/50 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-100">
            <Package className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-semibold text-blue-900">
              {item ? 'Update Product Information' : 'Create New Product'}
            </h4>
            <p className="text-sm text-blue-700 mt-1">
              {item 
                ? 'Make changes to the product details and save to update your inventory.'
                : 'Fill in all required fields to add a new product to your inventory.'
              }
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ItemForm;