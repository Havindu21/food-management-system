import axios from 'axios';
const baseUrl = import.meta.env.VITE_API_URL;

/**
 * Uploads a verification document and returns the filename
 * @param {File} document - The document file to upload
 * @returns {Promise<string>} - The filename of the uploaded document
 */
const uploadDocument = async (document) => {
  const formData = new FormData();
  formData.append('document', document);
  
  const response = await axios.post(`${baseUrl}/upload/document`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  
  return response?.data;
  // return response?.data?.data?.filename; // Return the filename received from server
};

export { uploadDocument };