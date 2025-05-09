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
  
  // Request a donation
  requestDonation: async (requestData) => {
    try {
      const response = await apiClient.post('/donation-requests', requestData);
      return response.data;
    } catch (error) {
      console.error('Error requesting donation:', error);
      throw error;
    }
  },
  
  // Additional donation service methods can be added here
};

export default donationService;