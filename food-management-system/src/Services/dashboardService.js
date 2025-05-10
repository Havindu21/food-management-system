import apiClient from "../app/apiClient";

/**
 * Service for managing dashboard data
 */
const dashboardService = {
  /**
   * Get admin dashboard metrics
   * @returns {Promise} - The API response with admin dashboard data
   */
  getAdminDashboard: async () => {
    try {
      const response = await apiClient.get("/admin/dashboard");
      return response.data;
    } catch (error) {
      console.error("Error fetching admin dashboard data:", error);
      throw error;
    }
  },

  /**
   * Get donor dashboard metrics and donation history
   * @returns {Promise} - The API response with donor dashboard data
   */
  getDonorDashboard: async () => {
    try {
      const response = await apiClient.get("/dashboard/donor");
      return response.data;
    } catch (error) {
      console.error("Error fetching donor dashboard data:", error);
      throw error;
    }
  },

  /**
   * Get recipient dashboard metrics and available donations
   * @returns {Promise} - The API response with recipient dashboard data
   */
  getRecipientDashboard: async () => {
    try {
      const response = await apiClient.get("/dashboard/recipient");
      return response.data;
    } catch (error) {
      console.error("Error fetching recipient dashboard data:", error);
      throw error;
    }
  }
};

export default dashboardService;