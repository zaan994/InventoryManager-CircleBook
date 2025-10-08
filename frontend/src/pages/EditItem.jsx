import React, { useState, useEffect } from 'react';
import { ArrowLeft, Package, Edit, Save, RefreshCw } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { itemsAPI } from '../services/api.js';
import ItemForm from '../components/ItemForm';

const EditItem = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    fetchItem();
  }, [id]);

  const fetchItem = async () => {
    try {
      const response = await itemsAPI.getItem(id);
      setItem(response.data.data);
    } catch (error) {
      console.error('Error fetching item:', error);
      alert('Error fetching item');
      navigate('/');
    } finally {
      setInitialLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      await itemsAPI.updateItem(id, formData);
      navigate('/');
    } catch (error) {
      console.error('Error updating item:', error);
      alert('Error updating item: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl blur opacity-20 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-amber-600 to-orange-700 p-4 rounded-2xl shadow-lg">
              <Package className="h-12 w-12 text-white animate-pulse" />
            </div>
          </div>
          <p className="text-gray-600 mt-4 font-medium">Loading product details...</p>
          <div className="mt-2 w-32 h-1.5 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full mx-auto">
            <div className="h-full w-1/2 bg-white rounded-full animate-ping"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      {/* Enhanced Header with Glass Morphism */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="group relative flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:text-gray-900 font-medium transition-all duration-300 hover:-translate-x-1"
              >
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-gray-100 group-hover:bg-gray-200 transition-colors duration-300">
                    <ArrowLeft className="h-4 w-4" />
                  </div>
                  <span>Back to Inventory</span>
                </div>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-300"></div>
              </button>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={fetchItem}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl blur opacity-20"></div>
              <div className="relative bg-gradient-to-r from-amber-600 to-orange-700 p-3 rounded-2xl shadow-lg">
                <Edit className="h-8 w-8 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Edit Product
              </h1>
              <p className="text-gray-600 mt-2">
                Update the details for <span className="font-semibold text-amber-700">{item?.name}</span>
              </p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
                  <Package className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700 mt-2">Product Details</span>
              </div>
              <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-amber-500 mx-4"></div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 flex items-center justify-center shadow-lg">
                  <Edit className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700 mt-2">Edit Details</span>
              </div>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-600 to-red-600 mx-4"></div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <Save className="h-5 w-5 text-gray-400" />
                </div>
                <span className="text-sm text-gray-400 mt-2">Save Changes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50/50 border-b border-amber-200/50 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-100/50">
                  <Edit className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">Edit Product Information</h2>
                  <p className="text-sm text-gray-600">Update the product details as needed</p>
                </div>
              </div>
              <div className="text-sm px-3 py-1 bg-amber-100 text-amber-800 rounded-full font-medium">
                Editing Mode
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6">
            <ItemForm
              item={item}
              onSubmit={handleSubmit}
              onCancel={() => navigate('/')}
              loading={loading}
            />
          </div>
        </div>

        {/* Quick Stats & Info Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-amber-50/50 border border-amber-200/50 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-amber-100">
                <Package className="h-5 w-5 text-amber-600" />
              </div>
              <h3 className="font-semibold text-amber-900">Current Product Info</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-amber-700">Product Name:</span>
                <span className="font-medium text-amber-900">{item?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-700">Current Stock:</span>
                <span className={`font-medium ${item?.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {item?.quantity} units
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-700">Price:</span>
                <span className="font-medium text-amber-900">Rs.{item?.price}</span>
              </div>
              {item?.category && (
                <div className="flex justify-between">
                  <span className="text-amber-700">Category:</span>
                  <span className="font-medium text-amber-900">{item?.category}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-blue-50/50 border border-blue-200/50 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-blue-100">
                <Edit className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-blue-900">Editing Tips</h3>
            </div>
            <ul className="space-y-2 text-sm text-blue-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5"></div>
                Update stock levels to reflect current inventory
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5"></div>
                Adjust pricing based on market changes
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5"></div>
                Keep product descriptions accurate and up-to-date
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Floating Background Elements */}
      <div className="fixed -z-10 top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-1/4 -left-10 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 -right-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-500"></div>
      </div>
    </div>
  );
};

export default EditItem;