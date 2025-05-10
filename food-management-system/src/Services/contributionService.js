import apiClient from "../app/apiClient";

/**
 * Service for managing food contributions
 */
const contributionService = {
  /**
   * Submit a contribution for a specific food request item
   * @param {string} foodRequestId - The ID of the food request
   * @param {string} requestItemId - The ID of the specific food request item
   * @param {string} mealName - The name of the meal being contributed
   * @param {string|number} quantityOffered - The quantity being offered
   * @param {string} unit - The unit of measurement (e.g., kg, servings)
   * @param {string} contactNumber - Contributor's contact number
   * @param {string} message - Optional message from the contributor
   * @returns {Promise} - The API response
   */
  contributeToSingleItem: async (foodRequestId, requestItemId, mealName, quantityOffered, unit, contactNumber, message = "") => {
    try {
      const response = await apiClient.post("/contributions", {
        foodRequest: foodRequestId,
        contributedItems: [
          {
            requestItem: requestItemId,
            mealName,
            quantityOffered,
            unit
          }
        ],
        contactNumber,
        message
      });
      return response.data;
    } catch (error) {
      console.error("Error submitting contribution:", error);
      throw error;
    }
  },

  /**
   * Submit contributions for an entire food request (multiple items)
   * @param {string} foodRequestId - The ID of the food request
   * @param {Array} contributedItems - Array of contribution items 
   *        (each with requestItem, mealName, quantityOffered, unit)
   * @param {string} contactNumber - Contributor's contact number
   * @param {string} message - Optional message from the contributor
   * @returns {Promise} - The API response
   */
  contributeToEntireRequest: async (foodRequestId, contributedItems, contactNumber, message = "") => {
    try {
      const response = await apiClient.post("/contributions", {
        foodRequest: foodRequestId,
        contributedItems,
        contactNumber,
        message
      });
      return response.data;
    } catch (error) {
      console.error("Error submitting multiple contributions:", error);
      throw error;
    }
  },

  /**
   * Get all contributions made by the current user
   * @returns {Promise} - The API response with user's contributions
   */
  getUserContributions: async () => {
    try {
      const response = await apiClient.get("/api/contributions/user");
      return response.data;
    } catch (error) {
      console.error("Error fetching user contributions:", error);
      throw error;
    }
  },

  /**
   * Get all contributions for a specific food request
   * @param {string} requestId - The ID of the food request
   * @returns {Promise} - The API response with request contributions
   */
  getRequestContributions: async (requestId) => {
    try {
      const response = await apiClient.get(`/api/contributions/request/${requestId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching contributions for request ${requestId}:`, error);
      throw error;
    }
  }
};

export default contributionService;