import apiClient from "../app/apiClient";

export const userService = {
  // Get unverified recipients
  getUnverifiedRecipients: async () => {
    try {
      const response = await apiClient.get('/users/unverified-recipients');
      return response.data;
    } catch (error) {
      console.error('Error fetching unverified recipients:', error);
      throw error;
    }
  },
  
  // Approve a recipient
  approveRecipient: async (userId) => {
    try {
      const response = await apiClient.put(`users/verify/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error approving recipient:', error);
      throw error;
    }
  },
  
  // Reject a recipient
  rejectRecipient: async (userId) => {
    try {
      // Depending on your API, this could be a delete request or a patch to set status
      const response = await apiClient.put(`users/reject/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error rejecting recipient:', error);
      throw error;
    }
  },
  
  // Get verification document URL
  getVerificationDocumentUrl: (documentName) => {
    if (!documentName) return null;
    return `${import.meta.env.VITE_API_URL}/uploads/${documentName}`;
  }
};

export default userService;