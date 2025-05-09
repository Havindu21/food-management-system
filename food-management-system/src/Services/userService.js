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
  
  // Get all users (for admin management)
  getAllUsers: async () => {
    try {
      const response = await apiClient.get('/users');
      return response.data;
    } catch (error) {
      console.error('Error fetching all recipients:', error);
      throw error;
    }
  },
    
  // Approve a recipient
  approveRecipient: async (userId) => {
    try {
      const response = await apiClient.put(`/users/verify/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error approving recipient:', error);
      throw error;
    }
  },
  
  // Reject a recipient
  rejectRecipient: async (userId) => {
    try {
      // Depending on your API, this could be a delete request or a put to set status
      const response = await apiClient.put(`/users/reject/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error rejecting recipient:', error);
      throw error;
    }
  },
  
  // Suspend a user
  suspendUser: async (userId) => {
    try {
      const response = await apiClient.put(`/admin/suspend/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error suspending user:', error);
      throw error;
    }
  },
  
  // Restore a suspended user
  restoreUser: async (userId) => {
    try {
      const response = await apiClient.put(`/admin/restore/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error restoring user:', error);
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