// components/JobForm.js
import React, { useState } from "react";
import { postJob, sendJobAlert } from '../services/jobService';

const JobForm = () => {
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    experienceLevel: "",
    endDate: "",
    candidates: "",
  });
  const [alertMessage, setAlertMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const candidateArray = jobData.candidates.split(",").map(email => email.trim()).filter(email => email !== "");

    if (!candidateArray.every(isValidEmail)) {
      setError("Please enter valid email addresses.");
      return;
    }

    setLoading(true); 
    const token = localStorage.getItem('token'); 
    console.log(token);
    
    try {
      // Post job to backend
      const postResponse = await postJob({
        title: jobData.title,
        description: jobData.description,
        experienceLevel: jobData.experienceLevel,
        endDate: jobData.endDate,
      }, token); 

      if (postResponse && postResponse.job) {
        const jobId = postResponse.job._id;

        await sendJobAlert(jobId, candidateArray, token); 

        setAlertMessage("Job posted and alerts sent successfully!");
        setJobData({
          title: "",
          description: "",
          experienceLevel: "",
          endDate: "",
          candidates: "",
        });
      }
    } catch (error) {
      console.error(error);
      setError("Failed to post job or send alerts.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="w-full max-w-xl bg-white shadow-md rounded-md p-6">
      <h2 className="text-2xl font-bold mb-4">Create Job</h2>

      {alertMessage && <div className="text-green-500">{alertMessage}</div>}
      {error && <div className="text-red-500">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Job Title</label>
            <input
              type="text"
              name="title"
              value={jobData.title}
              onChange={handleChange}
              placeholder="Enter Job Title"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Job Description</label>
            <textarea
              name="description"
              value={jobData.description}
              onChange={handleChange}
              placeholder="Enter Job Description"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Experience Level</label>
            <select
              name="experienceLevel"
              value={jobData.experienceLevel}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            >
              <option value="">Select Experience Level</option>
              <option value="Fresher">Fresher</option>
              <option value="Mid-level">Mid-level</option>
              <option value="Senior">Senior</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Add Candidates (comma separated emails)
            </label>
            <input
              type="text"
              name="candidates"
              value={jobData.candidates}
              onChange={handleChange}
              placeholder="e.g. candidate1@gmail.com, candidate2@gmail.com"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              name="endDate"
              value={jobData.endDate}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              disabled={loading} 
            >
              {loading ? "Submitting..." : "Submit Job"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default JobForm;
