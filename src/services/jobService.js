// src/services/jobService.js
import axios from "axios";

const API_URL = "https://job-posting-board-backend-ojsu.onrender.com/api/jobs";

export const postJob = async (data, token) => {
  const response = await axios.post(`${API_URL}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response);
  return response.data;
};

export const sendJobAlert = async (jobId, candidates, token) => {
  const response = await axios.post(
    `${API_URL}/send-alert`,
    {
      jobId,
      candidates,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    }
  );
  return response.data;
};
