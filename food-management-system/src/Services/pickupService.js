import apiClient from "../app/apiClient";

/**
 * Service for managing pickup operations
 */
const pickupService = {
  /**
   * Get all active pickups for a recipient (both donations and contributions)
   * @returns {Promise} - The API response with active pickups
   */
  getActivePickups: async () => {
    try {
      const response = await apiClient.get("/pickups/active");
      return response.data;
    } catch (error) {
      console.error("Error fetching active pickups:", error);
      throw error;
    }
  },

  /**
   * Get pickup history for a recipient
   * @returns {Promise} - The API response with pickup history
   */
  getPickupHistory: async () => {
    try {
      const response = await apiClient.get("/pickups/history");
      return response.data;
    } catch (error) {
      console.error("Error fetching pickup history:", error);
      throw error;
    }
  },

  /**
   * Mark a donation pickup as completed
   * @param {string} donationId - The ID of the donation to mark as completed
   * @returns {Promise} - The API response with the updated donation
   */
  completeDonationPickup: async (donationId) => {
    try {
      const response = await apiClient.put(`/pickups/donations/${donationId}/complete`);
      return response.data;
    } catch (error) {
      console.error(`Error completing donation pickup ${donationId}:`, error);
      throw error;
    }
  },

  /**
   * Mark a contribution pickup as completed
   * @param {string} contributionId - The ID of the contribution to mark as completed
   * @returns {Promise} - The API response with the updated contribution
   */
  completeContributionPickup: async (contributionId) => {
    try {
      const response = await apiClient.put(`/pickups/contributions/${contributionId}/complete`);
      return response.data;
    } catch (error) {
      console.error(`Error completing contribution pickup ${contributionId}:`, error);
      throw error;
    }
  }
};

export default pickupService;