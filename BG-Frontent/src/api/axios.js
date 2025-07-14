// src/api/axios.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🔹 Request Interceptor
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // or use Redux state
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔹 Response Interceptor
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Optional: redirect to login or logout
      console.warn('Unauthorized! Redirecting to login...');
    }
    return Promise.reject(error);
  }
);

export default API;
