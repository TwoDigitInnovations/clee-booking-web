import axios from 'axios';

const API_URL = 'http://localhost:8001';

export const createWaitlist = (waitlistData) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/waitlist/create`, waitlistData);
    
    if (response.data.status) {
      return {
        success: true,
        data: response.data.data,
        message: response.data.message
      };
    }
    
    return {
      success: false,
      message: response.data.message || 'Failed to join waitlist'
    };
  } catch (error) {
    console.error('Waitlist error:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'An error occurred'
    };
  }
};
