"use client";

import { useDarkMode } from "./DarkModeContext";

export default function Footer() {
  const { isDarkMode } = useDarkMode();

  const handleSVRClick = () => {
    try {
      // Get current origin to ensure proper URL construction
      const currentOrigin = window.location.origin;
      const adminUrl = `${currentOrigin}/admin/login`;

      console.log('SVR clicked - attempting to open:', adminUrl);

      // Try to open admin portal
      const newWindow = window.open(adminUrl, '_blank', 'noopener,noreferrer');

      // Check if popup was blocked or failed
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        console.log('Popup blocked or failed, trying same tab navigation');
        // Fallback: navigate in same tab if popup blocked
        window.location.href = adminUrl;
      } else {
        console.log('Admin portal opened successfully in new tab');
      }
    } catch (error) {
      console.error('Error opening admin portal:', error);
      // Ultimate fallback: show alert and try direct navigation
      alert('Opening Resume Management Portal...');
      window.location.href = '/admin/login';
    }
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
