"use client";

import { useDarkMode } from "./DarkModeContext";

export default function Footer() {
  const { isDarkMode } = useDarkMode();

  const handleSVRClick = async () => {
    try {
      // Get current origin to ensure proper URL construction
      const currentOrigin = window.location.origin;
      const adminUrl = `${currentOrigin}/admin/login`;

      console.log('SVR clicked - attempting to open:', adminUrl);

      // First, check if admin route is accessible
      try {
        const response = await fetch(`${currentOrigin}/api/admin/verify`, {
          method: 'GET',
          credentials: 'include'
        });
        console.log('Admin API check response:', response.status);

        // If admin API is accessible, try to open admin portal
        const newWindow = window.open(adminUrl, '_blank', 'noopener,noreferrer');

        // Check if popup was blocked or failed
        if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
          console.log('Popup blocked or failed, trying same tab navigation');
          window.location.href = adminUrl;
        } else {
          console.log('Admin portal opened successfully in new tab');
        }
      } catch (apiError) {
        console.log('Admin API not accessible, providing alternative options');

        // Show user-friendly options when admin is not available
        const userChoice = confirm(
          'Resume Management Portal is not available in this environment.\n\n' +
          'Would you like to:\n' +
          '• OK: Download resume directly\n' +
          '• Cancel: View contact information'
        );

        if (userChoice) {
          // Download resume directly
          window.open(`${currentOrigin}/api/resume/download?format=html`, '_blank');
        } else {
          // Scroll to contact section
          const contactSection = document.getElementById('contact');
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
          } else {
            // Fallback: show contact info
            alert('Contact: vsivareddy.venna@gmail.com\nPhone: +91 93989 61541');
          }
        }
      }
    } catch (error) {
      console.error('Error in SVR click handler:', error);

      // Ultimate fallback: direct resume download
      const fallbackChoice = confirm(
        'Unable to access admin portal.\n\n' +
        'Would you like to download the resume instead?'
      );

      if (fallbackChoice) {
        try {
          window.open(`${window.location.origin}/api/resume/download?format=html`, '_blank');
        } catch (downloadError) {
          alert('Please contact vsivareddy.venna@gmail.com for resume access.');
        }
      }
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
