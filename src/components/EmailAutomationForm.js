import React, { useState } from 'react';
import { sendJobAlert } from '../services/emailService';

const EmailAutomationForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    jobTitle: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendJobAlert(formData);
      if (response.success) {
        alert("Job alert sent successfully!");
      }
    } catch (error) {
      console.error('Email sending failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Send Job Alert</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium">Candidate Email</label>
        <input 
          type="email" 
          name="email" 
          onChange={handleChange} 
          required 
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" 
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Job Title</label>
        <input 
          type="text" 
          name="jobTitle" 
          onChange={handleChange} 
          required 
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" 
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
        Send Alert
      </button>
    </form>
  );
};

export default EmailAutomationForm;
