import axios from 'axios';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: import.meta.env.VITE_API_TIMEOUT,
});

// Add request interceptor to include auth token in all requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors like unauthorized access, server errors, etc.
    if (error.response?.status === 401) {
      // Handle unauthorized - could redirect to login or refresh token
      localStorage.removeItem('token');
      window.location.href = '/sign-in';
    }
    return Promise.reject(error);
  }
);

export default apiClient;