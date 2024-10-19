// components/Sidebar.js
import React from "react";
import { FaHome } from "react-icons/fa"; // Import the home icon

const Sidebar = ({ toggleForm }) => {
  return (
    <aside className="w-16 flex flex-col items-center border-r py-4">
      <div
        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 cursor-pointer"
        onClick={toggleForm}
      >
        <FaHome className="h-6 w-6 text-gray-500" /> {/* Use the home icon here */}
      </div>
    </aside>
  );
};

export default Sidebar;
