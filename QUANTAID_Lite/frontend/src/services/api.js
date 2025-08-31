import axios from 'axios';

// Use relative URL for Vercel deployment
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const apiService = {
  // Health check
  healthCheck: async () => {
    const response = await api.get('/health');
    return response.data;
  },

  // AI Prediction endpoints
  predictYield: async (data) => {
    const response = await api.post('/api/predict', data);
    return response.data;
  },

  // Quantum Optimization endpoints
  optimizeResources: async (data) => {
    const response = await api.post('/api/optimize', data);
    return response.data;
  },

  // Data endpoints
  getClimateData: async () => {
    const response = await api.get('/api/data/climate');
    return response.data;
  },

  getCropData: async () => {
    const response = await api.get('/api/data/crops');
    return response.data;
  },

  getDashboardData: async () => {
    const response = await api.get('/api/data/dashboard');
    return response.data;
  },
};

export default api;
