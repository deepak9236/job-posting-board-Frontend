// src/services/authService.js
import axios from 'axios';

const API_URL = 'https://job-posting-board-backend-ojsu.onrender.com/api/auth'; // Adjust the URL as needed

export const registerCompany = async (data) => {
    console.log(`${API_URL}/register`);
    const response = await axios.post(`${API_URL}/register`, data);
    return response.data;
};

export const loginCompany = async (data) => {
    console.log(data);
    const response = await axios.post(`${API_URL}/login`, data);
    console.log("response;- ",response);
    return response.data;
};
