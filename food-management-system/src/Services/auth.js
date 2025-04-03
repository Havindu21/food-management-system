import axios from 'axios';

const API_URL = 'http://localhost:5001/api/auth/';

// Register a new user
const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}register`, userData);
  return response.data; // Returns access & refresh tokens
};

// Login user
const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}login`, userData);
  return response.data;
};

// Export the services
export { registerUser, loginUser };
