import axios from 'axios';
const baseUrl = import.meta.env.VITE_API_URL;

/**
 * Register a new user
 * @param {Object} userData - User registration data including name, email, password, etc.
 * @returns {Promise<Object>} - User data and tokens
 */
const registerUser = async (userData) => {
  // If there's a verificationDocument File object, replace it with the filename
  // if (userData.verificationDocument && userData.verificationDocument instanceof File) {
  //   // This shouldn't be called directly - the document should be uploaded first
  //   // and then the filename should be provided here
  //   throw new Error("Document must be uploaded before registration");
  // }
  
  const response = await axios.post(`${baseUrl}/auth/register`, userData);
  localStorage.setItem('token', response.data.token);
  return response.data;
};

/**
 * Login user
 * @param {Object} userData - Login credentials (email and password)
 * @returns {Promise<Object>} - User data and tokens
 */
const loginUser = async (userData) => {
  const response = await axios.post(`${baseUrl}/auth/login`, userData);
  localStorage.setItem('token', response.data.token);
  return response.data;
};

// Export the services
export { registerUser, loginUser };
