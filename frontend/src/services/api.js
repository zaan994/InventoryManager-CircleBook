import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Items API
export const itemsAPI = {
  // Get all items with optional filters
  getItems: (filters = {}) => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        params.append(key, filters[key]);
      }
    });
    return api.get(`/items?${params}`);
  },

  // Get single item
  getItem: (id) => api.get(`/items/${id}`),

  // Create new item
  createItem: (itemData) => api.post('/items', itemData),

  // Update item
  updateItem: (id, itemData) => api.put(`/items/${id}`, itemData),

  // Delete item
  deleteItem: (id) => api.delete(`/items/${id}`),
};

export default api;