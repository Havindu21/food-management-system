import apiClient from '../../food-management-system/src/app/apiClient';

export const authService = {
  // Login user
  login: async (email, password) => {
    try {
      const response = await apiClient.post('/api/auth/login', { email, password });
      if (response.data.success) {
        // Store token in localStorage for subsequent requests
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('userType', response.data.userType);
        localStorage.setItem('name', response.data.name);
        localStorage.setItem('isVerified', response.data.isVerified);
      }
      return response.data;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  },
  
  // Register a new user
  register: async (userData) => {
    try {
      const response = await apiClient.post('/api/auth/register', userData);
      return response.data;
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  },
  
  // Check if user is authenticated
  isAuthenticated: () => {
    return localStorage.getItem('token') ? true : false;
  },
  
  // Get user's profile information
  getUserProfile: async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) throw new Error('User ID not found');
      
      const response = await apiClient.get(`/api/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },
  
  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');
    localStorage.removeItem('name');
    localStorage.removeItem('isVerified');
  },
  
  // Get user type (donor, recipient, admin)
  getUserType: () => {
    return localStorage.getItem('userType');
  },
  
  // Check if user is verified
  isUserVerified: () => {
    return localStorage.getItem('isVerified') === 'true';
  },
  
  // Get current user's name
  getUserName: () => {
    return localStorage.getItem('name');
  }
};

export default authService;