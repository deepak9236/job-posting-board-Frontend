import axios from 'axios';

const API_URL = 'https://job-posting-board-backend-ojsu.onrender.com/api/verification';

export const verifyEmailOtp = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/verify-email`, data);
        return response.data;
    } catch (error) {
        console.error('Email verification error:', error.response?.data || error.message);
        throw error; // Rethrow to handle it in the calling function
    }
};

export const verifyMobileOtp = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/verify-mobile`, data);
        return response.data;
    } catch (error) {
        console.error('Mobile verification error:', error.response?.data || error.message);
        throw error; // Rethrow to handle it in the calling function
    }
};


// https://job-posting-board-backend-4cnlci80e-deepak8321s-projects.vercel.app/