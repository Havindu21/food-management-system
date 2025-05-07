import axios from 'axios';

const API_URL = 'http://localhost:5001/api/auth';

/**
 * Register a new user
 * @param {Object} userData - User registration data including name, email, password, etc.
 * @returns {Promise<Object>} - User data and tokens
 */
const registerUser = async (userData) => {
  // If there's a verificationDocument File object, replace it with the filename
  if (userData.verificationDocument && userData.verificationDocument instanceof File) {
    // This shouldn't be called directly - the document should be uploaded first
    // and then the filename should be provided here
    throw new Error("Document must be uploaded before registration");
  }
  
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

/**
 * Login user
 * @param {Object} userData - Login credentials (email and password)
 * @returns {Promise<Object>} - User data and tokens
 */
const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

// Export the services
export { registerUser, loginUser };
