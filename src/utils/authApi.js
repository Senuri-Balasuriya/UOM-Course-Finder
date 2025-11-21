import axios from 'axios';

const AUTH_API_URL = 'https://dummyjson.com/auth/login';

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(AUTH_API_URL, {
      username,
      password,
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Login failed. Please check your credentials.' 
    };
  }
};
