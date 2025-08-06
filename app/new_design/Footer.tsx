"use client";

import { useDarkMode } from "./DarkModeContext";

export default function Footer() {
  const { isDarkMode } = useDarkMode();

  const handleSVRClick = () => {
    window.open('/admin/login', '_blank');
  };

  return (
    <footer className={`py-12 border-t transition-colors duration-300 ${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-100'}`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={handleSVRClick}
            className={`text-2xl font-light transition-all duration-300 hover:scale-105 cursor-pointer ${isDarkMode ? 'text-white hover:text-blue-400' : 'text-black hover:text-blue-600'}`}
            title="Admin Portal - Resume Management"
          >
            SVR.
          </button>
          <div className="text-right">
            <p className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>design & coding by me</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
