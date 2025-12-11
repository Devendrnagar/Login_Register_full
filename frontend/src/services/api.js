import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, // Increased timeout to 15 seconds
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      Cookies.remove('token');
      Cookies.remove('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  // Register
  register: (userData) => api.post('/auth/register', userData),
  
  // Login
  login: (credentials) => api.post('/auth/login', credentials),
  
  // Verify email
  verifyEmail: (token) => api.get(`/auth/verify-email/${token}`),
  

  
  // Forgot password
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  
  // Reset password
  resetPassword: (token, password) => api.post(`/auth/reset-password/${token}`, { password }),
  
  // Resend verification email
  resendVerification: (email) => api.post('/auth/resend-verification', { email }),
};

// User API calls
export const userAPI = {
  // Get profile
  getProfile: () => api.get('/user/profile'),
  
  // Update profile
  updateProfile: (userData) => api.put('/user/profile', userData),
  
  // Change password
  changePassword: (passwordData) => api.put('/user/change-password', passwordData),
  
  // Get dashboard stats
  getDashboardStats: () => api.get('/user/dashboard-stats'),
  
  // Delete account
  deleteAccount: (password) => api.delete('/user/account', { data: { password } }),
};

export default api;
