// pages/DashboardLayout.js
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import JobForm from "../components/JobPostForm";


const DashboardLayout = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar toggleForm={toggleForm} />

        {/* Main Area */}
        <div className="flex-1 p-6 flex justify-start items-start">
          {!showForm ? (
            <button
              onClick={toggleForm}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Create Job
            </button>
          ) : (
            <JobForm />
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
