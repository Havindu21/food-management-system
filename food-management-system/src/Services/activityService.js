import apiClient from "../app/apiClient";

/**
 * Service for handling activity history
 */
const activityService = {
  /**
   * Get all activity history for the current recipient user
   * @returns {Promise} - The API response with user's activity history
   */
  getActivityHistory: async () => {
    try {
      const response = await apiClient.get("/pickups/activity-history");
      return response.data;
    } catch (error) {
      console.error("Error fetching activity history:", error);
      throw error;
    }
  },
  
  /**
   * Get specific activity details by id
   * @param {string} activityId - The ID of the activity
   * @returns {Promise} - The API response with activity details
   */
  getActivityById: async (activityId) => {
    try {
      const response = await apiClient.get(`/pickups/activity/${activityId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching activity ${activityId}:`, error);
      throw error;
    }
  },
};

export default activityService;