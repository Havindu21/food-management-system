import apiClient from "../app/apiClient";

const requestService = {
  // Create a new food request
  createRequest: async (requestData) => {
    try {
      const response = await apiClient.post('/requests', requestData);
      return response.data;
    } catch (error) {
      console.error('Error creating food request:', error);
      throw error;
    }
  },
  
  // Get all food requests
  getAllRequests: async () => {
    try {
      const response = await apiClient.get('/requests');
      return response.data;
    } catch (error) {
      console.error('Error fetching food requests:', error);
      throw error;
    }
  },
  
  // Get user's food requests
  getUserRequests: async () => {
    try {
      const response = await apiClient.get('/requests/user');
      return response.data;
    } catch (error) {
      console.error('Error fetching user food requests:', error);
      throw error;
    }
  },
  
  // Update a food request
  updateRequest: async (requestId, updateData) => {
    try {
      const response = await apiClient.put(`/requests/${requestId}`, updateData);
      return response.data;
    } catch (error) {
      console.error('Error updating food request:', error);
      throw error;
    }
  },
  
  // Delete a food request
  deleteRequest: async (requestId) => {
    try {
      const response = await apiClient.delete(`/requests/${requestId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting food request:', error);
      throw error;
    }
  },
  
  // Get featured food requests for homepage
  getFeaturedRequests: async (limit = 5) => {
    try {
      const response = await apiClient.get(`/requests/featured?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching featured requests:', error);
      throw error;
    }
  },
};

export default requestService;