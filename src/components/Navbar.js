// components/Navbar.js
import React from "react";
import { ReactComponent as Logo } from "../imagelogo.svg";

const Navbar = () => {
  return (
    <header className="w-full h-16 flex justify-between items-center px-6 border-b">
      <div className="flex items-center">
        <Logo className="h-10 w-auto" /> {/* SVG Logo */}
      </div>

      <div className="flex items-center space-x-4">
        <span className="text-gray-600 text-sm">Contact</span>

        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-full bg-gray-400"></div>
          <div className="text-sm text-gray-600 flex items-center space-x-1">
            <span>Your Name</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
