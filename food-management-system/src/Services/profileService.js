import apiClient from "../app/apiClient";

/**
 * Service for managing user profile operations
 */
const profileService = {
  /**
   * Get current user's profile information
   * @returns {Promise} - The API response with user profile data
   */
  getCurrentUserProfile: async () => {
    try {
      const response = await apiClient.get("/users/me");
      return response.data;
    } catch (error) {
      console.error("Error fetching current user profile:", error);
      throw error;
    }
  },

  /**
   * Get a specific user's profile by ID 
   * (can only access own profile unless admin)
   * @param {string} userId - The ID of the user
   * @returns {Promise} - The API response with user profile data
   */
  getUserProfileById: async (userId) => {
    try {
      const response = await apiClient.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user profile for ID ${userId}:`, error);
      throw error;
    }
  },

  /**
   * Update a user's profile information
   * (can only update own profile unless admin)
   * @param {string} userId - The ID of the user to update
   * @param {Object} profileData - Updated user profile data
   * @returns {Promise} - The API response with updated profile
   */
  updateUserProfile: async (userId, profileData) => {
    try {
      const response = await apiClient.put(`/users/${userId}`, profileData);
      return response.data;
    } catch (error) {
      console.error(`Error updating user profile for ID ${userId}:`, error);
      throw error;
    }
  },

  /**
   * Upload a profile image
   * @param {File} imageFile - The image file to upload
   * @returns {Promise} - The API response with image URL
   */
  uploadProfileImage: async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append('profileImage', imageFile);
      
      const response = await apiClient.post('/users/profile-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading profile image:', error);
      throw error;
    }
  },

  /**
   * Get user's achievements and related stats
   * @returns {Promise} - The API response with user achievements and stats
   */
  getUserAchievements: async () => {
    try {
      const response = await apiClient.get("/achievements/me");
      return response.data;
    } catch (error) {
      console.error("Error fetching user achievements:", error);
      throw error;
    }
  }
};

export default profileService;