import apiClient from "../app/apiClient";

/**
 * Service for fetching analytics data
 */
const analyticsService = {
  /**
   * Get comprehensive analytics dashboard data
   * @param {number} year - The year for which to fetch monthly donation data (optional)
   * @returns {Promise} - The API response with all analytics dashboard data
   */
  getAnalyticsDashboard: async (year) => {
    try {
      const response = await apiClient.get("/insights/analytics-dashboard", {
        params: year ? { year } : {}
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching analytics dashboard data:", error);
      throw error;
    }
  },

  /**
   * Get monthly donation statistics
   * @param {number} year - The year for which to fetch monthly donation data (optional)
   * @returns {Promise} - The API response with monthly donation data
   */
  getMonthlyDonations: async (year) => {
    try {
      const response = await apiClient.get("/insights/monthly-donations", {
        params: year ? { year } : {}
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching monthly donations data:", error);
      throw error;
    }
  },

  /**
   * Get user distribution (donors vs recipients)
   * @returns {Promise} - The API response with user distribution data
   */
  getUserDistribution: async () => {
    try {
      const response = await apiClient.get("/insights/user-distribution");
      return response.data;
    } catch (error) {
      console.error("Error fetching user distribution data:", error);
      throw error;
    }
  },

  /**
   * Get recipient verification status
   * @returns {Promise} - The API response with recipient status data
   */
  getRecipientStatus: async () => {
    try {
      const response = await apiClient.get("/insights/recipient-status");
      return response.data;
    } catch (error) {
      console.error("Error fetching recipient status data:", error);
      throw error;
    }
  }
};

export default analyticsService;