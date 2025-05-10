import apiClient from "../app/apiClient";

const donationService = {
  // Create a new donation
  createDonation: async (donationData) => {
    try {
      const response = await apiClient.post('/donations', donationData);
      return response.data;
    } catch (error) {
      console.error('Error creating donation:', error);
      throw error;
    }
  },
  
  // Get all available donations
  getAllDonations: async () => {
    try {
      const response = await apiClient.get('/donations');
      return response.data;
    } catch (error) {
      console.error('Error fetching donations:', error);
      throw error;
    }
  },
  
  // Request a donation - Updated to use the new API endpoint structure
  requestDonation: async (requestData) => {
    try {
      const { donationId, foodItemId } = requestData;
      const response = await apiClient.put(`/donations/${donationId}/items/${foodItemId}/claim`);
      return response.data;
    } catch (error) {
      console.error('Error requesting donation:', error);
      throw error;
    }
  },
  
  // Get user's donation requests
  getUserDonationRequests: async () => {
    try {
      const response = await apiClient.get('/donation-requests/user');
      return response.data;
    } catch (error) {
      console.error('Error fetching user donation requests:', error);
      throw error;
    }
  },
  
  // Get user's active donations and contributions
  getUserActiveItems: async () => {
    try {
      const response = await apiClient.get('/users/active-items');
      return response.data;
    } catch (error) {
      console.error('Error fetching active items:', error);
      throw error;
    }
  },
  
  // Cancel a donation
  cancelDonation: async (donationId) => {
    try {
      const response = await apiClient.put(`/donations/${donationId}/cancel`);
      return response.data;
    } catch (error) {
      console.error('Error canceling donation:', error);
      throw error;
    }
  },
  
  // Fulfill a donation
  fulfillDonation: async (donationId) => {
    try {
      const response = await apiClient.put(`/donations/${donationId}/fulfill`);
      return response.data;
    } catch (error) {
      console.error('Error fulfilling donation:', error);
      throw error;
    }
  },
  
  // Cancel a contribution
  cancelContribution: async (contributionId) => {
    try {
      const response = await apiClient.put(`/contributions/${contributionId}/cancel`);
      return response.data;
    } catch (error) {
      console.error('Error canceling contribution:', error);
      throw error;
    }
  },
  
  // Get donation history (completed or expired donations)
  getDonationHistory: async () => {
    try {
      const response = await apiClient.get('/donations/history');
      return response.data;
    } catch (error) {
      console.error('Error fetching donation history:', error);
      throw error;
    }
  },
  
  // Get contribution history (completed or rejected contributions)
  getContributionHistory: async () => {
    try {
      const response = await apiClient.get('/contributions/history');
      return response.data;
    } catch (error) {
      console.error('Error fetching contribution history:', error);
      throw error;
    }
  },
  
  // Additional donation service methods can be added here
};

export default donationService;