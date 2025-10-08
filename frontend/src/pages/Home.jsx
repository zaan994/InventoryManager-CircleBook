import React, { useState, useEffect } from "react";
import {
  Plus,
  Package,
  TrendingUp,
  AlertCircle,
  DollarSign,
  Box,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { itemsAPI } from "../services/api.js";
import SearchBar from "../components/SearchBar";
import ItemList from "../components/ItemList";
import ItemModal from "../components/ItemModal";

const Home = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchItems();
  }, [searchTerm, filters]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (filters.category && filters.category !== "all")
        params.category = filters.category;
      if (filters.minPrice) params.minPrice = filters.minPrice;
      if (filters.maxPrice) params.maxPrice = filters.maxPrice;

      const response = await itemsAPI.getItems(params);
      const data = response?.data?.success ? response.data.data : [];
      setItems(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching items:", error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleFiltersChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilters({});
    setSearchTerm("");
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await itemsAPI.deleteItem(id);
        fetchItems();
      } catch (error) {
        console.error("Error deleting item:", error);
        alert("Error deleting item");
      }
    }
  };

  const handleView = async (id) => {
    try {
      const response = await itemsAPI.getItem(id);
      setSelectedItem(response.data.data);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching item:", error);
    }
  };

  // Calculate stats
  const totalItems = items.length;
  const inStockItems = items.filter((item) => item.quantity > 0).length;
  const outOfStockItems = items.filter((item) => item.quantity === 0).length;
  const totalValue = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const stockRate = totalItems > 0 ? (inStockItems / totalItems) * 100 : 0;

  const StatCard = ({
    icon: Icon,
    title,
    value,
    subtitle,
    trend,
    color,
    gradient,
  }) => (
    <div
      className={`relative overflow-hidden rounded-2xl p-6 ${gradient} shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-white/90">{title}</p>
          <p className="text-2xl font-bold text-white mt-2">{value}</p>
          <p className="text-xs text-white/80 mt-1">{subtitle}</p>
        </div>
        <div className={`p-3 rounded-xl bg-white/20 backdrop-blur-sm`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
      {trend && (
        <div className="flex items-center gap-1 mt-3">
          <TrendingUp className="h-4 w-4 text-white" />
          <span className="text-xs text-white/90">{trend}</span>
        </div>
      )}
      {/* Animated background elements */}
      <div className="absolute -right-8 -top-8 w-20 h-20 bg-white/10 rounded-full"></div>
      <div className="absolute -right-12 -bottom-12 w-24 h-24 bg-white/5 rounded-full"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      {/* Enhanced Header with Glass Morphism */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-700 p-3 rounded-2xl shadow-lg">
                  <Package className="h-8 w-8 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Inventory Manager
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Manage your products efficiently
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate("/add")}
              className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-3"
            >
              <div className="relative">
                <Plus className="h-5 w-5 transition-transform group-hover:scale-110" />
              </div>
              Add New Item
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Box}
            title="Total Items"
            value={totalItems}
            subtitle="All products"
            trend={`${stockRate.toFixed(1)}% in stock`}
            gradient="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <StatCard
            icon={TrendingUp}
            title="In Stock"
            value={inStockItems}
            subtitle="Available now"
            trend="Active products"
            gradient="bg-gradient-to-br from-green-500 to-emerald-600"
          />
          <StatCard
            icon={AlertCircle}
            title="Out of Stock"
            value={outOfStockItems}
            subtitle="Need restock"
            trend="Attention needed"
            gradient="bg-gradient-to-br from-amber-500 to-orange-600"
          />
          <StatCard
            icon={DollarSign}
            title="Total Value"
            value={`Rs.${totalValue.toFixed(2)}`}
            subtitle="Inventory worth"
            trend="Current value"
            gradient="bg-gradient-to-br from-purple-500 to-pink-600"
          />
        </div>

        {/* Search and Filters Section */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-6">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
            />
          </div>
        </div>

        {/* Item List Section */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            {/* <h2 className="text-xl font-semibold text-gray-800">
              Product Inventory
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Manage and track your product inventory
            </p> */}
          </div>
          <div className="px-6 pb-8">
            <ItemList
              items={items}
              loading={loading}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
            />
          </div>
        </div>
      </div>

      {/* Item Detail Modal */}
      <ItemModal
        item={selectedItem}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />

      {/* Floating Background Elements */}
      <div className="fixed -z-10 top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-1/4 -left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 -right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-500"></div>
      </div>
    </div>
  );
};

export default Home;