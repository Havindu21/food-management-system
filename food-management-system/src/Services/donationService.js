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
  
  // Additional donation service methods can be added here
};

export default donationService;