// src/api/authApi.js
import axios from 'axios';
import BASE_URL from './base_url';

// const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const authApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in headers (for protected routes)
authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email, password) => {
  try {
    const response = await authApi.post('/login', { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Login failed';
  }
};

export const getDashboard = async () => {
  try {
    const response = await authApi.get('/admin/dashboard');
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Failed to access dashboard';
  }
};

export default authApi;