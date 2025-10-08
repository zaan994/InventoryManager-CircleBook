import React, { useState } from 'react';
import { ArrowLeft, Package, Plus, Layers, Info, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { itemsAPI } from '../services/api.js';
import ItemForm from '../components/ItemForm';

const AddItem = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      await itemsAPI.createItem(formData);
      navigate('/');
    } catch (error) {
      console.error('Error creating item:', error);
      alert('Error creating item: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/10 text-gray-800">
      {/* Subtle animated gradient background */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 backdrop-blur-xl bg-white/80 border-b border-white/30 shadow-sm z-10">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="group flex items-center gap-3 px-4 py-2 text-gray-700 hover:text-indigo-700 font-medium transition-all duration-300"
          >
            <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-indigo-100 transition-colors duration-300">
              <ArrowLeft className="h-4 w-4" />
            </div>
            <span className="relative">
              Back to Inventory
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
            </span>
          </button>
          <div className="hidden sm:flex items-center gap-3 text-gray-600 text-sm">
            <ShieldCheck className="h-4 w-4 text-green-600" />
            <span>Secure & Synced</span>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* Title Section */}
        <section className="mb-10">
          <div className="flex items-center gap-5 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-600 rounded-2xl blur opacity-30"></div>
              <div className="relative bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-2xl shadow-lg">
                <Plus className="h-8 w-8 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-extrabold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent tracking-tight">
                Add a New Product
              </h1>
              <p className="text-gray-600 mt-2 text-base">
                Provide detailed product information to keep your inventory organized and up to date.
              </p>
            </div>
          </div>

          {/* Step Indicator */}
          <div className="flex justify-center items-center mt-8">
            <div className="flex items-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-200">
                  <Layers className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700 mt-2">Product Details</span>
              </div>
              <div className="w-28 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-4"></div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <Package className="h-5 w-5 text-gray-400" />
                </div>
                <span className="text-sm text-gray-400 mt-2">Review</span>
              </div>
            </div>
          </div>
        </section>

        {/* Form Card */}
        <section className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
          <header className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 px-6 py-5 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-100">
              <Package className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Product Information</h2>
              <p className="text-sm text-gray-600">
                Enter product name, category, stock, and pricing details in Sri Lankan Rupees (Rs.).
              </p>
            </div>
          </header>

          <div className="p-8">
            <ItemForm
              onSubmit={handleSubmit}
              onCancel={() => navigate('/')}
              loading={loading}
            />
          </div>
        </section>

        {/* Tips Section */}
        <section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="group bg-blue-50/70 hover:bg-blue-100/70 border border-blue-200/50 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-1.5 rounded-lg bg-blue-100 group-hover:bg-blue-200 transition-colors">
                <Info className="h-4 w-4 text-blue-600" />
              </div>
              <h3 className="font-semibold text-blue-900">Clear Details</h3>
            </div>
            <p className="text-sm text-blue-800">
              Use descriptive names and categories to make searching easier later.
            </p>
          </div>

          <div className="group bg-green-50/70 hover:bg-green-100/70 border border-green-200/50 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-1.5 rounded-lg bg-green-100 group-hover:bg-green-200 transition-colors">
                <Layers className="h-4 w-4 text-green-600" />
              </div>
              <h3 className="font-semibold text-green-900">Inventory Management</h3>
            </div>
            <p className="text-sm text-green-800">
              Set correct stock and price in Rs. to ensure accuracy in your inventory analytics.
            </p>
          </div>

          <div className="group bg-purple-50/70 hover:bg-purple-100/70 border border-purple-200/50 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-1.5 rounded-lg bg-purple-100 group-hover:bg-purple-200 transition-colors">
                <Plus className="h-4 w-4 text-purple-600" />
              </div>
              <h3 className="font-semibold text-purple-900">Quick Actions</h3>
            </div>
            <p className="text-sm text-purple-800">
              Add categories or tags for better grouping and filtering of items.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AddItem;